<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;

    public $states = [
        1 => ['title' => 'ToDo', 'nextCanBe' => [1, 2]],
        2 => ['title' => 'InProgress', 'nextCanBe' => [2, 3, 4]],
        3 => ['title' => 'InQA', 'nextCanBe' => [1, 3, 5]],
        4 => ['title' => 'Blocked', 'nextCanBe' => [1, 4]],
        5 => ['title' => 'Done', 'nextCanBe' => [5, 6]],
        6 => ['title' => 'Deployed', 'nextCanBe' => [6]],
    ];

    protected $fillable = ['title', 'description', 'status'];
    protected $appends = ['status_text'];

    public function getStatusTextAttribute() {
        return $this->states[$this->status] ?? 'Not Detected!';
    }

    public static function getStates() {
        $self = new static;
        return $self->states;
    }
}
