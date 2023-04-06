import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({name: 'vw_resumen_locales', expression: 'SELECT * FROM public.vw_resumen_locales'})
export class ResumenLocalView{

    @ViewColumn()
    cantidad: number;
    
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

}