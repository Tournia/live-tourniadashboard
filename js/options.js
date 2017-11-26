//my_urlSetup = my_settingsVarsObject.setupVariables
//my_localStorageSetup = my_settingsVarsObject.localStorageSetupVariables
//log(my_urlSetup)
/*if in url
else if storage
else default*/
function placeDefaultVars(tournament_ID, gSheetUrl) { //default from url
	log("placing default vars with...:", tournament_ID, gSheetUrl)
		my_settingsVarsObject.settingsVariables = false
		my_settingsVarsObject.tournamentID = tournament_ID
		my_settingsVarsObject.ifCurrentTable = true
		my_settingsVarsObject.ifUpcomingTable = true
		my_settingsVarsObject.ifPostponedTable = true
		my_settingsVarsObject.ifPoolsTable = true
		my_settingsVarsObject.ifReloadTables = true
		my_settingsVarsObject.reloadTime = 60
		my_settingsVarsObject.ifChangeTabs = true
		my_settingsVarsObject.minPageTime = 5
		my_settingsVarsObject.upcomingTime = 40
		my_settingsVarsObject.currentTime = 10
		my_settingsVarsObject.postponedTime = 10
		my_settingsVarsObject.showStatusPlayersColumn = true
		my_settingsVarsObject.showExpectedTimeColumn = true
		my_settingsVarsObject.showPlayingTimeColumn = true
		my_settingsVarsObject.showPredictedTimeColumn = true
		my_settingsVarsObject.showTotTeamsColumn = false
		my_settingsVarsObject.showRoundsNeededColumn = false
		my_settingsVarsObject.showRoundsCreatedColumn = true
		my_settingsVarsObject.showRoundsLeftColumn = false
		my_settingsVarsObject.showStatusColumn = true
		my_settingsVarsObject.showByeDataColumn = true
		my_settingsVarsObject.ifPagingTable = true
		my_settingsVarsObject.ifOrganizerViewPreset = false

		if (gSheetUrl != undefined) {
			var ifGsheet = true
				my_settingsVarsObject.ifGoogleSheet = true
		} else {
			var ifGoogleSheet = false
				my_settingsVarsObject.ifGoogleSheet = false
		}

		if (ifGsheet == false) {
			my_settingsVarsObject.GoogleSheetUrl = ""
		} else {
			my_settingsVarsObject.GoogleSheetUrl = gSheetUrl
		}

		if (ifGsheet == false) {
			my_settingsVarsObject.ifCustomSorting = false
		} else {
			my_settingsVarsObject.ifCustomSorting = false
		}
}

function setVars() { //from settings
	log("setting vars...")
	// set values to variables
	tournament_ID = my_settingsVarsObject.tournamentID;
	currentTable = my_settingsVarsObject.ifCurrentTable;
	upcomingTable = my_settingsVarsObject.ifUpcomingTable;
	postponedTable = my_settingsVarsObject.ifPostponedTable;
	poolsTable = my_settingsVarsObject.ifPoolsTable;
	turnOnAutoRefresh = my_settingsVarsObject.ifReloadTables;
	reloadDataTimeSecs = my_settingsVarsObject.reloadTime;
	turnOnNextTabCaroussel = my_settingsVarsObject.ifChangeTabs;
	minPageTimeSecs = my_settingsVarsObject.minPageTime;
	upcomingMatchesTabTimeSecs = my_settingsVarsObject.upcomingTime;
	currentMatchesTabTimeSecs = my_settingsVarsObject.currentTime;
	postponedMatchesTabTimeSecs = my_settingsVarsObject.postponedTime;
	ifGoogleSheetProperties = my_settingsVarsObject.ifGoogleSheet;
	googleSheetUrl = my_settingsVarsObject.GoogleSheetUrl;
	customSorting = my_settingsVarsObject.ifCustomSorting;
	showStatusPlayersColumn = my_settingsVarsObject.showStatusPlayersColumn;
	showExpectedTimeColumn = my_settingsVarsObject.showExpectedTimeColumn;
	showPlayingTimeColumn = my_settingsVarsObject.showPlayingTimeColumn;
	showPredictedTimeColumn = my_settingsVarsObject.showPredictedTimeColumn;
	showTotTeamsColumn = my_settingsVarsObject.showTotTeamsColumn;
	showRoundsNeededColumn = my_settingsVarsObject.showRoundsNeededColumn;
	showRoundsCreatedColumn = my_settingsVarsObject.showRoundsCreatedColumn;
	showRoundsLeftColumn = my_settingsVarsObject.showRoundsLeftColumn;
	showStatusColumn = my_settingsVarsObject.showStatusColumn;
	showByeColumn = my_settingsVarsObject.showByeDataColumn;
	ifPaging = my_settingsVarsObject.ifPagingTable;
	ifOrganizerViewPreset = my_settingsVarsObject.ifOrganizerViewPreset;

	log("my_settingsVarsObject:", my_settingsVarsObject)
	/*var tournamentUrL_input = "utrecht2016" //"bc-drop-shot-wintertoernooi-2017"

	var currentTable = true
	var upcomingTable = true
	var postponedTable = true
	var poolsTable = true

	var turnOnAutoRefresh = false
	var reloadDataTimeSecs = 60 //amount in seconds
	var turnOnNextTabCaroussel = false
	var minPageTimeSecs = 5 //amount in secs
	var upcomingMatchesTabTimeSecs = 10 // amount in Secs
	var currentMatchesTabTimeSecs = 10 // amount in Secs
	var postponedMatchesTabTimeSecs = 10 //ampunt in Secs
	var ifGoogleSheetProperties = false
	var googleSheetUrl = "https://docs.google.com/spreadsheets/d/1ibxYoiVVJ7YrvUeYxmx7hIyZozWRaxAQ6ptbuhnsTDY/pubhtml?gid=296657286&single=true"

	var if_customSorting = false


	//var showStatusPlayersColumn = true;
	var my_settingsVarsObject.showExpectedTimeColumn = true;
	var showPlayingTimeColumn = true;
	var showPredictedTimeColumn = true;
	var showTotTeamsColumn = true
	var showRoundsNeededColumn = true
	var showRoundsCreatedColumn = true
	var showRoundsLeftColumn = true
	var showStatusColumn = true
	var showByeColumn = true
	var ifPaging = false
	var ifOrganizerViewPreset = true*/
}

