/**Pools Overview table**/
function getPoolsOverviewTable(){
	log("making pools overview table...")
	POTableCount +=1
	allPOdata = []
	//////log(my_upcomingMatchesTable)
	//////log("here", selectedPOTable)
	document.getElementById("poolsOverviewLoader").style.display = ""
	try{
		my_poolsOverviewTable.destroy()
		//log("pools table destroyed")
	} catch (err){
		////log(err)		
	}
		
	if(noPools == true){
		var POrow_id = 0
		tr = $('<tr id=' + POrow_id + '/>');
		tr.append("<td colspan='7' class='noUpcomingMatchesRow'>" + "No Pools have been set up." + "</td>")
		$('#poolsOverviewTable').append(tr)
		document.getElementById("poolsOverviewLoader").style.display = "none"
	} else { // there are pools set up.
		if (ifGoogleSheetProperties == true){
			if(my_GoogleSheetData.length == 0){
				Tabletop.init({
								key: googleSheetUrl,
								callback: function(data, tabletop) { 
								   //////////log(data)
								   document.getElementById("poolsOverviewLoader").style.display = "none"
								   my_GoogleSheetData = data
								   poolsOverviewTable(my_GoogleSheetData)
								},
								simpleSheet: true,
								parseNumbers: true
							})
			} else {
				poolsOverviewTable(my_GoogleSheetData)
			}
		} else {
			poolsOverviewTable()
		}
		
		function poolsOverviewTable(my_GoogleSheetData){
			//////////log("pools with teams", my_poolsWithTeams)
			document.getElementById("poolsOverviewLoader").style.display = ""
			for (var i = 0; i < my_poolsWithTeams.length; i++) {
				//////////log("pools wth teams", my_poolsWithTeams)
				var singlePOData = {}
				var my_POrowNumber = i+1
				var POrow_id = "POrow-" + my_POrowNumber
				tr = $('<tr id=' + POrow_id + '/>');
				////tr.append("<td>" + my_poolsWithTeams[i].poolId + "</td>");
				singlePOData.PONr = my_POrowNumber 
				singlePOData.poolID = my_poolsWithTeams[i].poolId
				
				var PoolName = my_poolsWithTeams[i].name
				singlePOData.poolName = PoolName
				
				var poolPropertiesObject = findPoolProperties(PoolName)
				//log(poolPropertiesObject)
				singlePOData.poolProperties = poolPropertiesObject

				
				if(poolPropertiesObject.altNames[0] == "Average Pool"){
					var abbrPoolName = PoolName
				} else {
					var abbrPoolName = poolPropertiesObject.abbreviations[0]
				}
								
				singlePOData.abbrPoolName = abbrPoolName
				
				amountTeams = my_poolsWithTeams[i].totTeams
				singlePOData.amountTeams = amountTeams
				if(ifMobile == false){
					singlePOData.poolName = PoolName
				} else {
					singlePOData.poolName = abbrPoolName
				}
								
				if (amountTeams == 0){
					roundsCalc = 0
				}else if (isEven(amountTeams)){
					roundsCalc = amountTeams - 1
				}else {
					roundsCalc = amountTeams
				}
				
				singlePOData.roundsNeeded = roundsCalc
				
				my_RoundsNumber = my_nrofRoundsPerPool[PoolName]
				if(my_RoundsNumber == undefined){
					my_RoundsNumber = 0
				}
				singlePOData.roundsNr = my_RoundsNumber
				
				/*my_RoundsNumber = my_RoundsList[i]
				my_poolIdString = my_poolsWithTeams[i].poolId.toString()
				roundsUrl = tourniaUrl + tournament_ID + "/rounds/" +  
				my_poolIdString
				var getRoundCount = $.getJSON(roundsUrl, //output: {"1":"Round 1","2":"Round 2"}
					function (json) {
						my_roundsCreated = json;
						my_roundsCount = Object.keys(my_roundsCreated).length
						my_pools.createdRounds = my_roundsCount;
						//tr.append("<td>" + my_pools.createdRounds + "</td>")
						})
				*/		
				//////////log(my_RoundsList[i]) //gets Array of Roun numbers created in getRounds() above
				
				//if( my_pools[i].totTeams == 0){
					//roundsLeft = 0
				//} else {		
				
				roundsLeft = roundsCalc - my_RoundsNumber
				if(roundsLeft < 0){
					returnRounds = roundsLeft * -1
				roundsLeft = "Returns round " +  returnRounds
				var returnsComplete = false;
				if(returnRounds == roundsCalc){
					returnsComplete = true;
					}
				}
				singlePOData.roundsLeft = roundsLeft
				
				/*get Status pool*/
				//if Pool playing
				var ifPoolPlaying = inArray(PoolName, my_listCurrentMatches)
				//if pool planned
				ifMatchPlanned = inArray(PoolName, myPlannedPoolNames)						
				if (ifGoogleSheetProperties == true || ifGoogleSheetProperties == "true"){
					var arr;
					for( var j = 0; j < my_GoogleSheetData.length; j++) {
						if( my_GoogleSheetData[j].Pool == PoolName ) {
							arr = my_GoogleSheetData[j];
							break;
						}
					}
					//////////log("processing:", arr)
					var arrayofExistingPools = []
					for (var k = 0; k < my_poolsWithTeams.length; k++){
						var my_localpoolname = my_poolsWithTeams[k].name
						arrayofExistingPools.push(my_localpoolname)
					}
					var poolNameinArr = arr.Pool
					var poolinTourniaArray = inArray(poolNameinArr, arrayofExistingPools)
					if(poolinTourniaArray == false){
						continue
					}
					var single_string = arr["Status"]
					//////////log("selected array:", single_array)
					//get_custom_status = single_array[2]
					////////////log("selected status", get_custom_status)
					//custom_status = get_custom_status
					custom_status = single_string
					custom_statusLowerCase = single_string.toLowerCase()
					statusPool = custom_status
					var statusIncludesStop = custom_statusLowerCase.includes("stopped")
					var statusIncludesPause = custom_statusLowerCase.includes("pause") 
					if(statusIncludesStop == true){
						statusPool = poolStoppedSpan + custom_status;
							var postByeData = false
					}
					if(statusIncludesPause == true){
						statusPool = poolPausedSpan + custom_status
							var postByeData = false
					}
					//get_custom_status
					if (custom_status == ""){
						if (ifPoolPlaying == true){
							statusPool = "currently playing"
							var postByeData = true
						} else if (ifMatchPlanned == true){
							statusPool = "new round planned"
							var postByeData = true
						} else if (my_poolsWithTeams[i].totTeams == 0){
							statusPool = "pool doesn't exist"
							var postByeData = false
						} else if (roundsLeft == 0 || returnsComplete == true){
							statusPool = "pool finished"
							var postByeData = false
						} else {
							statusPool =  ""
							var postByeData = false
						}
					} else if(custom_status != ""){
						var lowerCase = custom_status.toLowerCase()
						var customstatusincludesstop = lowerCase.includes("stopped")
						if(customstatusincludesstop == true){
							var postByeData = false
						} else {
							var postByeData = true
						}
					}										
				} else {
						if (ifPoolPlaying == true){
									statusPool = "currently playing"
									var postByeData = true
						} else if (ifMatchPlanned == true){
									statusPool = "new round planned"
									var postByeData = true
						} else if (my_poolsWithTeams[i].totTeams == 0){
									statusPool = "pool doesn't exist"
									var postByeData = false
						} else if (roundsLeft == 0 || returnsComplete == true){
									statusPool = "pool finished"
									var postByeData = false
						} else {
								statusPool =  ""
								var postByeData = false
						}
				}				
				//var my_statusses = []
				//my_statusses.push(postByeData)
				//my_statusses.push(ifPoolPlaying)
				//my_statusses.push(ifMatchPlanned)
				//////////log("my statusses:", my_statusses)
				singlePOData.statusPool = statusPool
				
				
				//get Players not playing current/planned round
				//////////log("Teams playing, ready, postponed:", my_teamsPlayingReadyPostponed)
				//////////log("pools with teams", my_poolsWithTeams)

				//////////log("length:", my_poolsWithTeams)
				//////////log("\nstart processing new pool...:", PoolName, "...")
				//////////log("ifPlaying status:", ifPoolPlaying)
				//////////log("ifPlanned status:", ifMatchPlanned)
				//////////log("postByeData status:", postByeData)
				//////////log("Pool Name:", PoolName)
				window["Indiv" + PoolArrayName]
				IndivPoolArrayName = []
				//////////log("amount teams", PoolName +":", amountTeams)
				var myTeams = my_poolsWithTeams[i].teams
				//////////log("Teams in", PoolName+":", myTeams)
				for(var key in myTeams){
					var my_individualTeam = myTeams[key]
					//////////log("individual Team Object:", my_individualTeam)
					var my_individualTeamName = my_individualTeam.name
					//////////log("individual Team name:", my_individualTeamName)
					var PoolNameTrim = PoolName.split(' ').join('')//PoolName.replace(" ", "")
					//var PoolNameTrim2 = PoolNameTrim.replace(" ", "")
					var PoolArrayName = PoolNameTrim + "Teams"
					IndivPoolArrayName.push(my_individualTeamName)
				}
				//////////log("Team names in", PoolName+":", IndivPoolArrayName)	
					var my_ByeData = []
					var byedataCleanArray = []
					var my_ByeDataText = ""
					////log("PR", PoolName)
					if(postByeData == true){
							////log("true", PoolName)
							//////////log("in difference")
							var difference = IndivPoolArrayName.filter(x => my_teamsPlayingReadyPostponed.indexOf(x) == -1);
							var duplicates  = IndivPoolArrayName.filter(function(val) {
							  return my_postponedTeamNames.indexOf(val) != -1;
							});
							for (di in difference){
								my_ByeData.push(difference[di])
							}
							for (du in duplicates){
								my_ByeData.push(duplicates[du])
							}
							if(PoolName == "Mixed Doubles C" || PoolName == "Men Singles A"){
								//log("indiv:", IndivPoolArrayName)
								//log("Difference found in", PoolName+":", difference)
								//log("duplicates:", duplicates)
								//log("bye data:", my_ByeData)
							}
							
							var filteredMatches = []
							var filteredTeams = []
							var filteredRounds = []
							
							for (var filt = 0; filt <my_listPlayedFinishedMatches.length; filt++){
								//log("filtering", PoolName)
								if (my_listPlayedFinishedMatches[filt].my_Poolname == PoolName){
									filteredMatches.push(my_listPlayedFinishedMatches[filt]);
								}
							}
							////////log("filtered matches", filteredMatches)
							for (var rnd = 0; rnd < filteredMatches.length; rnd++){
								////////log("roundsnr.", my_RoundsNumber)
								var my_roundNumber = "Round " + my_RoundsNumber
								if (filteredMatches[rnd].my_roundNr == my_roundNumber){
									//log("filtering round", filteredMatches[rnd])
									filteredRounds.push(filteredMatches[rnd]);
								}
							} 
							////////log("filtered matches after round", filteredRounds)
							for (var ft1 = 0; ft1 <filteredRounds.length; ft1++){
									var myT1Name = filteredRounds[ft1].my_team1NameF
									filteredTeams.push(myT1Name)
							}
							
							for (var ft2 = 0; ft2 <filteredRounds.length; ft2++){
									var myT2Name = filteredRounds[ft2].my_team2NameF
									filteredTeams.push(myT2Name)
							}
							
							//////log("filtered teams in ", PoolName, filteredTeams)
							if(my_ByeData.length > 0){
								/*for(var team = 0; team < my_ByeData.length; team++){
									var my_TeamName = my_ByeData[team]
									var currentRound = my_RoundsNumber
									var my_PoolName = PoolName	
								}*/
								////////log("byedata", PoolName, my_ByeData)
								for(var filtT = 0; filtT<filteredTeams.length; filtT++){
									var myTeamName = filteredTeams[filtT]
									////////log("team name:", myTeamName,"=?", "")
									ifinByeData = my_ByeData.indexOf(myTeamName) >= 0
									////////log(ifinByeData)
									if(ifinByeData == true){
										//////log("deleting...", myTeamName)
										var index = my_ByeData.indexOf(myTeamName);
										my_ByeData.splice(index, 1)
									}
								}
							////log("new filtered ByeData", PoolName, my_ByeData)
							} else {
								
							}
							
							if (my_ByeData.length == 0){
								////log("0", PoolName)
								my_ByeDataText = ""
							/*} else if (my_ByeData.length > 2){
								my_ByeDataText = ">" + "More than 2. Please ask match table"*/
							} else {
								var my_ByeDataCleanArray = []
								////log("there is bye data", PoolName)
								for (var byedata = 0; byedata < my_ByeData.length; byedata++){
									//if(my_ByeData[byedata].includes(" & ")){
											var byeDataClean = my_ByeData.map(e=>e.split("\"").map((a,i)=>i%2==0?a:undefined).join(""))
											my_ByeDataCleanArray.push(byeDataClean)
											////log("bca", my_ByeDataCleanArray)
											var my_ByeDataCleanArrayTrim = []
											for (var c = 0; c < my_ByeDataCleanArray.length; c++){
												////log("single", my_ByeDataCleanArray, my_ByeDataCleanArray[byedata][c])
												var Cleanstring = my_ByeDataCleanArray[byedata][c].replace(/  +/g, " ");
												my_ByeDataCleanArrayTrim.push(Cleanstring)
											}
									/*} else {
										var my_ByeDataCleanArrayTrim = []
										//log("in single bye data", PoolName)
										var byeDataClean = my_ByeData[byedata].replace(/".*"/, "")
										my_ByeDataCleanArrayTrim.push(byeDataClean)
									}*/
								}
								my_ByeDataText = my_ByeDataCleanArrayTrim.join('; ')
								////////////log("input Bye text:", my_ByeDataText)
							}
					} else {
						my_ByeDataText = ""
					}
					singlePOData.byeData = my_ByeDataText
					
					/*if(showByeColumn == true){
						//tr.append("<td class='byeColumn'" + my_ByeDataText + "</td></tr>")
					} else {
						document.getElementById("byeColumn").style.display = "none"
					}*/
					
					
					//custom sorting
					if(ifGoogleSheetProperties == true && customSorting == true){
						PlayingOrderList = []
						PlayergOrderPoolList = []
						for (var o = 0; o < my_GoogleSheetData.length; o++){
							if(my_GoogleSheetData[o].Pool == PoolName){
								singlePOData.newOrder = my_GoogleSheetData[o].Order
								break
							}							
						}
					}
					
					allPOdata.push(singlePOData)
				} /** end of for loop **/
				
				////log(allPOdata)
				//sort table to new order f applicable
				if (ifGoogleSheetProperties == true && customSorting == true){
					allPOdata.sort(dynamicSort("newOrder"))
				}
				
				//append table
				////log("allPOdata", allPOdata)
				var POremakeCount = 0
				
				var my_lengthMenu = lengthMenu(false, allPOdata) //create whole table
				function makePoolsOverviewTable(my_data, ifPaging, lengthMenu){
					var my_POTable = $('#poolsOverviewTable').DataTable({
						data: my_data,
						paging: ifPaging,
						pagingType: "numbers",
						lengthChange: ifLengthChange(),
						searching: ifOrganizerViewPreset,
						lengthMenu:	lengthMenu,
						ordering: false,
						responsive: false,
						dom: tableInfoLocations(),
						/*dom: 'Bfrtip',
						buttons: [
									'colvis'
								],*/
						//pageResize: true,
						//bAutoWidth: false,			
						columns: [
							{ data: 'poolName', sWidth: '150px', autoWidth: false, fnCreatedCell: 	function (nTd, sData, oData, iRow, iCol) {
																	$(nTd).css('border-left', '3px solid #555555')
																	$(nTd).css('border-right', '0.2vw solid #555555')
																	$(nTd).css('background-color', '#b3ccff')
																	$(nTd).css('padding-left', '5px')
																	$(nTd).css('padding-right', '5px')
																},
							},
							{ data: 'amountTeams', fnCreatedCell:  	function (nTd, sData, oData, iRow, iCol) {
																		$(nTd).css('padding-right', '5px')
																		$(nTd).css('text-align', 'right')
																		$(nTd).css('border-right', '0.2vw solid #555555')
																	},								
							visible: showTotTeamsColumn},
							{ data: 'roundsNeeded', fnCreatedCell:  function (nTd, sData, oData, iRow, iCol) {
																		$(nTd).css('padding-right', '5px')
																		$(nTd).css('text-align', 'right')
																		$(nTd).css('border-right', '0.2vw solid #555555')
																	},
																									
							visible: showRoundsNeededColumn},
							{ data: 'roundsNr', fnCreatedCell:  function (nTd, sData, oData, iRow, iCol) {
																	$(nTd).css('padding-right', '5px')
																	$(nTd).css('text-align', 'right')
																	$(nTd).css('border-right', '0.2vw solid #555555')
																},							
							visible: showRoundsCreatedColumn},
							{ data: 'roundsLeft', fnCreatedCell:  	function (nTd, sData, oData, iRow, iCol) {
																		$(nTd).css('padding-right', '5px')
																		$(nTd).css('text-align', 'right')
																		$(nTd).css('border-right', '0.2vw solid #555555')
																	},								
							visible: showRoundsLeftColumn},
							{ data: 'statusPool', sWidth: '80px', fnCreatedCell:	function (nTd, sData, oData, iRow, iCol) {
																					var sDataLower = sData.toLowerCase()
																					//$(nTd).css('border-right', '0.2vw solid #555555')
																					if (sDataLower.includes("stop") || sData == "Pool doesn't exist"){
																						$(nTd).css('background-color', '#ff4d4d')
																					} else if (sData == "new round planned" ){
																						$(nTd).css('background-color', '#ffffb3')
																					} else if (sData == "pool finished"){
																						$(nTd).css('background-color', '#ff8080')
																					} else if (sData == "currently playing"){
																						$(nTd).css('background-color', '#71da71')
																					} else if (sDataLower.includes("pause")){
																						$(nTd).css('background-color', '#ffb366')
																					}
																				},											
							visible: showStatusColumn},
							{ data: 'byeData', fnCreatedCell:  	function (nTd, sData, oData, iRow, iCol) {
																	$(nTd).css('padding-left', '5px')
																	$(nTd).css('text-align', 'left')
																	$(nTd).css('border-right', '3px solid #555555')
																},								
							visible: showByeColumn}
						],
					})
				return my_POTable}
				
				my_poolsOverviewTable = makePoolsOverviewTable(allPOdata, ifPaging, my_lengthMenu)
				//paging
				if(ifPaging == true){
					function resizePOTable(){
						var countPORows = paginationConfig('poolsOverviewTable')
						my_poolsOverviewTable.destroy()
						////log("PO table destroyed")
						var my_newLengthMenu = lengthMenu(true, allPOdata, countPORows)
						my_poolsOverviewTable = makePoolsOverviewTable(allPOdata, ifPaging, my_newLengthMenu)
						var my_PODiv = document.getElementById('OverviewRoundsBox')
						var my_PODivHeight = my_PODiv.offsetHeight	
						
						function checkOverflow(table, data, ifPaging, origRowscount, my_newLengthMenu, my_tableHeight){
							var my_PODiv = document.getElementById('OverviewRoundsBox')
							var my_PODivHeight = my_PODiv.offsetHeight
							_selectedPOTable = 1
							if ((my_PODivHeight) >= (availablePOTableHeight + my_paginationNavHeight)) {
								////log("ovflw in PO", "PODivH:", my_PODivHeight, "avPOTH:", availablePOTableHeight, POremakeCount)
								table.destroy()
								POremakeCount +=1
								//////log("UM table destroyed", UMremakeCount, "rowCounts", origRowscount)
								var newRowsCount = origRowscount - POremakeCount
								POPageCount = Math.ceil(allPOdata.length / newRowsCount)
								//////log("newRowsCount", newRowsCount)
								var my_newnewLengthMenu = lengthMenu(true, allPOdata, newRowsCount)
								//////log(my_newnewLengthMenu)
								my_poolsOverviewTable = makePoolsOverviewTable(allPOdata, ifPaging, my_newnewLengthMenu)
								_selectedPOTable = 2
								checkOverflow(my_poolsOverviewTable, allPOdata, ifPaging, origRowscount, my_newnewLengthMenu, my_PODivHeight)
							} else {
								POPageCount = 1
							}
						}
						checkOverflow(my_poolsOverviewTable, allPOdata, ifPaging, countPORows, my_newLengthMenu, my_PODivHeight)
					}
					resizePOTable()
					
					//page count config
					function ifPOActive(){
						var ifActive = poolsTable
						if(ifPaging == true && ifActive == true){
							////log("CMClickCount in active:", CMclickChange)
							POremakeCount = 0
							//POclickChange +=1
							if(POclickChange == 0){
								////log("UM active first time", CMclickChange)
								POremakeCount = 0
								setTimeout(function(){resizePOTable()}, 500)
								////log("Page count UM:", my_pageCount)
								//function pageTime(){
								function POpageConfig(table){
									var tableInfo = table.page.info()
									POPageCount = tableInfo.pages
									pageTimeconfig(false ,"PO", my_poolsOverviewTable, POPageCount, minPageTime, (poolsOverviewMatchesTabTime), allPOdata)
								}
								var POTimeout = setTimeout(function(){POpageConfig(my_poolsOverviewTable)}, 2000)
								
							} else {
								alert("error occured in PO page config")
							}
						}
					}
					var POstarttimeout = setTimeout(function(){ifPOActive()}, 1000)
				}
			}
		//$('#poolsOverviewTable').append(tr);
		}
document.getElementById("poolsOverviewLoader").style.display = "none"	
} // end pools Overview Table function