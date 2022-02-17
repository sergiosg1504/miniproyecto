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

      <div id="padre" class="container">
        <div class="col-sm-12">
          <button type="button" class="btn btn-primary" @click="addQuestion()">
            +
          </button>
        </div>
        <div class="clonar">
          <div class="col-sm-12">
            <div class="col-sm-6">
              <div class="form-group">
                <label>Question name</label>
                <input
                  class="form-input aux"
                  type="text"
                  id="name"
                  v-model="newPosition.questions[0].title"
                />
              </div>
            </div>
            <div class="col-sm-4">
              <div class="form-group">
                <label>Question video</label>
                <input
                  class="form-input aux no-border"
                  type="file"
                  accept="video/*"
                  :id="'video_' + questionNum"
                  @change="onFileChangeQuestions"
                />
              </div>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="col-sm-4" />
            <div class="col-sm-8">
              <div class="form-group">
                <label>Question description</label>
                <input
                  class="form-input aux"
                  type="text"
                  id="description"
                  v-model="newPosition.questions[0].description"
                />
              </div>
            </div>
          </div>
          <!--<div class="col-sm-12">
            <div class="col-sm-4" />
            <div class="col-sm-4">
              <button
                type="button"
                class="btn btn-primary puntero"
                @click="remove()">
                Remove
              </button>
            </div>
          </div>-->
          <div id="hijo"></div>
        </div>

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
      padre: null,
      hijo: null,
      //altura: null,
      //anchura: null,
      questionNum: 0,
      newPosition: {
        name: "",
        // varialbe para el video
        questions: [
          {
            title: "",
            description: "",
            media: {
              file: "",
            },
          },
        ],
        intro: {
          file: "",
        },
      }, // No hace falta crear los atributos se añaden dinamicamente haciendoles referencia en los inputs pero solo se puede hacer en primer nivel del arbol no puedes hacer al menos manualmente no se en inputs x.y.z, tiene que ser x.y = {z}
    };
  },
  created() {
    this.questionNum = 0;
    this.padre = document.getElementById("padre");
    this.hijo = document.getElementById("hijo");
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
      const reader = new FileReader();
      reader.onload = (e) => {
        this.newPosition.intro.file = e.target.result;
      };
      reader.readAsDataURL(e);
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
        '<div class="col-sm-12"><div class="col-sm-6"><div class="form-group"><label>Question name</label><input class="form-input aux" type="text" id="name"  v-model="newPosition.questions[' +
        this.questionNum +
        '].title"/></div></div><div class="col-sm-6"><div class="form-group"><label>Question video</label><input class="form-input aux no-border" type="file" accept="video/*" id=video_' +
        this.questionNum +
        ' /></div></div></div><div class="col-sm-12"><div class="col-sm-2" /><div class="col-sm-10"><div class="form-group"><label>Question description</label><input class="form-input aux" type="text" id="description" v-model="newPosition.questions[' +
        this.questionNum +
        '].description"/></div></div></div><div class="col-sm-12"><div class="col-sm-4" /><div class="col-sm-4"><button type="button" class="btn btn-primary puntero" @click="remove()"> Remove </button></div></div>';
      document.getElementById("hijo").appendChild(newDiv);
    },
    createPosition() {
      console.log(this.newPosition);
      // He borrado lo que tenias porque con esto nos vale ya, en principio las crea solo con el nombre va bien y todo bien si falla debería saltar el error
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
          alert(error);
        });
    },
    /*
    const onSubmitForm = (event) => {
    event.preventDefault();

    // In order to be able to send files (in this case videos) to the API
    // we need to use multipart/form-data encoding format for the POST request
    const formData = new FormData();

    // We append the GraphQL query. In order to create a position, the mutation
    // "Position => save" needs to be executed.
    // Note: in order to discover which variables can be used in this mutation,
    // use GraphQL introspection.
    formData.append(
      "query",
      `
      mutation createPositionMutation($position: PositionInputType) {
        Position {
          save(position: $position) {
            id
            name
          }
        } 
      }
    `
    );

    // We append each video file we want to upload. In this example we are uploading
    // an intro video and one video question
    formData.append("intro", event.target["intro-video-file"].files[0]);
    formData.append(
      "question-1-video-file",
      event.target["question-1-video-file"].files[0]
    );

    // We append the GraphQL variables as a stringified JSON value.
    // Note: in order to discover which variables can be used in this mutation,
    // use GraphQL introspection.
    // Each value of the "file" property should be equal to the file name appended above
    formData.append(
      "variables",
      JSON.stringify({
        position: {
          name: event.target["position-name"].value,
          intro: {
            file: "intro"
          },
          questions: [
            {
              title: event.target["question-1-name"].value,
              media: {
                file: "question-1-video-file"
              }
            }
          ]
        }
      })
    );

    const request = new XMLHttpRequest();

    request.open("POST", HIREFLIX_API_URL);

    // Do not forget to include the API key generated in Hireflix in a header
    // with key: x-api-key
    request.setRequestHeader("x-api-key", event.target["api-key"].value);
    request.send(formData);

    return false;
  };*/
  },
};
</script>

<style scoped>
.no-border {
  border-bottom: 0px;
}
</style>
