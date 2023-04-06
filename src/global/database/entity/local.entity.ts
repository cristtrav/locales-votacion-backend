import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Local{
    @PrimaryColumn()
    id: number;
    
    @Column({length: 200, nullable: false})
    nombre: string;

    @Column({name: 'id_zona', nullable: false})
    idzona: number;

    @Column({name: 'id_distrito', nullable: false})
    iddistrito: number;

    @Column({name: 'id_departamento', nullable: false})
    iddepartamento: number;
}