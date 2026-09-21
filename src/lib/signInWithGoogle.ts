import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { getFirebaseAuth, googleProvider } from './firebase.ts'
import { saveAuthSession } from './session.ts'

export async function signInWithGoogle() {
  const auth = getFirebaseAuth()
  const result = await signInWithPopup(auth, googleProvider)
  const credential = GoogleAuthProvider.credentialFromResult(result)
  const accessToken = credential?.accessToken ?? (await result.user.getIdToken())

  saveAuthSession(accessToken, result.user.email ?? '')

  return accessToken
}
