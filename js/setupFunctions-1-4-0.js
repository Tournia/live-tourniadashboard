var _tourniaUrl = "https://www.tournia.net/"
var _tourniaApiUrl = "https://www.tournia.net/api/v2/"


var tournament_IDError = false
var if_error
var my_error 
var ifGSheet
var my_tourniaPools
var my_variables = []

var my_setupVariables = true;

var my_tournamentId

var my_ifCurrentTable
var my_ifUpcomingTable
var my_ifPostponedTable
var my_ifPoolsTable


var my_IfOrganizerViewPreset
var my_ifReloadTables 
var my_reloadTime

var my_ifChangeTabs

var my_minPageTime
var my_upcomingTime
var my_currentTime
var my_postponedTime

var my_ifGoogleSheetLoad
var my_GoogleSheetUrl

var my_ifCustomSorting

var my_showStatusPlayersColumn
var my_showExpectedTimeColumn

var my_showPlayingTimeColumn
var my_showPredictedTimeColumn

var my_showTotTeamsColumn
var my_showRoundsNeededColumn
var my_showRoundsCreatedColumn
var my_showRoundsLeftColumn
var my_showStatusColumn
var my_showByeDataColumn
var my_ifPagingTable

var my_GoogleSheetEditUrl
var my_editBox
var my_editUrlClick
var _tourniaApiUrl
var tourniaPoolNrinGSheet
var TourniaPoolswithTeams
var GooglePoolsArray
var nrofTourniaPoolsArray
var GoogleCustomOrderArray
var tourniaPoolinGSheet
var GSheetEmbedScript
var iFrame
var ifGSheet
var ifUpcoming
var ifCurrent
var ifPostponed

function my_errorHandling(error) {
	if_error = true
	alert(error)
}
function toggleCurrentMatchesTable(_checked){
	if (_checked === true){
		current = true
		document.getElementById("playingTimeColumn").disabled = false
		document.getElementById("playingTimeColumn").checked = true
		document.getElementById("predictedTimeColumn").disabled = false
		document.getElementById("predictedTimeColumn").checked = true
		document.getElementById("currentTime").value = 10
		document.getElementById("currentTime").disabled = false

	} else {
		current = false
		document.getElementById("playingTimeColumn").disabled = true
		document.getElementById("playingTimeColumn").checked = false
		document.getElementById("predictedTimeColumn").disabled = true
		document.getElementById("predictedTimeColumn").checked = false
		document.getElementById("currentTime").value = 0
		document.getElementById("currentTime").disabled = true
	}
}

function toggleUpcomingMatchesTable(_checked){
	if (_checked === true){
		upcoming = true
		//document.getElementById("if_PagingTable").disabled = false
		//document.getElementById("if_PagingTable").checked = true
		document.getElementById("umStatusColumn").disabled = false
		document.getElementById("umStatusColumn").checked = true
		document.getElementById("ExpectedTimeBo").disabled = false
		document.getElementById("ExpectedTimeBo").checked = true
		/*if(document.getElementById("ifCurrentMatches").checked === true){
			document.getElementById("ifChangeTabs").disabled = false
			document.getElementById("ifChangeTabs").checked = true*/
		document.getElementById("upcomingTime").value = 10
		document.getElementById("upcomingTime").disabled = false
	} else {
		upcoming = false
		//document.getElementById("if_PagingTable").disabled = true
		//document.getElementById("if_PagingTable").checked = false
		document.getElementById("umStatusColumn").disabled = true
		document.getElementById("umStatusColumn").checked = false
		document.getElementById("ExpectedTimeBo").disabled = true
		document.getElementById("ExpectedTimeBo").checked = false
		document.getElementById("upcomingTime").value = 0
		document.getElementById("upcomingTime").disabled = true
		/*document.getElementById("upcomingTime").value = ""
		document.getElementById("upcomingTime").disabled = true
		document.getElementById("currentTime").value = ""
		document.getElementById("currentTime").disabled = true
		document.getElementById("ifChangeTabs").disabled = true
		document.getElementById("ifChangeTabs").checked = false*/
	}
}

function togglePostponedMatchesTable(_checked){
	if (_checked === true){
		upcoming = true
		//document.getElementById("if_PagingTable").disabled = false
		//document.getElementById("if_PagingTable").checked = true
		/*if(document.getElementById("ifCurrentMatches").checked === true){
			document.getElementById("ifChangeTabs").disabled = false
			document.getElementById("ifChangeTabs").checked = true*/
		document.getElementById("postponedTime").value = 10
		document.getElementById("postponedTime").disabled = false
	} else {
		upcoming = false
		//document.getElementById("if_PagingTable").disabled = true
		//document.getElementById("if_PagingTable").checked = false
		document.getElementById("postponedTime").value = 0
		document.getElementById("postponedTime").disabled = true
		/*document.getElementById("upcomingTime").value = ""
		document.getElementById("upcomingTime").disabled = true
		document.getElementById("currentTime").value = ""
		document.getElementById("currentTime").disabled = true
		document.getElementById("ifChangeTabs").disabled = true
		document.getElementById("ifChangeTabs").checked = false*/
	}
}

function togglePoolsOverviewTable(_checked){
	if (_checked === true){
		document.getElementById("ifGoogleSheetData").disabled = false
		document.getElementById("myGSheetUrl").disabled = false
		document.getElementById("predictedTimeColumn").checked = true
		document.getElementById("showTotTeamsCb").disabled = false
		document.getElementById("showTotTeamsCb").checked = true
		document.getElementById("showRoundsNeededCb").disabled = false
		document.getElementById("showRoundsNeededCb").checked = true
		document.getElementById("showRoundsCreatedCb").disabled = false
		document.getElementById("showRoundsCreatedCb").checked = true
		document.getElementById("showRoundsLeftCb").disabled = false
		document.getElementById("showRoundsLeftCb").checked = true
		document.getElementById("showStatusCb").disabled = false
		document.getElementById("showStatusCb").checked = true
		document.getElementById("showByeDataCb").disabled = false
		document.getElementById("showByeDataCb").checked = true

	} else {
		document.getElementById("ifGoogleSheetData").disabled = true
		document.getElementById("ifGoogleSheetData").checked = false
		document.getElementById("myGSheetUrl").disabled = true
		document.getElementById("myGSheetUrl").value = ""
		document.getElementById("loadDataButton").disabled = true
		document.getElementById("dataCheckmark").style.display = "none"
		document.getElementById("dataCross").style.display = "none"
		$("#GSPreviewText").empty()
		$("#GSPreviewTable").empty()
		$("#editGSheet").empty()
		document.getElementById("myCustomSortingBo").checked = false
		document.getElementById("customOrderCheckmark").style.display = "none"
		document.getElementById("showTotTeamsCb").disabled = true
		document.getElementById("showTotTeamsCb").checked = false
		document.getElementById("showRoundsNeededCb").disabled = true
		document.getElementById("showRoundsNeededCb").checked = false
		document.getElementById("showRoundsCreatedCb").disabled = true
		document.getElementById("showRoundsCreatedCb").checked = false
		document.getElementById("showRoundsLeftCb").disabled = true
		document.getElementById("showRoundsLeftCb").checked = false
		document.getElementById("showStatusCb").disabled = true
		document.getElementById("showStatusCb").checked = false
		document.getElementById("showByeDataCb").disabled = true
		document.getElementById("showByeDataCb").checked = false
	}

}

