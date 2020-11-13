import { db } from "../services/firebase"

// export function readChats() {
//   let abc = []
//   db.ref("chats").on("value", (snapshot) => {
//     snapshot.forEach((snap) => {
//       abc.push(snap.val())
//     })
//     return abc
//   })
// }

// export function writeChats(message) {
//   return db.ref("chats").push({
//     content: message.content,
//     timestamp: message.timestamp,
//     uid: message.uid,
//   })
// }

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
