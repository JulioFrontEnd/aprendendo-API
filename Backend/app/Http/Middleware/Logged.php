<?php

namespace App\Http\Middleware;

use Closure;
use App\Login;

class Logged
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if(! (Login::where('api_token','=',$request->api_token)->exists())){
            $data  = [['id'=>1,"name"=>'você não está logado','cpf'=>'você não está logado','active'=>0],['id'=>2,"name"=>'você não está logado','cpf'=>'você não está logado','active'=>0]];
            return( 
                response()
                    ->json(
                        ['names'=>$data,'message'=>'não é possível fazer isto!, você não está logado','error'=>'any']
                    )
            );
        }
        $response = $next($request);
        return $response;
    }
}
