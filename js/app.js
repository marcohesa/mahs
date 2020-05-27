
var url = window.location.href;
var swLocation = '/mahs/SW.js';


if ( navigator.serviceWorker ) {


    if ( url.includes('localhost') ) {
        swLocation = '/SW.js';
    }


    navigator.serviceWorker.register( swLocation );
}

var timeline    = $('#timeline');

function crearMensajeHTML(title, author, description) {

    var content =`
    <li class="col-xs-12 col-md-12 con-lg-12" style="background-color: white;">
        <div class="col-xs-12 col-md-12 con-lg-12">
            <h1>${ title }</h1>
        </div>
        <div class="col-xs-12 col-md-12 con-lg-12">
            <h3>${ author }</h3>
            <p>${ description }</p>
        </div>
    </li>
    `;

    timeline.prepend(content);

}

// Obtener mensajes del servidor
function getMensajes() {

    fetch('http://localhost:5001/mahs-6b98c/us-central1/app/api/read')
        .then( res => res.json() )
        .then( posts => {

            console.log(posts);
            posts.forEach( post =>
                crearMensajeHTML( post.title, post.author, post.description ));


        });


}

getMensajes();
