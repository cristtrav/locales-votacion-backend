import { ResumenLocalView } from '@database/views/resumen-local.view';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LocalesService {

    constructor(
        @InjectRepository(ResumenLocalView)
        private resumenLocalViewRepo: Repository<ResumenLocalView>
    ){}

    findAllResumen(): Promise<ResumenLocalView[]>{
        return this.resumenLocalViewRepo.find();
    }

}
