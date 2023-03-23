import { ResumenLocalView } from '@database/views/resumen-local.view';
import { Controller, Get } from '@nestjs/common';
import { LocalesService } from './locales.service';

@Controller('locales')
export class LocalesController {

    constructor(
        private localesSrv: LocalesService
    ){}

    @Get('resumen')
    findAllResumen(): Promise<ResumenLocalView[]>{
        return this.localesSrv.findAllResumen();
    }

}
