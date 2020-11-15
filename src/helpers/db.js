import { db, auth } from "../services/firebase"

export async function storeChat(chat_name, chat_code, user_id) {
  await db.ref(`chats/${chat_code}`).set({
    name: chat_name,
  })

  addUserInChat(user_id, chat_code)
}

export async function addUserInChat(user_id, chat_code) {
  let chats = []

  db.ref("chat_user")
    .child(user_id)
    .on("value", (snapshot) => {
      snapshot.forEach((snap) => {
        chats = snap.val()
      })

      if (chats.indexOf(chat_code) < 0) {
        chats.push(chat_code)
      }

      db.ref("chat_user").child(user_id).set({
        chat_code: chats,
      })
    })
}

export async function singout() {
  auth()
    .signOut()
    .then(function () {
      console.log("tteste")
    })
    .catch((err) => {
      console.log(err)
    })
}
