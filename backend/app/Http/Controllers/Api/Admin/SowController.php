<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\sow;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SowController extends Controller
{
    public function index()
    {
        $perPage = 10;
        $data = Sow::orderBy("ticket_sow")
                    ->select("ticket_sow", "sow_description", "project_id", "delivery_team", "ticket_date", "sow_status")
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
            'ticket_date' => 'required|date',
            'cls' => 'nullable|string',
            'opportunity_name' => 'nullable|string',
            'opportunity_id' => 'nullable|string|max:255',
            'account_team' => 'nullable|string|max:200',
            'priority' => 'nullable|in:low,medium,high',
            'sow_due_date' => 'nullable|date',
            'effort_due_date' => 'nullable|date',
            'project_id' => 'required|string|max:255',
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

        $sow = Sow::create($validatedData);

        return response()->json($sow, 200);
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
        // Reemplaza 'your_table_name' por el nombre de tu tabla
        $table = 'sows';

        // Obtener las opciones del enum
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
    

}
