import axios from "axios";

const getBaseUrl = () => {
    let url;
    switch(process.env.NODE_ENV) {
      case 'production':
        url = 'www.google.com';
        break;
      case 'development':
      default:
        url = 'http://127.0.0.1:8000';
    }
  
    return url;
  }
  
  export default axios.create({
    baseURL: getBaseUrl(),
  });