<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index()
    {
        return view('todos.index');
    }

    public function list()
    {
        $response = [
            'status' => true,
            'result' => $todos = Todo::all()
        ];
        return response()->json($response, 200);
    }

    public function save(Request $request) {
        $response = [
            'status' => false,
            'messafe' => 'Error while fetching data!',
            'result' => null
        ];

        return response()->json($response, 200);
    }
}