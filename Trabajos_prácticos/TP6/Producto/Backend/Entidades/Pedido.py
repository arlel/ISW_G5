from datetime import datetime


class Pedido:
    id = -1
    descripcion = ''
    imagen = ''
    # direccion del comercio? aca crearia una clase Comercion con direccion y nombre
    comercio = ''
    direccion = ''
    efectivo = False
    monto_total = -1
    # año, mes, dia, hora, minuto, segundo
    fecha_hora = datetime(1, 1, 1, 0, 0, 0)

    def __init__(self, desc, img, com, dire, efect, monto, fh):
        self.descripcion = desc
        self.imagen = img
        self.comercio = com
        self.direccion = dire
        self.efectivo = efect
        self.monto_total = monto
        self.fecha_hora = fh

    def get_id(self):
        return self.id