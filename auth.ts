import service from './http'

const apiUrl = process.env.REACT_APP_API_URL

export const getToken = (tokenKey: string) => {
  return sessionStorage.getItem(tokenKey)
}

export const setToken = (tokenKey: string, token: string) => {
  sessionStorage.setItem(tokenKey, token)
}

export const removeToken = (tokenKey: string) => {
  sessionStorage.removeItem(tokenKey)
}

export const login = (parms: {account: string, secret: string}) => {
  const data = {
    type: 101,
    account: parms.account,
    secret: parms.secret
  }
  return service({
    url: apiUrl + '/api/v1/token',
    method: 'post',
    data
  }).then(res => {
    const data = res.data
    if (data) {
      setToken('SET_TOKEN', data.token)
      setToken('SET_NAME', parms.account)
      return Promise.resolve()
    }
  })
}

export const register = (data: {account: string, secret: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response: Response) => {
    if (response.ok) {
      const token = await response.json();
      setToken('SET_TOKEN', token.token)
      setToken('SET_NAME', data.account)
      
      return {
        name: data.account,
        token: token.token
      }
    }
  })
}

export const logout = () => {
  return fetch(`${apiUrl}/layout`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  }).then(async (response: Response) => {
    if (response.ok) {
      removeToken('SET_TOKEN')
    }
  })
}

