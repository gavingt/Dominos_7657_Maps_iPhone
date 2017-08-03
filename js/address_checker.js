var infoWindow = null;
var defaultZoomLevel = 12;
var currentZoomLevel = 12;
var map = undefined;
var autocomplete, marker;
var areaPolygon7667, areaPolygon7657, areaPolygon7659;

var componentForm = {
    street_number: 'short_name',
    route: 'short_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    postal_code: 'short_name'
};

var darkMapStyle = [
    {elementType: 'geometry', stylers: [{color: '#101c26'}]},
    {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
    {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#263c3f'}]
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#6b9a76'}]
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#38414e'}]
    },
    {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}]
    },
    {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#746855'}]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}]
    },
    {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}]
    },
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#2f3948'}]
    },
    {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}]
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}]
    },
    {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}]
    },

    {
        "featureType": "landscape",
        "elementType": "geometry.stroke",
        "stylers": [{"color": "#ffffff"}]
    }
];




// Define the LatLng coordinates for the polygon's path.
var areaCoords7667 = [
    {lat: 33.516087, lng: -111.960475},
    {lat: 33.516464, lng: -111.945308},
    {lat: 33.516909, lng: -111.925933},
    {lat: 33.516781, lng: -111.908939},
    {lat: 33.516526, lng: -111.878346},
    {lat: 33.509462, lng: -111.878091},
    {lat: 33.509492, lng: -111.888101},
    {lat: 33.494916, lng: -111.887999},
    {lat: 33.487532, lng: -111.888024},
    {lat: 33.480509, lng: -111.890066},
    {lat: 33.470458, lng: -111.888224},
    {lat: 33.469421, lng: -111.888255},
    {lat: 33.451193, lng: -111.890652},
    {lat: 33.451346, lng: -111.892264},
    {lat: 33.451291, lng: -111.909241},
    {lat: 33.465800, lng: -111.908883},
    {lat: 33.465798, lng: -111.921867},
    {lat: 33.487618, lng: -111.921846},
    {lat: 33.487360, lng: -111.960879},
    {lat: 33.516087, lng: -111.960475}
];

// Define the LatLng coordinates for the polygon's path.
var areaCoords7657 = [
    {lat: 33.568049, lng: -111.964928},
    {lat: 33.567546, lng: -111.926041},
    {lat: 33.596709, lng: -111.925898},
    {lat: 33.596512, lng: -111.891587},
    {lat: 33.585348, lng: -111.891604},
    {lat: 33.579407, lng: -111.890724},
    {lat: 33.575362, lng: -111.889085},
    {lat: 33.573501, lng: -111.889066},
    {lat: 33.568909, lng: -111.891082},
    {lat: 33.564516, lng: -111.889254},
    {lat: 33.559474, lng: -111.880478},
    {lat: 33.553555, lng: -111.879341},
    {lat: 33.553142, lng: -111.856546},
    {lat: 33.538726, lng: -111.856789},
    {lat: 33.538481, lng: -111.881873},
    {lat: 33.524098, lng: -111.887541},
    {lat: 33.516641, lng: -111.887959},
    {lat: 33.516646, lng: -111.895921},
    {lat: 33.516678, lng: -111.900195},
    {lat: 33.516675, lng: -111.908717},
    {lat: 33.516718, lng: -111.913144},
    {lat: 33.516886, lng: -111.923825},
    {lat: 33.516156, lng: -111.964583}
];

// Define the LatLng coordinates for the polygon's path.
var areaCoords7659 = [
    {lat: 33.487596, lng: -111.986979}, //44th st/Osborn
    {lat: 33.487407, lng: -111.978082}, //52nd st/osborn
    {lat: 33.487402, lng: -111.960863}, //56th st/osborn
    {lat: 33.487635, lng: -111.921855}, //74th st/osborn
    {lat: 33.465780, lng: -111.921877}, //74th st/mcdowell
    {lat: 33.465810, lng: -111.908864}, //mcdowell/hayden
    {lat: 33.440424, lng: -111.909561}, //mcclintock/curry
    {lat: 33.440408, lng: -111.918600}, //miller/curry
    {lat: 33.440137, lng: -111.934892}, //curry at first bend
    {lat: 33.437648, lng: -111.943336}, //curry/mill
    {lat: 33.439878, lng: -111.944463}, //mill at first bend
    {lat: 33.449484, lng: -111.952724}, //mill turns into van buren
    {lat: 33.450416, lng: -111.954381}, //mill still turning into van buren
    {lat: 33.450988, lng: -111.956790}, //end of curve on van buren
    {lat: 33.450974, lng: -111.974206}, //minor curve at van buren and 50th st
    {lat: 33.451188, lng: -111.987127} //van buren and 44th st
];




