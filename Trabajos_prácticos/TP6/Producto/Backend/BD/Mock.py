def get_ciudades():
    ciudades = {"ciudades":[Ciudad("Cordoba Capital"), Ciudad("Rio Primero"), Ciudad("Villa Carlos Paz")]}
    return ciudades


class Ciudad:
    nombre = ''

    def __init__(self, name):
        self.nombre = name


