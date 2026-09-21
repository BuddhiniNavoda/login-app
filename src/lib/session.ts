export function saveAuthSession(accessToken: string, email: string) {
  sessionStorage.setItem('accessToken', accessToken)
  sessionStorage.setItem('userEmail', email)
}

export function clearAuthSession() {
  sessionStorage.removeItem('accessToken')
  sessionStorage.removeItem('userEmail')
}
