<template>
  <v-app class="form-container technologiesStyle">
    <form action class="form" @submit="invite">
      <div class="col-sm-12">
        <div class="form-group">
          <label>Active positions in the account</label>
          <div class="content-select">
            <select v-model="selected" @change="customChange">
              <option v-for="(item, i) in IDS" :key="i" v-bind:value="item">
                {{ item.name }}
              </option>
            </select>
          </div>
          <div v-if="selected">
            <div v-if="checkLength">
              <p>Candidates invited:</p>
              <div v-for="(c, i) in inter" :key="i">
                {{ c.candidate.name }}, {{ c.candidate.email }}
              </div>
            </div>
            <div v-else>No candidates</div>
          </div>
        </div>
      </div>
      <div class="col-sm-12">
        <button class="btn btn-primary" @click="change()">
          <label class="btn-label" v-if="!csvFlag">Subir csv</label>
          <label class="btn-label" v-else>A mano</label>
        </button>
      </div>
      <div class="col-sm-12" v-if="csvFlag">
        <label>Import candidates from CSV</label>
        <vue-csv-import v-model="csv" :map-fields="['name', 'email', 'phone']">
          <vue-csv-toggle-headers></vue-csv-toggle-headers>
          <vue-csv-errors></vue-csv-errors>
          <vue-csv-input></vue-csv-input>
          <vue-csv-map :auto-match="true"></vue-csv-map>
        </vue-csv-import>
        <div v-if="csv != null">
          <p>Candidates loaded from the file:</p>
          <!--<div v-for="(c, i) in csv" :key="i">
                {{ c.name }}, {{ c.email }}
              </div>-->
        </div>
      </div>
      <div class="col-sm-12" v-else>
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
import { VueCsvImport } from "vue-csv-import";
import {
  GET_ID,
  INVITE_TO,
  GET_CANDIDATES,
} from "../graphql/queries/me/interviews";
export default {
  name: "InvitationInterview",
  components: {
    VueCsvImport,
  },
  data() {
    return {
      csvFlag: false,
      csv: null,
      interviews: [],
      IDS: [],
      flag: false,
      inv_name: null,
      inv_email: null,
      inv_phone: null,
      selected: null,
      inter: null,
    };
  },
  methods: {
    change() {
      if (this.csvFlag) {
        this.csvFlag = false;
        console.log(this.csv);
      } else {
        this.csvFlag = true;
      }
    },
    invite() {
      if (!this.csvFlag) {
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
      } else {
        let longitud = this.csv.length;
        let i = 0;
        let j = 0;
        while (i < longitud) {
          if (j === 10) {
            setTimeout("", 10000);
            j = 0;
          }
          this.$apollo
            .mutate({
              mutation: INVITE_TO,
              variables: {
                positionId: this.selected.id,
                candidate: {
                  name: this.csv[i].name,
                  email: this.csv[i].email,
                  phone: this.csv[i].phone,
                },
              },
            })
            .then(() => {
              alert("Invitation success");
            })
            .catch((error) => {
              alert(this.customError(error));
            });
          i++;
          j++;
        }
      }
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
    async customChange() {
      const aux = await this.$apollo.query({
        query: GET_CANDIDATES,
        variables: { position: this.selected.id },
      });

      this.inter = aux.data.interviews;
    },
  },
  computed: {
    checkLength() {
      if (this.inter === null) return false;
      if (this.inter.length === 0) return false;
      else return true;
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
.btn-label {
  color: white;
}
</style>
