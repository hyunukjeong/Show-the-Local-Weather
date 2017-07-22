$("document").ready(function() {

	var $jsonStr = $("#jsonStr");

	var $geolocation = $("#geolocation");
	var $locationButton = $("#location-button");
	var $weatherIcon = $("#weather-icon");
	// var $temperature = $("#temperature");
	var $temp = $("#temp");
	var $tempUnit = $("#tempUnit");
	var $area = $("#area");
	var $description = $("#description");
	var $wind = $("#wind");

	var tempInCelsius;
	var isUnitCelsius = true;


	var urlHead = "https://fcc-weather-api.glitch.me/api/current?";


	// $side.html("<br><br><br><br>").css("background-color", "blue");

	// $locationButton.on("click", function() {
	// 	getGeolocation();
	// });

	getGeolocation();

	function getWeather(lat, lon) {
		var weatherUrl = urlHead + "lat=" + lat + "&lon=" + lon;
		$.ajax({
			type: 'GET',
			url: weatherUrl,
			success: function(data) {
				// $jsonStr.text(JSON.stringify(data));
				// $weatherIcon.css({"height": "100px", "width": "100px"});
				var weatherIconTag = "<img src='" + data.weather[0].icon + "'' alt='weather icon' style='width: 100%; height: 100%;'>"
				$weatherIcon.html(weatherIconTag);
				tempInCelsius = Math.round(data.main.temp * 10) / 10;
				$temp.text(tempInCelsius);
				$tempUnit.html(String.fromCharCode(176) + "<a href='#'>C</a>");
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
		// $geolocation.html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
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

	$tempUnit.click(convertUnit);

	function convertUnit() {
		if (isUnitCelsius) {
			$temp.text(CToF(tempInCelsius));
			$tempUnit.html(String.fromCharCode(176)+"<a href='#'>F</a>");
			isUnitCelsius = false;
		} else {
			$temp.text(tempInCelsius);
			$tempUnit.html(String.fromCharCode(176)+"<a href='#'>C</a>");
			isUnitCelsius = true;
		}
	}

	function CToF(C) {
		return Math.round((C * 1.8 + 32) * 10) / 10;
	}
});




