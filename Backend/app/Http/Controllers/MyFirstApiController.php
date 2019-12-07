<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\People;
class MyFirstApiController extends Controller
{
    public function index(Request $req){
        $data = People::all();

        return response()
                ->json(["names"=>$data]);

    }
}
