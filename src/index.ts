import fetch from "node-fetch";

type TRequest = (method: string, params?: {}) => Promise<any>;

export class OAuth {
  #API_VERSION: string;
  #API_HOST: string;

  #SCOPE: string;
  #CLIENT_ID: string;
  #CLIENT_SECRET: string;

  constructor(
    version = "5.131",
    host = "https://api.vk.com/method/",
    scope = "all",
    id = "2274003",
    secret = "hHbZxrka2uZ6jB1inYsH"
  ) {
    this.#API_VERSION = version;
    this.#API_HOST = host;
    this.#SCOPE = scope;
    this.#CLIENT_ID = id;
    this.#CLIENT_SECRET = secret;
  };

  request: TRequest = (method, params = {}) => new Promise((resolve, reject) => {
    fetch(`${this.#API_HOST}${method}?${new URLSearchParams({ v: this.#API_VERSION, ...params }).toString()}`)
      .then((data) => data.json())
      .then((data) => {
        if (data.error) {
          reject(data);
        };
        resolve(data.response || data);
      })
      .catch((err) => reject(err));
  });

  login = (username: string, password: string, code?: string, captchaSid?: string, captchaKey?: string) => {
    const params = {
      "scope": this.#SCOPE,
      "client_id": this.#CLIENT_ID,
      "client_secret": this.#CLIENT_SECRET,
      "username": username,
      "password": password,
      "2fa_supported": "1",
      "grant_type": "password"
    };

    if (code) Object.assign(params, { "code": code }); // Код полученый из SMS из метода validatePhone, при авторизации 2FA.
    if (captchaSid) Object.assign(params, { "captcha_sid": captchaSid }); // Индификатор капчи.
    if (captchaKey) Object.assign(params, { "captcha_key": captchaKey }); // Текст с капчи.

    this.#API_HOST = "https://oauth.vk.com/";

    return this.request("token", params);
  };

  validatePhone = (sid: string) => {
    this.#API_HOST = "https://api.vk.com/method/";

    return this.request("auth.validatePhone", {
      "client_id": this.#CLIENT_ID,
      "client_secret": this.#CLIENT_SECRET,
      "api_id": this.#CLIENT_ID,
      "sid": sid
    });
  };
};

export class Request {
  #ACCESS_TOKEN: string;
  #API_VERSION: string;
  #API_HOST: string;
  #USER_AGENT: string;

  constructor(
    token: string,
    version = "5.131",
    host = "https://api.vk.com/method/",
    agent = "VKAndroidApp/8.17-15401 (Android 7.1.2; SDK 25; armeabi-v7a; google G011A; zh; 1280x720)"
  ) {
    this.#ACCESS_TOKEN = token;
    this.#API_VERSION = version;
    this.#API_HOST = host;
    this.#USER_AGENT = agent;
  };

  request: TRequest = (method, params = {}) => new Promise((resolve, reject) => {
    fetch(`${this.#API_HOST}${method}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": this.#USER_AGENT
      },
      body: new URLSearchParams({ access_token: this.#ACCESS_TOKEN, v: this.#API_VERSION, ...params })
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.error) {
          reject(data);
        };
        resolve(data.response || data);
      })
      .catch((err) => reject(err));
  });
};
