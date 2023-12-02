


const item__nombre = document.querySelector('#item__nombre')
const item__apellido = document.querySelector('#item__apellido')
const item__telefono = document.querySelector('#item__telefono')
const item__email = document.querySelector('#item__email')

let flagEnviar = false

// Evento validacion Nombre
item__nombre.addEventListener("input",  () => {
    const regex = /^[a-zA-Z]{1,15}$/;
    if (regex.test(item__nombre.value)) {
        // Ocultar el mensaje de error
        item__nombre.nextElementSibling.classList.add('hidden')
        flagEnviar = true
    } else {
        // Mostrar el mensaje de error
        item__nombre.nextElementSibling.classList.remove('hidden')
        flagEnviar = false
    }
})

// Evento validacion Apellidos
item__apellido.addEventListener("input",  () => {
    const regex = /^[a-zA-Z]{1,40}$/;

    if (regex.test(item__apellido.value)) {
        // Ocultar el mensaje de error
        item__apellido.nextElementSibling.classList.add('hidden')
        flagEnviar = true

    } else {
        // Mostrar el mensaje de error
        item__apellido.nextElementSibling.classList.remove('hidden')
        flagEnviar = false

    }
})

// Evento validacion Telefono
item__telefono.addEventListener("input",  () => {
    const regex = /^[0-9]{1,9}$/;
    if (regex.test(item__telefono.value)) {
        // Ocultar el mensaje de error
        item__telefono.nextElementSibling.classList.add('hidden')
        flagEnviar = true

    } else {
        // Mostrar el mensaje de error
        item__telefono.nextElementSibling.classList.remove('hidden')
        flagEnviar = false

    }
})

// Evento validacion Email
item__email.addEventListener("input",  () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex.test(item__email.value)) {
        // Ocultar el mensaje de error
        item__email.nextElementSibling.classList.add('hidden')
        flagEnviar = true

    } else {
        // Mostrar el mensaje de error
        item__email.nextElementSibling.classList.remove('hidden')
        flagEnviar = true

    }
})


const item__producto = document.querySelector('#item__producto')
const item__plazo = document.querySelector('#item__plazo')
const item__presupuesto = document.querySelector('#item__presupuesto')
const item__condiciones = document.querySelector('#item__condiciones')
const btnEnviar = document.querySelector('.btnEnviar')
const formulario = document.querySelector('.formulario')


const checkboxes = document.querySelectorAll('[name="extras"]');

let precioPresupuesto = parseInt(item__producto.options[item__producto.selectedIndex].value, 10)


let valorTipo = 0
let valorPlazo = 0
let solCheckBox = 0 

// Se selecciona por defecto dicha opcion


// array para saber que todos han sido modificados
const flagPresupuesto = [1,1,1]

item__producto.addEventListener('input',() => {
    flagPresupuesto[0] = 0
    valorTipo = 0
    valorTipo = parseInt(item__producto.options[item__producto.selectedIndex].value,10)
    item__presupuesto.value  = valorTipo + valorPlazo + solCheckBox

})

item__plazo.addEventListener('input',() => {
    flagPresupuesto[1] = 0

    valorPlazo = 0
    valorPlazo = parseInt(item__plazo.value,10)
    item__presupuesto.value  = valorTipo + valorPlazo + solCheckBox

})

let flagCondiciones = false
item__condiciones.addEventListener('change',() => {
    flagCondiciones = item__condiciones.checked

})


const valoresSeleccionados = [];

const reducer = (accumulator, curr) => accumulator + curr;


// Calcula y suma todos los valores de los checkboxes
const calcularChebox = () => {
    let precioFinal = 0
    valoresSeleccionados.splice(0, valoresSeleccionados.length);
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
          valoresSeleccionados.push(parseInt(checkbox.value,10) );
        }
    });
    if (valoresSeleccionados.length >= 1) {
        precioFinal = valoresSeleccionados.reduce(reducer)
    }
    return precioFinal
}


// Eventos de los checkbox
checkboxes[0].addEventListener('change', () => {
    flagPresupuesto[2] = 0
    solCheckBox = calcularChebox()
    item__presupuesto.value  = valorTipo + valorPlazo + solCheckBox
});

checkboxes[1].addEventListener('change', () => {
    flagPresupuesto[2] = 0
    solCheckBox = calcularChebox()
    item__presupuesto.value  = valorTipo + valorPlazo + solCheckBox
});

checkboxes[2].addEventListener('change', () => {
    flagPresupuesto[2] = 0
    solCheckBox = calcularChebox()
    item__presupuesto.value  = valorTipo + valorPlazo + solCheckBox
});


formulario.addEventListener('submit',(e) => {
    e.preventDefault()
    res = flagPresupuesto.reduce(reducer)

    if ((res == 0) && (flagEnviar == true) && (flagCondiciones == true)) {
        console.log('Enviado');
        // Si el formulario es correcto recargar la página.
        location.reload();
    }
    else{
        console.log('Fallo');
    }
})