<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\People;
use Illuminate\Support\Facades\Validator;
class MyFirstApiController extends Controller
{
    public function index(){
        $data = People::all();

        return response()
                ->json(["names"=>$data]);

    }

    public function create(Request $request){
        $messages = [
            ":attribute",
        ];

        $validator = Validator::make($request->all(), [
            'name'=>'bail|required|regex:/^[a-záàâãéèêíïóôõöúçñ ]+$/',
            'cpf'=>'bail|required|max:14|regex:/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/',
            'active'=>'required'
        ],$messages);

           
        if ($validator->fails()){
            $msg = "Algum dado está incorreto!";
            $error = $validator->errors();

        }else{
            $people = new People;
            $people->name = $request->name;
            $people->cpf = $request->cpf;
            $people->active = $request->active;
            $people->save();
            $msg = "Obrigado por se cadastrar!";
            $error = 'any';
        }

        

        return response()
                    ->json(["message"=>$msg,"error"=>$error],200);     
    }
}
