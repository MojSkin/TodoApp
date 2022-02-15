<!doctype html>
<html lang="fa">
@include('layouts.partials._headTag')
<body class="container">
    <div id="app" class="d-flex flex-column flex-root">
        @yield('content')
    </div>
    @include('layouts.partials._footerBeforeBody')
</body>
@yield('extraFooterCodeAfterBody')
</html>


