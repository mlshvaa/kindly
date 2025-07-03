# 📘 API Маршруты — Платформа Нянь


Сгенерировано: 03.07.2025 15:27


| Метод | Роут | Описание |
|-------|------|----------|
| `GET` | `/api/specialists` | Получить всех специалистов |
| `GET` | `/api/specialists/:id` | Получить одного специалиста по id |
| `POST` | `/api/specialists` | Создать специалиста (временно, для теста) |
| `PUT` | `/api/specialists/:id` | Обновить анкету специалиста |
| `DELETE` | `/api/specialists/:id` | Удалить специалиста |
| `GET` | `/api/services` | Получить все типы услуг |
| `POST` | `/api/services` | Добавить новую услугу |
| `POST` | `/api/specialist-services` | Привязать услугу к специалисту |
| `DELETE` | `/api/specialist-services` | Удалить услугу у специалиста |
| `GET` | `/api/reviews` | Получить все отзывы |
| `POST` | `/api/reviews` | Добавить отзыв от клиента |
| `GET` | `/api/calendar` | Получить все доступные слоты |
| `POST` | `/api/calendar` | Добавить новый слот |
| `GET` | `/api/specialist/calendar` | Получить расписание текущего специалиста |
| `PATCH` | `/api/specialist/calendar/:id/toggle` | Переключить доступность конкретного слота |
| `POST` | `/api/specialist/calendar` | Добавить новый слот вручную |
| `GET` | `/api/requests` | Получить все заявки (для админа) |
| `POST` | `/api/requests` | Отправить заявку |
| `GET` | `/api/client/requests` | Получить заявки, отправленные клиентом |
| `DELETE` | `/api/client/requests/:id` | Удалить свою заявку |
| `PATCH` | `/api/client/settings` | Изменить email, пароль и т.д. |
| `GET` | `/api/specialist/requests` | Получить входящие заявки |
| `PATCH` | `/api/specialist/requests/:id` | Обновить статус заявки |
| `GET` | `/api/users` | Получить всех пользователей |
| `GET` | `/api/users/:id` | Получить пользователя по id |
| `GET` | `/api/profile` | Получить текущего авторизованного пользователя |
| `PUT` | `/api/profile` | Обновить свои данные |