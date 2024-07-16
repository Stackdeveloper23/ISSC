<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;


class AuthController extends Controller
{
   public function login(Request $request){
        $response = ["success"=>false];
        //validacion
       $validator = Validator::make($request->all(),[
           'email' => 'required|email',
           'password' => 'required',
       ]);

       if($validator->fails()){
           $response = ["error"=>$validator->errors()];
           return response()->json($response, 200);
       }

       if(auth()->attempt(['email' => $request->email, 'password' => $request->password])){
        $user = auth()->user();
        $user->hasRole('user');

        $response['token'] = $user->createToken("codea.app")->plainTextToken;
        $response['user'] = $user;
        $response['message'] = "Logueado";
        $response['success'] = true;

       }
       return response()->json($response,200);

    }

  public function logout()
  {
      $response = ["success" => false];

      if (auth()->user()) {
          auth()->user()->tokens()->delete();
          $response = [
              "success" => true,
              "message" => "Session closed"
          ];
      }

      return response()->json($response);
  }
} 
