# MasterFresh

Статический сайт компании MasterFresh. Для локального просмотра запустите `python -m http.server 8765` в корне проекта и откройте `http://localhost:8765`. Включите JavaScript для каталога, страниц кейсов и формы. Сайт использует HTML, CSS и чистый JavaScript, а изображения хранятся в проекте.

## Файлы сайта

```text
index.html       Главная, услуги, этапы, компания, контакты и отзывы
projects.html    Каталог и фильтры
project.html     Шаблон страницы кейса
css/style.css    Оформление и адаптивная сетка
js/main.js       Меню, каталог и вывод кейсов
js/reviews.js    Форма отзывов и вывод опубликованных отзывов
reviews.json     Одобренные отзывы о сайте
js/projects.js   Категории и массив кейсов
images/          Иллюстрации сайта
README.md        Инструкция по публикации и редактированию
.nojekyll        Публикация статических файлов напрямую
```

## Публикация на GitHub Pages

### 1. Создайте репозиторий

1. Войдите в свой аккаунт на [GitHub](https://github.com/).
2. Нажмите **+ → New repository**. Введите имя, например `masterfresh`.
3. Выберите **Public**, чтобы использовать GitHub Pages на бесплатном тарифе.
4. При создании репозитория оставьте добавление README выключенным. Готовый `README.md` уже входит в проект.
5. Нажмите **Create repository**. [Создание репозитория](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository)

### 2. Загрузите файлы в ветку `main`

На странице нового пустого репозитория нажмите **uploading an existing file**. Если в нём уже есть файлы, нажмите **Add file → Upload files**. Перетащите содержимое папки проекта из проводника в область загрузки. Проверьте, что `index.html`, `projects.html`, `project.html` и `README.md` оказались в корне, а `css`, `js` и `images` сохранили свои имена. Для публикации достаточно файлов из списка выше. Нажмите **Commit changes**. [Загрузка файлов через браузер](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)

Если загрузчик браузера разворачивает папки, воспользуйтесь Git из папки проекта. Эти команды предназначены для первого пуша в пустой репозиторий. Замените `ВАШ_ЛОГИН` и `masterfresh` на имя владельца и репозитория из адресной строки GitHub.

```bash
git init -b main
git add index.html projects.html project.html css js images reviews.json README.md .nojekyll
git commit -m "Add MasterFresh website"
git remote add origin https://github.com/ВАШ_ЛОГИН/masterfresh.git
git push -u origin main
```

### 3. Включите GitHub Pages

1. Откройте репозиторий, затем **Settings → Pages**.
2. В блоке **Build and deployment** в поле **Source** выберите **Deploy from a branch**.
3. В поле **Branch** выберите **main**, рядом укажите **/ (root)**.
4. Нажмите **Save**. [Настройка источника публикации](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

### 4. Найдите адрес сайта

После завершения публикации снова откройте **Settings → Pages** и нажмите **Visit site**. Адрес проекта обычно выглядит как `https://ВАШ_ЛОГИН.github.io/masterfresh/`. Если ссылки ещё нет, проверьте выполнение публикации во вкладке **Actions**. При дальнейших изменениях достаточно отправить коммит в `main`. [Публикация сайта GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)

## Добавление проекта

1. Добавьте объект в массив `PROJECTS` в `js/projects.js`. Уникальный `id` из латинских букв, цифр и дефисов используется в ссылке `project.html?id=<id>`.
2. Укажите `title`, `description` и `category`. Ключи категорий перечислены в `PROJECT_CATEGORIES`.
3. Заполните поля кейса по подтверждённым материалам: `task` и `result` — строки, `tags`, `work` и `technologies` — массивы строк. При необходимости добавьте `facts` как объект с подписями и значениями.
4. Укажите путь `cover` или короткий текст для обложки в `coverTitle`. В `gallery` добавьте объекты с полями `src`, `alt` и `caption` или оставьте пустой массив.

Когда в каталоге появятся проекты, раздел и ссылки станут видны на главной. На главной отображаются первые три проекта из массива.

## Замена изображений, текстов и ссылок

- **Изображения.** Положите новые файлы в `images/`. Для главной обновите `src` у `.hero-image` в `index.html`. Для кейса измените `cover` и `gallery` в `js/projects.js`. В `alt` кратко опишите содержание каждого скриншота. Используйте путь вида `images/project-cover.webp` и соблюдайте регистр букв в имени файла.
- **Тексты.** Редактируйте главную и услуги в `index.html`, содержимое кейсов в `js/projects.js`, заголовки разделов кейса в `project.html`. Шапка и футер записаны в каждом из трёх HTML-файлов. Цвета заданы в начале `css/style.css`.
- **Контакты.** Ссылки находятся в HTML трёх страниц. Если меняется Telegram, также обновите адрес для черновика в `js/reviews.js`.

После правок откройте главную и каталог. Если вы добавили кейс, проверьте фильтры, переход по `?id=` и пути к изображениям. Проверьте также мобильное меню и черновик формы. Затем загрузите изменения в `main`.

## Публикация отзывов

Посетитель заполняет форму на главной странице и отправляет подготовленный черновик в Telegram. Владелец публикует согласованные отзывы в `reviews.json` и отправляет изменения в `main`. В начале списка размещайте новые записи. Для каждой записи укажите отображаемое имя (`name`), оценку целым числом от 1 до 5 (`rating`) и текст (`text`). Пустой список — `[]`. Сайт загружает файл по HTTP и выводит отзывы как обычный текст.
