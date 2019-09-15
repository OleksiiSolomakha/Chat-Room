// dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

// add new chat
newChatForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom.addChat(message)
  .then(() => newChatForm.reset())
  .catch(err => console.log(err));
});

// update username
newNameForm.addEventListener('submit', e => {
  e.preventDefault();
  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);
  newNameForm.reset();
  updateMssg.innerText = `Your name changed to ${newName}!`;
  setTimeout(() => updateMssg.innerText = 'Your name:', 3000);
});

// update chatrooms
rooms.addEventListener('click', e => {
  if(e.target.tagName === 'BUTTON'){
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute('id'));
    chatroom.getChats(chat => chatUI.render(chat));
  }
})

// check localStarage for name
const username = localStorage.username ? localStorage.username : 'anonymous';

// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);

// get chat
chatroom.getChats(data => chatUI.render(data));