$(document).ready(function() {
    for (var i=1; i<=3; i++) {
        var checkedBoolean = getCookie("checkbox" + i) === "true";
        $("#checkbox" + i).prop("checked", checkedBoolean);
    }

    if ($("#checkbox2").is(":checked")) {
        setUpDarkMode();
    }

    initializeCheckboxClickEvents();
});

$("#expand-settings-button").on("click", function() {
    $("#settings-bar").show();
    $("#expand-settings-button").hide();
});


// First we check if you support touch, otherwise it's click (this is a necessary workaround to avoid using window.onclick which doesn't work in iOS without settings all elements to cursor: pointer)
var touchEvent = 'ontouchstart' in window ? 'touchend' : 'click';

$(document).on(touchEvent, function(event) {
    if (!document.getElementById("address-dropdown-button").contains(event.target) && !document.getElementById("address-table-content").contains(event.target)) {

        if (document.getElementById("address-table-content").classList.contains('show')) {
            document.getElementById("address-table-content").classList.remove('show');
        }
    }

    if (!document.getElementById("settings-bar").contains(event.target) && !document.getElementById("expand-settings-button").contains(event.target)) {
        $("#settings-bar").hide();
        $("#expand-settings-button").show();
    }
});


function initializeCheckboxClickEvents() {

    $("#checkbox1").click(function () {
        document.cookie = "checkbox1=" + $("#checkbox1").is(':checked') + "; expires=Thu, 18 Dec 2030 12:00:00 UTC";
        if (map !== undefined) {
            map.setCenter(marker.getPosition());
            if ($(this).is(":checked")) {
                map.setZoom(17);
            }
            else {
                map.setZoom(12);
            }
        }
    });

    $("#checkbox2").click(function () {
        document.cookie = "checkbox2=" + $("#checkbox2").is(':checked') + "; expires=Thu, 18 Dec 2030 12:00:00 UTC";
        if ($(this).is(":checked")) {
            if (map !== undefined) {
                map.setOptions({styles: darkMapStyle});
            }

            setUpDarkMode();
        }
        else {
            if (map !== undefined) {
                map.setOptions({styles: []});
            }
            $('body').css("background", "white").css("color", "#222");
            $("#address-dropdown-button, #x_button").css("background", "#CCC").css("border-left", "1px solid #000090");
            $("#input-textbox, #address-table-content").css("background", "#f9f9f9").css("color", "#222");
            $("#input-container").css("border", "2px solid #000090");
            $("#settings-bar").css("border-top", "2px solid black").css("background", "#CCC");
            $("#expand-settings-button").css("color", "#4d67ff");

        }
    });

    $("#checkbox3").click(function () {
        document.cookie = "checkbox3=" + $("#checkbox3").is(':checked') + "; expires=Thu, 18 Dec 2030 12:00:00 UTC";
        if ($(this).is(":checked")) {
            $("#map").css("visibility", "hidden");
            $(".gmaps-label").hide();
        }
        else {
            if ($("#notes").css("display") === "none") {
                $("#map").css("visibility", "visible");
                $(".gmaps-label").show();
            }
        }
    });
}

function setUpDarkMode () {
    $('body').css("background", "#222").css("color", "#e4e4e4");
    $("#address-dropdown-button, #x_button").css("background", "#666").css("border-left", "1px solid #4d67cc");
    $("#input-textbox, #address-table-content").css("background", "#cdcdcd").css("color", "black");
    $("#input-container").css("border", "2px solid #4d67cc");
    $("#settings-bar").css("border-top", "2px solid #AFAFAF").css("background", "#888");
    $("#expand-settings-button").css("color", "#4d67cc");

}


function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// When the user clicks on the button, toggle between hiding and showing the dropdown content
$("#address-dropdown-button").click(function() {
    document.getElementById("address-table-content").classList.toggle("show");
});

document.getElementById("x_button").addEventListener ("click", function() {
    document.getElementById("input-textbox").value = "";
    $("#address-dropdown-button").hide();
    $("#result").hide();
    $("#map").css("visibility", "hidden");
    $("#notes").show();
    $(".gmaps-label").hide();

    //puts cursor's focus on autocomplete textbox
    document.getElementById("input-textbox").focus();
});



