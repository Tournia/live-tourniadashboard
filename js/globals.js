var log = console.log.bind(console)
//var localTesting

//var ifMobile = true
var ifMobileConfig = (ifMobile == false)

var my_tournamentInfo

var my_settingsVarsArray = []
//var my_settingsVarsObject = {}
var my_defaultVarsObject

var saveNewSettings = false

var localStorageArray = []

//ifReloadTables = true
shrinkUpcomingsTable = false
/**Globals and other setup variables **/

var poolStatisticsArray = []

var noCurrentMatches = false
var noUpcomingMatches = false
var noUnavPostponedMatches = false

var logUpcomingMatch = true

var noPools = false
var my_pools
var my_upcomingMatches = {};
var my_poolInfoTable = []


var my_GoogleSheetData = []
var statusPool = ""
var my_Upcomings = []
var roundsCreated = {}
var my_RoundsList = []
var myPlannedPoolNames = []
var poolsWithTeams = []
var my_PlayingMatches = []
var my_ReadyPostponedMatches = []
var my_teamsPlayingReadyPostponed = []
var postByeData = false
var my_tournamentName = ""

var my_unlistedMatchesPoolName = []
var my_OffsetTop
var UnlistedMatchCount
var my_UMRows = []
var myPlayingMatchesCount = 0
var ifMatchPlanned = false
var ifPoolPlaying = false

var countLeftTables
var my_currentMatchesTable
var my_upcomingMatchesTable
var my_postponedMatchesTable
var my_poolsOverviewTable

var tabTableIds = ["currentMatchesTable", "upcomingMatchesTable", "postponedMatchesTable"]
var tabTableContents = ["currentmatches-tab-content", "upcomingmatches-tab-content", "postponedmatches-tab-content"]
var tabTableAbbrs = ["CM", "UM", "PM", "PO"]

var storageValuesArray = ["ls_my_tournamentId","ls_my_ifCurrentTable","ls_my_ifUpcomingTable","ls_my_ifPostponedTable","ls_my_ifPoolsTable","ls_my_ifReloadTables","ls_my_reloadTime","ls_my_ifChangeTabs","ls_my_minPageTime","ls_my_upcomingTime","ls_my_currentTime","ls_my_postponedTime","ls_my_ifGoogleSheetLoad","ls_my_GoogleSheetUrl","ls_my_ifCustomSorting","ls_my_showStatusPlayersColumn","ls_my_my_settingsVarsObject.showExpectedTimeColumn","ls_my_showPlayingTimeColumn","ls_my_showPredictedTimeColumn","ls_my_showTotTeamsColumn","ls_my_showRoundsNeededColumn","ls_my_showRoundsCreatedColumn","ls_my_showRoundsLeftColumn","ls_my_showStatusColumn","ls_my_showByeDataColumn","ls_my_ifPagingTable","ls_my_IfOrganizerViewPreset"]
var storageVariableNamesArray = ["my_tournamentId","my_ifCurrentTable","my_ifUpcomingTable","my_ifPostponedTable","my_ifPoolsTable","my_ifReloadTables","my_reloadTime","my_ifChangeTabs","my_minPageTime","my_upcomingTime","my_currentTime","my_postponedTime","my_ifGoogleSheetLoad","my_GoogleSheetUrl","my_ifCustomSorting","my_showStatusPlayers","my_my_settingsVarsObject.showExpectedTimeColumn","my_showPlayingTimeColumn","my_showPredictedTimeColumn","my_showTotTeamsColumn","my_showRoundsNeededColumn","my_showRoundsCreatedColumn","my_showRoundsLeftColumn","my_showStatusColumn","my_showByeDataColumn","my_ifPagingTable","my_IfOrganizerViewPreset"]
var htmlIdVarNames = ["myTournamentId","ifCurrentMatches","ifUpcomingMatches","ifPostponedMatches","ifPoolsOverview","ifReloadTables","myReloadTimeInput","ifChangeTabs","minPageTime","upcomingTime","currentTime","postponedTime","ifGoogleSheetData","myGSheetUrl","myCustomSortingBo","umStatusColumn","expectedTimeColumn","playingTimeColumn","predictedTimeColumn","showTotTeamsCb","showRoundsNeededCb","showRoundsCreatedCb","showRoundsLeftCb","showStatusCb","showByeDataCb","if_PagingTable","organizerPreset"]
var newPoolsOverviewTable

var selectedCMTable
var selectedUMTable
var selectedPMTable
var selectedPOTable = "nothing"

var poolProperties = []
var predictedTimeLeftArray = []
/*settings variables */
var tournament_ID		
var currentTable	
var upcomingTable	
var postponedTable	
var poolsTable	
var turnOnAutoRefresh	
	var reloadDataTimeSecs 
var turnOnNextTabCaroussel	
	var minPageTimeSecs
	var upcomingMatchesTabTimeSecs
	var currentMatchesTabTimeSecs
	var postponedMatchesTabTimeSecs
