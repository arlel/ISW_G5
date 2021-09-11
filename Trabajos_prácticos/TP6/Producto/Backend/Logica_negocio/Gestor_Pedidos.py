from datetime import date
from datetime import datetime
from datetime import timedelta

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

    def validar_desc(desc):
        if desc.length < 5:
            print("¡La descripción debe tener como mínimo 5 carácteres!")
            return
        elif desc.leghth > 240:
            print("¡La descripción debe tener como máximo 240 carácteres!")
            return

    def validar_imagen(img):
        return

    def validar_comercio(com):
        return

    def validar_direccion(dire):
        return

    def validar_efectivo(efectivo):
        if efectivo == True:
            def validar_monto(monto):
                if monto != float:
                    print('Ingrese el monto a pagar con números')
                    return
        else:
            return


    def validar_fecha(fh):
        now = datetime.now()
        if fh.datetime <= now + timedelta(minutes=59) and fh.datetime.day == datetime.today():
            print("El pedido debe ser entregado como mínimo dentro de 1 hora")
            return
        elif fh.datetime > now + timedelta(days=7):
            print("El pedido debe ser entregado como máximo en una semana")
            return

        pedido = Pedido(desc, img, com, dire, efectivo, monto, fh)
        return pedido.get_id()
