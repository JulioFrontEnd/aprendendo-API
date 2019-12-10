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
            'name'=>'bail|required|regex:/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/',
            'cpf'=>'bail|required|max:14|regex:/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/',
            'active'=>'required'
        ],$messages);

           
        if ($validator->fails()){
            $msg = "Algum dado está incorreto!";
            $error = $validator->errors();

        }else{
            $dados = new People;
            $dados->name = $request->name;
            $dados->active = $request->active;
            $dados->cpf = $request->cpf;
            $dados->save();
            $msg = "Obrigado por se cadastrar!";
            $error = 'any';
        }

        

        return response()
                    ->json(["message"=>$msg,"error"=>$error],200);     
    }

    public function disable(Request $request){
        $disable = People::find($request->id);
        $disable->active = 0;
        $disable->save();
        return response()
                ->json(["result"=>'disabled'],200);
    }

    public function delete(Request $request){
        $data = People::destroy($request->id);

        return response()
                ->json(["result"=>'deleted'],200);

    }

    public function find(Request $request){
        $data = People::find($request->id);

        return response()
                ->json(["name"=>$data->name,"cpf"=>$data->cpf,"active"=>$data->active],200);
    }
    public function update(Request $request){
        $messages = [
            ":attribute",
        ];

        $validator = Validator::make($request->all(), [
            'name'=>'bail|required|regex:/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/',
            'cpf'=>'bail|required|max:14|regex:/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/',
            'active'=>'required'
        ],$messages);

           
        if ($validator->fails()){
            $msg = "Algum dado está incorreto!";
            $error = $validator->errors();

        }else{
            $dados = People::find($request->id);
            $dados->name = $request->name;
            $dados->active = $request->active;
            $dados->cpf = $request->cpf;
            $dados->save();
            $msg = "Usuario Alterado!";
            $error = 'any';
        }

        

        return response()
                    ->json(["message"=>$msg,"error"=>$error],200);  
    }
}
