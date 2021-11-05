import flask
from flask import request, jsonify
from flask_cors import CORS

import mysql.connector


app = flask.Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config["DEBUG"] = True

config = {
    "host": "localhost",
            "user": "root",
            "passwd": "",
            "database": 'users'
}


@app.route("/register", methods=["POST"])
def register():
    request_data = request.get_json()
    param = dict(request_data)
    try:
        con = mysql.connector.connect(**config)
    except mysql.connector.Error as err:
        js = {"msg": "Un error ha ocurrido en la conexión a la base de datos", "code": 500}
        return jsonify(js)
    email = param['email']
    cursor = con.cursor(buffered=True)
    query = "Select * FROM users WHERE email='{}'".format(email)
    cursor.execute(query)
    results = cursor.fetchone()
    if results:
        con.close()
        cursor.close()
        js = {"msg": "El usuario ya existe en la bd", "code": 409}
        return jsonify(js)
    else:
        query_2 = "INSERT INTO users(name,surnames,role,email,password) values('{}','{}',{},'{}','{}')".format(
            param['nombre'], param['apellidos'], param['role'], param['email'], param['password'])
        try:
            cursor.execute(query_2)
            con.commit()
            js = {"msg": "El usuario se ha registrado en la base de datos", "code": 200}
            con.close()
            cursor.close()
            return jsonify(js)
        except mysql.connector.Error as err:
            js = {
                "msg": "Un error ha ocurrido al registrar en la base de datos: " + err.msg, "code": 500}
            con.close()
            cursor.close()
            return jsonify(js)


@app.route("/login", methods=["POST"])
def login():
    request_data = request.get_json()
    param = dict(request_data)
    try:
        con = mysql.connector.connect(**config)
    except mysql.connector.Error as err:
        js = {"msg": "Un error ha ocurrido en la conexión a la base de datos", "code": 500}
        return jsonify(js)
    email = param["email"]
    cursor = con.cursor(buffered=True)
    query = "Select * FROM users WHERE email='{}'".format(email)
    cursor.execute(query)
    results = cursor.fetchone()
    if not results:
        con.close()
        cursor.close()
        js = {"msg": "El usuario no existe en la bd", "code": 500}
        return jsonify(js)
    else:
        if param["email"] == results[4] and param["password"] == results[5]:
            query_2 = "INSERT INTO logins(id_user) VALUES({})".format(
                results[0])
            try:
                cursor.execute(query_2)
                con.commit()
                cursor.close()
                con.close()
                results = list(results)
                results.remove(results[5])
                js = {"msg": "Los datos de login son correctos",
                      "code": 200, "datos": results}
                return jsonify(js)
            except mysql.connector.Error as err:
                js = {"msg": "Ha ocurrido un error interno ", "code": 500}
                con.close()
                cursor.close()
                return jsonify(js)
        else:
            js = {"msg": "Los datos de login son incorrectos", "code": 400}
            return jsonify(js)


@app.route("/logout", methods=["POST"])
def logout():
    request_data = request.get_json()
    param = dict(request_data)
    try:
        con = mysql.connector.connect(**config)
    except mysql.connector.Error as err:
        js = {"msg": "Un error ha ocurrido en la conexión a la base de datos", "code": 500}
        return jsonify(js)
    email = param["email"]
    cursor = con.cursor()
    query = "Select * FROM users WHERE email='{}'".format(email)
    cursor.execute(query)
    results = cursor.fetchone()
    if not results:
        con.close()
        cursor.close()
        js = {"msg": "El usuario no existe en la bd", "code": 400}

        return jsonify(js)
    else:
        if param["email"] == results[4] and param["password"] == results[5]:
            query_2 = "DELETE FROM logins WHERE id_user = {}".format(
                results[0])
            try:
                cursor.execute(query_2)
                con.commit()
                js = {"msg": "Se ha hecho el logout correctamente", "code": 200}
                con.close()
                cursor.close()
                return jsonify(js)
            except mysql.connector.Error as err:
                js = {
                    "msg": "Un error interno ha ocurrido al hacer el logout", "code": 500}

                con.close()
                cursor.close()
                return jsonify(js)
        else:
            js = {"msg": "Los datos no coinciden", "code": 400}

            con.close()
            cursor.close()
            return jsonify(js)


