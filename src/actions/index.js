import axios from "axios";

// axios is used to handle api request
// Customized API is already implemented for this project
//api base url : "https://funercase.herokuapp.com"
// COntent type requested is json format

export const server = axios.create({
  baseURL: "https://funercase.herokuapp.com",
  headers: {
    "Content-Type": "application/json"
  }
})
