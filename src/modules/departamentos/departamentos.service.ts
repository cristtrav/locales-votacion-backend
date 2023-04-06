import { Departamento } from '@database/entity/departamento.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class DepartamentosService {

    constructor(
        @InjectRepository(Departamento)
        private departamentoRepo: Repository<Departamento>
    ){}

    private getSelectQuery(queries: {[name: string]: any}): SelectQueryBuilder<Departamento>{
        const { sort } = queries;
        let query = this.departamentoRepo.createQueryBuilder('departamento');
        if(sort){
            const sortColumn = sort.substring(1);
            const sortOrder: 'ASC' | 'DESC' = sort.charAt(0) === '-' ? 'DESC' : 'ASC';
            query = query.orderBy(`departamento.${sortColumn}`, sortOrder);
        }
        return query;
    }

    findAll(queries: {[name: string]: any}): Promise<Departamento[]>{
        return this.getSelectQuery(queries).getMany();
    }
}
