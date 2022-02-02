<template>
  <v-app class="form-container technologiesStyle">
    <form action class="form" @submit.prevent="invite">
      <div class="col-sm-12">
        <div class="form-group">
          <label>Active positions in the account</label>
          <form>
            <span v-for="(item, i) in IDS" :key="i">
              <p for="i">
                {{ item.name }}
                <input
                  class="form-input aux"
                  type="radio"
                  :class="'box' + i"
                  name="box"
                  @click="selected(item.id, i)"
                  required
                />
              </p>
            </span>
          </form>
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
              required
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
  <!--<div class="graphql-test">
    <h1>Positions that are active in the account</h1>
    <form>
        <span v-for="(item,i) in IDS" :key="i">
            <p for=i>
                {{item.name}} <input type="radio" :class=' "box" + i' name="box" @click="selected(item.id, i)" required/> 
            </p>
        </span>
    </form>
    <h2>Type the following information to invite someone</h2>
    <form @submit.prevent="invite">
        <p>Name: <input type="text" v-model="inv_name" required/></p>
        <p>Email: <input type="text" v-model="inv_email" required/></p>
        <p>Mobile Phone: <input type="text" v-model="inv_phone"/></p>
        <input type="submit" value="Invite to selected">
    </form>
    </div>-->
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
      picked: null,
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
    selected(id, index) {
      if (id !== this.picked) {
        this.picked = id; // when a different one is selected the id change
      } else {
        this.picked = null; // when the same button is selected the id is delete and unselected
        const boxes = document.querySelector(".box" + index);
        boxes.checked = false;
      }
    },

    invite() {
      this.$apollo
        .mutate({
          mutation: INVITE_TO,
          variables: {
            positionId: this.picked,
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
