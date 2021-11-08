//const { send } = require("emailjs-com");
const express = require("express");
const app = express();
//const path = require('path')
//const nodemailer = require("nodemailer");

// settings
app.set("port", 3000);

// middlewares para acceder a index.html
//app.use(express.static(path.join(__dirname, 'public')))

// routes para navegador
// metodo get para obtener info del servidoor
// primer parametro url a acceder, segundo una funcion
app.get("/", (req, res) => {
  // para enviar info al navegador
  res.send("Bienvenidos");
});

app.listen(app.get("port"), () => {
  console.log(`Aplicacion corriendo en el puerto ${app.get("port")}`);
  //sendEmail(data);
});

/*function sendEmail(data) {
  var transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "correo",
      pass: "contraseña",
    },
  });
  var mailOptions = {
    from: "sergiosg@usal.es",
    to: "robertomergon@usal.es",
    subject: "Please read me ",
    text: "Hola",
  };
  transport.sendMail(mailOptions, function (error) {
    console.log("Enviando correo");
    if (error) {
      console.log("Envio fallido");
      callback(true);
      return 400;
    } else {
      console.log("Envio correcto");
      callback(false);
      return 200;
    }
  });
}*/
