import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Local{
    @PrimaryColumn()
    id: number;
    
    @Column({length: 200, nullable: false})
    nombre: string;
}