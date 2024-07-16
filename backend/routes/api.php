<?php

use App\Http\Controllers\api\Admin\RolController;
use App\Http\Controllers\Api\Admin\UserController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Admin\SowController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


  Route::prefix('v1')->group(function(){
    // AUTH
    Route::post('/auth/login', [AuthController::class, 'login'])->name('login');
    
    // PRIVATE
    Route::group(['middleware' => 'auth:sanctum'], function (){

        // logout
        Route::post('/auth/logout', [AuthController::class, 'logout']);
        
        Route::group(['middleware' => ['auth:sanctum', 'role:admin']], function() {
            // USER ROUTES
        Route::get('/admin/user/{id}', [UserController::class, 'getUserById']);
        Route::apiResource('/admin/user', UserController::class);
        Route::get('/admin/user-roles', [UserController::class, 'getAllUsersWithRoles']);
        Route::post('/admin/user/create', [UserController::class, 'store']);
        // ROLE ROUTES
        Route::get('/admin/roles', [RolController::class, 'index']);

        // SOW ROUTES
        Route::apiResource('/admin/sow', SowController::class);
        Route::post('/admin/sows/create', [SowController::class, 'create']);
  
        //Search
        Route::get('/search/sows',[SowController::class, 'search'])->name('sows.search');
        Route::get('/enums/{field}', [SowController::class, 'getEnumOptions']);
        });

        // WRITER ROUTES
        Route::group(['middleware' => 'role:writer'], function() {
            Route::get('/writer/sow', [SowController::class, 'index']);
            Route::post('/writer/sow/create', [SowController::class, 'create']);
            Route::put('/writer/sow/{id}', [SowController::class, 'update']);
            
            Route::get('/search/sows',[SowController::class, 'search'])->name('sows.search');
        });

         // READER ROUTES
         Route::group(['middleware' => 'role:reader'], function() {
        
        Route::get('/reader/sows', [SowController::class, 'index']);
        Route::get('/reader/sow/{id}', [SowController::class, 'show']);
        });



      

    });
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
