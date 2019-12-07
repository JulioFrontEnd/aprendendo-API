<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\People;
class MyFirstApiController extends Controller
{
    public function index(){
        $data = People::all();

        return response()
                ->json(["names"=>$data]);

    }

    public function create(Request $req){
        $people = new People;

        $people->name = $req->name;
        $people->cpf = $req->cpf;
        $people->active = $req->active;
        $people->save();

        return response()
                    ->json(["message"=>"Obrigado por se cadastrar!"]);
    }
}
