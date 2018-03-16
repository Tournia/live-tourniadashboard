function calculateExpectedTime(um, my_PoolName, poolPropertiesObject, singleUMData, nrOfCourts, my_statusText, playersNotReady, playersPlaying, playerNamesCurrentlyPlayingArray, playersPlayingObects, predictedTimeLeftofPlayingPlayersArray) {
	var initialFreeCourts = freeCourts
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
		pool: singleUMData.poolName
		
	}
	//var inFirstCount = false 
	//var inSecondCount = false //is match counted in after first nrOfCourts expected times?
	var inPlayCount = false //is match counted in expected times while players are playing?
	var inUnavailable = false // is match NOT counted in expected times because players are unavailable?
	var my_finalExpectedTimeSecs = ""
	var stars = ""
	var showShift1Text = true
	
	
	
	//log("\n-----------------------------------\n\nprocessing upcoming match number", upcomingMatchNr, my_PoolName)
	if(inCount_UM.length == 0){
		//log("in first creating variables")
		inCount_UM[1] = 0
		inReadyCount_UM[1] = 0
		inPlayCount_UM[1] = 0
		unavailable_UM[1] = 0
		predictedTimesArray[1] = []
		expectedTimesArray[1] = []
		totalTimesArray[1] = []
		upcomingMatchInfoObjectsShift[1] = []
	//log("nr of available courts:", nrOfCourts)
	//log("nr of potentially free courts:", freeCourtsAvailable)
	//log("total um count:", totalUmCount)
	//log("total amount of shifts based on amount of upcoming matches:", shiftsCount)
	//log("\n")
	} else if(upcomingMatchNr <= nrOfCourts + unavailable_UM[1]){
		var processCount = []
		processCount[shiftNr] = inCount_UM[shiftNr] + unavailable_UM[shiftNr]
		//log("inR+inP+inU=inPr so far in shift", shiftNr+":", inReadyCount_UM[shiftNr]+"+"+inPlayCount_UM[shiftNr]+"+"+unavailable_UM[shiftNr],"=", processCount[shiftNr])
		if((inReadyCount_UM[shiftNr]+inPlayCount_UM[shiftNr]+unavailable_UM[shiftNr]) != processCount[shiftNr]){
			//log("Error in processing count in shiftnr>:", shiftNr)
			alert("Error in processing count in shiftnr>:", shiftNr)
		}
		
		//log("nr of potentially free courts:", freeCourtsAvailable)
		//log("total amount of matches that are predicted so far:", inTotCount_UM)
		//log("total amount of matches that are predicted so far in shift "+shiftNr+":", inCount_UM[shiftNr])
		//log("amount of matches that are predicted so far and are ready in shift "+shiftNr+":", inReadyCount_UM[shiftNr])
		//log("amount of matches that are predicted so far but are still playing in shift "+shiftNr+":", inPlayCount_UM[shiftNr])
		//log("predicted times array(" + predictedTimeLeftArray.length + "):", predictedTimeLeftArray)
	}
	
	if(upcomingMatchNr <= nrOfCourts + unavailable_UM[1]){ // look at first shift of upcoming matches excluding posptoned match that fits nr of available courts 
		secondpart = false
		if(upcomingMatchNr == nrOfCourts + unavailable_UM[1]){
			showShift1Text = true
		}
		shiftNr = 1
		upcomingMatchInfo.shiftNumber = shiftNr
		
		inShift[shiftNr] = true
		//log("in shiftNr:", shiftNr)
		if(totUnavailable_UM > 0){
			stars = "**" //adds note about this match.
		} else {
		}
		upcomingMatchInfo.stars = stars
		singleUMData.stars = stars
		
		if(my_statusText == readyToPlay){
			if(upcomingMatchNr == nrOfCourts + unavailable_UM[1]){
				showShift1Text = false
			}
			//log("in Shift 1 ready to play")
			//log("free courts available:", freeCourtsAvailable)
			inCount = true; inTotCount_UM +=1; inCount_UM[shiftNr] +=1; inReadyCount_UM[shiftNr]+=1
			inFirstCount = true; inFirstCount_UM +=1
			upcomingMatchInfo.readyToPlay = true
			if(freeCourtsAvailable > 0){
				//log("free court available")
				var my_expectedTime = "free court available"
				freeCourt = true
				stars = ""
				freeCourtsAvailable -=1
				var my_stdDevTime = timeBetweenMatches
				
				expectedTimesArray[shiftNr].push(0)
				upcomingMatchInfo.expectedTime = 0
				upcomingMatchInfo.predictedTime = poolPropertiesObject
				upcomingMatchInfo.stdDevTime = my_stdDevTime
				
				predictedTimesArray[shiftNr].push(poolPropertiesObject.avgTime)
				
				var my_totalTime = {}
				my_totalTime.UMNr = upcomingMatchNr
				my_totalTime.totalTime = Math.ceil(0 + (poolPropertiesObject.avgTime))
				my_totalTime.stdDev = poolPropertiesObject.stdDev 
				upcomingMatchInfo.totalTime = my_totalTime
				totalTimesArray[shiftNr].push(my_totalTime)
				
				shift1upcomingMatchInfoObjects.push(upcomingMatchInfo)
				rtpUpcomingMatchInfoObjects.push(upcomingMatchInfo)
				my_finalExpectedTimeSecs = my_expectedTime
			} else {
				var my_expectedTime = predictedTimeLeftArray[inCount_UM[shiftNr] - 1].timeLeft + timeBetweenMatches
				var my_stdDevTime = predictedTimeLeftArray[inCount_UM[shiftNr] - 1].stdDev
				expectedTimesArray[shiftNr].push(my_expectedTime)
				upcomingMatchInfo.expectedTime = my_expectedTime
				upcomingMatchInfo.predictedTime = poolPropertiesObject
				upcomingMatchInfo.stdDevTime = my_stdDevTime
				predictedTimesArray[shiftNr].push(poolPropertiesObject.avgTime)
				
				var my_totalTime = {}
				my_totalTime.UMNr = upcomingMatchNr
				my_totalTime.totalTime = Math.ceil(my_expectedTime + (poolPropertiesObject.avgTime))
				my_totalTime.stdDev = poolPropertiesObject.stdDev 
				upcomingMatchInfo.totalTime = my_totalTime
				
				totalTimesArray[shiftNr].push(my_totalTime)
				
				shift1upcomingMatchInfoObjects.push(upcomingMatchInfo)
				rtpUpcomingMatchInfoObjects.push(upcomingMatchInfo)
				
				my_finalExpectedTimeSecs = Math.ceil(my_expectedTime)
			}
		} else if(my_statusText == playersCurrentlyPlaying){
			if(upcomingMatchNr == nrOfCourts + unavailable_UM[1]){
				showShift1Text = false
			}
			//log("in shift 1 player playing")
			inCount = true; inTotCount_UM +=1; inCount_UM[1] +=1
			inFirstCount = true; inFirstCount_UM +=1
			inPlayCount = true; inPlayCount_UM[shiftNr] +=1
			upcomingMatchInfo.playersPlaying = true; Playing = true;
			//log("playing player names:", playerNamesCurrentlyPlayingArray)
			var my_freeCourtExpectedTime = predictedTimeLeftArray[inCount_UM[1] - 1].timeLeft + timeBetweenMatches // needed if this will be higher than expected time with predicted time
			var my_freeCourtstdDevTime = predictedTimeLeftArray[inCount_UM[shiftNr] - 1].stdDev

			var my_predictedTimeReturns = findPlayersPlaying(playerNamesCurrentlyPlayingArray, my_locationsList, playersPlayingObects, predictedTimeLeftofPlayingPlayersArray)
			var my_predictedTime = my_predictedTimeReturns[0]
			//log(my_predictedTimeReturns)
			var playerPoolproperties = findPoolProperties(my_predictedTimeReturns[1])
			
			var my_predictedExpectedTime = my_predictedTime + pauseTime + timeBetweenMatches
			var my_predictedStdDevTime = playerPoolproperties.stdDev
			
			if(my_freeCourtExpectedTime >= my_predictedExpectedTime){ // if free court expected time is higher than predicted time, this will be my expecte time 
				var my_expectedTime = my_freeCourtExpectedTime
				var my_stdDevTime = my_freeCourtstdDevTime
			} else { // predicted time is higher and thus my expected time 
				var my_expectedTime = my_predictedExpectedTime
				var my_stdDevTime = my_predictedStdDevTime
			}
			my_finalExpectedTimeSecs = Math.ceil(my_expectedTime)
			upcomingMatchInfo.UMCount1 = inCount_UM[1]
			
			upcomingMatchInfo.expectedTime = my_expectedTime
			upcomingMatchInfo.stdDevTime = my_stdDevTime
			expectedTimesArray[shiftNr].push(my_expectedTime)
			upcomingMatchInfo.predictedTime = poolPropertiesObject
			predictedTimesArray[shiftNr].push(poolPropertiesObject.avgTime)
			
			var my_totalTime = {}
			my_totalTime.UMNr = upcomingMatchNr
			my_totalTime.totalTime = Math.ceil(my_expectedTime + (poolPropertiesObject.avgTime))
			my_totalTime.stdDev = poolPropertiesObject.stdDev
			
			upcomingMatchInfo.totalTime = my_totalTime
			totalTimesArray[shiftNr].push(my_totalTime)
			
			shift1upcomingMatchInfoObjects.push(upcomingMatchInfo)
			playersPlayingExpectedTimesArray.push(my_expectedTime)
			ppUpcomingMatchInfoObjects.push(upcomingMatchInfo)
		} else if(my_statusText == playersUnavailable){
			if(upcomingMatchNr == nrOfCourts + unavailable_UM[1]){
				showShift1Text = false
			}
			upcomingMatchInfo.playersUnavailable = true
			//log("in shift 1 player unavailable")

			inUnavailable = true; totUnavailable_UM +=1; unavailable_UM[1] +=1
			
			my_finalExpectedTimeSecs = "unknown"
			upcomingMatchInfo.expectedTime = "unknown"
			upcomingMatchInfo.predictedTime = "unknown"
			
			/*upcomingMatchInfo.totalTime = {}
			upcomingMatchInfo.totalTime.totalTime = "unknown"
			upcomingMatchInfo.totalTime.stdDev = "unknown"
			upcomingMatchInfo.totalTime.UMNr = upcomingMatchNr*/
		}
		upcomingMatchInfoObjectsShift[shiftNr].push(upcomingMatchInfo)
		allUpcomingMatchInfoObjects.push(upcomingMatchInfo)
		if(upcomingMatchNr == (nrOfCourts + unavailable_UM[1])){
			//log("end of shift 1")
			//log("upcomingMatchesInfoObjects:", allUpcomingMatchInfoObjects)
			//log("expected times array:", expectedTimesArray[shiftNr])
			//log("predicted times array:", predictedTimesArray[shiftNr])
			
			playersPlayingExpectedTimesArray.sort(function(a, b){return a-b})
			totalTimesArray[shiftNr].sort(function(a, b){return a.totalTime.totalTime - b.totalTime.totalTime})
			//log("total times array:", totalTimesArray[shiftNr])
			
			smallestExpectedTimesArray[shiftNr] = expectedTimesArray[shiftNr]
			smallestExpectedTimesArray[shiftNr].sort(function(a, b){return a-b})
			
			shift1upcomingMatchInfoObjects.sort(function(a, b){return a.totalTime.totalTime - b.totalTime.totalTime})
			rtpUpcomingMatchInfoObjects.sort(function(a, b){return a.totalTime.totalTime - b.totalTime.totalTime})
			shift1ppCount = ppUpcomingMatchInfoObjects.length
			ppUpcomingMatchInfoObjects.sort(function(a, b){return a.predictedTime.time - b.predictedTime.time})
			//log(shift1upcomingMatchInfoObjects, rtpUpcomingMatchInfoObjects, ppUpcomingMatchInfoObjects)
			
			////log("well...", totalTimesArray[shiftNr], totalTimesArray[shiftNr][0].totalTime)
			shiftStartTime += ((totalTimesArray[shiftNr][0].totalTime))
			//log("shift2 starttime:", shiftStartTime)
		}
	} else if(upcomingMatchNr > (nrOfCourts + unavailable_UM[1])){ //look after the first shift
			secondpart = true
			shiftNr +=1
			if(shiftNr >=3){
				Playing = false
			}
			upcomingMatchInfo.shiftNumber = shiftNr
			//log("in shiftNr:", shiftNr)
			//log("Shift start time:", Math.ceil(shiftStartTime / 60), "mins.")
			if(typeof inCount_UM[shiftNr] == 'undefined'){
				//log("in shift "+ shiftNr + " creating variables")
				inCount_UM[shiftNr] = 0
				inReadyCount_UM[shiftNr] = 0
				inPlayCount_UM[shiftNr] = 0
				unavailable_UM[shiftNr] = 0
				totalTimesArray[shiftNr] = []
				expectedTimesArray[shiftNr] = []
				predictedTimesArray[shiftNr] = []
				upcomingMatchInfoObjectsShift[shiftNr] = []
			}
			
			var processCount = []
			processCount[shiftNr] = inCount_UM[shiftNr] + unavailable_UM[shiftNr]
			//log("inR+inP+inU=inPr so far in Shift", shiftNr+":", inReadyCount_UM[shiftNr]+"+"+inPlayCount_UM[shiftNr]+"+"+unavailable_UM[shiftNr],"=", processCount[shiftNr])
			if((inReadyCount_UM[shiftNr]+inPlayCount_UM[shiftNr]+unavailable_UM[shiftNr]) != processCount[shiftNr]){
				//log("Error in processing count in shiftnr:", shiftNr)
				alert("Error in processing count in shiftNr.:", shiftNr)
			}
			
			//log("nr of potentially free courts:", freeCourtsAvailable)
			//log("total amount of matches that are predicted so far:", inTotCount_UM)
			//log("total amount of matches that are predicted so far in shift "+shiftNr+":", inCount_UM[shiftNr])
			//log("amount of matches that are predicted so far and are ready in shift "+shiftNr+":", inReadyCount_UM[shiftNr])
			//log("amount of matches that are predicted so far but are still playing in shift "+shiftNr+":", inPlayCount_UM[shiftNr])
			
			//log("predicted times array(" + predictedTimeLeftArray.length + "):", predictedTimeLeftArray)
			
			var inFirstUM = false
			prevShiftNr = shiftNr - 1
			
			var prevShiftUpperBound = ((prevShiftNr * nrOfCourts) + (totUnavailable_UM - unavailable_UM[shiftNr]))
			var greaterThanPrevShift = (upcomingMatchNr > prevShiftUpperBound)
			
			var nextShiftLowerBound = ((shiftNr * nrOfCourts) + totUnavailable_UM)
			var smallerEquThanNextShift =  ((upcomingMatchNr - inTotCount_UM) <= nextShiftLowerBound)
			
			//log(">:"+ greaterThanPrevShift, "<=:"+smallerEquThanNextShift)
			if(greaterThanPrevShift == true && smallerEquThanNextShift == true){
				if(totUnavailable_UM > 0){
					stars = "**" //adds note about this match.
				} else {
					stars=""
				}
				upcomingMatchInfo.stars = stars
				singleUMData.stars = stars
				
				if(my_statusText == readyToPlay){
					//log("in Shift", shiftNr, "ready to play")
					inCount = true; inTotCount_UM +=1; inCount_UM[shiftNr] +=1; inReadyCount_UM[shiftNr] +=1;
					upcomingMatchInfo.readyToPlay = true
					if(freeCourtsAvailable > 0){
						var my_expectedTime = "free court available"
						var my_stdDevTime = timeBetweenMatches
						freeCourt = true
						stars = ""
						freeCourtsAvailable -=1
						
						expectedTimesArray[shiftNr].push(0)
						upcomingMatchInfo.expectedTime = 0
						upcomingMatchInfo.predictedTime = poolPropertiesObject
						predictedTimesArray[shiftNr].push(poolPropertiesObject.avgTime)
						
						upcomingMatchInfo.stdDevTime = my_stdDevTime
						
						var my_totalTime = {}
						my_totalTime.UMNr = upcomingMatchNr
						my_totalTime.totalTime = Math.ceil(0 + (poolPropertiesObject.avgTime))
						my_totalTime.stdDev = poolPropertiesObject.stdDev 
						upcomingMatchInfo.totalTime = my_totalTime
						totalTimesArray[shiftNr].push(my_totalTime)
												
						upcomingMatchInfoObjectsShift[shiftNr].push(upcomingMatchInfo)
						allUpcomingMatchInfoObjects.push(upcomingMatchInfo)
						
						my_finalExpectedTimeSecs = my_expectedTime

					} else {
						if(prevShiftNr == 1){
							altshift2count +=1
							if(Playing == true){
								//log("in alt. shift2", shift1ppCount, altshift2count, altshift2ppCount)
								////log("nr.", inCount_UM[shiftNr] - 1,inCount_UM[shiftNr] - altshift2ppCount - 1,   shift1upcomingMatchInfoObjects[inCount_UM[shiftNr] - 1].expectedTime)
								//log("nr2.", shift1upcomingMatchInfoObjects,  shift1upcomingMatchInfoObjects[inCount_UM[shiftNr] - altshift2ppCount - 1].expectedTime)
								var my_prevExpectedTime = shift1upcomingMatchInfoObjects[inCount_UM[shiftNr] - altshift2ppCount - 1].expectedTime
								var inr = 0
								while (my_prevExpectedTime == 0){
									my_prevExpectedTime = shift1upcomingMatchInfoObjects[inCount_UM[shiftNr] - altshift2ppCount - 1 + inr].expectedTime
									//log(inr, my_prevExpectedTime)
									inr++
								}
								var my_potExpectedTime = my_prevExpectedTime + timeBetweenMatches
								
								//log("prev expected time: ", (my_potExpectedTime / 60))
								
								if(ppUpcomingMatchInfoObjects.length > 0){
									altshift2ppCount +=1
									var my_playingExpectedTime = ppUpcomingMatchInfoObjects[0].expectedTime
									//log(my_playingExpectedTime, my_potExpectedTime)
									if (my_playingExpectedTime > my_potExpectedTime){
										//log("shift 2 match is first")
										ppUMCountNr = ppUpcomingMatchInfoObjects[0].UMCount1
										var predictedTimeLeftIndexNr = initialFreeCourts + (ppUMCountNr - 1)
										my_expectedTime = predictedTimeLeftArray[predictedTimeLeftIndexNr].timeLeft + timeBetweenMatches
										my_stdDevTime = predictedTimeLeftArray[predictedTimeLeftIndexNr].stdDev
										upcomingMatchInfo.predictedTime = poolPropertiesObject
										upcomingMatchInfo.expectedTime = my_playingExpectedTime
										
										my_totalTime = {}
										my_totalTime.totalTime = poolPropertiesObject.avgTime + my_playingExpectedTime
										my_totalTime.stdDev = poolPropertiesObject.stdDev
										
										upcomingMatchInfo.totalTime = my_totalTime
										
										//log(upcomingMatchInfo, rtpUpcomingMatchInfoObjects)
										rtpUpcomingMatchInfoObjects.push(upcomingMatchInfo)
										try{
											rtpUpcomingMatchInfoObjects.sort(function(a, b){return a.totalTime.totalTime - b.totalTime.totalTime})								
										} catch (err){}
									} else {
										//log("shift 2 match is after")
										my_playingExpectedTime = ppUpcomingMatchInfoObjects[0].expectedTime
										
										my_expectedTime = totalTimesArray[1][0].totalTime + my_playingExpectedTime + timeBetweenMatches
										my_stdDevTime = totalTimesArray[1][0].stdDev
										//log(shiftStartTime, my_playingExpectedTime, my_expectedTime)				
									}
									ppUpcomingMatchInfoObjects.shift()
								} else {
									//log("shift 2 match follows regular pattern after playing matches")
									//log(rtpUpcomingMatchInfoObjects, shift1rtp)
									//if(shift1rtp < rtpUpcomingMatchInfoObjects.length){
										var my_rtpTotalTime = rtpUpcomingMatchInfoObjects[shift1rtp].totalTime.totalTime 
										//log(my_rtpTotalTime)
										var my_expectedTime = /*shiftStartTime + */my_rtpTotalTime + timeBetweenMatches
										var my_stdDevTime = rtpUpcomingMatchInfoObjects[shift1rtp].stdDevTime + rtpUpcomingMatchInfoObjects[shift1rtp].totalTime.stdDev //chain effect. stdDev of current playing match + stdDev of match in shuft 1 
										shift1rtp =+1
									//} else {
										//var my_ppTotalTime = ppUpcomingMatchInfoObjects[shift1pp].totalTime.totalTime 
										//var my_expectedTime = /*shiftStartTime + */my_rtpTotalTime + timeBetweenMatches
										//var my_stdDevTime = ppUpcomingMatchInfoObjects[shift1pp].stdDevTime + ppUpcomingMatchInfoObjects[shift1pp].totalTime.stdDev //chain effect. stdDev of current playing match + stdDev of match in shuft 1 
										//pshift1pp +=1
									//}*/
									//rtpUpcomingMatchInfoObjects.shift()
								}
							} else {									
								//log("shift 1 has no players playing")
								var my_expectedTime = shiftStartTime + ((totalTimesArray[prevShiftNr][inCount_UM[shiftNr] - 1].totalTime) - shiftStartTime) + timeBetweenMatches
								var stdDevPrevMatchesObject = allUMdata.find(x => x.UMNr === totalTimesArray[prevShiftNr][inCount_UM[shiftNr] - 1].UMNr)
								var stdDevPrevMatches = stdDevPrevMatchesObject.stdDevTime
								var stdDevLastMatch = totalTimesArray[prevShiftNr][inCount_UM[shiftNr] - 1].stdDev
								var my_stdDevTime = stdDevPrevMatches + stdDevLastMatch
							}	
						} else {
							//log("in shift 3 or later")
							shift1ppCount = 0
							if(shiftNr == 3){
								if(inCount_UM[3] == nrOfCourts - altshift2ppCount){
									//log("before index")
									function addanIndex(){
										//log("in index function")
										if(addIndex < altshift2ppCount){
											//log("adding index")
											addIndex +=1
											var my_returns= []
											var my_AddedExpectedTime = shiftStartTime + ((totalTimesArray[prevShiftNr][inCount_UM[shiftNr] + addIndex - 1].totalTime) - shiftStartTime) + timeBetweenMatches
											my_returns.push(my_AddedExpectedTime)
											
											var stdDevPrevMatchesObject = allUMdata.find(x => x.UMNr === totalTimesArray[prevShiftNr][inCount_UM[shiftNr] + addIndex - 1].UMNr)
											var stdDevPrevMatches = stdDevPrevMatchesObject.stdDevTime
											var stdDevLastMatch = totalTimesArray[prevShiftNr][inCount_UM[shiftNr] + addIndex - 1].stdDev
											
											var my_stdDevTime = stdDevPrevMatches + stdDevLastMatch
											my_returns.push(my_stdDevTime)
											//log(my_returns)
											addanIndex()
											expectedTimesArray[shiftNr].push(my_AddedExpectedTime)
											my_AddedPredictedTime = predictedTimesArray[prevShiftNr][inCount_UM[shiftNr] + addIndex - 1]
											predictedTimesArray[shiftNr].push(my_AddedPredictedTime)
											
											var my_totalTime = {}
											my_totalTime.UMNr = upcomingMatchNr
											my_totalTime.totalTime = my_AddedExpectedTime + my_AddedPredictedTime
											my_totalTime.stdDev = poolPropertiesObject.stdDev 
											totalTimesArray[shiftNr].push(my_totalTime)
											
											//totalTimesArray.sort(function(a, b){return a-b})
											//log(expectedTimesArray[shiftNr], predictedTimesArray[shiftNr], totalTimesArray[shiftNr])
										}
									return my_returns}
									var my_returns = addanIndex()
									var my_expectedTime = my_returns[0]
									var my_stdDevTime = my_returns[1]
								} else {
									////log(totalTimesArray[prevShiftNr][inCount_UM[shiftNr] - 1])
									var my_expectedTime = shiftStartTime + ((totalTimesArray[prevShiftNr][inCount_UM[shiftNr] - 1].totalTime) - shiftStartTime) + timeBetweenMatches
																
									var stdDevPrevMatchesObject = allUMdata.find(x => x.UMNr === totalTimesArray[prevShiftNr][inCount_UM[shiftNr] - 1].UMNr)
									var stdDevPrevMatches = stdDevPrevMatchesObject.stdDevTime
									var stdDevLastMatch = totalTimesArray[prevShiftNr][inCount_UM[shiftNr] - 1].stdDev
									//log("I see", totalTimesArray[prevShiftNr][inCount_UM[shiftNr] - 1], stdDevPrevMatchesObject, stdDevPrevMatches, stdDevLastMatch)

									var my_stdDevTime = stdDevPrevMatches + stdDevLastMatch
								}
							} else { // > shift 3
								//log(prevShiftNr, totalTimesArray[prevShiftNr][inCount_UM[shiftNr] - 1])
								var my_expectedTime = shiftStartTime + ((totalTimesArray[prevShiftNr][inCount_UM[shiftNr] - 1].totalTime) - shiftStartTime) + timeBetweenMatches
								

								var stdDevPrevMatchesObject = allUMdata.find(x => x.UMNr === totalTimesArray[prevShiftNr][inCount_UM[shiftNr] - 1].UMNr)
								
								var stdDevPrevMatches = stdDevPrevMatchesObject.stdDevTime
								var stdDevLastMatch = totalTimesArray[prevShiftNr][inCount_UM[shiftNr] - 1].stdDev
								//log("I see 2", totalTimesArray[prevShiftNr][inCount_UM[shiftNr] - 1], stdDevPrevMatchesObject, stdDevPrevMatches, stdDevLastMatch)

								var my_stdDevTime = stdDevPrevMatches + stdDevLastMatch
							}
						}
					}
					////log(prevShiftNr, totalTimesArray[prevShiftNr][inCount_UM[shiftNr] - 1])
					////log("expected time:", shiftStartTime, totalTimesArray[prevShiftNr][inCount_UM[shiftNr] - 1].totalTime.totalTime, my_expectedTime)
					expectedTimesArray[shiftNr].push(my_expectedTime)
					upcomingMatchInfo.expectedTime = my_expectedTime
					upcomingMatchInfo.stdDevTime = my_stdDevTime
					expectedTimesArray[shiftNr].sort(function(a, b){return a-b})
					
					my_predictedPlayingTime = poolPropertiesObject.avgTime
					predictedTimesArray[shiftNr].push(my_predictedPlayingTime)
					upcomingMatchInfo.predictedTime = poolPropertiesObject.avgTime
					
					var my_totalTime = {}
					my_totalTime.UMNr = upcomingMatchNr
					my_totalTime.totalTime = Math.ceil((my_expectedTime) + (my_predictedPlayingTime))
					my_totalTime.stdDev = poolPropertiesObject.stdDev 
					totalTimesArray[shiftNr].push(my_totalTime)
					totalTimesArray[shiftNr].sort(function(a, b){return a.totalTime.totalTime - b.totalTime.totalTime})
					
					upcomingMatchInfo.totalTime = my_totalTime
					upcomingMatchInfoObjectsShift[shiftNr].push(upcomingMatchInfo)
					allUpcomingMatchInfoObjects.push(upcomingMatchInfo)
					my_finalExpectedTimeSecs = Math.ceil(my_expectedTime)					
				} else if(my_statusText == playersCurrentlyPlaying){
					//log("in shift " + shiftNr +" player playing")
					inCount = true;	inCount_UM[shiftNr] +=1; inTotCount_UM +=1
					inPlayCount = true;	inPlayCount_UM[shiftNr] +=1
					upcomingMatchInfo.playersPlaying = true

					//log("playing player names:", playerNamesCurrentlyPlayingArray)
					//log(predictedTimeLeftArray, inCount_UM[shiftNr])
					if(inCount_UM[shiftNr] < predictedTimeLeftArray.length){
						var my_freeCourtExpectedTime = predictedTimeLeftArray[inCount_UM[shiftNr] - 1].timeLeft + timeBetweenMatches // needed if this will be higher than expected time with predicted time
						var my_freeCourtstdDevTime = predictedTimeLeftArray[inCount_UM[shiftNr] - 1].stdDev
					} else {
						var my_freeCourtExpectedTime = 0
						var my_freeCourtstdDevTime = 0
					}
					var my_predictedTimeReturns = findPlayersPlaying(playerNamesCurrentlyPlayingArray, my_locationsList, playersPlayingObects, predictedTimeLeftofPlayingPlayersArray)
					var my_predictedTime = my_predictedTimeReturns[0]
					var playerPoolproperties = findPoolProperties(my_predictedTimeReturns[1])
					var my_predictedStdDevTime = playerPoolproperties.stdDev
					var my_readyExpectedTime
					if (Playing == true){
							altshift2count +=1
							if(prevShiftNr == 1){
								////////////log("in alt. shift2", shift1ppCount, altshift2count, altshift2ppCount)
								////////////log("nr.", inCount_UM[shiftNr] - 1,inCount_UM[shiftNr] - altshift2ppCount - 1,   shift1upcomingMatchInfoObjects[inCount_UM[shiftNr] - 1].expectedTime)
								//log("nr2.", shift1upcomingMatchInfoObjects,  shift1upcomingMatchInfoObjects[inCount_UM[shiftNr] - altshift2ppCount - 1].expectedTime)
								var my_prevExpectedTime = shift1upcomingMatchInfoObjects[inCount_UM[shiftNr] - altshift2ppCount - 1].expectedTime
								var my_potExpectedTime = my_prevExpectedTime + timeBetweenMatches
								
								//log("prev expected time: ", (my_potExpectedTime / 60))
								
								if(ppUpcomingMatchInfoObjects.length > 0){
									altshift2ppCount +=1
									var my_playingExpectedTime = ppUpcomingMatchInfoObjects[0].expectedTime
									if (my_playingExpectedTime > my_potExpectedTime){
										//log("shift 2 match is first")
										ppUMCountNr = ppUpcomingMatchInfoObjects[0].UMCount1										
										my_expectedTime = predictedTimeLeftArray[ppUMCountNr - 1].timeLeft + timeBetweenMatches
										my_stdDevTime = predictedTimeLeftArray[ppUMCountNr - 1].stdDev

										//log(my_expectedTime, my_stdDevTime)
										upcomingMatchInfo.predictedTime = poolPropertiesObject.avgTime
										upcomingMatchInfo.expectedTime = my_playingExpectedTime
										upcomingMatchInfo.stdDevTime = my_stdDevTime
										
										var my_totalTime = {}
										my_totalTime.UMNr = upcomingMatchNr
										my_totalTime.totalTime = poolPropertiesObject.avgTime + my_playingExpectedTime
										//log(my_totalTime, my_totalTime.totalTime)
										my_totalTime.stdDev = poolPropertiesObject.stdDev
										
										upcomingMatchInfo.totalTime = my_totalTime	
										rtpUpcomingMatchInfoObjects.push(upcomingMatchInfo)
										
										//log("hatza:", upcomingMatchInfo, rtpUpcomingMatchInfoObjects)
									
										rtpUpcomingMatchInfoObjects.sort(function(a, b){return a.totalTime.totalTime - b.totalTime.totalTime})								
									} else {
										//log("shift 2 match is after")
										my_playingExpectedTime = ppUpcomingMatchInfoObjects[0].expectedTime
										
										my_expectedTime = totalTimesArray[1][0].totalTime + my_playingExpectedTime + timeBetweenMatches
										
										var stdDevPrevMatchesObject = allUMdata.find(x => x.UMNr === totalTimesArray[1][0].UMNr)
										var stdDevPrevMatches = stdDevPrevMatchesObject.stdDevTime
										var stdDevLastMatch = totalTimesArray[1][0].stdDev
										my_stdDevTime = stdDevPrevMatches + stdDevLastMatch
										 
										//log(shiftStartTime, my_playingExpectedTime, my_expectedTime)				
									}
									ppUpcomingMatchInfoObjects.shift()
								} else {
									//log("shift 2 match follows regular pattern after playing matches")
									var my_rtpTotalTime = rtpUpcomingMatchInfoObjects[shift1rtp].totalTime.totalTime 
									var my_expectedTime = /*shiftStartTime + */my_rtpTotalTime + timeBetweenMatches
									
									var stdDevPrevMatchesObject = allUMdata.find(x => x.UMNr === rtpUpcomingMatchInfoObjects[shift1rtp].totalTime.UMNr)
									var stdDevPrevMatches = stdDevPrevMatchesObject.stdDevTime
									var stdDevLastMatch = rtpUpcomingMatchInfoObjects[shift1rtp].totalTime.stdDev
									var my_stdDevTime = stdDevPrevMatches + stdDevLastMatch
								}
							} else {									
								//log("shift 1 has no players playing")
								var my_readyExpectedTime = shiftStartTime + ((totalTimesArray[prevShiftNr][inCount_UM[shiftNr] - 1].totalTime) - shiftStartTime) + timeBetweenMatches
								
								var stdDevPrevMatchesObject = allUMdata.find(x => x.UMNr === totalTimesArray[prevShiftNr][inCount_UM[shiftNr] - 1].UMNr)
								var stdDevPrevMatches = stdDevPrevMatchesObject.stdDevTime
								var stdDevLastMatch = totalTimesArray[prevShiftNr][inCount_UM[shiftNr] - 1].stdDev
								
								var my_readyStdDevTime = stdDevPrevMatches + stdDevLastMatch
							}	
					} else {
						//log("in shift 3 or later")
						shift1ppCount = 0
						if (shiftNr == 3){
							if(inCount_UM[3] == nrOfCourts - altshift2ppCount){
								function addanIndex(){
									//log("in index function")
									if(addIndex < altshift2ppCount){
										//log("adding index")
										addIndex +=1
										var my_returns = []
										var my_AddedExpectedTime = shiftStartTime + ((totalTimesArray[prevShiftNr][inCount_UM[shiftNr] + addIndex - 1].totalTime) - shiftStartTime) + timeBetweenMatches
										my_returns.push(my_AddedExpectedTime)
										
										var stdDevPrevMatchesObject = allUMdata.find(x => x.UMNr === totalTimesArray[prevShiftNr][inCount_UM[shiftNr] + addIndex - 1].UMNr)
										var stdDevPrevMatches = stdDevPrevMatchesObject.stdDevTime
										var stdDevLastMatch = totalTimesArray[prevShiftNr][inCount_UM[shiftNr] + addIndex - 1].stdDev
										var my_stdDevTime = stdDevPrevMatches + stdDevLastMatch
										
										my_returns.push(my_stdDevTime)
										//log(my_returns)
										
										addanIndex()
										expectedTimesArray[shiftNr].push(my_AddedExpectedTime)
										my_AddedPredictedTime = predictedTimesArray[prevShiftNr][inCount_UM[shiftNr] + addIndex - 1]
										predictedTimesArray[shiftNr].push(my_AddedPredictedTime)
										
										var my_totalTime = {}
										my_totalTime.UMNr = upcomingMatchNr
										my_totalTime.totalTime = my_AddedExpectedTime + my_AddedPredictedTime
										my_totalTime.stdDev = poolPropertiesObject.stdDev 
										totalTimesArray[shiftNr].push(my_totalTime)
										
										
										//totalTimesArray.sort(function(a, b){return a-b})
										//log(expectedTimesArray[shiftNr], predictedTimesArray[shiftNr], totalTimesArray[shiftNr])
									}
								return my_returns}
							var my_returns = addanIndex()
							var my_expectedTime = my_returns[0]
							var my_stdDevTime = my_returns[1]
							} else {
								var my_expectedTime = shiftStartTime + ((totalTimesArray[prevShiftNr][inCount_UM[shiftNr] - 1].totalTime) - shiftStartTime) + timeBetweenMatches
								
								var stdDevPrevMatchesObject = allUMdata.find(x => x.UMNr === totalTimesArray[prevShiftNr][inCount_UM[shiftNr] - 1].UMNr)
								var stdDevPrevMatches = stdDevPrevMatchesObject.stdDevTime
								var stdDevLastMatch = totalTimesArray[prevShiftNr][inCount_UM[shiftNr] - 1].stdDev
								var my_stdDevTime = stdDevPrevMatches + stdDevLastMatch
								
							}
						} else {
							var my_readyExpectedTime = shiftStartTime + ((totalTimesArray[prevShiftNr][inCount_UM[shiftNr] - 1].totalTime) - shiftStartTime) + timeBetweenMatches
							
							var stdDevPrevMatchesObject = allUMdata.find(x => x.UMNr === totalTimesArray[prevShiftNr][inCount_UM[shiftNr] - 1].UMNr)
							var stdDevPrevMatches = stdDevPrevMatchesObject.stdDevTime
							var stdDevLastMatch = totalTimesArray[prevShiftNr][inCount_UM[shiftNr] - 1].stdDev
							var my_readyStdDevTime = stdDevPrevMatches + stdDevLastMatch
						}
					}
					
						//var my_readyExpectedTime =  shiftStartTime + ((totalTimesArray[prevShiftNr][inCount_UM[shiftNr] - 1]) - shiftStartTime) + timeBetweenMatches
					/*if(shiftStartTime > averageMatchTimes[my_PoolName].time){
						
					}*/
					if(my_readyExpectedTime >= my_predictedTime){
						//log("players are ready before upcoming match is expected")
						var my_predictedExpectedTime = my_readyExpectedTime - shiftStartTime//- my_predictedTime //shiftStartTime is removed becuase it is aready in the readyExpectedTime.
						var my_predictedstdDevTime = my_readyStdDevTime
					} else {
						//log("upcoming match is expected before players are ready")
						var my_predictedExpectedTime = my_predictedTime + pauseTime + timeBetweenMatches
						var my_predictedStdDevTime =  my_predictedStdDevTime
					}
					
					//log(my_stdDevTime)
					if(my_freeCourtExpectedTime >= my_predictedExpectedTime){ // if free court expected time is higher than predicted time, this will be my expected time 
						//log("court is first free")
						var my_expectedTime = shiftStartTime + my_freeCourtExpectedTime
						var my_stdDevTime = my_freeCourtstdDevTime
					} else { // predicted time is higher and thus my expected time 
						//log("players are first free")
						var my_expectedTime = shiftStartTime + my_predictedExpectedTime
						//log(my_predictedStdDevTime)
						var my_stdDevTime = my_predictedStdDevTime
					}
					//log(my_stdDevTime)
					//log("expected time Player playing:", my_expectedTime, my_stdDevTime)
					my_finalExpectedTimeSecs = Math.ceil(my_expectedTime)
					
					expectedTimesArray[shiftNr].push(my_finalExpectedTimeSecs)
					expectedTimesArray[shiftNr].sort(function(a, b){return a-b})
					
					upcomingMatchInfo.expectedTime = my_finalExpectedTimeSecs
					upcomingMatchInfo.stdDevTime = my_stdDevTime
					
					upcomingMatchInfo.predictedTime = poolPropertiesObject
					predictedTimesArray[shiftNr].push(poolPropertiesObject.avgTime)

					var my_totalTime = {}
					my_totalTime.UMNr = upcomingMatchNr
					my_totalTime.totalTime = Math.ceil(my_expectedTime + (poolPropertiesObject.avgTime))
					my_totalTime.stdDev = poolPropertiesObject.stdDev 
					
					upcomingMatchInfo.totalTime = my_totalTime
					totalTimesArray[shiftNr].push(my_totalTime)
					totalTimesArray[shiftNr].sort(function(a, b){return a.totalTime.totalTime - b.totalTime.totalTime})
					upcomingMatchInfoObjectsShift[shiftNr].push(upcomingMatchInfo)
					allUpcomingMatchInfoObjects.push(upcomingMatchInfo)
				} else if(my_statusText == playersUnavailable){
					//log("in shift " + shiftNr+" player unavailable")
					inUnavailable = true; totUnavailable_UM +=1; unavailable_UM[shiftNr] +=1
					upcomingMatchInfo.playersUnavailable = true
					
					my_finalExpectedTimeSecs = "unknown"
					upcomingMatchInfo.expectedTime = "unknown"
					upcomingMatchInfo.predictedTime = "unknown"
					upcomingMatchInfo.stdDevTime = "unknown"
					upcomingMatchInfoObjectsShift[shiftNr].push(upcomingMatchInfo)
					allUpcomingMatchInfoObjects.push(upcomingMatchInfo)
				}
				var endShift = false
				
				if(upcomingMatchNr == ((shiftNr * nrOfCourts) + totUnavailable_UM)+shift1ppCount){
					endShift = true
					//log("end of shift "+shiftNr)
					//log("upcomingMatchesInfoObjects:", allUpcomingMatchInfoObjects)
					//log("expected times array:", expectedTimesArray[shiftNr])
					//log("predicted times array:", predictedTimesArray[shiftNr])
					totalTimesArray[shiftNr].sort(function(a, b){return a.totalTime.totalTime - b.totalTime.totalTime})
					//log("total times array:", totalTimesArray[shiftNr])
					smallestExpectedTimesArray[shiftNr] = expectedTimesArray[shiftNr]
					smallestExpectedTimesArray[shiftNr].sort(function(a, b){return a-b})
					if(shiftNr == 2 && altshift2ppCount > 0){
						//log("in playing startshift")
						shiftStartTime += ((totalTimesArray[shiftNr][0].totalTime))
						//log(shiftStartTime)
					} else {
						//log("in normal startshift")
						shiftStartTime += ((totalTimesArray[shiftNr][0].totalTime))
					}
					
					//log("going to shiftNr.", shiftNr + 1, "with shiftStartTime:", (Math.ceil(shiftStartTime / 60)), "mins.")							
				} else {
					//log("remaining in shiftNr.", shiftNr)
					shiftNr -=1 //if match number is still processing within a shift, shift nr won't change.
				}
			}
	} else {
		alert("There is an error with the upcomingMatchNr:", upcomingMatchNr)
	}
		
	//show shiftNR in table
	if(sampleData == true){
		if(secondpart == true){
			if(endShift == true){
				var my_shiftNr = shiftNr + ". "
			} else {
				var my_shiftNr = (shiftNr + 1) + ". "
			}
		} else { //secondpart == false
			var my_shiftNr = shiftNr + ". "
		}
	} else {
		var my_shiftNr = ""
	}
	upcomingMatchInfo.sNr = my_shiftNr
	singleUMData.sNr = my_shiftNr
	singleUMData.stdDevTime = upcomingMatchInfo.stdDevTime
	
	if(typeof my_finalExpectedTimeSecs == 'number'){
		my_finalExpectedTimeMins = Math.ceil(my_finalExpectedTimeSecs/60)
	} else if(my_finalExpectedTimeSecs == "unknown"){
		my_finalExpectedTimeMins = 9999999999999999999999999999999999999
	} else if(my_finalExpectedTimeSecs == "free court available"){
		my_finalExpectedTimeMins = 0
	} else {
		my_finalExpectedTimeMins = my_finalExpectedTimeSecs
	}							
	
	////log(my_stdDevTime)
	var extraExpectedTimeNames = namedExpectedTime(my_PoolName, my_finalExpectedTimeMins, my_stdDevTime)
	
	var my_namedFinalExpectedTimeMins = extraExpectedTimeNames[0]
	var finalStdDeviationTime = extraExpectedTimeNames[1]
	////log(finalStdDeviationTime)
	//expected times properties
	
	if (inUnavailable == true) {
		//tri.append("<td class='expectedTimeColumn'>"+my_finalExpectedTimeSecs+"</td>");
		singleUMData.expectedTimeSecs = 9999999999999999999999999999999999999
		singleUMData.shiftNrExpectedTimeSecs = my_shiftNr + my_finalExpectedTimeSecs
		singleUMData.expectedTimeMins = 9999999999999999999999999999999999999
		singleUMData.shiftNrExpectedTimeSecsMins = my_shiftNr + "unknown"
		singleUMData.shiftNrExpectedTimeMins = my_shiftNr + "unknown"
		singleUMData.shiftNrExpectedTimeMinsStdDev = "unknown"
		singleUMData.NamedExpectedTime = "unknown"
		singleUMData.StdDevExpectedTime = "unknown"
	} else {
		if (freeCourt == true) {
			//tri.append("<td class='expectedTimeColumn'>"+my_finalExpectedTimeSecs+"</td>");
			singleUMData.expectedTimeSecs = 0
			singleUMData.shiftNrExpectedTimeSecs = my_shiftNr + "free court available"
			singleUMData.expectedTimeMins = 0
			singleUMData.shiftNrExpectedTimeSecsMins = my_shiftNr + "free court available"
			singleUMData.shiftNrExpectedTimeMins = my_shiftNr + "free court available"
			singleUMData.shiftNrExpectedTimeMinsStdDev = "free court available"
			singleUMData.NamedExpectedTime = "free court available"
			singleUMData.StdDevExpectedTime = "free court available"
			
		} else {
			//tri.append("<td class='expectedTimeColumn'>"+my_namedFinalExpectedTimeMins+" mins."+stars+"</td>");
			singleUMData.expectedTimeSecs = my_finalExpectedTimeSecs
			singleUMData.shiftNrExpectedTimeSecs = my_shiftNr + my_finalExpectedTimeSecs + stars
			singleUMData.expectedTimeMins = my_finalExpectedTimeMins
			singleUMData.shiftNrExpectedTimeSecsMins = my_shiftNr +my_finalExpectedTimeSecs+" secs., "+my_finalExpectedTimeMins +" mins."+ stars
			singleUMData.shiftNrExpectedTimeMins = my_shiftNr +my_finalExpectedTimeMins + " mins." + stars
			singleUMData.shiftNrExpectedTimeMinsStdDev = my_shiftNr +my_finalExpectedTimeMins + " mins. ±" + Math.ceil(my_stdDevTime/60) + stars
			singleUMData.NamedExpectedTime = my_namedFinalExpectedTimeMins + " mins." + stars
			singleUMData.StdDevExpectedTime = finalStdDeviationTime + " mins." + stars
		}
	}
		
	//edit status column data for priority matchesif(priorityMatch == true){
	if(singleUMData.priority == true){
		////log("in prio")
		singleUMData.status = "priority match"
		if (playersNotReady == true){
				singleUMData.unavailablePlayers = true;
				singleUMData.playersPlaying = false;
				singleUMData.readyToPlay = false;
				////////////log("unavailable:", my_status)
		} else if (playersPlaying == true){
			singleUMData.unavailablePlayers = false;
			singleUMData.playersPlaying = true;
			singleUMData.readyToPlay = false;
		} else {
			singleUMData.unavailablePlayers = false;
			singleUMData.playersPlaying = false;
			singleUMData.readyToPlay = true;
			////////////log("ready:", my_status)
		}
	//////log(singleUMData)
	}
		
    singleUMData.indexNr = um
    singleUMData.shiftNr = shiftNr
	
    var my_returns = [upcomingMatchInfo, singleUMData]
    return my_returns
}

