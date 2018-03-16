function initialSetup(){
	var version = "1-4-0"
	//checkBrowsers()
	var sampleData
	var DEBUG_MODE
	var sendingDataToDatabase
	
	var ifMobile = false //set to true if you want to work only in the mobile pages
	
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || ifMobile === true) {
		ifMobile = true		
	} else {
		var mobileError = false
		var cssPath = "css/style" + version + ".css";
		//var cssPath2 = "css/tables_mobileStyle.css";
	}
	var loadFromUrl = false
	var loadFromSetupWindow
	var viewChange
	var tournamentChange = true
	
	var my_settingsVarsObject = {}
	startSetupWindow = false
	var query = ""
	var query = window.location.search;
	// Skip the leading ?, which should always be there, 
	// but be careful anyway
	if (query.substring(0, 1) === '?') {
		query = query.substring(1);
	}
	var urlData = query.split('&'); 
	for (i = 0; (i < urlData.length); i++) {
		if(urlData[i] === null || urlData[i] === undefined || urlData[i] === "" ){
			//console.log("empty/no gSheet url")
			continue
		} else {
			urlData[i] = unescape(urlData[i]);
		}
	}
	if(urlData[0] === "demo" || urlData[0] === "utrecht2016"){
		sampleData = true
		sendingDataToDatabase = false
		
		var dataSetNr =  1 // 1-4
		if(typeof isNaN(dataSetNr) === true || dataSetNr < 1 || dataSetNr > 4){
			dataSetNr = 1
		}
	}
	if(urlData[0] === "isbtamsterdam" || urlData[0] === "isbt-amsterdam-2017"){
		sampleData = true
		sendingDataToDatabase = false
		
		var dataSetNr =  4 //1-9
		if(typeof isNaN(dataSetNr) === true || dataSetNr < 1 || dataSetNr > 9){
			dataSetNr = 1
		}
		/*
			1: UMBR 19 - 53 mins.
			2: UMNR 18 - 64 mins.
			3: UMNR 17 - 46 mins.
			4:UMNR
			5:
			6: UMNR 7 - 31 mins., UMNR 10 - 12 mins
		
			*/
		
	}
	if(ifMobile === true){
		window.location = "tournament_mobile.php?"+urlData[0]+"#upcomingMatches"
	}
}



function mobileSetup{
	var version = "1-4-0"
	var ifMobile = true
	var mobileError = false
	var DEBUG_MODE = true

	var loadFromUrl = true
	var loadFromSetupWindow = false
	var viewChange = false
	var tournamentChange = false

	var my_settingsVarsObject = {}
	startSetupWindow = false
	var query = ""
	var query = window.location.search;
	// Skip the leading ?, which should always be there, 
	// but be careful anyway
	if (query.substring(0, 1) === '?') {
		query = query.substring(1);
	}
	var urlData = query.split('&');
	for (i = 0; (i < urlData.length); i++) {
		if (urlData[i] === null || urlData[i] === undefined || urlData[i] === "") {
			//console.log("empty/no gSheet url")
			continue
		} else {
			urlData[i] = unescape(urlData[i]);
		}
	}


	if (ifMobile === true) {
		/*Options*/
		upcomingTable = true;
		currentTable = true;
		postponedTable = true;
		poolsTable = true;

		turnOnAutoRefresh = false;
		turnOnNextTabCaroussel = false;
		ifPaging = false;
		ifOrganizerViewPreset = true
		ifPlayersViewPreset = false

	}
}
