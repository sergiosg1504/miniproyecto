const { UV_FS_O_FILEMAP } = require('constants')
const express = require('express')
const app = express()
const path = require('path')
const nodemailer = require('nodemailer')

// settings
app.set('port', 3000)

// middlewares para acceder a index.html
//app.use(express.static(path.join(__dirname, 'public')))

// routes para navegador
// metodo get para obtener info del servidoor
// primer parametro url a acceder, segundo una funcion
app.get('/', (req, res) => {
    // para enviar info al navegador
    res.send('Bienvenidos')
})

app.listen(app.get('port'), () => {
    console.log(`Aplicacion corriendo en el puerto ${app.get('port')}`)
})


EnviarCorreoConfirmacion();

function EnviarCorreoConfirmacion(callback) 
{
   var transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: "correo",
            pass: "contraseña"
        }
    });

    var mailOptions = {
        from: "correo",
        to: "rob97483@zwoho.com",
        subject: "que se envie",
        text: " responder a "
    };

    transport.sendMail(mailOptions, function (error, info) {
        console.log(msg_str_altervpn_ini);
        if (error) {
            console.log(msg_str_mail_error + msg_str_mail_respu + error);
            callback(true);
        } else {
            console.log(msg_str_mail_envia + msg_str_mail_respu + info.response);
            callback(false);
        }
        console.log(msg_str_altervpn_fin);
    });
};