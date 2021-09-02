import pymongo
from pymongo import MongoClient

cluster = MongoClient("mongodb+srv://Leandro:test123@grupo5db.zgjf7.mongodb.net/Grupo5DB?retryWrites=true&w=majority")

db = cluster["Grupo5DB"]

pedido = db["Pedido"]
forma_de_pago = db["FormaDePago"]
ciudad = db["Ciudad"]


# ACCESO A LA BASE DE DATOS

# ***********************************************************
# Consulta de ciudades

# results = ciudad.find({})
# for result in results:
#	print(result["nombre"])

# ***********************************************************
# Consulta de formas de pago

# results = forma_de_pago.find({})
# for result in results:
#	print(result["nombre"])
	

# ***********************************************************
# Consulta de pedidos

# results = pedido.find({})
# for result in results:
#	print(result["_id"])
#   print(result["ciudad"])
#	print(result["Fecha_y_hora_ejecucion"])
#	print(result["DireccionComercio"])
#	print(result["DireccionEntrega"])
#	print(result["monto"])
#	print(result["pago"])

	
	
# ***********************************************************
# Inserción de un nuevo pedido (el id se genera automáticamente)
# pedido.insert_one({"Fecha_y_hora_ejecucion": "05/04/2021-16:46", "ciudad": "Córdoba","DireccionComercio": "Pueyrredón 60", "DireccionEntrega": "Pueyrredón 350", "monto": 1234.56, "pago":"Efectivo"})


