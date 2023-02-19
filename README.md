# node-vk-api

Библиотека для работы с API ВКонтакте.

## Установка

`npm i -s dsedinkin/node-vk-api#latest` или `yarn add dsedinkin/node-vk-api#latest`

## Использование

> ES6

```js
import { OAuth, Request } from "node-vk-api";
```

> ES5

```js
const { OAuth, Request } = require("node-vk-api");
```

## Прямая авторизация
Прямая авторизация — это авторизация по логину и паролю. Такой тип авторизации доступен маленькому кругу приложений, чаще всего это официальные приложения ВКонтакте.

При использовании прямой авторизации вы можете получить токен с полным доступом к аккаунту.

> Авторизация:
```js
import { OAuth } from "node-vk-api";

// В библиотеке используется id и секретный ключ от android официального клиента VK с получением всех прав. 
// Значения можно поменять указав все необходимые поля: new OAuth("5.131", "https://api.vk.com/method/", "all", "2274003", "hHbZxrka2uZ6jB1inYsH");

const oauth = new OAuth();

const username = "";
const password = "";

oauth.login(username, password)
  .then((data) => {
    console.log({ data });
  })
  .catch((error) => {
    console.error({ error });
  });
```

> 2FA:
```js
import { OAuth } from "node-vk-api";

const oauth = new OAuth();

// Если настроена двухфакторная аутентификация, то необходимо будет пройти еще одну проверку.

// Отправка кода подтверждения на номер телефона.
const sid = ""; // Параметр "validation_sid" из ошибки.
oauth.validatePhone(sid)
  .then((data) => {
    console.log({ data });
  })
  .catch((error) => {
    console.error({ error });
  });

// После получения кода необходимо переотправить первый запрос с параметром "code".
const code = ""; // Код полученый из SMS.
oauth.login(username, password, code)
  .then((data) => {
    console.log({ data });
  })
  .catch((error) => {
    console.error({ error });
  });
```

> Обработка капчи:
```js
import { OAuth } from "node-vk-api";

const oauth = new OAuth();

// Отправка решения капчи.
const captchaSid = "";
const captchaKey = "";
oauth.login(username, password, undefined, captchaSid, captchaKey)
  .then((data) => {
    console.log({ data });
  })
  .catch((error) => {
    console.error({ error });
  });
```

## Запросы к API Methods.
Для долгосрочной поддержки и простоты использования можно использовать любые методы api, включая незадокументированные на https://dev.vk.com/method.

> Пример:
```js
import { Request } from "node-vk-api";

const TOKEN = ""; // access_token.

const vk = new Request(TOKEN);

// Возвращает найденные аудиозаписи.
vk.request("audio.search", { q: "Надо ли — ЕГОР КРИД", count: 1 })
  .then((data) => {
    console.log("audio.search");
    console.log({ data });
  })
  .catch((error) => {
    console.error("audio.search");
    console.error({ error });
  });
```
