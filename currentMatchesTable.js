/**Current Matches Table **/
function getCurrentMatchesTable(){	
	log("making current matches table...")
	CMTableCount +=1
	try{
		my_currentMatchesTable.destroy()
	} catch(err){
		//////log(err)
	}
	myPlayingMatchesCount = 0
	predictedTimeLeftArray = []	
	
	totLocationsCount = my_locationsList.length
	availableLocationsCount = 0
	//allCMdata = []
	//////////log(my_locationsList)
	for (t in my_locationsList) {
			  my_locationsList[t].deltaPredictedTimeLeft = 0;
	}
	//////////log(my_locationsList)
	for (m = 0; m < my_locationsList.length; m++){
		//var courtName = my_locationsList[m].location
		var singleCMData =  {}
		var myTeam1PlayerNames = []
		var myTeam2PlayerNames = []						
		
		var my_CProwNumber = m+1 
		var CProw_id = "CProw-" + my_CProwNumber
		var tro = $('<tr id=' + CProw_id + '/>');					
		var courtName = my_locationsList[m].location
		var courtOnHold = my_locationsList[m].locationOnHold
		var onHoldReason = my_locationsList[m].locationNonreadyReason
		var alreadyPlayingTime = my_locationsList[m].deltaStartTime
		
		singleCMData.courtOnHold = courtOnHold
		//courtcolumn
		if (courtOnHold == true){					
			//tro.append("<td class='courtColumn'" + playerUnavailableSpan + courtName + "</td>");
		} else {
			availableLocationsCount += 1
			//tro.append("<td class='courtColumn'" + nowPlayingSpan + courtName + "</td>");
		}
		singleCMData.CourtName = courtName
		
		//Pool Name
		indivCourtObjCount = Object.keys(my_locationsList[m]).length 
		if (courtOnHold == true){
			if(onHoldReason === null){
				onHoldReason = ""
			}
			//tro.append("<td class='onHoldColumn'>" + onHoldReason +"</td>")
			singleCMData.onHoldReason = onHoldReason
			singleCMData.poolPlaying = onHoldReason
			singleCMData.abbrpoolPlaying = null
		} else if(indivCourtObjCount == 5){
			//tro.append("<td class='emptyPoolColumn'></td>")
			singleCMData.onHoldReason = ""
			singleCMData.poolPlaying = ""
			singleCMData.abbrpoolPlaying = null
			freeCourts +=1
			
		} else {
			var namePoolPlaying = my_locationsList[m].pool
			var poolPropertiesObject = findPoolProperties(namePoolPlaying)
			singleCMData.poolProperties = poolPropertiesObject
			if(poolPropertiesObject.altNames[0] == "Average Pool"){
				var abbrPoolName = namePoolPlaying
			} else {
				var abbrPoolName = poolPropertiesObject.abbreviations[0]
			}
			//var abbrPoolName = poolPropertiesObject.//getPoolNameAbbr(namePoolPlaying)

			if(ifMobile == false){
				//tro.append("<td class='poolColumn'>" + namePoolPlaying + "</td>");
				singleCMData.poolPlaying = namePoolPlaying
			} else {
				//tro.append("<td class='poolColumn'>" + abbrPoolName + "</td>");
				singleCMData.poolPlaying = abbrPoolName
			}
			singleCMData.abbrpoolPlaying = abbrPoolName
		}			
		//team 1 column
		if(indivCourtObjCount == 5 && courtOnHold == false ){
			//tro.append("<td class='emptyPoolColumn'></td>")
			singleCMData.team1 = ""
		} else if (indivCourtObjCount == 5 && courtOnHold == true){
			//tro.append("<td class='onHoldColumn'></td>")
			singleCMData.team1 = ""

		} else {	
			myTeam1Players = my_locationsList[m].team1Players
			for(var key in myTeam1Players){
					var individual1Player = myTeam1Players[key]
					myTeam1PlayerNames.push(individual1Player)
			}
			
			var Team1NamesClean = myTeam1PlayerNames.map(e=>e.split("\"").map((a,i)=>i%2==0?a:undefined).join(""));
			//////log(Team1NamesClean)
			var Team1NamesCleanTrim = []
			for (var i = 0; i <Team1NamesClean.length; i++) {
				var string = Team1NamesClean[i].replace(/  +/g, ' ');
			Team1NamesCleanTrim.push(string)
			}
			
			var team1Name = Team1NamesCleanTrim.join("<br />")
			//tro.append("<td class='playerPlayingColumn'>" + team1Name + "</td>")
			singleCMData.team1 = team1Name
		}
		
		//vs column
		if(indivCourtObjCount == 5 && courtOnHold == false ){
			//tro.append("<td class='emptyPoolColumnVs'></td>")
			singleCMData.vsColumn = ""
		} else if (indivCourtObjCount == 5 && courtOnHold == true){
			//tro.append("<td class='onHoldColumnVs'></td>")
			singleCMData.vsColumn = ""
		} else {
			//tro.append("<td class='VsColumn'>vs.</td>")
			singleCMData.vsColumn = "vs."
		}
		
		//team 2 column
		if(indivCourtObjCount == 5 && courtOnHold == false ){
			//tro.append("<td class='emptyPoolColumn'></td>")
			singleCMData.team2 = ""
		} else if (indivCourtObjCount == 5 && courtOnHold == true){
			//tro.append("<td class='onHoldColumn'></td>")
			singleCMData.team2 = ""

		} else {	
			myTeam2Players = my_locationsList[m].team2Players
			for(var key in myTeam2Players){
					var individual2Player = myTeam2Players[key]
					myTeam2PlayerNames.push(individual2Player)
			}
			var Team2NamesClean = myTeam2PlayerNames.map(e=>e.split("\"").map((a,i)=>i%2==0?a:undefined).join(""));
			var Team2NamesCleanTrim = []
			for (var i = 0; i <Team2NamesClean.length; i++) {
				var string = Team2NamesClean[i].replace(/  +/g, ' ');
			Team2NamesCleanTrim.push(string)
			}
			
			var team2Name = Team2NamesCleanTrim.join("<br />")
			//tro.append("<td class='playerPlayingColumn'>" + team2Name + "</td>")
			singleCMData.team2 = team2Name
		}
		
		//already playing time column
		if(indivCourtObjCount == 5 && courtOnHold == false ){
			if(showPlayingTimeColumn == true){
				//tro.append("<td class='emptyPoolColumn'></td>")
			} else {
				//document.getElementById("alreadyplayingTimeColumn").style.display = "none"							
			}
			singleCMData.alreadyPlayingTime = ""
		} else if (indivCourtObjCount == 5 && courtOnHold == true){
			if(showPlayingTimeColumn == true){
				//tro.append("<td class='onHoldColumn'></td>")
			} else {
				//document.getElementById("playingTimeColumn").style.display = "none"
			}
			singleCMData.alreadyPlayingTime = ""
		} else {
			PlayingTimeMins = alreadyPlayingTime / 60
			PlayingTimeMinsRounded = Math.round(PlayingTimeMins)
			if (PlayingTimeMinsRounded < 0){
				myFinalTime = "<1 min."
			} else if (PlayingTimeMinsRounded > 0 && PlayingTimeMinsRounded < 2){
				myFinalTime = "1 min."
			} else {
				myFinalTime = PlayingTimeMinsRounded + " mins."
			}
			singleCMData.alreadyPlayingTime = myFinalTime
			
			if(showPlayingTimeColumn == true || showPlayingTimeColumn == "true"){
				//tro.append("<td class='playingTimeColumn'>"+  myFinalTime + "</td>")							
			} else {
				//document.getElementById("playingTimeColumn").style.display = "none"
			}
		}
		
		//predicted Time column
		if(indivCourtObjCount == 5 && courtOnHold == false ){
			if(showPredictedTimeColumn == true){
				my_locationsList[m].deltaPredictedTimeLeft = undefined
				//tro.append("<td class='emptyPoolColumn'></td>")
			} else{
				//document.getElementById("predictedTimeColumn").style.display = "none"
			}
			singleCMData.predictedTimeLeft = ""
			singleCMData.namedPredictedTimeLeft = ""
			singleCMData.stdDevPredictedTimeLeft = ""
		} else if (indivCourtObjCount == 5 && courtOnHold == true){
			if(showPredictedTimeColumn == true){							
				my_locationsList[m].deltaPredictedTimeLeft = undefined
				//tro.append("<td class='onHoldColumn'></td>")
			} else {
				//document.getElementById("predictedTimeColumn").style.display = "none"						
			}
			singleCMData.predictedTimeLeft = ""
			singleCMData.namedPredictedTimeLeft = ""
			singleCMData.stdDevPredictedTimeLeft = ""

		} else {
			var predictedTimeLeft = 0
			myPlayingMatchesCount += 1
			try {
				var averageTimePool = poolPropertiesObject.avgTime
				var stdDevPool = poolPropertiesObject.stdDev
			} catch (e){
				var averageTimePool = poolProperties["Overall Average"].avgTime
				var stdDevPool = poolProperties["Overall Average"].stdDev				
			}
			if (averageTimePool == undefined){
				var averageTimePool = poolProperties["Overall Average"].avgTime
				var stdDevPool = poolProperties["Overall Average"].stdDev				
			}
			if (alreadyPlayingTime >= averageTimePool){
				predictedTimeLeft = 1
				my_locationsList[m].deltaPredictedTimeLeft = predictedTimeLeft
				var predictedTimeLeftObj = {}
				predictedTimeLeftObj.timeLeft = predictedTimeLeft
				predictedTimeLeftObj.stdDev = poolPropertiesObject.stdDev
				predictedTimeLeftArray.push(predictedTimeLeftObj)
			}
			if (alreadyPlayingTime < averageTimePool){
				predictedTimeLeft = averageTimePool - alreadyPlayingTime
				my_locationsList[m].deltaPredictedTimeLeft = predictedTimeLeft
				
				var predictedTimeLeftObj = {}
				predictedTimeLeftObj.timeLeft = predictedTimeLeft
				predictedTimeLeftObj.stdDev = poolPropertiesObject.stdDev
				predictedTimeLeftArray.push(predictedTimeLeftObj)
			}
			//////////log("PredictedTime", namePoolPlaying, predictedTimeLeft)
			predictedTimeLeftMins = Math.ceil(predictedTimeLeft / 60)
			
			var predictedTimeLeftStdDeviationTime = predictedTimeLeftMins +  " ± " + (Math.ceil((stdDevPool)/60)) 
			
			predictedTimeLeftMinsRounded = Math.round(predictedTimeLeftMins)
			if (predictedTimeLeftMinsRounded == 0){
				namedPredictedTime = "a few minutes"
			} else if (predictedTimeLeftMinsRounded > 0 && predictedTimeLeftMinsRounded <= 5){
				namedPredictedTime = "0-5 mins."
			} else if(predictedTimeLeftMinsRounded > 5 && predictedTimeLeftMinsRounded <= 10){
				namedPredictedTime = "5-10 mins."
			} else if(predictedTimeLeftMinsRounded > 10 && predictedTimeLeftMinsRounded <= 15){
				namedPredictedTime = "10-15 mins."
			} else if(predictedTimeLeftMinsRounded > 15 && predictedTimeLeftMinsRounded <= 20){
				namedPredictedTime = "15-20 mins."
			} else if(predictedTimeLeftMinsRounded > 20 && predictedTimeLeftMinsRounded <= 25){
				namedPredictedTime = "20-25 mins."	
			} else if(predictedTimeLeftMinsRounded > 25 && predictedTimeLeftMinsRounded <= 30){
				namedPredictedTime = "25-30 mins."
			} else {
				namedPredictedTime = "30-40 mins."
			}
			
			singleCMData.prediuctedTimeLeft = predictedTimeLeftMins + " mins."
			singleCMData.namedPredictedTimeLeft = namedPredictedTime
			singleCMData.stdDevPredictedTimeLeft = predictedTimeLeftStdDeviationTime + " mins."
			
			if(showPredictedTimeColumn == true){
				//tro.append("<td class='predictedTimeColumn'>" + namedPredictedTime +"</td>")
			} else {
				//document.getElementById("predictedTimeColumn").style.display = "none"
			}
								
		}
		//$('#currentMatchesTable').append(tro)
		allCMdata.push(singleCMData)
	} /** end of for loop **/
	
	while(predictedTimeLeftArray.length < availableLocationsCount){
		var predictedTimeLeftObj = {}
		predictedTimeLeftObj.timeLeft = 0
		predictedTimeLeftObj.stdDev = 0
		predictedTimeLeftArray.push(predictedTimeLeftObj)
	} 
	
	predictedTimeLeftArray.sort(function(a, b){return a.timeLeft - b.timeLeft})
	
	//append table
	////log("allCMdata", allCMdata)
	CMremakeCount = 0

	var my_lengthMenu = lengthMenu(false, allCMdata) //create whole table
	//////log(my_lengthMenu)
	function makeNoCourtsTable(my_data, ifPaging, lengthMenu){
		var my_CMTable = $('#currentMatchesTable').DataTable({
			data: my_data,
			paging: ifPaging,
			pagingType: "numbers",
			lengthChange: ifLengthChange(),
			searching: ifOrganizerViewPreset,
			lengthMenu:	lengthMenu,
			ordering: false,
			responsive: false,
			dom: tableInfoLocations(),
			/*dom: 'CMTable',
			buttons: [
						'colvis'
					],*/
			//pageResize: true,
			//bAutoWidth: false,			
			columns: [
				{ data: 'CourtName', fnCreatedCell: 	function (nTd, sData, oData, iRow, iCol) {
																			$(nTd).css('text-align', 'left')
																			$(nTd).css('border-right', '0.2vw solid #555555')
																			$(nTd).css('padding-left', '5px')
																			$(nTd).css('border-left', '3px solid #555555')
																			if(oData.courtOnHold == true){
																				$(nTd).css('background-color', '#ff8080')
																			} else {
																				$(nTd).css('background-color', '#71da71')
																			}
																			$(nTd).css('padding-top', '5px')
																			$(nTd).css('padding-bottom', '5px')
																		}
				},
				{ data: 'poolPlaying', fnCreatedCell: 	function (nTd, sData, oData, iRow, iCol) {
																			if(oData.courtOnHold == false){
																				if(sData != ""){
																					$(nTd).css('border-right', '0.2vw solid #555555')
																					$(nTd).css('background-color', '#b3ccff')
																					$(nTd).css('padding-left', '5px')
																					$(nTd).css('padding-right', '5px')
																					$(nTd).css('text-align', 'left')
																				} else {
																					$(nTd).css('border-right', '0.2vw solid #555555')
																					$(nTd).css('padding-left', '5px')
																					$(nTd).css('padding-right', '5px')
																					$(nTd).css('text-align', 'left')
																				}
																			} else {
																				$(nTd).css('text-align', 'left')
																				$(nTd).css('padding-left', '5px')
																				$(nTd).css('white-space', 'nowrap')
																			}
																		}
				},
				{ data: 'team1', fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
														$(nTd).css('padding-left', '5px')
														$(nTd).css('text-align', 'left')
												}														
				},
				{ data: 'vsColumn', sWidth: '10px', fnCreatedCell:	function (nTd, sData, oData, iRow, iCol) {
																		$(nTd).css('font-weight', 'bold')
																	}
				},
				{ data: 'team2', fnCreatedCell:  	function (nTd, sData, oData, iRow, iCol) {
														$(nTd).css('padding-left', '5px')
														$(nTd).css('text-align', 'left')
													}												
				},
				{ data: 'alreadyPlayingTime', sWidth: '80px', fnCreatedCell:	function (nTd, sData, oData, iRow, iCol) {
																					if(oData.courtOnHold == false){
																						$(nTd).css('border-left', '0.2vw solid #555555')
																					}
																				},																					
				visible: showPlayingTimeColumn},
				{ data: 'stdDevPredictedTimeLeft'/*namedPredictedTimeLeft*/, fnCreatedCell: 	function (nTd, sData, oData, iRow, iCol){
																	$(nTd).css('width', '60px')
																	$(nTd).css('border-right', '3px solid #555555')
																},
				visible: showPredictedTimeColumn}
			],
		})
	return my_CMTable}
	
	function makeCurrentMatchesTable(my_data, ifPaging, lengthMenu){
		var my_CMTable = $('#currentMatchesTable').DataTable({
			data: my_data,
			paging: ifPaging,
			pagingType: "numbers",
			lengthChange: ifLengthChange(),
			searching: ifOrganizerViewPreset,
			lengthMenu:	lengthMenu,
			ordering: false,
			responsive: false,
			dom: tableInfoLocations(),
			/*dom: 'CMTable',
			buttons: [
						'colvis'
					],*/
			//pageResize: true,
			//bAutoWidth: false,			
			columns: [
				{ data: 'CourtName', fnCreatedCell: 	function (nTd, sData, oData, iRow, iCol) {
																			$(nTd).css('text-align', 'left')
																			$(nTd).css('border-right', '0.2vw solid #555555')
																			$(nTd).css('padding-left', '5px')
																			$(nTd).css('border-left', '3px solid #555555')
																			if(oData.courtOnHold == true){
																				$(nTd).css('background-color', '#ff8080')
																			} else {
																				$(nTd).css('background-color', '#71da71')
																			}
																			$(nTd).css('padding-top', '5px')
																			$(nTd).css('padding-bottom', '5px')
																		}
				},
				{ data: 'poolPlaying', sWidth: '120px', fnCreatedCell: 	function (nTd, sData, oData, iRow, iCol) {
																			if(oData.courtOnHold == false){
																				if(sData != ""){
																					$(nTd).css('border-right', '0.2vw solid #555555')
																					$(nTd).css('background-color', '#b3ccff')
																					$(nTd).css('padding-left', '5px')
																					$(nTd).css('padding-right', '5px')
																					$(nTd).css('text-align', 'left')
																				} else {
																					$(nTd).css('border-right', '0.2vw solid #555555')
																					$(nTd).css('padding-left', '5px')
																					$(nTd).css('padding-right', '5px')
																					$(nTd).css('text-align', 'left')
																				}
																			} else {
																				$(nTd).css('text-align', 'left')
																				$(nTd).css('padding-left', '5px')
																				$(nTd).css('white-space', 'nowrap')
																			}
																		}
				},
				{ data: 'team1', fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
														$(nTd).css('padding-left', '5px')
														$(nTd).css('text-align', 'left')
												}														
				},
				{ data: 'vsColumn', sWidth: '10px', fnCreatedCell:	function (nTd, sData, oData, iRow, iCol) {
																		$(nTd).css('font-weight', 'bold')
																	}
				},
				{ data: 'team2', fnCreatedCell:  	function (nTd, sData, oData, iRow, iCol) {
														$(nTd).css('padding-left', '5px')
														$(nTd).css('text-align', 'left')
													}												
				},
				{ data: 'alreadyPlayingTime', sWidth: '80px', fnCreatedCell:	function (nTd, sData, oData, iRow, iCol) {
																					if(oData.courtOnHold == false){
																						$(nTd).css('border-left', '0.2vw solid #555555')
																					}
																				},																					
				visible: showPlayingTimeColumn},
				{ data: 'stdDevPredictedTimeLeft'/*namedPredictedTimeLeft*/, fnCreatedCell: 	function (nTd, sData, oData, iRow, iCol){
																	$(nTd).css('width', '60px')
																	$(nTd).css('border-right', '3px solid #555555')
																},
				visible: showPredictedTimeColumn}
			],
		})
	return my_CMTable}
	
	if(my_locationsList.length == 0){
		my_currentMatchesTable = makeNoCourtsTable(allCMdata, ifPaging, my_lengthMenu)
	} else {
		my_currentMatchesTable = makeCurrentMatchesTable(allCMdata, ifPaging, my_lengthMenu)
	}
	//paging	
	if(ifPaging == true){
		
			function resizeCMTable(){
				var countCMRows = paginationConfig('currentMatchesTable')
				////log("countCMRows", countCMRows)
				my_currentMatchesTable.destroy()
				////log("CM table destroyed")
				var my_newLengthMenu = lengthMenu(true, allCMdata, countCMRows)
				my_currentMatchesTable = makeCurrentMatchesTable(allCMdata, ifPaging, my_newLengthMenu)
				
				var my_CMDiv = document.getElementById('currentmatches-tab-content')
				var my_CMDivHeight = my_CMDiv.offsetHeight	
				function checkCMOverflow(table, data, ifPaging, origRowscount, my_newLengthMenu, my_tableHeight){
					//log("overflowcount CM:", CMremakeCount)
					var my_CMDiv = document.getElementById('currentmatches-tab-content')
					var my_CMDivHeight = my_CMDiv.offsetHeight	
					selectedCMTable = 1
					if (my_CMDivHeight >= (availableCMTableHeight+ my_paginationNavHeight + my_CMnotesHeight)) {
						//log("overflow found in CM", my_CMDivHeight, availableCMTableHeight)
						table.destroy()
						CMremakeCount +=1
						var newRowsCount = origRowscount - CMremakeCount
						CMPageCount = Math.ceil(allCMdata.length / newRowsCount)
						////log("CM table destroyed", "CMremakeCount", CMremakeCount, "origCounts", origRowscount, "newRowsCount", newRowsCount)
						var my_newnewLengthMenu = lengthMenu(true, allCMdata, newRowsCount)
						//////log(my_newnewLengthMenu)
						my_currentMatchesTable = makeCurrentMatchesTable(allCMdata, ifPaging, my_newnewLengthMenu)
						selectedCMTable = 2
						checkCMOverflow(my_currentMatchesTable, data, ifPaging, origRowscount, my_newnewLengthMenu, my_CMDivHeight)
					} else {
						var my_activeTab = $('.tab-content').find('.tab-pane.active').attr('id')
						//log("no more resizing in CM; ativeTab:", my_activeTab)
						if(my_activeTab == tabTableContents[0] && startTab == tabTableContents[0] && reloadedData == true){
							//log("in start tab CM")
							var CMstarttimeout = setTimeout(function(){getCMpageCount()}, 1000)
							log("setting currentMathces interval")
							refreshTimeInterval = setInterval(function(){ timeSinceLastRefreshTime += 1}, 1000)
							reloadedData = false
						}
					}
				}
				checkCMOverflow(my_currentMatchesTable, allCMdata, ifPaging, countCMRows, my_newLengthMenu, my_CMDivHeight)
			}
			resizeCMTable()
		
			//page time config
			
			//on table change
			function getCMpageCount(){
				CMremakeCount = 0
					CMTimeout = setTimeout(function(){
						//resizeCMTable()
		
						////log("Page count UM:", my_pageCount)
						//function pageTime(){
							function pageConfig(table){
								var tableInfo = table.page.info()
								CMPageCount = tableInfo.pages
								if(noCurrentMatches == true){
									currentMatchesTabTime = 5000
								} else {
									currentMatchesTabTime = (document.getElementById("currentTime").value * 1000) - 4000
								}
								pageTimeconfig(true, "CM", my_currentMatchesTable, CMPageCount,minPageTime, currentMatchesTabTime, allCMdata)
							}
							pageConfig(my_currentMatchesTable)
				}, 500)
			}
			
			$('#currentMatches-button').on('changeTable', function(e) {
					CMdetectChangeCount +=1
					if(CMdetectChangeCount == 1){
						CMclickChange += 1
						//log("change table detected in CM with nr.:", CMclickChange, startTab, timeSinceLastRefreshTime+">=?"+reloadDataTimeSecs)			
						if(startTab == tabTableContents[0] && timeSinceLastRefreshTime >= reloadDataTimeSecs){
							//log("in refresh change start tab CM")
							if(sampleData == false){
								$.when(checkForAPIChange())
								.then(function(){
									if(ifAPIChangeDetected == true){
										temprefreshTimeout = setTimeout(function(){
										removeTables()}, 1000)
									} else {
										nextTablePage(true, "CM", my_currentMatchesTable, newCMPageTime, newCMTableTime)
									}
								})
							} else {
								ifAPIChangeDetected = true
								temprefreshTimeout = setTimeout(function(){
								removeTables()}, 1000)
							}								
							//getAPIDataAndMakeTables()}, 1000)
						} else if(CMclickChange == 1 && startTab == tabTableContents[0]){
							//log("second time in CM tab and CM start tab")
							nextTablePage(true, "CM", my_currentMatchesTable, newCMPageTime, newCMTableTime)
						} else if(CMclickChange == 1 && startTab != tabTableContents[0]){
							//log("first time in CM tab and CM not start tab")
							getCMpageCount()
						} else if(CMclickChange > 1){
							//log(">1 time in CM tab")
							nextTablePage(true, "CM", my_currentMatchesTable, newCMPageTime, newCMTableTime)
						} else {
							//log("error occured in CM change table detection", CMclickChange, startTab)
						}
					}						
			})
	}
	
document.getElementById("currentMatchesLoader").style.display = "none"
}