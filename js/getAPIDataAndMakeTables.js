function checkForAPIChange(){
	//log("detecting if there is change...")
	return $.getJSON(updatesDetectorUrl, function (data) {
		updateData = data })
	.success(function(){
		updateCount = updateData.lastUpdateId
		//log(updateCount, prevUpdateCount)
		if(updateCount != prevUpdateCount){
			ifAPIChangeDetected = true
		} else {
			ifAPIChangeDetected = false
		}
		prevUpdateCount = updateCount
		//log("change detected:", ifAPIChangeDetected)
	})
	.error(function(){
		ifAPIChangeDetected = true
	})	
}

function _1emptyVars(){
	//log(reloadedData)
	document.getElementById("poolsOverviewLoader").style.display = "" 
	document.getElementById("currentMatchesLoader").style.display = "" 
	document.getElementById("upcomingMatchesLoader").style.display = ""
	document.getElementById("postponedMatchesLoader").style.display = ""
	if(ifMobile == true){
		document.getElementById("playedMatchesLoader").style.display = ""
		document.getElementById("playersRankingLoader").style.display = ""
	}
	my_locationsList = []
	my_playingList = []
	my_listCurrentMatches = []
	my_listPlayedFinishedMatches = []
	my_teamsPlayingReadyPostponed = []
	myPlannedPoolNames = []
	my_unavPostponedMatches = []
	my_poolsWithTeams = []
	my_GoogleSheetData = []
	my_listPlayersRanking = []
	poolRankings = []
	poolNamesRanked = []
	poolRankings.push(poolNamesRanked)
	listPlayers = []
	
	allCMdata = []
	allUMdata = []
	allPMdata = []
	allPLMdata = []
	allPOdata = []
	allPLAdata = []

	reloadedData = false
	dataRefreshCount = 0
	
	CMclickChange = 0
	UMclickChange = 0
	PMclickChange = 0
	POclickChange = 0
	
	newCMPageTime = null
	newCMTableTime = null
	newUMPageTime = null
	newUMTableTime = null
	newPMPageTime = null
	newPMTableTime = null
	newPOPageTime = null
	newPOTableTime = null
	
	allCycleTimes.push(totCycleTime)
	totCycleTime = 0
	
	if(my_settingsVarsObject.ifOrganizerViewPreset == true){
		lastRefreshTimeLog = my_settingsVarsObject.reloadTime

	} else {
		lastRefreshTimeLog = timeSinceLastRefreshTime
	}
	
	timeSinceLastRefreshTime = 0
	
	setCMPageTableConfig = false
	setUMPageTableConfig = false
	setPMPageTableConfig = false
	setPOPageTableConfig = false
	
	
	clearTimeout(noCMTimeout)
	clearTimeout(noUMTimeout)
	clearTimeout(noPOTimeout)
	
	clearTimeout(lastpageTimeoutMatchTable)
	clearTimeout(CMTimeout)
	clearTimeout(UMTimeout)
	clearTimeout(PMTimeout)
	clearTimeout(POTimeout)
	
	clearTimeout(temprefreshTimeout)
	clearTimeout(CMstarttimeout)
	clearTimeout(UMstarttimeout)
	clearTimeout(PMstarttimeout)
	
	clearInterval(refreshTimeInterval)
	clearInterval(timeSinceLastRefreshTime)
	
	clearInterval(POInterval)
	clearInterval(tabTableInterval)
	//my_poolsOverviewTable.page( 0 ).draw( 'page' )
}

