<?php

use Illuminate\Http\Request;

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
Route::post('/test/login','LoginController@index');

Route::middleware(['logged'])->group(function(){
    Route::post('/test','MyFirstApiController@index');
    Route::post('/test/create','MyFirstApiController@create');
    Route::post('/test/delete/{id}','MyFirstApiController@delete');
    Route::post('/test/disable/{id}','MyFirstApiController@disable');
    Route::post('/test/find/{id}','MyFirstApiController@find');
    Route::post('/test/update','MyFirstApiController@update');
});


