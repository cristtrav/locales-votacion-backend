import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({name: 'vw_resumen_locales', expression: 'SELECT * FROM public.vw_resumen_locales'})
export class ResumenLocalView{

    @ViewColumn()
    id: number;

    @ViewColumn()
    local: string;

    @ViewColumn()
    cantidad: number;

}