function _2AgetPoolsRoundsData(){
	//log("2aS. in get pools")
	my_Pools = []
	return $.getJSON(poolsUrl, function (pools) {
		my_Pools = pools })
	.success(function(){
		//log("2aF. all pools:", my_Pools)
		if(my_Pools.length > 0){
			for (p in my_Pools){
				my_Pools[p].roundsCreated = 0
				
			}
			for (var a=0; a < my_Pools.length; a++){
				myTotTeams = my_Pools[a].totTeams
				if (myTotTeams > 0){
					my_poolsWithTeams.push(my_Pools[a])
					
					var newPool = {}
					newPool.name = my_Pools[a].name
					newPool.text = my_Pools[a].name //for pool Rankings dropdown
					newPool.id =  a
					newPool.poolId = my_Pools[a].poolId
					poolNamesArray.push(newPool)
				}
			}
			
			//var data = []
			if(ifMobile == true){
				$("#poolSelector").select2({
					placeholder: 'select a pool',
					data: poolNamesArray,
				})
				getPoolRankingsTable("", "")
			}
			/*for (var op = 0; op < poolNamesArray.length; op++){
				var newOption = new Option(poolNamesArray[op].text, poolNamesArray[op].id, false, false);
				$('.poolSelector').append(newOption)
			}*/
			
						
			/*$(".poolSelector-selected").select2({
				data: poolNamesArray, 
			})*/
			calculatePoolsStats(poolNamesArray)
		} else{
		noPools = true
		}
	})
}
			
function _2BgetAllMatchesData(){
	//log("2bS. in get matches")
	return $.getJSON(listMatchesUrl, function(matches){
		my_matchesRaw = matches})
	.success(function(){
		delete my_matchesRaw.iTotalDisplayRecords
		delete my_matchesRaw.iTotalRecords
		delete my_matchesRaw.sEcho
		//log("2bF. all matches:", my_matches)
		my_matches = my_matchesRaw.aaData
		//////////log(my_matches[l], "length:", my_matches[l].length)
		for (m in my_matches){
			var my_poolName = my_matches[m].pool
			var my_roundNrFString = my_matches[m].round
			
			var my_roundNrStr = my_roundNrFString.split(" ")
			my_roundNrLastStr = my_roundNrStr.pop() 
			var my_roundNr = Number(my_roundNrLastStr)
			//////////log(my_poolName+":", my_roundNr)
			my_nrofRoundsPerPool[my_poolName] = my_roundNr
			
			var DT_RowId =  my_matches[m].DT_RowId
			var DT_RowId1 = DT_RowId.split("-")
			my_matches[m].DT_RowId = Number(DT_RowId1[1])
			
			var localId = my_matches[m].localId
			var my_localId1 = localId.split("\'\)\">")
			var my_localId2 = my_localId1[1].split("</a>")
			my_matches[m].localId = Number(my_localId2[0])
		}
		//////////log(my_nrofRoundsPerPool)
		if(ifMobile == true){
			getPlayersTable("none")
		}
		//log("2. all matches loaded")
		//log("2. done with pools with teams", my_poolsWithTeams)		
	})
}

function _3AgetGData(){
	//log("3aS. in get GData")
	if (poolProperties == true){
		//log(poolProperties)
			Tabletop.init({
						key: googleSheetUrl,
						callback: function(data, tabletop) { 
						   ////log(data)
						   my_GoogleSheetData = data
						   //poolsOverviewTable(my_GoogleSheetData)
						},
						simpleSheet: true,
						parseNumbers: true
					})					
	} else{return "nothing"}
}

