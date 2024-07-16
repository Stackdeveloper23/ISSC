<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Rol extends Model
{
    use HasFactory;
    public function users(): MorphToMany {
        return $this->morphToMany(User::class, 'model', 'model_has_roles', 'role_id', 'model_id');
    }
}
