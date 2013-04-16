/*jslint browser: true, eqeq: true, nomen: true, white: true */
/*global describe: false, console: false, it: false, expect: false, Ruter: false */
var createRuterApp = function(){
	var Ruter = Ruter || {};

	Ruter.formatDate = function (theDate){
		theDate = theDate.slice(6,19);
		theDate = parseInt(theDate, 10);
		var date = new Date(theDate);
		dateString = date.getHours()+":"+('0'+date.getMinutes()).slice(-2);
		return dateString;
	};

	Ruter.getDuration = function (date1, date2){
		date1 = new Date(parseInt(date1.slice(6,19), 10));
		date2 = new Date(parseInt(date2.slice(6,19), 10));
		return (Math.abs(date2-date1))/1000/60;
	};

	Ruter.createDate = function(){
		var MyDate = new Date();
		var MyDateString = "";

		MyDate.setDate(MyDate.getDate());

		MyDateString += ('0' + MyDate.getDate()).slice(-2);
		MyDateString += ('0' + (MyDate.getMonth()+1)).slice(-2);
		MyDateString += MyDate.getFullYear();
		MyDateString += MyDate.getHours();
		MyDateString += ('0' + MyDate.getMinutes()).slice(-2);
		return MyDateString;
	};

	Ruter.buildUrl = function (myDate, toPlace, fromPlace, changeMargin, changePunish, walkingFactor, isAfter, proposals, transportTypes){
		var url = "http://reis.trafikanten.no/reisrest/Travel/GetTravelsByPlaces/?";
		if(myDate !== undefined){
			url += "time=" + myDate;
		}
		if(toPlace !== undefined){
			url += "&toplace=" + toPlace;
		}
		if(fromPlace !== undefined){
			url += "&fromplace=" + fromPlace;
		}
		if(changeMargin !== undefined){
			url += "&changeMargin=" + changeMargin;
		}
		if(changePunish !== undefined){
			url += "&changePunish=" + changePunish;
		}
		if(walkingFactor !== undefined){
			url += "&walkingFactor=" + walkingFactor;
		}
		if(isAfter !== undefined){
			url += "&isAfter=" + isAfter;
		}
		if(proposals !== undefined){
			url += "&proposals=" + proposals;
		}
		if(transportTypes !== undefined){
			url += "&transporttypes=" + transportTypes;
		}
		url += "&callback=?";
		return url;
	};

	Ruter.getTravelAlternatives = function() {
		var MyDateString = Ruter.createDate();
		var url = Ruter.buildUrl(MyDateString, "3012550", "3010360", "2", "100", "1", "True", "12", "Train,Metro");
		console.log(url);
		$.getJSON(url, function(json){
			$.each(json.GetTravelsByPlacesResult.TravelProposals, function(i, travel){
				var travelFrom = travel.TravelStages[0].DepartureStop.Name;
				var travelTo = travel.TravelStages[2].ArrivalStop.Name;
				var arrivalTime = Ruter.formatDate(travel.ArrivalTime);
				var departureTime = Ruter.formatDate(travel.DepartureTime);
				var metroDestination = travel.TravelStages[0].Destination;
				var metroActualDestination = travel.TravelStages[0].ArrivalStop.Name;
				var metroDepartureTime = Ruter.formatDate(travel.TravelStages[0].DepartureTime);
				var metroArrivalTime = Ruter.formatDate(travel.TravelStages[0].ArrivalTime);
				var metroLine = travel.TravelStages[0].LineName;
				var TrainDestination = travel.TravelStages[2].Destination;
				var TrainDepartureTime = Ruter.formatDate(travel.TravelStages[2].DepartureTime);
				var TrainArrivalTime = Ruter.formatDate(travel.TravelStages[2].ArrivalTime);
				var TrainLine = travel.TravelStages[2].LineName;
				var trainDepartureStop = travel.TravelStages[2].DepartureStop.Name;
				var duration = Ruter.getDuration(travel.DepartureTime, travel.ArrivalTime);

				function getDeviations(){
					var returnString ="<div class='alert alert-info'><ul class='unstyled'>";
					var avvik = false;
					for(var i=0; i < travel.TravelStages.length; i++){
						if(travel.TravelStages[i].Deviations.length > 0){
							avvik = true;
							for(var j=0; j < travel.TravelStages[i].Deviations.length; j++){
								returnString += "<li><strong>Avvik: </strong>"+travel.TravelStages[i].Deviations[j].Header+"</li>";
							}
						}
					}
					returnString += "</ul></div>"
					if(avvik)
						return returnString;
					else
						return "";
				}

				var totalString = "<div class='well'>"+getDeviations(0)+"<ul class='unstyled travel'><li><b>Reisetid: "+duration+"min</b></li><li><img src='img/tbane.png' />"+departureTime+" - "+travelFrom+"</li><li class='journey'>Linje <span class='label'>"+metroLine+"</span> mot "+metroDestination+"</li><li><img src='img/tbane.png' />"+metroArrivalTime+" - "+metroActualDestination+"</li><li><img src='img/tog.png' />"+TrainDepartureTime+" - "+trainDepartureStop+"</li><li class='journey'>Linje <span class='label'>"+TrainLine+"</span> mot "+TrainDestination+"</li><li><img src='img/tog.png' />"+TrainArrivalTime+" - "+travelTo+"</li></ul></div>";
				$("#travels").append(totalString);
			});
		});
	}
	return Ruter;
}

