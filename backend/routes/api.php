<?php

use App\Http\Controllers\Api\Admin\RolController;
use App\Http\Controllers\Api\Admin\UserController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Admin\SowController;
use App\Http\Controllers\Api\ExportController;
use App\Http\Controllers\Api\PasswordResetController;
use App\Models\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

  Route::prefix('v1')->group(function(){
    // AUTH
    Route::post('/auth/login', [AuthController::class, 'login'])->name('login');
    Route::post('/password/reset-request',[PasswordResetController::class, 'requestReset']);
   
    
    
    // PRIVATE
    Route::group(['middleware' => 'auth:sanctum'], function (){

        // logout
        Route::post('/auth/logout', [AuthController::class, 'logout']);
        
        Route::group(['middleware' => ['auth:sanctum', 'role:admin']], function() {
        
        
        Route::get("/admin/totalUsers", [UserController::class, "countTotalUsers"]);
        Route::get("/admin/totalSows", [SowController::class, "countTotalSows"]);
        Route::get("/admin/userCount", [UserController::class, "countUsersByRole"]);
        Route::get("/admin/sowStatus", [SowController::class, "countState"]);
            // USER ROUTES
        Route::get('/admin/user/{id}', [UserController::class, 'getUserById']);
        Route::apiResource('/admin/user', UserController::class);
        Route::get('/admin/user-roles', [UserController::class, 'getAllUsersWithRoles']);
        Route::post('/admin/user/create', [UserController::class, 'store']);

        Route::get('/admin/reset-requests', [PasswordResetController::class, 'getResetRequests']);
        Route::post('/admin/reset-requests/approve/{id}', [PasswordResetController::class, 'approveRequest']);
        Route::post('/admin/reset-requests/cancel', [PasswordResetController::class, 'cancelRequest']);
        Route::get('/admin/sows/{ticket_sow}/creator',[SowController::class, 'getCreatorInfo']);
        
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
            Route::get('/writer/sow/{id}', [SowController::class, 'show']);
            Route::post('/writer/sows/create', [SowController::class, 'create']);
            Route::put('/writer/sow/{id}', [SowController::class, 'update']);
            Route::get('/search/sows',[SowController::class, 'search'])->name('sows.search');
        });

         // READER ROUTES
         Route::group(['middleware' => 'role:reader'], function() {
        
        Route::get('/reader/sows', [SowController::class, 'index']);
        Route::get('/reader/sow/{id}', [SowController::class, 'show']);
        });

        
        Route::get('/enums/{field}', [SowController::class, 'getEnumOptions']);
        Route::get('/export/xlsx' , [ExportController::class, 'exportXlsx']);
        Route::get('/export/csv' , [ExportController::class, 'exportCsv']);
      

    });
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');