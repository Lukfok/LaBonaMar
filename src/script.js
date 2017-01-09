//----------------------------------------------------SLIDER-----------------------------------------------

var slideIndex = 1;
showSlides();
setInterval(showSlides,5000);

function currentSlide(n) {
    slideIndex = n;
    showSlides();
}

function showSlides() {
    var slides = $(".slider");
    var dots = $(".dot");
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    if (slideIndex < 1) {
        slideIndex = slides.length;
    }
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (var i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    slideIndex++;
}

//---------------------------------------------------NAVBAR--------------------------------------------------------

function checkScroll(){
    var navbar = $('#navbar');
    var startY = navbar.height() * 2;
    if($(window).scrollTop() > startY){
        navbar.addClass("scrolled");
    }else{
        navbar.removeClass("scrolled");
    }
}

$(window).on("scroll load resize", function(){
    checkScroll();
});


function scrollTo(element){
	var num= ($("#"+element).offset().top-50);
	$('body').animate({
        scrollTop: num
    }, 800);
}

//-------------------------------------------------------MODAL -----------------------------------------

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//-------------------------------------------------------WEATHER API-----------------------------------------

window.onload = function AjaxCall() {
    $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/weather?q=Palamos,es&units=metric&appid=4085735c7cf3f2974a14b3c4600e79f0',
        type: 'GET',
        success: function (result) {
            var img = '<img src="img/weather/' + (result.weather[0].icon).substring(0, 2) + '.png" alt="weather-icon"" />';
            var temp = Math.round(result.main.temp);
            var wind = result.wind.speed;
            $(".temp").html(temp + "°");
            $(".wind").html(wind + " km/h");
            $(".icon-weather").append(img);
        }
    });
}

//----------------------------------------------------MAPS API--------------------------------------------------

function initMap() {

    var origin_place_id = null;
    var destination_place_id = null;

    var travel_mode = google.maps.TravelMode.DRIVING;
    var map = new google.maps.Map(document.getElementById('map_API'), {
        mapTypeControl: false,
        center: {lat: 41.846684, lng: 3.129744},
        zoom: 9
    });
  
    //MARKER
    var myLatLng = {lat: 41.846684, lng: 3.129744};	
        map = new google.maps.Map(document.getElementById('map_API'), {
        center: {lat: 41.846684, lng:  3.129744},
        zoom: 15
    });
        
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!'
    });
  
    // DESTINACION Y LOCALIZACION

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(map);

    var origin_input = document.getElementById('origin-input');
    var destination_input = document.getElementById('destination-input');
    var modes = document.getElementById('mode-selector');

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(origin_input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(destination_input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(modes);

    var origin_autocomplete = new google.maps.places.Autocomplete(origin_input);
    origin_autocomplete.bindTo('bounds', map);
    var destination_autocomplete = new google.maps.places.Autocomplete(destination_input);
    destination_autocomplete.bindTo('bounds', map);

    // Sets a listener on a radio button to change the filter type on Places
    // Autocomplete.

    function expandViewportToFitPlace(map, place) {
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }
    }

    origin_autocomplete.addListener('place_changed', function() {
        var place = origin_autocomplete.getPlace();
        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
        return;
    }
    expandViewportToFitPlace(map, place);

    // If the place has a geometry, store its place ID and route if we have
    // the other place ID
	
    origin_place_id = place.place_id;
    route(origin_place_id, destination_place_id, travel_mode, directionsService, directionsDisplay);
  });

  destination_autocomplete.addListener('place_changed', function() {
    var place = destination_autocomplete.getPlace();
    if (!place.geometry) {
        window.alert("Autocomplete's returned place contains no geometry");
        return;
    }
    expandViewportToFitPlace(map, place);

    // If the place has a geometry, store its place ID and route if we have
    // the other place ID
	
    destination_place_id = place.place_id;
    route(origin_place_id, destination_place_id, travel_mode, directionsService, directionsDisplay);
  });

  function route(origin_place_id, destination_place_id, travel_mode, directionsService, directionsDisplay) {
    if (!origin_place_id || !destination_place_id) {
      return;
    }
    directionsService.route({
      origin: {'placeId': origin_place_id},
      destination: {'placeId': destination_place_id},
      travelMode: travel_mode
    }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
  }
}

//-------------------------------------------------LIGHTBOX (w/ fade effects)---------------------------------

