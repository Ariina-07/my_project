<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Приветствие</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #2c3e50;
        }
        .info {
            background: #e8f4fd;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Добро пожаловать в Laravel!</h1>
        
        <div class="info">
            <h2>Привет, {{ $name }}!</h2>
            <p>Вы изучаете фреймворк: <strong>{{ $course }}</strong></p>
        </div>

        <h3>Информация о системе:</h3>
        <ul>
            <li>PHP версия: {{ PHP_VERSION }}</li>
            <li>Laravel версия: {{ app()->version() }}</li>
            <li>Текущая дата: {{ date('d.m.Y H:i:s') }}</li>
        </ul>

        <h3>Навигация:</h3>
        <p>
            <a href="/">Главная страница</a> | 
            <a href="/hello">Простой маршрут</a> | 
            <a href="/user/Иван">Маршрут с параметром</a>
        </p>
    </div>
</body>
</html>