import { getSocket } from "./sockets";

const messages = document.getElementById("jsMessages");
const sendMsg = document.getElementById("jsSendMsg");

const appendMsg = (text, nickname) => {
  const li = document.createElement("li");
  li.innerHTML = `
        <span class="author ${nickname ? "out" : "self"}">${
    nickname ? nickname : "You"
  }:</span> ${text}
    `;
  messages.appendChild(li);
};

//키보드로 직접 쳤을때
const handleSendMsg = (event) => {
  event.preventDefault();
  const input = sendMsg.querySelector("input");
  const { value } = input;
  getSocket().emit(window.events.sendMsg, { message: value });
  input.value = "";
  appendMsg(value);
};

//다른 사람 메시지 받았을 때
export const handleNewMessage = ({ message, nickname }) =>
  appendMsg(message, nickname);

if (sendMsg) {
  sendMsg.addEventListener("submit", handleSendMsg);
}

export const disableChat = () => (sendMsg.style.display = "none");
export const enableChat = () => (sendMsg.style.display = "flex");
