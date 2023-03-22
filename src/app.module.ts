import { Local } from '@database/entity/local.entity';
import { Votante } from '@database/entity/votante.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
        Local, Votante
      ]

    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
