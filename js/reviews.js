"use strict";

const reviewForm = document.getElementById("review-form");
const reviewStatus = document.getElementById("review-status");
const reviewList = document.getElementById("review-list");
const reviewEmpty = document.getElementById("review-empty");

reviewForm.hidden = false;
reviewForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const values = new FormData(reviewForm);
  const name = values.get("name").trim();
  const rating = Number(values.get("rating"));
  const text = values.get("text").trim();

  if (!name || text.length < 10 || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    reviewStatus.textContent = "Укажите имя, оценку и напишите хотя бы 10 символов.";
    return;
  }

  const draft = new URL("https://t.me/wor_t_h");
  draft.searchParams.set("text", [
    "Отзыв о сайте GoWeb",
    `Имя для публикации: ${name}`,
    `Оценка: ${rating}/5`,
    "",
    text,
    "",
    "Согласен на публикацию имени, оценки и отзыва.",
  ].join("\n"));
  // Telegram ожидает URL-encoded текст, включая пробелы в виде %20.
  draft.search = draft.search.replace(/\+/g, "%20");
  const opened = window.open(draft.href, "_blank");
  if (opened) {
    opened.opener = null;
    reviewStatus.textContent = "Черновик открыт в новой вкладке. Отправьте сообщение в Telegram.";
  } else {
    window.location.assign(draft.href);
  }
});

async function loadReviews() {
  try {
    const response = await fetch("reviews.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const reviews = await response.json();
    const cards = reviews.filter(({ name, rating, text }) =>
      typeof name === "string" && name.trim() && typeof text === "string" && text.trim()
      && Number.isInteger(rating) && rating >= 1 && rating <= 5
    ).map(({ name, rating, text }) => {
      const card = makeElement("article", "", "review-card");
      card.append(
        makeElement("h3", name),
        makeElement("p", `Оценка: ${rating} из 5`, "review-rating"),
        makeElement("p", text)
      );
      return card;
    });
    reviewList.replaceChildren(...cards);
    reviewEmpty.hidden = cards.length > 0;
  } catch {
    reviewEmpty.textContent = "Не удалось загрузить опубликованные отзывы.";
  }
}

loadReviews();