function _4AgetCurrentMatchesData(){
	//log("4aS. in get locations")
	return $.getJSON(listCurrentlyPlayingLocationsUrl, function (json){
			my_locationsList = json })
		.success(function(){
			if(my_locationsList.length == 0){
				noLocations = true
				
				var noCMData = {}
					noCMData.CourtName = "There are no courts set up."
					noCMData.poolPlaying = ""
					noCMData.poolName = ""
					noCMData.team1 = ""
					noCMData.vsColumn = ""
					noCMData.team2 = ""//noCMData.team1 = {name: "",players:[{name: ""},{name: ""}]}
					noCMData.teamOne2 = ""//noCMData.team2 = {name: "",players:[{name: ""},{name: ""}]}
					noCMData.vsColumn = ""
					noCMData.alreadyPlayingTime = ""
					noCMData.stdDevPredictedTimeLeft = ""
				
				allCMdata.push(noCMData)
				stopLoaders()
				alert("There are no courts set up. Please add locations in the Control>settings tab.")
				
				throw Error("There are no courts set up. Please add locations in the Control>settings tab.")
			} else {}
		})
}
function _4BgetListCurrentMatchesData(){
	//log("4bS. in get current matches")
	return $.getJSON(listCurrentlyPayingUrl, function (json){
			my_playingList = json })
		.success(function(){
			//log("4bF. current matches:", my_playingList)
			for (m = 0; m < my_playingList.length; m++){
				poolsPlaying = my_playingList[m].pool
				my_listCurrentMatches.push(poolsPlaying)
				my_Team1Name = my_playingList[m].team1.name
				my_Team2Name = my_playingList[m].team2.name
				my_teamsPlayingReadyPostponed.push(my_Team1Name)
				my_teamsPlayingReadyPostponed.push(my_Team2Name)
			}
			if(my_playingList.length > 0){
				noCurrentMatches = false
			} else {
				noCurrentMatches = true
			}
		//if(currentTable == true || upcomingTable == true || poolsTable == true){
		//}
		//log("4. done with locations and current matches")
		})
}

function _5AgetReadyPostponedFinishedMatchesData(){
	//log("5aS. in get readypostponedFinished")
	return $.getJSON(listReadyMatchesUrl, function(json){
			my_upcomingMatches = json })
		.success(function(){
			//log("5aF. Ready matches:", my_upcomingMatches)	
			if(my_upcomingMatches.length == 0){
				noUpcomingMatches = true
				//logUpcomingMatch = false
				var noUMData = {}
					noUMData.localId = "There are no upcoming matches planned"
					noUMData.matchId = ""
					noUMData.poolName = ""
					noUMData.status = ""
					noUMData.priority = ""
					noUMData.teamOne1 = ""//noUMData.team1 = {name: "",players:[{name: ""},{name: ""}]}
					noUMData.teamOne2 = ""//noUMData.team2 = {name: "",players:[{name: ""},{name: ""}]}
					noUMData.vsColumn = ""
					noUMData.teamTwo1 = ""
					noUMData.teamTwo2 = ""
					noUMData.status = ""
					noUMData.StdDevExpectedTime = ""
				
				allUMdata.push(noUMData)
			} else {
				noUpcomingMatches = false
				logUpcomingMatch = true
				for (var i = 0; i < my_upcomingMatches.length; i++){
					my_localName = my_upcomingMatches[i].pool
					myPlannedPoolNames.push(my_localName)
					var my_Team1Name = my_upcomingMatches[i].team1.name
					var my_Team2Name = my_upcomingMatches[i].team2.name
					my_teamsPlayingReadyPostponed.push(my_Team1Name)
					my_teamsPlayingReadyPostponed.push(my_Team2Name)
					
					unavailablePlayerFound = false
					for(var pl1 = 0; pl1 < my_upcomingMatches[i].team1.players.length; pl1++){
						if( my_upcomingMatches[i].team1.players[pl1].ready == false){
							my_unavPostponedMatches.push(my_upcomingMatches[i])
							unavailablePlayerFound = true
							break
						}
					}
					if(unavailablePlayerFound == false){
						for(var pl2 = 0; pl2 < my_upcomingMatches[i].team2.players.length; pl2++){
							if( my_upcomingMatches[i].team2.players[pl2].ready == false){
								my_unavPostponedMatches.push(my_upcomingMatches[i])
								break
							}
						}
					}
				}
			}
		})
}

