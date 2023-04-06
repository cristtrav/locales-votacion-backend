import { Distrito } from '@database/entity/distrito.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class DistritosService {

    constructor(
        @InjectRepository(Distrito)
        private distritoRepo: Repository<Distrito>
    ){}

    private getSelectQuery(queries: {[name: string]: any}): SelectQueryBuilder<Distrito>{
        const { iddepartamento } = queries;
        let query = this.distritoRepo.createQueryBuilder('distrito');
        if(iddepartamento != null) query = query.andWhere(`distrito.iddepartamento = :iddepartamento`, {iddepartamento});
        return query;
    }

    findAll(queries: {[name: string]: any}): Promise<Distrito[]>{
        return this.getSelectQuery(queries).getMany();
    }
}
