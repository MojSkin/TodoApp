<head>
    <!-- Required meta tags -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name') }} {{ (strlen(trim($__env->yieldContent('pageTitle')))>0)?'|':'' }} @yield('pageTitle')</title>
    @yield('extraHeaderCodeBeforeAll')
    <link href="{{ asset('assets/css/app.css') }}" rel="stylesheet" type="text/css" />
    @yield('extraHeaderCode')
</head>
