import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({name: 'vw_votantes', expression: 'SELECT * FROM public.vw_votante'})
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

    @ViewColumn()
    idzona: number;

    @ViewColumn()
    zona: string;

    @ViewColumn()
    iddistrito: number;

    @ViewColumn()
    distrito: string;

    @ViewColumn()
    iddepartamento: number;

    @ViewColumn()
    departamento: string;

    @ViewColumn()
    agregado: boolean;
}