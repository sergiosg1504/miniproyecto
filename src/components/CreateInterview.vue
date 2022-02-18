<template>
  <v-app class="form-container technologiesStyle">
    <form action class="form" @submit.prevent="createPosition">
      <!--<div class="col-sm-12">
        <div class="col-sm-3" />
        <div class="col-sm-6">
          <div class="form-group">
            <label>API Key</label>
            <input
              class="form-input aux"
              type="text"
              id="APIKey"
              v-model="newPosition.APIKey"
              required
            />
          </div>
        </div>
      </div>-->

      <div class="col-sm-12">
        <div class="col-sm-6">
          <div class="form-group">
            <label>Name</label>
            <input
              class="form-input aux"
              type="text"
              id="name"
              v-model="newPosition.name"
            />
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group">
            <label>Intro video</label>
            <input
              class="form-input aux no-border"
              type="file"
              accept="video/*"
              id="video"
              @change="onFileChange"
            />
          </div>
        </div>
      </div>

      <div class="col-sm-12">
        <button type="button" class="btn btn-primary" @click="addQuestion()">
          +
        </button>
      </div>

      <div class="col-sm-12">
        <div class="col-sm-6">
          <div class="form-group">
            <label>Question 1 name</label>
            <input
              class="form-input aux"
              type="text"
              v-model="newPosition.questions[0].title"
            />
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group">
            <label>Question 1 video</label>
            <input
              class="form-input aux no-border"
              type="file"
              accept="video/*"
              @change="onFileChangeQuestions"
            />
          </div>
        </div>
      </div>

      <div class="col-sm-12">
        <div class="col-sm-6">
          <div class="form-group">
            <label>Question 1 description</label>
            <input
              class="form-input aux"
              type="text"
              v-model="newPosition.questions[0].description"
            />
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group">
            <button
              type="button"
              class="btn btn-primary puntero"
              @click="remove()"
            >
              Remove question 1
            </button>
          </div>
        </div>
      </div>

      <div id="hijo"></div>

      <div class="col-sm-12">
        <div class="col-sm-3" />
        <div class="col-sm-6">
          <input
            class="btn btn-primary form-submit"
            type="submit"
            value="Create"
          />
        </div>
      </div>
    </form>
  </v-app>
</template>

<script>
import { CREATE_POS } from "../graphql/queries/me/interviews";
export default {
  components: {},
  data() {
    return {
      questionNum: 0,
      newPosition: {
        name: "",
        // varialbe para el video
        questions: [
          {
            title: "",
            description: "",
            media: {
              file: "https://www.youtube.com/watch?v=OYGot5tm49A",
            },
          },
        ],
        /*intro: {
          file: "",
        },*/
      }, // No hace falta crear los atributos se añaden dinamicamente haciendoles referencia en los inputs pero solo se puede hacer en primer nivel del arbol no puedes hacer al menos manualmente no se en inputs x.y.z, tiene que ser x.y = {z}
    };
  },
  created() {
    this.questionNum = 0;
    /*this.agregar = document.getElementById("add_question");
    this.contenido = document.getElementById("contenedor");
    this.agregar.addEventListener("click", (e) => {
      e.preventDefault();
      this.questionNum++;
      let contenido = document.getElementById("contenedor");
      let clonado = document.querySelector(".clonar");
      let clon = clonado.cloneNode(true);
      contenido.appendChild(clon).classList.remove("clonar");
    });
    this.contenido.addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target.classList.contains("puntero")) {
        let contenedor = e.target.parentNode.parentNode;
        contenedor.parentNode.removeChild(contenedor);
      }
    });*/
  },
  methods: {
    // Esto se supone que funcionaría pero el video se tiene que convertir a Blob primero cosa que no se como hacerlo
    onFileChange(e) {
      const formData = new FormData();
      formData.append("intro", e, ".mp4");
      /*const reader = new FileReader();
      reader.onload = (e) => {
        this.newPosition.intro.file = e.target.result;
      };
      reader.readAsBinaryString(formData);*/
    },
    onFileChangeQuestions(e) {
      const num = e.srcElement.id.substring(6, 7); // trataba de asignar dinamicamente l id para luego recuperar el numero de pregunta, pero al hacerlo asi al crear otra se me actualiza y no vale
      console.log(num);
      const reader = new FileReader();
      reader.onload = (e) => {
        this.newPosition.questions[num].media.file = e.target.result;
      };
      reader.readAsBinaryString(e);
    },
    addQuestion() {
      this.questionNum++;
      var newDiv = document.createElement("div");
      newDiv.innerHTML =
        '<div class="col-sm-12"> <div class="col-sm-6"><div class="form-group"><label>Question name ' +
        (this.questionNum + 1) +
        '</label><input class="form-input aux" type="text" v-model="newPosition.questions[' +
        this.questionNum +
        '].title"/></div></div><div class="col-sm-6"><div class="form-group"><label>Question video ' +
        (this.questionNum + 1) +
        '</label><input class="form-input aux no-border" type="file" accept="video/*" @change="onFileChangeQuestions"/></div></div></div><div class="col-sm-12"><div class="col-sm-6"><div class="form-group"><label>Question description ' +
        (this.questionNum + 1) +
        '</label><input class="form-input aux" type="text" v-model="newPosition.questions[' +
        this.questionNum +
        '].description"/></div></div><div class="col-sm-6"><div class="form-group"><button type="button" class="btn btn-primary puntero" @click="remove()">Remove question ' +
        (this.questionNum + 1) +
        "</button></div></div></div>";
      document.getElementById("hijo").appendChild(newDiv);
    },
    createPosition() {
      console.log(this.newPosition);
      this.$apollo
        .mutate({
          mutation: CREATE_POS,
          variables: {
            position: this.newPosition,
          },
        })
        .then(() => {
          alert("Position created successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.no-border {
  border-bottom: 0px;
}
#padre {
}
</style>
