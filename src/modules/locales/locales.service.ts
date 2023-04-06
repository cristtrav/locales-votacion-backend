import { ResumenLocalView } from '@database/views/resumen-local.view';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class LocalesService {

    constructor(
        @InjectRepository(ResumenLocalView)
        private resumenLocalViewRepo: Repository<ResumenLocalView>
    ){}

    private getSelectQueryResumen(queries: {[name: string]: any}): SelectQueryBuilder<ResumenLocalView>{
        const { iddepartamento, iddistrito, idzona, sort } = queries;
        let query = this.resumenLocalViewRepo.createQueryBuilder('resumen');
        if(iddepartamento != null) query = query.andWhere(`resumen.iddepartamento = :iddepartamento`, { iddepartamento });
        if(iddistrito != null) query = query.andWhere(`resumen.iddistrito = :iddistrito`, {iddistrito});
        if(idzona != null) query = query.andWhere(`resumen.idzona = :idzona`, {idzona});
        
        if(sort){
            const sortColumn = sort.substring(1);
            const sortOrder: 'ASC' | 'DESC' = sort.charAt(0) === '-' ? 'DESC' : 'ASC';
            query = query.orderBy(`resumen.${sortColumn}`, sortOrder);
        }
        return query;
    }

    findAllResumen(queries: {[name: string]: any}): Promise<ResumenLocalView[]>{
        return this.getSelectQueryResumen(queries).getMany();
    }

}
