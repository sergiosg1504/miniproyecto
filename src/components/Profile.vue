<template>
  <div class="todo">
    <span class="container">
      <img class="imagen" src="../assets/alumno.png" v-if="user.role === 1" />
      <img
        class="imagen"
        id="p"
        src="@/assets/Profesor.png"
        v-if="user.role === 2"
      />
    </span>
    <div>
      <p>Me llamo {{ name }} {{ surname }}</p>
      <p>
        Podeis contactar conmigo a través de mi email: {{ email }} y mi rol es
        {{ role }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data: () => ({}),
  methods: {},
  props: {
    user: Object,
  },
  computed: {
    name() {
      return this.user.nombre;
    },
    surname() {
      return this.user.apellidos;
    },
    email() {
      return this.user.email;
    },
    role() {
      return this.user.role;
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
</style>
