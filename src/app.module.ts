import { Local } from '@database/entity/local.entity';
import { VotanteLocal } from '@database/entity/votante-local.entity';
import { Votante } from '@database/entity/votante.entity';
import { VotanteView } from '@database/views/votante.view';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VotanteModule } from './modules/votantes/votantes.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({         
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api/(.*)']
    }),
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PGHOST,
      port: Number(process.env.PGPORT),
      database: process.env.PGDATABASE,
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      synchronize: false,
      entities: [
        Local, Votante, VotanteView, VotanteLocal
      ]
    }),
    VotanteModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
