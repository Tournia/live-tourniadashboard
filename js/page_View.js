function getTournamentTitleandPageInfo(){
	log("getting tournament title...")
	$("#TournamentUrlName").empty()
	if(sampleData == false){
		$.getJSON(tournamentInfoUrl, function (tournamentInfo) {
			my_tournamentInfo = tournamentInfo
			//log(my_tournamentInfo)
			})
		.success(function(){
			my_tournamentName =  my_tournamentInfo.name
			displayTitle()
		})
	} else {
		my_tournamentInfo_LOCAL = {}
		if(tournament_ID == "utrecht2016"){
			my_tournamentInfo_LOCAL.name = "ISBT Utrecht 2016"
		} else if(tournament_ID == "isbt-amsterdam-2017"){
			my_tournamentInfo_LOCAL.name = "ISBT Amsterdam 2017"
		} else {
			my_tournamentInfo_LOCAL.name = "No Tournament"
		}
		my_tournamentName = my_tournamentInfo_LOCAL.name
		displayTitle()
	}
}

//display Tournament title
function displayTitle(){
	log("displaying tournamant title...")
	if(ifMobile == true){		
		document.getElementById('TournamentUrlName1').innerHTML = my_tournamentName
		document.getElementById('TournamentUrlName2').innerHTML = my_tournamentName
		document.getElementById('TournamentUrlName3').innerHTML = my_tournamentName
		document.getElementById('TournamentUrlName4').innerHTML = my_tournamentName
		document.getElementById('TournamentUrlName5').innerHTML = my_tournamentName
		
	} else { //if no mobile
		//var ifPlayersViewPreset = (ifPlayersViewPreset == false
		document.getElementById('TournamentUrlName').innerHTML = my_tournamentName
		var anouncementText = "Go to tourniadashboard.nl/"+tournament_ID+" to check all the info on your mobile."
		document.getElementById('announcements').innerHTML = anouncementText
	}
}


function displayTime() {
		var my_currentTime = new Date();
		var hours = my_currentTime.getHours();
		var minutes = my_currentTime.getMinutes();
		var seconds = my_currentTime.getSeconds();

		// If the hours digit is less than 10
		if(hours < 10) {
			// Add the "0" digit to the front
			// so 9 becomes "09"
			hours = "0" + hours;
		}
		// Format minutes and seconds the same way
		if(minutes < 10) {
			minutes = "0" + minutes;
		}        
		if(seconds < 10) {
			seconds = "0" + seconds;
		}

		// This gets a "handle" to the clock div in our HTML
		var clockDiv = document.getElementById('myClock');

		// Then we set the text inside the clock div 
		// to the hours, minutes, and seconds of the current time
		
		clockDiv.innerHTML = hours + ":" + minutes //+":" + seconds;

	// This runs the displayTime function the first time
	// This makes our clock 'tick' by repeatedly
	// running the displayTime function every second.
	}
		
function toggleFullScreen() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
   (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {  
      document.documentElement.requestFullScreen();  
    } else if (document.documentElement.mozRequestFullScreen) {  
      document.documentElement.mozRequestFullScreen();  
    } else if (document.documentElement.webkitRequestFullScreen) {  
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
    }  
  } else {  
    if (document.cancelFullScreen) {  
      document.cancelFullScreen();  
    } else if (document.mozCancelFullScreen) {  
      document.mozCancelFullScreen();  
    } else if (document.webkitCancelFullScreen) {  
      document.webkitCancelFullScreen();  
    }  
  }  
}

function createPage(){
	log("creating page...")
	//display Tournament Title
	
	getTournamentTitleandPageInfo()
	
	//show which tables
	if(ifMobile == false){
		tableConfigurations()
	}
	
	/*make tables*/
	if (sampleData == true){
		getLocalDataAndMakeLocalTables()
		if(runLocal == true){
			simpleTabChangeOnce()
		}
	} else {
		$.when(checkForAPIChange())
		.then(function(){
			getAPIDataAndMakeTables()
			if(runLocal == true){
				simpleTabChangeOnce()
			}
		})
	}

	if(ifMobile == true && mobileError == true){
		stopLoaders()
	}

	//refresh tables interval
}
	//run clock		
	//if (ifMobile == true){
		
		
		/*var button = document.createElement("div");
		button.innerHTML = "";
		var body = document.getElementById("jumpDownBox");
		body.appendChild(button)
		
		var oldLink = document.createElement('a');
		oldLink.href =  oldLiveUrl
		oldLink.innerHTML = "Go to Rankings"
		body.appendChild(oldLink);*/
		
		/*element.addEventListener("touchmove", (ev) =>{
			let zoomFactorX = document.documentElement.clientWidth / window.innerWidth;
			let zoomFactorY = document.documentElement.clientHeight / window.innerHeight;
			let pageHasZoom = !(zoomFactorX === 1 && zoomFactorY ===1);
			
			if(pageHasZoom) {
				//page is zoomed
				ev.stopPropagation();
				ev.preventDefault();
			}
		});*/
	
	
	//} else { // ifMobile == false
		//show which tables
		//log("countLeftTables:", countLeftTables, "shownoLeftTables:", shownoLeftTables)
		
	
	//}
	
	/* Appending CSS*/
	
function removeTable(tableName, rowsOver){
	var table = document.getElementById(tableName);
	var rowCount = table.rows.length;
	for (var i = rowsOver; i < rowCount; i++) {
		table.deleteRow(rowsOver);
	}
	////////console.log("remove", tableName, "done")
}

function setrefreshTablesInterval(){
	if (turnOnAutoRefresh == true && ifPaging == false){
		//log("setting autoRefresh in Organizer View mode as ifPaging is turned off")
		try{
			clearInterval(reloadDataInterval)
		} catch(er){
		}

			//log("..to:", reloadDataTime/1000,  "secs")
			reloadDataInterval = setInterval(function(){	
				//log("in interval table with interval secs:", reloadDataTime)
				if(sampleData == false){
					$.when(checkForAPIChange())
					.then(function(){
						if(ifAPIChangeDetected == true){
							removeTables()
						} else {}
					})
				} else {
					ifAPIChangeDetected = true
					removeTables()
				}					
				
				/*var findActiveTabTimeout = setTimeout(function(){
					var my_activeTab = $('.tab-content').find('.tab-pane.active').attr('id')
					
					log("active tab:", my_activeTab, startTab, timeSinceLastRefreshTime, totCycleTime)
					if (ifOrganizerViewPreset == true){
						log("refreshng table...")
						removeTables()
					} else if (ifOrganizerViewPreset == false){
						log("in FALSE organizerviewPreset ")
						if(my_activeTab == startTab && (timeSinceLastRefreshTime >= 60 || totCycleTime >= 60000)){ //1 minute
							log("back in active tab and refresh time is greater than 60")
							removeTables()
						}
					}
				}, 1000)*/
			}, reloadDataTime)
	} else {
		if(ifMobile == false){
			if(turnOnAutoRefresh == true){
				log("autrefresh is done through paging")
			} else {
				log("autorefresh is turned off")
			}
		}
	}
}

function openTab(evt, tabId) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabId).style.display = "block";
    evt.currentTarget.className += " active";
}
