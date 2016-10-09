<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/
Route::get('auth/begin', 'Auth\LoginController@showLoginForm');
Route::post('auth/begin', 'Auth\LoginController@login');
Route::get('/login', function () {
      return view('auth.login');
});

Route::get('/home', function () {
      return view('auth.login');
});
Route::group(['middleware' => 'auth'], function()
{
  /*Route::get('/', function () {
      return view('main.index');
  });*/

  //Route to logout
  Route::get('auth/logout','LoginController@logout');

  // Route to site to see books in database
  Route::get('/','LibrosController@getIndex');

});



  Route::get('/signup', function () {
      return view('auth.register');
  });
