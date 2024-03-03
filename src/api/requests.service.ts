import axios from "axios";
import { getCookie } from "../utils/helpers";

const BASE_URL = "http://localhost:3001/";

const headers = (options?: any) => {
  let cookieValue = getCookie('accessToken');
  const headersValues = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookieValue}`,
  }

  const finalHeaders = options ? {...headersValues, ...options} : headersValues;
  return finalHeaders;
}

// Perform a GET request
async function getRequest(url: string, options?: any) {
  return axios(`${BASE_URL}${url}`, {
    headers: headers(options)
  }).then((response) => {
   return response.data;
  }).catch((error) => {
    console.error('Error:', error);
  });
}

// Perform a POST request
function postRequest(url: string, body: any , options?: any) {
  return axios.post(`${BASE_URL}${url}`, body, {
    headers: headers(options)
  }).then((response) => {
    return response.data;
   }).catch((error) => {
     console.error('Error:', error);
   });
}

// Perform a PUT request
function putRequest(url: string, body: any, options?: any) {
  return axios.put(`${BASE_URL}${url}`, body, {
    headers: headers(options),
  }).then((response) => {
    return response.data;
   }).catch((error) => {
     console.error('Error:', error);
   });
}

// Perform a DELETE request
function deleteRequest(url: string, options?: any) {
  return axios.delete(`${BASE_URL}${url}`, {
    headers: headers(options)
  }).then((response) => {
    return response.data;
   }).catch((error) => {
     console.error('Error:', error);
   });
}

export { getRequest, postRequest, putRequest, deleteRequest };
