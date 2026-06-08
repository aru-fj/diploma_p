export type JobSeekerLanguage = "en" | "kk" | "ru";

export const DEFAULT_JOBSEEKER_LANGUAGE: JobSeekerLanguage = "en";

export const JOBSEEKER_LANGUAGE_STORAGE_KEY = "mediahire-jobseeker-language";

export function isJobSeekerLanguage(value: string | null): value is JobSeekerLanguage {
  return value === "en" || value === "kk" || value === "ru";
}

const dictionary: Record<string, Record<JobSeekerLanguage, string>> = {
  // Navbar
  "nav.home": { en: "Home", kk: "Басты бет", ru: "Главная" },
  "nav.searchJob": { en: "Search Job", kk: "Жұмыс іздеу", ru: "Поиск работы" },
  "nav.myProfile": { en: "My Profile", kk: "Менің профилім", ru: "Мой профиль" },
  "nav.community": { en: "Community", kk: "Қауымдастық", ru: "Сообщество" },

  // Common
  "common.jobSeeker": { en: "Job Seeker", kk: "Жұмыс іздеуші", ru: "Соискатель" },
  "common.home": { en: "Home", kk: "Басты бет", ru: "Главная" },
  "common.activity": { en: "Activity", kk: "Белсенділік", ru: "Активность" },
  "common.main": { en: "Main", kk: "Негізгі", ru: "Главное" },
  "common.save": { en: "Save", kk: "Сақтау", ru: "Сохранить" },
  "common.saved": { en: "Saved", kk: "Сақталды", ru: "Сохранено" },
  "common.cancel": { en: "Cancel", kk: "Болдырмау", ru: "Отмена" },
  "common.search": { en: "Search", kk: "Іздеу", ru: "Поиск" },
  "common.filters": { en: "Filters", kk: "Сүзгілер", ru: "Фильтры" },
  "common.clearFilters": { en: "Clear filters", kk: "Сүзгілерді тазалау", ru: "Очистить фильтры" },
  "common.apply": { en: "Apply", kk: "Өтініш беру", ru: "Откликнуться" },
  "common.viewDetails": { en: "View details", kk: "Толығырақ көру", ru: "Подробнее" },
  "common.viewProfile": { en: "View profile", kk: "Профильді көру", ru: "Посмотреть профиль" },
  "common.edit": { en: "Edit", kk: "Өңдеу", ru: "Редактировать" },
  "common.delete": { en: "Delete", kk: "Жою", ru: "Удалить" },
  "common.add": { en: "Add", kk: "Қосу", ru: "Добавить" },
  "common.upload": { en: "Upload", kk: "Жүктеу", ru: "Загрузить" },
  "common.back": { en: "Back", kk: "Артқа", ru: "Назад" },
  "common.next": { en: "Next", kk: "Келесі", ru: "Далее" },
  "common.close": { en: "Close", kk: "Жабу", ru: "Закрыть" },
  "common.open": { en: "Open", kk: "Ашу", ru: "Открыть" },
  "common.send": { en: "Send", kk: "Жіберу", ru: "Отправить" },
  "common.message": { en: "Message", kk: "Хабарлама", ru: "Сообщение" },
  "common.messages": { en: "Messages", kk: "Хабарламалар", ru: "Сообщения" },
  "common.loading": { en: "Loading", kk: "Жүктелуде", ru: "Загрузка" },
  "common.noResults": { en: "No results", kk: "Нәтиже жоқ", ru: "Нет результатов" },
  "common.showMore": { en: "Show more", kk: "Көбірек көрсету", ru: "Показать больше" },
  "common.seeAll": { en: "See all", kk: "Барлығын көру", ru: "Смотреть все" },
  "common.help": { en: "Help", kk: "Көмек", ru: "Помощь" },
  "common.logOut": { en: "Log out", kk: "Шығу", ru: "Выйти" },
  "common.notifications": { en: "Notifications", kk: "Хабарландырулар", ru: "Уведомления" },
  "common.openMenu": { en: "Open menu", kk: "Мәзірді ашу", ru: "Открыть меню" },
  "common.closeMenu": { en: "Close menu", kk: "Мәзірді жабу", ru: "Закрыть меню" },
  "common.notSpecified": { en: "Not specified", kk: "Көрсетілмеген", ru: "Не указано" },

  // Settings
  "settings.title": { en: "Settings", kk: "Баптаулар", ru: "Настройки" },
  "settings.description": {
    en: "Manage notifications, profile visibility, integrations, and security.",
    kk: "Хабарландыруларды, профиль көрінуін, интеграцияларды және қауіпсіздікті басқарыңыз.",
    ru: "Управляйте уведомлениями, видимостью профиля, интеграциями и безопасностью."
  },
  "settings.language": { en: "Language", kk: "Тіл", ru: "Язык" },
  "settings.english": { en: "English", kk: "Ағылшын тілі", ru: "Английский" },
  "settings.kazakh": { en: "Kazakh", kk: "Қазақ тілі", ru: "Казахский" },
  "settings.russian": { en: "Russian", kk: "Орыс тілі", ru: "Русский" },
  "settings.theme": { en: "Theme", kk: "Тақырып", ru: "Тема" },
  "settings.light": { en: "Light", kk: "Жарық", ru: "Светлая" },
  "settings.system": { en: "System", kk: "Жүйелік", ru: "Системная" },
  "settings.newPassword": { en: "New Password", kk: "Жаңа құпиясөз", ru: "Новый пароль" },
  "settings.confirmPassword": { en: "Confirm Password", kk: "Құпиясөзді растау", ru: "Подтвердите пароль" },
  "settings.enterNewPassword": { en: "Enter new password", kk: "Жаңа құпиясөзді енгізіңіз", ru: "Введите новый пароль" },
  "settings.confirmPasswordPlaceholder": { en: "Confirm password", kk: "Құпиясөзді растаңыз", ru: "Подтвердите пароль" },
  "settings.jobAlerts": { en: "Job Alerts", kk: "Жұмыс хабарландырулары", ru: "Уведомления о вакансиях" },
  "settings.applicationUpdates": { en: "Application Updates", kk: "Өтініш жаңартулары", ru: "Обновления откликов" },
  "settings.profileVisibility": { en: "Profile Visibility", kk: "Профиль көрінуі", ru: "Видимость профиля" },
  "settings.publicPortfolio": { en: "Public Portfolio", kk: "Ашық портфолио", ru: "Публичное портфолио" },
  "settings.googleIntegration": { en: "Google integration", kk: "Google интеграциясы", ru: "Интеграция Google" },
  "settings.savedSuccess": { en: "Settings saved successfully.", kk: "Баптаулар сәтті сақталды.", ru: "Настройки успешно сохранены." },
  "settings.passwordMinError": { en: "Password must be at least 8 characters", kk: "Құпиясөз кемінде 8 таңбадан тұруы керек", ru: "Пароль должен содержать минимум 8 символов" },
  "settings.passwordMatchError": { en: "Passwords must match", kk: "Құпиясөздер сәйкес келуі керек", ru: "Пароли должны совпадать" },

  // Profile
  "profile.portfolio": { en: "Portfolio", kk: "Портфолио", ru: "Портфолио" },
  "profile.resume": { en: "Resume", kk: "Түйіндеме", ru: "Резюме" },
  "profile.reviews": { en: "Reviews", kk: "Пікірлер", ru: "Отзывы" },
  "profile.addProject": { en: "Add Project", kk: "Жоба қосу", ru: "Добавить проект" },
  "profile.about": { en: "About", kk: "Мен туралы", ru: "О себе" },
  "profile.skills": { en: "Skills", kk: "Дағдылар", ru: "Навыки" },
  "profile.experience": { en: "Experience", kk: "Тәжірибе", ru: "Опыт" },
  "profile.education": { en: "Education", kk: "Білім", ru: "Образование" },
  "profile.languages": { en: "Languages", kk: "Тілдер", ru: "Языки" },
  "profile.location": { en: "Location", kk: "Орналасқан жері", ru: "Локация" },
  "profile.availability": { en: "Availability", kk: "Қолжетімділік", ru: "Доступность" },
  "profile.contact": { en: "Contact", kk: "Байланыс", ru: "Контакт" },
  "profile.projects": { en: "Projects", kk: "Жобалар", ru: "Проекты" },
  "profile.rating": { en: "Rating", kk: "Рейтинг", ru: "Рейтинг" },

  // Dashboard
  "dashboard.activity": { en: "Activity", kk: "Белсенділік", ru: "Активность" },
  "dashboard.applications": { en: "Applications", kk: "Өтініштер", ru: "Отклики" },
  "dashboard.saved": { en: "Saved", kk: "Сақталғандар", ru: "Сохранённые" },
  "dashboard.favorites": { en: "Favorites", kk: "Таңдаулылар", ru: "Избранное" },
  "dashboard.recentActivity": { en: "Recent activity", kk: "Соңғы белсенділік", ru: "Недавняя активность" },
  "dashboard.status": { en: "Status", kk: "Мәртебе", ru: "Статус" },
  "dashboard.applied": { en: "Applied", kk: "Жіберілді", ru: "Отправлено" },
  "dashboard.interviewed": { en: "Interviewed", kk: "Сұхбат өтті", ru: "Интервью" },
  "dashboard.accepted": { en: "Accepted", kk: "Қабылданды", ru: "Принято" },
  "dashboard.rejected": { en: "Rejected", kk: "Қабылданбады", ru: "Отклонено" },

  // Jobs
  "jobs.searchJobs": { en: "Search jobs", kk: "Жұмыс іздеу", ru: "Поиск вакансий" },
  "jobs.workLanguage": { en: "Work Language", kk: "Жұмыс тілі", ru: "Язык работы" },
  "jobs.publicationDate": { en: "Publication date", kk: "Жарияланған күні", ru: "Дата публикации" },
  "jobs.educationLevel": { en: "Education level", kk: "Білім деңгейі", ru: "Уровень образования" },
  "jobs.jobType": { en: "Job type", kk: "Жұмыс түрі", ru: "Тип работы" },
  "jobs.distance": { en: "Distance", kk: "Қашықтық", ru: "Расстояние" },
  "jobs.salary": { en: "Salary", kk: "Жалақы", ru: "Зарплата" },
  "jobs.workMode": { en: "Work mode", kk: "Жұмыс форматы", ru: "Формат работы" },
  "jobs.company": { en: "Company", kk: "Компания", ru: "Компания" },
  "jobs.requirements": { en: "Requirements", kk: "Талаптар", ru: "Требования" },
  "jobs.benefits": { en: "Benefits", kk: "Артықшылықтар", ru: "Бенефиты" },
  "jobs.similarJobs": { en: "Similar jobs", kk: "Ұқсас жұмыстар", ru: "Похожие вакансии" },
  "jobs.fullTime": { en: "Full time", kk: "Толық жұмыс күні", ru: "Полная занятость" },
  "jobs.partTime": { en: "Part time", kk: "Толық емес жұмыс күні", ru: "Частичная занятость" },
  "jobs.remote": { en: "Remote", kk: "Қашықтан", ru: "Удалённо" },
  "jobs.hybrid": { en: "Hybrid", kk: "Гибрид", ru: "Гибрид" },
  "jobs.onSite": { en: "On-site", kk: "Кеңседе", ru: "В офисе" },
  "jobs.allKazakhstan": { en: "All Kazakhstan", kk: "Барлық Қазақстан", ru: "Весь Казахстан" },
  "jobs.all": { en: "All", kk: "Барлығы", ru: "Все" },

  // Resume
  "resume.myResume": { en: "My Resume", kk: "Менің түйіндемем", ru: "Моё резюме" },
  "resume.personalInformation": { en: "Personal information", kk: "Жеке ақпарат", ru: "Личная информация" },
  "resume.aboutMe": { en: "About me", kk: "Мен туралы", ru: "Обо мне" },
  "resume.workExperience": { en: "Work experience", kk: "Жұмыс тәжірибесі", ru: "Опыт работы" },
  "resume.education": { en: "Education", kk: "Білім", ru: "Образование" },
  "resume.skills": { en: "Skills", kk: "Дағдылар", ru: "Навыки" },
  "resume.links": { en: "Links", kk: "Сілтемелер", ru: "Ссылки" },
  "resume.languages": { en: "Languages", kk: "Тілдер", ru: "Языки" },
  "resume.jobPreferences": { en: "Job preferences", kk: "Жұмыс қалаулары", ru: "Предпочтения по работе" },
  "resume.benefits": { en: "Benefits", kk: "Артықшылықтар", ru: "Бенефиты" },
  "resume.saveResume": { en: "Save resume", kk: "Түйіндемені сақтау", ru: "Сохранить резюме" }
};

export function translateJobSeekerText(
  language: JobSeekerLanguage,
  key: string
) {
  return dictionary[key]?.[language] ?? dictionary[key]?.en ?? key;
}

export function translateJobSeekerRawText(
  language: JobSeekerLanguage,
  text: string
) {
  const normalizedText = text.trim();

  if (!normalizedText) {
    return text;
  }

  for (const item of Object.values(dictionary)) {
    const values = Object.values(item);

    if (values.includes(normalizedText)) {
      return item[language] ?? item.en ?? text;
    }
  }

  return text;
}

export function translateJobSeekerAttribute(
  language: JobSeekerLanguage,
  value: string | null
) {
  if (!value) {
    return value;
  }

  return translateJobSeekerRawText(language, value);
}