var ifGoogleSheetProperties	
	var googleSheetUrl
	var customSorting
var showStatusPlayersColumn	
var showExpectedTimeColumn	
var showPlayingTimeColumn	
var showPredictedTimeColumn	
var showTotTeamsColumn	
var showRoundsNeededColumn	
var showRoundsCreatedColumn	
var showRoundsLeftColumn	
var showStatusColumn	
var showByeColumn	
var ifPaging	
var ifOrganizerViewPreset	


/*colors*/
var playerPlayingSpan = "<td style=background-color:#ffffb3>" //yellow
var playerUnavailableSpan = "<td style=background-color:#ff8080>" //red
var nowPlayingSpan = "<td style=background-color:#71da71>" //Ready to Play green
var poolPausedSpan = "<span style=background-color:#ffb366>" //orange
var poolsColour = "<span style=background-color:#b3ccff>" //light blue
var poolStoppedSpan = "<span style=background-color:ff4d4d>" // dark red

/*status texts*/
var readyToPlay = "ready to play"
var playersCurrentlyPlaying = "players playing"
var playersUnavailable = "players unavailable"
var postponedMatch = "postponed match"
var priorityMatch = "priority match"

/*empty arrays objects and variables*/
var my_CurrentlyPlayingMatchesData = {}
var my_playingList = []
var my_ReadyUpcomingMatches = [] //match status ready with postponed players
var my_PostponedUpcomingMatches = [] //postponed mathes
var my_listCurrentMatches = []
var my_listPlayedFinishedMatches = []
var my_unavPostponedMatches = [] //matches with postponed players and postponed matches 
var	my_poolsWithTeams = []
var my_matches
var my_nrofRoundsPerPool = {}

var startTab
var goToUpcomingMatchesTab
var goToCurrentMatchesTab
var my_firstTimeout

var totLocationsCount = 0
var availableLocationsCount = 0

var UM_startLog = []
var UM_stopLog = []
var UM_loopLogStrings = []
var completeMatchIDArray = []
var completeStartArray = []
var completeStopArray = []
var completeStartObjects = []
var completeStopObjets = []
var firstLoad = true
var arraycount= 0
var upcomingMatchInfoObjects = []

var allCMdata
var allUMdata
var allPMdata
var allPOdata

var CMclickChange = 0
var UMclickChange = 0
var PMclickChange = 0
var POclickChange = 0
var totCycleTime = 0
var allCycleTimes = []
lastRefreshTimeLog = 0
var timeSinceLastRefreshTime = 0

var startPage = true
var updateCount = 0
var prevUpdateCount = 0
var changeDetector = true
var ifAPIChangeDetected = true
var reloadDataCount = 0
var reloadedData = false
var refreshCount = 0
var CMTableCount = 0
var UMTableCount = 0
var PMTableCount = 0
var POTableCount = 0

var CMPageCount
var UMPageCount
var PMPageCount
var POPageCount

var newCMPageTime = null
var newCMTableTime = null
var newUMPageTime = null
var newUMTableTime = null
var newPMPageTime = null
var newPMTableTime = null
var newPOPageTime = null
var newPOTableTime = null

var setCMPageTableConfig = false
var setUMPageTableConfig = false
var setPMPageTableConfig = false
var setPOPageTableConfig = false

var noCMTimeout
var noUMTimeout
var noPOTimeout

var temprefreshTimeout
var CMTimeout
var UMTimeout
var PMTimeout
var POTimeout

var lastpageTimeoutMatchTable
var CMstarttimeout
var UMstarttimeout
var PMstarttimeout

var refreshTimeInterval
var reloadDataInterval
var POInterval
var tabTableInterval

var CMdetectChangeCount = 0
var UMdetectChangeCount = 0
var PMdetectChangeCount = 0


var my_headerHeight
var my_TabsBoxHeight
var my_UMtHeadHeight
var my_paginationNavHeight
var my_UMnotesHeight
var my_CMtHeadHeight
var my_CMnotesHeight
var my_UMfilterHeight
var my_CMfilterHeight

var viewChange

var timeBetweenMatches
var pauseTime

//expected time vars
var inTotCount_UM
		var totUnavailable_UM
				
		var inCount_UM
		var inReadyCount_UM
		var inPlayCount_UM
		var unavailable_UM
		var Playing
		
		var inFirstCount_UM
		var inSecondCount_UM
		var expectedTimesArray
		var predictedTimesArray
		var totalTimesArray
		var playersPlayingExpectedTimes
		var smallestExpectedTimesArray
		var shiftStartTime
		var shiftUpcomingMatchInfoObjects
		var shift1upcomingMatchInfoObjects
		var ppUpcomingMatchInfoArray
		var rtpUpcomingMatchInfoArray
		var addIndex
		var shift1ppCount
		var altshift2count
		var altshift2ppCount
		var shift1rtp
		var nrOfCourts
		var freeCourtsAvailable