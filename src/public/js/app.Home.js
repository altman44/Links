$(function() {
    $('#div_films').hide();
    $('#div_films').fadeIn(3000);

    // Para agregar secciones solo hay que llamar a crearContenedoresPeliculas(genero) enviandole el genero que se desee
    // estando éste genero en la base de datos
    crearContenedoresPeliculas('trending', 'En Tendencia');
    crearContenedoresPeliculas('popular', 'Más Populares');
    crearContenedoresPeliculas('comedy', 'Comedia');
    crearContenedoresPeliculas('action', 'Acción');
    crearContenedoresPeliculas('suspense', 'Suspenso');
    crearContenedoresPeliculas('drama', 'Drama');

    $('.flecha').on('click', function(){
        alert("Flecha");
    });

    $('#btnAceptar').click(function(){
        $('.img-peliculas').fadeOut('slow');
    });
});

async function crearContenedoresPeliculas(type, title){
    //Variables
    let imagenes, cantFilas, cantImgsXFila = 3;
    let fila, contenedor, input, text, flechaLeft, flechaRight, counterLoadedImgs =  0;

    //Settings of div_type
    /*
    let div_type = document.createElement('div');
    div_type.setAttribute('id', 'div_' + type);
    div_type.setAttribute('class', 'container text-white');
    div_type.setAttribute('style', 'background-color:rgba(0, 0, 255, 0);margin-top:1%;');
    div_type.innerHTML = '<h1 class="amatic" style="margin-bottom: 60px;">' + title + '</h1>';
    */

    let div_type = $('<div>', {
        'id': 'div_' + type,
        'class': 'container text-white',
        'style': 'background-color:rgba(0, 0, 255, 0);margin-top:1%;'
    })
    div_type.html('<h1 class="amatic" style="margin-bottom: 60px;">' + title + '</h1>');

    //Request to get the images
    await $.ajax({
        url: 'peliculas/imagenes',
        method: 'POST',
        beforeSend: function(){
            $("#spinner").spin('show');
        },
        data: {
            type
        },
        success: function(info){

            $("#spinner").spin('hide');
            imagenes = info;

            console.log(type, " ", imagenes);

            cantFilas = imagenes.length / cantImgsXFila;
            if(!Number.isInteger(cantFilas)){
                cantFilas = Math.floor(cantFilas + 1);
                console.log("Cantidad filas: ", cantFilas);
            }
        }
    });

    for(i = 0; i < cantFilas; i++){

        /*
        fila = document.createElement('div');
        fila.setAttribute('class', 'row row_films');
        */
       fila = $('<div>', {
           'class': 'row row_films'
       });

        for(k = 0; k < cantImgsXFila ; k++){
            console.log("Counter: ", counterLoadedImgs);

            if(imagenes[counterLoadedImgs]){
                /*
                contenedor = document.createElement('div');
                contenedor.setAttribute('class', 'contenedor_peliculas');
                */
                contenedor = $('<div>', {
                    'class': 'contenedor_peliculas'
                });
                /*
                img = document.createElement('img');
                //img.value = imagenes[counterLoadedImgs].id;
                console.log(img.value);
                console.log("imagenes[counterLoadedImgs].id: ", imagenes[counterLoadedImgs].id);

                img.setAttribute('class', 'img-peliculas rounded');
                img.setAttribute('onclick', 'selectedImg(' + imagenes[counterLoadedImgs].id + ')');
                img.setAttribute('alt', imagenes[counterLoadedImgs].id);
                img.src = '/img/' + imagenes[counterLoadedImgs].imgFile;
                */

                img = $('<img>', {
                    'class':'img-peliculas rounded',
                    'alt': imagenes[counterLoadedImgs].id,
                    'src': '/img/' + imagenes[counterLoadedImgs].imgFile,
                    'onclick': 'selectedImg(' + imagenes[counterLoadedImgs].id + ')'
                });

                contenedor.append(img);
                fila.append(contenedor);
    
                counterLoadedImgs++;
            }
        }
        div_type.append(fila);
    }

    $('#div_films').append(div_type);
    document.getElementById('div_films').innerHTML += '<hr class="hr">'
}

function selectedImg(valor) {
    alert(valor);
}