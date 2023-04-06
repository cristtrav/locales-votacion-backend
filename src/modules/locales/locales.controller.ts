import { ResumenLocalView } from '@database/views/resumen-local.view';
import { Controller, Get, Query } from '@nestjs/common';
import { LocalesService } from './locales.service';

@Controller('locales')
export class LocalesController {

    constructor(
        private localesSrv: LocalesService
    ){}

    @Get('resumen')
    findAllResumen(
        @Query() queries: {[name: string]: any}
    ): Promise<ResumenLocalView[]>{
        return this.localesSrv.findAllResumen(queries);
    }

}
