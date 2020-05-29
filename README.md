# Подбор персонала

Для хранения сессии используется Redus

### Локальный Redus

Установка

`wget http://download.redis.io/releases/redis-6.0.3.tar.gz`

`tar xzf redis-6.0.3.tar.gz`

`cd redis-6.0.3`

`make`

Запуск

`src/redis-server`

### База данных

Миграции настроены, но без данных
Дамп с данными в `/serser/db.sql`


### Запуск приложения

`npm i`

`npm npm run build` 

`npm start`

### Пользователи 

`user1/123` - Администратор 

`user2/123` - Редактирование и просмотр

`user3/123` - Просмотр

