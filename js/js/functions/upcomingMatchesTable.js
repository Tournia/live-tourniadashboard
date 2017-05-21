/**Upcoming matches table**/
function getUpcomingMatchesTable(){
	log("making upcoming matches table...")
	UMTableCount +=1
	try{
		my_upcomingMatchesTable.destroy()
	} catch (err){
	}
		my_OffsetTop = $("#upcomingMatchesTable").offset().top
		UnlistedMatchCount += 0
		my_UMRows = []
		//allUMdata = []
		
		var inTotCount_UM = 0
		var totUnavailable_UM = 0
				
		var inCount_UM = []
		var inReadyCount_UM = []
		var inPlayCount_UM = []
		var unavailable_UM = []
		var Playing	= false
		
		var inFirstCount_UM = 0
		var inSecondCount_UM = 0
		var expectedTimesArray = []
		var predictedTimesArray = []
		var totalTimesArray = []
		var playersPlayingExpectedTimes = []
		var smallestExpectedTimesArray = []
		var shiftStartTime = 0
		var shiftUpcomingMatchInfoObjects = []
		var shift1upcomingMatchInfoObjects = []
		var ppUpcomingMatchInfoArray = []
		var rtpUpcomingMatchInfoArray = []
		var addIndex = 0
		var shift1ppCount = 0
		var altshift2count = 0
		var altshift2ppCount = 0
		var shift1rtp = 0
		var nrOfCourts = availableLocationsCount
		var freeCourtsAvailable = 0
		
		var UM_loopStartLog = []
		var UM_loopStopLog = []
		if(firstLoad == true){
			arraycount = 1
			firstLoad = false
		} else {
			//////log("after first", typeof arraycount)
			arraycount += 1
			mycurrentLocalIDArray = []
		}
		var mycurrentLocalIDArray = []
		var my_currentStringsArray = []
		var my_currentStringObjectsArray = []
		var allStartArrays = []
		
		for(pt = 0; pt < predictedTimeLeftArray.length; pt++){
			if(predictedTimeLeftArray[pt] == 0){
				freeCourtsAvailable +=1
			}
		}
		////////log("available nr. of courts:", nrOfCourts)
		//////log("available nr. of free courts:", freeCourtsAvailable)
		
		var	playerNamesCurrentlyPlayingArray = []
		var playerNamesCurrentlyUnavailableArray = []
		var playerNamesReadyToPlayArray = []
		
		////log(my_upcomingMatches)
		if(noUpcomingMatches == true){
			 
		}
		
		for (var um = 0; um < my_upcomingMatches.length; um++){
					//////log("processing new match..",  my_upcomingMatches.length)
				var singleUMData = {}
				var statusPlayers = [];
				var playerNamesCurrentlyPlayinginMatchArray = []
				var playersPlayingObects = []
				var predictedTimeLeftofPlayingPlayersArray = []
				var my_UMrowNumber = um + 1
				var my_PoolName = my_upcomingMatches[um].pool
				
				
				var poolPropertiesObject = findPoolProperties(my_PoolName)
				singleUMData.poolProperties = poolPropertiesObject
				
				if(poolPropertiesObject.altNames[0] == "Average Pool"){
					var abbrPoolName = my_PoolName
				} else {
					var abbrPoolName = poolPropertiesObject.abbreviations[0]
				}
				
				//var abbrPoolName = getPoolNameAbbr(my_PoolName)
				
				var UMrow_id = "UMrow-" + my_UMrowNumber
				//tri = $('<tr id=' + UMrow_id + '/>');
				// um nr
				//tri.append("<td class='vsColumn'>" + my_UMrowNumber + "</td>")
				singleUMData.UMNr = my_UMrowNumber
				singleUMData.matchNr = my_upcomingMatches[um].localId
				
				if(ifMobile == false){
					singleUMData.PoolName = my_PoolName 
				} else {
					singleUMData.PoolName = abbrPoolName 
				}
				singleUMData.abbrPoolName = abbrPoolName
				//tri.append("<td>" + my_upcomingMatches[um].localId + "</td>");
				//////////log("processing first team...")
				
				//Get Status players functions
				
				/*function getPlayingStatus(playerName, secondTd){
					var TdInput = "<td class='playerColumn'"+ playerPlayingSpan + playerName + "</span></td>"+secondTd
					var playerStatus = "Player playing"
					statusPlayers.push(playerStatus)	
						return TdInput
				}
				function getStatusNonReady(playerName, secondTd){
					var TdInput = playerName + secondTd
					var playerStatus = "Player not ready"
					statusPlayers.push(playerStatus)
						return TdInput
				}
				function getReadyToStartStatus(playerName, secondTd){
					var TdInput = "<td class='playerColumn'>" + playerName + secondTd
					var playerStatus = "Ready to start"
					statusPlayers.push(playerStatus)	
						return TdInput
				}*/
				
				//Put status in Table
				function getStatus(fullPlayerName, playerName, amountPlayers, playerCurrentlyPlaying, playerReady, TdInput, playerStatus){
							if(playerCurrentlyPlaying == true){
								playerNamesCurrentlyPlayinginMatchArray.push(fullPlayerName)
								playerNamesCurrentlyPlayingArray.push(fullPlayerName)
								var playerStatus = "player playing"
								statusPlayers.push(playerStatus)	
									return playerName
							} else {
								if(playerReady == false){
									playerNamesCurrentlyUnavailableArray.push(fullPlayerName)	
									var playerStatus = "player not ready"
									statusPlayers.push(playerStatus)
										return playerName
								} else {
									playerNamesReadyToPlayArray.push(fullPlayerName)	
									var playerStatus = "ready to start"
									statusPlayers.push(playerStatus)
										return playerName
								}
							}

				}
				//Name Team 1 column
				var my_T1count = 0
				for (var t1 = 0; t1 < my_upcomingMatches[um].team1.players.length; t1++){
						my_T1count +=1
						var playerNickNameTeam1 = my_upcomingMatches[um].team1.players[t1].name
						var playerNameTeam1 = playerNickNameTeam1.replace(/".*"/, "")
						var t1PlayerCurrentlyPlaying = my_upcomingMatches[um].team1.players[t1].currentlyPlaying
						//////////log(playerNameTeam1, "playing:", t1PlayerCurrentlyPlaying)
						var t1PlayerReady = my_upcomingMatches[um].team1.players[t1].ready
						//////////log(playerNameTeam1, "ready:", t1PlayerReady)
						var amountT1Players = my_upcomingMatches[um].team1.players.length
						var Td1Input, t1PlayerStatus
						var my_t1Input = getStatus(playerNickNameTeam1, playerNameTeam1, amountT1Players, t1PlayerCurrentlyPlaying, t1PlayerReady, Td1Input, t1PlayerStatus)
				//tri.append(my_t1Input)
					if(my_upcomingMatches[um].team1.players.length == 1){
						singleUMData.teamOne1 = my_t1Input
						singleUMData.teamOne2 = ""
					} else if(my_upcomingMatches[um].team1.players.length > 1 && my_T1count == 1){
						singleUMData.teamOne1 = my_t1Input
					} else if (my_upcomingMatches[um].team1.players.length > 1 && my_T1count == 2){
						singleUMData.teamOne2 = my_t1Input
					}
				}
				if(my_upcomingMatches[um].team1.players.length == 0){
						my_t1Input = ""
						singleUMData.teamOne1 = ""
						singleUMData.teamOne2 = ""
				}
				
				//vs column
				//tri.append("<td class='vsColumn'>" + "<b>vs.</b>" + "</td>");
				singleUMData.vsColumn = "vs."
				
				//Name Team 2 Column
				var my_T2count = 0
				for (var t2 = 0; t2 < my_upcomingMatches[um].team2.players.length; t2++){
						my_T2count +=1
						var playerNickNameTeam2 = my_upcomingMatches[um].team2.players[t2].name
						var playerNameTeam2 = playerNickNameTeam2.replace(/".*"/, "")
						var t2PlayerCurrentlyPlaying = my_upcomingMatches[um].team2.players[t2].currentlyPlaying
						//////////log(playerNameTeam2, "playing:", t2PlayerCurrentlyPlaying)
						var t2PlayerReady = my_upcomingMatches[um].team2.players[t2].ready
						//////////log(playerNameTeam2, "ready:", t2PlayerReady)
						var amountT2Players = my_upcomingMatches[um].team2.players.length
						var Td2Input, t2PlayerStatus
						var my_t2Input = getStatus(playerNickNameTeam2, playerNameTeam2, amountT2Players, t2PlayerCurrentlyPlaying, t2PlayerReady, Td2Input, t2PlayerStatus)
				//tri.append(my_t2Input);
				if(my_upcomingMatches[um].team2.players.length == 1){
					singleUMData.teamTwo1 = my_t2Input
					singleUMData.teamTwo2 = ""
				} else if(my_upcomingMatches[um].team2.players.length > 1 && my_T2count == 1){
					singleUMData.teamTwo1 = my_t2Input
				} else if (my_upcomingMatches[um].team2.players.length > 1 && my_T2count == 2){
					singleUMData.teamTwo2 = my_t2Input
				}
				}
				if(my_upcomingMatches[um].team2.players.length == 0){
						my_t2Input = ""
						singleUMData.teamTwo1 = ""
						singleUMData.teamTwo2 = ""
				}
				
				//Status column
				var priorityMatch = my_upcomingMatches[um].priority
				var playersPlaying = inArray("player playing", statusPlayers)
				var playersNotReady = inArray("player not ready", statusPlayers)
					if (playersNotReady == true){
						singleUMData.unavailablePlayers = true;
						singleUMData.playersPlaying = false;
						singleUMData.readyToPlay = false;
						var my_statusText = playersUnavailable
						var my_status = my_statusText
						//////////log("unavailable:", my_status)
					} else if (playersPlaying == true){
						singleUMData.unavailablePlayers = false;
						singleUMData.playersPlaying = true;
						singleUMData.readyToPlay = false;
						var my_statusText = playersCurrentlyPlaying
						var my_status = my_statusText
					} else {
						singleUMData.unavailablePlayers = false;
						singleUMData.playersPlaying = false;
						singleUMData.readyToPlay = true;
						var my_statusText = readyToPlay
						var my_status = my_statusText
						//////////log("ready:", my_status)
					}
				singleUMData.status = my_status
				
				/*if(showStatusPlayersColumn == true){
					//tri.append("<td class='statusColumn'" + my_status + "</td>");
					singleUMData.status = my_status
				} else {
					document.getElementById("playerStatusColumn").style.display = "none"
				}*/
				
				//Expected Time column
				var upcomingMatchNr = um + 1 // looks at first for loop [um]
				var totalUmCount = my_upcomingMatches.length
				var shiftsCount = Math.ceil(totalUmCount / nrOfCourts) //count the amount of shifts that are needed to play all upcoming matches with the current amount of available courts. 
				
				var timeBetweenMatches = 2 * 60 // time used for expected times between matches
				var pauseTime = 5 * 60 //time used for expected times and player is still playing
				
				var inCount = false //is match counted in expected times?
				var inShift = [] // create dynamic variable to create the right amount of shift variables tat check if match is in the Xth shift
				var shiftCount = 0
				for(s = 1; s <= shiftsCount; s++){
					var my_shiftNumber = s
					//inShift[my_shiftNr] = false; //is match counted in shift nr for expected times?
				}
				var secondpart = false
				var freeCourt = false
				var upcomingMatchInfo = {
					UMNr: upcomingMatchNr,
					readyToPlay: false,
					playersPlaying: false,
					playersUnavailable: false,
					pool: singleUMData.PoolName
					
				}
				//var inFirstCount = false 
				//var inSecondCount = false //is match counted in after first nrOfCourts expected times?
				var inPlayCount = false //is match counted in expected times while players are playing?
				var inUnavailable = false // is match NOT counted in expected times because players are unavailable?
				var my_finalExpectedTimeSecs = ""
				var stars = ""
				var showShift1Text = true
				
				
				
				////////log("\n-----------------------------------\n\nprocessing upcoming match number", upcomingMatchNr, my_PoolName)
				if(inCount_UM.length == 0){
					////////log("in first creating variables")
					inCount_UM[1] = 0
					inReadyCount_UM[1] = 0
					inPlayCount_UM[1] = 0
					unavailable_UM[1] = 0
					predictedTimesArray[1] = []
					expectedTimesArray[1] = []
					totalTimesArray[1] = []
				////////log("nr of available courts:", nrOfCourts)
				////////log("nr of potentially free courts:", freeCourtsAvailable)
				////////log("total um count:", totalUmCount)
				////////log("total amount of shifts based on amount of upcoming matches:", shiftsCount)
				////////log("\n")
				} else if(upcomingMatchNr <= nrOfCourts + unavailable_UM[1]){
					var processCount = []
					processCount[shiftNr] = inCount_UM[shiftNr] + unavailable_UM[shiftNr]
					////////log("inR+inP+inU=inPr so far in shift", shiftNr+":", inReadyCount_UM[shiftNr]+"+"+inPlayCount_UM[shiftNr]+"+"+unavailable_UM[shiftNr],"=", processCount[shiftNr])
					if((inReadyCount_UM[shiftNr]+inPlayCount_UM[shiftNr]+unavailable_UM[shiftNr]) != processCount[shiftNr]){
						////////log("Error in processing count in shiftnr>:", shiftNr)
						alert("Error in processing count in shiftnr>:", shiftNr)
					}
					
					////////log("nr of potentially free courts:", freeCourtsAvailable)
					////////log("total amount of matches that are predicted so far:", inTotCount_UM)
					////////log("total amount of matches that are predicted so far in shift "+shiftNr+":", inCount_UM[shiftNr])
					////////log("amount of matches that are predicted so far and are ready in shift "+shiftNr+":", inReadyCount_UM[shiftNr])
					////////log("amount of matches that are predicted so far but are still playing in shift "+shiftNr+":", inPlayCount_UM[shiftNr])
					////////log("predicted times array(" + predictedTimeLeftArray.length + "):", predictedTimeLeftArray)
				}
				
				if(upcomingMatchNr <= nrOfCourts + unavailable_UM[1]){ // look at first shift of upcoming matches excluding posptoned match that fits nr of available courts 
					secondpart = false
					if(upcomingMatchNr == nrOfCourts + unavailable_UM[1]){
						showShift1Text = true
					}
					var shiftNr = 1
					upcomingMatchInfo.shiftNumber = shiftNr
					
					inShift[shiftNr] = true
					////////log("in shiftNr:", shiftNr)
					if(totUnavailable_UM > 0){
						stars = "**" //adds note about this match.
					} else {
						stars=""
					}
					if(my_statusText == readyToPlay){
						if(upcomingMatchNr == nrOfCourts + unavailable_UM[1]){
							showShift1Text = false
						}
						////////log("in Shift 1 ready to play")
						inCount = true; inTotCount_UM +=1; inCount_UM[shiftNr] +=1; inReadyCount_UM[shiftNr]+=1
						inFirstCount = true; inFirstCount_UM +=1
						upcomingMatchInfo.readyToPlay = true
						if(freeCourtsAvailable > 0){
							var my_expectedTime = "free court available"
							freeCourt = true
							stars = ""
							freeCourtsAvailable -=1
			
							expectedTimesArray[shiftNr].push(0)
							upcomingMatchInfo.expectedTime = 0
							upcomingMatchInfo.predictedTime = poolPropertiesObject
							
							predictedTimesArray[shiftNr].push(poolPropertiesObject.avgTime)
							
							var my_totalTime = Math.ceil(0 + (poolPropertiesObject.avgTime))
							upcomingMatchInfo.totalTime = my_totalTime
							totalTimesArray[shiftNr].push(my_totalTime)
							
							shift1upcomingMatchInfoObjects.push(upcomingMatchInfo)
							rtpUpcomingMatchInfoArray.push(upcomingMatchInfo)
							my_finalExpectedTimeSecs = my_expectedTime
						} else {
							var my_expectedTime = predictedTimeLeftArray[inCount_UM[shiftNr] - 1] + timeBetweenMatches
							expectedTimesArray[shiftNr].push(my_expectedTime)
							upcomingMatchInfo.expectedTime = my_expectedTime
							upcomingMatchInfo.predictedTime = poolPropertiesObject
							predictedTimesArray[shiftNr].push(poolPropertiesObject.avgTime)
							var my_totalTime = Math.ceil((my_expectedTime) + (poolPropertiesObject.avgTime))
							upcomingMatchInfo.totalTime = my_totalTime
							
							shift1upcomingMatchInfoObjects.push(upcomingMatchInfo)
							totalTimesArray[shiftNr].push(my_totalTime)
							rtpUpcomingMatchInfoArray.push(upcomingMatchInfo)
							
							my_finalExpectedTimeSecs = Math.ceil(my_expectedTime)
						}
					} else if(my_statusText == playersCurrentlyPlaying){
						if(upcomingMatchNr == nrOfCourts + unavailable_UM[1]){
							showShift1Text = false
						}
						////////log("in shift 1 player playing")
						inCount = true; inTotCount_UM +=1; inCount_UM[1] +=1
						inFirstCount = true; inFirstCount_UM +=1
						inPlayCount = true; inPlayCount_UM[shiftNr] +=1
						upcomingMatchInfo.playersPlaying = true; Playing = true;
						////////log("playing player names:", playerNamesCurrentlyPlayingArray)
						var my_freeCourtExpectedTime = predictedTimeLeftArray[inCount_UM[1] - 1] + timeBetweenMatches // needed if this will be higher than expected time with predicted time
						
						var my_predictedTime = findPlayersPlaying(playerNamesCurrentlyPlayinginMatchArray, my_locationsList, playersPlayingObects, predictedTimeLeftofPlayingPlayersArray)
						var my_predictedExpectedTime = my_predictedTime + pauseTime + timeBetweenMatches
						
						if(my_freeCourtExpectedTime >= my_predictedExpectedTime){ // if free court expected time is higher than predicted time, this will be my expecte time 
							var my_expectedTime = my_freeCourtExpectedTime	
						} else { // predicted time is higher and thus my expected time 
							var my_expectedTime = my_predictedExpectedTime
						}
						my_finalExpectedTimeSecs = Math.ceil(my_expectedTime)
						upcomingMatchInfo.UMCount1 = inCount_UM[1]
						
						upcomingMatchInfo.expectedTime = my_expectedTime
						expectedTimesArray[shiftNr].push(my_expectedTime)
						upcomingMatchInfo.predictedTime = poolPropertiesObject
						predictedTimesArray[shiftNr].push(poolPropertiesObject.avgTime)
						var my_totalTime = Math.ceil((my_expectedTime) + (poolPropertiesObject.avgTime))
						upcomingMatchInfo.totalTime = my_totalTime
						totalTimesArray[shiftNr].push(my_totalTime)
						
						shift1upcomingMatchInfoObjects.push(upcomingMatchInfo)
						playersPlayingExpectedTimes.push(my_expectedTime)
						ppUpcomingMatchInfoArray.push(upcomingMatchInfo)
					} else if(my_statusText == playersUnavailable){
						if(upcomingMatchNr == nrOfCourts + unavailable_UM[1]){
							showShift1Text = false
						}
						upcomingMatchInfo.playersUnavailable = true
						////////log("in shift 1 player unavailable")

						inUnavailable = true; totUnavailable_UM +=1; unavailable_UM[1] +=1
						
						my_finalExpectedTimeSecs = "unknown"
						upcomingMatchInfo.expectedTime = "unknown"
						upcomingMatchInfo.predictedTime = "unknown"
						upcomingMatchInfo.totalTime = "unknown"
					}
					//shiftUpcomingMatchInfoObjects[shiftNr].push(upcomingMatchInfo)
					//upcomingMatchInfoObjects.push(upcomingMatchInfo)
					if(upcomingMatchNr == (nrOfCourts + unavailable_UM[1])){
						////////log("end of shift 1")
						////////log("upcomingMatchesInfoObjects:", upcomingMatchInfoObjects)
						////////log("expected times array:", expectedTimesArray[shiftNr])
						////////log("predicted times array:", predictedTimesArray[shiftNr])
						
						playersPlayingExpectedTimes.sort(function(a, b){return a-b})
						totalTimesArray[shiftNr].sort(function(a, b){return a-b})
						////////log("total times array:", totalTimesArray[shiftNr])
						
						smallestExpectedTimesArray[shiftNr] = expectedTimesArray[shiftNr]
						smallestExpectedTimesArray[shiftNr].sort(function(a, b){return a-b})
						
						shift1upcomingMatchInfoObjects.sort(function(a, b){return a.totalTime - b.totalTime})
						rtpUpcomingMatchInfoArray.sort(function(a, b){return a.totalTime - b.totalTime})
						shift1ppCount = ppUpcomingMatchInfoArray.length
						ppUpcomingMatchInfoArray.sort(function(a, b){return a.predictedTime.time - b.predictedTime.time})
						////////log(shift1upcomingMatchInfoObjects, rtpUpcomingMatchInfoArray, ppUpcomingMatchInfoArray)
						
						shiftStartTime += ((totalTimesArray[shiftNr][0]))
						////////log("shift2 starttime:", shiftStartTime)
					}
				} else if(upcomingMatchNr > (nrOfCourts + unavailable_UM[1])){ //look after the first shift
						secondpart = true
						shiftNr +=1
						if(shiftNr >=3){
							Playing = false
						}
						upcomingMatchInfo.shiftNumber = shiftNr
						////////log("in shiftNr:", shiftNr)
						////////log("Shift start time:", Math.ceil(shiftStartTime / 60), "mins.")
						if(typeof inCount_UM[shiftNr] == 'undefined'){
							////////log("in shift "+ shiftNr + " creating variables")
							inCount_UM[shiftNr] = 0
							inReadyCount_UM[shiftNr] = 0
							inPlayCount_UM[shiftNr] = 0
							unavailable_UM[shiftNr] = 0
							totalTimesArray[shiftNr] = []
							expectedTimesArray[shiftNr] = []
							predictedTimesArray[shiftNr] = []
						}
						
						var processCount = []
						processCount[shiftNr] = inCount_UM[shiftNr] + unavailable_UM[shiftNr]
						////////log("inR+inP+inU=inPr so far in Shift", shiftNr+":", inReadyCount_UM[shiftNr]+"+"+inPlayCount_UM[shiftNr]+"+"+unavailable_UM[shiftNr],"=", processCount[shiftNr])
						if((inReadyCount_UM[shiftNr]+inPlayCount_UM[shiftNr]+unavailable_UM[shiftNr]) != processCount[shiftNr]){
							////////log("Error in processing count in shiftnr>:", shiftNr)
							alert("Error in processing count in shiftNr.:", shiftNr)
						}
						
						////////log("nr of potentially free courts:", freeCourtsAvailable)
						////////log("total amount of matches that are predicted so far:", inTotCount_UM)
						////////log("total amount of matches that are predicted so far in shift "+shiftNr+":", inCount_UM[shiftNr])
						////////log("amount of matches that are predicted so far and are ready in shift "+shiftNr+":", inReadyCount_UM[shiftNr])
						////////log("amount of matches that are predicted so far but are still playing in shift "+shiftNr+":", inPlayCount_UM[shiftNr])
						
						////////log("predicted times array(" + predictedTimeLeftArray.length + "):", predictedTimeLeftArray)
						
						var inFirstUM = false
						prevShiftNr = shiftNr - 1
						
						var prevShiftUpperBound = ((prevShiftNr * nrOfCourts) + (totUnavailable_UM - unavailable_UM[shiftNr]))
						var greaterThanPrevShift = (upcomingMatchNr > prevShiftUpperBound)
						
						var nextShiftLowerBound = ((shiftNr * nrOfCourts) + totUnavailable_UM)
						var smallerEquThanNextShift =  ((upcomingMatchNr - inTotCount_UM) <= nextShiftLowerBound)
						
						////////log(">:"+ greaterThanPrevShift, "<=:"+smallerEquThanNextShift)
						if(greaterThanPrevShift == true && smallerEquThanNextShift == true){
							if(totUnavailable_UM > 0){
								stars = "**" //adds note about this match.
							} else {
								stars=""
							}
							if(my_statusText == readyToPlay){
								////////log("in Shift", shiftNr, "ready to play")
								inCount = true; inTotCount_UM +=1; inCount_UM[shiftNr] +=1; inReadyCount_UM[shiftNr] +=1;
								upcomingMatchInfo.readyToPlay = true
								if(freeCourtsAvailable > 0){
									var my_expectedTime = "free court available"
									freeCourt = true
									stars = ""
									freeCourtsAvailable -=1
									
									expectedTimesArray[shiftNr].push(0)
									upcomingMatchInfo.expectedTime = 0
									upcomingMatchInfo.predictedTime = poolPropertiesObject
									predictedTimesArray[shiftNr].push(poolPropertiesObject.avgTime)
									
									var my_totalTime = Math.ceil(0 + (poolPropertiesObject.avgTime))
									upcomingMatchInfo.totalTime = my_totalTime
									totalTimesArray[shiftNr].push(my_totalTime)
									
									//shiftUpcomingMatchInfoObjects[shiftNr].push(upcomingMatchInfo)
									upcomingMatchInfoObjects.push(upcomingMatchInfo)
									
									my_finalExpectedTimeSecs = my_expectedTime

								} else {
									if (Playing == true){
										altshift2count +=1
										if(prevShiftNr == 1){
											////////log("in alt. shift2", shift1ppCount, altshift2count, altshift2ppCount)
											////////log("nr.", inCount_UM[shiftNr] - 1,inCount_UM[shiftNr] - altshift2ppCount - 1,   shift1upcomingMatchInfoObjects[inCount_UM[shiftNr] - 1].expectedTime)
											////////log("nr2.", shift1upcomingMatchInfoObjects,  shift1upcomingMatchInfoObjects[inCount_UM[shiftNr] - altshift2ppCount - 1].expectedTime)
											var my_prevExpectedTime = shift1upcomingMatchInfoObjects[inCount_UM[shiftNr] - altshift2ppCount - 1].expectedTime
											var my_potExpectedTime = my_prevExpectedTime + timeBetweenMatches
											
											////////log("prev expected time: ", (my_potExpectedTime / 60))
											
											if(ppUpcomingMatchInfoArray.length > 0){
												altshift2ppCount +=1
												var my_playingExpectedTime = ppUpcomingMatchInfoArray[0].expectedTime
												if (my_playingExpectedTime > my_potExpectedTime){
													////////log("shift 2 match is first")
													ppUMCountNr = ppUpcomingMatchInfoArray[0].UMCount1
													////////log(ppUMCountNr)
													my_expectedTime = predictedTimeLeftArray[ppUMCountNr
													 - 1] + timeBetweenMatches
													upcomingMatchInfo.predictedTime = poolPropertiesObject
													upcomingMatchInfo.expectedTime = my_playingExpectedTime
													////////log("hatza:", upcomingMatchInfo, rtpUpcomingMatchInfoArray)
													rtpUpcomingMatchInfoArray.push(upcomingMatchInfo)
													rtpUpcomingMatchInfoArray.sort(function(a, b){return a.totalTime - b.totalTime})								
												} else {
													////////log("shift 2 match is after")
													my_playingExpectedTime = ppUpcomingMatchInfoArray[0].expectedTime
													
													my_expectedTime = totalTimesArray[1][0] + my_playingExpectedTime + timeBetweenMatches
													////////log(shiftStartTime, my_playingExpectedTime, my_expectedTime)				
												}
												ppUpcomingMatchInfoArray.shift()
											} else {
												////////log("shift 2 match follows regular pattern after playing matches")
												var my_rtpTotalTime = rtpUpcomingMatchInfoArray[shift1rtp].totalTime 
												var my_expectedTime = shiftStartTime + my_rtpTotalTime + timeBetweenMatches
												//rtpUpcomingMatchInfoArray.shift()
												shift1rtp =+1
											}
										} else {									
											////////log("shift 1 has no players playing")
											var my_expectedTime = shiftStartTime + ((totalTimesArray[prevShiftNr][inCount_UM[shiftNr] - 1]) - shiftStartTime) + timeBetweenMatches
										}	
									} else {
										////////log("in shift 3 or later")
										shift1ppCount = 0
										if (shiftNr == 3){
											if(inCount_UM[3] == nrOfCourts - altshift2ppCount){
												////////log("before index")
												function addanIndex(){
													////////log("in index function")
													if(addIndex < altshift2ppCount){
														////////log("adding index")
														addIndex +=1
														var my_AddedExpectedTime = shiftStartTime + ((totalTimesArray[prevShiftNr][inCount_UM[shiftNr] + addIndex - 1]) - shiftStartTime) + timeBetweenMatches
														////////log(my_expectedTime)
														addanIndex()
														expectedTimesArray[shiftNr].push(my_AddedExpectedTime)
														my_AddedPredictedTime = predictedTimesArray[prevShiftNr][inCount_UM[shiftNr] + addIndex - 1]
														predictedTimesArray[shiftNr].push(my_AddedPredictedTime)
														totalTimesArray[shiftNr].push(my_AddedExpectedTime + my_AddedPredictedTime)
														//totalTimesArray.sort()
														////////log(expectedTimesArray[shiftNr], predictedTimesArray[shiftNr], totalTimesArray[shiftNr])
													}
												}
											addanIndex()
											}
										} else {
											var my_expectedTime = shiftStartTime + ((totalTimesArray[prevShiftNr][inCount_UM[shiftNr] - 1]) - shiftStartTime) + timeBetweenMatches
										}
									}
									
									////////log("expected time:", shiftStartTime, totalTimesArray[prevShiftNr][inCount_UM[shiftNr] - 1], my_expectedTime)
									expectedTimesArray[shiftNr].push(my_expectedTime)
									upcomingMatchInfo.expectedTime = my_expectedTime
									expectedTimesArray[shiftNr].sort()
									
									my_predictedPlayingTime = poolPropertiesObject.avgTime
									predictedTimesArray[shiftNr].push(my_predictedPlayingTime)
									upcomingMatchInfo.predictedTime = poolPropertiesObject.avgTime
									
									var my_totalTime = Math.ceil((my_expectedTime) + (my_predictedPlayingTime))
									upcomingMatchInfo.totalTime = my_totalTime
									totalTimesArray[shiftNr].push(my_totalTime)
									totalTimesArray[shiftNr].sort()
									
									//shiftUpcomingMatchInfoObjects[shiftNr][shiftNr].push(upcomingMatchInfo)
									upcomingMatchInfoObjects.push(upcomingMatchInfo)
									my_finalExpectedTimeSecs = Math.ceil(my_expectedTime)	
								}					
							} else if(my_statusText == playersCurrentlyPlaying){
								////////log("in shift " + shiftNr+" player playing")
								inCount = true;	inCount_UM[shiftNr] +=1; inTotCount_UM +=1
								inPlayCount = true;	inPlayCount_UM[shiftNr] +=1
								upcomingMatchInfo.playersPlaying = true

								////////log("playing player names:", playerNamesCurrentlyPlayingArray)
								var my_freeCourtExpectedTime = predictedTimeLeftArray[inCount_UM[shiftNr] - 1] + timeBetweenMatches // needed if this will be higher than expected time with predicted time
								
								var my_predictedTime = findPlayersPlaying(playerNamesCurrentlyPlayinginMatchArray, my_locationsList, playersPlayingObects, predictedTimeLeftofPlayingPlayersArray)
								var my_readyExpectedTime
								if (Playing == true){
										altshift2count +=1
										if(prevShiftNr == 1){
											//////////log("in alt. shift2", shift1ppCount, altshift2count, altshift2ppCount)
											//////////log("nr.", inCount_UM[shiftNr] - 1,inCount_UM[shiftNr] - altshift2ppCount - 1,   shift1upcomingMatchInfoObjects[inCount_UM[shiftNr] - 1].expectedTime)
											////////log("nr2.", shift1upcomingMatchInfoObjects,  shift1upcomingMatchInfoObjects[inCount_UM[shiftNr] - altshift2ppCount - 1].expectedTime)
											var my_prevExpectedTime = shift1upcomingMatchInfoObjects[inCount_UM[shiftNr] - altshift2ppCount - 1].expectedTime
											var my_potExpectedTime = my_prevExpectedTime + timeBetweenMatches
											
											////////log("prev expected time: ", (my_potExpectedTime / 60))
											
											if(ppUpcomingMatchInfoArray.length > 0){
												altshift2ppCount +=1
												var my_playingExpectedTime = ppUpcomingMatchInfoArray[0].expectedTime
												if (my_playingExpectedTime > my_potExpectedTime){
													////////log("shift 2 match is first")
													ppUMCountNr = ppUpcomingMatchInfoArray[0].UMCount1
													////////log(ppUMCountNr)
													my_expectedTime = predictedTimeLeftArray[ppUMCountNr
													 - 1] + timeBetweenMatches
													upcomingMatchInfo.predictedTime = poolPropertiesObject.avgTime
													upcomingMatchInfo.expectedTime = my_playingExpectedTime
													////////log("hatza:", upcomingMatchInfo, rtpUpcomingMatchInfoArray)
													rtpUpcomingMatchInfoArray.push(upcomingMatchInfo)
													rtpUpcomingMatchInfoArray.sort(function(a, b){return a.totalTime - b.totalTime})								
												} else {
													////////log("shift 2 match is after")
													my_playingExpectedTime = ppUpcomingMatchInfoArray[0].expectedTime
													
													my_expectedTime = totalTimesArray[1][0] + my_playingExpectedTime + timeBetweenMatches
													////////log(shiftStartTime, my_playingExpectedTime, my_expectedTime)				
												}
												ppUpcomingMatchInfoArray.shift()
											} else {
												////////log("shift 2 match follows regular pattern after playing matches")
												var my_rtpTotalTime = rtpUpcomingMatchInfoArray[shift1rtp].totalTime 
												var my_expectedTime = shiftStartTime + my_rtpTotalTime + timeBetweenMatches
											}
										} else {									
											////////log("shift 1 has no players playing")
											var my_readyExpectedTime = shiftStartTime + ((totalTimesArray[prevShiftNr][inCount_UM[shiftNr] - 1]) - shiftStartTime) + timeBetweenMatches
										}	
									} else {
										////////log("in shift 3 or later")
										shift1ppCount = 0
										if (shiftNr == 3){
											if(inCount_UM[3] == nrOfCourts - altshift2ppCount){
												////////log("before index")
												function addanIndex(){
													////////log("in index function")
													if(addIndex < altshift2ppCount){
														////////log("adding index")
														addIndex +=1
														var my_AddedExpectedTime = shiftStartTime + ((totalTimesArray[prevShiftNr][inCount_UM[shiftNr] + addIndex - 1]) - shiftStartTime) + timeBetweenMatches
														////////log(my_expectedTime)
														addanIndex()
														expectedTimesArray[shiftNr].push(my_AddedExpectedTime)
														my_AddedPredictedTime = predictedTimesArray[prevShiftNr][inCount_UM[shiftNr] + addIndex - 1]
														predictedTimesArray[shiftNr].push(my_AddedPredictedTime)
														totalTimesArray[shiftNr].push(my_AddedExpectedTime + my_AddedPredictedTime)
														//totalTimesArray.sort()
														////////log(expectedTimesArray[shiftNr], predictedTimesArray[shiftNr], totalTimesArray[shiftNr])
													}
												}
											addanIndex()
											}
										} else {
											var my_readyExpectedTime = shiftStartTime + ((totalTimesArray[prevShiftNr][inCount_UM[shiftNr] - 1]) - shiftStartTime) + timeBetweenMatches
										}
									}
								
									//var my_readyExpectedTime =  shiftStartTime + ((totalTimesArray[prevShiftNr][inCount_UM[shiftNr] - 1]) - shiftStartTime) + timeBetweenMatches
								/*if(shiftStartTime > averageMatchTimes[my_PoolName].time){
									
								}*/
								if(my_readyExpectedTime >= my_predictedTime){
									////////log("players are ready before upcoming match is expected")
									var my_predictedExpectedTime = my_readyExpectedTime - shiftStartTime//- my_predictedTime //shiftStartTime is removed becuase it is aready in the readyExpectedTime.
								} else {
									////////log("upcoming match is expected before players are ready")
									var my_predictedExpectedTime = my_predictedTime + pauseTime + timeBetweenMatches
								}
								
								/*if(my_freeCourtExpectedTime >= my_predictedExpectedTime){ // if free court expected time is higher than predicted time, this will be my expected time 
									////////log("court is first free")
									var my_expectedTime = shiftStartTime + my_freeCourtExpectedTime
								} else {*/ // predicted time is higher and thus my expected time 
									////////log("players are first free")
									var my_expectedTime = shiftStartTime + my_predictedExpectedTime
								//}
								////////log("expected time Player playing:", my_expectedTime)
								my_finalExpectedTimeSecs = Math.ceil(my_expectedTime)
								//my_finalExpectedTimeSecs = "still calculating PP"+shiftNr+stars
								
								expectedTimesArray[shiftNr].push(my_expectedTime)
								expectedTimesArray[shiftNr].sort()
								
								upcomingMatchInfo.expectedTime = my_expectedTime
								
								upcomingMatchInfo.predictedTime = poolPropertiesObject
								predictedTimesArray[shiftNr].push(poolPropertiesObject.avgTime)

								
								var my_totalTime = Math.ceil(my_expectedTime + (poolPropertiesObject.avgTime))
								upcomingMatchInfo.totalTime = my_totalTime
								totalTimesArray[shiftNr].push(my_totalTime)
								totalTimesArray[shiftNr].sort()
								//shiftUpcomingMatchInfoObjects[shiftNr].push(upcomingMatchInfo)
								upcomingMatchInfoObjects.push(upcomingMatchInfo)
							} else if(my_statusText == playersUnavailable){
								////////log("in shift " + shiftNr+" player unavailable")
								inUnavailable = true; totUnavailable_UM +=1; unavailable_UM[shiftNr] +=1
								upcomingMatchInfo.playersUnavailable = true
								
								my_finalExpectedTimeSecs = "unknown"
								upcomingMatchInfo.expectedTime = "unknown"
								upcomingMatchInfo.predictedTime = "unknown"
								//shiftUpcomingMatchInfoObjects[shiftNr].push(upcomingMatchInfo)
								upcomingMatchInfoObjects.push(upcomingMatchInfo)
							}
							var endShift = false
							
							if(upcomingMatchNr == ((shiftNr * nrOfCourts) + totUnavailable_UM)+shift1ppCount){
								endShift = true
								////////log("end of shift "+shiftNr)
								////////log("upcomingMatchesInfoObjects:", upcomingMatchInfoObjects)
								////////log("expected times array:", expectedTimesArray[shiftNr])
								////////log("predicted times array:", predictedTimesArray[shiftNr])
								totalTimesArray[shiftNr].sort(function(a, b){return a-b})
								////////log("total times array:", totalTimesArray[shiftNr])
								smallestExpectedTimesArray[shiftNr] = expectedTimesArray[shiftNr]
								smallestExpectedTimesArray[shiftNr].sort(function(a, b){return a-b})
								if(shiftNr == 2 && altshift2ppCount > 0){
									////////log("in playing startshift")
									shiftStartTime += ((totalTimesArray[shiftNr][0]))
									////////log(shiftStartTime)
								} else {
									////////log("in normal startshift")
									shiftStartTime += ((totalTimesArray[shiftNr][0]))
								}
								
								////////log("going to shiftNr.", shiftNr + 1, "with shiftStartTime:", (Math.ceil(shiftStartTime / 60)), "mins.")							
							} else {
								////////log("remaining in shiftNr.", shiftNr)
								shiftNr -=1 //if match number is still processing within a shift, shift nr won't change.
							}
						}
				} else {
					alert("There is an error with the upcomingMatchNr:", upcomingMatchNr)
				}
				//if(my_settingsVarsObject.showExpectedTimeColumn == true){
					//show sihtNR in table
					/*if(secondpart == true){
						if(endShift == true){
							var my_shiftNr = shiftNr
						} else {
							var my_shiftNr = shiftNr + 1
						}
					} else { //secondpart == false
						var my_shiftNr = shiftNr
					}*/
					
					if(typeof my_finalExpectedTimeSecs == 'number'){
						my_finalExpectedTimeMins = Math.ceil(my_finalExpectedTimeSecs/60)
					} else if(my_finalExpectedTimeSecs == "unknown"){
						my_finalExpectedTimeMins = 9999999999999999999999999999999999999
					} else if(my_finalExpectedTimeSecs == "free court available"){
						my_finalExpectedTimeMins = 0
					} else {
						my_finalExpectedTimeMins = my_finalExpectedTimeSecs
					}
					//var plusminSymbol = escape('±')
					//log(plusminSymbol)							
					var finalStdDeviationTime = my_finalExpectedTimeMins +  " ± " + (Math.ceil((poolPropertiesObject.stdDev)/60)) 
												
					if(my_finalExpectedTimeMins <= 5){
						var my_namedFinalExpectedTimeMins = "a few"
					} else if(my_finalExpectedTimeMins > 5 && my_finalExpectedTimeMins <= 15){
						var my_namedFinalExpectedTimeMins = "5-15"
					} else if(my_finalExpectedTimeMins > 15 && my_finalExpectedTimeMins <= 30){
						var my_namedFinalExpectedTimeMins = "15-30"
					} else if(my_finalExpectedTimeMins > 30 && my_finalExpectedTimeMins <= 45){
						var my_namedFinalExpectedTimeMins = "30-45"
					} else if(my_finalExpectedTimeMins > 45 && my_finalExpectedTimeMins <= 60){
						var my_namedFinalExpectedTimeMins = "45-60"
					} else if(my_finalExpectedTimeMins > 60 && my_finalExpectedTimeMins <= 90){
						var my_namedFinalExpectedTimeMins = "60-90"
					} else if(my_finalExpectedTimeMins > 90 && my_finalExpectedTimeMins <= 120){
						var my_namedFinalExpectedTimeMins = "90-120"
					} else if(my_finalExpectedTimeMins > 120){
						var my_namedFinalExpectedTimeMins = ">120"
					}
					//if MSA or MSB
					function checkPoolName(poolName){
						var ifPoolname = false
						var ifselectedPoolName = false
						for (pool in poolProperties){
							ifPoolName = inArray(poolName, poolProperties[pool].altNames)
							if(ifPoolName == true){
								if(poolProperties[pool].altNames[0] == "Men Singles A" || poolProperties[pool].altNames[0] == "Men Singles B"){
									ifselectedPoolName = true
									break
								}	
							}
						}
					return ifselectedPoolName
					}
					var ifMSAorMSB = checkPoolName(my_PoolName)
					if(ifMSAorMSB == true && my_finalExpectedTimeMins < 10){
						var my_namedFinalExpectedTimeMins = "0-10"
					}
					
					if(inUnavailable == true){
						//tri.append("<td class='expectedTimeColumn'>"+my_finalExpectedTimeSecs+"</td>");
						singleUMData.ExpectedTimeSecs = 9999999999999999999999999999999999999
						singleUMData.ExpectedTimeMins = 9999999999999999999999999999999999999
						singleUMData.NamedExpectedTime = "Unavailable"
						singleUMData.StdDevExpectedTime = "Unavailable"
					} else {
						if(freeCourt == true){
							//tri.append("<td class='expectedTimeColumn'>"+my_finalExpectedTimeSecs+"</td>");
							singleUMData.ExpectedTimeSecs = 0
							singleUMData.ExpectedTimeMins = 0
							singleUMData.NamedExpectedTime = my_finalExpectedTimeSecs
							singleUMData.StdDevExpectedTime = my_finalExpectedTimeSecs						
						} else {
							//tri.append("<td class='expectedTimeColumn'>"+my_namedFinalExpectedTimeMins+" mins."+stars+"</td>");
							singleUMData.ExpectedTimeSecs = my_finalExpectedTimeSecs
							singleUMData.ExpectedTimeMins = my_finalExpectedTimeMins
							singleUMData.NamedExpectedTime = my_namedFinalExpectedTimeMins+" mins."+stars
							singleUMData.StdDevExpectedTime = finalStdDeviationTime+" mins."+stars
						}
					}
				
				//edit status column data for priority matchesif(priorityMatch == true){
				if(priorityMatch == true){
					////log("in prio")
					singleUMData.status = "priority match"
					if (playersNotReady == true){
							singleUMData.unavailablePlayers = true;
							singleUMData.playersPlaying = false;
							singleUMData.readyToPlay = false;
							//////////log("unavailable:", my_status)
					} else if (playersPlaying == true){
						singleUMData.unavailablePlayers = false;
						singleUMData.playersPlaying = true;
						singleUMData.readyToPlay = false;
					} else {
						singleUMData.unavailablePlayers = false;
						singleUMData.playersPlaying = false;
						singleUMData.readyToPlay = true;
						//////////log("ready:", my_status)
					}
				////log(singleUMData)	
				}
				
				
				
				allUMdata.push(singleUMData)
				//var my_table =  document.getElementById('upcomingMatchesTable')
				//my_UMRows.push(my_table.rows[i].data())
		
			//check expected Times
			//start log
			var my_currentStartSingleStringsObject = {}
			var my_startArray = []
			var my_stopArray = []
			//if(my_settingsVarsObject.showExpectedTimeColumn == true){
			var start = "start"
			var my_matchLocalId = my_upcomingMatches[um].localId
			var processIDS = start + my_matchLocalId.toString() 
			var tournamentName = my_tournamentName 
			
			my_currentStartSingleStringsObject.tournamentName = tournamentName
			my_currentStartSingleStringsObject.matchId = my_matchLocalId
			my_currentStartSingleStringsObject.status = start
			my_currentStartSingleStringsObject.processID = processIDS
			my_currentStartSingleStringsObject.dataReloadCount = reloadDataCount
			my_currentStartSingleStringsObject.timeSinceLastRefresh = lastRefreshTimeLog
			
			var myPoolname = my_upcomingMatches[um].pool
			my_currentStartSingleStringsObject.pool = myPoolname
			
			upcomingMatchInfo.localId = my_matchLocalId 
			var jsCurrentTimeS = new Date()
			my_currentStartSingleStringsObject.jsDate = jsCurrentTimeS
			var isoCurrentTimeS =  jsToisoDate(jsCurrentTimeS)
			my_currentStartSingleStringsObject.isoDate = isoCurrentTimeS
			
			var firstExpectedTime = singleUMData.ExpectedTimeSecs //not upcomingMatchInfo object because singleUMData objects includes all numbers als oif unavailable or free court.
			my_currentStartSingleStringsObject.expectedTime = firstExpectedTime 
			
			var ifReadytoPlayS = upcomingMatchInfo.readyToPlay
			my_currentStartSingleStringsObject.ifReadytoPlay = ifReadytoPlayS
			
			var ifPlayerPlayingS = upcomingMatchInfo.playersPlaying
			my_currentStartSingleStringsObject.ifPlayerPlaying = ifPlayerPlayingS
			
			var ifUnavailableS = upcomingMatchInfo.playersUnavailable
			my_currentStartSingleStringsObject.ifUnavailable = ifUnavailableS
			
			var expectedTimestartTimeDifferenceS = null
			var timeDifferenceSecsS = null
			my_currentStartSingleStringsObject.expectedTimeDifference = expectedTimestartTimeDifferenceS
			my_currentStartSingleStringsObject.timeDifferenceSecs = timeDifferenceSecsS

			my_currentStartSingleStringsObject.reloadDataTimeInterval = reloadDataTimeSecs 
			if(ifUnavailableS == false){
				my_startArray.push(tournamentName, reloadDataCount, processIDS, start, my_matchLocalId, myPoolname, isoCurrentTimeS, firstExpectedTime, ifReadytoPlayS, ifPlayerPlayingS, ifUnavailableS, reloadDataTimeSecs, lastRefreshTimeLog, expectedTimestartTimeDifferenceS, timeDifferenceSecsS)
				
				my_currentStringObjectsArray.push(my_currentStartSingleStringsObject)
				mycurrentLocalIDArray.push(my_matchLocalId)
				//////log(mycurrentLocalIDArray[arraycount])
				mycurrentLocalIDArray.sort()
			}
			
			my_startInputString = my_startArray.join(";")
			//////log(my_startInputString) 
			var inStartArray = inArray(my_matchLocalId, completeMatchIDArray)
			
			//////log(upcomingMatchInfo)
			if(inStartArray == false && ifUnavailableS == false){
				mycurrentLocalIDArray.push(my_matchLocalId)
				completeMatchIDArray.push(my_matchLocalId)
				mycurrentLocalIDArray.sort()
				completeMatchIDArray.sort()
				
				
				completeStartObjects.push(my_currentStartSingleStringsObject)				
				completeStartArray.push(my_startArray)
				my_currentStringsArray.push(my_startInputString)

				//my_currentStringsArray.push(my_startInputString)
				
				var my_Startinput = my_startInputString + ";"
				
				/* */ /** INPUT VALUE **/ /* */
				//log(my_currentStartSingleStringsObject)
				//log(my_startArray)
				//log(my_startInputString)
				
				//objects
					//UM_startLog.push(my_currentStartSingleStringsObject)
					//UM_loopStartLog.push(my_currentStartSingleStringsObject)
				//arrays
					//UM_startLog.push(my_startArray)
					//UM_loopStartLog.push(my_startArray)
				//strings
					UM_startLog.push(my_startInputString)
					UM_loopStartLog.push(my_startInputString)
			}
		
			if(upcomingMatchInfoObjects.length == 0){
				upcomingMatchInfoObjects.push(upcomingMatchInfo)
			} else {
				var found = false;
				for(var umo = 0; umo < upcomingMatchInfoObjects.length; umo++) {
					if (upcomingMatchInfoObjects[umo].localId == my_matchLocalId) {
						found = true;
						break;
					}
				}
				if(found == false){
					upcomingMatchInfoObjects.push(upcomingMatchInfo)
				}
				
				var nextum = um+1							
				if(nextum == my_upcomingMatches.length){
						window['load' + arraycount ] = mycurrentLocalIDArray
						window['StringArray' + arraycount ] = my_currentStringsArray
				}
			}
		} /* */ /** end of for loop **/ /* */
		
		
		//append Table
		////log("allUMdata", allUMdata)
		var UMremakeCount = 0
		var my_lengthMenu = lengthMenu(false, allUMdata) //create whole table
		//////log(my_lengthMenu)
			
		if (noUpcomingMatches == true){
			//log("no UM")
			
			function makeNoUpcomingMatchesTable(my_data, ifPaging, lengthMenu){
				var my_noUMTable = $('#upcomingMatchesTable').DataTable({
					data: my_data,
					paging: ifPaging,
					pagingType: "numbers",
					lengthChange: ifLengthChange(),
					searching: ifOrganizerViewPreset,
					lengthMenu:	lengthMenu,
					ordering: false,
					responsive: false,
					dom: tableInfoLocations(),
					//pageResize: true,
					//bAutoWidth: false,			
					columns: [
						{ data: 'PoolName', function (nTd, sData, oData, iRow, iCol) {
																	$(nTd).css('-webkit-column-span', 'all')
																	$(nTd).css('column-span', 'all')
																}
						},
						{ data: 'teamOne1' },
						{ data: 'teamOne2' },
						{ data: 'vsColumn' }, 
						{ data: 'teamTwo1' }, 										
						{ data: 'teamTwo2' },
						{ data: 'status', visible: showStatusPlayersColumn },
						{ data: 'StdDevExpectedTime', visible: showExpectedTimeColumn }
					],
				})
			return my_noUMTable}
			
			my_upcomingMatchesTable = makeNoUpcomingMatchesTable(allUMdata, ifPaging, my_lengthMenu)
			document.getElementById("UM_notes").style = "display: none"
			
			/*var UMrow_id = 0
			tri = $('<tr id=' + UMrow_id + '/>');
			tri.append("<td colspan='9' class='noUpcomingMatchesRow'>" + "There are no upcoming matches planned." + "</td>")
			//document.getElementById("notes").style = "display: none"
			//appending table
			$('#upcomingMatchesTable').append(tri);*/
		} else {
			function makeUpcomingMatchesTable(my_data, ifPaging, lengthMenu){
				//////log("making table", remakeCount, my_data, "lm:", lengthMenu)
				var my_UMTable = $('#upcomingMatchesTable').DataTable({
					data: my_data,
					paging: ifPaging,
					pagingType: "numbers",
					lengthChange: ifLengthChange(),
					searching: ifOrganizerViewPreset,
					lengthMenu:	lengthMenu,
					ordering: false,
					responsive: false,
					dom: tableInfoLocations(),
					//pageResize: true,
					//bAutoWidth: false,			
					columns: [
						/*{ data: 'UMNr', sWidth: '15px', autoWidth: false, fnCreatedCell: 	function (nTd, sData, oData, iRow, iCol) {
																$(nTd).css('text-align', 'center')
															}
						},*/
						{ data: 'PoolName', fnCreatedCell: 	function (nTd, sData, oData, iRow, iCol) {
																//$(nTd).css('border-left', '0.2vw solid #555555')
																$(nTd).css('border-left', '3px solid #555555')
																$(nTd).css('border-right', '0.2vw solid #555555')
																$(nTd).css('background-color', '#b3ccff')
																$(nTd).css('padding-left', '5px')
																$(nTd).css('padding-right', '5px')
															}
						},
						{ data: 'teamOne1', fnCreatedCell:  function (nTd, sData, oData, iRow, iCol) {
																$(nTd).css('padding-left', '5px')
																$(nTd).css('text-align', 'left')
																//////log(sData)
																var inRTP = inArray(sData, playerNamesReadyToPlayArray)
																var inPl = inArray(sData, playerNamesCurrentlyPlayingArray)
																var inUnav = inArray(sData, playerNamesCurrentlyUnavailableArray)
																if (inRTP == true) {
																	//$(nTd).css('background-color', '#71da71')
																} else if (inPl == true) {
																	$(nTd).css('background-color', '#ffffb3')
																} else if (inUnav == true) {
																	$(nTd).css('background-color', '#ff8080')
																}
															}
														
						},
						{ data: 'teamOne2', fnCreatedCell:  function (nTd, sData, oData, iRow, iCol) {
																$(nTd).css('padding-left', '5px')
																$(nTd).css('text-align', 'left')
																//////log(sData)
																var inRTP = inArray(sData, playerNamesReadyToPlayArray)
																var inPl = inArray(sData, playerNamesCurrentlyPlayingArray)
																var inUnav = inArray(sData, playerNamesCurrentlyUnavailableArray)
																if (inRTP == true) {
																	//$(nTd).css('background-color', '#71da71')
																} else if (inPl == true) {
																	$(nTd).css('background-color', '#ffffb3')
																} else if (inUnav == true) {
																	$(nTd).css('background-color', '#ff8080')
																}
															}											
						},
						{ data: 'vsColumn', sWidth: '10px', fnCreatedCell:	function (nTd, sData, oData, iRow, iCol) {
																	$(nTd).css('font-weight', 'bold')
															}
						},
						{ data: 'teamTwo1', fnCreatedCell:  function (nTd, sData, oData, iRow, iCol) {
																$(nTd).css('padding-left', '5px')
																$(nTd).css('text-align', 'left')
																//////log(sData)
																var inRTP = inArray(sData, playerNamesReadyToPlayArray)
																var inPl = inArray(sData, playerNamesCurrentlyPlayingArray)
																var inUnav = inArray(sData, playerNamesCurrentlyUnavailableArray)
																if (inRTP == true) {
																	//$(nTd).css('background-color', '#71da71')
																} else if (inPl == true) {
																	$(nTd).css('background-color', '#ffffb3')
																} else if (inUnav == true) {
																	$(nTd).css('background-color', '#ff8080')
																}
															}												
						},
						{ data: 'teamTwo2', fnCreatedCell:  function (nTd, sData, oData, iRow, iCol) {
																$(nTd).css('padding-left', '5px')
																$(nTd).css('text-align', 'left')
																//////log(sData)
																//////log("arrays:", playerNamesReadyToPlayArray, playerNamesCurrentlyPlayingArray, playerNamesCurrentlyUnavailableArray)
																var inRTP = inArray(sData, playerNamesReadyToPlayArray)
																var inPl = inArray(sData, playerNamesCurrentlyPlayingArray)
																var inUnav = inArray(sData, playerNamesCurrentlyUnavailableArray)
																if (inRTP == true) {
																	//$(nTd).css('background-color', '#71da71')
																} else if (inPl == true) {
																	$(nTd).css('background-color', '#ffffb3')
																} else if (inUnav == true) {
																	$(nTd).css('background-color', '#ff8080')
																}
															},												
						},
						{ data: 'status', sWidth: '80px', fnCreatedCell:	function (nTd, sData, oData, iRow, iCol) {
																$(nTd).css('border-left', '0.2vw solid #555555')
																if(sData == "priority match" && oData.readyToPlay == true){
																	$(nTd).css('font-weight', 'bold')
																	$(nTd).css('font-style', 'italic')
																	$(nTd).css('background-color', '#71da71')
																} else if(sData == "priority match" && oData.playersPlaying == true){
																	$(nTd).css('font-weight', 'bold')
																	$(nTd).css('font-style', 'italic')
																	$(nTd).css('background-color', '#ffffb3')
																} else if(sData == "priority match" && oData.unavailablePlayers == true){
																	$(nTd).css('font-weight', 'bold')
																	$(nTd).css('font-style', 'italic')
																	$(nTd).css('background-color', '#ff8080')
																} else if (sData == readyToPlay) {
																	$(nTd).css('background-color', '#71da71')
																} else if (sData == playersCurrentlyPlaying ) {
																	$(nTd).css('background-color', '#ffffb3')
																} else if (sData == playersUnavailable ) {
																	$(nTd).css('background-color', '#ff8080')
																}
															},											
						visible: showStatusPlayersColumn },
						{ data: 'StdDevExpectedTime'/*my_namedFinalExpectedTimeMins*/, fnCreatedCell: 	function (nTd, sData, oData, iRow, iCol){
																			$(nTd).css('border-right', '3px solid #555555')

																			//$(nTd).css('width', '60px')
																		},
						visible: showExpectedTimeColumn }
					],
				})
			return my_UMTable }
			
			my_upcomingMatchesTable = makeUpcomingMatchesTable(allUMdata, ifPaging, my_lengthMenu)
		}
		
		//paging		
		if(ifPaging == true){
			function resizeUMTable(){	
				////log("resizing UM")
				var countUMRows = paginationConfig('upcomingMatchesTable')
				////log("countUMRows", countUMRows)
				my_upcomingMatchesTable.destroy()
				//////log("UM table destroyed")
				
				var my_newLengthMenu = lengthMenu(true, allUMdata, countUMRows)
				if(noUpcomingMatches == true){
					my_upcomingMatchesTable = makeNoUpcomingMatchesTable(allUMdata, ifPaging, my_newLengthMenu)
				} else {
					my_upcomingMatchesTable = makeUpcomingMatchesTable(allUMdata, ifPaging, my_newLengthMenu)					
				}
				
				var my_UMDiv = document.getElementById('upcomingmatches-tab-content')
				var my_UMDivHeight = my_UMDiv.offsetHeight	
				function checkOverflow(table, allUMdata, ifPaging, origRowscount, my_newLengthMenu, my_tableHeight, pageCount){
					//log("overflowcount UM:", UMremakeCount)
					var my_UMDiv = document.getElementById('upcomingmatches-tab-content')
					var my_UMDivHeight = my_UMDiv.offsetHeight
					selectedUMTable = 1
					if(my_UMDivHeight>= (availableUMTableHeight + my_paginationNavHeight + my_UMnotesHeight)) {
						////log("overflow found in UM", my_UMDivHeight, availableUMTableHeight, UMremakeCount)
						table.destroy()
						UMremakeCount +=1
						var newRowsCount = origRowscount - UMremakeCount
						//////log("UM table destroyed", UMremakeCount, origRowscount, newRowsCount)
						//////log("newRowsCount", newRowsCount)
						var my_newnewLengthMenu = lengthMenu(true, allUMdata, newRowsCount)
						UMPageCount = Math.ceil(allUMdata.length / newRowsCount)
						////log("UM Page Count", UMPageCount)
						//////log(my_newnewLengthMenu)
						if(noUpcomingMatches == true){
							my_upcomingMatchesTable = makeNoUpcomingMatchesTable(allUMdata, ifPaging, my_newLengthMenu)
						} else {
							my_upcomingMatchesTable = makeUpcomingMatchesTable(allUMdata, ifPaging, my_newLengthMenu)					
						}
						
						selectedUMTable = 2
						checkOverflow(my_upcomingMatchesTable, allUMdata, ifPaging, origRowscount, my_newnewLengthMenu, my_UMDivHeight)
					} else {
						var my_activeTab = $('.tab-content').find('.tab-pane.active').attr('id')
						//log("no more resizing in UM; ativeTab:", my_activeTab)
						if(my_activeTab == tabTableContents[1] && startTab == tabTableContents[1] && reloadedData == true){
							//log("start tab UM")
							var UMstarttimeout = setTimeout(function(){getUMpageCount()}, 1000)
							refreshTimeInterval = setInterval(function(){ timeSinceLastRefreshTime += 1}, 1000)
							reloadedData = false
						}
					}
				}
				checkOverflow(my_upcomingMatchesTable, allUMdata, ifPaging, countUMRows, my_newLengthMenu, my_UMDivHeight, UMPageCount)
			}
			resizeUMTable()
			//page time config
			
			//on table change
			function getUMpageCount(){
				UMremakeCount = 0
					UMTimeout = setTimeout(function(){
						resizeUMTable()
				
					////log("Page count UM:", my_pageCount)
					//function pageTime(){
						function pageConfig(table){
							var tableInfo = table.page.info()
							UMPageCount = tableInfo.pages
							if(noUpcomingMatches == true){
									upcomingMatchesTabTime = 5000
								} else {
									upcomingMatchesTabTime = (document.getElementById("upcomingTime").value * 1000) - 4000
								}
							pageTimeconfig(true, "UM", my_upcomingMatchesTable, UMPageCount,minPageTime, upcomingMatchesTabTime, allUMdata)
						}
						pageConfig(my_upcomingMatchesTable)
					}, 500)
			}
			
			$('#upcomingMatches-button').on('changeTable', function(e) {
					UMdetectChangeCount +=1	
					if (UMdetectChangeCount == 1){
						UMclickChange += 1
						//log("change table detected in UM with nr.:", UMclickChange, startTab)		
							
							if(startTab == tabTableContents[1] && timeSinceLastRefreshTime >= reloadDataTimeSecs){
								//log("start refresh tab UM")
								if(localTesting == false){
									$.when(checkForAPIChange())
									.then(function(){
										if(ifAPIChangeDetected == true){
											temprefreshTimeout = setTimeout(function(){
											removeTables()}, 1000)
										} else {
											nextTablePage(true, "UM", my_upcomingMatchesTable, newUMPageTime, newUMTableTime)
										}
									})
								} else {
									ifAPIChangeDetected = true
									temprefreshTimeout = setTimeout(function(){
									removeTables()}, 1000)
								}
								//getAPIDataAndMakeTables()}, 1000)
							} else if(UMclickChange == 1 && startTab == tabTableContents[1]){
								//log("second time in UM tab and UM start tab")
								nextTablePage(true, "UM", my_upcomingMatchesTable, newUMPageTime, newUMTableTime)
							} else if(UMclickChange == 1 && startTab != tabTableContents[1]){
								//log("first time in UM tab and UM not start tab")
								getUMpageCount()						
							} else if(UMclickChange > 1){
								//log(">1 time in UM tab")
								nextTablePage(true, "UM", my_upcomingMatchesTable, newUMPageTime, newUMTableTime)
							} else {
								//log("error occured in UM change table detection", UMclickchange, startTab)
							}
				}					
			})
			
			
			$('#upcomingMatches').on('tab', function(e) {
			  alert("my alert");
			});
		} 
		/*stop //log*/
		try {
			if(logUpcomingMatch == true){
				if(my_upcomingMatches.length == 0){
					logUpcomingMatch = false
				}
				if(arraycount > 1){
					//////log(upcomingMatchInfoObjects)
					//////log("\n ---------- \n new load")
					//////log("currentIDArray", mycurrentLocalIDArray)
					
					var prevArrayNr = arraycount - 1
					var prevIDArray = window['load' + prevArrayNr]
					var prevStringArray = window['StringArray' + prevArrayNr]			
					var currentIDArray = mycurrentLocalIDArray		
					//////log("old array:", prevIDArray,"\nnew array:",currentIDArray)
					//////log("prev String array:", prevStringArray)
					var my_locaIDdifferenceArray = $(prevIDArray).not(currentIDArray).get()
					var uniqueIdsArray = [];
					$.each(my_locaIDdifferenceArray, function(i, el){
						if($.inArray(el, uniqueIdsArray) === -1) uniqueIdsArray.push(el);
					});
					//////log("difference", uniqueIdsArray)
					
					if(uniqueIdsArray.length > 0){
						for(var dif = 0; dif < uniqueIdsArray.length; dif++){
							var my_localID = uniqueIdsArray[dif]
							//////log(my_localID, my_locationsList)
							var matchObject = my_locationsList.find(x => x.localId === my_localID)
							//////log(matchObject)
							
							var InCompleteMatchIDArray = inArray(my_localID, completeMatchIDArray)
							if(InCompleteMatchIDArray == true){	
								//////log(true, "in CompleteIDArray")	
								var inCurrent = inArray(my_localID, mycurrentLocalIDArray)
								if(inCurrent == false){
										//////log("false")
										var my_currentFinishSingleStringsObject = {}
										var stop = "stop"
										var jsCurrentTimeF = new Date()
										//log(jsCurrentTimeF)
										var isoCurrentTimeF =  jsToisoDate(jsCurrentTimeF)
										//////log("all um objects,", upcomingMatchInfoObjects)
										
										//find upcoming match object with lowest UMnr
										var filter = {localId: my_localID};
										var matchIdUpcomingMatchesObjects = []
										var _SmatchInfoObjects = upcomingMatchInfoObjects.filter(function(item) {
											for(var key in filter) {
												//log(filter)
												if(item[key] === my_localID){
													//log("found filtered object:", item)
													matchIdUpcomingMatchesObjects.push(item)
												}												
											}
										});
										var filteredObjectsMatchNrs = []
										for(var nr = 0 ; nr < matchIdUpcomingMatchesObjects.length; nr++){
											var _umnr = matchIdUpcomingMatchesObjects[nr].UMNr
											//log(_umnr)
											filteredObjectsMatchNrs.push(_umnr)
										}
										filteredObjectsMatchNrs.sort(function(a, b){return a-b})
										//log(filteredObjectsMatchNrs)
										var smallestUMNr = Math.min(filteredObjectsMatchNrs)
										if(isNaN(smallestUMNr) == true){
											lengthObjects = matchIdUpcomingMatchesObjects.length
											var matchInfoObject =  matchIdUpcomingMatchesObjects[lengthObjects - 1]
											var objectSelected = true
											//smallestUMNr = selectedmatchidObject.UMNr
											//log("selected latest obj of same UMNr:", matchInfoObject)
										} else {var objectSelected = false }
										//log("smallest:", objectSelected, smallestUMNr)									
										if(objectSelected == false){
											var matchInfoObject = matchIdUpcomingMatchesObjects.find(x => x.UMNr === smallestUMNr)
										}
										//log("found corresponding object", matchInfoObject)					
										
										//corresping match id start object
										var startObject = completeStartObjects.find(x => x.matchId === my_localID)
										
										//stop info
										var processIDF = stop+my_localID.toString()
										var lastExpectedTime = matchInfoObject.expectedTime
										var ifReadytoPlayF = matchInfoObject.readyToPlay
										var ifPlayerPlayingF = matchInfoObject.playersPlaying
										var ifUnavailableF = matchInfoObject.playersUnavailable
										var poolnameF = matchInfoObject.pool
										
										var expectedTimeDifferenceF = startObject.expectedTime - lastExpectedTime
										var timeDifferenceSecsF = diff_secs(jsCurrentTimeF, startObject.jsDate);
										
										//log(startObject.jsDate)
										//log(timeDifferenceSecsF)
										
										my_currentFinishSingleStringsObject.status = stop
										my_currentFinishSingleStringsObject.reloadDataTimeInterval = reloadDataTimeSecs
										my_currentFinishSingleStringsObject.matchId = my_localID
										
										my_currentFinishSingleStringsObject.dataReloadCount = reloadDataCount
										my_currentFinishSingleStringsObject.timeSinceLastRefresh = lastRefreshTimeLog
										
										my_currentFinishSingleStringsObject.jsDate = jsCurrentTimeF
										my_currentFinishSingleStringsObject.isoDate = isoCurrentTimeF
										my_currentFinishSingleStringsObject.processID = processIDF
										my_currentFinishSingleStringsObject.expectedTime = lastExpectedTime
										my_currentFinishSingleStringsObject.ifReadytoPlay = ifReadytoPlayF
										my_currentFinishSingleStringsObject.ifPlayerPlaying = ifPlayerPlayingF
										my_currentFinishSingleStringsObject.ifUnavailable = ifUnavailableF
										my_currentFinishSingleStringsObject.pool = poolnameF
										my_currentFinishSingleStringsObject.expectedTimeDifference = expectedTimeDifferenceF
										my_currentFinishSingleStringsObject.timeDifferenceSecs = timeDifferenceSecsF

										my_stopArray.push(tournamentName, reloadDataCount, processIDF, stop, my_localID, poolnameF, isoCurrentTimeF, lastExpectedTime, ifReadytoPlayF, ifPlayerPlayingF, ifUnavailableF, reloadDataTimeSecs, lastRefreshTimeLog, expectedTimeDifferenceF, timeDifferenceSecsF)
										
										
										completeStopObjets.push(my_currentFinishSingleStringsObject)
										completeStopArray.push(my_stopArray)
										
										var my_stopOutputString = my_stopArray.join(";")
										var my_StopinputString = my_stopOutputString + ";"
										
										/* */ /** INPUT VALUE **/ /* */
										//log(my_StopinputString)
										//objects
											//UM_stopLog.push(my_currentFinishSingleStringsObject)
											//UM_loopStopLog.push(my_currentFinishSingleStringsObject)
										//arrays
											//UM_stopLog.push(my_stopArray)
											//UM_loopStopLog.push(my_stopArray)
										//strings
											UM_stopLog.push(my_StopinputString)
											UM_loopStopLog.push(my_StopinputString)
								}		
							}
						}
					}
				//////log("\n ---------- \n")
				}
				if((UM_loopStartLog.length > 0 || UM_loopStopLog.length > 0) && ifMobile == false){
					//log(UM_loopStartLog, UM_loopStopLog)
					UM_loopLogStrings = []
					UM_loopLogStrings = UM_loopStartLog.concat(UM_loopStopLog)
					//log(UM_loopLogStrings)
					$('#invisibleButton').trigger("click")
				}
			}
		} catch (err){
			log(err)
		}
document.getElementById("upcomingMatchesLoader").style.display = "none"
}