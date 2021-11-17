var carrito = {}; 
let subT= 0

 //Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    
    getJSONData(CART_INFO_URL).then(function(info){
        if(info.status==="ok"){
            carrito = info.data.articles;
            showCarrito(carrito);
        }
    });
    
});





function showCarrito(array){
    let inner="";
    var table = document.getElementById("showCart");
        
    for(let i=0 ; i < array.length; i++){
        var articulos = array[i];
        subT+= articulos.unitCost * articulos.count
        var row = table.insertRow(1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        
        var x = document.createElement("INPUT");// crea un input
        
         x.setAttribute("type", "number");
         x.setAttribute("value", articulos.count);
         x.setAttribute("id", "inputCantidad");
         x.setAttribute("onchange","cambiarTotales()");
        cell1.innerHTML = `<img id="imagen" src="`+ articulos.src + `"/>`
        cell2.innerHTML = articulos.name;
        cell3.appendChild(x);
        cell4.innerHTML = articulos.unitCost;
        cell5.innerHTML= articulos.currency;
        cell6.innerHTML =`<p id="subTotalArticulos">`+ articulos.unitCost*x.value + `</p>`;
        if(i < array.length) {
            return articulos.unitCost;
        }
        console.log( "dentro del for " + articulos.unitCost);    
    }
    const precioLoco = articulos.unitCost;
    console.log( "dentro de la funcion precio loco  " + precioLoco);
    return precioLoco
}

// let valorPrecio = showCarrito()
// console.log(valorPrecio);
function cambiarTotales(){
    let valorPrecio = showCarrito(carrito)
    console.log(valorPrecio);
    var cantidad = document.getElementById("inputCantidad").value;
    var precio = 100
    document.getElementById("subTotalArticulos").innerHTML = cantidad*precio;

}
//Lo que esta dentro del modal
function mostrarMetodo(){
    var opcionTargetaC = document.getElementById("opcionCredito")
    var opcionBancoC = document.getElementById("opcionBanco")
    var nombreA = document.getElementById('Nombre_apellido')
    var tarjeta = document.getElementById('numero_tarjeta')
    var pin_tarjeta = document.getElementById('pin_tarjeta')
    var id  = document.getElementById('id_banco')
    //var mostrarOpcionB =document.getElementById("opcionBancoInput")
    //var mostrarOpcionC = document.getElementById("opcionCreditoInput")
    console.log(opcionTargetaC.checked==true)
    if(opcionTargetaC.checked==true){
        //document.getElementById("opcionBancoInput").style.display = "none";
        //document.getElementById("opcionCreditoInput").style.display = "block";
        id.style.display="none"
        nombreA.style.display="block";
        tarjeta.style.display="block";
        pin_tarjeta.style.display="block";
    }
    if(opcionBancoC.checked==true){
        //document.getElementById("opcionCreditoInput").style.display = "none";
        //document.getElementById("opcionBancoInput").style.display = "block";
        nombreA.style.display="none";
        tarjeta.style.display="none";
        pin_tarjeta.style.display="none";
        id.style.display="block"
    }
    

}
function transferenciaBanco() {
    var id2 = document.getElementById("id_banco")

    if (id2.value == "") {
        id2.style.border = "red 5px solid";
        id2.placeholder = "Debe ingresar un id"
    }
}  
// Calcula los totales incluyendo en costo de envio
function totalEnvio(){
    //let totalConEnvio = showCarrito()
    var cantidad1 = document.getElementById("inputCantidad").value;
    var TipoEnvio = document.getElementById("selectorEnvio").value;
    var opciónEnvio1= document.getElementById("opcion1")
    var opciónEnvio2= document.getElementById("opcion2")
    var opciónEnvio3= document.getElementById("opcion3")
    var subtotal =document.getElementById("subTotalArticulos").value
  if (opciónEnvio1.selected){
    document.getElementById("costoTotal").innerHTML = (subT * 1.15).toFixed(2)
    console.log("funciona");
  }
  if (opciónEnvio2.selected){
    document.getElementById("costoTotal").innerHTML = (subT * 1.07).toFixed(2)
    console.log("funciona1");

}
if (opciónEnvio3.selected){
    document.getElementById("costoTotalhx").innerHTML = (subT * 1.05).toFixed(2)
    console.log("funciona3");

}

}
//funcion para validar los datos 
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	calle: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	numero: /^[100]{1,40}$/, // números
	ciudad: /^.{4,12}$/, // 4 a 12 digitos.
	pais: /^[a-zA-Z0-9\_\-]{4,16}$/,
	
}

const campos = {
	calle: false,
	número: false,
	ciudad: false,
	pais: false,
	
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "calle":
			validarCampo(expresiones.calle, e.target, 'calle');
		break;
		case "número":
			validarCampo(expresiones.numero, e.target, 'número');
		break;
		case "ciudad":
			validarCampo(expresiones.ciudad, e.target, 'ciudad');
			validarciudad2();
		break;
		case "ciudad2":
			validarciudad2();
		break;
		case "pais":
			validarCampo(expresiones.pais, e.target, 'pais');
		break;
		
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}

const validarciudad2 = () => {
	const inputciudad1 = document.getElementById('ciudad');
	

	if(inputciudad1.value == "" ){
		document.getElementById(`grupo__ciudad2`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__ciudad2`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__ciudad2 i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__ciudad2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__ciudad2 .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos['ciudad'] = false;
	} else {
		document.getElementById(`grupo__ciudad2`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__ciudad2`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__ciudad2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__ciudad2 i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__ciudad2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos['ciudad'] = true;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	if(campos.calle && campos.número && campos.ciudad && campos.pais ){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});
//Compra realizada con exito carrito_fin

var mensaje = []
function showCarritoFin(){
    let htmlContentToAppend="";
    htmlContentToAppend = `<p>`+mensaje+`</p>`
    document.getElementById("Mostra_mensaje").innerHTML = mensaje

    }


 
 document.addEventListener("DOMContentLoaded", function() {
    getJSONData(CART_BUY_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            mensaje = resultObj.data.msg;
            console.log(mensaje)
        }
       
        
    })
    
});

