import { Module } from '@nestjs/common';
import { DistritosService } from './distritos.service';
import { DistritosController } from './distritos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Distrito } from '@database/entity/distrito.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Distrito])
  ],
  providers: [DistritosService],
  controllers: [DistritosController]
})
export class DistritosModule {}
