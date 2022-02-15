<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;

    private $states = [
        1 => ['title' => 'ToDo', 'nextCanBe' => [2]],
        2 => ['title' => 'InProgress', 'nextCanBe' => [3, 4]],
        3 => ['title' => 'InQA', 'nextCanBe' => [1, 5]],
        4 => ['title' => 'Blocked', 'nextCanBe' => [1]],
        5 => ['title' => 'Done', 'nextCanBe' => [6]],
        6 => ['title' => 'Deployed', 'nextCanBe' => []],
    ];

    protected $fillable = ['title', 'description', 'status'];
    protected $appends = ['status_text'];

    public function getStatusTextAttribute() {
        return $this->states[$this->status] ?? 'Not Detected!';
    }
}