function toggleOrganizerView(_checked){
	//log("am I toggling?")
	if(_checked === true){ //organizer view
		document.getElementById("if_PagingTable").disabled = true
		document.getElementById("if_PagingTable").checked = false
		document.getElementById("ifChangeTabs").disabled = true
		document.getElementById("ifChangeTabs").checked = false
		//if(document.getElementById("ifUpcomingMatches").checked === true){
			document.getElementById("upcomingTime").value = ""
			document.getElementById("upcomingTime").disabled = true
		//}
		//if(document.getElementById("ifCurrentMatches").checked === true){
			document.getElementById("currentTime").value = ""
			document.getElementById("currentTime").disabled = true
		//}
		//if(document.getElementById("ifPostponedMatches").checked === true){
			document.getElementById("postponedTime").value = ""
			document.getElementById("postponedTime").disabled = true
		//}
		document.getElementById("minPageTime").value = ""
		document.getElementById("minPageTime").disabled = true
		
	}
}

function toggleViewerView(_checked){
	if(_checked === true){
		document.getElementById("if_PagingTable").disabled = true
		document.getElementById("if_PagingTable").checked = true
		document.getElementById("ifChangeTabs").disabled = true
		document.getElementById("ifChangeTabs").checked = true
		if(document.getElementById("ifUpcomingMatches").checked === true){
			document.getElementById("upcomingTime").value = 10
			document.getElementById("upcomingTime").disabled = false
		} else {
			document.getElementById("upcomingTime").value = 0
		}
		if(document.getElementById("ifCurrentMatches").checked === true){
			document.getElementById("currentTime").value = 10
			document.getElementById("currentTime").disabled = false
		} else {
			document.getElementById("currentTime").value = 0
		}
		if(document.getElementById("ifPostponedMatches").checked === true){	
			document.getElementById("postponedTime").value = 10
			document.getElementById("postponedTime").disabled = false
		} else {
			document.getElementById("postponedTime").value = 0
		}
		document.getElementById("minPageTime").value = 5
		document.getElementById("minPageTime").disabled = false
	}
}

function toggleReloadTables(_checked){
	
	if(_checked === true){
		document.getElementById("myReloadTimeInput").disabled = false
		document.getElementById("ifReloadTablesBo").checked = true
	} else {
		document.getElementById("myReloadTimeInput").disabled = true
		document.getElementById("ifReloadTablesBo").checked = false
	}
	
	if(document.getElementById("myReloadTimeInput").disabled === true){
		document.getElementById("myReloadTimeInput").value = ""
	}
	if(document.getElementById("myReloadTimeInput").disabled === false){
		document.getElementById("myReloadTimeInput").value = 30
	}
}
function toggleChangeTabs(_checked){
	/*if(document.getElementById("ifChangeTabs").checked === false){
		document.getElementById("upcomingTime").disabled = true;
		document.getElementById("upcomingTime").value = "";
		document.getElementById("currentTime").disabled = true;
		document.getElementById("currentTime").value = "" ;
	}
	if(document.getElementById("ifChangeTabs").checked === true){
		document.getElementById("upcomingTime").disabled = false;
		document.getElementById("upcomingTime").value = 45;
		document.getElementById("currentTime").disabled = false;
		document.getElementById("currentTime").value = 15;
	}*/
}

function toggleGoogleSheet(_checked){
	document.getElementById("myGSheetUrl").disabled = _checked ? false : true;
	document.getElementById("loadDataButton").disabled = _checked ? false : true		
			
	if(document.getElementById("ifGoogleSheetData").checked === true){
		ifGSheet = true;
		document.getElementById("myGSheetUrl").value = ""
		document.getElementById("myGSheetUrl").value = localStorage.getItem("ls_my_GoogleSheetUrl")
		document.getElementById("createPageButton").disabled = true
	} else {
		ifGSheet = false;
		$("#GSPreviewText").empty()
		$("#GSPreviewTable").empty()
		$("#editGSheet").empty()
		document.getElementById("myGSheetUrl").disabled = _checked ? false : true;
		document.getElementById("myGSheetUrl").value = ""
		document.getElementById("createPageButton").disabled = false
		document.getElementById("dataCheckmark").style.display = "none"
		document.getElementById("myCustomSortingBo").disabled = true
		document.getElementById("myCustomSortingBo").checked = false
		document.getElementById("dataCheckmark").style.display = "none"
		document.getElementById("customOrderCheckmark").style.display = "none"
		document.getElementById("dataCross").style.display = "none"
		document.getElementById("customOrderCross").style.display = "none"
	}
	
	
}

function toggleCustomSorting(){
	if(document.getElementById("myCustomSortingBo").checked === true){
		for(var co=0; co <TourniaPoolswithTeams.length; co++){
			var my_poolNr = co+1;										nrofTourniaPoolsArray.push(my_poolNr)
			var tourniaPoolinGSheet = inArray(TourniaPoolswithTeams[co].name, GooglePoolsArray)
			tourniaPoolNrinGSheet = inArray(my_poolNr, GoogleCustomOrderArray)
			if(tourniaPoolNrinGSheet === false){
				customOrderError = true;
				my_error = "Order number '" + my_poolNr + "' is missing in the Google Sheet. Please insert it and load the data again."
				
				document.getElementById("customOrderCross").style.display = ""
				document.getElementById("myCustomSortingBo").checked = false
				document.getElementById("dataCheckmark").style.display = "none"
				document.getElementById("dataCross").style.display = ""
				my_editBox.appendChild(my_editUrlClick)
				document.getElementById("customOrderCheckmark").style.display = "none"
				document.getElementById("createPageButton").disabled = true
				if_error = true
				my_errorHandling(my_error)
				break
			} else {
				document.getElementById("customOrderCross").style.display = "none"
				document.getElementById("customOrderCheckmark").style.display = ""
			}
		}		
		
	}
	if(document.getElementById("myCustomSortingBo").checked === false){
		document.getElementById("customOrderCheckmark").style.display = "none"
	}
}

