import axios from "axios";

const localPythonClassifier = axios.create({
  baseURL: "http://127.0.0.1:5007",
});

export default localPythonClassifier;
