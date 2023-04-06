import { Controller, Get, Query } from '@nestjs/common';
import { ZonasService } from './zonas.service';
import { Zona } from '@database/entity/zona.entity';

@Controller('zonas')
export class ZonasController {

    constructor(
        private zonaSrv: ZonasService
    ){}

    @Get()
    findAll(
        @Query() queries: {[name: string]: any}
    ): Promise<Zona[]>{
        return this.zonaSrv.findAll(queries);
    }
}
