from datetime import date
from datetime import datetime
from datetime import timedelta

from Entidades import Pedido


class Gestor_pedidos:
    desc = None
    img = None
    com = None
    dire = None
    efectivo = None
    monto = None
    fh = None

    def crear_pedido(self, json):
        self.desc = json["descripcion"]
        self.img = json["imagen"]
        self.com = json["comercio"]
        self.dire = json["direccion"]
        self.efectivo = json["efectivo"]
        self.monto = json["monto_total"]
        self.fh = json["fecha_hora"]
        # convertir el json a un datetime que lo tome bien, es decir separar
        self.fh = datetime(self.fh[0:1])
        # validaciones

        # si salio bien retorna un positivo, sino negativo
        pedido = Pedido(self.desc, self.img, self.com, self.dire,
                        self.efectivo, self.monto, self.fh)
        return pedido.get_id()

    def validar_desc(self):
        if self.desc.length < 5:
            print("¡La descripción debe tener como mínimo 5 carácteres!")
            return
        elif self.desc.leghth > 240:
            print("¡La descripción debe tener como máximo 240 carácteres!")
            return

    def validar_imagen(self):
        return

    def validar_comercio(self):
        return

    def validar_direccion(self):
        return

    def validar_efectivo(self):

        if self.efectivo:
            return
        else:
            return

# Valida que sea positivo el valor del monto, si es positivo, retorna true
    def validar_monto(self):
        if self.monto >= 0:
            return True
        else:
            return False

    def validar_fecha(self):
        now = datetime.now()
        if self.fh <= now:
            return False

        if now.date() == self.fh.date():
            if now.time() <= self.fh.time():
                return


'''        
        if self.fh.datetime <= now + timedelta(minutes=59) and\
                self.fh.datetime.day == datetime.today():
            print("El pedido debe ser entregado como mínimo dentro de 1 hora")
            return
        elif self.fh.datetime > now + timedelta(days=7):
            print("El pedido debe ser entregado como máximo en una semana")
            return
'''

