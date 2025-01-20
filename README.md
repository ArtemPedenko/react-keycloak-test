1. Поднять контейнер с keycloak
```bash
docker-compose up --build -d
```
Сначала настройка в Keycloak:

localhost:8080 (user:admin pass:admin)
Создайте новый realm
Создайте нового client с настройками:
```
Access Type: public
Valid Redirect URIs: http://localhost:3000/*
Web Origins: http://localhost:3000
```

Создайте роли (например, 'user', 'admin')
Создайте тестового пользователя и назначьте ему роли

Client scopes -> roles -> mappers -> realm roles
Name: realm roles
Add to ID token: ON
Add to access token: ON
Add to userinfo: ON

2. Изменить конфиг keycloak
```JavaScript
export const KEYCLOAK_CONFIG = {
  realm: 'react-realm',
  clientId: 'react-client',
  url: 'http://localhost:8080'
}

```