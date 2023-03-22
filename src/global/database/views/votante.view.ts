import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({name: 'vw_votante', expression: 'SELECT * FROM public.vw_votante'})
export class VotanteView{
    @ViewColumn()
    ci: number

    @ViewColumn()
    nombres: string;

    @ViewColumn()
    apellidos: string

    @ViewColumn()
    idlocal: number;

    @ViewColumn()
    local: string;
}