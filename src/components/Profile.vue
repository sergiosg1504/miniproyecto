<template>
  <div class="todo">
    <button class="perfil" @click="change">Volver al menú principal</button>
    <button class="perfil" id="fileSelect" @click.prevent="cambiarImagen">
      Cambiar foto de perfil
    </button>
    <input
      type="file"
      id="fileElem"
      accept="image/*"
      style="display: none"
      @change="handleFiles"
    />
    <span class="container">
      <img class="imagen" :src="imagen" />
    </span>
    <div>
      <p>Me llamo {{ Name }} {{ Surname }}</p>
      <p>
        Podeis contactar conmigo a través de mi email: {{ Email }} y soy
        {{ Role_Name }}
      </p>
    </div>
  </div>
</template>

<script>
import auth from "../logic/auth";
export default {
  name: "Profile",
  data: () => ({
    user: {},
    imagen: undefined,
    fileList: undefined,
    flag: false,
  }),
  methods: {
    cambiarImagen() {
      const fileSelect = document.getElementById("fileSelect"),
        fileElem = document.getElementById("fileElem");
      fileSelect.addEventListener(
        "click",
        function () {
          if (fileElem) {
            fileElem.click();
          }
        },
        false
      );
    },
    handleFiles(event) {
      this.fileList = event.target.files[0];
      const objectURL = window.URL.createObjectURL(this.fileList);
      this.imagen = objectURL;
      this.flag = true;
    },
    async change() {
      if (this.flag) {
        let data = { email: this.user.email, imagen: this.imagen };
        let aux = await auth.save(data);
        aux = aux.data;
        if (aux.code === 200) {
          alert("Se ha almacenado la foto de perfil");
          this.$router.push({ name: "Home", params: { usuario: this.user } });
        } else {
          alert("No se pudo almancenar la foto de perfil");
          this.$router.push({ name: "Home", params: { usuario: this.user } });
        }
      } else
        this.$router.push({ name: "Home", params: { usuario: this.user } });
    },
  },
  async created() {
    //const imga = document.querySelector(".imagen");
    this.flag = false;
    this.user = this.users;
    let data = { email: this.user.email };
    let aux = await auth.recover(data);
    aux = aux.data;
    if (aux.code === 200) {
      /*let blob = new Blob([aux.datos],{type:"image/png"})
      console.log(blob);
      let f = new File([blob],"imagen",{type:"image/png"})
      console.log(f);
      let src=URL.createObjectURL(f);
      this.imagen=src*/
      if (this.user.role === 1) this.imagen = require("../assets/alumno.png");
      else this.imagen = require("../assets/Profesor.png");
    } else if (aux.code === 400) {
      if (this.user.role === 1) this.imagen = require("../assets/alumno.png");
      else this.imagen = require("../assets/Profesor.png");
    } else console.log("Pues la he liado");
  },
  props: {
    users: Object,
  },
  computed: {
    Name() {
      return this.user.nombre;
    },
    Surname() {
      return this.user.apellidos;
    },
    Email() {
      return this.user.email;
    },
    Role() {
      return this.user.role;
    },
    Role_Name() {
      if (this.user.role === 1) return "Alumno";
      else return "Profesor";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.container {
  height: 100px;
  width: 100px;
}
.todo {
  border-radius: 5px;
  box-shadow: 0 3px 5px 2px rgba(0, 0, 0, 0.3);
  text-align: center;
  margin: 200px auto;
  width: 800px;
  height: 400px;
  padding: 10px;
}
.imagen {
  max-width: 25%;
  max-height: 25%;
  border-radius: 50%;
}
#p {
  max-width: 30%;
  max-height: 30%;
}
button {
  height: 40px;
  border-radius: 20px;
  border: none;
  margin: 3px 10px;
  background: #ecce4d;
  margin: 15px 0;
  color: rgb(37, 34, 34);
  font-family: monospace;
}

.perfil {
  position: absolute;
  top: 40px;
  right: 60px;
}
#fileSelect {
  position: absolute;
  top: 100px;
  right: 60px;
}
</style>
