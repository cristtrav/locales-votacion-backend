import { Module } from '@nestjs/common';
import { DepartamentosController } from './departamentos.controller';
import { DepartamentosService } from './departamentos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Departamento } from '@database/entity/departamento.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Departamento])
  ],
  controllers: [DepartamentosController],
  providers: [DepartamentosService]
})
export class DepartamentosModule {}