/*<iframe src="https://docs.google.com/spreadsheets/d/1ibxYoiVVJ7YrvUeYxmx7hIyZozWRaxAQ6ptbuhnsTDY/pubhtml?gid=296657286&amp;single=true&amp;widget=true&amp;headers=false"></iframe>*/
function placeVarsInput(){
	log("placing vars input...")
	//storage value variabble names
	ls1N = "ls_my_tournamentId"
	ls2N = "ls_my_ifCurrentTable"
	ls3N = "ls_my_ifUpcomingTable"
	ls4N = "ls_my_ifPostponedTable"
	ls5N = "ls_my_ifPoolsTable"
	ls6N = "ls_my_ifReloadTables"
	ls7N = "ls_my_reloadTime"
	ls8N = "ls_my_ifChangeTabs"
	ls9N = "ls_my_minPageTime"
	ls10N = "ls_my_upcomingTime"
	ls11N = "ls_my_currentTime"
	ls12N = "ls_my_postponedTime"
	ls13N = "ls_my_ifGoogleSheet"
	ls14N = "ls_my_GoogleSheetUrl"
	ls15N = "ls_my_ifCustomSorting"
	ls16N = "ls_my_showStatusPlayersColumn"
	ls17N = "ls_my_showExpectedTimeColumn"
	ls18N = "ls_my_showPlayingTimeColumn"
	ls19N = "ls_my_showPredictedTimeColumn"
	ls20N = "ls_my_showTotTeamsColumn"
	ls21N = "ls_my_showRoundsNeededColumn"
	ls22N = "ls_my_showRoundsCreatedColumn"
	ls23N = "ls_my_showRoundsLeftColumn"
	ls24N = "ls_my_showStatusColumn"
	ls25N = "ls_my_showByeDataColumn"
	ls26N = "ls_my_ifPagingTable"
	ls27N = "ls_my_ifOrganizerViewPreset"
	
	// Storage values
	ls1 = localStorage.getItem(ls1N)				//tournament id
	ls2 = (localStorage.getItem(ls2N) === 'true') //ifCurrentTable
	ls3 = (localStorage.getItem(ls3N) === 'true') //ifUpcomingTable
	ls4 = (localStorage.getItem(ls4N) === 'true') //ifPostponedTable
	ls5 = (localStorage.getItem(ls5N) === 'true') //ifPoolsTable
	ls6 = (localStorage.getItem(ls6N) === 'true') //ifReloadTables
	ls7 = Number(localStorage.getItem(ls7N))		//reloadTablesTime
	ls8 = (localStorage.getItem(ls8N) === 'true') //ifChangeTabs
	ls9 = Number(localStorage.getItem(ls9N))		//minPageTime
	ls10 = Number(localStorage.getItem(ls10N))		//upcomingTime
	ls11 = Number(localStorage.getItem(ls11N))		//currentTime
	ls12 = Number(localStorage.getItem(ls12N))
	ls13 = (localStorage.getItem(ls13N) === 'true')	//ifGoogleSheet
	ls14 = localStorage.getItem(ls14N)				//google sheet url
	ls15 = (localStorage.getItem(ls15N) === 'true')
	ls16 = (localStorage.getItem(ls16N) === 'true')
	ls17 = (localStorage.getItem(ls17N) === 'true')
	ls18 = (localStorage.getItem(ls18N) === 'true')
	ls19 = (localStorage.getItem(ls19N) === 'true')
	ls20 = (localStorage.getItem(ls20N) === 'true')
	ls21 = (localStorage.getItem(ls21N) === 'true')
	ls22 = (localStorage.getItem(ls22N) === 'true')
	ls23 = (localStorage.getItem(ls23N) === 'true')
	ls24 = (localStorage.getItem(ls24N) === 'true')
	ls25 = (localStorage.getItem(ls25N) === 'true')
	ls26 = (localStorage.getItem(ls26N) === 'true')
	ls27 = (localStorage.getItem(ls27N) === 'true')

	//log(localStorage.getItem(ls2N))
	var ifEmptyTournament = false
	var tournamentIdFromUrl = false
	function lsCheck(lsVarN, lsVarV, defaultvaluesObj){
		var varName = lsVarN.split("_")[2]
		//log("VarName:",  varName, lsVarV)
		
		if(varName === "tournamentId" && (lsVarV === null || lsVarV === undefined || lsVarV === "undefined")){
			var tournamantIDInUrl = window.location.href.split("?").pop()
			log(tournamantIDInUrl)
			if(tournamantIDInUrl === "http://www.tourniadashboard.nl/" || tournamantIDInUrl === "undefined" || tournamantIDInUrl === null || tournamantIDInUrl === "http://www.tourniadashboard.nl/test/" || tournamantIDInUrl === "http://www.tourniadashboard.nl/test/tournament.php" || tournamantIDInUrl === "http://www.tourniadashboard.nl/tournament.php" || tournamantIDInUrl === "http://tourniadashboard.nl/" || tournamantIDInUrl === "http://tourniadashboard.nl/test/" || tournamantIDInUrl === "http://tourniadashboard.nl/tournament.php" || tournamantIDInUrl === "http://tourniadashboard.nl/test/tournament.php"){
				tournamantIDInUrl = ""
			}
			log(tournamantIDInUrl)
			if(tournamantIDInUrl === "" || tournamantIDInUrl === null || tournamantIDInUrl === undefined || tournamantIDInUrl === "undefined"){
				log("tournament id return empty")
				tournamentIdFromUrl = false
				ifEmptyTournament = true
				//alert("No tournament ID is provided.")	
				return ""
			} else { 
			log("get tournament id from URL")
				tournamentIdFromUrl = true
				return tournamantIDInUrl	
			}
		} else if (lsVarV === null || lsVarV === undefined || ifEmptyTournament === true){
			log("null storage value for:", varName, "returning:", defaultvaluesObj[varName])
			return defaultvaluesObj[varName] 
		} else {
			if(tournamentIdFromUrl === true){
				log("default storage value with tid in URL")
				ifEmptyTournament = false
				return defaultvaluesObj[varName] 
			} else {
				//log("storage value for", varName+":", lsVarV)
				ifEmptyTournament = false
				return lsVarV
			}
		}
		 
	}
	
	//apply storage values
	if(tournamentChange === true){
		log("change in tournament id")
		if(urlData[0] != ""){
			document.getElementById("myTournamentId").value = urlData[0]
			var my_tournamentInfoUrl = _tourniaApiUrl + urlData[0] + "/tournament"
				log(my_tournamentInfoUrl)
				if(sampleData === false){
					$.getJSON(my_tournamentInfoUrl, function(info) {
						var my_tournamentInfo = info
						})
						.success(function(){
							//log("tournament exists!")
							applyStorageValues(true)
						})
						.error(function(){
							//log("tournament DOES NOT exist!")
							/*my_error = "1. No correct tournament id is provided. Please try again."
							stopLoaders()
							if_error = true
							my_errorHandling(my_error)*/
							//return false
						})
					} else {
						var nope_error = true
						if(nope_error === true){
							//log("tournament exists!")
							applyStorageValues(true)
						} else {
							//log("tournament DOES NOT exist!")
							my_error = "2. No correct tournament id is provided. Please try again."
							stopLoaders()
							if_error = true
							my_errorHandling(my_error)
							//return false
						}
					}
		} else {
			document.getElementById("myTournamentId").value = lsCheck(ls1N, ls1, my_defaultVarsObject)		
			applyStorageValues(true)
		}
	} else { // no tournament change
		//log("No tournamnt id change")
		applyStorageValues(true)
	}
	
	function applyStorageValues(tournamentExists){
		log("apply storage values...")
		if(tournamentExists === true){
			document.getElementById("myTournamentId").value = lsCheck(ls1N, ls1, my_defaultVarsObject)
			document.getElementById("ifCurrentMatches").checked = lsCheck(ls2N, ls2, my_defaultVarsObject)
			document.getElementById("ifUpcomingMatches").checked = lsCheck(ls3N, ls3, my_defaultVarsObject)
			document.getElementById("ifPostponedMatches").checked = lsCheck(ls4N, ls4, my_defaultVarsObject)
			document.getElementById("ifPoolsOverview").checked = lsCheck(ls5N, ls5, my_defaultVarsObject)
			document.getElementById("ifReloadTablesBo").checked  = lsCheck(ls6N, ls6, my_defaultVarsObject)
			document.getElementById("myReloadTimeInput").value = lsCheck(ls7N, ls7, my_defaultVarsObject) 
			document.getElementById("ifChangeTabs").checked = lsCheck(ls8N, ls8, my_defaultVarsObject)
			document.getElementById("minPageTime").value = lsCheck(ls9N, ls9, my_defaultVarsObject)
			document.getElementById("upcomingTime").value = lsCheck(ls10N, ls10, my_defaultVarsObject)
			document.getElementById("currentTime").value = lsCheck(ls11N, ls11, my_defaultVarsObject)
			document.getElementById("postponedTime").value = lsCheck(ls12N, ls12, my_defaultVarsObject)
			document.getElementById("ifGoogleSheetData").checked = lsCheck(ls13N, ls13, my_defaultVarsObject)
			document.getElementById("myGSheetUrl").value = lsCheck(ls14N, ls14, my_defaultVarsObject)
			document.getElementById("myCustomSortingBo").checked = lsCheck(ls15N, ls15, my_defaultVarsObject)
			document.getElementById("umStatusColumn").checked = lsCheck(ls16N, ls16, my_defaultVarsObject)
			document.getElementById("ExpectedTimeBo").checked = lsCheck(ls17N, ls17, my_defaultVarsObject)
			document.getElementById("playingTimeColumn").checked = lsCheck(ls18N, ls18, my_defaultVarsObject)
			document.getElementById("predictedTimeColumn").checked = lsCheck(ls19N, ls19, my_defaultVarsObject)
			document.getElementById("showTotTeamsCb").checked = lsCheck(ls20N, ls20, my_defaultVarsObject)
			document.getElementById("showRoundsNeededCb").checked = lsCheck(ls21N, ls21, my_defaultVarsObject)
			document.getElementById("showRoundsCreatedCb").checked = lsCheck(ls22N, ls22, my_defaultVarsObject)
			document.getElementById("showRoundsLeftCb").checked = lsCheck(ls23N, ls23, my_defaultVarsObject)
			document.getElementById("showStatusCb").checked = lsCheck(ls24N, ls24, my_defaultVarsObject)
			document.getElementById("showByeDataCb").checked = lsCheck(ls25N, ls25, my_defaultVarsObject)
			document.getElementById("if_PagingTable").checked = lsCheck(ls26N, ls26, my_defaultVarsObject)
			document.getElementById("organizerPreset").checked = lsCheck(ls27N, ls27, my_defaultVarsObject)

			//apply disabled storage
			
			document.getElementById("myReloadTimeInput").disabled = (lsCheck(ls6N, ls6, my_defaultVarsObject) === false)
			
			document.getElementById("minPageTime").disabled = lsCheck(ls27N, ls27, my_defaultVarsObject)
			document.getElementById("upcomingTime").disabled = (lsCheck(ls27N, ls27, my_defaultVarsObject) === true || lsCheck(ls10N, ls10, my_defaultVarsObject) === false)
			document.getElementById("currentTime").disabled = (lsCheck(ls27N, ls27, my_defaultVarsObject) === true || lsCheck(ls11N, ls11, my_defaultVarsObject) === false)
			document.getElementById("postponedTime").disabled = (lsCheck(ls27N, ls27, my_defaultVarsObject) === true || lsCheck(ls12N, ls12, my_defaultVarsObject) === false)
				
			document.getElementById("ifGoogleSheetData").disabled = (lsCheck(ls5N, ls5, my_defaultVarsObject) === false) 
			document.getElementById("myGSheetUrl").disabled = (lsCheck(ls13N, ls13, my_defaultVarsObject) === false)
			document.getElementById("myCustomSortingBo").disabled =  true
			
			document.getElementById("umStatusColumn").disabled = (lsCheck(ls2N, ls2, my_defaultVarsObject) === false)
			document.getElementById("ExpectedTimeBo").disabled = (lsCheck(ls2N, ls2, my_defaultVarsObject) === false)
			
			document.getElementById("playingTimeColumn").disabled = (lsCheck(ls3N, ls3, my_defaultVarsObject) === false)
			document.getElementById("predictedTimeColumn").disabled = (lsCheck(ls3N, ls3, my_defaultVarsObject) === false)
			
			document.getElementById("showTotTeamsCb").disabled = (lsCheck(ls5N, ls5, my_defaultVarsObject) === false)
			document.getElementById("showRoundsNeededCb").disabled = (lsCheck(ls5N, ls5, my_defaultVarsObject) === false)
			document.getElementById("showRoundsCreatedCb").disabled = (lsCheck(ls5N, ls5, my_defaultVarsObject) === false)
			document.getElementById("showRoundsLeftCb").disabled = (lsCheck(ls5N, ls5, my_defaultVarsObject) === false)
			document.getElementById("showStatusCb").disabled = (lsCheck(ls5N, ls5, my_defaultVarsObject) === false)
			document.getElementById("showByeDataCb").disabled = (lsCheck(ls5N, ls5, my_defaultVarsObject) === false)
		} else {
			alert("tournament if error")
		}
	}
	
	if(expectedTimesFunctionality === false){
			my_showExpectedTimeColumn = false
			showExpectedTimeColumn = false
			document.getElementById("ExpectedTimeBo").checked = false
			document.getElementById("expectedTimesOption").style.display = "none"
	}
	if(predictedTimesFunctionality === false){
		my_showPredictedTimeColumn = false
		showPredictedTimeColumn = false
		document.getElementById("predictedTimeColumn").checked = false
		document.getElementById("predictedTimesOption").style.display = "none"
		document.getElementById("CM_notes").style.display = "none";
	}
	if (sampleData === true) {
		document.getElementById("ifReloadTablesBo").checked = false;
		toggleReloadTables(this.checked);
	}
	if(slowLoading === false){
		my_showRoundsNeededColumn = false
		my_showRoundsCreatedColumn = false
		my_showRoundsLeftColumn = false
		
		my_settingsVarsObject.showRoundsNeededColumn = false
		my_settingsVarsObject.showRoundsCreatedColumn = false
		my_settingsVarsObject.showRoundsLeftColumn = false
				
		document.getElementById("showRoundsNeededCb").checked = false
		document.getElementById("showRoundsCreatedCb").checked = false
		document.getElementById("showRoundsLeftCb").checked = false
		
		document.getElementById("slowLoadersFunctionalities").style.display = "none"
	}
}

