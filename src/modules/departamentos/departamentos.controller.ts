import { Controller, Get, Query } from '@nestjs/common';
import { DepartamentosService } from './departamentos.service';
import { Departamento } from '@database/entity/departamento.entity';

@Controller('departamentos')
export class DepartamentosController {

    constructor(
        private departamentosSrv: DepartamentosService
    ){}

    @Get()
    findAll(
        @Query() queries: {[name: string]: any}
    ): Promise<Departamento[]>{
        return this.departamentosSrv.findAll(queries);
    }

}
