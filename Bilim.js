/* =========================================
   ПОЛУЧЕНИЕ ЭЛЕМЕНТОВ СО СТРАНИЦЫ
========================================= */

const loginScreen = document.getElementById("loginScreen");
const dashboard = document.getElementById("dashboard");

const loginInput = document.getElementById("loginInput");
const passwordInput = document.getElementById("passwordInput");

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

const userInfo = document.getElementById("userInfo");


/* =========================================
   ПРОВЕРКА LOCALSTORAGE ПРИ ЗАГРУЗКЕ
========================================= */

window.addEventListener("load", () => {

  // Получаем данные пользователя
  const savedUser = localStorage.getItem("bilimUser");

  // Если пользователь найден
  if (savedUser) {

    // Переводим строку обратно в объект
    const userData = JSON.parse(savedUser);

    // Показываем dashboard
    showDashboard(userData.login);

  }

});


/* =========================================
   ОБРАБОТКА КНОПКИ ВХОДА
========================================= */

loginBtn.addEventListener("click", () => {

  // Получаем значения полей
  const login = loginInput.value.trim();
  const password = passwordInput.value.trim();

  // Простая проверка
  if (login === "" || password === "") {

    alert("Пожалуйста заполните все поля");
    return;

  }

  // Создаем объект пользователя
  const userData = {
    login: login,
    password: password
  };

  // Сохраняем в localStorage
  localStorage.setItem(
    "bilimUser",
    JSON.stringify(userData)
  );

  // Показываем главный экран
  showDashboard(login);

});


/* =========================================
   ФУНКЦИЯ ПОКАЗА DASHBOARD
========================================= */

function showDashboard(login) {

  // Скрываем вход
  loginScreen.classList.add("hidden");

  // Показываем dashboard
  dashboard.classList.remove("hidden");

  // Отображаем логин
  userInfo.textContent =
    `Вы вошли как: ${login}`;

}


/* =========================================
   ВЫХОД ИЗ АККАУНТА
========================================= */

logoutBtn.addEventListener("click", () => {

  // Удаляем данные
  localStorage.removeItem("bilimUser");

  // Показываем форму входа
  dashboard.classList.add("hidden");
  loginScreen.classList.remove("hidden");

  // Очищаем поля
  loginInput.value = "";
  passwordInput.value = "";

});
