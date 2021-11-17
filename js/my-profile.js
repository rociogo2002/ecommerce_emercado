//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

const obj = {name: "",surname: "", email: "", tel: "", fechaN:""};
const myJSON = JSON.stringify(obj);


function guardarInfo(){
    localStorage.setItem("persona",myJSON);
    var obj = localStorage.getItem("persona");
    var objetoPerfil = JSON.parse(obj);
    objetoPerfil.name= document.getElementById("nombre1").value;
    objetoPerfil.surname= document.getElementById("apellido1").value;
    objetoPerfil.fechaN= document.getElementById("fecha1").value;
    objetoPerfil.email= document.getElementById("correo1").value;
    objetoPerfil.tel = document.getElementById("telefono1").value;
    obj=JSON.stringify(objetoPerfil);
    localStorage.setItem("persona",obj);
    
    
    
    
}
function mostarInfo(){
   var objeto = localStorage.getItem("persona")
   var data = JSON.parse(objeto);

   document.getElementById('nombre1').value= data.name
   document.getElementById('apellido1').value = data.surname
   document.getElementById('correo1').value = data.email
   document.getElementById('telefono1').value = data.tel
   document.getElementById('fecha1').value = data.fechaN
    
}



document.addEventListener("DOMContentLoaded", function(){
    mostarInfo();

});
