<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class LoginController extends Controller
{
    public function index(Request $request){
        

        $senha = DB::table('logins')->where('user',$request->user)->value('password');
        if($senha === $request->password){
            $token = DB::table('logins')->where('user',$request->user)->value('api_token');
            $pass = 'any';
        }else{
            $token = 'undefined';
            $pass = ['password'=>'any'];
        }

        return response()->json(['message'=>'Aguarde...','token'=>$token,'error'=>$pass],200);
    }
}
