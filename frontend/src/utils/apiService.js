import Axios from 'axios';
import settings from "../constants/settings"

export const apiService = {
  post,
  get,
};

function post(resource, data) {
  return call('post', resource, data)
}
function get(resource){
  return call('get', resource)
}

function call(type, resource, data){
  const headers = Object.assign(
    {
      'Content-Type': 'application/json'
    }
  );
  const url = `${settings.BACKEND.API_ROOT_URL}/${resource}`
  switch(type){
      case 'post':
          return Axios.post(url, data, {headers})
              .then(response => response.data)
              .catch(err=> handleApiError(err.response, 'post', resource, data))
      case 'get':
          return Axios.get(url, {headers})
              .then(response => response.data)
              .catch(err=> handleApiError(err.response, 'get', resource, err))
      default:
          return Promise.reject(`unsupported call type: ${type}`)
  }
}

function handleApiError(response, ...args) {
  console.error(response)
}
