import axios from "axios";
export default axios.create({
  baseURL: "https://monstercards-summon.herokuapp.com/",
  headers: {
    "Content-type": "application/json"
  }
});