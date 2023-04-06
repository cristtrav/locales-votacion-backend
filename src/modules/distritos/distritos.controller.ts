import { Controller, Get, Query } from '@nestjs/common';
import { DistritosService } from './distritos.service';
import { Distrito } from '@database/entity/distrito.entity';

@Controller('distritos')
export class DistritosController {

    constructor(
        private distritosSrv: DistritosService
    ){}

    @Get()
    findAll(
        @Query() queries: {[name: string]: any}
    ): Promise<Distrito[]>{
        return this.distritosSrv.findAll(queries);
    }

}

