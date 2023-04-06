import { Module } from '@nestjs/common';
import { ZonasService } from './zonas.service';
import { ZonasController } from './zonas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Zona } from '@database/entity/zona.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Zona])
  ],
  providers: [ZonasService],
  controllers: [ZonasController]
})
export class ZonasModule {}
