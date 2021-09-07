class Direccion:
    calle = ''
    numero = 0
    ciudad = ''
    referencias = ''

    def __init__(self, Calle: str, Numero: int, Ciudad: str, Referencias: str):
        self.calle = Calle
        self.numero = Numero
        self.ciudad = Ciudad
        self.referencias = Referencias
