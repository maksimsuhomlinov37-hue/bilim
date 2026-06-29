/* === АВТОРИЗАЦИЯ И УМНАЯ СЕССИЯ (LocalStorage на 30 дней) === */
const SESSION_KEY = 'bilimclass_user_session_time';
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000; // Ровно 30 дней в миллисекундах

const loginBtn = document.getElementById('loginBtn');
const loginScreen = document.getElementById('loginScreen');
const app = document.getElementById('app');

// Функция проверки, авторизован ли пользователь меньше 30 дней назад
function checkSession() {
    const sessionTime = localStorage.getItem(SESSION_KEY);
    const nowTime = Date.now();

    // Если штамп времени есть и разница меньше 30 дней — пускаем без ввода пароля
    if (sessionTime && (nowTime - Number(sessionTime) < THIRTY_DAYS_MS)) {
        loginScreen.style.display = 'none';
        app.style.display = 'flex';
    } else {
        // Если время истекло или записи нет — сбрасываем и показываем экран входа
        localStorage.removeItem(SESSION_KEY);
        loginScreen.style.display = 'flex';
        app.style.display = 'none';
    }
}

loginBtn.onclick = ()=>{
    loginBtn.classList.add('loading');
    loginBtn.innerHTML = 'Загрузка...';

    setTimeout(()=>{
        // Сохраняем точное текущее время входа
        localStorage.setItem(SESSION_KEY, Date.now());

        loginScreen.style.opacity = '0';
        setTimeout(()=>{
            loginScreen.style.display = 'none';
            app.style.display = 'flex';
            loginBtn.classList.remove('loading');
            loginBtn.innerHTML = 'Войти';
        },500);

    },1400);
};

// Запускаем автоматическую проверку сразу при загрузке страницы
checkSession();

/* MOBILE NAVIGATION */
const mobileBtn = document.getElementById('mobileBtn');
const sidebar = document.getElementById('sidebar');

mobileBtn.onclick = ()=>{
    sidebar.classList.toggle('open');
};

/* SCHEDULE DATA */
const schedule = {
    1:[
        { icon:'📘', title:'Математика', room:'Кабинет 24', time:'08:00 — 08:45' },
        { icon:'🌍', title:'География', room:'Кабинет 17', time:'09:00 — 09:45' },
        { icon:'🧪', title:'Биология', room:'Кабинет 31', time:'10:00 — 10:45' }
    ],
    2:[
        { icon:'📖', title:'Литература', room:'Кабинет 12', time:'08:00 — 08:45' },
        { icon:'💻', title:'Информатика', room:'Кабинет 19', time:'09:00 — 09:45' },
        { icon:'⚽', title:'Физкультура', room:'Спортзал', time:'10:00 — 10:45' }
    ],
    3:[
        { icon:'🧬', title:'Химия', room:'Кабинет 20', time:'08:00 — 08:45' },
        { icon:'📕', title:'Русский язык', room:'Кабинет 11', time:'09:00 — 09:45' }
    ],
    4:[
        { icon:'🇬🇧', title:'Английский язык', room:'Кабинет 5', time:'08:00 — 08:45' },
        { icon:'🧠', title:'История', room:'Кабинет 16', time:'09:00 — 09:45' }
    ],
    5:[
        { icon:'🎨', title:'ИЗО', room:'Кабинет 9', time:'08:00 — 08:45' },
        { icon:'🎵', title:'Музыка', room:'Кабинет 6', time:'09:00 — 09:45' }
    ]
};

/* RENDER LESSONS */
const lessons = document.getElementById('lessons');
const dayButtons = document.querySelectorAll('.day');

function renderLessons(day){
    lessons.innerHTML = '';
    if (!schedule[day]) return;

    schedule[day].forEach(item=>{
        lessons.innerHTML += `
        <div class="lesson">
            <div class="lessonLeft">
                <div class="lessonIcon">${item.icon}</div>
                <div>
                    <h3>${item.title}</h3>
                    <p>${item.room}</p>
                </div>
            </div>
            <div class="time">${item.time}</div>
        </div>
        `;
    });
}

/* SMART DAY ACTIVE SETUP */
const now = new Date();
let currentDay = now.getDay();

if(currentDay === 0) currentDay = 1;
if(currentDay > 5) currentDay = 5;

dayButtons.forEach(btn=>{
    if(Number(btn.dataset.day) === currentDay){
        btn.classList.add('active');
    }

    btn.onclick = ()=>{
        dayButtons.forEach(b=> b.classList.remove('active'));
        btn.classList.add('active');
        renderLessons(btn.dataset.day);
    };
});

renderLessons(currentDay);

/* CURRENT DATE */
const months = ['ЯНВАРЯ','ФЕВРАЛЯ','МАРТА','АПРЕЛЯ','МАЯ','ИЮНЯ','ИЮЛЯ','АВГУСТА','СЕНТЯБРЯ','ОКТЯБРЯ','НОЯБРЯ','ДЕКАБРЯ'];
document.getElementById('todayDate').innerHTML = now.getDate() + ' ' + months[now.getMonth()];

const endYear = now.getFullYear() + 3;
console.log('Расписание доступно до', endYear);
