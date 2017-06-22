$("document").ready(function() {

	$side = $(".col-xs-3");
	$geolocation = $("#geolocation");
	$locationButton = $("#location-button");


	$side.html("<br><br><br><br>").css("background-color", "blue");

	$locationButton.on("click", function() {
		getGeolocation();
	});


});

// Success callback for getGeolocation()
function geo_success(position) {
	$geolocation.html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
}

// Error callback for getGeolocation()
function geo_error() {
	alert("No position available");
}

// Callback for Get Geolocation Button
function getGeolocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(geo_success, geo_error);
	}
}

// Initial getGeolocation() method
// function getGeolocation() {	
// 	if (navigator.geolocation) {
// 		navigator.geolocation.getCurrentPosition(function(position) {
// 			$geolocation.html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
// 		});
// 	} else {
// 		console.log("geolocation object does not exist");
// 	}
// }


