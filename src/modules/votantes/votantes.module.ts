import { Module } from '@nestjs/common';
import { VotanteService } from './votantes.service';
import { VotantesController } from './votantes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Votante } from '@database/entity/votante.entity';
import { VotanteView } from '@database/views/votante.view';
import { VotanteLocal } from '@database/entity/votante-local.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Votante, VotanteView, VotanteLocal])
  ],
  providers: [VotanteService],
  controllers: [VotantesController]
})
export class VotanteModule {}
