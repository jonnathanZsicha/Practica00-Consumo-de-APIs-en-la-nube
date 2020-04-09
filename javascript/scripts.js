
//BUSCAR por tirulo de la pelicula
function buscar(pag) {
  var titulo = document.getElementById("titulo").value;
  var detalles = "";
  var pagina = "";

  if (titulo == "") {
    document.getElementById("informacion").innerHTML = "<p> No se han realizado Busquedas</p>";

  } else {
    if (window.XMLHttpRequest) {
      // code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp = new XMLHttpRequest();
    } else {
      // code for IE6, IE5
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText)
        //alert(data);
        console.log(data);
        x = data["totalResults"];
        alert(x);
        ///para el numero de paginas a crear///
        if (x > 40) {
          x = x/10;
          for (let index = 1; index < x; index++) {
            pagina += "<a href=\"#\"  onclick=\"buscar("+index +")\" type=\"button\">  "  +index+  "  </a>  ";
           // alert(pagina)
            document.getElementById("pagination").innerHTML = pagina;
          }         
        } else {

          for (let index = 1; index < x; index++) {
            pagina += "<a href=\"#\"  onclick=\"buscar("+index +")\" type=\"button\">  "  + index+  "    </a>  ";
            //alert(pagina)
            document.getElementById("pagination").innerHTML = pagina;
          }                  
        }


        //////////



        data.Search.forEach(movie => {

          console.log(movie.Title)

          detalles += "<tr>"+
                      "<td><h1 >"+ movie.Title +"</h1><img src=" + movie.Poster + "></td>" +
                      "<td align='center'><a href='#'  onclick=\"buscarPeliculaId('"+ movie.imdbID   +"')\">VER MAS DETALLES</a> </td>"+
                      "<td  id=\"aspecto"+movie.imdbID +"s\" >" + "ASPECTOS" +"</td>"+
                      "</tr>";
        });
        document.getElementById("informacion").innerHTML = detalles;
      }
    };
    xmlhttp.open("GET", "http://www.omdbapi.com/?apikey=d9be7bc2&s="+titulo+"&plot=full&page="+pag, true);
    xmlhttp.send();
  }
  return false;
}

//BUSCAR POR EL ID LA INFORMACION

function buscarPeliculaId(peli){

  var id = peli;

  var dato="aspecto"+id+"s";


  if (id == "") {
    document.getElementById(dato).innerHTML = "<p> No se han encontrado detalles</p>";

  } else {
    if (window.XMLHttpRequest) {
      // code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp = new XMLHttpRequest();
    } else {
      // code for IE6, IE5
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        alert("llegue a ver aspectos"+ id);

        var data = JSON.parse(this.responseText)
        
        alert(data);
        console.log(data);
       

        let string1 = "";
        let string2 = "";
        const object1 = data;
        
        for (let property1 in object1) {

          string1 += Object.keys(object1) + object1[property1];

        }
        
        Object.values(object1).forEach(item => {string2 += item+"\n"});
        
       
        
        document.getElementById(dato).innerHTML = string2 ;
      }
    };
    xmlhttp.open("GET", "http://omdbapi.com/?apikey=d9be7bc2&i="+id+"&plot=full", true);
    xmlhttp.send();
  }
  return false;

}


