import axios from 'axios'

export function setupAxios() {
  axios.defaults.baseURL = `${import.meta.env.VITE_BASE_URL}/api/v2/front`
  axios.defaults.headers.common['app-token'] = 'wapstore'
  axios.defaults.headers.common['Accept'] = 'application/json'
}

export async function api({ endpoint, method = 'GET', payload }) {
  return axios(endpoint, {
    method,
    data: payload || undefined,
  })
    .then(({ data }) => {
      return data
    })
    .catch((error) => {
      throw {
        message: error.response?.data || error.message,
        status: error.status,
      }
    })
}
