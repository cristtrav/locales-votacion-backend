import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Votante } from "./votante.entity";

@Entity()
export class VotanteLocal{
   @PrimaryColumn({name: 'ci_votante_carga'})
   ciVotanteCarga: number;

   @PrimaryColumn({name: 'ci_votante'})
   ciVotante: number
   
   @ManyToOne(()=> Votante)
   @JoinColumn({name: 'ci_votante'})
   votante: Votante;
}