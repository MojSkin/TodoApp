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
            'result' => $todos = Todo::orderBy('created_at', 'DESC')->get(),
            'states' => Todo::getStates()
        ];
        return response()->json($response, 200);
    }

    public function save(Request $request) {
        $response = [
            'status' => false,
            'message' => 'Error while fetching data!',
            'result' => null
        ];

        if (!in_array($request->status, [1, 2, 3, 4, 5, 6])) {
            $response['message'] = 'Status value is invalid!';
        } else {
            $todo = Todo::updateOrCreate(['id' => $request->id], $request->all());
            if ($todo) {
                $response['message'] = 'Todo has been '.($request->id?'modified':'added').' successfully';
                $response['result'] = $todo;
                $response['status'] = true;
            }
        }

        // if (isset($request->id) and $request->id != null and $request->id > 0) {
        //     $todo = Todo::find($request->id);
        //     if ($todo) {
        //         $todo->update($request->all());
        //     }
        // }

        return response()->json($response, 200);
    }
}
