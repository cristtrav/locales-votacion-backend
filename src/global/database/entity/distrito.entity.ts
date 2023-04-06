import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Distrito{

    @PrimaryColumn()
    id: number;

    @PrimaryColumn({name: 'id_departamento'})
    iddepartamento: number;

    @Column({length: 150, nullable: false})
    nombre: string;

}