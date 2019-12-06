<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MyFirstApiController extends Controller
{
    public function index(){
        $name = [
            "names" =>[
                [
                    "id"=>01,
                    "name"=>"Julio",
                    "bornDate"=>"2002-02-02",
                    "active"=>1,
                ],
                [
                    "id"=>02,
                    "name"=>"Philip",
                    "bornDate"=>"2001-01-09",
                    "active"=>1,
                ],
                [
                    "id"=>03,
                    "name"=>"Jean",
                    "bornDate"=>"2005-01-04",
                    "active"=>1,
                ],
                [
                    "id"=>04,
                    "name"=>"Angel",
                    "bornDate"=>"1990-12-12",
                    "active"=>0,
                ],
            ]
        ];

        return response()
                ->json($name);

    }
}
