//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


// queda comentado por la entrega_3
/*function showImagesGallery(array){

    let htmlContentToAppend =  "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];
     if (i===0){
        htmlContentToAppend += `
        <div class="carousel-item active">
              <img src="`+ imageSrc +`" class="d-block w-100" alt="`+ imageSrc +`">
            </div >
        `}
        else{ htmlContentToAppend += `
        <div class="carousel-item">
              <img src="`+ imageSrc +`" class="d-block w-100" alt="`+ i +`">
            </div >
        `} 

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}*/


// Intento de funcion que muestra los productos relacionados
 /*function showRelated(array){

    let inner =  "";

    for(let i = 0; i < array.length; i++){
        let productos = array[i];
        inner += `
        <div>
              <img src="`+ productos[1]  +`" class="d-block w-100" alt="`+ productos[2] +`">
            </div>
        
        
        `} 

        document.getElementById("productRelated").innerHTML = inner;
 }
*/
var productosRelacionados = []; 
getJSONData(PRODUCTS_URL).then(function(infoRelated){
    if(infoRelated.status==="ok"){
        productosRelacionados = infoRelated.data;
        showRelated(productosRelacionados);
    }

});

 function showRelated(array){
     let inner ="";
     for (let i=0; i< array.length; i++){
         var info= array[i]
         if(i==1||i===3){
         inner +=`<div class="card" style="width: 18rem;">
         <img class="card-img-top" src="`+ info.imgSrc+`" alt="Card image cap">
         <div class="card-body">
           <h5 class="card-title">`+ info.name +`</h5>
         </div>
       </div>

          `}
         

          }
          document.getElementById("productoRelacionado10").innerHTML = inner;
 }



/*function showRelated(array) {
    let inner = "";
    getJSONData(PRODUCTS_URL).then(function(related) {
        if (related.status === "ok") {
            productosRelacionados = related
            for (let i = 0; i < array.length; i++) {

                let productosRelacionados = array[i]

                for (let i = 0; i < productosRelacionados.data.length; i++) {
                    let product = productosRelacionados.data[i];
                    if (productosRelacionados === i) {
                        htmlContentToAppend += `
            <div class="card mb-3" style="width: 20rem;">
            <img class="card-img-top" src="` + product.imgSrc + `" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">` + product.name + `</h5>
                <p class="card-text">` + product.currency + `  ` + product.cost + ` </p>
            </div>
            
             document.getElementById("productRelated").innerHTML = inner;
                    };
                }
            };
        };
    });
};*/


// Comentarios de los productos
var CommentInfo ={};
function meses(a,b){
    let fechaA = new Date(a.dateTime);
    let fechaB = new Date(b.dateTime);
    if(fechaA.getMonth()+1 > fechaB.getMonth()+1){return -1;}
    if(fechaA.getMonth()+1 < fechaB.getMonth()+1){return 1;}
    return 0;
};
//funcion que ordena los comentarios

function showComments(array){
    array = array.sort(meses);
    let inner =  "";

    for(let i = 0; i < array.length; i++){
        let comment = array[i];

        let estrella_on = `<span class="fa fa-star checked"></span>`;
        let estrella_off = `<span class="fa fa-star"></span>`;
        let puntuacion = estrella_on.repeat(comment.score);
        let noPuntuacion = estrella_off.repeat(5-comment.score);
        inner += `<a class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <dt>` + comment.user + `</dt>
                <p class="mb-1">` + comment.description + `</p>
                <p>` + puntuacion + `` + noPuntuacion + `</p>
            </div>
            <small class="mb-6 text-muted">` + comment.dateTime + `</small>
        </div>
        </div>
    </a>` 

       
    }
    document.getElementById("comentarios").innerHTML += inner;
};

function dejarComentar(){
    let inner = "";
    var u = sessionStorage.getItem('registro');
    var c = document.getElementById("comentarioNuevo");// comentario nuevo que se publica
    var puntuacion_usuario = document.getElementsByClassName("puntuacion").length;
    let estrella_on = `<span class="fa fa-star checked"></span>`
    let estrella_off = `<span class="fa fa-star"></span>`
    let puntuacion = estrella_on.repeat(puntuacion_usuario);
    let noPuntuacion = estrella_off.repeat(5 - puntuacion_usuario);
    var fecha = new Date();
    var date = fecha.getFullYear() + '-' + fecha.getMonth() + '-' + fecha.getDay() + fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds();
    if (c.value !== "" && puntuacion_usuario !== 0) {
        inner += `
        <a class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <dt>` + u + `</dt>
                    <p class="mb-1">` + c.value + `</p>
                    <p class="mb-1">` + puntuacion + noPuntuacion + `</p>
            
                    </div>
                    <small class="mb-6 text-muted">` + date + `</small>
                </div>
                </div>
            </a>`
            var barra_comentario = document.getElementById("comentarios");
            barra_comentario.innerHTML = inner +  barra_comentario.innerHTML;
            c.classList.remove("error");
        } else {
        
            c.classList.add("error");
        }
}   
    $(".puntuacion").find("input").change(function() {
        var valor = $(this).val()
        $(".puntuacion").find("input").removeClass("checked")
        $(".puntuacion").find("input").each(function(index) {
            if (index + 1 <= valor) {
                $(this).addClass("checked")
            }
        })
    })

    $(".puntuacion").find("label").mouseover(function() {
        var valor = $(this).prev("input").val()
        $(".puntuacion").find("input").removeClass("checked")
        $(".puntuacion").find("input").each(function(index) {
            if (index + 1 <= valor) {
                $(this).addClass("checked")
            }
        })
    });

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(category){
        if (category.status === "ok")
        {
            productInfo = category.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productCurrencyHTML = document.getElementById("productCurrency");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCategoryHTML = document.getElementById("productCategory");
            let productRelatedHTML = document.getElementById("productRelated");

            
        
            productNameHTML.innerHTML = productInfo.name;
            productDescriptionHTML.innerHTML = productInfo.description;
            productCostHTML.innerHTML = productInfo.cost;
            productCurrencyHTML.innerHTML = productInfo.currency;
            productSoldCountHTML.innerHTML= productInfo.soldCount
            productCategoryHTML = productInfo.category
            

            //Muestro las imagenes en forma de galería
            //ShowImagesGallery(productInfo.images);

        }
 });

 getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(Comment){
  if (Comment.status === "ok") {
        CommentInfo = Comment.data;
        showComments(CommentInfo);


    }
});
 /*getJSONData(PRODUCTS_URL).then(function(productos){
    if (productos.status === "ok") {
          productosArray = productos.data;
          showRelated(productosArray);
  
  
      }
 
    });*/



});