function getVars(){
	log("getting values...")
	my_urlSetupVariables = true;
	my_settingsVarsArray = []
	//get values
	my_tournamentId = document.getElementById("myTournamentId").value	
	my_ifCurrentTable = document.getElementById("ifCurrentMatches").checked
	my_ifUpcomingTable = document.getElementById("ifUpcomingMatches").checked
	my_ifPostponedTable = document.getElementById("ifPostponedMatches").checked
	my_ifPoolsTable = document.getElementById("ifPoolsOverview").checked
	my_ifReloadTables = document.getElementById("ifReloadTablesBo").checked 
	if(document.getElementById("myReloadTimeInput").value === ""){
		my_reloadTime = ""
	} else {
		my_reloadTime = Number(document.getElementById("myReloadTimeInput").value)
	}
	my_ifChangeTabs = document.getElementById("ifChangeTabs").checked
	if(document.getElementById("minPageTime").value === ""){
		my_minPageTime = ""
	} else {
		my_minPageTime = Number(document.getElementById("minPageTime").value)
	}
	if(document.getElementById("upcomingTime").value === ""){
		my_upcomingTime = ""
	} else {
		my_upcomingTime = Number(document.getElementById("upcomingTime").value)
	}
	if(document.getElementById("currentTime").value === ""){
		my_currentTime = ""
	} else {
		my_currentTime = Number(document.getElementById("currentTime").value)
	}
	if(document.getElementById("postponedTime").value === ""){
		my_postponedTime = ""
	} else {
		my_postponedTime = Number(document.getElementById("postponedTime").value)
	}

	my_ifGoogleSheetLoad = document.getElementById("ifGoogleSheetData").checked
	my_GoogleSheetUrl = document.getElementById("myGSheetUrl").value
	my_ifCustomSorting = document.getElementById("myCustomSortingBo").checked
	my_showStatusPlayersColumn = document.getElementById("umStatusColumn").checked
	my_showExpectedTimeColumn = document.getElementById("ExpectedTimeBo").checked
	my_showPlayingTimeColumn = document.getElementById("playingTimeColumn").checked
	my_showPredictedTimeColumn = document.getElementById("predictedTimeColumn").checked
	my_showTotTeamsColumn = document.getElementById("showTotTeamsCb").checked
	my_showRoundsNeededColumn = document.getElementById("showRoundsNeededCb").checked
	my_showRoundsCreatedColumn = document.getElementById("showRoundsCreatedCb").checked
	my_showRoundsLeftColumn = document.getElementById("showRoundsLeftCb").checked
	my_showStatusColumn = document.getElementById("showStatusCb").checked
	my_showByeDataColumn = document.getElementById("showByeDataCb").checked
	my_ifPagingTable = document.getElementById("if_PagingTable").checked
	my_IfOrganizerViewPreset = document.getElementById("organizerPreset").checked
	
	if(expectedTimesFunctionality === false){
		my_showExpectedTimeColumn = false
		showExpectedTimeColumn = false
		document.getElementById("ExpectedTimeBo").checked = false
		document.getElementById("expectedTimesOption").style.display = "none"
	}
	if(predictedTimesFunctionality === false){
		my_showPredictedTimeColumn = false
		showPredictedTimeColumn = false
		document.getElementById("predictedTimeColumn").checked = false
		document.getElementById("predictedTimesOption").style.display = "none";
		document.getElementById("CM_notes").style.display = "none";
	}
	if (sampleData === true) {
		document.getElementById("ifReloadTablesBo").checked = false;
		toggleReloadTables(this.checked);
	}
	
	//vars array push order for url
	if(my_GoogleSheetUrl === null || my_GoogleSheetUrl === undefined || my_GoogleSheetUrl === ""){
		log(my_tournamentId)
		my_settingsVarsArray.push(my_tournamentId)
	} else {
		my_settingsVarsArray.push(my_tournamentId, my_GoogleSheetUrl)
	}
	
	//my_settingsVarsArray.push(my_tournamentId, my_GoogleSheetUrl)//, my_urlSetupVariables, my_ifCurrentTable, my_ifUpcomingTable, my_ifPostponedTable, my_ifPoolsTable, my_ifReloadTables, my_reloadTime, my_ifChangeTabs, my_minPageTime, my_upcomingTime, my_currentTime, my_postponedTime, my_ifGoogleSheetLoad, my_ifCustomSorting, my_showStatusPlayers, my_my_settingsVarsObject.showExpectedTimeColumn, my_showPlayingTimeColumn, my_showPredictedTimeColumn, my_showTotTeamsColumn, my_showRoundsNeededColumn, my_showRoundsCreatedColumn, my_showRoundsLeftColumn, my_showStatusColumn,my_showByeDataColumn, my_ifPagingTable, my_IfOrganizerViewPreset)
	
	//expectedTimes Controller
	
	//push values to object
	my_settingsVarsObject.settingsVariables = my_urlSetupVariables;
	my_settingsVarsObject.tournamentID = my_tournamentId;
	my_settingsVarsObject.ifCurrentTable = my_ifCurrentTable
	my_settingsVarsObject.ifUpcomingTable = my_ifUpcomingTable
	my_settingsVarsObject.ifPostponedTable = my_ifPostponedTable
	my_settingsVarsObject.ifPoolsTable = my_ifPoolsTable
	my_settingsVarsObject.ifReloadTables = my_ifReloadTables;
	my_settingsVarsObject.reloadTime = my_reloadTime;
	my_settingsVarsObject.ifChangeTabs = my_ifChangeTabs;
	my_settingsVarsObject.minPageTime = my_minPageTime
	my_settingsVarsObject.upcomingTime = my_upcomingTime;
	my_settingsVarsObject.currentTime = my_currentTime;
	my_settingsVarsObject.postponedTime = my_postponedTime;
	my_settingsVarsObject.ifGoogleSheet = my_ifGoogleSheetLoad;
	my_settingsVarsObject.GoogleSheetUrl = my_GoogleSheetUrl;
	my_settingsVarsObject.ifCustomSorting = my_ifCustomSorting;
	my_settingsVarsObject.showStatusPlayersColumn = my_showStatusPlayersColumn;
	my_settingsVarsObject.showExpectedTimeColumn = my_showExpectedTimeColumn;
	my_settingsVarsObject.showPlayingTimeColumn = my_showPlayingTimeColumn;
	my_settingsVarsObject.showPredictedTimeColumn = my_showPredictedTimeColumn;
	my_settingsVarsObject.showTotTeamsColumn = my_showTotTeamsColumn;
	my_settingsVarsObject.showRoundsNeededColumn = my_showRoundsNeededColumn;
	my_settingsVarsObject.showRoundsCreatedColumn = my_showRoundsCreatedColumn;
	my_settingsVarsObject.showRoundsLeftColumn = my_showRoundsLeftColumn;
	my_settingsVarsObject.showStatusColumn = my_showStatusColumn;
	my_settingsVarsObject.showByeDataColumn = my_showByeDataColumn;
	my_settingsVarsObject.ifPagingTable = my_ifPagingTable;
	my_settingsVarsObject.ifOrganizerViewPreset = my_IfOrganizerViewPreset
}

