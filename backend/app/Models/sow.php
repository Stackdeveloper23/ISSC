<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sow extends Model
{
    use HasFactory;
    protected $primaryKey = 'ticket_sow';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;


    protected $fillable = [
        'ticket_sow',
        'cls',
        'opportunity_name',
        'opportunity_id',
        'account_name',
        'delivery_team',
        'ticket_date',
        'sow_description',
        'priority',
       'sow_due_date',
       'effort_due_date',
        'project_id',
       'sow_owner',
       'sow_status',
       'sow_delivery_date',
       'effort_owner',
       'effort_status',
        'effort_delivery_date',
       'comments',
        'sow_link',
        'effort_link',
        'created_at'
    ];

}
