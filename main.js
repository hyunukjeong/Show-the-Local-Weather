$("document").ready(function() {

	var $jsonStr = $("#jsonStr");

	var $side = $(".col-xs-3");
	var $geolocation = $("#geolocation");
	var $locationButton = $("#location-button");
	var $weatherIcon = $("#weather-icon");
	var $temperature = $("#temperature");
	var $area = $("#area");
	var $description = $("#description");
	var $wind = $("#wind");


	var urlHead = "https://fcc-weather-api.glitch.me/api/current?";


	$side.html("<br><br><br><br>").css("background-color", "blue");

	$locationButton.on("click", function() {
		getGeolocation();
	});

	function getWeather(lat, lon) {
		var weatherUrl = urlHead + "lat=" + lat + "&lon=" + lon;
		$.ajax({
			type: 'GET',
			url: weatherUrl,
			success: function(data) {
				// $jsonStr.text(JSON.stringify(data));
				var weatherIconTag = "<img src='"
							+ data.weather[0].icon
							+ "'' alt='weather icon'>"
				$weatherIcon.html(weatherIconTag);
				$temperature.text(data.main.temp+" C");
				$area.text(data.name);
				$description.text(data.weather[0].description);
				$wind.text(data.wind.speed+" knots");

			},
			error: function(jqXHR, status, err) {
				console.log(jqXHR);
				console.log(status);
				console.log(err);
			}

		});
	}

	// Success callback for getGeolocation()
	function geo_success(position) {
		$geolocation.html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
		getWeather(position.coords.latitude, position.coords.longitude);
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

});




