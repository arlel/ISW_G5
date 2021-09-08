from Entidades import Pedido


class Gestor_pedidos:
    def crear_pedido(self, json):
        desc = json["descripcion"]
        img = json["imagen"]
        com = json["comercio"]
        dire = json["direccion"]
        efectivo = json["efectivo"]
        monto = json["monto_total"]
        fh = json["fecha_hora"]
        # validaciones
        pedido = Pedido(desc, img, com, dire, efectivo, monto, fh)
        return pedido.get_id()
