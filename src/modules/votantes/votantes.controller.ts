import { VotanteLocal } from '@database/entity/votante-local.entity';
import { Votante } from '@database/entity/votante.entity';
import { VotanteView } from '@database/views/votante.view';
import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { VotanteService } from './votantes.service';

@Controller('votantes')
export class VotantesController {

    constructor(
        private votantesSrv: VotanteService
    ){}

    @Get()
    findAll(
        @Query() queries: {[name: string]: any}
    ): Promise<Votante[]>{
        return this.votantesSrv.findAll(queries);
    }

    @Get('count')
    count(
        @Query() queries: {[name: string]: any}
    ){
        return this.votantesSrv.count(queries);
    }

    @Get(':ci/posibles')
    getPosibles(
        @Param('ci') ci: number
    ): Promise<Votante[]>{
        return this.votantesSrv.findPosiblesByCi(ci);
    }

    @Post(':ci/posibles')
    async add(
        @Param('ci') ciCarga: number,
        @Body() votanteLocal: { ciVotante: number }
    ){
        await this.votantesSrv.add(ciCarga, votanteLocal.ciVotante);
    }

    @Delete(':ciCarga/posibles/:ciVotante')
    async delete(
        @Param('ciCarga') ciCarga: number,
        @Param('ciVotante') ciVotante: number
    ){
        await this.votantesSrv.delete(ciCarga, ciVotante)
    }

    @Get(':ci')
    findByCi(
        @Param('ci') ci: number
    ): Promise<Votante>{
        return this.votantesSrv.findByCi(ci);
    }

    


}
