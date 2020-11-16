import { auth, db } from "../services/firebase"

export async function signup(email, password, city_id) {
  await auth().createUserWithEmailAndPassword(email, password)
  await createUserCity(city_id)
  return true
}

export function signin(email, password) {
  return auth().signInWithEmailAndPassword(email, password)
}

export function signInWithGoogle() {
  const provider = new auth.GoogleAuthProvider()
  return auth().signInWithPopup(provider)
}

export function signInWithGitHub() {
  const provider = new auth.GithubAuthProvider()
  return auth().signInWithPopup(provider)
}

export function logout() {
  return auth().signOut()
}

export async function createUserCity(city_id) {
  try {
    await db.ref("city_user").child(auth().currentUser.uid).push({
      city_id: city_id,
    })

    return true
  } catch (error) {
    console.log(error)
  }
}