function _5BgetPostponedMatchesData(){
	//log("5bS.in get postponed")
	return $.getJSON(listPostponedMatchesUrl, function(json){
			my_PostponedUpcomingMatches = json })
		.success(function(){
			//log("5bF. Postponed matches:", my_PostponedUpcomingMatches)
			if(my_PostponedUpcomingMatches.length > 0){
				for (var i2 = 0; i2 < my_PostponedUpcomingMatches.length; i2++){
					my_local2Name = my_PostponedUpcomingMatches[i2].pool
					myPlannedPoolNames.push(my_local2Name)
					var my_Team1Name = my_PostponedUpcomingMatches[i2].team1.name
					var my_Team2Name = my_PostponedUpcomingMatches[i2].team2.name
					my_teamsPlayingReadyPostponed.push(my_Team1Name)
					my_teamsPlayingReadyPostponed.push(my_Team2Name)
					my_unavPostponedMatches.push(my_PostponedUpcomingMatches[i2])
				}
			} else {}
		})
}		
	
function _5CgetPlayedMatchesData(){
	//log("5cS. in get Played")
	return $.getJSON(listPlayedMatchesUrl, function(json){
			my_playedMatches = json })
		.success(function(){
			//log("5cF. Played matches:", my_playedMatches)
			
			for(var p = 0; p < my_playedMatches.length; p++){
				var singlePlayedMatch = {}
				
				singlePlayedMatch.my_Poolname = my_playedMatches[p].pool
				singlePlayedMatch.my_roundNr =  my_playedMatches[p].round
				singlePlayedMatch.my_team1NameF = my_playedMatches[p].team1.name
				singlePlayedMatch.my_team2NameF = my_playedMatches[p].team2.name
				singlePlayedMatch.my_deltaStartTime = my_playedMatches[p].deltaStartTime
				//singlePlayedMatch.push(my_Poolname, my_roundNr, my_team1NameF, my_team2NameF)
				my_listPlayedFinishedMatches.push(singlePlayedMatch)
			}
			if(ifMobile == true){
				getPlayedMatchesTable()
			}
		})
}

function _5DgetFinishedMatchesData(){
	//log("5dS. in get Finished")
	return $.getJSON(listFinishedMatchesUrl, function(json){
			my_finishedMatches = json })
		.success(function(){
			//log("5dF. Finished matches:", my_finishedMatches)
			
			for(var f = 0; f < my_finishedMatches.length; f++){
				var singleFinishedMatch = {}
				
				singleFinishedMatch.my_Poolname = my_finishedMatches[f].pool
				singleFinishedMatch.my_roundNr =  my_finishedMatches[f].round
				singleFinishedMatch.my_team1NameF = my_finishedMatches[f].team1.name
				singleFinishedMatch.my_team2NameF = my_finishedMatches[f].team2.name
				//singleFinishedMatch.push(my_Poolname, my_roundNr, my_team1NameF, my_team2NameF)
				my_listPlayedFinishedMatches.push(singleFinishedMatch)
			}
		//log("5. done with ready postponed played finished")
		})
}

function _6AgetplayersRanking(){
	return $.getJSON(listPlayersRankingUrl, function(json){
			my_playersRanking = json })
		.success(function(){
			for (key in my_playersRanking){
				var singlePlayerRanking = {}
					
				singlePlayerRanking.rank = my_playersRanking[key].rank
				singlePlayerRanking.playerId = my_playersRanking[key].playerId
				singlePlayerRanking.name = my_playersRanking[key].name
				singlePlayerRanking.cleanName = my_playersRanking[key].name.replace(/".*"/, "")
				singlePlayerRanking.sumPoints = my_playersRanking[key].sumPoints
				singlePlayerRanking.nrSets = my_playersRanking[key].nrSets
				singlePlayerRanking.relative = my_playersRanking[key].relative
				singlePlayerRanking.gender = my_playersRanking[key].gender
				
				if(singlePlayerRanking.gender == "M"){
					singlePlayerRanking.gender = "Male"
				} else if(singlePlayerRanking.gender == "F"){
					singlePlayerRanking.gender = "Female"
				}
				
				my_listPlayersRanking.push(singlePlayerRanking)
			}
			if(ifMobile == true){
				getPlayersRankingTable(my_listPlayersRanking)
			}
		})
}

function _6BgetGroupRankings(){
	/*return $.getJSON(listPlayerRankingsUrl, function(json){
		my_playerRankings = json })
		.success(function(){})*/
}