function applyVars() {
		log("applying vars...")
		
		getPoolProperties()
		
		ifPlayersViewPreset = (ifOrganizerViewPreset == true)
		googleSheetUrl = googleSheetUrl + "&&range=A:C"

		minPageTime = (minPageTimeSecs * 1000)
		upcomingMatchesTabTime = (upcomingMatchesTabTimeSecs * 1000)
		currentMatchesTabTime = (currentMatchesTabTimeSecs * 1000)
		postponedMatchesTabTime = (postponedMatchesTabTimeSecs * 1000)
		poolsOverviewMatchesTabTime = 500
		reloadDataTime = (reloadDataTimeSecs * 1000)
		upcomingAndCurrentTabTimes = upcomingMatchesTabTime + currentMatchesTabTime
		/*if (upcomingAndCurrentTabTimes % reloadDataTime == 0) {
			reloadDataTime = (reloadDataTimeSecs * 1000) + 2000
		}*/

		tourniaUrl = "https://www.tournia.net/"
		tourniaApiUrl = "https://www.tournia.net/api/v2/"

		tournamentInfoUrl = tourniaApiUrl + tournament_ID + "/tournament"

		updatesDetectorUrl = tourniaApiUrl + tournament_ID + "/updates?_format=json"
		
		poolsUrl = tourniaApiUrl + tournament_ID + "/pools"

		listLocationsUrl = tourniaApiUrl + tournament_ID + "/locations?tournamenturl=" + tournament_ID + "&_format=json"
		listCurrentlyPlayingLocationsUrl = tourniaApiUrl + tournament_ID + "/matches/listplaying?tournament_ID=" + tournament_ID + "&_format=json"

		listMatchesUrl = tourniaApiUrl + tournament_ID + "/matches?tournament_ID=" + tournament_ID + "&_format=json"
		listCurrentlyPayingUrl = tourniaApiUrl + tournament_ID + "/matches/liststatus?tournament_ID=" + tournament_ID + "&_format=json&status=playing&limit=5000&startPos=0&sortOrder=ASC"
		listReadyMatchesUrl = tourniaApiUrl + tournament_ID + "/matches/liststatus?tournament_ID=" + tournament_ID + "&_format=json&status=ready&limit=5000&startPos=0&sortOrder=ASC"
		listPostponedMatchesUrl = tourniaApiUrl + tournament_ID + "/matches/liststatus?tournament_ID=" + tournament_ID + "&_format=json&status=postponed&limit=5000&startPos=0&sortOrder=ASC"
		listFinishedMatchesUrl = tourniaApiUrl + tournament_ID + "/matches/liststatus?_format=json&status=finished&limit=500&startPos=0&sortOrder=ASC"
		listPlayedMatchesUrl = tourniaApiUrl + tournament_ID + "/matches/liststatus?_format=json&status=played&limit=500&startPos=0&sortOrder=ASC"

		listGroupRankingsUrl = tourniaApiUrl + tournament_ID + "/rankings/groups?_format=json"
		listPlayersRankingUrl = tourniaApiUrl + tournament_ID + "/rankings/players?_format=json"
		//listPoolRankingsUrl = tourniaApiUrl + tournament_ID +
		listPoolWinnersUrl = tourniaApiUrl + tournament_ID + "/rankings/poolwinners?_format=json&ranks=2"
		
		//Google sheet review
		iframe = ""
		iframe = document.createElement('iframe');
		iframe.widget = "true"
		iframe.headers = "false"
		iframe.id = "GSheetiFrame";
		iframe.setAttribute("src", googleSheetUrl);

		var my_GoogleGIDpt1 = googleSheetUrl.split("?").pop()
		//log(my_GoogleGIDpt1)
		var my_GoogleGIDpt2 = my_GoogleGIDpt1.split("&").shift()
		//log(my_GoogleGIDpt2)
		var my_GoogleGIDpt3 = my_GoogleGIDpt2.split("=").pop()
		//log(my_GoogleGIDpt3)

		my_GoogleSheetEditUrl = googleSheetUrl.substr(googleSheetUrl, googleSheetUrl.lastIndexOf('/')) + "/edit#gid=" + my_GoogleGIDpt3;

		//log(googleSheetUrl)
		//log(my_GoogleSheetEditUrl)
		my_editUrlClick = document.createElement("a")
		my_editUrlClick.href = my_GoogleSheetEditUrl
		my_editUrlClick.innerHTML = "view and edit table"
		my_editBox = document.getElementById("editGSheet")
}