@app.route("/retrieve", methods=["GET"])
def retrieve():
    param = request.args
    if "id" in param:
        id = int(param['id'])
        try:
            con = mysql.connector.connect(**config)
        except mysql.connector.Error as err:
            js = {
                "msg": "Un error ha ocurrido en la conexión a la base de datos", "code": 500}
            con.close()
            cursor.close()
            return jsonify(js)
        cursor = con.cursor()
        try:
            query = "Select * FROM users WHERE id ={}".format(id)
            cursor.execute(query)
            result = cursor.fetchone()
            js = {"msg": "Usuario encontrado", "code": 200, "datos": {
                "nombre": result[1],
                "apellidos": result[2],
                "email": result[4],
                "role": result[3]
            }}
            return jsonify(js)
        except mysql.connector.Error as err:
            js = {"msg": "La id no está registrada en la base de datos", "code": 400}
            con.close()
            cursor.close()
            return jsonify(js)
    else:
        js = {"msg": "No se ha enviado una id", "code": 500}
        return jsonify(js)


@app.route("/retrieve_all", methods=["GET"])
def retrieve_all():
    try:
        con = mysql.connector.connect(**config)
    except mysql.connector.Error as err:
        js = {"msg": "Un error ha ocurrido en la conexión a la base de datos", "code": 500}
        return jsonify(js)
    cursor = con.cursor()
    cursor.execute("SELECT * FROM users")
    results = cursor.fetchall()
    if results:
        aux2 = []
        for items in results:
            i = 0
            aux = {}
            while i < 6:
                for item in items:
                    aux[cursor.description[i][0]] = item
                    i += 1
                aux2.append(aux)
        aux.pop("password")
        js = {"msg": "Usuarios encontrados", "code": 200, "lista": aux2}
        con.close()
        cursor.close()
        return jsonify(js)
    else:
        js = {"msg": "No hay usuarios registrados en la base de datos", "code": 200}
        con.close()
        cursor.close()
        return jsonify(js)


@app.route("/update", methods=["POST"])
def update():
    request_data = request.get_json()
    param = dict(request_data)
    arg = request.args
    if "id" not in arg:
        js = {"msg": "No se ha enviado una id", "code": 500}
        return jsonify(js)
    else:
        try:
            con = mysql.connector.connect(**config)
        except mysql.connector.Error as err:
            js = {
                "msg": "Un error ha ocurrido en la conexión a la base de datos" + err.msg, "code": 500}
            return jsonify(js)
        cursor = con.cursor()
        if len(param) != 4:
            js = {"msg": "No se han recibido todos los datos correctamente", "code": 400}
            con.close()
            cursor.close()
            return jsonify(js)
        else:
            query = "UPDATE users SET name='{}', surnames='{}', email='{}', role={} WHERE id={}".format(
                param["nombre"], param["apellidos"], param["email"], param["role"], arg["id"])
            try:
                cursor.execute(query)
                con.commit()
            except mysql.connector.Error as err:
                js = {"msg": "Error al actualizar la base de datos" +
                      err.msg, "code": 500}
                con.close()
                cursor.close()
                return jsonify(js)
            js = {"msg": "usuario actualizado correctamente", "code": 200}
            con.close()
            cursor.close()
            return jsonify(js)


@app.route("/delete", methods=["GET"])
def delete():
    param = request.args
    if "id" not in param:
        js = {"msg": "No se ha enviado una id", "code": 500}
        return jsonify(js)
    else:
        try:
            con = mysql.connector.connect(**config)
        except mysql.connector.Error as err:
            js = {
                "msg": "Un error ha ocurrido en la conexión a la base de datos", "code": 500}
            return jsonify(js)
        cursor = con.cursor(buffered=True)
        cursor.execute("SELECT * FROM users WHERE id = {}".format(param["id"]))
        if cursor.arraysize != 0:
            try:
                cursor.execute(
                    "DELETE FROM logins WHERE id_user={}".format(param["id"]))
                con.commit()
            except mysql.connector.Error as err:
                js = {"msg": "Usario eliminado no habia hecho login", "code": 500}

            try:
                cursor.execute(
                    "DELETE FROM users WHERE id={}".format(param["id"]))
                con.commit()
            except mysql.connector.Error as err:
                js = {"msg": "Error interno en la eliminación del usuario", "code": 500}
                con.close()
                cursor.close()
                return jsonify(js)

            js = {"msg": "Usuario eliminado correctamente", "code": 200}
            con.close()
            cursor.close()
            return jsonify(js)
        else:
            js = {"msg": "La id no está registrada en la base de datos", "code": 400}
            con.close()
            cursor.close()
            return jsonify(js)


