<template>
  <v-app class="form-container technologiesStyle">
    <form action class="form" @submit="createPosition">
      <div class="col-sm-12">
        <div class="col-sm-6">
          <div class="form-group">
            <label>API Key</label>
            <input
              class="form-input aux"
              type="text"
              id="APIKey"
              v-model="newPosition.name"
              required
            />
          </div>
        </div>
      </div>

      <div class="col-sm-12">
        <div class="col-sm-6">
          <div class="form-group">
            <label>Name</label>
            <input
              class="form-input aux"
              type="text"
              id="name"
              v-model="newPosition.name"
              required
            />
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group">
            <label>Intro video</label>
            <input
              class="form-input aux"
              type="file"
              accept="video/*"
              id="video"
              @change="onFileChange"
              required
            />
          </div>
        </div>
      </div>
    </form>
  </v-app>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      //altura: null,
      //anchura: null,
      HIREFLIX_API_URL: "https://api.hireflix.com/me",
      newPosition: {
        API_key: "",
        name: "",
        video: null,
        question: {
          name: "",
          video: null,
        },
      },
    };
  },
  methods: {
    // no se si esto esta bien
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
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
  created() {
    //this.altura = screen.height - 200;
    //this.anchura = screen.width - 40;
  },
};
</script>
