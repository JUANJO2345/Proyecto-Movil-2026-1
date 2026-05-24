<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserControllerWeb extends Controller
{
    public function index()
    {
        $users = User::all();

        return view(
            'users.index',
            compact('users')
        );
    }

    public function create()
    {
        return view('users.create');
    }

    public function store(Request $request)
    {
        User::create([

            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)

        ]);

        return redirect()
            ->route('web.users.index');
    }

    public function edit(string $id)
    {
        $user = User::findOrFail($id);

        return view(
            'users.edit',
            compact('user')
        );
    }

    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);

        $data = [

            'name' => $request->name,
            'email' => $request->email

        ];

        if ($request->password) {

            $data['password'] = Hash::make(
                $request->password
            );
        }

        $user->update($data);

        return redirect()
            ->route('web.users.index');
    }

    public function destroy(string $id)
    {
        $user = User::findOrFail($id);

        $user->delete();

        return redirect()
            ->route('web.users.index');
    }
}