class Chatroom {
  constructor(room, username){
    this.room = room;
    this.username = username;
    this.chats = db.collection('chats');
    this.unsub;
  }
  async addChat(message){
    // format a chat object
    const now = new Date();
    const chat = {
      message: message,
      username: this.username,
      room: this.room,
      created: firebase.firestore.Timestamp.fromDate(now)
    };
    // save chat document
    const response = await this.chats.add(chat);
    return response;
  }
  getChats(callback){
    this.unsub = this.chats
    .where('room', '==', this.room)
    .orderBy('created')
    .onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if(change.type === 'added'){
          // update ui
          callback(change.doc.data());
        }
      });
    });
  }
  updateName(username){
    this.username = username;
    localStorage.setItem('username', username);
  }
  updateRoom(room){
    this.room = room;
    console.log('room updated');
    if(this.unsub){
    this.unsub();
    };
  }
};