$(document).ready(function(){
    var divInUse;
    $(".thumbnail").click(function(e){

        var navbar = $('#navbar');
        var hash = e.currentTarget.parentNode.hash; //gets the href attribute of the normal sized image
        divInUse = hash;
        var exists = $(hash).length; //the length of this parameter determines if the camp exists (1) or not (0)
        var newID = hash.substring(1); // deletes the #

        if (exists === 0){
            $(this).parent().parent().append('<a href="#_" class="lightbox" id="'+newID+'"><img src="'+e.currentTarget.attributes.route.value+'"></a>');
            
            $(".lightbox").click(function(){ //reloads the event subscription with the new created class
                $(divInUse).fadeOut();
                $('body').css('overflow', '');
            });
        }

        $(hash).fadeIn();
        $('body').css('overflow', 'hidden');
    });
    /*SCRIPTS DEL SLIDER DE VIEOS!!!!!!!!!!!*/
    videoSlider();
	showFirstVideo();
	$('.secondary-video').click(function(e){
	showvideo(e.currentTarget.childNodes[1]);
	})
	$('.nextIconLeft').click(function(e){
	videoSliderLeft();
	})
	$('.nextIconRight').click(function(e){
	videoSliderRight();
	});
	/*SCRIPTS DEL SLIDER DE VIEOS!!!!!!!!!!!*/
});

//--------------------------------------------------------------COOKIE---------------------------------

window.addEventListener('load', checkCookie);

function getSeason(){
    var d = new Date();
    d.setTime(d.getTime());
    var month= d.getMonth();
    var season;
    if(month==11 || month==0 || month==1){
        season="winter";
    }else if(month==2 || month==3 || month==4){
        season="spring";
    }else if(month==5 || month==6 || month==7){
        season="summer";
    }else{
        season="autumn";
    }
    return season;
}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        c=c.trim();
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var season = getCookie("season");
    var actualSeason=getSeason();
    if (season != "") {
        if (season != actualSeason) {
                showSuccessAlert("Hem canviat d'estacio des de l'ultim cop que va entrar, desitja veure el nou disseny?", 'aceptCookies()');
        } else {
            swapStyleSheet("src/station/"+season+".css");
        }
    } else {
        var msg = "Es el primer cop que entra a la pàgina, vol veure el disseny de la temporada?";
        showSuccessAlert(msg, 'aceptCookies()');
    }
}

function swapStyleSheet(sheet){
    document.getElementById('pagestyle').setAttribute('href', sheet);
}

//---------------------------------------------------------DESPLEGABLE---------------------

$("#boton_accion").click(function(e){
    $("#contenido_escondido").slideToggle(1000, function (e) {
        var direccion = $("#boton_accion").attr("src");
        if (direccion == "img/arrow.png") {
            $("#boton_accion").attr("src", "img/arrow_up.png");
        } else {
            $("#boton_accion").attr("src", "img/arrow.png");
        }
    });
});

//------------------------------------------------------------Alerts--------------------------

function showSuccessAlert(msg, event){
    var domDiv = $("#topSuccessMessage");
    document.getElementById('topSuccessMessage').innerHTML = msg +
        "<button type='button' onclick='" + event + "' class='btn btn-danger'>Si</button>" +
        "<button type='button' onclick='closeAlert()' class='btn btn-info'>No</button>";
    $("#navbar").addClass("padding-alert");
    domDiv.addClass("alert");
    domDiv.slideDown(600);
}

function closeAlert() {
    var domDiv = $("#topSuccessMessage");
    domDiv.fadeOut("slow");
    domDiv.removeClass("alert");
    $("#navbar").removeClass("padding-alert");
    swapStyleSheet("src/station/default.css");
}

function aceptCookies() {
    var domDiv = $("#topSuccessMessage");
    var actualSeason=getSeason();

    domDiv.fadeOut("slow");
    domDiv.removeClass("alert");
    $("#navbar").removeClass("padding-alert");

    swapStyleSheet("src/station/"+actualSeason+".css");
    setCookie("season", actualSeason, 300);
}

