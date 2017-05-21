function findObject(array, key, prop){
	prop = (typeof prop === 'undefined') ? 'name' : prop;    

	for (var i=0; i < array.length; i++) {
		if (array[i][prop] === key) {
			var my_object = array[i]
			break
		}
	}
	return my_object;
}

function inObject(array, key, prop){
	prop = (typeof prop === 'undefined') ? 'name' : prop;    

	for (var i=0; i < array.length; i++) {
		if (array[i][prop] === key) {
			var my_object = array[i]
			break
		} else {
			return false
		}
	}
	return true;
}

function inArray(needle, haystack) {
	for (var i = 0; i < haystack.length; i++) {
		if (haystack[i] == needle){
			return true;
		}
	}
	return false;
}

function isEven(n) {
	return n % 2 == 0
}
function isOdd(n) {
	return Math.abs(n % 2) == 1
}
	
function countItemsTrue(arry){
   var result = 0;
   for(x = 0; x < arry.length;  x++){
	  if(arry[x] === true){
		result+=1;
	  }
   }
   //log(result)
   return result;

}

function findPlayersPlaying(playerArray, my_locationsList, playersPlayingObects){
	for (var pl  = 0; pl < playerArray.length; pl++){
		var my_individualPlayer = playerArray[pl]
		//////console.log("in players playing object selection with:", my_individualPlayer)
			for (m in my_locationsList){
				foundPlayer = false;
				var myT1Players = my_locationsList[m].team1Players
				var myT2Players = my_locationsList[m].team2Players
				var position = 0
				for(var key1 in myT1Players){
					position += 1
					var individual1Player = myT1Players[key1]
					if (individual1Player == my_individualPlayer){
						//////console.log("found person in team 1")
						var my_playerObject = my_locationsList[m]
						var foundPlayer = true
						//////console.log("in position:", position)
						playersPlayingObects.push(my_playerObject)
						break
						break
					} else {
						for(var key2 in myT2Players){
							var individual2Player = myT2Players[key2]
							if (individual2Player == my_individualPlayer){
								//////console.log("found person in team 2")
								var foundPlayer = true
								var my_playerObject = my_locationsList[m]
								//////console.log("in position:", position)
								playersPlayingObects.push(my_playerObject)
								break
								break
							}
						}
					}
				}
			}
		}
		//////console.log("my players playing objects:", playersPlayingObects)
		var my_predictedTimeLeftArray = []
		for(ob = 0; ob < playersPlayingObects.length; ob++){
			var my_predictedTimeLeft = playersPlayingObects[ob].deltaPredictedTimeLeft 
			my_predictedTimeLeftArray.push(my_predictedTimeLeft)
		}
		var my_maxPlayerStillPlayingTime = Math.max(predictedTimeLeftArray)
		if(isNaN(my_maxPlayerStillPlayingTime)){ //predictedTimesLeft are equal
			my_maxPlayerStillPlayingTime = my_predictedTimeLeftArray[0]
		}
		//////console.log("my highest Predicted time:", my_maxPlayerStillPlayingTime)
	return my_maxPlayerStillPlayingTime
}



function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