@app.route("/check_email", methods=["POST"])
def check_email():
    request_data = request.get_json()
    param = dict(request_data)
    try:
        con = mysql.connector.connect(**config)
    except mysql.connector.Error as err:
        js = {"msg": "Un error ha ocurrido en la conexión a la base de datos", "code": 500}
        return jsonify(js)
    email = param["email"]
    cursor = con.cursor()
    query = "Select * FROM users WHERE email='{}'".format(email)
    cursor.execute(query)
    results = cursor.fetchone()
    if not results:
        con.close()
        cursor.close()
        js = {"msg": "El usuario no existe en la bd", "code": 400}
        return jsonify(js)
    else:
        con.close()
        cursor.close()
        js = {"msg": "El email esta registrado", "code": 200}
        return jsonify(js)


@app.route("/update_password", methods=["POST"])
def update_password():
    request_data = request.get_json()
    param = dict(request_data)
    arg = request.args
    try:
        con = mysql.connector.connect(**config)
    except mysql.connector.Error as err:
        js = {
            "msg": "Un error ha ocurrido en la conexión a la base de datos" + err.msg, "code": 500}
        return jsonify(js)
    cursor = con.cursor()
    query = "UPDATE users SET password='{}' WHERE email='{}'".format(
        param["password"], param["email"])
    try:
        cursor.execute(query)
        con.commit()
    except mysql.connector.Error as err:
        js = {"msg": "Error al actualizar la base de datos" +
              err.msg, "code": 500}
        con.close()
        cursor.close()
        return jsonify(js)
    js = {"msg": "usuario actualizado correctamente", "code": 200}
    con.close()
    cursor.close()
    return jsonify(js)


@app.route("/save_image", methods=["POST"])
def save_Image():
    request_data = request.get_json()
    param = dict(request_data)
    try:
        con = mysql.connector.connect(**config)
    except mysql.connector.Error as err:
        js = {
            "msg": "Un error ha ocurrido en la conexión a la base de datos" + err.msg, "code": 500}
        return jsonify(js)
    cursor = con.cursor()
    query = "UPDATE users SET Profile_Image='{}' WHERE email='{}'".format(
        param["imagen"], param["email"])
    try:
        cursor.execute(query)
        con.commit()
    except mysql.connector.Error as err:
        js = {"msg": "Error al actualizar la base de datos" +
              err.msg, "code": 500}
        con.close()
        cursor.close()
        return jsonify(js)
    js = {"msg": "Foto de perfil almacenada correctamente", "code": 200}
    con.close()
    cursor.close()
    return jsonify(js)


@app.route("/recover_image", methods=["POST"])
def recover_image():
    request_data = request.get_json()
    param = dict(request_data)
    try:
        con = mysql.connector.connect(**config)
    except mysql.connector.Error as err:
        js = {
            "msg": "Un error ha ocurrido en la conexión a la base de datos" + err.msg, "code": 500}
        return jsonify(js)
    cursor = con.cursor()
    query = "SELECT profile_image from USERS WHERE email='{}'".format(
        param["email"])
    try:
        cursor.execute(query)
        results = cursor.fetchone()
        if results:
            if results[0]:
                print(results[0])
                js = {"msg": "Foto recuperada correctamente",
                      "code": 200, "datos": results[0]}
                con.close()
                cursor.close()
                return jsonify(js)
            else:
                js = {"msg": "No hay foto de perfil almacenada", "code": 400}
                con.close()
                cursor.close()
                return jsonify(js)
    except mysql.connector.Error as err:
        js = {"msg": "Error interno" +
              err.msg, "code": 500}
        con.close()
        cursor.close()
        return jsonify(js)


app.run(host="0.0.0.0")
