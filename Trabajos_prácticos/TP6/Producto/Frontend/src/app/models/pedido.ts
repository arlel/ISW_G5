import { Direccion } from "./direccion";

export class Pedido{
    Descripcion: string;
    Imagen: File;
    Comercio: Direccion;
    Domicilio: Direccion;
    Efectivo: boolean;
    MontoEfectivo: number;
    FechaHora: string;
}