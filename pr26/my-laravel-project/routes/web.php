<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


Route::get('/hello', function () {
    return 'Привет, мир!';
});


Route::get('/user/{name}', function ($name) {
    return "Привет, $name!";
});


Route::get('/greeting', function () {
    return view('greeting', [
        'name' => 'Студент',
        'course' => 'Laravel'
    ]);
});