function checkVariables(){	
	log("checking vars...")
	my_settingsVarsArray = []
	//my_settingsVarsObject = {}
	document.getElementById("createPageLoader").style.display = ""
	document.getElementById("GDataLoader").style.display = ""
	getVars()
	
	var tournament_url = _tourniaUrl + my_tournamentId
	var _tournamentInfoUrl = _tourniaApiUrl + my_tournamentId + "/tournament"
	var poolsUrl = _tourniaApiUrl + my_tournamentId + "/pools"
	log("set tournament id:", my_tournamentId, "localstorage:", localStorage.getItem("ls_my_tournamentId"))
	if(my_tournamentId === ""){
		my_error = "No Tournament id is provided."
		if_error = true;
		my_errorHandling(my_error)	
	} else if(my_tournamentId != localStorage.getItem("ls_my_tournamentId")){
		log("new tournament id from setup window")
		loadFromUrl = true
		loadFromSetupWindow = true
		var loadNewTournament = true
		var loadNewGSheet = true
	} else { //no Tournament ID change
		log("no tournament id change from setup window")
		loadFromUrl = false
		loadFromSetupWindow = true
		var loadNewTournament = false
		if(my_GoogleSheetUrl != localStorage.getItem("ls_my_GoogleSheetUrl")){
			var loadNewGSheet = true
		} else {
			var loadNewGSheet = false
		}
	}
	
	if(my_tournamentId != ""){
		if(loadNewTournament === true){
			if(sampleData === false){
				$.getJSON(_tournamentInfoUrl, function(info) {
							my_tournamntInfo = info
						})
						.success(function() {	
							getTournamentData(poolsUrl, my_ifGoogleSheetLoad, my_GoogleSheetUrl, my_settingsVarsArray, my_settingsVarsObject, function() {
								checkGoogleSheet();
							})
						})
						.error(function() {
								my_error = "No correct tournament ID is provided. Please try again."+"\nIf this tournament ID does exists, make sure the 'live' function is turned on within the Tournia tournament settings." 
								stopLoaders()
								if_error = true
								my_errorHandling(my_error)
						})
			} else {
				var nope_error = false
				if(nope_error === true){
					my_TournamentInfo = tournamentInfo_LOCAL
					getTournamentData(poolsUrl, my_ifGoogleSheetLoad, my_GoogleSheetUrl, my_settingsVarsArray, my_settingsVarsObject, function() {
						checkGoogleSheet();
					})
				} else {
					my_error = "No correct tournament ID is provided. Please try again."+"\nIf this tournament ID does exists, make sure the 'live' function is turned on within the Tournia tournament settings." 
					stopLoaders()
					if_error = true
					my_errorHandling(my_error)
				}
			}
		} else {
			if(loadNewGSheet = true){ //new GSheet
				if(my_ifGoogleSheetLoad === false){
					if_error = false
					document.getElementById("createPageLoader").style.display = "none"
					document.getElementById("GDataLoader").style.display = "none"
					sendingData(my_settingsVarsArray, my_settingsVarsObject)
				} else if(my_ifGoogleSheetLoad === true && my_GoogleSheetUrl === ""){
					my_error = "No Google Sheet URL is provided."
					if_error = true
					my_errorHandling(my_error)
					document.getElementById("GDataLoader").style.display = "none"
				} else {
					loadGData(my_GoogleSheetUrl);
					document.getElementById("GDataLoader").style.display = "none"
					document.getElementById("dataCheckmark").style.display = ""
					sendingData(my_settingsVarsArray, my_settingsVarsObject)
				}
			} else { // no new GSheet
				if(my_ifGoogleSheetLoad === false){
					if_error = false
					document.getElementById("createPageLoader").style.display = "none"
					document.getElementById("GDataLoader").style.display = "none"
					sendingData(my_settingsVarsArray, my_settingsVarsObject)
				} else if(my_ifGoogleSheetLoad === true && my_GoogleSheetUrl === ""){
					my_error = "No Google Sheet URL is provided."
					if_error = true
					my_errorHandling(my_error)
					document.getElementById("GDataLoader").style.display = "none"
				} else {
					document.getElementById("GDataLoader").style.display = "none"
					document.getElementById("dataCheckmark").style.display = ""
					sendingData(my_settingsVarsArray, my_settingsVarsObject)
				}
			}
		}
	}
	
	function getTournamentData(poolsUrl, my_ifGoogleSheetLoad, GoogleSheetUrl, my_settingsVarsArray, my_settingsVarsObject, getGoogleData){
		if(sampleData === false){
			$.getJSON(poolsUrl, function(data) {
						my_tourniaPools = data
					})
					.success(function() {
							//localStorage.setItem("ls_my_tournamentId", my_tournamentId);
							if(my_ifGoogleSheetLoad === false){
								if_error = false
								document.getElementById("createPageLoader").style.display = "none"
								document.getElementById("GDataLoader").style.display = "none"
								sendingData(my_settingsVarsArray, my_settingsVarsObject)
							} else if(my_ifGoogleSheetLoad === true && my_GoogleSheetUrl === ""){
								my_error = "No Google Sheet URL is provided."
								if_error = true
								my_errorHandling(my_error)
								document.getElementById("GDataLoader").style.display = "none"
							} else {
								loadGData(GoogleSheetUrl);
								document.getElementById("GDataLoader").style.display = "none"
								document.getElementById("dataCheckmark").style.display = ""
								sendingData(my_settingsVarsArray, my_settingsVarsObject)
							}
					})
					.error(function() {
							my_error = "No correct tournament ID is provided. Please try again."+"\nIf this tournament ID does exists, make sure the 'live' function is turned on within the Tournia tournament settings." 
							stopLoaders()
							if_error = true
							my_errorHandling(my_error)
					})
		} else {
			var nope_error = false
				my_tourniaPools = my_Pools_LOCAL
			if(nopoe_error === false){
					if(my_ifGoogleSheetLoad === false){
						if_error = false
						document.getElementById("createPageLoader").style.display = "none"
						document.getElementById("GDataLoader").style.display = "none"
						sendingData(my_settingsVarsArray, my_settingsVarsObject)
					} else if(my_ifGoogleSheetLoad === true && my_GoogleSheetUrl === ""){
						my_error = "No Google Sheet URL is provided."
						if_error = true
						my_errorHandling(my_error)
						document.getElementById("GDataLoader").style.display = "none"
					} else {
						loadGData(GoogleSheetUrl);
						document.getElementById("GDataLoader").style.display = "none"
						document.getElementById("dataCheckmark").style.display = ""
						sendingData(my_settingsVarsArray, my_settingsVarsObject)
					}
			} else {
				my_error = "No correct tournament ID is provided. Please try again."+"\nIf this tournament ID does exists, make sure the 'live' function is turned on within the Tournia tournament settings." 
				stopLoaders()
				if_error = true
				my_errorHandling(my_error)
			}
		}
	}
	
	function checkGoogleSheet(my_ifGoogleSheetLoad, my_GoogleSheetUrl){		
		if(ifGSheet === true && my_GoogleSheetUrl != ""){
			loadGData(my_GoogleSheetUrl)
		}
		var ifGoogleSheetHasString
		if(my_GoogleSheetUrl === null || my_GoogleSheetUrl ===""){
				ifGoogleSheetHasString = false
		} else {
			ifGoogleSheetHasString = true
		}
		if(ifGSheet === true && my_GoogleSheetUrl === ""){
			my_error = "No Google Sheet URL is provided."
			if_error = true
			my_errorHandling(my_error)
			document.getElementById("GDataLoader").style.display = "none"
			
		} else if(ifGSheet === false && ifGoogleSheetHasString === false){
			if_error = false
		}  if(ifGSheet === false && ifGoogleSheetHasString === true){
			my_GoogleSheetUrl = ""
			if_error = false
		} else {
			if_error = false
		}
	}
}
function loadGData(googleUrl){
	$("#GSPreviewText").empty()
	$("#GSPreviewTable").empty()
	$("#editGSheet").empty()
	getVars()
	
	document.getElementById("dataCheckmark").style.display = "none"
	document.getElementById("dataCross").style.display = "none"
	document.getElementById("myCustomSortingBo").checked = false
	document.getElementById("customOrderCheckmark").style.display = "none"
	document.getElementById("customOrderCross").style.display = "none"
		
	if (my_tournamentId === "" && googleUrl === ""){
		my_error = "No Tournament id is provided."
		if_error = true;
		my_errorHandling(my_error)
		document.getElementById("GDataLoader").style.display = "none"
	} else if(my_tournamentId != "" && googleUrl === ""){
		my_error = "No Google Sheet URL is provided."
		if_error = true
		my_errorHandling(my_error)
		document.getElementById("GDataLoader").style.display = "none"
	} else {
		document.getElementById("GDataLoader").style.display = "";
	}
	Tabletop.init( { key: googleUrl,
			   callback: function(data, tabletop) { 
				   my_googlePools = data
				   log(my_googlePools)
				   if_error = false
				   localStorage.setItem("ls_my_GoogleSheetUrl", googleUrl)
				   GooglePoolsArray = []
				   GoogleCustomOrderArray = []
					var tournamentIDGSheet = my_googlePools[1].TournamentConfigurations
					var ifPoolColumn = my_googlePools[0].Pool
					var ifOrderColumn = my_googlePools[0].Order
					if(my_tournamentId != tournamentIDGSheet){
							my_error = "The Tournament ID provided does not match with the tournament ID provided in the Google Sheet. Please check if the correct Google sheet URL is provided and the correct Tournament IDs are provided."
							if_error = true
							document.getElementById("GDataLoader").style.display = "none"
							document.getElementById("dataCross").style.display = ""
							my_editBox.appendChild(my_editUrlClick)
							my_errorHandling(my_error)
					}
					if(ifPoolColumn === undefined){
							my_error = "No 'Pool' column name exists in your Google Sheet."
							if_error = true
							document.getElementById("GDataLoader").style.display = "none"
							document.getElementById("dataCross").style.display = ""
							my_editBox.appendChild(my_editUrlClick)
							my_errorHandling(my_error)
						}
					for (var gp=0; gp < my_googlePools.length; gp++){
						
						var my_GpoolName = my_googlePools[gp].Pool
						GooglePoolsArray.push(my_GpoolName)
						var my_orderNr = my_googlePools[gp].Order
						GoogleCustomOrderArray.push(my_orderNr)
					}
				   //check tables
				   //getVars()
				   $.getJSON(poolsUrl, function(data) {
						my_tourniaPools = data
					   })
							.success(function() {
								//checking tables
								
								//filtering 0 teams in Tournia
								TourniaPoolswithTeams = []
								for (var tap=0; tap < my_tourniaPools.length; tap++){
									var myTotTeams = my_tourniaPools[tap].totTeams
									if (myTotTeams === 0){
									} else {
										TourniaPoolswithTeams.push(my_tourniaPools[tap])
									} 
								}
								nrofTourniaPoolsArray = []
								var TourniaPoolsWithTeamsArray = []
								var customOrderError = false
								for(var tp=0; tp < TourniaPoolswithTeams.length; tp++){
									var my_TpoolName = TourniaPoolswithTeams[tp].name
									TourniaPoolsWithTeamsArray.push(my_TpoolName)
									var my_poolNr = tp+1;
									nrofTourniaPoolsArray.push(my_poolNr)
									var tourniaPoolinGSheet = inArray(TourniaPoolswithTeams[tp].name, GooglePoolsArray)
									tourniaPoolNrinGSheet = inArray(my_poolNr, GoogleCustomOrderArray)
									if(tourniaPoolinGSheet === false){
										excelFunction = "=IMPORTXML(\"https://www.tournia.net/api/v2/" + my_tournamentId + "/pools?tournament_ID=" + my_tournamentId + "&_format=xml;\"//item/name\")"
										my_error = "Tournia has the '" + TourniaPoolswithTeams[tp].name +"' pool that the Google Sheet does not.\n\nProvided Tournament ID: "+ my_tournamentId+"\nGoogle Sheet Tournament ID: "+ tournamentIDGSheet+"\n\nMake sure to add the missing pools manually or import the pools in the Google sheet automatically. This can be done by inserting the following line of code in cell E2:\n\n" + excelFunction + "\n\nThen copy the values into cell A2 using the special paste 'paste values only' option.\n Automatically retreiving the pool names in the 'Pool' column of the Google sheet is not possible because the website will not retrieve these names when the Google sheet is closed. Copying them manually into column A2 is therefore required." 
										if_error = true
										document.getElementById("GDataLoader").style.display = "none"
										document.getElementById("dataCross").style.display = ""
										my_editBox.appendChild(my_editUrlClick)
										my_errorHandling(my_error)
									}	
								}				
								//if no errors so far and if no custom order (if wanted) errors turn on create page button and show table if no errors
								if(if_error === false){
									var noOrderNr = false;
									if(confirm("Would you like custom ordering of pools in the 'Pools Overview' table to be turned on?")){
										for (gp = 0; gp < my_googlePools.length; gp++){
													var GPinTP = inArray(my_googlePools[gp].Pool, TourniaPoolsWithTeamsArray)
													if(GPinTP === false){
														var GPaOrderNr = my_googlePools[gp].Order
														if(GPaOrderNr !=""){
															if_error = true
															OrderNrInNotPlayingPool = true
															var myUnplayingPoolwithOrderNr = my_googlePools[gp].Pool
															break
														} else {
															if_error = false
															OrderNrInNotPlayingPool = false
														}
													}
										}
										if(ifOrderColumn === undefined){
												my_error = "No 'Order' column name exists in your Google Sheet. Insert it and load the data again."
												if_error = true
												document.getElementById("GDataLoader").style.display = "none"
												document.getElementById("dataCross").style.display = ""
												document.getElementById("customOrderCross").style.display = ""
												//document.getElementById("GSPreviewText").innerHTML = "Preview";
												//document.getElementById("GSPreviewTable").appendChild(iframe);
												my_editBox.appendChild(my_editUrlClick)
												my_errorHandling(my_error)
										} else if (OrderNrInNotPlayingPool === true){
												my_error = "The Pool '" + myUnplayingPoolwithOrderNr + "' that is not playing or not existing in Tournia has a value in the 'Order' column. Please remove it and load the data again."	
												if_error = true
												document.getElementById("GDataLoader").style.display = "none"
												document.getElementById("dataCross").style.display = ""
												document.getElementById("customOrderCross").style.display = ""
												//document.getElementById("GSPreviewText").innerHTML = "Preview";
												//document.getElementById("GSPreviewTable").appendChild(iframe);
												my_errorHandling(my_error)	
										} else {
												if_error= false
												document.getElementById("GDataLoader").style.display = "none"
												//document.getElementById("GSPreviewText").innerHTML = "Preview";
												//document.getElementById("GSPreviewTable").appendChild(iframe);
												document.getElementById("myCustomSortingBo").disabled = false
												document.getElementById("dataCheckmark").style.display = ""
												my_editBox.appendChild(my_editUrlClick)
												document.getElementById("createPageButton").disabled = false
												document.getElementById("createPageLoader").style.display = "none"
												document.getElementById("myCustomSortingBo").checked = true
												localStorage.setItem("ls_my_GoogleSheetUrl", my_GoogleSheetUrl)
												toggleCustomSorting()
										}
									} else { //no custom sorting selected, turn on create page button and show preview table
										document.getElementById("GDataLoader").style.display = "none"
										//document.getElementById("GSPreviewText").innerHTML = "Preview";
										//document.getElementById("GSPreviewTable").appendChild(iframe);
										document.getElementById("myCustomSortingBo").disabled = false
										document.getElementById("dataCheckmark").style.display = ""
										my_editBox.appendChild(my_editUrlClick)
										document.getElementById("createPageButton").disabled = false
										document.getElementById("createPageLoader").style.display = "none"
										document.getElementById("myCustomSortingBo").checked = false
										localStorage.setItem("ls_my_GoogleSheetUrl", my_GoogleSheetUrl)
									}
								}
							})
							.error(function() {
									if (my_tournamentId === ""){
										my_error = "No tournament id is provided."
										if_error = true
										my_errorHandling(my_error)
									} else if (my_tournamentId != ""){
										my_error = "3. No correct tournament id is provided. Please try again."
										stopLoaders()
										if_error = true
										my_errorHandling(my_error)
									}
							})
			   },
			   simpleSheet: true,	   
	}) 
}

