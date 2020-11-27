const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario')


window.addEventListener('load',()=>{
    formulario.addEventListener('submit', buscarClima)
})



function buscarClima (e){
    e.preventDefault()
    //Validar
    const cuidad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(cuidad === ''||pais ===''){
        mostrarMensaje('Ambos campos son obligatorios')
        return;
    }

    //Consultar
    consultarApi(cuidad,pais)

}


// Muestra un mensaje de error
function mostrarMensaje (mensaje){
    const alerta = document.querySelector('.bg-red-100')

    if(!alerta){
        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100','border-red-400','text-red-400','px-4','py-3','rounded','max-w-md','mx-auto','mt-6','text-center');
        alerta.innerHTML = `
        <strong class="font-bold" > Error!</strong>
        <span class="block">${mensaje}</span>
        `;

        container.appendChild(alerta);

        setTimeout(()=>{
            alerta.remove();
        },5000)

    }
}

//consultar api por medio de un a function

function consultarApi (ciudad,pais){
    const apId = 'cdb40757b61be767f8ee4dcab252a0b3'

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apId}`

    console.log(url)
    limpiarHTML()
    spinner()

     fetch(url)
             .then(respuesta => respuesta.json())
             .then(datos =>{
                
                limpiarHTML() //limpia el HTML previo
                 
                if(datos.cod === "404") {
                mostrarMensaje('cuidad no encontrada')
                return;
            } 

            //Imprime los resultados en el HTML
            mostrarClima(datos)
         })
}


function mostrarClima (datos){

    const {name,main:{temp,temp_max,temp_min}} = datos

    const centigrados = kevinAcentigrados(temp);
    const max = kevinAcentigrados(temp_max);
    const min = kevinAcentigrados(temp_min);

    const nombreCuidad = document.createElement('p');
    nombreCuidad.textContent = `El clima en la cuidad de ${name}`;
    nombreCuidad.classList.add('font-bold','text-2xl');

    const actual = document.createElement('p');
    actual.innerHTML= `${centigrados} &#8451`;
    actual.classList.add('font-bold','text-6xl')

    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max: ${max} &#8451`;
    tempMaxima.classList.add('text-xl');


    const tempMin = document.createElement('p');
    tempMin.innerHTML = `Min: ${min} &#8451`
    tempMin.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center','text-white');
    resultadoDiv.appendChild(nombreCuidad)
    resultadoDiv.appendChild(actual)
    resultadoDiv.appendChild(tempMaxima)
    resultadoDiv.appendChild(tempMin)

    resultado.appendChild(resultadoDiv);

    formulario.reset()

}

const kevinAcentigrados = grados =>  parseInt(grados - 273.15)

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}

function spinner (){

    const spinnerDiv = document.createElement('div');
    spinnerDiv.classList.add('sk-fading-circle');

    spinnerDiv.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
    `

    resultado.appendChild(spinnerDiv);
}
