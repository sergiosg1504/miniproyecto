import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login";
import Register from "../views/Register";
import RememberPassword from "../views/RememberPassword";
import ChangePassword from "../views/ChangePassword";
import Home from "../views/Home.vue";
import List from "../views/ListView.vue";
import Mod from "../views/Modify.vue";
import Profile from "../components/Profile.vue";
import NavigationBar from "../components/NavigationBar.vue";

import IncomingMeetings from "../components/IncomingMeetings.vue";
import PreviousMeetings from "../components/PreviousMeetings.vue";
import CreateMeeting from "../views/CreateMeeting.vue";
import UpdateMeeting from "../views/UpdateMeeting.vue";

import InterviewList from "../views/InterviewList.vue";
import CreateInterview from "../views/CreateInterview.vue";
import InvitationInterview from "../views/InvitationInterview.vue";
import OpenInterviews from "../components/OpenInterviews.vue";
import ClosedInterviews from "../components/ClosedInterviews.vue";

import Calendario from "../views/Calendario.vue";
import PdfExam from "../components/PdfExam.vue";
import PdfExam2 from "../components/PdfExam2.vue";
/*import ReportsDownloader from "../components/pruebaPdfMake.vue";*/
import ReportsDownloader2 from "../components/pruebaPdfMake2.vue";
import ReportsDownloader3 from "../components/pruebaPdfMake3.vue";
import ReportsDownloader4 from "../components/pruebaPdfMake4.vue";
import ReportsDownloader5 from "../components/pruebaPdfMake5.vue";
import SoftSkillsReport from "../components/pdf_softSkillsReport.vue";
import ProfessionalProfileSearch from "../components/pdf_professionalProfileSearch.vue";

import MeetingList from "../views/MeetingList.vue";
import MeetSeminariosWeb from "../views/MeetSeminariosWeb.vue";
import MeetConfig from "../views/MeetConfig.vue";
import WaitingRoom from "../views/WaitingRoom.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowLeft,
  faVideo,
  faTrash,
  faPlus,
  faCheckCircle,
  faTimesCircle,
  faEye,
  faEyeSlash,
  faBan,
  faEdit,
  faVideoSlash,
  faVolumeUp,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(
  faArrowLeft,
  faVideo,
  faTrash,
  faPlus,
  faCheckCircle,
  faTimesCircle,
  faEye,
  faEyeSlash,
  faBan,
  faEdit,
  faVideoSlash,
  faVolumeUp,
  faVolumeMute
);

import { BootstrapVue } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueRouter);

Vue.prototype.$paginationOptions = [
  5,
  10,
  20,
  50,
  {
    /* Number.MAX_SAFE_INTEGER = 9007199254740991 */
    value: Number.MAX_SAFE_INTEGER,
    text: "Show all",
  },
];

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
    props: true,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/rememberPassword",
    name: "rememberPassword",
    component: RememberPassword,
    props: true,
  },
  {
    path: "/changePassword",
    name: "changePassword",
    component: ChangePassword,
    props: true,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    props: true,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    props: true,
  },
  {
    path: "/list",
    name: "ListView",
    component: List,
    props: true,
  },
  {
    path: "/mod",
    name: "Modify",
    component: Mod,
    props: true,
  },
  {
    path: "/navigationBar",
    name: "NaviagationBar",
    component: NavigationBar,
    props: true,
  },
  {
    path: "/createMeeting",
    name: "CreateMeeting",
    component: CreateMeeting,
    props: true,
  },
  {
    path: "/updateMeeting",
    name: "UpdateMeeting",
    component: UpdateMeeting,
    props: true,
  },
  {
    path: "/interviewList",
    name: "InterviewList",
    component: InterviewList,
    props: true,
  },
  {
    path: "/createInterview",
    name: "CreateInterview",
    component: CreateInterview,
    props: true,
  },
  {
    path: "/openInterviews",
    name: "OpenInterviews",
    component: OpenInterviews,
    props: true,
  },
  {
    path: "/closedInterviews",
    name: "ClosedInterviews",
    component: ClosedInterviews,
    props: true,
  },
  {
    path: "/invitationInterview",
    name: "InvitationInterview",
    component: InvitationInterview,
    props: true,
  },
  {
    path: "/incomingMeetings",
    name: "IncomingMeetings",
    component: IncomingMeetings,
    props: true,
  },
  {
    path: "/previousMeetings",
    name: "PreviousMeetings",
    component: PreviousMeetings,
    props: true,
  },
  {
    path: "/meetingList",
    name: "MeetingList",
    component: MeetingList,
    props: true,
  },
  {
    path: "/calendario",
    name: "Calendario",
    component: Calendario,
    props: true,
  },
  {
    path: "/seminariosWeb",
    name: "SeminariosWeb",
    component: MeetSeminariosWeb,
    props: true,
  },
  {
    path: "/configuracion",
    name: "Configuracion",
    component: MeetConfig,
    props: true,
  },
  {
    path: "/waitingRoom",
    name: "WaitingRoom",
    component: WaitingRoom,
    props: true,
  },
  {
    path: "/PdfExam",
    name: "PdfExam",
    component: PdfExam,
  },
  {
    path: "/PdfExam2",
    name: "PdfExam2",
    component: PdfExam2,
  },
  {
    path: "/pdf2",
    name: "pruebaPdfMake2",
    component: ReportsDownloader2,
  },
  {
    path: "/pdf3",
    name: "pruebaPdfMake3",
    component: ReportsDownloader3,
  },
  {
    path: "/tester",
    name: "pruebaPdfMake4",
    component: ReportsDownloader4,
  },
  {
    path: "/pdf5",
    name: "pruebaPdfMake5",
    component: ReportsDownloader5,
  },
  {
    path: "/pdf_softSkillsReport",
    name: "softSkillsReport",
    component: SoftSkillsReport,
  },
  {
    path: "/pdf_professionalProfileSearch",
    name: "professionalProfileSearch",
    component: ProfessionalProfileSearch,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