function sendingData(array, object){
	//array = []
	loadFromSetupWindow = true
	log("My sending array:", array)
	log("My sending object:", object)
	log("tournamentID local storage:", localStorage.getItem("ls_my_tournamentId"), "; GSHeetlcalStorage:", localStorage.getItem("ls_my_GoogleSheetUrl"))
	log("startSetupWindow:", startSetupWindow, "loadFromUrl:", loadFromUrl, "loadFromSetupWindow:", loadFromSetupWindow)
	clearInterval(reloadDataInterval)
	if(my_settingsVarsObject.ifOrganizerViewPreset != localStorage.getItem("ls_my_ifOrganizerViewPreset")){
		viewChange = true
	} else {
		viewChange = false
	}
	if(loadFromUrl === true && loadFromSetupWindow === true){ //new to0urnament ID
		log("create url and page")
		//array.push("true")
		//object.setupVariables = true
		//startingPage === false
		//checkVariables()
		setAllLocalStorage()
		placeVarsInput()
		setVars()
		applyVars()
		startSetupWindow = false
		sendData(array, object) //reload page
		document.getElementById("createPageLoader").style.display = "none"
	} else if(loadFromUrl === false && startSetupWindow === true && loadFromSetupWindow === true){ //create page from no url input	
		log("create page from no url input")
		//checkVariables()
		setAllLocalStorage()
		placeVarsInput()
		//setVars()
		//applyVars()
		startSetupWindow = false
		sendData(array, object) //reload page
		document.getElementById("createPageLoader").style.display = "none"
	} else if(loadFromUrl === false && startSetupWindow === false && loadFromSetupWindow === true){ //reload tables	
		log("no tournament ID change and just reload tables with these new settings:", my_settingsVarsObject)
		tournamentChange = false
		//checkVariables()
		setAllLocalStorage()
		placeVarsInput()
		//pageSetupTimeout = setTimeout(function(){
		setVars()
		applyVars()
		startSetupWindow = false
		if(viewChange === false){
			tableConfigurations()
			removeTables()
			$('#settingsModal').modal('hide')
			document.getElementById("createPageLoader").style.display = "none"
		} else {
			sendData(array, object) //reload page
			document.getElementById("createPageLoader").style.display = "none"
		}
		//}, 1000)
	} else {
		alert("Error occured in sendingData()")
		document.getElementById("createPageLoader").style.display = "none"
	}
	document.getElementById("createPageLoader").style.display = "none"
}