//------------------------------------------------------------MENUS---------------------------
function createMenu (day, Starters, Firsts, Seconds, Drinks, Desserts){
        this.day = day;
        this.Starters = Starters;
        this.Firsts = Firsts;
        this.Seconds = Seconds;
        this.Drinks = Drinks;
        this.Desserts = Desserts;
    }

    var dillMenu= new createMenu("Dilluns",["Amanida","Sopa","Truita","Verdura","Tapes","Braves"],["Arros","Pasta","Crepe","Rollitos","Arros","Ceba"],
                                ["Bistec","Hamburguesa","Peix","Salsitxes","Tofe","Pizza"],["Vodka","Tequila","Ron","Ginebra","Jaggermeister","Whisky"],
                                ["Crepe","Pastis","Tarta de Santiago","Fruita","Banano","Crema Catalana"]);
    var dimMenu = new createMenu("Dimarts",["Amanida","Sopa","Truita","Verdura","Tapes","Braves"],["Arros","Pasta","Crepe","Rollitos","Arros","Ceba"],
                                ["Bistec","Hamburguesa","Peix","Salsitxes","Tofe","Pizza"],["Vodka","Tequila","Ron","Ginebra","Jaggermeister","Whisky"],
                                ["Crepe","Pastis","Tarta de Santiago","Fruita","Banano","Crema Catalana"]);
    var dxMenu = new createMenu("Dimecres",["Amanida","Sopa","Truita","Verdura","Tapes","Braves"],["Arros","Pasta","Crepe","Rollitos","Arros","Ceba"],
                                ["Bistec","Hamburguesa","Peix","Salsitxes","Tofe","Pizza"],["Vodka","Tequila","Ron","Ginebra","Jaggermeister","Whisky"],
                                ["Crepe","Pastis","Tarta de Santiago","Fruita","Banano","Crema Catalana"]);
    var djMenu = new createMenu("Dijous",["Amanida","Sopa","Truita","Verdura","Tapes","Braves"],["Arros","Pasta","Crepe","Rollitos","Arros","Ceba"],
                                ["Bistec","Hamburguesa","Peix","Salsitxes","Tofe","Pizza"],["Vodka","Tequila","Ron","Ginebra","Jaggermeister","Whisky"],
                                ["Crepe","Pastis","Tarta de Santiago","Fruita","Banano","Crema Catalana"]);
    var dvMenu = new createMenu("Divendres",["Amanida","Sopa","Truita","Verdura","Tapes","Braves"],["Arros","Pasta","Crepe","Rollitos","Arros","Ceba"],
                                ["Bistec","Hamburguesa","Peix","Salsitxes","Tofe","Pizza"],["Vodka","Tequila","Ron","Ginebra","Jaggermeister","Whisky"],
                                ["Crepe","Pastis","Tarta de Santiago","Fruita","Banano","Crema Catalana"]);
    var findeMenu= new createMenu("CapDeSetmana",["Amanida","Sopa","Truita","Verdura","Tapes","Braves"],["Arros","Pasta","Crepe","Rollitos","Arros","Ceba"],
                                ["Bistec","Hamburguesa","Peix","Salsitxes","Tofe","Pizza"],["Vodka","Tequila","Ron","Ginebra","Jaggermeister","Whisky"],
                                ["Crepe","Pastis","Tarta de Santiago","Fruita","Banano","Crema Catalana"]);

    var arrMenus = [dillMenu,dimMenu,dxMenu,djMenu,dvMenu,findeMenu];

    function openMenu(dayMenu) {
        var menuDiv = document.getElementById("menu");
        menuDiv.innerHTML="";

        var posArray;
        switch (dayMenu) {
            case ("Dilluns"):
                posArray = 0;
                break;
            case ("Dimarts"):
                posArray = 1;
                break;
            case ("Dimecres"):
                posArray = 2;
                break;
            case ("Dijous"):
                posArray = 3;
                break;
            case ("Divendres"):
                posArray=4;
                break;
            default:
                posArray = 5;
                break;
        }


        var menusKeys=Object.keys(arrMenus[posArray]);
        var title=document.createElement("h2");
        title.innerHTML=arrMenus[posArray][menusKeys[0]];
        var downloadIcon = document.createElement("a");
        downloadIcon.id = "downloadIcon";
        downloadIcon.setAttribute("download","menu/Menu"+arrMenus[posArray][menusKeys[0]]+".pdf");
        downloadIcon.setAttribute("height",'27px');
        downloadIcon.setAttribute("href","menu/Menu"+arrMenus[posArray][menusKeys[0]]+".pdf");
        downloadIcon.innerHTML= "<img src='img/pdf-icon.png' height='27px' alt='PdfIcon'>"
        title.appendChild(downloadIcon);
        menuDiv.appendChild(title);
        for (var j=1; j<menusKeys.length;j++){
            var divElement = document.createElement("div");
            var titleElement = document.createElement("h4");
            titleElement.innerHTML = menusKeys[j];
            divElement.appendChild(titleElement);
            for (var i=0; i<arrMenus[posArray][menusKeys[j]].length; i++ ){
                var par=document.createElement("p");
                par.innerHTML=arrMenus[posArray][menusKeys[j]][i];
                divElement.appendChild(par);
            }
            divElement.setAttribute("class", "menuElement");
            menuDiv.appendChild(divElement);
        }
    }
    document.getElementById("defaultOpen").click();
    
  
     
// CARTA ---------------------------------------------------------> 
 
	$(document).ready(function(){
	 $(".general").hide();
	 
	 $(".menu a").click(function(){
		$(".inici").hide();
		var tipus = $(this).attr("id");
		var test = "." + tipus;
		$(".general").hide();
		$(test).show();
		
		});
	});