// Create the autocomplete object, restricting the search to geographical and establishment location types.
function initAutocomplete() {

    //removes the country name from the autocomplete suggestions
    document.addEventListener('DOMNodeInserted', function(event) {
        var target = $(event.target);
        if (target.hasClass('pac-item')) {
            target.html(target.html().replace(/, United States<\/span>$/, "</span>"));
        }
    });

    var options = {
        types: ['geocode', 'establishment'],
        componentRestrictions: {country: 'us'}
    };

    autocomplete = new google.maps.places.Autocomplete(document.getElementById('input-textbox'), options);

    // When the user selects an address from the dropdown, populate the address fields in the form.
    autocomplete.addListener('place_changed', function () {
        fetchResults();
    });

    //puts cursor's focus on input textbox automatically
    document.getElementById("input-textbox").focus();
}



function fetchResults() {

    var place = autocomplete.getPlace();

    if (place.hasOwnProperty("address_components")) {

        $("#spinner").show();
        $("#map").css("visibility", "hidden");
        $(".gmaps-label").hide();
        $("#address-dropdown-button").show();
        $("#result").show().css("visibility", "visible");
        $("#notes").hide();


        //temporarily change result heading to black and have it say "Checking address..."
        var resultHeading = document.getElementById("result");
        resultHeading.style.color="black";
        resultHeading.textContent = "Checking address...";

        for (var component in componentForm) {
            document.getElementById(component).value = '';
        }

        // Get each component of the address from the place details
        // and fill the corresponding field on the form.
        for (var i = 0; i < place.address_components.length; i++) {
            var addressType = place.address_components[i].types[0];
            if (componentForm[addressType]) {
                document.getElementById(addressType).textContent = place.address_components[i][componentForm[addressType]];
            }
        }

        getLatlong();
    }
    else {
        alert("You must select one of the choices from the drop-down list!")
    }
}

//Perform geocoding on entered address to get latitude and longitude
function getLatlong() {
    if (marker !== undefined) {
        marker.setMap(null); //deletes old marker before figuring out where to place new one (so user doesn't get confused by the temporary presence of the old marker)

        var resultHeading = document.getElementById("result");
        resultHeading.style.color="black";
        resultHeading.textContent = "Checking address...";
    }

    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({ 'address': document.getElementById('input-textbox').value }, function (results, status) {

        if (status === google.maps.GeocoderStatus.OK) {

            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();

            initMap(latitude, longitude);
        }
        else {
            alert(status);
        }
    });
}

// Makes it so that the first suggestions shown are for streets in the delivery area
function biasResultsToDeliveryArea() {
    var rectangle = new google.maps.Rectangle({
        bounds: {
            north: 33.596,
            south: 33.433,
            east: -111.874,
            west: -111.987  }

    });

    autocomplete.setBounds(rectangle.getBounds());
}

//Uses latitude and longitude of entered address (already geocoded at this point) to place a marker on the map
function initMap(latitude, longitude) {


    $("#spinner").hide();

    if (!$("#checkbox3").is(':checked')) {
        $("#map").css("visibility", "visible");
        $(".gmaps-label").show();
    }

    if ($("#checkbox1").is(':checked')) {
        defaultZoomLevel = 17;
        currentZoomLevel = 17;
    }
    else {
        defaultZoomLevel = 12;
        currentZoomLevel = 12;
    }

    if ($("#checkbox2").is(':checked')) {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: defaultZoomLevel,
            gestureHandling: "greedy",

            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.DEFAULT
            },
            streetViewControl: false,
            zoomControl: false,
            fullscreenControl: false,
            clickableIcons: false,
            center: {lat: latitude, lng: longitude},
            styles: darkMapStyle
        });
    }
    else {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: defaultZoomLevel,
            gestureHandling: "greedy",

            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.DEFAULT
            },
            streetViewControl: false,
            zoomControl: false,
            fullscreenControl: false,
            clickableIcons: false,
            center: {lat: latitude, lng: longitude}
        });
    }

    if (!$("#checkbox3").is(':checked')) {
        //Adds the store number 7667 as a label on the map
        new LabelOverlay({
            ll: new google.maps.LatLng(33.488709, -111.909078),
            label: "7667",
            maxZoom: 13,
            minZoom: 11,
            className: "label7667",
            map: map
        });

        //Adds the store number 7657 as a label on the map
        new LabelOverlay({
            ll: new google.maps.LatLng(33.5492545, -111.923293),
            label: "7657",
            maxZoom: 13,
            minZoom: 11,
            className: "label7657",
            map: map
        });

        //Adds the store number 7659 as a label on the map
        new LabelOverlay({
            ll: new google.maps.LatLng(33.469666, -111.950810),
            label: "7659",
            maxZoom: 13,
            minZoom: 11,
            className: "label7659",
            map: map
        });
    }


    marker = new google.maps.Marker({
        position: {lat: latitude, lng: longitude},
        clickable: false,
        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
        map: map
    });

    // Construct the polygon.
    areaPolygon7667 = new google.maps.Polygon({
        paths: areaCoords7667,
        strokeColor: '#0000FF',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        clickable:false,
        fillColor: '#b1c9ef',
        fillOpacity: 0.35
    });

    areaPolygon7657 = new google.maps.Polygon({
        paths: areaCoords7657,
        strokeColor: '#ff363f',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        clickable:false,
        fillColor: '#efa3ac',
        fillOpacity: 0.35
    });

    areaPolygon7659 = new google.maps.Polygon({
        paths: areaCoords7659,
        strokeColor: '#15b031',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        clickable:false,
        fillColor: '#7eef7a',
        fillOpacity: 0.35
    });

    areaPolygon7667.setMap(map);
    areaPolygon7657.setMap(map);
    areaPolygon7659.setMap(map);

    displayResultText(latitude, longitude);
    showInfoWindow(map);
}

