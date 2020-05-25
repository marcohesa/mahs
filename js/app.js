
var url = window.location.href;
var swLocation = '/mahs/SW.js';


if ( navigator.serviceWorker ) {


    if ( url.includes('localhost') ) {
        swLocation = '/SW.js';
    }


    navigator.serviceWorker.register( swLocation );
}

