<template>
  <div id="#app">
    <navigation-bar />
    <div class="main-container">
      <a href="/home" class="btn btn-secondary float-right">
        <font-awesome-icon icon="arrow-left" />
        Back to modules
      </a>
      <h4>Seminarios web</h4>
      <div class="aviso">
        <div>
          <img class="imagen" src="../images/info.png" />
        </div>
        <div>
          ¡Puede celebrar un seminario web gratuito de 30 minutos hoy en
          <a href="https://on.zoom.us/">OnZoom</a>! Póngase en contacto con su
          administrador de TI para que le habilite como anfitrión. <br />Obtenga
          más información sobre cómo empezar
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
          Los seminarios web de vídeo de Zoom le permite realizar con facilidad
          grandes eventos en línea con vídeo, audio y pantalla compartida con
          hasta 100 participantes de vídeo y 10 000 asistentes Las funciones en
          los seminarios web están adaptadas para grandes audiencias con
          marcación, inscripción, controles de anfitrión, encuestas, pregunta y
          respuesta, levantar la mano, chat, grabación e información Monetizar
          sus seminarios web con nuestra integración de Paypal (<a
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
        <p>
          En la página de Administración de usuario, el administrador puede
          habilitar seminarios web para determinados usuarios con Editar usuario
        </p>
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
.parrafo {
  margin: 20px 12% 0 12%;
  padding: 20px 0px 20px 0px;
  text-align: left;
  display: inline-block;
}
.imagen {
  width: 60px;
  height: 60px;
}
a {
  text-decoration-line: none;
}
</style>
