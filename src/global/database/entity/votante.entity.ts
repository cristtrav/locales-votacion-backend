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
    idlocal: number;

    @Column({name: 'id_zona', nullable: false})
    idzona: number;

    @Column({name: 'id_distrito', nullable: false})
    iddistrito: number;

    @Column({name: 'id_departamento', nullable: false})
    iddepartamento: number;
}