function dynamicSortMultiple() {
    /*
     * save the arguments object as it will be overwritten
     * note that arguments object is an array-like object
     * consisting of the names of the properties to sort by
     */
    var props = arguments;
    return function (obj1, obj2) {
        var i = 0, result = 0, numberOfProperties = props.length;
        /* try getting a different result from 0 (equal)
         * as long as we have extra properties to compare
         */
        while(result === 0 && i < numberOfProperties) {
            result = dynamicSort(props[i])(obj1, obj2);
            i++;
        }
        return result;
    }
}
/*
function getInternetExplorerVersion(){
    var rv = -1; // Return value assumes failure.

    if (navigator.appName == 'Microsoft Internet Explorer'){

       var ua = navigator.userAgent,
           re  = new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})");

       if (re.exec(ua) !== null){
         rv = parseFloat( RegExp.$1 );
       }
    }
    else if(navigator.appName == "Netscape"){                       
       // in IE 11 the navigator.appVersion says 'trident'
       // in Edge the navigator.appVersion does not say trident
       if(navigator.appVersion.indexOf('Trident') === -1) rv = 12;
       else rv = 11;
    }       

    return rv;          
}


function checkIEVersion(){
  var ver = getInternetExplorerVersion();
  if ( ver > -1 )
  {
    if ( ver >= 8.0 ){ 
      msg = "You are using Internet Explorer. This website is only optimized for Google Chrome or Mozilla Firefox.";
	  alert(msg)
	  throw new Error(msg);
	} else {
      msg = "You are using Internet Explorer. This website is only optimized for Google Chrome or Mozilla Firefox."
	  alert(msg)
	  throw new Error(msg);
	}
  }
}*/
function checkBrowsers(){
// Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]" 
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;

// Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;

if(isIE == true || isEdge == true || isOpera == true || isSafari == true){
		msg = "You are using the Internet Explorer, Microsoft Edge, Safari, or the Opera browser. Fr now, this website is only optimized for Google Chrome or Mozilla Firefox."
	  alert(msg)
	  throw new Error(msg);
}
}
function mobileUpcomingMatchesTable(){
}

function stopLoaders(){
	document.getElementById("poolsOverviewLoader").style.display = "none" 
	document.getElementById("currentMatchesLoader").style.display = "none" 
	document.getElementById("upcomingMatchesLoader").style.display = "none"
	document.getElementById("postponedMatchesLoader").style.display = "none"

}


function ifLengthChange(){
	if(ifMobile == true){
		return false
	} else {
		return ifOrganizerViewPreset
	}
}

function tableInfoLocations(){
	if(ifOrganizerViewPreset == true){
		return '<"top"if>rt<"bottom"p>'
	} else {
		return '<"top">rt<"bottom"ip>'
	}
}

function sendTimesLog(){
  if(sendingDatatoDatabase == true){
	  //log('sending times log data..')
	  //log("data to send to database:", UM_loopLogStrings)
	  var UM_loopLogJSON = JSON.stringify(UM_loopLogStrings)
		$.ajax({
		  type: "POST",
		  data: {UM_loopLogStrings: UM_loopLogStrings},
		  url: "expectedTimesLog.php",
		  success: function(response){
				//log("data send succesufully to php")
			},
		  fail: function(response){
			  //log("data failed to send to php")
		  }
		});
  }
}

function setTournialiveUrl(){
	window.location = "http://www.tournia.net/en/" + tournament_ID + "/live/ranking/pool"

	//var my_tournialiveOldUrl = document.createElement("a")

	//my_tournialiveOldUrl.setAttribute("rel", "external")
	//my_tournialiveOldUrl.setAttribute("class", "navbar-button")
	//my_tournialiveOldUrl.innerHTML = "Rankings & Players"
}

function jsToisoDate(jsDate){
    //var DST = checkDST()
	//if(DST == true){ var hour = 2} else { var hour = 1}
	var date = jsDate
	//var offset = date.getTimezoneOffset()/60;
	//log(offset)
	var isoDate = date.getFullYear() + '-' +
            ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
			('00' + date.getUTCDate()).slice(-2) + ' ' + 
			('00' + date.getUTCHours()).slice(-2) + ':' + /*DST for CET*/
			('00' + date.getUTCMinutes()).slice(-2) + ':' + 
			('00' + date.getUTCSeconds()).slice(-2);
	//log(isoDate)
	
return isoDate}

function diff_secs(dt2, dt1){
  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff_sec = Math.abs(dt2 - dt1)/1000
  return Math.ceil(diff_sec);
}	

function checkDST(){
	var today = new Date()
	if (today.dst()) { var DST = true; } else {var DST = false}

	Date.prototype.stdTimezoneOffset = function() {
		var jan = new Date(this.getFullYear(), 0, 1);
		var jul = new Date(this.getFullYear(), 6, 1);
		return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
	}

	Date.prototype.dst = function() {
		return this.getTimezoneOffset() < this.stdTimezoneOffset();
	}
return DST}

function mailTo(){
	window.open("mailto:jellejstuurman@gmail.com?subject=Tournia dashboard support",'_blank')
}
