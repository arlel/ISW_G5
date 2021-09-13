from flask import Flask, redirect, jsonify, request
from werkzeug.exceptions import abort
from Logica_negocio import Gestor_Ciudades, Gestor_Pedidos
import json

app = Flask(__name__)
gestor_ciudades = Gestor_Ciudades.Gestor_ciudades()
gestor_pedidos = Gestor_Pedidos.Gestor_pedidos()


def run():
    app.run()


@app.route('/')
def inicio():
    salida = {"usuario": "Laura Torres"}
    return salida


@app.route('/pedidos/RealizarPedido', methods=['POST'])
def nuevo_pedido():
    # Obtengo el JSON
    pedido = request.get_json()
    if pedido is None:
        return abort(400)
    else:
        return gestor_pedidos.crear_pedido(pedido)


@app.route('/ubicaciones/getCiudades')
def mostrar_ciudades():
    mapc = gestor_ciudades.get_ciudades()
    return jsonify(ciudades=mapc)


# Pruebas:
# Json
@app.route('/pedidos/prueba')
def test():
    texto = "ahhh peeerrrro le aprendi al endpoint"
    return jsonify(texto=texto)


# errores
@app.route('/pedidos/prueba2')
def test2():
    abort(409)
    return "ahhh peeerrrro le aprendi al endpoint"


# Redireccionamiento
@app.route('/pedidos/prueba3')
def test3():
    return redirect("https://http.cat/409")
