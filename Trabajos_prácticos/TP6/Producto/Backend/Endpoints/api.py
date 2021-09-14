from datetime import timedelta
from functools import update_wrapper

from flask import Flask, redirect, jsonify, request, make_response, current_app
from werkzeug.exceptions import abort
from Logica_negocio import Gestor_Ciudades, Gestor_Pedidos
import json

app = Flask(__name__)
gestor_ciudades = Gestor_Ciudades.Gestor_ciudades()
gestor_pedidos = Gestor_Pedidos.Gestor_pedidos()


@app.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Headers', 'Cache-Control')
    response.headers.add('Access-Control-Allow-Headers', 'X-Requested-With')
    response.headers.add('Access-Control-Allow-Headers', 'Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
    return response


def run():
    app.run()


@app.route('/')
def inicio():
    salida = {"usuario": "Laura Torres"}
    return salida


@app.route('/pedidos/RealizarPedido', methods=['POST', 'OPTIONS'])
def nuevo_pedido():
    if request.method == 'OPTIONS':
        return make_response("ok", 200)
    # Obtengo el JSON
    pedido = request.get_json()
    if pedido is None:
        return abort(400)
    else:
        return make_response(str(gestor_pedidos.crear_pedido(pedido)), 202)


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
