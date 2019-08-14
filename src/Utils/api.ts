import axios from 'axios';
import handleError from './handleError';

// get base_url from config
const BASE_URL = '';

// Make maybe to get headers as params
const getHeaders = () => ({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// HTTP GET Request - Returns Resolved or Rejected Promise
export const get = (path: string) => new Promise((resolve, reject) => {
  axios
    .get(`${BASE_URL}${path}`, getHeaders())
    .then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(handleError(error));
    });
});

// HTTP PATCH Request - Returns Resolved or Rejected Promise
export const patch = (path: string, data: any) => new Promise((resolve, reject) => {
  axios
    .patch(`${BASE_URL}${path}`, data, getHeaders())
    .then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(handleError(error));
    });
});

// HTTP POST Request - Returns Resolved or Rejected Promise
export const post = (path: string, data: any) => new Promise((resolve, reject) => {
  axios
    .post(`${BASE_URL}${path}`, data, getHeaders())
    .then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(handleError(error));
    });
});

// HTTP DELETE Request - Returns Resolved or Rejected Promise
export const del = (path: string) => new Promise((resolve, reject) => {
  axios
    .delete(`${BASE_URL}${path}`, getHeaders())
    .then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(handleError(error));
    });
});
