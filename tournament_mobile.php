<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1 user-scalable=no">
	<title>Tournia live dashboard</title>
	<!--<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	<link rel="stylesheet" href="/resources/demos/style.css">-->
	<!--<link rel="stylesheet" src="css/jquery_mobile.css" />-->
	<!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">-->
	<!--<link rel="stylesheet" href="css/style.css" />-->
	
	<!--<link rel="stylesheet" href="https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css">-->
	<link rel="stylesheet" href="css/libs/jquery_mobile.css" />	
	<link rel="stylesheet" href="css/libs/select2.css" />
	
	<script>
		var version = "1-4-2"
		var ifMobile = true
		var mobileError = false
		var DEBUG_MODE = false
	
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
			if(urlData[i] === null || urlData[i] === undefined || urlData[i] === "" ){
				//console.log("empty/no gSheet url")
				continue
			} else {
				urlData[i] = unescape(urlData[i]);
			} 
		}
	

		if(ifMobile === true){
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
			/*
			var my_VarsObject = {
			setupVariables: false,
			tournamentID: "",
			ifCurrentTable: true,
			ifUpcomingTable: true,
			ifPostponedTable: true,
			ifPoolsTable: true,		
			ifReloadTables: false,
			reloadTimeSecs: 60,
			ifChangeTabs: true,
			minPageTime: 5,
			upcomingTime: 40,
			currentTime: 10,
			postponedTime: 10,
			ifGoogleSheet: true,
			GoogleSheetUrl: "https://docs.google.com/spreadsheets/d/1dZKRCgkOaQMfIJOv3-S2g38LgYVi5AvL4nFIbLBJsX8/pubhtml?gid=296657286&single=true",
			ifCustomSorting: false,
			showStatusPlayersColumn: true,
			showExpectedTimeColumn true,
			showPlayingTime: true,
			showPredictedTime: true,		
			showTotTeamsColumn: true,
			showRoundsNeededColumn: true,
			showRoundsCreatedColumn: true,
			showRoundsLeftColumn: true,
			showStatusColumn: true,
			showByeDataColumn: true,
			shrinkUpcomingTable: true,
			ifOrganizerPreset: true
		}
		var mydataNr = 0
		my_VarsObject.setupVariables = (data[mydataNr] ==== 'true');			mydataNr +=1			
		my_VarsObject.tournamentID = data[mydataNr];						mydataNr +=1
		my_VarsObject.ifCurrentTable = (data[mydataNr] ==== 'true');			mydataNr +=1
		my_VarsObject.ifUpcomingTable = (data[mydataNr] ==== 'true');		mydataNr +=1
		my_VarsObject.ifPostponedTable = (data[mydataNr] ==== 'true');		mydataNr +=1
		my_VarsObject.ifPoolsTable = (data[mydataNr] ==== 'true');			mydataNr +=1
		my_VarsObject.ifReloadTables = (data[mydataNr] ==== 'true');			mydataNr +=1
		my_VarsObject.reloadTimeSecs = data[mydataNr];						mydataNr +=1
		my_VarsObject.ifChangeTabs = (data[mydataNr] ==== 'true');			mydataNr +=1
		my_VarsObject.minPageTime = data[mydataNr];							mydataNr +=1
		my_VarsObject.upcomingTime = data[mydataNr];						mydataNr +=1
		my_VarsObject.currentTime = data[mydataNr];							mydataNr +=1
		my_VarsObject.postponedTime = data[mydataNr];						mydataNr +=1
		my_VarsObject.ifGoogleSheet = (data[mydataNr] ==== 'true');			mydataNr +=1
		my_VarsObject.GoogleSheetUrl = data[mydataNr];						mydataNr +=1
		my_VarsObject.ifCustomSorting = (data[mydataNr] ==== 'true');		mydataNr +=1
		my_VarsObject.showStatusPlayers = (data[mydataNr] ==== 'true');		mydataNr +=1
		my_VarsObject.showExpectedTime = (data[mydataNr] ==== 'true');		mydataNr +=1
		my_VarsObject.showPlayingTime = (data[mydataNr] ==== 'true');		mydataNr +=1
		my_VarsObject.showPredictedTime = (data[mydataNr] ==== 'true');		mydataNr +=1
		my_VarsObject.showTotTeamsColumn = (data[mydataNr] ==== 'true');		mydataNr +=1
		my_VarsObject.showRoundsNeededColumn = (data[mydataNr] ==== 'true');	mydataNr +=1
		my_VarsObject.showRoundsCreatedColumn = (data[mydataNr] ==== 'true');mydataNr +=1
		my_VarsObject.showRoundsLeftColumn = (data[mydataNr] ==== 'true');	mydataNr +=1
		my_VarsObject.showStatusColumn = (data[mydataNr] ==== 'true');		mydataNr +=1
		my_VarsObject.showByeDataColumn = (data[mydataNr] ==== 'true');		mydataNr +=1
		my_VarsObject.shrinkUpcomingTable = (data[mydataNr] ==== 'true');	mydataNr +=1
		my_VarsObject.ifOrganizerPreset = (data[mydataNr] ==== 'true');		mydataNr +=1
		*/

			//CSS
		cssPath = "css/mobileStyle-" + version + ".css";
		cssPath2 = "css/tables_mobileStyle-" + version + ".css";

	</script>
  
	<!--<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>-->

	<!--<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.js"></script>-->
	<!--<script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.13/b-1.2.4/b-colvis-1.2.4/fh-3.1.2/r-2.1.1/sc-1.4.2/datatables.min.js"></script>-->

  
	<!--<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.13/js/jquery.dataTables.js"></script>
	<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/responsive/2.1.1/js/dataTables.responsive.min.js"></script>
	<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/buttons/1.2.4/js/dataTables.buttons.min.js"></script>
	<script type="text/javascript" charset="utf8" src="https:////cdn.datatables.net/buttons/1.2.4/js/buttons.colVis.min.js"></script>-->
	<!--<script src="js/libs/tabletop.min.js"></script>-->
  
	<!--<script type="text/javascript" charset="utf8" src="js/libs/datatables_mobile.js"></script>
	<script src="js/libs/jquery_mobile.js"></script>-->
	
	<script src="js/libs/jquery.js"></script>
	<!--<script src="https://code.jquery.com/jquery-1.12.4.js"></script>-->
	<!--<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>-->
	
	<script src="js/libs/jquery_mobile.js"></script>
	<!--<script src="https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>-->
	<!--<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.js"></script>-->
	<!--<script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.13/b-1.2.4/b-colvis-1.2.4/fh-3.1.2/r-2.1.1/sc-1.4.2/datatables.min.js"></script>-->
	<script type="text/javascript" src="js/libs/dataTables_mobile.js"></script>
	<!--<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.13/js/jquery.dataTables.js"></script>
	-->
	<script src="js/libs/select2.js"></script>

	<script src="js/otherFunctions-1-4-2.js"></script>
	<script src="js/globals-1-4-2.js"></script>
	<script src="js/setupFunctions-1-4-2.js"></script>
	<script src="js/options-1-4-2.js"></script>
	<script src="js/poolProperties-1-4-2.js"></script>
	<script src="js/paginationFunctions-1-4-2.js"></script>
	<script src="js/poolRankingsTable-1-4-2.js"></script>
	<script src="js/playersRankingTable-1-4-2.js"></script>
	<script src="js/groupsRankingTable-1-4-2.js"></script>
	<script src="js/playersTable-1-4-2.js"></script>
	<script src="js/getAPIDataAndMakeTables-1-4-2.js"></script>
	<!--<script src="js/localSampleData-1-4-2.js"></script>
	<script src="js/getAPIDataAndMakeTables_LOCAL-1-4-2.js"></script>-->
	<script src="js/currentMatchesTable-1-4-2.js"></script>
	<!--<script src="js/expectedTimesScript-1-4-2.js"></script>-->
	<script src="js/upcomingMatchesTable-1-4-2.js"></script>
	<script src="js/postponedMatchesTable-1-4-2.js"></script>
	<script src="js/playedMatchesTable-1-4-2.js"></script>
	<script src="js/poolsOverviewTable-1-4-2.js"></script>
	<script src="js/pageView-1-4-2.js"></script>
	<script src="js/tableViews-1-4-2.js"></script>
	<script>
	

		function urlSetup(){
		
			my_settingsVarsObject = { //for mobile
				settingsVariables: false,
				tournamentID: urlData[0],
				ifCurrentTable: true,
				ifUpcomingTable: true,
				ifPostponedTable: true,
				ifPoolsTable: true,		
				ifReloadTables: false,
				reloadTime: 30,
				ifChangeTabs: false,
				minPageTime: 5,
				upcomingTime: 10,
				currentTime: 10,
				postponedTime: 10,
				ifGoogleSheet: false,
				GoogleSheetUrl: "",
				ifCustomSorting: false,
				showStatusPlayersColumn: true,
				showExpectedTimeColumn: true,
				showPlayingTimeColumn: true,
				showPredictedTimeColumn: false,		
				showTotTeamsColumn: false,
				showRoundsNeededColumn: false,
				showRoundsCreatedColumn: false,
				showRoundsLeftColumn: false,
				showStatusColumn: true,
				showByeDataColumn: true,
				ifPagingTable: false,
				ifOrganizerViewPreset: true
			}
		
			/*

			my_settingsVarsObject = {
			
				tournamentID: localStorage.getItem("ls_my_tournamentId"),				//tournament id
				ifCurrentTable: (localStorage.getItem("ls_my_ifCurrentTable") ==== 'true'), //ifCurrentTable
				ifUpcomingTable: (localStorage.getItem("ls_my_ifUpcomingTable") ==== 'true'), //ifUpcomingTable
				ifPostponedTable: (localStorage.getItem("ls_my_ifPostponedTable") ==== 'true'), //ifPostponedTable
				ifPoolsTable: (localStorage.getItem("ls_my_ifPoolsTable") ==== 'true'), //ifPoolsTable
				ifReloadTables: (localStorage.getItem("ls_my_ifReloadTables") ==== 'true'), //ifReloadTables
				reloadTime: Number(localStorage.getItem("ls_my_reloadTime")),		//reloadTablesTime
				ifChangeTabs: (localStorage.getItem("ls_my_ifChangeTabs") ==== 'true'), //ifChangeTabs
				minPageTime: Number(localStorage.getItem("ls_my_minPageTime")),		//minPageTime
				upcomingTime: Number(localStorage.getItem("ls_my_upcomingTime")),		//upcomingTime
				currentTime: Number(localStorage.getItem("ls_my_currentTime")),	//currentTime
				postponedTime: Number(localStorage.getItem("ls_my_postponedTime")),		//postponedTime
				ifGoogleSheet: (localStorage.getItem("ls_my_ifGoogleSheet") ==== 'true'),	//ifGoogleSheet
				GoogleSheetUrl: localStorage.getItem("ls_my_GoogleSheetUrl"),				//google sheet url
				ifCustomSorting: (localStorage.getItem("ls_my_ifCustomSorting") ==== 'true'),
				showStatusPlayersColumn: (localStorage.getItem("ls_my_showStatusPlayersColumn") ==== 'true'),
				showExpectedTimeColumn: (localStorage.getItem("ls_my_showExpectedTimeColumn") ==== 'true'),
				showPlayingTimeColumn: (localStorage.getItem("ls_my_showPlayingTimeColumn") ==== 'true'),
				showPredictedTimeColumn: (localStorage.getItem("ls_my_showPredictedTimeColumn") ==== 'true'),
				showTotTeamsColumn: (localStorage.getItem("ls_my_showTotTeamsColumn") ==== 'true'),
				showRoundsNeededColumn: (localStorage.getItem("ls_my_showRoundsNeededColumn") ==== 'true'),
				showRoundsCreatedColumn: (localStorage.getItem("ls_my_showRoundsCreatedColumn") ==== 'true'),
				showRoundsLeftColumn: (localStorage.getItem("ls_my_showRoundsLeftColumn") ==== 'true'),
				showStatusColumn: (localStorage.getItem("ls_my_showStatusColumn") ==== 'true'),
				showByeDataColummn: (localStorage.getItem("ls_my_showByeDataColumn") ==== 'true'),
				ifPagingTable: (localStorage.getItem("ls_my_ifPagingTable") ==== 'true'),
				ifOrganizerViewPreset: (localStorage.getItem("ls_my_ifOrganizerViewPreset") ==== 'true')
			}*/
		
			if(urlData != ""){
				//getAllLocalStorage()
				//if(1=1){
					startSetupWindow = false
				
					loadFromUrl = true
					loadFromSetupWindow = false

					my_settingsVarsObject.tournamentID = urlData[0]
					my_settingsVarsObject.GoogleSheetUrl = urlData[1]
				
					var myTournamentID = my_settingsVarsObject.tournamentID
					var myGSheetUrl = my_settingsVarsObject.GoogleSheetUrl
					var mydataNr = 0
						
					if(myGSheetUrl === null){
						my_settingsVarsObject.tournamentID = urlData[0]
						my_settingsVarsObject.ifGoogleSheet = true
						my_settingsVarsObject.ifCustomSorting = false
						my_settingsVarsObject.GoogleSheetUrl = ""
						my_settingsVarsObject.ifGoogleSheet = false
					} else {
						my_settingsVarsObject.tournamentID = urlData[mydataNr];	mydataNr +=1	
						my_settingsVarsObject.ifGoogleSheet = true
						my_settingsVarsObject.ifCustomSorting = false
						my_settingsVarsObject.GoogleSheetUrl = urlData[mydataNr];
					}
						
				
					log("creating mobile page with default values...") //my_settingsVarsObject)
					var oldLiveUrl = "http://www.tournia.net/en/" + myTournamentID + "/live/ranking/pool"
					tournamentChange = false
					setVars()
					applyVars()
					//startSetupWindow = true
					//createPage()	//not needed as this is already done in the init
				/*} else {
					log("incorrect tournament id")
					mobileError = true
				}*/
			} else {
				log("empty url")
				mobileError = true
				var tournamentID_input = prompt("No tournament found. Please provide a (correct) tournament id.\nOngoing or upcoming tournaments include:\n 'isbt-enschede-2017'\n'bc-drop-shot-wintertoernooi-2017'\n") //eg.: www.tourniadashboard.nl/utrecht2016")
				var tournament_url = "/tournament.php?" + tournamentID_input
				window.location.href = tournament_url
			} 		
		}
		urlSetup()
	</script>
	<script src="js/init-1-4-2.js"></script>
</head>
<body>
<div id="parent">
	<div data-role="page" id="currentMatches">
		<div id="TournamentUrlName1" class="TournamentUrlName"></div>
		<div data-role="main">
			<div id="currentMatchesBox" class="ui-content">
				<table id="currentMatchesTable" class="display" width="100%">
					<thead id="my_CMtHead">
						<tr>
							<td colspan="7" class="tableHeaders">Current matches</td>
						</tr>
						<tr>
							<th class="courtColumn" >Court</th>
							<th class="poolColumn" >Pool</th>
							<th class="teamColumn" >Team 1</th>
							<th class="vsColumn" ></th>
							<th class="teamColumn" >Team 2</th>
							<th id="alreadyplayingTimeColumn" class="playingTimeColumn" >Playing already</th>
							<th id="predictedTimeColumn" class="predictedTimeColumn" >Predicted remaining time*</th>
						</tr>
					</thead>
				</table>
				<div id="CM_notes" class="note">*Remaing times are based on average match durations per pool of 4 previous editions of ISBT Utrecht.</div>
				<div id="currentMatchesLoader" class="loader" style="display: none"></div>
			</div>
		</div>
		<div class="footer" data-role="footer">
			<div data-role="navbar">
			<ul>
				<li><a href="#currentMatches" class="ui-btn-active ui-state-persist navbar-button" data-prefetch="true" >Current matches</a></li>
				<li><a href="#upcomingMatches" class="navbar-button" data-prefetch="true" >Upcoming matches</a></li>
				<li><a href="#postponedMatches" class="navbar-button" data-prefetch="true" >Postponed matches</a></li>
				<li><a href="#overviewPools" class="navbar-button" data-prefetch="true" >Pools overview</a></li>
				<li><a href="#overviewResults" class="navbar-button" data-prefetch="true" >Results & Rankings</a></li>
			</ul>
			</div>
		</div>
	</div>
	
	<div data-role="page" id="upcomingMatches">
	  <div id="TournamentUrlName2" class="TournamentUrlName"></div>
	  <div data-role="main">
		<div id="upcomingMatchesBox" class="ui-content">
				<table id = "upcomingMatchesTable" class="display" width="100%">
					<thead id="my_UMtHead">
						<tr>
							<td colspan="9" class="tableHeaders">Upcoming matches</td>
						</tr>
						<tr>
							<th class="vsColumn" rowspan='2' >Unr.</th>
							<th class="poolColumn" rowspan='2'>Pool</th>
							<th colspan="2" class ="teamColumn">Team 1</th>
							<th class="vsColumn" rowspan='2'></th>
							<th colspan="2" class ="teamColumn">Team 2</th>
							<th id ="playerStatusColumn" class="statusColumn" rowspan='2'>Status</th>
							<th id="expectedTimeColumn" class="expectedTimeColumn" rowspan='2'>Expected to play in<sup>Beta*</sup></th>
						</tr>
						<tr>
							<th class="showNone" style="display: none"></th>
							<th class="showNone" style="display: none"></th>
							<th class="showNone" style="display: none"></th>
							<th class="showNone" style="display: none"></th>
							<th class="showNone" style="display: none"></th>
						</tr>
					</thead>
				</table>
				<div id ="UM_notes">
					<div id="ExpectedTimeLeftNote" class="note">*Expected times are based on average match durations and standard deviation margins per pool of 4 editions of ISBT Utrecht.</div>
					<div id="ExpectedTimeLeftNote2" class="note">**There is an earlier upcoming match that has an unknown expected time. This may affect this expected time. Check the postponed matches tables if information is available about these matches.</div>
				</div>
				<div id="upcomingMatchesLoader" class="loader" style="display: none"></div>
		</div>
	  </div>
	   <div class="footer" data-role="footer">
		<div data-role="navbar">
			<ul>
				<li><a href="#currentMatches" class="navbar-button" data-prefetch="true" >Current matches</a></li>
				<li><a href="#upcomingMatches" class="ui-btn-active ui-state-persist navbar-button" data-prefetch="true" >Upcoming matches</a></li>
				<li><a href="#postponedMatches" class="navbar-button" data-prefetch="true" >Postponed matches</a></li>
				<li><a href="#overviewPools" class="navbar-button" data-prefetch="true" >Pools overview</a></li>
				<li><a href="#overviewResults" class="navbar-button" data-prefetch="true" >Results & Rankings</a></li>
			</ul>
		</div>
	  </div>
	</div>
	
	<div data-role="page" id="postponedMatches">
		<div id="TournamentUrlName3" class="TournamentUrlName"></div>
		<div data-role="main">
			<div id="postponedMatchesBox" class="ui-content">
				<table id = "postponedMatchesTable" class="display" width="100%">
					<thead id="my_PMtHead">
						<tr>
							<td colspan="9" class="tableHeaders">Postponed matches</td>
						</tr>
						<tr>
							<th class="vsColumn" rowspan='2'>Match nr.</th>
							<th class="poolColumn" rowspan='2'>Pool</th>
							<th colspan="2" class ="teamColumn">Team 1</th>
							<th class="vsColumn" rowspan='2'></th>
							<th colspan="2" class ="teamColumn">Team 2</th>
							<th id ="PplayerStatusColumnPM" class="statusColumn" rowspan='2'>Status</th>
							<th id="reasonColumn" class="expectedTimeColumn" rowspan='2'>Comment</th>
						</tr>
						<tr>
							<th class="showNone" style="display: none"></th>
							<th class="showNone" style="display: none"></th>
							<th class="showNone" style="display: none"></th>
							<th class="showNone" style="display: none"></th>
							<th class="showNone" style="display: none"></th>
						</tr>
					</thead>
				</table>
				<div id="postponedMatchesLoader" class="loader" style="display: none"></div>
			</div>
		</div>
		<div class="footer" data-role="footer">
			<div data-role="navbar">
				<ul>
					<li><a href="#currentMatches" class="navbar-button" data-prefetch="true" >Current matches</a></li>
					<li><a href="#upcomingMatches" class="navbar-button" data-prefetch="true" >Upcoming matches</a></li>
					<li><a href="#postponedMatches" class="ui-btn-active ui-state-persist navbar-button" data-prefetch="true" >Postponed matches</a></li>
					<li><a href="#overviewPools" class="navbar-button" data-prefetch="true" >Pools overview</a></li>
					<li><a href="#overviewResults" class="navbar-button" data-prefetch="true" >Results & Rankings</a></li>		  
				</ul>
			</div>
		</div>
	</div>

	<div data-role="page" id="overviewPools">
		<div id="TournamentUrlName4" class="TournamentUrlName"></div>
		<div data-role="main">
			<div id="OverviewRoundsBox" class="ui-content">
				<table id="poolsOverviewTable" class="display" width="100%">
					<thead id="my_POtHead">
						<tr>
							<td colspan="7" class="tableHeaders">Pools overview</td>
						</tr>
						<tr>
							<th id="poolColumn" class="poolColumn">Pool</th>
							<th id="totTeamsColumn" class="totTeamsColumn">Nr. of teams</th>
							<th id ="roundsNeededColumn" class="roundsNeededColumn">Rounds needed</th>
							<th id="roundsCreatedColumn" class="roundsCreatedColumn">Rounds so far</th>
							<th id ="roundsLeftColumn" class="roundsLeftColumn">Rounds left</th>
							<th id="statusColumn" class="statusColumn">Status</th>
							<th id="byeColumn" class="byeColumn">Not playing in current/planned round</th>
						</tr>
					</thead>
				</table>
				<div id="poolsOverviewLoader" class="loader" style="display: none"></div> 
			</div>
		</div>
		<div class="footer" data-role="footer">
			<div data-role="navbar">
			  <ul>
				<li><a href="#currentMatches" class="navbar-button" data-prefetch="true" >Current matches</a></li>
				<li><a href="#upcomingMatches" class="navbar-button" data-prefetch="true" >Upcoming matches</a></li>
				<li><a href="#postponedMatches" class="navbar-button" data-prefetch="true" >Postponed matches</a></li>
				<li><a href="#overviewPools" class="ui-btn-active ui-state-persist navbar-button" data-prefetch="true" >Pools overview</a></li>
				<li><a href="#overviewResults" class="navbar-button" data-prefetch="true" >Results & Rankings</a></li>
			  </ul>
			</div>
		</div>
	</div>
	<div data-role="page" id="overviewResults">
		<div data-role="main">
			<div id="TournamentUrlName5" class="TournamentUrlName"></div>
			<div id="resultsRankingsBox" class="ui-content">
				<div id="resultsRankingsRbs">
					<fieldset data-role="controlgroup" data-type="horizontal">
						<form>
							<label>
								<input type="radio" name="resRankigsRbs" id="resultsRb" class="resultsRankingsRbs"checked>Results
							</label>
							<label for="rankingsRb">Rankings</label>
							<input type="radio" name="resRankigsRbs" id="rankingsRb" class="resultsRankingsRbs">
							<label for="playersRb">Players</label>
							<input type="radio" name="resRankigsRbs" id="playersRb" class="resultsRankingsRbs">
						</form>
					</fieldset>
				</div>
				<!--<div id="resultsRankingsTabs" data-role="tabs">
                    <ul>
						<li><a id="matchResultsTab" class="tablinks" onclick="openTab(event, 'matchResultsBox')">Results</a></li>
						<li><a  id="poolRankingsTab" class="tablinks" onclick="openTab(event, 'rankingsBox')">Rankings</a></li>
						<li><a id="playerRankingsTab" class="tablinks" onclick="openTab(event, 'playersBox')">Players</a></li>
                </div>
				<div id="resultsRankingsTabs2" data-role="tabs">
                    <div data-role="navbar">
                        <ul>
                            <li><a href="#" id="matchResultsTab" data-prefetch="true"  >Results</a></li>
                            <li><a href="#" id="poolRankingsTab"  data-prefetch="true" data-ajax="false">Rankings</a></li>
                            <li><a href="#" id="playerRankingsTab" data-ajax="false" data-prefetch="true">Players</a></li>
                        </ul>
                    </div>
                </div>-->
				
				

				<div id="matchResultsBox">
					<h3>Match Results</h3>
					<table id = "playedMatchesTable" class="display" width="100%">
						<thead id="my_MRtHead">
							<tr>
								<td colspan="8" class="tableHeaders">Results</td>
							</tr>
							<tr>
								<th rowspan="2" class="leftCol">Match nr.</th>
								<th rowspan="2">Pool</th>
								<th colspan="2" class="col">Team 1</th>
								<th rowspan="2"class="col">Scores</th>
								<th colspan="2" class="rightCol">Team 2</th>
							</tr>
							<tr>
								<th class="showNone" style="display: none"></th>
								<th class="showNone" style="display: none"></th>
								<th class="showNone" style="display: none"></th>
								<th class="showNone" style="display: none"></th>
								<th class="showNone" style="display: none"></th>
							</tr>
						</thead>
					</table>
					<div id="playedMatchesLoader" class="loader" style="display: none"></div>
				</div>
				
				<div id="rankingsBox">
					<div id="rankingsRadioButtons">
						<fieldset data-role="controlgroup" data-type="horizontal" data-mini="true">
							<form>
								<label>
									<input type="radio" name="rankingsRbs" id="poRankingsRb" class="RankingsRb" checked>Pool Rankings
								</label>
								<label for="plRankingsRb">Player Ranking</label>
								<input type="radio" name="rankingsRbs" id="plRankingsRb" class="RankingsRb">
								<label for="grRankingsRb">Group Ranking</label>
								<input type="radio" name="rankingsRbs" id="grRankingsRb" class="RankingsRb">
							</form>
						</fieldset>
						<br>
					</div>
					<div id="poolRankingsBox">
						<div id="poolNameC">
							<div id="poolNameText">Pool name:
								<select id="poolSelector" data-role="none">
									<option></option>
								</select>
							</div>
							<div id="PoolName"></div>
						</div>
						<table id="poolRankingsTable" class="display" width="100%">
							<thead id="my_PRtHead">
								<tr>
									<td colspan="13" class="tableHeaders">Pool Rankings</td>
								</tr>
									<th id="plRCol" rowspan="2" class="leftCol">Rank</th>
									<th id="plCol" rowspan="2" class="col">Players</th>
									<th colspan="5" id="mCol" class="col rankTypeCol">Matches</th>
									<th colspan="3" id="sCol" class="col">Sets</th>
									<th colspan="3" id="pCol" class="rightCol">Points</th>
								</tr>
								<tr>
									<!--<th colspan="2" id="empty" class="empty"></th>-->
									<th id="mPlayedCol">Played</th>
									<th id="mWonCol" class="middleCol">Won</th>
									<th id="mDrawCol" class="middleCol">Draw</th>
									<th id="mLostCol" class="middleCol">Lost</th>
									<th id="mRelativeCol">Relative</th>
									<th id="sWonCol">Won</th>
									<th id="sLostCol" class="middleCol">Lost</th>
									<th id="sRelativeCol">Relative</th>
									<th id="pWonCol">Won</th>
									<th id="pLostCol" class="middleCol">Lost</th>
									<th id="pRelativeCol" class="rightCol">Relative</th>
								</tr>
							</thead>
						</table>
						<div id="poolRankingsLoader" class="loader" style="display: none"></div> 
					</div>
					<div id="playersRankingBox" style="display:none">
						<table id="playersRankingTable" class="display" width="100%">
							<thead id="my_PLRtHead">
								<tr>
									<td colspan="13" class="tableHeaders">Players Ranking</td>
								</tr>
								<tr>
									<th id="playerRankColumn" class="leftCol">Rank</th>
									<th id="PlayerNameCol" class="col">Player</th>
									<th id="APCol" class="col">Average points</th>
									<th id="TPCol" class="col">Total points</th>
									<th id="setsCol" class="col">Sets</th>
									<th id="gCol" class="rightCol">Gender</th>
								</tr>
							</thead>
							<div id="playersRankingLoader" class="loader" style="display: none"></div> 
						</table>
					</div>
					<div id="groupsRankingBox" style="display:none">
						<table id="groupsRankingTable" class="display" width="100%">
							<thead id="my_GRtHead">
								<tr>
									<td colspan="6" class="tableHeaders">Groups Ranking</td>
								</tr>
								<tr>
									<th id="groupRankColumn" class="leftCol">Rank</th>
									<th id="groupNameCol" class="col">Group</th>
									<th id="grTPCol" class="col">Total points</th>
									<th id="grsetsCol" class="col">Sets</th>
									<th id="grRPCol" class="rightCol">Relative</th>
									<th id="nrPLCol" class="rightCol">Nr. of Players</th>
								</tr>
							</thead>
							<div id="groupsRankingLoader" class="loader" style="display: none"></div> 
						</table>
					</div>
				</div>
				
				<div id="playersBox">
					<h3>Players</h3>
						<div id="playerSelectorBox">
							<select id="playerSelector" data-role="none">
								<option></option>
							</select>
						</div>
						<div id="playersTableBox">
							<table id="playersTable" class="display" width="100%">
								<thead id="my_PLAtHead">
									<tr>
										<td colspan="8" class="tableHeaders">Players</td>
									</tr>
									<tr>
										<th class="leftCol">Match nr.</th>
										<th class="col">Team 1</th>
										<th class="col"></th>
										<th class="col">Team 2</th>
										<th class="col">Pool</th>
										<th class="col">Round</th>
										<th class="col">Score</th>
										<th class="rightCol">Status</th>	
									</tr>
								</thead>
							</table>
						</div>
					<div id="playersLoader" class="loader" style="display: none"></div>
				</div>
			</div>
		</div>
		<div class="footer" data-role="footer">
			<div data-role="navbar">
			  <ul>
				<li><a href="#currentMatches" class="navbar-button" data-prefetch="true" >Current matches</a></li>
				<li><a href="#upcomingMatches" class="navbar-button" data-prefetch="true" >Upcoming matches</a></li>
				<li><a href="#postponedMatches" class="navbar-button" data-prefetch="true" >Postponed matches</a></li>
				<li><a href="#overviewPools" class="navbar-button" data-prefetch="true" >Pools overview</a></li>
				<li><a href="#overviewResults" class="ui-btn-active ui-state-persist navbar-button" data-prefetch="true" >Results & Rankings</a></li>
			  </ul>
			</div>
		</div>
	</div>
</div>
</body>
</html>