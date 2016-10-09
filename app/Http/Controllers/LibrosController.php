<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class LibrosController extends Controller
{
  public function getIndex(){
    return view('libro.index');
  }
    //ale loca
}
