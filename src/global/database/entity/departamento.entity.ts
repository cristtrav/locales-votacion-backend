import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Departamento{

    @PrimaryColumn()
    id: number;

    @Column({length: 100, nullable: false})
    nombre: string;

}