function setAllLocalStorage(){
	//localStorage.clear();
	
	localStorage.setItem("ls_my_tournamentId", my_tournamentId)
	localStorage.setItem("ls_my_ifCurrentTable", my_ifCurrentTable)
		log(localStorage.getItem("ls_my_ifCurrentTable"))
	localStorage.setItem("ls_my_ifUpcomingTable", my_ifUpcomingTable)
		log(localStorage.getItem("ls_my_ifUpcomingTable"))
	localStorage.setItem("ls_my_ifPostponedTable", my_ifPostponedTable)	
		log(localStorage.getItem("ls_my_ifPostponedTable"))
	localStorage.setItem("ls_my_ifPoolsTable", my_ifPoolsTable)	
	localStorage.setItem("ls_my_ifReloadTables", my_ifReloadTables)	
	localStorage.setItem("ls_my_reloadTime", my_reloadTime)	
	localStorage.setItem("ls_my_ifChangeTabs", my_ifChangeTabs)	
	localStorage.setItem("ls_my_minPageTime", my_minPageTime)
	localStorage.setItem("ls_my_upcomingTime", my_upcomingTime) 	
	localStorage.setItem("ls_my_currentTime", my_currentTime)	
	localStorage.setItem("ls_my_postponedTime", my_postponedTime)	
	localStorage.setItem("ls_my_ifGoogleSheet", my_ifGoogleSheetLoad)	
	localStorage.setItem("ls_my_GoogleSheetUrl", my_GoogleSheetUrl)	
	localStorage.setItem("ls_my_ifCustomSorting", my_ifCustomSorting)	
	localStorage.setItem("ls_my_showStatusPlayersColumn", my_showStatusPlayersColumn)	
	localStorage.setItem("ls_my_showExpectedTimeColumn", my_showExpectedTimeColumn)	
	localStorage.setItem("ls_my_showPlayingTimeColumn", my_showPlayingTimeColumn)	
	localStorage.setItem("ls_my_showPredictedTimeColumn", my_showPredictedTimeColumn)	
	localStorage.setItem("ls_my_showTotTeamsColumn", my_showTotTeamsColumn)	
	localStorage.setItem("ls_my_showRoundsNeededColumn", my_showRoundsNeededColumn)	
	localStorage.setItem("ls_my_showRoundsCreatedColumn", my_showRoundsCreatedColumn)	
	localStorage.setItem("ls_my_showRoundsLeftColumn", my_showRoundsLeftColumn)	
	localStorage.setItem("ls_my_showStatusColumn", my_showStatusColumn)	
	localStorage.setItem("ls_my_showByeDataColumn", my_showByeDataColumn)	
	localStorage.setItem("ls_my_ifPagingTable", my_ifPagingTable)	
	localStorage.setItem("ls_my_ifOrganizerViewPreset", my_IfOrganizerViewPreset)	
}

