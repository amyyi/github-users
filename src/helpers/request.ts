import axios, { AxiosRequestConfig } from 'axios'
import { from, Observable } from 'rxjs'

import { CLIENT_ERRORS } from '../constants/errors'

const buildUrl = (apiPath: string) => `https://api.github.com${apiPath}`
const axiosInstance = axios.create({
  timeout: 10000,
  withCredentials: false,
})

axiosInstance.interceptors.response.use(
  (response) => Promise.resolve(response.data),
  (error) => {
    if (error.response) {
      if (typeof error.response.data !== 'object') {
        // api server is down
        return Promise.reject({
          code: error.response.status,
          message: error.response.statusText,
        })
      }
      // custom error from api server
      return Promise.reject(error.response.data)
    }
    // network error
    return Promise.reject({
      message: `[${CLIENT_ERRORS.NETWORK_ERROR.message}] ${error.message}`,
    })
  },
)

const request = ({
  url = '',
  headers,
  ...otherAxiosConfig
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
AxiosRequestConfig): Observable<any> => {
  const httpRequest = axiosInstance({
    url: buildUrl(url),
    headers: {
      ...headers,
    },
    ...otherAxiosConfig,
  })

  return from(httpRequest)
}

export default request
