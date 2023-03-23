import { Module } from '@nestjs/common';
import { LocalesService } from './locales.service';
import { LocalesController } from './locales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResumenLocalView } from '@database/views/resumen-local.view';

@Module({
  imports: [
    TypeOrmModule.forFeature([ResumenLocalView])
  ],
  providers: [LocalesService],
  controllers: [LocalesController]
})
export class LocalesModule {}
