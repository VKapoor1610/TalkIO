// const socket = io('http://localhost:3000')
const socket = io('https://server-e37u.onrender.com/')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt('What is your name?')
appendMessage('You joined', 'center')
socket.emit('new-user', name)

socket.on('chat-message', data => {
  appendMessage(`${data.name}:\n ${data.message}`, 'left')
})

socket.on('user-connected', name => {
  appendMessage(`${name} connected` , 'center')
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`, 'center')
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You:\n ${message}`, 'right')
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

function appendMessage(message  , pos) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageElement.classList.add(pos)
  messageContainer.append(messageElement)

  // Scroll to the bottom of the message container
  messageContainer.scrollTop = messageContainer.scrollHeight;

}