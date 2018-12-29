/** Postponed matches **/
function getPostponedMatchesTable(){
	log("making postponed matches table...")
	PMTableCount +=1
	try{
		my_postponedMatchesTable.destroy()
	} catch(err){
		//log(err)
	}
		my_windowsHeight = $(window).innerHeight()
		my_OffsetTop = $("#postponedMatchesTable").offset().top
		UnlistedMatchCount += 0
		my_PMRows = []
		//allPMdata = []
		var playerNamesCurrentlyPlayingArray = []
		var playerNamesReadyToPlayArray = []
		var playerNamesCurrentlyUnavailableArray = []
		
		
		//there unavailable players or postponed matches

			//////log("pmarray:", my_unavPostponedMatches)
			for (var pm = 0; pm < my_unavPostponedMatches.length; pm++){
					//////log("processing new match..",  my_unavPostponedMatches.length)
					var singlePMData = {}
					var statusPlayers = [];
					var playerNamesCurrentlyPlayinginMatchArray = []
					var playersPlayingObects = []
					var my_PMrowNumber = pm + 1
					var my_PoolName = my_unavPostponedMatches[pm].pool
					
					var poolPropertiesObject = findPoolProperties(my_PoolName)
					singlePMData.poolProperties = poolPropertiesObject
					
					if(poolPropertiesObject.altNames[0] === "Average Pool"){
						var abbrPoolName = my_PoolName
					} else {
						var abbrPoolName = poolPropertiesObject.abbreviations[0]
					}
					
					var PMrow_id = "PMrow-" + my_PMrowNumber
					//tri = $('<tr id=' + UMrow_id + '/>');
					// um nr
					//tri.append("<td class='vsColumn'>" + my_UMrowNumber + "</td>")
					singlePMData.matchNr = my_unavPostponedMatches[pm].localId

					if(ifMobile === false){
						//tri.append("<td class='poolColumn'>" + my_PoolName + "</td>");
						singlePMData.PoolName = my_PoolName 
					} else {
						var abbrPoolName = getPoolNameAbbr(my_PoolName)
						//tri.append("<td class='poolColumn'>" + abbrPoolName + "</td>");
						singlePMData.PoolName = abbrPoolName 
					}
					singlePMData.abbrPoolName = abbrPoolName
					//tri.append("<td>" + my_unavPostponedMatches[pm].localId + "</td>");
				
					//Get status in Table
					function getStatus(fullPlayerName, playerName, amountPlayers, playerCurrentlyPlaying, playerReady, TdInput, playerStatus){
								if(playerCurrentlyPlaying === true){
									playerNamesCurrentlyPlayinginMatchArray.push(fullPlayerName)
									playerNamesCurrentlyPlayingArray.push(fullPlayerName)
									var playerStatus = "player playing"
									statusPlayers.push(playerStatus)	
										return playerName
								} else {
									if(playerReady === false){
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
					for (var t1 = 0; t1 < my_unavPostponedMatches[pm].team1.players.length; t1++){
							my_T1count +=1
							var playerNickNameTeam1 = my_unavPostponedMatches[pm].team1.players[t1].name
							var playerNameTeam1 = playerNickNameTeam1.replace(/".*"/, "").replace("  ", " ")
							var t1PlayerCurrentlyPlaying = my_unavPostponedMatches[pm].team1.players[t1].currentlyPlaying
							//////////log(playerNameTeam1, "playing:", t1PlayerCurrentlyPlaying)
							var t1PlayerReady = my_unavPostponedMatches[pm].team1.players[t1].ready
							//////////log(playerNameTeam1, "ready:", t1PlayerReady)
							var amountT1Players = my_unavPostponedMatches[pm].team1.players.length
							var Td1Input, t1PlayerStatus
							var my_t1Input = getStatus(playerNickNameTeam1, playerNameTeam1, amountT1Players, t1PlayerCurrentlyPlaying, t1PlayerReady, Td1Input, t1PlayerStatus)
					//tri.append(my_t1Input)
						if(my_unavPostponedMatches[pm].team1.players.length === 1){
							singlePMData.teamOne1 = my_t1Input
							singlePMData.teamOne2 = ""
						} else if(my_unavPostponedMatches[pm].team1.players.length > 1 && my_T1count === 1){
							singlePMData.teamOne1 = my_t1Input
						} else if (my_unavPostponedMatches[pm].team1.players.length > 1 && my_T1count === 2){
							singlePMData.teamOne2 = my_t1Input
						}
					}
					if(my_unavPostponedMatches[pm].team1.players.length === 0){
						my_t1Input = "-"
						singlePMData.teamOne1 = "-"
						singlePMData.teamOne2 = ""
					}
					
					//vs column
					//tri.append("<td class='vsColumn'>" + "<b>vs.</b>" + "</td>");
					singlePMData.vsColumn = "vs."
					
					//Name Team 2 Column
					var my_T2count = 0
					for (var t2 = 0; t2 < my_unavPostponedMatches[pm].team2.players.length; t2++){
							my_T2count +=1
							var playerNickNameTeam2 = my_unavPostponedMatches[pm].team2.players[t2].name
							var playerNameTeam2 = playerNickNameTeam2.replace(/".*"/, "").replace("  ", " ")
							var t2PlayerCurrentlyPlaying = my_unavPostponedMatches[pm].team2.players[t2].currentlyPlaying
							//////////log(playerNameTeam2, "playing:", t2PlayerCurrentlyPlaying)
							var t2PlayerReady = my_unavPostponedMatches[pm].team2.players[t2].ready
							//////////log(playerNameTeam2, "ready:", t2PlayerReady)
							var amountT2Players = my_unavPostponedMatches[pm].team2.players.length
							var Td2Input, t2PlayerStatus
							var my_t2Input = getStatus(playerNickNameTeam2, playerNameTeam2, amountT2Players, t2PlayerCurrentlyPlaying, t2PlayerReady, Td2Input, t2PlayerStatus)
					//tri.append(my_t2Input);
					if(my_unavPostponedMatches[pm].team2.players.length === 1){
						singlePMData.teamTwo1 = my_t2Input
						singlePMData.teamTwo2 = ""
					} else if(my_unavPostponedMatches[pm].team2.players.length > 1 && my_T2count === 1){
						singlePMData.teamTwo1 = my_t2Input
					} else if (my_unavPostponedMatches[pm].team2.players.length > 1 && my_T2count === 2){
						singlePMData.teamTwo2 = my_t2Input
					}
					}
					if(my_unavPostponedMatches[pm].team2.players.length === 0){
						my_t2Input = "-"
						singlePMData.teamTwo1 = "-"
						singlePMData.teamTwo2 = ""
					}
					
					//Status column
					var playersPlaying = inArray("player playing", statusPlayers)
					var playersNotReady = inArray("player not ready", statusPlayers)
					
					if (my_unavPostponedMatches[pm].status === "Postponed"){
						var my_statusText = postponedMatch
						var my_status = my_statusText
					} else if (playersNotReady === true){
						var my_statusText = playersUnavailable
						var my_status = my_statusText
					}else if (playersPlaying === true){
						var my_statusText = playersCurrentlyPlaying
						var my_status = my_statusText
					}
					
					singlePMData.status = my_status
					
					
					//Comment
					//if(my_unavPostponedMatches[pm].status === "Postponed"){
						var my_comment = my_unavPostponedMatches[pm].nonreadyReason
						//if(my_comment === ""){
							
						//}
					//}
					//tri.append("<td class='expectedTimeColumn'" + my_comment + "</td>");
					singlePMData.comment = my_comment
			//////log("single PM data:", singlePMData)
			allPMdata.push(singlePMData)
			}
			
			//append Table
			allPMdata.sort(dynamicSort("matchNr"));
			//log("allPMdata", allPMdata)
			var PMremakeCount = 0
			var my_lengthMenu = lengthMenu(false, allPMdata) //create whole table
				function makeNoPostponedMatchesTable(my_data, ifPaging, lengthMenu){
					var tableInfoLocations = setTableInfoLocations(ifOrganizerViewPreset);
					var my_PMTable = $('#postponedMatchesTable').DataTable({
						data: my_data,
						paging: ifPaging,
						pagingType: "numbers",
						lengthChange: ifLengthChange(),
						searching: ifOrganizerViewPreset,
						lengthMenu:	lengthMenu,
						ordering: false,
						responsive: false,
						dom: tableInfoLocations,
						//pageResize: true,
						//bAutoWidth: false,			
						columns: [
							{ data: 'matchNr', fnCreatedCell: 	function (nTd, sData, oData, iRow, iCol) {
																	$(nTd).css('text-overflow', 'visible')
																	$(nTd).css('white-space', 'nowrap')
																}
							},
							{ data: 'PoolName' },
							{ data: 'teamOne1' },
							{ data: 'teamOne2' },
							{ data: 'vsColumn' },
							{ data: 'teamTwo1' },
							{ data: 'teamTwo2' },
							{ data: 'status'  },
							{ data: 'comment' },
						]
					})
				return my_PMTable}

				function makePostponedMatchesTable(my_data, ifPaging, lengthMenu){
					var tableInfoLocations = setTableInfoLocations(ifOrganizerViewPreset);
					var my_PMTable = $('#postponedMatchesTable').DataTable({
						data: my_data,
						paging: ifPaging,
						pagingType: "numbers",
						lengthChange: ifLengthChange(),
						searching: ifOrganizerViewPreset,
						lengthMenu:	lengthMenu,
						ordering: false,
						responsive: false,
						dom: tableInfoLocations,
						//pageResize: true,
						//bAutoWidth: false,			
						columns: [
							{ data: 'matchNr', sWidth: '15px', autoWidth: false, fnCreatedCell: 	function (nTd, sData, oData, iRow, iCol) {
																	$(nTd).css('border-left', '3px solid #555555')
																	$(nTd).css('text-align', 'center')
																	$(nTd).css('padding-top', '5px')
																	$(nTd).css('padding-bottom', '5px')
																}
							},
							{ data: 'PoolName', sWidth: '150px', autoWidth: true, fnCreatedCell: 	function (nTd, sData, oData, iRow, iCol) {
																	$(nTd).css('border-left', '0.2vw solid #555555')
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
																	var inRTP = false;
																	var inPl = false;
																	var inUnav = false;
																	var inRTP = getNewStatus("PM", "RTP", sData, oData)//inArray(sData, UM_playerNamesReadyToPlayArray)
																	if (inRTP === false) {
																		inPl = getNewStatus("PM", "PP", sData, oData)//inArray(sData, UM_playerNamesCurrentlyPlayingArray)
																		if (inPl === false && inPl === false) {
																			inUnav = getNewStatus("PM", "Unav", sData, oData)//inArray(sData, UM_playerNamesCurrentlyUnavailableArray)
																		}
																	}

																	if (inRTP === true) {
																		//log("ready to play css", nTd)
																		$(nTd).css('background-color', 'transparent')
																	} else if (inPl === true) {
																		//log("playing css", nTd);
																		$(nTd).css('background-color', '#ffffb3')
																	} else if (inUnav === true) {
																		$(nTd).css('background-color', '#ff8080')
																	} else {
																		$(nTd).css('background-color', 'transparent')
																	}
																}
															
							},
							{ data: 'teamOne2', fnCreatedCell:  function (nTd, sData, oData, iRow, iCol) {
																	$(nTd).css('padding-left', '5px')
																	$(nTd).css('text-align', 'left')
																	//////log(sData)
																	var inRTP = false;
																	var inPl = false;
																	var inUnav = false;
																	var inRTP = getNewStatus("PM", "RTP", sData, oData)//inArray(sData, UM_playerNamesReadyToPlayArray)
																	if (inRTP === false) {
																		inPl = getNewStatus("PM", "PP", sData, oData)//inArray(sData, UM_playerNamesCurrentlyPlayingArray)
																		if (inPl === false && inPl === false) {
																			inUnav = getNewStatus("PM", "Unav", sData, oData)//inArray(sData, UM_playerNamesCurrentlyUnavailableArray)
																		}
																	}

																	if (inRTP === true) {
																		//log("ready to play css", nTd)
																		$(nTd).css('background-color', 'transparent')
																	} else if (inPl === true) {
																		//log("playing css", nTd);
																		$(nTd).css('background-color', '#ffffb3')
																	} else if (inUnav === true) {
																		$(nTd).css('background-color', '#ff8080')
																	} else {
																		$(nTd).css('background-color', 'transparent')
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
																	var inRTP = false;
																	var inPl = false;
																	var inUnav = false;
																	var inRTP = getNewStatus("PM", "RTP", sData, oData)//inArray(sData, UM_playerNamesReadyToPlayArray)
																	if (inRTP === false) {
																		inPl = getNewStatus("PM", "PP", sData, oData)//inArray(sData, UM_playerNamesCurrentlyPlayingArray)
																		if (inPl === false && inPl === false) {
																			inUnav = getNewStatus("PM", "Unav", sData, oData)//inArray(sData, UM_playerNamesCurrentlyUnavailableArray)
																		}
																	}

																	if (inRTP === true) {
																		//log("ready to play css", nTd)
																		$(nTd).css('background-color', 'transparent')
																	} else if (inPl === true) {
																		//log("playing css", nTd);
																		$(nTd).css('background-color', '#ffffb3')
																	} else if (inUnav === true) {
																		$(nTd).css('background-color', '#ff8080')
																	} else {
																		$(nTd).css('background-color', 'transparent')
																	}
																}												
							},
							{ data: 'teamTwo2', fnCreatedCell:  function (nTd, sData, oData, iRow, iCol) {
																	$(nTd).css('padding-left', '5px')
																	$(nTd).css('text-align', 'left')
																	var inRTP = false;
																	var inPl = false;
																	var inUnav = false;
																	var inRTP = getNewStatus("PM", "RTP", sData, oData)//inArray(sData, UM_playerNamesReadyToPlayArray)
																	if (inRTP === false) {
																		inPl = getNewStatus("PM", "PP", sData, oData)//inArray(sData, UM_playerNamesCurrentlyPlayingArray)
																		if (inPl === false && inPl === false) {
																			inUnav = getNewStatus("PM", "Unav", sData, oData)//inArray(sData, UM_playerNamesCurrentlyUnavailableArray)
																		}
																	}

																	if (inRTP === true) {
																		//log("ready to play css", nTd)
																		$(nTd).css('background-color', 'transparent')
																	} else if (inPl === true) {
																		//log("playing css", nTd);
																		$(nTd).css('background-color', '#ffffb3')
																	} else if (inUnav === true) {
																		$(nTd).css('background-color', '#ff8080')
																	} else {
																		$(nTd).css('background-color', 'transparent')
																	}
																}												
							},
							{ data: 'status', sWidth: '80px', fnCreatedCell:	function (nTd, sData, oData, iRow, iCol) {
																	$(nTd).css('border-left', '0.2vw solid #555555')
																	//////log(sData)
																	if (sData === postponedMatch){
																		$(nTd).css('background-color', '#ff8080')
																		$(nTd).css('text-decoration', 'underline')
																	} else if (sData === playersCurrentlyPlaying ){
																		$(nTd).css('background-color', '#ffffb3')
																	} else if (sData === playersUnavailable ){
																		$(nTd).css('background-color', '#ff8080')
																	} else if (sData === readyToPlay){
																		$(nTd).css('background-color', '#71da71')
																	}
																}											
							},
							{ data: 'comment', fnCreatedCell: 	function (nTd, sData, oData, iRow, iCol){
																				$(nTd).css('padding-left', '5px')
																				$(nTd).css('text-align', 'left')
																				$(nTd).css('width', '60px')
																				$(nTd).css('border-right', '3px solid #555555')
																			}
							}
						]
					})
				return my_PMTable}				
			
			if(noUnavPostponedMatches === true){
				//log("no PM")
				my_postponedMatchesTable = makeNoPostponedMatchesTable(allPMdata, ifPaging, my_lengthMenu)
			} else {
				my_postponedMatchesTable = makePostponedMatchesTable(allPMdata, ifPaging, my_lengthMenu)
			}
			//paging
			if(ifPaging === true){
				function resizePMTable(){
					var countPMRows = paginationConfig('postponedMatchesTable')
					my_postponedMatchesTable.destroy()
					////log("PM table destroyed")
					var my_newLengthMenu = lengthMenu(true, allPMdata, countPMRows)
					if(noUnavPostponedMatches === true){
						my_postponedMatchesTable = makeNoPostponedMatchesTable(allPMdata, ifPaging, my_newLengthMenu)
					} else {
						my_postponedMatchesTable = makePostponedMatchesTable(allPMdata, ifPaging, my_newLengthMenu)
					}
					var my_PMDiv = document.getElementById('postponedmatches-tab-content')
					var my_PMDivHeight = my_PMDiv.offsetHeight	
					
					function checkOverflow(table, data, ifPaging, origRowscount, my_newLengthMenu, my_tableHeight){
						//log("overflowcount PM:", PMremakeCount)
						var my_PMDiv = document.getElementById('postponedmatches-tab-content')
						var my_PMDivHeight = my_PMDiv.offsetHeight
						selectedPOTable = 1
						if (my_PMDivHeight >= (availablePMTableHeight + my_paginationNavHeight)){
							//log("overflow found in PM", my_PMDivHeight, availablePMTableHeight, PMremakeCount)
							table.destroy()
							PMremakeCount +=1
							//////log("UM table destroyed", UMremakeCount, "rowCounts", origRowscount)
							var newRowsCount = origRowscount - PMremakeCount
							PMPageCount = Math.ceil(allPMdata.length / newRowsCount)
							//////log("newRowsCount", newRowsCount)
							var my_newnewLengthMenu = lengthMenu(true, allPMdata, newRowsCount)
							//////log(my_newnewLengthMenu)
							if(noUnavPostponedMatches === true){
								my_postponedMatchesTable = makeNoPostponedMatchesTable(allPMdata, ifPaging, my_newLengthMenu)
							} else {
								my_postponedMatchesTable = makePostponedMatchesTable(allPMdata, ifPaging, my_newLengthMenu)
							}
							
							selectedPOTable = 2
							checkOverflow(my_postponedMatchesTable, allPMdata, ifPaging, origRowscount, my_newnewLengthMenu, my_PMDivHeight)
						} else {
							var my_activeTab = $('.tab-content').find('.tab-pane.active').attr('id')
							//log("no more resizing in PM; activeTab:", my_activeTab)
							if(my_activeTab === tabTableContents[2] && startTab === tabTableContents[2] && reloadedData === true){
								//log("start tab PM")
								var PMstarttimeout = setTimeout(function(){getPMpageCount()}, 1000)
								refreshTimeInterval = setInterval(function(){ timeSinceLastRefreshTime += 1}, 1000)
								reloadedData = false
							}
						}
					}
					checkOverflow(my_postponedMatchesTable, allPMdata, ifPaging, countPMRows, my_newLengthMenu, my_PMDivHeight)
				}
				resizePMTable()
				//page time config			
				
				//on table change
				function getPMpageCount(){
					PremakeCount = 0
						PMTimeout = setTimeout(function(){
							resizePMTable()
					
						////log("Page count UM:", my_pageCount)
						//function pageTime(){
							function pageConfig(table){
								var tableInfo = table.page.info()
								PMPageCount = tableInfo.pages
								if(noUnavPostponedMatches === true){
									postponedMatchesTabTime = 5000
								} else {
									postponedMatchesTabTime = (document.getElementById("postponedTime").value * 1000) - 4000
								}
								pageTimeconfig(true, "PM", my_postponedMatchesTable, PMPageCount, minPageTime, postponedMatchesTabTime, allPMdata)
							}
							pageConfig(my_postponedMatchesTable)
						}, 500)
				}
				$('#postponedMatches-button').on('changeTable', function(e) {
					PMdetectChangeCount +=1
					if(PMdetectChangeCount === 1){
						PMclickChange +=1
						//log("change table detected in PM with nr.:", PMclickChange)		
							if(startTab === tabTableContents[2] && timeSinceLastRefreshTime >= reloadDataTimeSecs){
								//log("start refresh tab PM")
								if(sampleData === false){
									$.when(checkForAPIChange())
									.then(function(){
										if(ifAPIChangeDetected === true){
											temprefreshTimeout = setTimeout(function(){
											removeTables()}, 1000)
										} else {
											nextTablePage(true, "PM", my_postponedMatchesTable, newPMPageTime, newPMTableTime)
										}
									})
								} else {
									ifAPIChangeDetected = true
									temprefreshTimeout = setTimeout(function(){
									removeTables()}, 1000)
								}
								//getAPIDataAndMakeTables()}, 1000)
							} else if(PMclickChange === 1 && startTab === tabTableContents[2]){
								//log("second time in PM tab and PM start tab")
								nextTablePage(true, "PM", my_postponedMatchesTable, newPMPageTime, newPMTableTime)
							} else if(PMclickChange === 1 && startTab != tabTableContents[2]){
								//log("first time in PM tab and PM not start tab")
								getPMpageCount()						
							} else if(PMclickChange > 1){
								//log(">1 time in PM tab")
								nextTablePage(true, "PM", my_postponedMatchesTable, newPMPageTime, newPMTableTime)
							} else {
								//log("error occured in PM change table detection", PMclickChange, startTab)
							}
					}							
				})
				/*function ifPMActive(){
						////log("PMClickCount in active:", PMclickChange)
						PMclickChange +=1
						if(PMclickChange === 1 && startTab != tabTableContents[2]){
							PMpageCount()
						} else {
							nextTablePage(true, "PM", my_postponedMatchesTable, newPMPageTime, newPMTableTime)
						}
				}*/
			}
    document.getElementById("postponedMatchesLoader").style.display = "none"
    if (ifMobile == true) {
        $("#creditsTextPostponed").append(creditsTextAppendText)
    }
}