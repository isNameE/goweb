"use strict";

function setupMenu() {
  const button = document.querySelector(".menu-toggle");
  const navigation = document.getElementById("main-nav");
  const desktop = window.matchMedia("(min-width: 900px)");

  function setMenu(open) {
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
    navigation.classList.toggle("is-open", open);
    navigation.inert = !desktop.matches && !open;
  }

  button.hidden = false;
  navigation.classList.add("is-collapsible");
  setMenu(false);

  button.addEventListener("click", () => setMenu(button.getAttribute("aria-expanded") === "false"));
  desktop.addEventListener("change", () => setMenu(false));

  navigation.addEventListener("click", (event) => {
    if (!desktop.matches && event.target.closest("a")) {
      button.focus();
      setMenu(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && button.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      button.focus();
    }
  });
}

// Вставляем текст через textContent, чтобы символы из данных не становились HTML.
function makeElement(tag, text, className) {
  const element = document.createElement(tag);
  if (text) element.textContent = text;
  if (className) element.className = className;
  return element;
}

function renderList(list, items) {
  list.replaceChildren(...items.map((item) => makeElement("li", item)));
}

function makeImage(src, alt, className) {
  const placeholder = () => makeElement("div", "Изображение недоступно", `${className} image-placeholder`);
  if (!src) return placeholder();

  const image = makeElement("img", "", className);
  image.alt = alt;
  image.loading = "lazy";
  image.decoding = "async";
  image.addEventListener("error", () => image.replaceWith(placeholder()), { once: true });
  image.src = src;
  return image;
}

function createProjectCard(project) {
  const card = makeElement("article", "", "project-card");
  const body = makeElement("div", "", "project-body");
  const tags = makeElement("ul", "", "tags");
  const link = makeElement("a", "Смотреть кейс", "text-link");

  link.href = `project.html?id=${encodeURIComponent(project.id)}`;
  link.setAttribute("aria-label", `Смотреть кейс «${project.title}»`);
  renderList(tags, project.tags);

  if (project.demo) body.append(makeElement("span", "Демонстрационный кейс", "demo-badge"));
  body.append(makeElement("h3", project.title), makeElement("p", project.description), tags, link);
  const cover = project.cover
    ? makeImage(project.cover, "", "project-image")
    : makeElement("div", project.coverTitle, `project-image project-cover project-cover-${project.category}`);
  if (!project.cover) cover.setAttribute("aria-hidden", "true");
  card.append(cover, body);
  return card;
}

function renderProjects(grid, projects) {
  grid.replaceChildren(...projects.map(createProjectCard));
  if (!projects.length) grid.append(makeElement("p", "В этой категории пока нет проектов.", "empty-state"));
}

function setupCatalog(grid) {
  const filters = document.getElementById("project-filters");
  const status = document.getElementById("filter-status");
  const categories = [["all", "Все"], ...Object.entries(PROJECT_CATEGORIES)];

  categories.forEach(([key, label]) => {
    const button = makeElement("button", label, "filter-button");
    button.type = "button";
    button.setAttribute("aria-pressed", String(key === "all"));
    button.setAttribute("aria-controls", grid.id);
    button.addEventListener("click", () => {
      filters.querySelector('[aria-pressed="true"]').setAttribute("aria-pressed", "false");
      button.setAttribute("aria-pressed", "true");
      const visible = key === "all" ? PROJECTS : PROJECTS.filter((project) => project.category === key);
      renderProjects(grid, visible);
      status.textContent = `${label}. Показано проектов: ${visible.length}.`;
    });
    filters.append(button);
  });

  renderProjects(grid, PROJECTS);
}

function setupCase(article) {
  // Идентификатор после ?id= сопоставляется с id проекта в массиве.
  const id = new URLSearchParams(window.location.search).get("id");
  const project = PROJECTS.find((item) => item.id === id);

  if (!project) {
    document.title = "Кейс не найден — MasterFresh";
    document.getElementById("project-missing").hidden = false;
    return;
  }

  document.title = `${project.title} — MasterFresh`;
  article.querySelector(".demo-badge").hidden = !project.demo;
  document.getElementById("case-category").textContent = PROJECT_CATEGORIES[project.category];
  document.getElementById("case-title").textContent = project.title;
  document.getElementById("case-description").textContent = project.description;
  document.getElementById("case-task").textContent = project.task;
  document.getElementById("case-result").textContent = project.result;
  renderList(document.getElementById("case-work"), project.work);
  renderList(document.getElementById("case-tech"), project.technologies);

  const facts = document.getElementById("case-facts");
  if (project.facts) {
    for (const [label, value] of Object.entries(project.facts)) {
      const item = makeElement("div");
      item.append(makeElement("dt", label), makeElement("dd", value));
      facts.append(item);
    }
    facts.hidden = false;
  }

  const gallery = document.getElementById("case-gallery");
  project.gallery.forEach(({ src, alt, caption }) => {
    const figure = makeElement("figure");
    const image = makeImage(src, alt, "gallery-image");
    if (src) {
      const link = makeElement("a");
      link.href = src;
      link.setAttribute("aria-label", `Открыть изображение: ${alt}`);
      link.append(image);
      figure.append(link);
    } else {
      figure.append(image);
    }
    figure.append(makeElement("figcaption", caption));
    gallery.append(figure);
  });
  document.getElementById("gallery-section").hidden = !project.gallery.length;
  article.hidden = false;
}

setupMenu();

const featured = document.getElementById("featured-projects");
const catalog = document.getElementById("project-list");
const detail = document.getElementById("project-detail");

if (featured) renderProjects(featured, PROJECTS.slice(0, 3));
if (catalog) setupCatalog(catalog);
if (detail) setupCase(detail);
