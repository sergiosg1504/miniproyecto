<template>
  <v-app class="form-container technologiesStyle">
    <form action class="form" @submit.prevent="invite">
      <div class="col-sm-12">
        <div class="form-group">
          <label>Active positions in the account</label>
          <div class="content-select">
            <select v-model="selected">
              <option v-for="(item, i) in IDS" :key="i" v-bind:value="item">{{ item.name }}</option>
            </select>
            <i></i>
          </div>
        </div>
      </div>
      <div class="col-sm-12">
        <div class="col-sm-4">
          <div class="form-group">
            <label>Name</label>
            <input
              class="form-input"
              type="text"
              id="name"
              v-model="inv_name"
              required
            />
          </div>
        </div>
        <div class="col-sm-4">
          <div class="form-group">
            <label>Email</label>
            <input
              class="form-input"
              type="text"
              id="email"
              v-model="inv_email"
              required
            />
          </div>
        </div>
        <div class="col-sm-4">
          <div class="form-group">
            <label>Mobile phone</label>
            <input
              class="form-input"
              type="text"
              id="phone"
              v-model="inv_phone"
            />
          </div>
        </div>
      </div>

      <div class="form-group col-lg-4 align-item-center">
        <div class="col-sm-12">
          <div class="col-sm-6">
            <button
              class="btn btn-secondary btn-cancel"
              type="button"
              @click="click_Cancell"
            >
              <font-awesome-icon icon="ban" /> Cancel
            </button>
          </div>
          <div class="col-sm-6">
            <input
              class="btn btn-primary form-submit"
              type="submit"
              value="Invite"
            />
          </div>
        </div>
      </div>
    </form>
  </v-app>
</template>

<script>
import { GET_INTER, GET_ID, INVITE_TO } from "../graphql/queries/me/interviews";
export default {
  name: "GraphQLTest",
  data() {
    return {
      interviews: [],
      IDS: [],
      flag: false,
      inv_name: null,
      inv_email: null,
      inv_phone: null,
      selected:{}
    };
  },
  methods: {
    async show() {
      let i; // In this array are saved the ids of every positions in the account
      for (i = 0; i < this.IDS.data.positions.length; i++) {
        this.interviews = await this.$apollo.query({
          query: GET_INTER,
          variables: { position: this.IDS.data.positions[i].id },
        }); // In this other array are saved the url of the interviewers, if completed the final one if not the one to record it
        console.log(this.interviews);
      }
    },
    /*selected(id, index) {
      if (id !== this.picked) {
        this.picked = id; // when a different one is selected the id change
      } else {
        this.picked = null; // when the same button is selected the id is delete and unselected
        const boxes = document.querySelector(".box" + index);
        boxes.checked = false;
      }
    },*/

    invite() {
      this.$apollo
        .mutate({
          mutation: INVITE_TO,
          variables: {
            positionId: this.selected.id,
            candidate: {
              name: this.inv_name,
              email: this.inv_email,
              phone: this.inv_phone,
            },
          },
        })
        .then(() => {
          alert("Invitation success");
        })
        .catch((error) => {
          alert(this.customError(error));
        });
    },

    customError(error) {
      const code = error.graphQLErrors[0].code;
      let propmt_err;
      switch (code) {
        case 400:
          propmt_err = "The email was incorrect";
          break;
        case 404:
          propmt_err = "No position selected";
          break;
        case 409:
          propmt_err = "The interviewer is already invited";
          break;
        default:
          propmt_err = "An error has occured";
      }
      return propmt_err;
    },

    click_Cancell() {
      this.$router.push({ name: "MeetingList" });
    },
  },
  async mounted() {
    const aux = await this.$apollo.query({ query: GET_ID });
    let i;
    for (i = 0; i < aux.data.positions.length; i++) {
      if (aux.data.positions[i].archived == null)
        this.IDS.push(aux.data.positions[i]);
    }
  },
};
</script>

<style scoped>
.content-input input,
.content-select select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
.content-select {
  max-width: 225px;
  position: relative;
}
.content-select select {
  display: inline-block;
  width: 100%;
  cursor: pointer;
  padding: 1px 10px;
  height: 30px;
  border-radius: 0;
  background: white;
  border: 1px solid rgba(1, 1, 1, 1);
  border-radius: 12px;
  position: relative;
  transition: all 0.25s ease;
}
.content-select select:hover {
  background: lightgrey;
}
</style>