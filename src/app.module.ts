import { Local } from '@database/entity/local.entity';
import { Votante } from '@database/entity/votante.entity';
import { VotanteView } from '@database/views/votante.view';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VotanteModule } from './modules/votante/votante.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PGHOST,
      port: Number(process.env.PGPORT),
      database: process.env.PGDATABASE,
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      entities: [
        Local, Votante, VotanteView
      ]

    }),
    VotanteModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
