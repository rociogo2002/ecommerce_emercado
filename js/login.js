//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(){
    obtenerUsario();
});
function cargaError(id,idMensaje){
    var elementoNombre= document.getElementById(id);
    var elementoError = document.getElementById(idMensaje);
    if(elementoNombre.value ==''){      //condiciono
        elementoError.style.display = "block";
        elementoError.style.color ="red";
        elementoNombre.classList.add("error");
        elementoError.innerHTML="complete el campo";
    }else{
        elementoError.style.display="none";
        elementoNombre.classList.remove("error");
    }
    
}  
function redireccionar(){
    var email = document.getElementById('email').value;
    var contraseña = document.getElementById('contraseña');
    if( email !== '' &&  contraseña.value !== '' ){
        sessionStorage.setItem('registro',email);
        location.replace("index.html");
    }

}
function obtenerUsario(){
    var nombreUsuario = sessionStorage.getItem("registro")
    document.getElementById('obtenerUsuario').innerHTML = nombreUsuario;
}
  //lo hicimos en grupo

