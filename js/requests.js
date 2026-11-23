"use strict";

const requestForm = document.getElementById("request-form");
const requestStatus = document.getElementById("request-status");

requestForm.hidden = false;
requestForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const fields = new FormData(requestForm);
  const name = fields.get("name").trim();
  const service = fields.get("service");
  const description = fields.get("description").trim();

  if (!name || !service || description.length < 10) {
    requestStatus.textContent = "Укажите имя, выберите направление и опишите задачу хотя бы в 10 символах.";
    return;
  }

  const message = [
    "Заявка на разработку · MasterFresh",
    `Имя: ${name}`,
    `Направление: ${service}`,
    "",
    description,
  ].join("\n");
  const draftUrl = `https://t.me/wor_t_h?text=${encodeURIComponent(message)}`;
  const chat = window.open(draftUrl, "_blank");
  if (chat) {
    chat.opener = null;
    requestStatus.textContent = "Черновик открыт. Нажмите «Отправить» в Telegram.";
  } else {
    window.location.assign(draftUrl);
  }
});
