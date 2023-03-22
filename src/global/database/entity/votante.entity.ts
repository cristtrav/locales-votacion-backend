import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Votante{
    @PrimaryColumn()
    ci: number;

    @Column({length: 80, nullable: false})
    nombres: string;

    @Column({length: 80, nullable: false})
    apellidos: string

    @Column({name: 'id_local',nullable: false})
    idLocal: number;
}