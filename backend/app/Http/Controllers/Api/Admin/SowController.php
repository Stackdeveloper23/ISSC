<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\sow;
use App\Models\SowByUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

class SowController extends Controller
{
    public function index()
    {
        $perPage = 10;
        $data = Sow::orderBy("ticket_sow")
                    ->select("ticket_sow", "sow_description", "account_name","project_id", "delivery_team", "ticket_date", "sow_status")
                    ->paginate($perPage);
        return response()->json($data, 200);
    }
    

    public function create(Request $request)
    { 
        $validatedData = $request->validate([
            'ticket_sow' => 'required|string|unique:sows,ticket_sow',
            'sow_description' => 'required|string',
            'project_id' => 'required|string',
            'account_name' => 'nullable|string|max:200',
            'delivery_team' => 'required|string',
            'create_at'=>'nullable|date',
            'ticket_date' => 'required|date',
            'cls' => 'nullable|string',
            'opportunity_name' => 'nullable|string',
            'opportunity_id' => 'nullable|string|max:255',
            'account_team' => 'nullable|string|max:200',
            'priority' => 'nullable|in:low,medium,high',
            'sow_due_date' => 'nullable|date',
            'effort_due_date' => 'nullable|date',
            'project_id' => 'nullable|string|max:255',
            'sow_owner' => 'nullable|string|max:255',
            'sow_status' => 'nullable|in:new,in_progress,closed,blocked',
            'sow_delivery_date' => 'nullable|date',
            'effort_owner' => 'nullable|string|max:100',
            'effort_status' => 'nullable|in:in_progress,not_started,delivered',
            'effort_delivery_date' => 'nullable|date',
            'comments' => 'nullable|string',
            'sow_link' => 'nullable|url',
            'effort_link' => 'nullable|url'
        ]);
        
        DB::beginTransaction();

        try {
            $sow = Sow::create($validatedData);
            $user = auth()->user();
    
            SowByUser::create([
                'sow_id' => $sow->ticket_sow,
                'created_by' => $user->id,
                'user_name' => $user->name,
                'created_at' => now(),  
            ]);
    
            DB::commit();
    
            return response()->json($sow, 200);
        } catch (\Exception $e) {
            DB::rollBack();
    
            Log::error('Error al crear el registro: ' . $e->getMessage(), [
                'exception' => $e,
                'request_data' => $request->all()
            ]);
    
            return response()->json(['error' => 'Failed to create sow'], 500);
        }
    }

 
    public function show($id)
    {
        $data = Sow::find($id);
        if (!$data) {
            return response()->json(['error' => 'Sow not found'], 404);
        }
        return response()->json($data, 200);
    }

    public function update(Request $request, $id)
{
    $data = Sow::find($id);
    $data->fill($request->all());
    $data->save();
    return response()->json($data, 200);
}
    public function destroy($id){
        $data = Sow::find($id);
        $data->delete();
        return response()->json('Delete', 200);
    }

    public function search(Request $request)
    {
        $query = $request->input('query');
        $sows = Sow::where('ticket_sow','LIKE', "%$query%")
                    ->orWhere('project_id','LIKE', "%$query%")
                    ->get(['ticket_sow','project_id']);
                    
        return response()->json($sows);
    }

    public function getEnumOptions($field)
    {
        $table = 'sows';

        
        $column = DB::select("SHOW COLUMNS FROM `{$table}` WHERE Field = ?", [$field])[0];
        $type = $column->Type;
        
        if (strpos($type, 'enum') === false) {
            return response()->json(['error' => 'El campo no es de tipo enum'], 400);
        }

        preg_match('/^enum\((.*)\)$/', $type, $matches);
        $enum = [];
        foreach (explode(',', $matches[1]) as $value) {
            $enum[] = trim($value, "'");
        }

        return response()->json($enum);
    }
    
    public function getCreatorInfo($ticket_sow)
    {
        $sowByUser = SowByUser::where('sow_id', $ticket_sow)->first();

        if (!$sowByUser) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }
    
        return response()->json([
            'sow_id' => $sowByUser->sow_id,
            'created_by' => $sowByUser->created_by,
            'user_name' => $sowByUser->user_name,
            'created_at' => $sowByUser->created_at
        ], 200);
    }

    public function countState()
    {
        $count = Sow::select("sow_status", DB::raw("count(*) as total"))
                        ->groupBy("sow_status")
                        ->get();

        return response()->json($count);
    }

    public function countTotalSows()
{
    $total = Sow::count();

    return response()->json(['total' => $total]);
}

}
