<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index(Request $request) {
        $roleFilter = $request->query('roles');
    
        $query = DB::table('users')
            ->leftJoin('model_has_roles', 'users.id', '=', 'model_has_roles.model_id')
            ->leftJoin('roles', 'model_has_roles.role_id', '=', 'roles.id')
            ->leftJoin('role_has_permissions', 'roles.id', '=', 'role_has_permissions.role_id')
            ->leftJoin('permissions', 'role_has_permissions.permission_id', '=', 'permissions.id')
            ->select('users.id', 'users.name', 'users.email', 
                     DB::raw('GROUP_CONCAT(DISTINCT roles.name) as role_names'),
                     DB::raw('GROUP_CONCAT(DISTINCT permissions.name) as permission_names'))
            ->groupBy('users.id', 'users.name', 'users.email');
    
        if ($roleFilter) {
            $query->whereIn('roles.name', explode(',', $roleFilter));
        }
    
        $users = $query->get()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => explode(',', $user->role_names),
                'permissions' => explode(',', $user->permission_names),
            ];
        });
    
        return response()->json($users, 200);
    }
    


    public function show($id){
        $data = User::find($id);
        return response()->json($data, 200);

    }
    
    //CREATE USER
    public function store(Request $request)
    {
        
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'roles' => 'required|array'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        
        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            $user->assignRole($request->roles);

            return response()->json([
                'success' => true,
                'user' => $user
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error creating user: ' . $e->getMessage()
            ], 500);
        }
    }
    
public function update(Request $request, $id)
{
    // Validar los datos de entrada
    $validatedData = $request->validate([
        'name' => 'required|string',
        'email' => 'required|string|email',
        'roles' => 'required|array',
  ]);

    // Encontrar el usuario por ID
    $user = User::findOrFail($id);
    
    // Actualizar los campos del usuario
    $user->name = $validatedData['name'];
    $user->email = $validatedData['email'];
    $user->save();
    
    if (isset($validatedData['roles'])) {
        $user->roles()->sync($validatedData['roles']);
    }

    return response()->json($user, 200);
}


    public function destroy($id){
        $data = User::find($id);
        $data->delete();
        return response()->json('Delete', 200);
    }


    public function getAllUsersWithRoles() {
        $users = DB::table('users')
            ->leftJoin('model_has_roles', 'users.id', '=', 'model_has_roles.model_id')
            ->leftJoin('roles', 'model_has_roles.role_id', '=', 'roles.id')
            ->select('users.*', 'roles.name as role_name')
            ->get();

        return response()->json($users);
    }

    public function getUserById($id) {
        $user = DB::table('users')
            ->leftJoin('model_has_roles', 'users.id', '=', 'model_has_roles.model_id')
            ->leftJoin('roles', 'model_has_roles.role_id', '=', 'roles.id')
            ->where('users.id', $id)
            ->select('users.id', 'users.name', 'users.email', DB::raw('GROUP_CONCAT(roles.name) as role_names'))
            ->groupBy('users.id', 'users.name', 'users.email')
            ->first();
    
        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
    
        return response()->json($user, 200);
    }
}