function adjustExpectedTimes(allUpcomingMatchInfoObjects, allUMdata){
	rtpObjects = []
	var rtpExpectedTimesArray = []
	var rtpMatchIdsArray = []
	for(var o = 0; o < allUMdata.length; o++) {
		if(allUMdata[o].readyToPlay == true){
			var newObject = $.extend({}, allUMdata[o])
			rtpObjects.push(newObject)
			rtpMatchIdsArray.push(allUMdata[o].matchNr)
			rtpExpectedTimesArray.push(allUMdata[o].expectedTimeSecs)
		}
	}
	////log(rtpExpectedTimesArray)
	rtpExpectedTimesArray.sort(function(a, b){return a-b})
	////log("sorted", rtpExpectedTimesArray)
	for (var objNr = 0; objNr < rtpObjects.length; objNr++){
		var newETSecs = rtpExpectedTimesArray[objNr]
		rtpObjects[objNr].expectedTimeSecs_ad = newETSecs
		rtpObjects[objNr].expectedTimeMins_ad = Math.ceil(newETSecs/60)
		if(rtpObjects[objNr].expectedTimeSecs == 0){
			rtpObjects[objNr].shiftNrExpectedTimeSecsMins_ad = rtpObjects[objNr].sNr + "free court available"
			rtpObjects[objNr].shiftNrExpectedTimeSecs_ad = rtpObjects[objNr].sNr + "free court available"
			rtpObjects[objNr].shiftNrExpectedTimeMins_ad = rtpObjects[objNr].sNr + "free court available"
			rtpObjects[objNr].stdDevTime_ad = rtpObjects[objNr].stdDevTime
			
			rtpObjects[objNr].NamedExpectedTime_ad = "free court available"
			rtpObjects[objNr].StdDevExpectedTime_ad = "free court available"
			

		} else {
			rtpObjects[objNr].shiftNrExpectedTimeSecsMins_ad = rtpObjects[objNr].sNr + newETSecs+ " secs.," + Math.ceil(newETSecs/60) + " mins." + rtpObjects[objNr].stars
			rtpObjects[objNr].shiftNrExpectedTimeSecs_ad = rtpObjects[objNr].sNr + newETSecs + " secs." + rtpObjects[objNr].stars
			rtpObjects[objNr].shiftNrExpectedTimeMins_ad = rtpObjects[objNr].sNr + Math.ceil(newETSecs/60) + " mins." + rtpObjects[objNr].stars
			rtpObjects[objNr].stdDevTime_ad = rtpObjects[objNr].stdDevTime
			
			var extraExpectedTimeNames = namedExpectedTime(rtpObjects[objNr].poolName, rtpObjects[objNr].expectedTimeMins_ad, rtpObjects[objNr].stdDevTime) 
			rtpObjects[objNr].NamedExpectedTime_ad = extraExpectedTimeNames[0] + " mins." + rtpObjects[objNr].stars
			rtpObjects[objNr].StdDevExpectedTime_ad = extraExpectedTimeNames[1] + " mins." + rtpObjects[objNr].stars
			
		}
		
		//find in allUMdata and  replace values
		var my_matchID = rtpObjects[objNr].matchNr
		var singleUMObject = allUMdata.find(x => x.matchNr === my_matchID)
		////log(singleUMObject)
		singleUMObject.expectedTimeSecs = rtpObjects[objNr].expectedTimeSecs_ad
		singleUMObject.expectedTimeMins = rtpObjects[objNr].expectedTimeMins_ad
		singleUMObject.shiftNrExpectedTimeSecsMins = rtpObjects[objNr].shiftNrExpectedTimeSecsMins_ad
		singleUMObject.shiftNrExpectedTimeSecs = rtpObjects[objNr].shiftNrExpectedTimeSecs_ad
		singleUMObject.shiftNrExpectedTimeMins = rtpObjects[objNr].shiftNrExpectedTimeMins_ad
		singleUMData.shiftNrExpectedTimeMinsStdDev = rtpObjects[objNr].shiftNrExpectedTimeMins_ad + " ± " + Math.ceil(rtpObjects[objNr].stdDevTime/60)
		singleUMObject.NamedExpectedTime = rtpObjects[objNr].NamedExpectedTime_ad
		singleUMObject.stdDevTime = rtpObjects[objNr].stdDevTime_ad
		singleUMObject.StdDevExpectedTime = rtpObjects[objNr].StdDevExpectedTime_ad
		
	}
	////log(rtpObjects)
	
	//var my_returns = [allUpcomingMatchInfoObjects, allUMdata]
	//return my_returns
}

function namedExpectedTime(my_PoolName, my_finalExpectedTimeMins, my_stdDevTime){
	//named Expected Time
	////log(my_finalExpectedTimeMins)
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
		my_namedFinalExpectedTimeMins = "0-10"
	}
	//stdDeviation  Expected Time
	////log(my_stdDevTime)
	var finalStdDeviationTime = my_finalExpectedTimeMins +  " ± " + (Math.ceil(my_stdDevTime/60))//(Math.ceil((poolProperties[pool].stdDev)/60)) 
	////log(finalStdDeviationTime)
	//returns
	var my_returns = [my_namedFinalExpectedTimeMins, finalStdDeviationTime]
	
	return my_returns
}