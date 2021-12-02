<template>
  <div id="#app">
    <div><navigation-bar /></div>
    <div class="main-container">
      <a href="/home" class="btn btn-secondary float-right">
        <!--<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-arrow-left fa-w-14">
                    <path fill="currentColor" d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z" class=""/>
                  </svg>-->
        Back to modules
      </a>
      <h4>Seminarios web</h4>
      <div class="sem">
        <div class="aviso">
          <div>
            <img class="imagen" src="../images/info.png" />
          </div>
          <div>
            ¡Puede celebrar un seminario web gratuito de 30 minutos hoy en
            <a href="https://on.zoom.us/">OnZoom</a>! Póngase en contacto con su
            administrador de TI para que le habilite como anfitrión.
            <br />Obtenga más información sobre cómo empezar
            <a
              href="https://support.zoom.us/hc/en-us/
            articles/360049497492-Getting-started-with-hosting-OnZoom-events"
              >aquí</a
            >
          </div>
        </div>
        <div class="parrafo">
          <p class="titulo_op">¿Qué es un seminario web?</p>
          <p style="align-left">
            Los seminarios web de vídeo de Zoom le permite realizar con
            facilidad grandes eventos en línea con vídeo, audio y pantalla
            compartida con hasta 100 participantes de vídeo y 10 000 asistentes
            Las funciones en los seminarios web están adaptadas para grandes
            audiencias con marcación, inscripción, controles de anfitrión,
            encuestas, pregunta y respuesta, levantar la mano, chat, grabación e
            información Monetizar sus seminarios web con nuestra integración de
            Paypal (<a
              href="https://usal-es.zoom.us/zendesk/sso?return_to=https://
            support.zoom.us/hc/es/articles/205260649-How-To-Use-Zapier"
            >
              a través de Zapier</a
            >)
          </p>
        </div>
        <div class="parrafo">
          <p class="titulo_op">¿Qué es un seminario web?</p>
          <p style="align-left">
            El seminario web se puede agregar a cualquier plan pago, como Pro,
            Business o Edu Diríjase a su plan adicional de seminarios web o
            contacte a su representante de ventas
          </p>
        </div>
        <div class="parrafo">
          <p class="titulo_op">¿Cómo comienzo?</p>
          <p style="align-left">
            En la página de Administración de usuario, el administrador puede
            habilitar seminarios web para determinados usuarios con Editar
            usuario
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";

export default {
  components: { NavigationBar },
};
</script>

<style scoped>
/* Estilos de progradum*/
#app {
  font-family: Myriad Pro Regular, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f2f2f2;
  height: 100vh;
}
#app > .bg-white .main-container {
  max-width: 100%;
  float: none;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 0.7rem;
}
#app h4 {
  text-align: left;
  border-bottom: 5px solid;
  padding-bottom: 10px;
  margin-bottom: 35px;
}
h4,
.h4 {
  font-size: calc(1.275rem + 0.3vw);
}
h6,
.h6,
h5,
.h5,
h4,
.h4,
h3,
.h3,
h2,
.h2,
h1,
.h1 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-weight: 500;
  line-height: 1.2;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  color: #13283b;
  text-align: left;
  font-weight: bold !important;
}
.align-left {
  text-align: left !important;
  color: #212529;
}
.btn-secondary:hover {
  color: #fff;
  background-color: #5c636a;
  border-color: #565e64;
}
.btn:hover {
  color: #212529;
}
.btn:hover,
a:hover {
  opacity: 0.8;
}
a:hover {
  color: #0a58ca;
}
a:hover {
  cursor: pointer;
}
.btn-secondary {
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
}
.btn {
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.float-right {
  float: right;
}
.btn-secondary {
  color: #62c4e4 !important;
  background-color: transparent !important;
  border-color: transparent !important;
  font-weight: bold !important;
}
a {
  color: #0d6efd;
  text-decoration: underline;
}
*,
::before,
::after {
  box-sizing: border-box;
}
/* Otros estilos */
.aviso {
  margin: 20px 12% 0 12%;
  text-align: center;
  padding: 10px;
  border: solid lightgray;
  float: left;
  background: rgb(238, 233, 233);
  width: 75%;
  height: 160px;
}
.titulo_op {
  margin: 50px 0 10px 0;
  text-align: left;
  font-weight: bold;
}
.sem {
  margin: 0 40px;
}
.parrafo {
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
}
.imagen {
  width: 60px;
  height: 60px;
}
a {
  text-decoration-line: none;
}

/* Estilos de navegacion*/
.header {
  padding: 20px;
  text-align: center;
  background: white;
  color: #4cc4ec;
  font-size: 40px;
  font-family: Georgia, "Times New Roman", Times, serif;
  box-shadow: 0 0 0 2px #4cc4ec;
}
</style>