function getAllLocalStorage(){
	//localStorage.clear();
	
	localStorage.getItem("ls_my_tournamentId", my_tournamentId)
	localStorage.getItem("ls_my_ifCurrentTable", my_ifCurrentTable)
	localStorage.getItem("ls_my_ifUpcomingTable", my_ifUpcomingTable)
	localStorage.getItem("ls_my_ifPostponedTable", my_ifPostponedTable)	
	localStorage.getItem("ls_my_ifPoolsTable", my_ifPoolsTable)	
	localStorage.getItem("ls_my_ifReloadTables", my_ifReloadTables)	
	localStorage.getItem("ls_my_reloadTime", my_reloadTime)	
	localStorage.getItem("ls_my_ifChangeTabs", my_ifChangeTabs)	
	//log(localStorage.getItem("ls_my_minPageTime",  my_minPageTime))

	//localStorage.getItem("ls_my_minPageTime",  my_minPageTime)
	localStorage.getItem("ls_my_upcomingTime", my_upcomingTime) 	
	localStorage.getItem("ls_my_currentTime", my_currentTime)	
	localStorage.getItem("ls_my_postponedTime", my_postponedTime)	
	localStorage.getItem("ls_my_ifGoogleSheet", my_ifGoogleSheetLoad)	
	localStorage.getItem("ls_my_GoogleSheetUrl", my_GoogleSheetUrl)	
	localStorage.getItem("ls_my_ifCustomSorting", my_ifCustomSorting)	
	localStorage.getItem("ls_my_showStatusPlayersColumn", my_showStatusPlayersColumn)	
	localStorage.getItem("ls_my_showExpectedTimeColumn", my_showExpectedTimeColumn)	
	localStorage.getItem("ls_my_showPlayingTimeColumn", my_showPlayingTimeColumn)	
	localStorage.getItem("ls_my_showPredictedTimeColumn", my_showPredictedTimeColumn)	
	localStorage.getItem("ls_my_showTotTeamsColumn", my_showTotTeamsColumn)	
	localStorage.getItem("ls_my_showRoundsNeededColumn", my_showRoundsNeededColumn)	
	localStorage.getItem("ls_my_showRoundsCreatedColumn", my_showRoundsCreatedColumn)	
	localStorage.getItem("ls_my_showRoundsLeftColumn", my_showRoundsLeftColumn)	
	localStorage.getItem("ls_my_showStatusColumn", my_showStatusColumn)	
	localStorage.getItem("ls_my_showByeDataColumn", my_showByeDataColumn)	
	localStorage.getItem("ls_my_ifPagingTable", my_ifPagingTable)	
	localStorage.getItem("ls_my_ifOrganizerViewPreset", my_IfOrganizerViewPreset)	
}

function sendData(array, object){
	log("in sending data with:", array, object)
	// Initialize packed or we get the word 'undefined'
	var data = array
	var packed = "";
	for (i = 0; (i < data.length); i++) {
		if (i > 1) {
		  packed += "&";
		}
		packed += escape(data[i]);
	}
	log("packed:", packed)
	var newUrl = "tournament.php?" + packed
	window.location = newUrl
	$('#settingsModal').modal('hide')
}
