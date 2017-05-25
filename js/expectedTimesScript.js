function calculateExpectedTime(um, my_PoolName, poolPropertiesObject, singleUMData, nrOfCourts, my_statusText, playerNamesCurrentlyPlayingArray, playersPlayingObects, predictedTimeLeftofPlayingPlayersArray) {
    var upcomingMatchNr = um + 1 // looks at first for loop [um]
    var totalUmCount = my_upcomingMatches.length
    var shiftsCount = Math.ceil(totalUmCount / nrOfCourts) //count the amount of shifts that are needed to play all upcoming matches with the current amount of available courts. 

    var inCount = false //is match counted in expected times?
    var inShift = [] // create dynamic variable to create the right amount of shift variables tat check if match is in the Xth shift
    var shiftCount = 0
    for (s = 1; s <= shiftsCount; s++) {
        var my_shiftNumber = s
        //inShift[my_shiftNr] = false; //is match counted in shift nr for expected times?
    }
    var secondpart = false
    var freeCourt = false
    var upcomingMatchInfo = {
        indexNr: um,
        UMNr: um + 1,
        readyToPlay: false,
        playersPlaying: false,
        playersUnavailable: false

    }
    //var inFirstCount = false 
    //var inSecondCount = false //is match counted in after first nrOfCourts expected times?
    var inPlayCount = false //is match counted in expected times while players are playing?
    var inUnavailable = false // is match NOT counted in expected times because players are unavailable?
    var my_finalExpectedTimeSecs = ""
    var stars = ""
    var showShift1Text = true

    /*if(typeof averageMatchTimes[my_PoolName] == 'undefined'){
    	my_PoolName = "Overall Average"
    }*/
    log("\n-----------------------------------\n\nprocessing upcoming match number", upcomingMatchNr, my_PoolName)
    if (inCount_UM.length == 0) {
        log("in first creating variables")
        inCount_UM[1] = 0
        inReadyCount_UM[1] = 0
        inPlayCount_UM[1] = 0
        unavailable_UM[1] = 0
        predictedTimesArray[1] = []
        expectedTimesArray[1] = []
        totalTimesArray[1] = []
        log("nr of available courts:", nrOfCourts)
        log("nr of potentially free courts:", freeCourtsAvailable)
        log("total um count:", totalUmCount)
        log("total amount of shifts based on amount of upcoming matches:", shiftsCount)
        log("\n")
    } else if (upcomingMatchNr <= nrOfCourts + unavailable_UM[1]) {
        var processCount = []
        processCount[shiftNr] = inCount_UM[shiftNr] + unavailable_UM[shiftNr]
        log("inR+inP+inU=inPr so far in shift", shiftNr + ":", inReadyCount_UM[shiftNr] + "+" + inPlayCount_UM[shiftNr] + "+" + unavailable_UM[shiftNr], "=", processCount[shiftNr])
        if ((inReadyCount_UM[shiftNr] + inPlayCount_UM[shiftNr] + unavailable_UM[shiftNr]) != processCount[shiftNr]) {
            log("Error in processing count in shiftnr:", shiftNr)
            alert("Error in processing count in shiftnr:", shiftNr)
        }

        log("nr of potentially free courts:", freeCourtsAvailable)
        log("total amount of matches that are predicted so far:", inTotCount_UM)
        log("total amount of matches that are predicted so far in shift " + shiftNr + ":", inCount_UM[shiftNr])
        log("amount of matches that are predicted so far and are ready in shift " + shiftNr + ":", inReadyCount_UM[shiftNr])
        log("amount of matches that are predicted so far but are still playing in shift " + shiftNr + ":", inPlayCount_UM[shiftNr])
        log("predicted times array(" + predictedTimeLeftArray.length + "):", predictedTimeLeftArray)
    }

    if (upcomingMatchNr <= nrOfCourts + unavailable_UM[1]) { // look at first shift of upcoming matches excluding posptoned match that fits nr of available courts 
        secondpart = false
        if (upcomingMatchNr == nrOfCourts + unavailable_UM[1]) {
            showShift1Text = true
        }
        shiftNr = 1
        upcomingMatchInfo.shiftNumber = shiftNr

        inShift[shiftNr] = true
        log("in shiftNr:", shiftNr)
        if (totUnavailable_UM > 0) {
            stars = "**" //adds note about this match.
        } else {
            stars = ""
        }
        if (my_statusText == readyToPlay) {
            if (upcomingMatchNr == nrOfCourts + unavailable_UM[1]) {
                showShift1Text = false
            }
            log("in Shift 1 ready to play")
            inCount = true;
            inTotCount_UM += 1;
            inCount_UM[shiftNr] += 1;
            inReadyCount_UM[shiftNr] += 1
            inFirstCount = true;
            inFirstCount_UM += 1
            upcomingMatchInfo.readyToPlay = true
            if (freeCourtsAvailable > 0) {
                var my_expectedTime = "free court available"
                freeCourt = true
                stars = ""
                freeCourtsAvailable -= 1

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
        } else if (my_statusText == playersCurrentlyPlaying) {
            if (upcomingMatchNr == nrOfCourts + unavailable_UM[1]) {
                showShift1Text = false
            }
            log("in shift 1 player playing")
            inCount = true;
            inTotCount_UM += 1;
            inCount_UM[1] += 1
            inFirstCount = true;
            inFirstCount_UM += 1
            inPlayCount = true;
            inPlayCount_UM[shiftNr] += 1
            upcomingMatchInfo.playersPlaying = true;
            Playing = true;
            log("playing player names:", playerNamesCurrentlyPlayingArray)
            var my_freeCourtExpectedTime = predictedTimeLeftArray[inCount_UM[1] - 1] + timeBetweenMatches // needed if this will be higher than expected time with predicted time

            var my_predictedTime = findPlayersPlaying(playerNamesCurrentlyPlayingArray, my_locationsList, playersPlayingObects, predictedTimeLeftofPlayingPlayersArray)
            var my_predictedExpectedTime = my_predictedTime + pauseTime + timeBetweenMatches

            if (my_freeCourtExpectedTime >= my_predictedExpectedTime) { // if free court expected time is higher than predicted time, this will be my expecte time 
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
        } else if (my_statusText == playersUnavailable) {
            if (upcomingMatchNr == nrOfCourts + unavailable_UM[1]) {
                showShift1Text = false
            }
            upcomingMatchInfo.playersUnavailable = true
            log("in shift 1 player unavailable")

            inUnavailable = true;
            totUnavailable_UM += 1;
            unavailable_UM[1] += 1

            my_finalExpectedTimeSecs = "unknown"
            upcomingMatchInfo.expectedTime = "unknown"
            upcomingMatchInfo.predictedTime = "unknown"
            upcomingMatchInfo.totalTime = "unknown"
        }
        //shiftUpcomingMatchInfoObjects[shiftNr].push(upcomingMatchInfo)
        //upcomingMatchInfoObjects.push(upcomingMatchInfo)
        if (upcomingMatchNr == (nrOfCourts + unavailable_UM[1])) {
            log("end of shift 1")
            log("upcomingMatchesInfoObjects:", upcomingMatchInfoObjects)
            log("expected times array:", expectedTimesArray[shiftNr])
            log("predicted times array:", predictedTimesArray[shiftNr])

            playersPlayingExpectedTimes.sort(function (a, b) {
                return a - b
            })
            totalTimesArray[shiftNr].sort(function (a, b) {
                return a - b
            })
            log("total times array:", totalTimesArray[shiftNr])

            smallestExpectedTimesArray[shiftNr] = expectedTimesArray[shiftNr]
            smallestExpectedTimesArray[shiftNr].sort(function (a, b) {
                return a - b
            })

            shift1upcomingMatchInfoObjects.sort(function (a, b) {
                return a.totalTime - b.totalTime
            })
            rtpUpcomingMatchInfoArray.sort(function (a, b) {
                return a.totalTime - b.totalTime
            })
            shift1ppCount = ppUpcomingMatchInfoArray.length
            ppUpcomingMatchInfoArray.sort(function (a, b) {
                return a.predictedTime.time - b.predictedTime.time
            })
            log(shift1upcomingMatchInfoObjects, rtpUpcomingMatchInfoArray, ppUpcomingMatchInfoArray)

            shiftStartTime += ((totalTimesArray[shiftNr][0]))
            log("shift2 starttime:", shiftStartTime)
        }
    } else if (upcomingMatchNr > (nrOfCourts + unavailable_UM[1])) { //look after the first shift
        secondpart = true
        shiftNr += 1
        if (shiftNr >= 3) {
            Playing = false
        }
        upcomingMatchInfo.shiftNumber = shiftNr
        log("in shiftNr:", shiftNr)
        log("Shift start time:", Math.ceil(shiftStartTime / 60), "mins.")
        if (typeof inCount_UM[shiftNr] == 'undefined') {
            log("in shift " + shiftNr + " creating variables")
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
        log("inR+inP+inU=inPr so far in Shift", shiftNr + ":", inReadyCount_UM[shiftNr] + "+" + inPlayCount_UM[shiftNr] + "+" + unavailable_UM[shiftNr], "=", processCount[shiftNr])
        if ((inReadyCount_UM[shiftNr] + inPlayCount_UM[shiftNr] + unavailable_UM[shiftNr]) != processCount[shiftNr]) {
            log("Error in processing count in shiftnr>:", shiftNr)
            alert("Error in processing count in shiftNr.:", shiftNr)
        }

        log("nr of potentially free courts:", freeCourtsAvailable)
        log("total amount of matches that are predicted so far:", inTotCount_UM)
        log("total amount of matches that are predicted so far in shift " + shiftNr + ":", inCount_UM[shiftNr])
        log("amount of matches that are predicted so far and are ready in shift " + shiftNr + ":", inReadyCount_UM[shiftNr])
        log("amount of matches that are predicted so far but are still playing in shift " + shiftNr + ":", inPlayCount_UM[shiftNr])

        log("predicted times array(" + predictedTimeLeftArray.length + "):", predictedTimeLeftArray)

        var inFirstUM = false
        prevShiftNr = shiftNr - 1

        var prevShiftUpperBound = ((prevShiftNr * nrOfCourts) + (totUnavailable_UM - unavailable_UM[shiftNr]))
        var greaterThanPrevShift = (upcomingMatchNr > prevShiftUpperBound)

        var nextShiftLowerBound = ((shiftNr * nrOfCourts) + totUnavailable_UM)
        var smallerEquThanNextShift = ((upcomingMatchNr - inTotCount_UM) <= nextShiftLowerBound)

        log(">:" + greaterThanPrevShift, "<=:" + smallerEquThanNextShift)
        if (greaterThanPrevShift == true && smallerEquThanNextShift == true) {
            if (totUnavailable_UM > 0) {
                stars = "**" //adds note about this match.
            } else {
                stars = ""
            }
            if (my_statusText == readyToPlay) {
                log("in Shift", shiftNr, "ready to play")
                inCount = true;
                inTotCount_UM += 1;
                inCount_UM[shiftNr] += 1;
                inReadyCount_UM[shiftNr] += 1;
                upcomingMatchInfo.readyToPlay = true
                if (freeCourtsAvailable > 0) {
                    var my_expectedTime = "free court available"
                    freeCourt = true
                    stars = ""
                    freeCourtsAvailable -= 1

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
                    if (prevShiftNr == 1) {
                        //log("in alt. shift2", shift1ppCount, altshift2count, altshift2ppCount)
                        //log("nr.", inCount_UM[shiftNr] - 1,inCount_UM[shiftNr] - altshift2ppCount - 1,   shift1upcomingMatchInfoObjects[inCount_UM[shiftNr] - 1].expectedTime)
                        //log("nr2.", shift1upcomingMatchInfoObjects,  shift1upcomingMatchInfoObjects[inCount_UM[shiftNr] - altshift2ppCount - 1].expectedTime)
                        var my_prevExpectedTime = shift1upcomingMatchInfoObjects[inCount_UM[shiftNr] - altshift2ppCount - 1].expectedTime
                        var my_potExpectedTime = my_prevExpectedTime + timeBetweenMatches

                        log("prev expected time: ", (my_potExpectedTime / 60))

                        if (ppUpcomingMatchInfoArray.length > 0) {
                            altshift2ppCount += 1
                            var my_playingExpectedTime = ppUpcomingMatchInfoArray[0].expectedTime
                            if (my_playingExpectedTime > my_potExpectedTime) {
                                log("shift 2 match is first")
                                ppUMCountNr = ppUpcomingMatchInfoArray[0].UMCount1
                                log(ppUMCountNr)
                                my_expectedTime = predictedTimeLeftArray[ppUMCountNr -
                                    1] + timeBetweenMatches
                                upcomingMatchInfo.predictedTime = poolPropertiesObject
                                upcomingMatchInfo.expectedTime = my_playingExpectedTime
                                log("hatza:", upcomingMatchInfo, rtpUpcomingMatchInfoArray)
                                rtpUpcomingMatchInfoArray.push(upcomingMatchInfo)
                                rtpUpcomingMatchInfoArray.sort(function (a, b) {
                                    return a.totalTime - b.totalTime
                                })
                            } else {
                                log("shift 2 match is after")
                                my_playingExpectedTime = ppUpcomingMatchInfoArray[0].expectedTime

                                my_expectedTime = totalTimesArray[1][0] + my_playingExpectedTime + timeBetweenMatches
                                log(shiftStartTime, my_playingExpectedTime, my_expectedTime)
                            }
                            ppUpcomingMatchInfoArray.shift()
                        } else {
                            log("shift 2 match follows regular pattern after playing matches")
                            var my_rtpTotalTime = rtpUpcomingMatchInfoArray[shift1rtp].totalTime
                            var my_expectedTime = shiftStartTime + my_rtpTotalTime + timeBetweenMatches
                            //rtpUpcomingMatchInfoArray.shift()
                            shift1rtp += 1
                        }
                    } else {
                        log("shift 1 has no players playing")
                        var my_expectedTime = shiftStartTime + ((totalTimesArray[prevShiftNr][inCount_UM[shiftNr] - 1]) - shiftStartTime) + timeBetweenMatches
                    }
                    log(shiftNr, prevShiftNr, totalTimesArray[prevShiftNr], inCount_UM[shiftNr], totalTimesArray[prevShiftNr][inCount_UM[shiftNr] - 1])
                    log("expected time:", shiftStartTime, totalTimesArray[prevShiftNr][inCount_UM[shiftNr] - 1], my_expectedTime)
                    /*if(totalTimesArray[prevShiftNr][inCount_UM[shiftNr] - 1] == undefined){
                    	throw Error("becase")
                    }*/
                    expectedTimesArray[shiftNr].push(my_expectedTime)
                    upcomingMatchInfo.expectedTime = my_expectedTime
                    expectedTimesArray[shiftNr].sort()

                    my_predictedPlayingTime = poolPropertiesObject.avgTime
                    predictedTimesArray[shiftNr].push(my_predictedPlayingTime)
                    upcomingMatchInfo.predictedTime = poolPropertiesObject

                    var my_totalTime = Math.ceil((my_expectedTime) + (my_predictedPlayingTime))
                    upcomingMatchInfo.totalTime = my_totalTime
                    totalTimesArray[shiftNr].push(my_totalTime)
                    totalTimesArray[shiftNr].sort()

                    //shiftUpcomingMatchInfoObjects[shiftNr][shiftNr].push(upcomingMatchInfo)
                    upcomingMatchInfoObjects.push(upcomingMatchInfo)
                    my_finalExpectedTimeSecs = Math.ceil(my_expectedTime)
                }
                //my_finalExpectedTimeSecs = "still calculating R"+shiftNr+stars						
            } else if (my_statusText == playersCurrentlyPlaying) {
                log("in shift " + shiftNr + " player playing")
                inCount = true;
                inCount_UM[shiftNr] += 1;
                inTotCount_UM += 1
                inPlayCount = true;
                inPlayCount_UM[shiftNr] += 1
                upcomingMatchInfo.playersPlaying = true

                log("playing player names:", playerNamesCurrentlyPlayingArray)
                var my_freeCourtExpectedTime = predictedTimeLeftArray[inCount_UM[shiftNr] - 1] + timeBetweenMatches // needed if this will be higher than expected time with predicted time

                var my_predictedTime = findPlayersPlaying(playerNamesCurrentlyPlayingArray, my_locationsList, playersPlayingObects, predictedTimeLeftofPlayingPlayersArray)
                var my_readyExpectedTime
                if (prevShiftNr == 1) {
                    //log("in alt. shift2", shift1ppCount, altshift2count, altshift2ppCount)
                    //log("nr.", inCount_UM[shiftNr] - 1,inCount_UM[shiftNr] - altshift2ppCount - 1,   shift1upcomingMatchInfoObjects[inCount_UM[shiftNr] - 1].expectedTime)
                    log("nr2.", shift1upcomingMatchInfoObjects, shift1upcomingMatchInfoObjects[inCount_UM[shiftNr] - altshift2ppCount - 1].expectedTime)
                    var my_prevExpectedTime = shift1upcomingMatchInfoObjects[inCount_UM[shiftNr] - altshift2ppCount - 1].expectedTime
                    var my_potExpectedTime = my_prevExpectedTime + timeBetweenMatches

                    log("prev expected time: ", (my_potExpectedTime / 60))

                    if (ppUpcomingMatchInfoArray.length > 0) {
                        altshift2ppCount += 1
                        var my_playingExpectedTime = ppUpcomingMatchInfoArray[0].expectedTime
                        if (my_playingExpectedTime > my_potExpectedTime) {
                            log("shift 2 match is first")
                            ppUMCountNr = ppUpcomingMatchInfoArray[0].UMCount1
                            log(ppUMCountNr)
                            my_expectedTime = predictedTimeLeftArray[ppUMCountNr -
                                1] + timeBetweenMatches
                            upcomingMatchInfo.predictedTime = poolPropertiesObject
                            upcomingMatchInfo.expectedTime = my_playingExpectedTime
                            log("hatza:", upcomingMatchInfo, rtpUpcomingMatchInfoArray)
                            rtpUpcomingMatchInfoArray.push(upcomingMatchInfo)
                            rtpUpcomingMatchInfoArray.sort(function (a, b) {
                                return a.totalTime - b.totalTime
                            })
                        } else {
                            log("shift 2 match is after")
                            my_playingExpectedTime = ppUpcomingMatchInfoArray[0].expectedTime

                            my_expectedTime = totalTimesArray[1][0] + my_playingExpectedTime + timeBetweenMatches
                            log(shiftStartTime, my_playingExpectedTime, my_expectedTime)
                        }
                        ppUpcomingMatchInfoArray.shift()
                    } else {
                        log("shift 2 match follows regular pattern after playing matches")
                        var my_rtpTotalTime = rtpUpcomingMatchInfoArray[shift1rtp].totalTime
                        var my_expectedTime = shiftStartTime + my_rtpTotalTime + timeBetweenMatches
                    }
                } else {
                    log("shift 1 has no players playing")
                    var my_readyExpectedTime = shiftStartTime + ((totalTimesArray[prevShiftNr][inCount_UM[shiftNr] - 1]) - shiftStartTime) + timeBetweenMatches
                }

                //var my_readyExpectedTime =  shiftStartTime + ((totalTimesArray[prevShiftNr][inCount_UM[shiftNr] - 1]) - shiftStartTime) + timeBetweenMatches
                /*if(shiftStartTime > poolPropertiesObject.avgTime){
                	
                }*/
                if (my_readyExpectedTime >= my_predictedTime) {
                    log("players are ready before upcoming match is expected")
                    var my_predictedExpectedTime = my_readyExpectedTime - shiftStartTime //- my_predictedTime //shiftStartTime is removed becuase it is aready in the readyExpectedTime.
                } else {
                    log("upcoming match is expected before players are ready")
                    var my_predictedExpectedTime = my_predictedTime + pauseTime + timeBetweenMatches
                }

                /*if(my_freeCourtExpectedTime >= my_predictedExpectedTime){ // if free court expected time is higher than predicted time, this will be my expected time 
                	log("court is first free")
                	var my_expectedTime = shiftStartTime + my_freeCourtExpectedTime
                } else {*/ // predicted time is higher and thus my expected time 
                log("players are first free")
                var my_expectedTime = shiftStartTime + my_predictedExpectedTime
                //}
                log("expected time Player playing:", my_expectedTime)
                my_finalExpectedTimeSecs = Math.ceil(my_expectedTime)
                //my_finalExpectedTimeSecs = "still calculating PP"+shiftNr+stars

                expectedTimesArray[shiftNr].push(my_expectedTime)
                expectedTimesArray[shiftNr].sort()

                upcomingMatchInfo.expectedTime = my_expectedTime

                predictedTimesArray[shiftNr].push(poolPropertiesObject.avgTime)
                upcomingMatchInfo.predictedTime = poolPropertiesObject

                var my_totalTime = Math.ceil(my_expectedTime + (poolPropertiesObject.avgTime))
                upcomingMatchInfo.totalTime = my_totalTime
                totalTimesArray[shiftNr].push(my_totalTime)
                totalTimesArray[shiftNr].sort()
                //shiftUpcomingMatchInfoObjects[shiftNr].push(upcomingMatchInfo)
                upcomingMatchInfoObjects.push(upcomingMatchInfo)
            } else if (my_statusText == playersUnavailable) {
                log("in shift " + shiftNr + " player unavailable")
                inUnavailable = true;
                totUnavailable_UM += 1;
                unavailable_UM[shiftNr] += 1
                upcomingMatchInfo.playersUnavailable = true

                my_finalExpectedTimeSecs = "unknown"
                upcomingMatchInfo.expectedTime = "unknown"
                upcomingMatchInfo.predictedTime = "unknown"
                //shiftUpcomingMatchInfoObjects[shiftNr].push(upcomingMatchInfo)
                upcomingMatchInfoObjects.push(upcomingMatchInfo)
            }
            var endShift = false

            if (upcomingMatchNr == ((shiftNr * nrOfCourts) + totUnavailable_UM)) {
                endShift = true
                log("end of shift " + shiftNr)
                log("upcomingMatchesInfoObjects:", upcomingMatchInfoObjects)
                log("expected times array:", expectedTimesArray[shiftNr])
                log("predicted times array:", predictedTimesArray[shiftNr])
                totalTimesArray[shiftNr].sort(function (a, b) {
                    return a - b
                })
                log("total times array:", totalTimesArray[shiftNr])
                smallestExpectedTimesArray[shiftNr] = expectedTimesArray[shiftNr]
                smallestExpectedTimesArray[shiftNr].sort(function (a, b) {
                    return a - b
                })
                if (shiftNr == 2 && altshift2ppCount > 0) {
                    log("in playing startshift")
                    shiftStartTime += ((totalTimesArray[shiftNr][0]))
                    log(shiftStartTime)
                } else {
                    log("in normal startshift")
                    shiftStartTime += ((totalTimesArray[shiftNr][0]))
                }

                log("going to shiftNr.", shiftNr + 1, "with shiftStartTime:", (Math.ceil(shiftStartTime / 60)), "mins.")
            } else {
                log("remaining in shiftNr.", shiftNr)
                shiftNr -= 1 //if match number is still processing within a shift, shift nr won't change.
            }
        }
    } else {
        alert("There is an error with the upcomingMatchNr:", upcomingMatchNr)
    }

    //show shiftNr in table
    if (secondpart == true) {
        if (endShift == true) {
            var my_shiftNr = shiftNr
        } else {
            var my_shiftNr = shiftNr + 1
        }
    } else { //secondpart == false
        var my_shiftNr = shiftNr
    }

    //finalizing expected time
    if (typeof my_finalExpectedTimeSecs == 'number') {
        my_finalExpectedTimeMins = Math.ceil(my_finalExpectedTimeSecs / 60)
    } else if (my_finalExpectedTimeSecs == "unknown") {
        my_finalExpectedTimeMins = 9999999999999999999999999999999999999
    } else if (my_finalExpectedTimeSecs == "free court available") {
        my_finalExpectedTimeMins = 0
    } else {
        my_finalExpectedTimeMins = my_finalExpectedTimeSecs
    }
    var finalStdDeviationTime = my_finalExpectedTimeMins + " ± " + (Math.ceil((poolPropertiesObject.stdDev) / 60))

    if (my_finalExpectedTimeMins <= 5) {
        var my_namedFinalExpectedTimeMins = "a few"
    } else if (my_finalExpectedTimeMins > 5 && my_finalExpectedTimeMins <= 15) {
        var my_namedFinalExpectedTimeMins = "5-15"
    } else if (my_finalExpectedTimeMins > 15 && my_finalExpectedTimeMins <= 30) {
        var my_namedFinalExpectedTimeMins = "15-30"
    } else if (my_finalExpectedTimeMins > 30 && my_finalExpectedTimeMins <= 45) {
        var my_namedFinalExpectedTimeMins = "30-45"
    } else if (my_finalExpectedTimeMins > 45 && my_finalExpectedTimeMins <= 60) {
        var my_namedFinalExpectedTimeMins = "45-60"
    } else if (my_finalExpectedTimeMins > 60 && my_finalExpectedTimeMins <= 90) {
        var my_namedFinalExpectedTimeMins = "60-90"
    } else if (my_finalExpectedTimeMins > 90 && my_finalExpectedTimeMins <= 120) {
        var my_namedFinalExpectedTimeMins = "90-120"
    } else if (my_finalExpectedTimeMins > 120) {
        var my_namedFinalExpectedTimeMins = ">120"
    }
    //if MSA or MSB
    function checkPoolName(poolName) {
        var ifPoolname = false
        var ifselectedPoolName = false
        for (pool in poolProperties) {
            ifPoolName = inArray(poolName, poolProperties[pool].altNames)
            if (ifPoolName == true) {
                if (poolProperties[pool].altNames[0] == "Men Singles A" || poolProperties[pool].altNames[0] == "Men Singles B") {
                    ifselectedPoolName = true
                    break
                }
            }
        }
        return ifselectedPoolName
    }
    var ifMSAorMSB = checkPoolName(my_PoolName)
    if (ifMSAorMSB == true && my_finalExpectedTimeMins < 10) {
        var my_namedFinalExpectedTimeMins = "0-10"
    }

    //expected times properties
    if (inUnavailable == true) {
        //tri.append("<td class='expectedTimeColumn'>"+my_finalExpectedTimeSecs+"</td>");
        singleUMData.ExpectedTimeSecs = 9999999999999999999999999999999999999
        singleUMData.shiftNrExpectedTimeSecs = my_shiftNr + ". " + my_finalExpectedTimeSecs
        singleUMData.ExpectedTimeMins = 9999999999999999999999999999999999999
        singleUMData.shiftNrExpectedTimeSecsMins = my_shiftNr + ". " + "unavailable"
        singleUMData.shiftNrExpectedTimeMins = my_shiftNr + ". " + "unavailable" + stars
        singleUMData.NamedExpectedTime = "unavailable"
        singleUMData.StdDevExpectedTime = "unavailable"
    } else {
        if (freeCourt == true) {
            //tri.append("<td class='expectedTimeColumn'>"+my_finalExpectedTimeSecs+"</td>");
            singleUMData.ExpectedTimeSecs = 0
            singleUMData.shiftNrExpectedTimeSecs = my_shiftNr + ". " + my_finalExpectedTimeSecs
            singleUMData.ExpectedTimeMins = 0
            singleUMData.shiftNrExpectedTimeSecsMins = my_shiftNr + ". " + "free court available"
            singleUMData.shiftNrExpectedTimeMins = my_shiftNr + ". " + "free court available"
            singleUMData.NamedExpectedTime = "free court available"
            singleUMData.StdDevExpectedTime = "free court avaiable"
        } else {
            //tri.append("<td class='expectedTimeColumn'>"+my_namedFinalExpectedTimeMins+" mins."+stars+"</td>");
            singleUMData.ExpectedTimeSecs = my_finalExpectedTimeSecs
            singleUMData.shiftNrExpectedTimeSecs = my_shiftNr + ". " + my_finalExpectedTimeSecs
            singleUMData.ExpectedTimeMins = my_finalExpectedTimeMins
            singleUMData.shiftNrExpectedTimeSecsMins = my_shiftNr + ". " +my_finalExpectedTimeSecs+", "+my_finalExpectedTimeMins
            singleUMData.shiftNrExpectedTimeMins = my_shiftNr + ". " + my_finalExpectedTimeMins + " mins." + stars
            singleUMData.NamedExpectedTime = my_namedFinalExpectedTimeMins + " mins." + stars
            singleUMData.StdDevExpectedTime = finalStdDeviationTime + " mins." + stars
        }
    }

    //edit status column data for priority matchesif(priorityMatch == true){
    if (priorityMatch == true) {
        ////log("in prio")
        singleUMData.status = "priority match"
        if (playersNotReady == true) {
            singleUMData.unavailablePlayers = true;
            singleUMData.playersPlaying = false;
            singleUMData.readyToPlay = false;
            //////////log("unavailable:", my_status)
        } else if (playersPlaying == true) {
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
    singleUMData.indexNr = um
    singleUMData.shiftNr = shiftNr
    var my_returns = [upcomingMatchInfo, singleUMData]
    return my_returns
}
