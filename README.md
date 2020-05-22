# Анонимный чат Instatalk

Приложение для чата

### Демо версия

Демо версия доступна по адресу
* [goodp-chat.herokuapp.com/](https://goodp-chat.herokuapp.com/)

## Установка
```
bundle install

yarn install 

rails db:migrate
```

## Запуск
Выполните ```rails s```

## Настройка
В системе должен быть установлен и настроен `Redis`

Для деплоя необходимо прописать URL адаптера `config/cable.yml`

```
production:
  adapter: redis
  url: <ваш_URL>
  channel_prefix: instatalk_production
```

## Автор

* **Хороший программист**
* **LEM** - *Учебный проект* - [Lemeri](https://github.com/Lemeri02)