function displayResultText(latitude, longitude) {
    var resultHeading = document.getElementById("result");

    if(google.maps.geometry.poly.containsLocation(new google.maps.LatLng(latitude, longitude), areaPolygon7657) === true) {
        getReverseGeocodingData(latitude, longitude, function(address) {
            //compare geocoded address vs reverse geocoded address
            var geocodeStreetAddress = document.getElementById("street_number").textContent + " " + document.getElementById("route").textContent;
            var reverseGeocodeStreetAddress = address.split(",")[0];
            if (geocodeStreetAddress === reverseGeocodeStreetAddress) {
                resultHeading.style.color="green";
                resultHeading.innerHTML = 'IN AREA  <i class="fa fa-check" aria-hidden="true"></i>';
            }
            else {
                resultHeading.style.color="#00cb00";
                resultHeading.textContent = 'IN AREA';
            }
        });
    }
    else if (google.maps.geometry.poly.containsLocation(new google.maps.LatLng(latitude, longitude), areaPolygon7667) === true) {
        resultHeading.style.color = "#ff363f";
        resultHeading.innerHTML = 'OUT OF AREA<br>call (480) 947-3030';
    }
    else if (google.maps.geometry.poly.containsLocation(new google.maps.LatLng(latitude, longitude), areaPolygon7659) === true) {
        resultHeading.style.color = "#ff363f";
        resultHeading.innerHTML = 'OUT OF AREA<br>call (602) 952-9300';
    }
    else {
        resultHeading.style.color = "#ff363f";
        resultHeading.innerHTML = 'OUT OF AREA<br>call 1-800-DOMINOS';
    }
}




function showInfoWindow(map) {
    var doubleClickUsed = false;

    google.maps.event.addListener(map, 'zoom_changed', function(event){
        currentZoomLevel = map.getZoom();

        if (infoWindow !== null) {
            infoWindow.close();
        }
    });

    google.maps.event.addListener(map, 'dblclick', function(event){
        doubleClickUsed = true;
    });

    google.maps.event.addListener(map, 'drag', function(event){
        if (infoWindow !== null) {
            infoWindow.close();
        }
    });

    google.maps.event.addListener(map, 'click', function(event){

        //close a previously created infoWindow
        if (infoWindow !== null) {
            infoWindow.close();
        }

        //only allow user to place an infoWindow if the zoom level is greater than 14, and if address-table-content and settings-bar aren't visible
        if (currentZoomLevel > 14 && !$("#address-table-content").is(":visible") && !$("#settings-bar").is(":visible")) {
            var latitude = event.latLng.lat();
            var longitude = event.latLng.lng();

            // function(address) is a callback method that executes once callback(results[0].formatted_address) is found asynchronously
            getReverseGeocodingData(latitude, longitude, function (address) {
                infoWindow = new google.maps.InfoWindow({
                    content: address,
                    position: {lat: latitude, lng: longitude}
                });
                if (!doubleClickUsed) {
                    infoWindow.open(map);
                }
                doubleClickUsed = false;
            });
        }
    });
}

function getReverseGeocodingData(lat, lng, callback) {
    var latlng = new google.maps.LatLng(lat, lng);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status !== google.maps.GeocoderStatus.OK) {
            alert(status);
        }
        // Check to see if the Geoeode Status is OK before proceeding
        if (status === google.maps.GeocoderStatus.OK) {
            callback(results[0].formatted_address);
        }
    });
}
