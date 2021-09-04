from flask import Flask, redirect, jsonify
from werkzeug.exceptions import abort
from Logica_negocio import GestorCiudades

app = Flask(__name__)
gestorCiudades = GestorCiudades.GestorCiudades()


def run():
    app.run()


@app.route('/')
def inicio():
    salida = {"salida": "funcionando"}
    return salida


# Json
@app.route('/pedidos/prueba')
def test():
    texto = "ahhh peeerrrro le aprendi al endpoint"
    return jsonify(texto)


# errores
@app.route('/pedidos/prueba2')
def test2():
    abort(409)
    return "ahhh peeerrrro le aprendi al endpoint"


# Redireccionamiento
@app.route('/pedidos/prueba3')
def test3():
    return redirect("https://http.cat/409")


@app.route('/pedidos/RealizarPedido', methods=['POST'])
def nuevoPedido():

    return True


@app.route('/ubicaciones/getCiudades')
def mostrarCiudades():
    listaCiudades = gestorCiudades.getCiudades()
    listaCiudades.sort()
    return jsonify(listaCiudades)

