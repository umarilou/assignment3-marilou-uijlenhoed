
var breweriesOptions = document.getElementById("breweries"); 
breweriesOptions.addEventListener("change", function(){getWeatherAPIdata()});


function getWeatherAPIdata() {


	var url = 'https://api.openweathermap.org/data/2.5/weather';
	var apiKey ='e433be9803b5526e887cc4410ab5187e';
	

	// construct request
	var request = url + "?q=" + breweriesOptions.value + "&appid=" + apiKey; 
	
	// get current weather
	fetch(request)

	// parse to JSON format
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	
	// render weather per day
	.then(function(response) {
		// render weatherCondition
		onWeatherAPISucces(response);	
	})
	
	// catch error
	.catch(function (error) {
		onWeatherAPIError(error);
	});
}

function getBreweryAPIdata() {


	var url = 'https://api.openbrewerydb.org/breweries';

	// construct request
	var request = url + "?per_page=15"; 

	// get breweries
	fetch(request)

	// parse to JSON format
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		//console.log(response.json());
		return response.json();
	})
	
	
	.then(function(response) {
	
		onBreweryAPISuccess(response);	
	})
	
	// catch error
	.catch(function (error) {
		onBreweryAPIError(error);
	});
}

function onWeatherAPISucces(response) {
	var degC = Math.floor(response.main.temp - 273.15);
	wind = response.wind.speed; 
	var clouds = response.weather[0].icon; 
	var icon = document.getElementById("image"); 
	icon.src = 'http://openweathermap.org/img/wn/' + clouds + '@2x.png';
	document.getElementById("weather").innerHTML = response.name + '<br>' + degC + "°C" + '<br>' + wind + ' km/h' ;


	if(degC >= 20){
		document.body.style.backgroundColor = "#c2ffc2";
	} else {
		document.body.style.backgroundColor = "#ff4d4d"; 
	}

}

function onBreweryAPISuccess(breweries) {
	var breweriesSelect = document.getElementById("breweries");

	for(var i=0; i<breweries.length ; i++){
		var name = breweries[i].name + ", " + breweries[i].city;
		var city = breweries[i].city; 
		var option = document.createElement("option");
		option.textContent = name;
		option.value = city; 
		breweriesSelect.appendChild(option);
	}
	getWeatherAPIdata();
}



function onWeatherAPIError(error) {
	console.error('Weather Request failed', error);
	var weatherBox = document.getElementById('weather'); 
}

function onBreweryAPIError(error) {
	console.error('Brewery Request failed', error);
}

// init data stream
getBreweryAPIdata();


