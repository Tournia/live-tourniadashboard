<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!--<meta http-equiv="refresh" content="60" >-->
	<title>Tournia live dashboard</title>
	<script type="text/javascript">
		var version = "1-5-1"
		var versionNr = "1.5.1"
		//checkBrowsers()
		var sampleData
		var DEBUG_MODE
		var sendingDataToDatabase
	
		var ifMobile = false //set to true if you want to work only in the mobile pages
	
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || ifMobile === true) {
			ifMobile = true		
		} else {
			var mobileError = false
			var cssPath = "css/style-" + version + ".css";
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
	</script>
	  <!--<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">-->
 
	 <!--<link rel="stylesheet" href="css/libs/DataTables_Bootstrap.css">-->
   	<!--<link rel="stylesheet" type="text/css" href="css/libs/dataTables.css"/>-->
	<link rel="stylesheet" href="css/libs/select2.css"/>

	 <link rel="stylesheet" href="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.3/dt-1.10.16/b-1.5.1/b-colvis-1.5.1/fh-3.1.3/r-2.2.1/datatables.min.css" >
	 <!--<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.13/css/jquery.dataTables.css">
	 <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/responsive/2.1.1/css/responsive.dataTables.min.css">
	 <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/buttons/1.2.4/css/buttons.dataTables.min.css">-->
	 <!--<link rel="stylesheet" href="css/style-1-5-1.css" />-->
 
	 <!--<script src="https://code.jquery.com/jquery-1.12.4.js"></script>-->
	 <!--<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>-->
  

	<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.3/dt-1.10.16/b-1.5.1/b-colvis-1.5.1/fh-3.1.3/r-2.2.1/datatables.min.js"></script>
	 <!--<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/responsive/2.1.1/js/dataTables.responsive.min.js"></script>
	 <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/buttons/1.2.4/js/dataTables.buttons.min.js"></script>
	 <script type="text/javascript" charset="utf8" src="https:////cdn.datatables.net/buttons/1.2.4/js/buttons.colVis.min.js"></script>-->
	 <!--<script type="text/javascript" src="js/libs/moment.js"></script>-->
	 <!--<script src="js/libs/dataTables_Bootstrap.js"></script>-->

	 <!--<script src="js/libs/tabletop.min.js"></script>-->

 
 

	<!--<script type="text/javascript" src="js/libs/dataTables.js"></script>-->
	<script type="text/javascript" src="js/libs/select2.js"></script>
 	
	<script src="js/otherFunctions-1-5-1.js"></script>
	<script src="js/globals-1-5-1.js"></script>
	<!--<script src="js/tablesHTML-1-5-1.js"></script>-->
	<script src="js/setupFunctions-1-5-1.js"></script>
	<script src="js/options-1-5-1.js"></script>
	<script src="js/poolProperties-1-5-1.js"></script>
	<script src="js/paginationFunctions-1-5-1.js"></script>
	<script src="js/poolRankingsTable-1-5-1.js"></script>
	<script src="js/playersRankingTable-1-5-1.js"></script>
	<script src="js/playersTable-1-5-1.js"></script>
	<script src="js/getAPIDataAndMakeTables-1-5-1.js"></script>
	<script src="js/localSampleData-1-5-1.js"></script>
	<script src="js/getAPIDataAndMakeTables_LOCAL-1-5-1.js"></script>
	<script src="js/currentMatchesTable-1-5-1.js"></script>
	<script src="js/expectedTimesScript-1-5-1.js"></script>
	<script src="js/upcomingMatchesTable-1-5-1.js"></script>
	<script src="js/postponedMatchesTable-1-5-1.js"></script>
	<script src="js/playedMatchesTable-1-5-1.js"></script>
	<script src="js/poolsOverviewTable-1-5-1.js"></script>
	<script src="js/pageView-1-5-1.js"></script>
	<script src="js/tableViews-1-5-1.js"></script>
 
	 <script>
		 function urlSetup() {

			my_defaultVarsObject = {
				settingsVariables: false,
				tournamentID: "",
				ifCurrentTable: true,
				ifUpcomingTable: true,
				ifPostponedTable: true,
				ifPoolsTable: true,
				ifReloadTables: true,
				reloadTime: 30,
				ifChangeTabs: true,
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
				showPredictedTimeColumn: true,
				showTotTeamsColumn: false,
				showRoundsNeededColumn: false,
				showRoundsCreatedColumn: false,
				showRoundsLeftColumn: false,
				showStatusColumn: true,
				showByeDataColumn: true,
				ifPagingTable: true,
				ifOrganizerViewPreset: false
			}

			my_settingsVarsObject = {

				tournamentID: localStorage.getItem("ls_my_tournamentId"),				//tournament id
				ifCurrentTable: (localStorage.getItem("ls_my_ifCurrentTable") === 'true'), //ifCurrentTable
				ifUpcomingTable: (localStorage.getItem("ls_my_ifUpcomingTable") === 'true'), //ifUpcomingTable
				ifPostponedTable: (localStorage.getItem("ls_my_ifPostponedTable") === 'true'), //ifPostponedTable
				ifPoolsTable: (localStorage.getItem("ls_my_ifPoolsTable") === 'true'), //ifPoolsTable
				ifReloadTables: (localStorage.getItem("ls_my_ifReloadTables") === 'true'), //ifReloadTables
				reloadTime: Number(localStorage.getItem("ls_my_reloadTime")),		//reloadTablesTime
				ifChangeTabs: (localStorage.getItem("ls_my_ifChangeTabs") === 'true'), //ifChangeTabs
				minPageTime: Number(localStorage.getItem("ls_my_minPageTime")),		//minPageTime
				upcomingTime: Number(localStorage.getItem("ls_my_upcomingTime")),		//upcomingTime
				currentTime: Number(localStorage.getItem("ls_my_currentTime")),	//currentTime
				postponedTime: Number(localStorage.getItem("ls_my_postponedTime")),		//postponedTime
				ifGoogleSheet: (localStorage.getItem("ls_my_ifGoogleSheet") === 'true'),	//ifGoogleSheet
				GoogleSheetUrl: localStorage.getItem("ls_my_GoogleSheetUrl"),				//google sheet url
				ifCustomSorting: (localStorage.getItem("ls_my_ifCustomSorting") === 'true'),
				showStatusPlayersColumn: (localStorage.getItem("ls_my_showStatusPlayersColumn") === 'true'),
				showExpectedTimeColumn: (localStorage.getItem("ls_my_showExpectedTimeColumn") === 'true'),
				showPlayingTimeColumn: (localStorage.getItem("ls_my_showPlayingTimeColumn") === 'true'),
				showPredictedTimeColumn: (localStorage.getItem("ls_my_showPredictedTimeColumn") === 'true'),
				showTotTeamsColumn: (localStorage.getItem("ls_my_showTotTeamsColumn") === 'true'),
				showRoundsNeededColumn: (localStorage.getItem("ls_my_showRoundsNeededColumn") === 'true'),
				showRoundsCreatedColumn:(localStorage.getItem("ls_my_showRoundsCreatedColumn") === 'true'),
				showRoundsLeftColumn: (localStorage.getItem("ls_my_showRoundsLeftColumn") === 'true'),
				showStatusColumn: (localStorage.getItem("ls_my_showStatusColumn") === 'true'),
				showByeDataColumn: (localStorage.getItem("ls_my_showByeDataColumn") === 'true'),
				ifPagingTable: (localStorage.getItem("ls_my_ifPagingTable") === 'true'),
				ifOrganizerViewPreset: (localStorage.getItem("ls_my_ifOrganizerViewPreset") === 'true')
			}

			if (urlData != "") {
				getAllLocalStorage()

				startSetupWindow = false
				if (viewChange === true) {
					loadFromUrl = false
					loadFromSetupWindow = true
				} else {
					loadFromUrl = true
					loadFromSetupWindow = false
				}
				my_settingsVarsObject.tournamentID = urlData[0]
				my_settingsVarsObject.GoogleSheetUrl = urlData[1]

				var myTournamentID = my_settingsVarsObject.tournamentID
				var myGSheetUrl = my_settingsVarsObject.GoogleSheetUrl
				var mydataNr = 0

				if (myGSheetUrl === null) {
					my_settingsVarsObject.tournamentID = urlData[0]
					my_settingsVarsObject.ifGoogleSheet = true
					my_settingsVarsObject.ifCustomSorting = false
					my_settingsVarsObject.GoogleSheetUrl = ""
					my_settingsVarsObject.ifGoogleSheet = false
				} else {
					my_settingsVarsObject.tournamentID = urlData[mydataNr]; mydataNr += 1
					my_settingsVarsObject.ifGoogleSheet = true
					my_settingsVarsObject.ifCustomSorting = false
					my_settingsVarsObject.GoogleSheetUrl = urlData[mydataNr];
				}

				if (myTournamentID === "" || myTournamentID === undefined || myTournamentID === null || myTournamentID === "undefined") {
					console.log('set start window to true')
					loadFromUrl = false
					startSetupWindow = true
					//log("startSetupWindow:", startSetupWindow)
				} else if (myTournamentID === localStorage.getItem("ls_my_tournamentId") && loadFromSetupWindow === false) {
					//log("creating page with stored values and maybe from setup window:", my_settingsVarsObject)
					tournamentChange = false
					setVars()
					applyVars()
					//startSetupWindow = true
					//createPage()	//not needed as this is already done in the init
				} else if (myTournamentID === localStorage.getItem("ls_my_tournamentId") && loadFromSetupWindow === true) {
					//log("creating page with stored values from setup window:", my_settingsVarsObject)
					tournamentChange = false
					setVars()
					applyVars()

					//startSetupWindow = true
					//createPage()	//not needed as this is already done in the init 
				} else if (myTournamentID != localStorage.getItem("ls_my_tournamentId")) {
					//log("different id provided than local storage")
					tournamentChange = true
					if (myGSheetUrl === undefined || myGSheetUrl === null) {
						localStorage.setItem("ls_my_GoogleSheetUrl", "")
					} else {
						localStorage.setItem("ls_my_GoogleSheetUrl", myGSheetUrl)
					}

					if (localStorage.getItem("ls_my_tournamentId") === null || localStorage.getItem("ls_my_tournamentId") === undefined) {
						//log("new tournament ID localStorage:", localStorage.getItem("ls_my_tournamentId"))
						tournamentChange = true
						localStorage.setItem("ls_my_tournamentId", myTournamentID)
						placeDefaultVars(myTournamentID, myGSheetUrl)
						setAllLocalStorage()
						setVars()
						applyVars()
						//createPage()	//not needed as this is already done in the init

					} else {
						//log("placing new storage values from setup window replacing:", localStorage.getItem("ls_my_tournamentId"))
						tournamentChange = false
						localStorage.setItem("ls_my_tournamentId", myTournamentID)
						setVars()
						applyVars()
						//createPage()	//not needed as this is already done in the init
					}
				} else {
					//log("error in new_Tables HTML()")
					alert("error in new_Tables HTML()")
				}
			} else {
				//log("empty url")
				loadFromUrl = false
				startSetupWindow = true
			}
		}
		urlSetup()	  
	</script>
	 <script src="js/init-1-5-1.js"></script>
	 
	<!-- Global site tag (gtag.js) - Google Analytics -->
		<script async src="https://www.googletagmanager.com/gtag/js?id=UA-131455748-1"></script>
		<script>
		  window.dataLayer = window.dataLayer || [];
		  function gtag(){dataLayer.push(arguments);}
		  gtag('js', new Date());

		  gtag('config', 'UA-131455748-1');
		</script>

</head>
<body bgcolor="#f3f2f0">

<div id="parent" bgcolor="#f3f2f0"> 
	<!-- Header-->
	<div id="my_header">
		<div id="settingsBar">
			<div id="settingsButtonDiv">
				<button id="settingsButton" type="button" class="btn btn-default btn-sm">
					<span class="glyphicon glyphicon-cog"></span> Setup
				</button>
				<!--<button id="statisticsButton"type="button" class="btn btn-default btn-sm">
					<span class="glyphicon glyphicon-stats"> Statistics</span>
				</button>-->
			</div>
			<div id="fullScreenButtonDiv">
				<button type="button" class="btn btn-default btn-sm" onclick="toggleFullScreen()">
					<span class="glyphicon glyphicon-fullscreen"></span> Fullscreen 
				</button>
				<div id="invisibleButton" type="Button" onClick="sendTimesLog()"></div>

			</div>
		</div>
		<div id="TournamentUrlName"></div>
		<div id="myClock"></div>
	</div>
	<div id="announcements"></div>
	<div id="noTablesSetup"></div>
	<!-- Modals -->
	<!--Settings Modal -->
  <div class="modal fade" id="settingsModal" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header" style="padding:35px 50px;">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4><!--<span class="glyphicon glyphicon-lock"></span>-->Tournia dashboard Setup</h4>
        </div>
        <div class="modal-body" style="padding:40px 50px;">
			<div id="my_setupInput">
				<table id="setupTable" class="setupTable">
					<tr>
						<td>
							<input class="input" type = "text" id = "myTournamentId" placeholder="Enter Tournament ID" />
						</td>
						<td>
							<a tabindex="0" class="glyphicon glyphicon-info-sign" data-container="body" data-toggle="popover" data-trigger="focus" data-placement="right" <a data-toggle="popover" title="Tournament ID" data-content="Required. You can find your tournament ID here:<br><a><img src='images/tournamentID.png'height='25' width='250'></a><br>in the URL of your Tournia tournament homepage."></a>
						</td>
					</tr>
					<tr>
						<td>
							<div id="tableSelections">
								<input type="checkbox" id="ifCurrentMatches" class="checkbox" onchange="toggleCurrentMatchesTable(this.checked)" checked>Current matches<br>
								<input type="checkbox" id="ifUpcomingMatches" class="checkbox" onchange="toggleUpcomingMatchesTable(this.checked)" checked>Upcoming matches<br>
								<input type="checkbox" id="ifPostponedMatches" class="checkbox" onchange="togglePostponedMatchesTable(this.checked)" checked>Postponed matches<br>
								<br>
								<input type="checkbox" id="ifPoolsOverview" class="checkbox" onchange="togglePoolsOverviewTable(this.checked)" checked>Pools overview
							</div>
						</td>
						<td>
							<a tabindex="0" class="glyphicon glyphicon-info-sign" data-container="body" data-toggle="popover" data-trigger="focus" data-placement="right" title="Select Tables" data-content="Any combination of tables is possible."></a>
						</td>
					</tr>
					<tr>
						<td>
							<table id="reloadTimeTable" class="tableTimesInput">
								<tr>
									<td>
										<input class="checkbox" type="checkbox" id="ifReloadTablesBo" onchange="toggleReloadTables(this.checked)" checked>Reload data every
									</td>
									<td>
										<input class ="NRinput" type="number" id="myReloadTimeInput" value="30">secs.
									</td>
								</tr>
							</table>
						</td>
						<td>
							<a tabindex="0" class="glyphicon glyphicon-info-sign" data-container="body" data-toggle="popover" data-trigger="focus" data-placement="right" title="Automatic reload of tables" data-content="Sets if tables will automatically reload tables new data. Set time in seconds how often tables need to reload. At the reload interval, tables are only reloaded if a change in any data is detected."></a>
						</td>
					</tr>
					<tr>
						<td>
							<form>
								<input type="radio" id="organizerPreset" name="tablePreset" class="radio" value="viewer" onchange="toggleOrganizerView(this.checked)">Organzier view<br>
								<input type="radio" id="viewerPreset" name="tablePreset" class="radio" value="organizer" onchange="toggleViewerView(this.checked)" >Participants view
							</form>
						</td>
						<td>
							<a tabindex="0" class="glyphicon glyphicon-info-sign" data-container="body" data-toggle="popover" data-trigger="focus" data-placement="right" title="Page view preset" data-content="<u>Organizer view:</u><br> -all matches are shown in long tables<br> -no tables are shrinked according to screen size<br> -no automatic switch between tables possible<br><u>Participants view:</u><br> -tables are shrinked according to screen size<br> -table pages are made<br> -tables will switch automatically<br> -shrinking and pages are created according to timer and not through clicks"></a>
						</td>
					</tr>	
					<tr>
						<td>
							<input type="checkbox" id="if_PagingTable" class="checkbox" checked disabled>table fits to height of window and create pages
						</td>
						<td>
							<a tabindex="0" class="glyphicon glyphicon-info-sign" data-container="body" data-toggle="popover" data-trigger="focus" data-placement="right" title="Shrink tables to fit height of screen." data-content="If turned on, tables will fit the height of your screen and pages will be created automatically. Otherwise, all data will be shown in all the tables that may not fit on your screen."></a>	
						</td>
					</tr>
					<tr>
						<td>	
							<table id="tableTimesInput" class="tableTimesInput">
								<tr>
									<td>
										<input class ="checkbox" type="checkbox" id="ifChangeTabs" onchange="toggleChangeTabs(this.checked)" checked disabled>
									</td>
									<td></td>
								</tr>
								
								<tr>
									<td>Minimal time per page</td>
									<td>
										<input class="NRinput" type="number" id="minPageTime" value="5" min="2">secs.
									</td>
								</tr>
								
								<tr>
									<td>Current matches</td>
									<td>
										<input class="NRinput" type="number" id="currentTime" value="10" min="10">secs.
									</td>
								</tr>
								
								<tr>
									<td>Upcoming matches</td>
									<td>
										<input class="NRinput" type="number" id="upcomingTime" value="40" min="10">secs.
									</td>
								</tr>
								
								<tr>
									<td>Postponed matches</td>
									<td>
										<input class="NRinput" type="number" id="postponedTime" value="10" min="5">secs
									</td>
								</tr>
							</table>
						</td>
						<td>
							<a tabindex="0" class="glyphicon glyphicon-info-sign" data-container="body" data-toggle="popover" data-trigger="focus" data-placement="right" title="Automatically switch between matches tables" data-content="Sets if current/upcoming/postponed matches table(s) will automatically toggle between each other. Set a time how long each table needs to be shown before it switches to the next. This is the total time including all the pages. Time given per page overrules the total table time."></a>
						</td>				
					</tr>
					<tr class="GSheetSetup">
						<td >
							<input type="checkbox" class="checkbox" id="ifGoogleSheetData" name="ifGoogleSheetDataCb" onchange="toggleGoogleSheet(this.checked)"/>
							<input class="input" type ="text" id="myGSheetUrl" value="" disabled>
							<button id="loadDataButton" type="button" onclick="loadGData(myGSheetUrl.value)" disabled>load table</button>
							<div id="GDataLoader" class="saveLoader" style="display: none"></div>
							<div id="dataCheckmark" class="checkmark" style="display: none"></div>
							<div id="dataCross" class="cross" style="display: none"></div>
							<div id="editGSheet"></div>
						</td>
						<td>
							<a tabindex="0" class="glyphicon glyphicon-info-sign" data-container="body" data-toggle="popover" data-trigger="focus" data-placement="right" <a data-toggle="popover" title="Load table data from a Google Sheet" data-content="Turn on if you want to make use of a Google Sheet of a specific format to add extra functionalities including custom pool status and custom order of showing the pools in the Pools overview table. <a id='tooltipGS' href='https://docs.google.com/spreadsheets/d/1FrgpDQQc5HV1pbsi6XDswXD_B_JFknVwLMAJE5gmnLY/edit?usp=sharing'  target='_blank'>Here</a> is an example template of a Google Sheet with the correct format and instuctions.Enter the Google Sheet URL. The Google Sheet will be checked if it exists and if it is in the correct format. If edits are made in the Google Sheet, you might have to wait up to 5 minutes before changes are published (and visible in the preview)."></a>
						</td>
					</tr>
					<tr class="GSheetSetup">
						<td>
							<input type="checkbox" id="myCustomSortingBo" class="checkbox" name="ReloadTablesBolean" disabled onchange="toggleCustomSorting()">Custom order of pools
							<div id="customOrderCheckmark" class="checkmark" style="display: none"></div>
							<div id="customOrderCross" class="cross" style="display: none"></div>
						</td>
						<td>
							<a tabindex="0" class="glyphicon glyphicon-info-sign" data-container="body" data-toggle="popover" data-trigger="focus" data-placement="right" title="Show custom order of pools" data-content="Turn this on if you want to show the pools in the Pools overview table according to a certain order (eg. order of presumed playing order). Turning this on will override the order given in Tournia. It will check if custom order numbers are set up properly in the Google Sheet."></a>
						</td>
					</tr>
					<tr>
						<td>
							<input type="checkbox" id="playingTimeColumn" class="checkbox" checked>Playing time so far<br>
							<div id="predictedTimesOption">
								<input type="checkbox" id="predictedTimeColumn" class="checkbox" value="Predicted time left" checked>Predicted time left
							</div>
						</td>
						<td>
							<a tabindex="0" class="glyphicon glyphicon-info-sign" data-container="body" data-toggle="popover" data-trigger="focus" data-placement="right" title="Select current matches columns" data-content="Turn on and off certain column. For each column inforation will be shown for each match. A custom preset is also possible."></a>
						</td>
					</tr>
					<tr>
						<td>
							<input type="checkbox" id="umStatusColumn" class="checkbox" checked>Status of players<br>
							<div id="expectedTimesOption">
								<input type="checkbox" id="ExpectedTimeBo" class="checkbox" value="Expected time before play" checked>Expected times before play
							</div>
						</td>
						<td>
							<a tabindex="0" class="glyphicon glyphicon-info-sign" data-container="body" data-toggle="popover" data-trigger="focus" data-placement="right" title="Select upcoming matches columns" data-content="Turn on and off certain column. For each column inforation will be shown for each match. A custom preset is also possible."></a>
						</td>
					</tr>
					<tr>
						<td>
							<input type="checkbox" id="showTotTeamsCb" class="checkbox">Total amount of teams<br>
							<div id="slowLoadersFunctionalities">
								<input type="checkbox" id="showRoundsNeededCb" class="checkbox">Rounds needed<br>
								<input type="checkbox" id="showRoundsCreatedCb" class="checkbox" checked>Rounds created so far<br>
								<input type="checkbox" id="showRoundsLeftCb" class="checkbox">Rounds left<br>
							</div>
							<input type="checkbox" id="showStatusCb" class="checkbox" checked>Status of pool<br>
							<input type="checkbox" id="showByeDataCb" class="checkbox" checked>Teams that have a bye<br>
						</td>
						<td>	
							<a tabindex="0" class="glyphicon glyphicon-info-sign" data-container="body" data-toggle="popover" data-trigger="focus" data-placement="right" title="Select pools overview columns" data-content="Turn on and off certain column. For each column inforation will be shown for each pool. A custom preset is also possible."></a>
						</td>
					</tr>	
				</table>
			</div>
        </div>
        <div class="modal-footer">
			<button type="submit" id="cancelButton"class="btn btn-danger btn-default pull-left" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> Cancel</button>
			<div id="createPageBox">
				<button type="submit" id="createPageButton" class="btn btn-success btn-block" onclick="checkVariables()"> Save</button>
				</form>
				<div id="createPageLoader" class="saveLoader" style="display: none"></div>
			</div>
			<div id="creditsText"></div>
			</div>
        </div>
      </div>
    </div>
  </div>
  <!--<div id="statisticsModal">
	<div class="modal-dialog">
    
      <!-- Modal content
      <div class="modal-content">
        <div class="modal-header" style="padding:35px 50px;">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4><span class="glyphicon glyphicon-stats"></span>Pool statistics</h4>
        </div>
        <div class="modal-body" style="padding:40px 50px;">
			<table id="poolStatisticsdTable" width="80%">
				<thead id="my_CMtHead">
					<tr>
						<th id="poolColumn" class="poolColumn">Pool</th>
						<th id="totTeamsColumn" class="totTeamsColumn">Nr. of teams</th>
						<th id="roundsCreatedColumn" class="roundsCreatedColumn">Rounds so far</th>
						<th id="totTeamsColumn" class="totTeamsColumn">Amount of matches</th>
						<th id="totTeamsColumn" class="totTeamsColumn">Average atch timr</th>
					</tr>
				</thead>	
			</table>
		</div>
	  </div>
	</div>
  </div>-->
	
	<div id="myTables">
		<div id="leftBox">
			<nav id="myLeftTabsBox" >
				<ul class="nav nav-tabs">
					<li class="active" id="currentMatches-button"><a href="#currentmatches-tab-content" data-toggle="tab">Current matches</a></li>
					<li id="upcomingMatches-button"><a href="#upcomingmatches-tab-content" data-toggle="tab">Upcoming Matches</a></li>
					<li id="postponedMatches-button"><a href="#postponedmatches-tab-content" data-toggle="tab">Postponed matches</a></li>				
					<div id="leftProgress" class="myProgress">
						<div id="leftBar" class="leftProgressBar"></div>
					</div>
				</ul>	
			</nav>
			
			<div class="tab-content" id="tab-contents">
				<div id="currentmatches-tab-content" class="tab-pane active">
						<table id="currentMatchesTable" width="100%">
							<thead id="my_CMtHead">
								<tr>
									<td colspan="7" class="tableHeaders">Current matches
									<div id="oneTableLeftProgress" class="oneTableProgress">
										<div id="CM_oneTableLeftBar" class="leftProgressBar"></div>
									</div></td>
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
				
				<div id="upcomingmatches-tab-content" class="tab-pane">
					<table id = "upcomingMatchesTable" class="upcomingMatchesTable" width="100%">
						<thead id="my_UMtHead">
							<tr>
								<td colspan="9" class="tableHeaders">Upcoming matches
									<div id="oneTableLeftProgress" class="oneTableProgress">
										<div id="UM_oneTableLeftBar" class="leftProgressBar"></div>
									</div>
								</td>
							</tr>
							<tr>
								<th class="matchNrColumn" rowspan='2'>Upcoming match nr.</th>
								<th class="poolColumn" rowspan='2'>Pool</th>
								<th colspan="2" class ="teamColumn">Team 1</th>
								<th class="vsColumn" rowspan='2'></th>
								<th colspan="2" class ="teamColumn">Team 2</th>
								<th id="statusPlayersHeader" class="statusColumn" rowspan='2'>Status</th>
								<th id="expectedTimeHeader" class="expectedTimeColumn" rowspan='2'>Expected to play in<sup>Beta*</sup></th>
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
					<div id="UM_notes">
						<div id="ExpectedTimeLeftNote" class="note">*Expected times are based on average match durations and standard deviation margins per pool of 4 editions of ISBT Utrecht.</div>
						<div id="ExpectedTimeLeftNote2" class="note">**There is an earlier upcoming match that has an unknown expected time. This may affect this expected time. Check the postponed matches tables if information is available about these matches.</div>
					</div>
					<div id="upcomingMatchesLoader" class="loader" style="display: none"></div>
				</div>

				<div id="postponedmatches-tab-content" class="tab-pane">
					<table id = "postponedMatchesTable" width="100%">
						<thead id="my_PMtHead">
							<tr>
								<td colspan="9" class="tableHeaders">Postponed matches
									<div id="oneTableLeftProgress" class="oneTableProgress">
										<div id="PM_oneTableLeftBar" class="leftProgressBar"></div>
									</div>
								</td>
							</tr>
							<tr>
								<th class="matchNrColumn" rowspan='2'>Match nr.</th>
								<th class="poolColumn" rowspan='2'>Pool</th>
								<th colspan="2" class ="teamColumn">Team 1</th>
								<th class="vsColumn" rowspan='2'></th>
								<th colspan="2" class ="teamColumn">Team 2</th>
								<th id ="playerStatusColumnPM" class="statusColumn" rowspan='2'>Status</th>
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
		</div>
		<div id="rightBox">
			<nav id="myRightTabsBox" >
				<ul class="nav nav-tabs">
					<li class="active" id="poolsOverview-button"><a href="#poolsOverview-tab-content" data-toggle="tab">Pools Overview</a></li>			
					<div id="rightProgress" class="myProgress">
						<div id="rightBar" class="rightProgressBar"></div>
					</div>
				</ul>
			</nav>
			<div id="poolsOverview-tab-content" class="tab-pane">
				<div id="OverviewRoundsBox">
						<table id="poolsOverviewTable" width="100%">
							<thead id="my_POtHead">
								<tr>
									<td colspan="7" class="tableHeaders">Pools overview
									<div id="oneTableRightProgress" class="oneTableProgress">
										<div id="oneTableRightBar" class="rightProgressBar"></div>
									</div>
									</td>
								</tr>
								<tr>
									<th id="poolColumn" class="poolColumn">Pool</th>
									<th id="totTeamsColumn" class="totTeamsColumn">Nr. of teams</th>
									<th id="roundsNeededColumn" class="roundsNeededColumn">Rounds needed</th>
									<th id="roundsCreatedColumn" class="roundsCreatedColumn">Rounds so far</th>
									<th id="roundsLeftColumn" class="roundsLeftColumn">Rounds left</th>
									<th id="statusColumn" class="statusColumn">Status</th>
									<th id="byeColumn" class="byeColumn">Not playing in current/planned round</th>
								</tr>
							</thead>
						</table>
						<div id="poolsOverviewLoader" class="loader" style="display: none"></div> 
				</div>
			</div>
		</div>
	</div>
</div>
</body>
</html>
