from datetime import datetime, timedelta, time

from Entidades import Pedido, Direccion


class Gestor_pedidos:
    desc = None
    img = None
    com = None
    dire = Direccion.Direccion(None, None, None, None)
    efectivo = None
    monto = None
    fh = None

    def crear_pedido(self, json):
        print(json)
        self.desc = json["descripcion"]
        self.img = json["imagen"]
        self.com = json["comercio"]
        self.dire = json["direccion"]
        self.efectivo = json["efectivo"]
        self.monto = json["monto_total"]
        self.fh = json["fecha_hora"]
        # convertir el json a un datetime que lo tome bien, es decir separar
        # self.fh = datetime(self.fh[0:1])
        # validaciones
        if self.validar_desc() and self.validar_monto() \
                and self.validar_fecha():
            # si salio bien retorna un positivo, sino negativo
            pedido = Pedido.Pedido(self.desc, self.img, self.com, self.dire,
                                   self.efectivo, self.monto, self.fh)
            return pedido.get_id()
        return -1

    def validar_desc(self):
        if self.desc.length < 5:
            # print("¡La descripción debe tener como mínimo 5 carácteres!")
            return False
        elif self.desc.leghth > 240:
            # print("¡La descripción debe tener como máximo 240 carácteres!")
            return False

    def validar_imagen(self):
        return

    def validar_comercio(self):
        return

    def validar_direccion(self):
        return

    def validar_efectivo(self):
        return

    # Valida que sea positivo el valor del monto, si es positivo, retorna true
    def validar_monto(self):
        if self.monto >= 0:
            return True
        else:
            return False

    def validar_fecha(self):
        print(self.fh)
        now = datetime.now()
        # si el pedido es para antes de ahora
        if self.fh <= now + timedelta(minutes=59):
            return False
        # si la fecha_y_hora de de entrega es mayor a 1 semana
        if self.fh > now + timedelta(days=7):
            return False
        minimo = time(hour=8)
        # maximo = time.max()
        if self.fh.time() < minimo or self.fh.time != time(0):
            return False
        return True
