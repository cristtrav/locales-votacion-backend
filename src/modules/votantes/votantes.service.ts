import { VotanteLocal } from '@database/entity/votante-local.entity';
import { Votante } from '@database/entity/votante.entity';
import { VotanteView } from '@database/views/votante.view';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class VotanteService {

    constructor(
        @InjectRepository(VotanteView)
        private votanteViewRepo: Repository<VotanteView>,
        @InjectRepository(Votante)
        private votanteRepo: Repository<Votante>,
        @InjectRepository(VotanteLocal)
        private votanteLocalRepo: Repository<VotanteLocal>
    ) { }

    private getSelectQuery(queries: { [name: string]: any }): SelectQueryBuilder<Votante> {
        const { sort, offset, limit, search } = queries;
        let query = this.votanteRepo.createQueryBuilder('votante');
        const patronBusquedaNombres = `%${this.quitarAcentos(search).replaceAll(' ', '% %').toUpperCase()}%`;
        if (search) {
            query = query.andWhere(new Brackets(qb => {
                if (!Number.isNaN(Number.parseInt(search))) qb = qb.orWhere(`votante.ci = :ci`, { ci: Number.parseInt(search) });
                qb = qb.orWhere(`CONCAT(UPPER(votante.nombres), ' ', UPPER(votante.apellidos)) LIKE :razonsocial`, { razonsocial: patronBusquedaNombres });
            }));
        }
        if (offset) query = query.skip(offset);
        if (limit) query = query.take(limit);
        if (sort) {
            const sortColumn = sort.substring(1);
            const sortOrder: 'ASC' | 'DESC' = sort.charAt(0) === '-' ? 'DESC' : 'ASC';
            query = query.orderBy(`votante.${sortColumn}`, sortOrder);
        }
        return query;
    }

    findAll(queries: { [name: string]: any }): Promise<Votante[]> {
        return this.getSelectQuery(queries).getMany();
    }

    count(queries: { [name: string]: any }): Promise<number> {
        return this.getSelectQuery(queries).getCount();
    }

    async findByCi(ci: number): Promise<Votante> {
        const votante = await this.votanteRepo.findOneBy({ ci });
        if (!votante) throw new NotFoundException();
        return votante;
    }

    async findPosiblesByCi(ci: number): Promise<Votante[]> {
        return await (await this.votanteLocalRepo.find({ where: { ciVotanteCarga: ci }, relations: { votante: true } })).map(vl => vl.votante)
    }

    async add(ciVotanteCarga: number, ciVotante: number) {
        const votanteLocal = new VotanteLocal()
        votanteLocal.ciVotanteCarga = ciVotanteCarga;
        votanteLocal.ciVotante = ciVotante
        await this.votanteLocalRepo.save(votanteLocal);
    }

    async delete(ciVotanteCarga: number, ciVotante: number) {
        const votanteLocal = new VotanteLocal();
        votanteLocal.ciVotante = ciVotante;
        votanteLocal.ciVotanteCarga = ciVotanteCarga;
        await this.votanteLocalRepo.remove(votanteLocal);
    }

    private quitarAcentos(texto: string){
        return texto
        .replaceAll(/[áÁ]/g, 'A')
        .replaceAll(/[éÉ]/g, 'E')
        .replaceAll(/[íÍ]/g, 'I')
        .replaceAll(/[oÓ]/g, 'O')
        .replaceAll(/[úÚ]/g, 'U');
    }
}
