import { FirebaseError } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { getFirebaseAuth } from './firebase.ts'
import { saveAuthSession } from './session.ts'

function authMessage(error: unknown) {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return 'Incorrect email or password'
      case 'auth/email-already-in-use':
        return 'This Gmail is already registered. Try logging in.'
      case 'auth/weak-password':
        return 'Password must be at least 6 characters'
      case 'auth/invalid-email':
        return 'Enter a valid Gmail address'
      case 'auth/configuration-not-found':
      case 'auth/operation-not-allowed':
        return 'Email/password sign-in is not enabled. In Firebase Console, open Authentication → Sign-in method and enable Email/Password.'
      default:
        return error.message
    }
  }

  return error instanceof Error ? error.message : 'Email sign-in failed'
}

export async function registerWithEmail(email: string, password: string) {
  const auth = getFirebaseAuth()
  const trimmedEmail = email.trim()

  try {
    const created = await createUserWithEmailAndPassword(auth, trimmedEmail, password)
    const accessToken = await created.user.getIdToken()
    saveAuthSession(accessToken, created.user.email ?? trimmedEmail)
    return accessToken
  } catch (error) {
    throw new Error(authMessage(error))
  }
}

export async function signInWithEmail(email: string, password: string) {
  const auth = getFirebaseAuth()
  const trimmedEmail = email.trim()

  try {
    const result = await signInWithEmailAndPassword(auth, trimmedEmail, password)
    const accessToken = await result.user.getIdToken()
    saveAuthSession(accessToken, result.user.email ?? trimmedEmail)
    return accessToken
  } catch (error) {
    const code = error instanceof FirebaseError ? error.code : ''
    const canCreateAccount =
      code === 'auth/user-not-found' || code === 'auth/invalid-credential'

    if (!canCreateAccount) {
      throw new Error(authMessage(error))
    }

    try {
      const created = await createUserWithEmailAndPassword(auth, trimmedEmail, password)
      const accessToken = await created.user.getIdToken()
      saveAuthSession(accessToken, created.user.email ?? trimmedEmail)
      return accessToken
    } catch (createError) {
      const createCode = createError instanceof FirebaseError ? createError.code : ''
      if (createCode === 'auth/email-already-in-use') {
        throw new Error('Incorrect email or password')
      }
      throw new Error(authMessage(createError))
    }
  }
}
