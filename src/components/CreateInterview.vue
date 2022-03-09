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
      </div>

      <div class="col-sm-12">
        <button type="button" class="btn btn-primary" @click="addQuestion()">
          +
        </button>
      </div>
      <b-pagination
        v-model="newPosition.questions"
        :total-rows="1"
        :per-page="1"
      >
        <div
          class="col-sm-12"
          v-for="item in newPosition.questions"
          v-bind:key="item.id"
        >
          <div class="col-sm-6">
            <div class="form-group">
              <label>Question {{ item.id + 1 }} name</label>
              <input
                class="form-input aux"
                type="text"
                v-model="newPosition.questions[item.id].title"
              />
            </div>
          </div>
          <div class="col-sm-6">
            <div class="form-group">
              <label>Question {{ item.id + 1 }} description</label>
              <input
                class="form-input aux"
                type="text"
                v-model="newPosition.questions[item.id].description"
              />
            </div>
          </div>
          <div class="col-sm-12">
            <div class="col-sm-12">
              <div class="form-group">
                <button
                  type="button"
                  class="btn btn-primary puntero"
                  @click="remove()"
                >
                  Remove question {{ item.id + 1 }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </b-pagination>

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
            id: 0,
            title: "",
            description: "",
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
    let pos = this.newPosition;
    console.log(pos);
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
      let question = {
        id: this.questionNum,
        title: "",
        description: "",
      };
      this.newPosition.questions.push(question);
      console.log(this.newPosition.questions);
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
  computed: {
    qtn: () => {
      let pos = this.newPosition;
      return pos.questions;
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
