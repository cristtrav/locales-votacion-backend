import { Zona } from '@database/entity/zona.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class ZonasService {

    constructor(
        @InjectRepository(Zona)
        private zonaRepo: Repository<Zona>
    ){}

    private getSelectQuery(queries: {[name: string]: any}): SelectQueryBuilder<Zona>{
        const { iddistrito, iddepartamento } = queries;
        let query = this.zonaRepo.createQueryBuilder('zona');
        if(iddepartamento != null) query = query.andWhere(`zona.iddepartamento = :iddepartamento`, {iddepartamento});
        if(iddistrito != null) query = query.andWhere(`zona.iddistrito = :iddistrito`, {iddistrito});
        return query;
    }

    findAll(queries: {[name: string]: any}): Promise<Zona[]>{
        return this.getSelectQuery(queries).getMany();
    }
}
