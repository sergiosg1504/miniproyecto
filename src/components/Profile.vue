<template>
  <div class="todo">
    <button class="perfil" @click="change">Volver al menú principal</button>
    <button class="perfil" id="fileSelect" @click.prevent="cambiarImagen">
      Cambiar foto de perfil
    </button>
    <input type="file" id="fileElem" accept="image/*" style="display: none" />
    <span class="container">
      <img
        class="imagen"
        id="alumno"
        src="../assets/alumno.png"
        v-if="Role === 1"
        @change="showImage"
      />
      <img
        class="imagen"
        id="profesor"
        src="@/assets/Profesor.png"
        v-if="Role === 2"
        @change="showImage"
      />
    </span>
    <div>
      <p>Me llamo {{ Name }} {{ Surname }}</p>
      <p>
        Podeis contactar conmigo a través de mi email: {{ Email }} y mi rol es
        {{ Role_Name }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data: () => ({
    user: {},
    imagen: undefined,
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
      this.handleFiles();
    },
    handleFiles() {
      let setter;
      if (this.user.role === 1) {
        setter = document.getElementById("alumno");
      } else {
        setter = document.getElementById("profesor");
      }
      console.log(setter);
    },
    showImage() {
      let setter;
      if (this.user.role === 1) {
        setter = document.getElementById("alumno");
      } else {
        setter = document.getElementById("profesor");
      }
      console.log(setter);
    },
    change() {
      this.$router.push({ name: "Home", params: { usuario: this.user } });
    },
  },
  created() {
    this.user = this.users;
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
