import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Zona{

    @PrimaryColumn()
    id: number;

    @PrimaryColumn({name: 'id_distrito'})
    iddistrito: number;

    @PrimaryColumn({name: 'id_departamento'})
    iddepartamento: number;

    @Column({length: 100, nullable: false})
    nombre: string;

}