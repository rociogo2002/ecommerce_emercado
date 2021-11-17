const ORDER_ASC_BY_COST = "AZ";
const ORDER_DESC_BY_COST = "ZA";
const ORDER_BY_PROD_VENDIDO = "Cant."
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var resultado="";
//funcion que ordena los productos
function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_VENDIDO){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}
//parte 2


var productArray=[];
var currentProductArray=[];
function showProductList(){
    let htmlContentToAppend="";
    for(let i=0; i< productArray.length;i++){
        let category = productArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))){
         htmlContentToAppend += `
         <div class="col-md-1 card-container"></div>
            <a href="product-info.html" class="list-group-item list-group-item-action col-md-3 ">
                <div class="col">
                    <div class="row">
                        <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ category.name +`</h4>
                            <small class="text-muted">` + category.soldCount + ` artículos</small>
                            <small class="text-muted">` + category.cost + ` usd</small>
                        </div>
                        <p class="mb-1">` + category.description + `</p>
                    </div>
                </div>
            </a>
            `
        }
        document.getElementById("list-container").innerHTML = htmlContentToAppend;
    }
}
// parte_1
function sortAndShowCategories(sortCriteria, productArray){
    currentSortCriteria = sortCriteria;

    if(productArray != undefined){
        currentProductArray = productArray;
    }

    currentProductArray = sortCategories(currentSortCriteria, currentProductArray);

    //Muestro las categorías ordenadas
    showProductList();
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    showSpinner();
    
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if(resultObj.status==="ok"){
            productArray = resultObj.data;
        sortAndShowCategories(ORDER_ASC_BY_COST, resultObj.data);
        }
        
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_COST);
    });
    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_COST);
    });


    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_PROD_VENDIDO);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductList();
    });
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }  
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductList();
    });

});
 function autocompletado () {
    document.getElementById("demo").innerHTML = '';

   var pal = document.getElementById("buscar-pal").value;
    var tam = pal.length;
    for(indice in productArray){
      var nombre = productArray[indice];
      var str = nombre.name(0,tam);
      if(pal.length <= nombre.length && pal.length != 0 && nombre.length != 0){
        if(pal.toLowerCase() == str.toLowerCase()){
          var node = document.createElement("LI");
          var textnode = document.createTextNode(productArray[indice]);
          node.appendChild(textnode);
          document.getElementById("demo").appendChild(node);
        } 
           
      }
    }
}
 