function _6CgetPoolWinners(){
	/*return $.getJSON(listPoolWinnersUrl, function(json){
		my_poolWinners = json })
		.success(function(){
			log("6dF. Pool Winners:", my_poolWinners)
			for(var w = 0; w < my_poolWinners.length; w++)
				var singlepoolWinner = {}
				
				singlepoolWinner.my_matchesWon = my_poolWinners[w].matchesWon
				singlepoolWinner.my_matchesDraw = my_poolWinners[w].matchesDraw
				singlepoolWinner.my_matchesLost = my_poolWinners[w].matchesLost
				singlepoolWinner.my_setsWon = my_poolWinners[w].setsWon
				singlepoolWinner.my_setsLost = my_poolWinners[w].setsLost
				singlepoolWinner.my_pointsWon = my_poolWinners[w].pointsWon
				singlepoolWinner.my_pointsLost = my_poolWinners[w].poinsLost
				singlepoolWinner.my_matchesPlayed = my_poolWinners[w].matchesPlayed
				singlepoolWinner.my_matchesRelative = my_poolWinners[w].matchesRelative
				singlepoolWinner.my_matchesPlayed = my_poolWinners[w].matchesRelative
				singlepoolWinner.my_pointsRelative = my_poolWinners[w].pointsRelative
				singlepoolWinner.my_rank = my_poolWinners[w].rank
		})*/
}

function _7finalConfigurations(){
	if(my_unavPostponedMatches.length == 0){
				//log("no unavPost matches")
				noUnavPostponedMatches = true
				var noPMData = {}
					noPMData.matchNr = "There are no unavilable players or postponed matches"
					noPMData.PoolName = ""
					noPMData.status = ""
					noPMData.priority = ""
					noPMData.teamOne1 = ""//noPMData.team1 = {name: "",players:[{name: ""},{name: ""}]}
					noPMData.teamOne2 = ""//noPMData.team2 = {name: "",players:[{name: ""},{name: ""}]}
					noPMData.vsColumn = ""
					noPMData.teamTwo1 = ""
					noPMData.teamTwo2 = ""
					noPMData.status = ""
					noPMData.comment = ""
				
				allPMdata.push(noPMData)
			} else {
				noUnavPostponedMatches = false
			}
}

function makeTables(){
	log("making tables...")
	getCurrentMatchesTable()

	if(upcomingTable == true || poolsTable == true || postponedTable == true){
		shrinkUpcomingsTable = false
		getUpcomingMatchesTable()
	}
	
	if(postponedTable == true){
		getPostponedMatchesTable()
	}
	if(poolsTable == true){
		getPoolsOverviewTable()
	}
	setrefreshTablesInterval()
}

function getAPIDataAndMakeTables(){	
	log("getting api...")
	try{
		clearInterval(reloadDataInterval)
	} catch (err){}
	
	$.when(
		$.when(_1emptyVars())
		.then(function(){
			//log("finished request 1")
		}),
		
		$.when(_2AgetPoolsRoundsData(), _2BgetAllMatchesData())	
		.then(function(){
			//log("finished requests 2")
		}),
		
		/*$.when(_3AgetGData())
		.then(function(){
			log("finished requests 3", my_GoogleSheetData)
		}),*/
		
		$.when(_4AgetCurrentMatchesData(), _4BgetListCurrentMatchesData())
		.then(function(){
			//log("finished requests 4")
		}),
		
		$.when(_5AgetReadyPostponedFinishedMatchesData(), _5BgetPostponedMatchesData(), _5CgetPlayedMatchesData(), _5DgetFinishedMatchesData())
		.then(function(){
			//log("finished requests 5")
		}),
		
		$.when(_6AgetplayersRanking(), /*_6BgetGroupRankings(), _6CgetPoolWinners()*/)
		.then(function(){
			//log("finished requests 6")
		})

	).then(function(){
		_7finalConfigurations()
		reloadedData = true
		reloadDataCount += 1;
		makeTables()
	})
}
