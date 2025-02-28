import data from "../data/dataset.js";
import { chatCompletions } from "../lib/openIaAPI.js";
export const ChatPanel = () => {
  const id = window.location.pathname.replace("/chat-", "");
  const element = data.find((personaje) => personaje.id === id);

  console.log(element);
  // Contenedor principal
  const chatContainer = document.createElement("div");
  chatContainer.classList.add("chatContainer");

  // Info personaje (Trabajar llamado desde el dataset)
  const characterInfoContainer = document.createElement("div");
  characterInfoContainer.classList.add("characterInfoContainer");
  const nameCharacter = document.createElement("p");
  nameCharacter.id = "nameCharacter";
  nameCharacter.innerHTML = `CHAT WITH <br> ${element.name}`;
  const characterPhoto = document.createElement("figure");
  characterPhoto.classList.add("characterPhoto");
  characterPhoto.innerHTML = `<img src="${element.imageUrl}", alt="Foto del personaje">`;
  const characterDescription = document.createElement("div");
  characterDescription.id = "characterDescription";
  characterDescription.classList.add("characterDescription");
  characterDescription.innerHTML = `<p> ${element.description}</p>`;

  // Ventana chat
  const panelConversation = document.createElement("div");
  panelConversation.classList.add("panelConversation");
  const chatWindow = document.createElement("article");
  chatWindow.id = "chatTextarea";

  // Espacio para escribir y enviar
  const chatInput = document.createElement("div");
  chatInput.classList.add("chatInput");

  const messageInput = document.createElement("input");
  messageInput.type = "text";
  messageInput.id = "messageInput";
  messageInput.placeholder = "TYPE YOUR MESSAGE";

  const sendMessageBtn = document.createElement('button');
  sendMessageBtn.addEventListener('click', ()=> {
    messageInput.value
    const messageUser = messageInput.value
    chatCompletions(messageUser, element).then((data)=>{
      const pQuestion = document.createElement('h5');
      pQuestion.textContent = messageUser
      const pAswer = document.createElement('h4')
      pAswer.textContent = data.choices[0].message.content
      chatWindow.append(pQuestion, pAswer)
      messageInput.value = '';
      //   console.log(data.choices[0].message.content);

    })

  }) ;

  sendMessageBtn.id = 'sendMessageBtn';
  sendMessageBtn.innerText = 'SEND';

  // Llamado de los elemtos
  characterInfoContainer.appendChild(nameCharacter);
  characterInfoContainer.appendChild(characterPhoto);
  characterInfoContainer.appendChild(characterDescription);

  //panelConversation.appendChild(nameCharacter);
  panelConversation.appendChild(chatWindow);
  panelConversation.appendChild(chatInput);

  chatInput.appendChild(messageInput);
  chatInput.appendChild(sendMessageBtn);

  chatContainer.appendChild(characterInfoContainer);
  chatContainer.appendChild(panelConversation);

  return chatContainer;
};
