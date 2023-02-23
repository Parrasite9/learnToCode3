<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('people', function () {
    $people = DB::select('SELECT * FROM people ORDER BY id ASC');
    return $people;
});

Route::post('people', function (Request $request) {
    DB::insert('INSERT INTO people (name, age) VALUES (?, ?)', [$request->name, $request->age]);
    $people = DB::select('SELECT * FROM people ORDER BY id ASC');
    return $people;
});

Route::delete('people/{id}', function ($id) {
    DB::delete('DELETE FROM people WHERE id = ?', [$id]);
    $people = DB::select('SELECT * FROM people ORDER BY id ASC');
    return $people;
});

Route::put('people/{id}', function (Request $request, $id) {
    DB::update('UPDATE people SET name=?, age=? WHERE id = ?', [$request->name, $request->age, $id]);
    $people = DB::select('SELECT * FROM people ORDER BY id ASC');
    return $people;
});
