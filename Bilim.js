/* =========================
   ЭЛЕМЕНТЫ
========================= */

const loginScreen =
document.getElementById("loginScreen");

const dashboard =
document.getElementById("dashboard");

const loginInput =
document.getElementById("loginInput");

const passwordInput =
document.getElementById("passwordInput");

const loginBtn =
document.getElementById("loginBtn");

const logoutBtn =
document.getElementById("logoutBtn");

const usernameText =
document.getElementById("usernameText");


/* =========================
   ПРОВЕРКА LOCALSTORAGE
========================= */

window.addEventListener("load", () => {

  // Проверяем есть ли сохраненный пользователь
  const savedUser =
  localStorage.getItem("bilimUser");

  // Если пользователь найден
  if(savedUser){

    // Получаем объект
    const user =
    JSON.parse(savedUser);

    // Открываем dashboard
    openDashboard(user.login);

  }

});


/* =========================
   ВХОД
========================= */

loginBtn.addEventListener("click", () => {

  // Значения input
  const login =
  loginInput.value.trim();

  const password =
  passwordInput.value.trim();

  // Проверка
  if(login === "" || password === ""){

    alert("Заполните все поля");
    return;

  }

  // Объект пользователя
  const userData = {

    login: login,
    password: password

  };

  // Сохраняем
  localStorage.setItem(
    "bilimUser",
    JSON.stringify(userData)
  );

  // Открываем dashboard
  openDashboard(login);

});


/* =========================
   DASHBOARD
========================= */

function openDashboard(login){

  // Скрываем login
  loginScreen.classList.add("hidden");

  // Показываем dashboard
  dashboard.classList.remove("hidden");

  // Имя пользователя
  usernameText.textContent =
  `Вы вошли как: ${login}`;

}


/* =========================
   ВЫХОД
========================= */

logoutBtn.addEventListener("click", () => {

  // Удаляем localStorage
  localStorage.removeItem("bilimUser");

  // Скрываем dashboard
  dashboard.classList.add("hidden");

  // Показываем login
  loginScreen.classList.remove("hidden");

  // Очищаем поля
  loginInput.value = "";
  passwordInput.value = "";

});
