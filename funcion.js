var numeroAleatorio;
var apiUrl;
var datos;
var sigue=1;
var corr=0;
var indice=0;

function numPreg() 
{
    numeroAleatorio = Math.floor(Math.random() * 3) + 3;
    // Muestra el número aleatorio en el párrafo con id "resultado"
    document.getElementById("resultado").textContent = `Número de preguntas necesarias: ${numeroAleatorio}`;
}

function obtenerPreguntas() 
{
    console.log(numeroAleatorio);
    console.log(apiUrl);
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => 
        {
            console.log(data);

            cargarPregunta(data,indice);
            
        })
    .catch(error => 
        {
            console.error('Error al obtener los datos:', error);
        });
}

function geoUrl()
{
    apiUrl = 'https://opentdb.com/api.php?amount='+numeroAleatorio;
    apiUrl+="&category=22"+"&type=multiple";
}

function histUrl()
{
    apiUrl = 'https://opentdb.com/api.php?amount='+numeroAleatorio;
    apiUrl+="&category=23"+"&type=multiple";
}

function artUrl()
{
    apiUrl = 'https://opentdb.com/api.php?amount='+numeroAleatorio;
    apiUrl+="&category=25"+"&type=multiple";
}

function entertUrl()
{
    apiUrl = 'https://opentdb.com/api.php?amount='+numeroAleatorio;
    apiUrl+="&category=14"+"&type=multiple";
}

function sporUrl()
{
    apiUrl = 'https://opentdb.com/api.php?amount='+numeroAleatorio;
    apiUrl+="&category=21"+"&type=multiple";
}

function sciUrl()
{
    apiUrl = 'https://opentdb.com/api.php?amount='+numeroAleatorio;
    apiUrl+="&category=17"+"&type=multiple";
}

function cargarPregunta(data,indice)
{

    var pregunta = data.results[indice];

    document.getElementById("grid-preg").textContent = pregunta.question;
    
    var respuestas = shuffle(pregunta.incorrect_answers.concat(pregunta.correct_answer));
    
    const gridContainer = document.getElementById("grid-resp");

    gridContainer.innerHTML = '';
    
    respuestas.forEach((elemento, index) => 
    {
        const button = document.createElement("button");
        button.textContent = elemento;
        gridContainer.appendChild(button);

        button.addEventListener("click", function() 
        {
            verificarRespuesta(pregunta,elemento);
            actCorr();
            indice=indice+1;
            cargarPregunta(data,indice);

        });
    });

}


function verificarRespuesta(pregunta,respuestaSeleccionada) 
{
    
    var respuestaCorrecta = pregunta.correct_answer;
    if (respuestaSeleccionada === respuestaCorrecta) 
    {
        document.getElementById("result").textContent = "¡Respuesta Correcta!";
        corr=corr+1;
    } 

    else 
    {
        document.getElementById("result").textContent = "Respuesta incorrecta. La respuesta correcta es: " + respuestaCorrecta;
        corr=corr;
    }
}

function shuffle(array) 
{
    for (let i = array.length - 1; i > 0; i--) 
    {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function actCorr()
{
    document.getElementById("corr").textContent = "Respuestas Correctas: " + corr;

}

function final()
{
    if(corr==numeroAleatorio)
    {
        document.getElementById("final").textContent = "¡Enhorabuena! Has ganado";
    }

    else
    {
        document.getElementById("final").textContent = "Has perdido";
    }
}




