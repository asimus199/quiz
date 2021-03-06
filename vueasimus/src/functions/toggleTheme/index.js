var setTheme = function (forceTheme) {
    document.body.classList.add('vs-remove-transition');
    var media = window.matchMedia('(prefers-color-scheme: dark)');
    var isThemeDark = media.matches;
    if (localStorage.vsTheme) {
        isThemeDark = localStorage.vsTheme == 'dark';
    }
    if (isThemeDark) {
        document.body.setAttribute('vs-theme', 'dark');
    }
    else {
        document.body.removeAttribute('vs-theme');
    }
    if (forceTheme == 'dark') {
        document.body.setAttribute('vs-theme', 'dark');
    }
    else if (forceTheme == 'light') {
        document.body.removeAttribute('vs-theme');
    }
    localStorage.vsTheme = isThemeDark ? 'dark' : 'light';
    setTimeout(function () {
        document.body.classList.remove('vs-remove-transition');
    }, 100);
    return isThemeDark ? 'dark' : 'light';
};
var toggleTheme = function (forceTheme) {
    document.body.classList.add('vs-remove-transition');
    var media = window.matchMedia('(prefers-color-scheme: dark)');
    var isThemeDark = media.matches;
    if (localStorage.vsTheme) {
        isThemeDark = localStorage.vsTheme == 'dark';
    }
    if (!isThemeDark) {
        document.body.setAttribute('vs-theme', 'dark');
    }
    else {
        document.body.removeAttribute('vs-theme');
    }
    if (forceTheme == 'dark') {
        document.body.removeAttribute('vs-theme');
    }
    else if (forceTheme == 'light') {
        document.body.setAttribute('vs-theme', 'dark');
    }
    localStorage.vsTheme = !isThemeDark ? 'dark' : 'light';
    setTimeout(function () {
        document.body.classList.remove('vs-remove-transition');
    }, 100);
    return !isThemeDark ? 'dark' : 'light';
};
export { toggleTheme, setTheme };
