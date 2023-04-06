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
import { LocalesModule } from './modules/locales/locales.module';
import { ResumenLocalView } from '@database/views/resumen-local.view';
import { Departamento } from '@database/entity/departamento.entity';
import { DepartamentosModule } from './modules/departamentos/departamentos.module';
import { DistritosModule } from './modules/distritos/distritos.module';
import { Distrito } from '@database/entity/distrito.entity';
import { ZonasModule } from './modules/zonas/zonas.module';
import { Zona } from '@database/entity/zona.entity';

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
        Local,
        Votante,
        VotanteView,
        VotanteLocal,
        ResumenLocalView,
        Departamento,
        Distrito,
        Zona
      ]
    }),
    VotanteModule,
    LocalesModule,
    DepartamentosModule,
    DistritosModule,
    ZonasModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
