<!doctype html>
<html lang="fa">
@include('layouts.partials._headTag')
<body class="container pt-5 bg-white">
    <div id="app">

        @yield('content')
    </div>
    @include('layouts.partials._footerBeforeBody')
</body>
@yield('extraFooterCodeAfterBody')
</html>


