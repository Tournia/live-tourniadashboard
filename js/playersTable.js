/** Players **/
function getPlayersTable(){
	log("making players table...")
	try{
		my_playersTable.destroy()
	} catch(err){
		//log(err)
	}
		var playerNamesCurrentlyPlayingArray = []
		var playerNamesReadyToPlayArray = []
		var playerNamesCurrentlyUnavailableArray = []

		
		if(my_matches.length == 0){
			var noPlayersTable = true
		} else {
			var noPlayersTable = false
			for (var plm = 0; plm < my_matches.length; plm++){
					//////log("processing new match..",  my_matches.length)
					var singlePLAData = {}
					
					var statusPlayers = [];
					var playerNamesCurrentlyPlayinginMatchArray = []
					var playersPlayingObects = []
					
					var my_PLArowNumber = plm + 1
					var my_PoolName = my_matches[plm].pool
					
					var poolPropertiesObject = findPoolProperties(my_PoolName)
					singlePLAData.poolProperties = poolPropertiesObject
					
					if(poolPropertiesObject.altNames[0] == "Average Pool"){
						var abbrPoolName = my_PoolName
					} else {
						var abbrPoolName = poolPropertiesObject.abbreviations[0]
					}
					
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
					
					var PLArow_id = "PLArow-" + my_PLArowNumber
					//tri = $('<tr id=' + UMrow_id + '/>');
					// um nr
					//tri.append("<td class='vsColumn'>" + my_UMrowNumber + "</td>")
					singlePLAData.matchNr = my_matches[plm].localId

					if(ifMobile == false){
						//tri.append("<td class='poolColumn'>" + my_PoolName + "</td>");
						singlePLAData.PoolName = my_PoolName 
					} else {
						var abbrPoolName = getPoolNameAbbr(my_PoolName)
						//tri.append("<td class='poolColumn'>" + abbrPoolName + "</td>");
						singlePLAData.PoolName = abbrPoolName 
					}
					singlePLAData.abbrPoolName = abbrPoolName
					//tri.append("<td>" + my_matches[plm].localId + "</td>");
				
					//Name Team 1 column
					var my_T1count = 0
					for (var t1 = 0; t1 < my_matches[plm].team1.players.length; t1++){
							my_T1count +=1
							var playerNickNameTeam1 = my_matches[plm].team1.players[t1].name
							var playerNameTeam1 = playerNickNameTeam1.replace(/".*"/, "")
							var t1PlayerCurrentlyPlaying = my_matches[plm].team1.players[t1].currentlyPlaying
							//////////log(playerNameTeam1, "playing:", t1PlayerCurrentlyPlaying)
							var t1PlayerReady = my_matches[plm].team1.players[t1].ready
							//////////log(playerNameTeam1, "ready:", t1PlayerReady)
							var amountT1Players = my_matches[plm].team1.players.length
							var Td1Input, t1PlayerStatus
							var my_t1Input = getStatus(playerNickNameTeam1, playerNameTeam1, amountT1Players, t1PlayerCurrentlyPlaying, t1PlayerReady, Td1Input, t1PlayerStatus)
					//tri.append(my_t1Input)
						if(my_matches[plm].team1.players.length == 1){
							singlePLAData.teamOne1 = my_t1Input
							singlePLAData.teamOne2 = ""
						} else if(my_matches[plm].team1.players.length > 1 && my_T1count == 1){
							singlePLAData.teamOne1 = my_t1Input
						} else if (my_matches[plm].team1.players.length > 1 && my_T1count == 2){
							singlePLAData.teamOne2 = my_t1Input
						}
					}
					if(my_matches[plm].team1.players.length == 0){
						my_t1Input = "-"
						singlePLAData.teamOne1 = "-"
						singlePLAData.teamOne2 = ""
					}
					
					//vs column
					//tri.append("<td class='vsColumn'>" + "<b>vs.</b>" + "</td>");
					
					singlePLAData.vsColumn = "vs."
					
					//Name Team 2 Column
					var my_T2count = 0
					for (var t2 = 0; t2 < my_matches[plm].team2.players.length; t2++){
							my_T2count +=1
							var playerNickNameTeam2 = my_matches[plm].team2.players[t2].name
							var playerNameTeam2 = playerNickNameTeam2.replace(/".*"/, "")
							var t2PlayerCurrentlyPlaying = my_matches[plm].team2.players[t2].currentlyPlaying
							//////////log(playerNameTeam2, "playing:", t2PlayerCurrentlyPlaying)
							var t2PlayerReady = my_matches[plm].team2.players[t2].ready
							//////////log(playerNameTeam2, "ready:", t2PlayerReady)
							var amountT2Players = my_matches[plm].team2.players.length
							var Td2Input, t2PlayerStatus
							var my_t2Input = getStatus(playerNickNameTeam2, playerNameTeam2, amountT2Players, t2PlayerCurrentlyPlaying, t2PlayerReady, Td2Input, t2PlayerStatus)
					//tri.append(my_t2Input);
					if(my_matches[plm].team2.players.length == 1){
						singlePLAData.teamTwo1 = my_t2Input
						singlePLAData.teamTwo2 = ""
					} else if(my_matches[plm].team2.players.length > 1 && my_T2count == 1){
						singlePLAData.teamTwo1 = my_t2Input
					} else if (my_matches[plm].team2.players.length > 1 && my_T2count == 2){
						singlePLAData.teamTwo2 = my_t2Input
					}
					}
					if(my_matches[plm].team2.players.length == 0){
						my_t2Input = "-"
						singlePLAData.teamTwo1 = "-"
						singlePLAData.teamTwo2 = ""
					}
					
				//Scores / comment column
				
				//scores
				
				if(status == "Played"){
					var my_scores = my_matches[plm].score.split(" ")
					var scoresList = []
					for (var sc = 0; sc < my_scores.length; sc++){
						scoresList.push(my_scores[sc])
					}
					var my_finalScoresComment = scoresList.join("<br>")
				} else if (finished)
					var my_finalScoresComment = "scored not filed in yet"
				} else {
					var my_finalScoresComment = "wwhat"
				}
			
				
				singlePLAData.scoresComment = my_finalScoresComment;		

			//////log("single PLA data:", singlePLAData)
			allPLAdata.push(singlePLAData)
			}
		}
		
		//append Table
		allPLAdata.sort(dynamicSort("matchNr"));
		//log("allPLAdata", allPLAdata)
			function makeNoPlayersTable(my_data){
				var my_PLATable = $('#playersTable').DataTable({
					data: my_data,
					paging: false,
					searching: true,
					ordering: false,
					responsive: false,
					dom: tableInfoLocations(),
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
						{ data:  'status'  },
						{ data: 'scoresComment'  }
					]
				})
			return my_PLATable}

			function makePlayersTable(my_data){
				var my_PLATable = $('#playedMatchesTable').DataTable({
					data: my_data,
					paging: false,
					pagingType: "numbers",
					searching: true,
					ordering: false,
					responsive: false,
					dom: tableInfoLocations(),
					//pageResize: true,
					//bAutoWidth: false,			
					columns: [
						{ data: 'matchNr', sWidth: '15px', autoWidth: false, fnCreatedCell: 	function (nTd, sData, oData, iRow, iCol) {
																$(nTd).css('border-left', '3px solid #555555')
																$(nTd).css('text-align', 'center')
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
															}
														
						},
						{ data: 'teamOne2', fnCreatedCell:  function (nTd, sData, oData, iRow, iCol) {
																$(nTd).css('padding-left', '5px')
																$(nTd).css('text-align', 'left')
																//////log(sData)
															}											
						},
						{ data: 'vsColumn', sWidth: '90px', fnCreatedCell:	function (nTd, sData, oData, iRow, iCol) {
																	$(nTd).css('font-weight', 'bold')
															}
						},
						{ data: 'teamTwo1', fnCreatedCell:  function (nTd, sData, oData, iRow, iCol) {
																$(nTd).css('padding-left', '5px')
																$(nTd).css('text-align', 'left')
																//////log(sData)
															}												
						},
						{ data: 'teamTwo2', fnCreatedCell:  function (nTd, sData, oData, iRow, iCol) {
																$(nTd).css('padding-left', '5px')
																$(nTd).css('text-align', 'left')
																//////log(sData)
																//////log("arrays:", playerNamesReadyToPlayArray, playerNamesCurrentlyPlayingArray, playerNamesCurrentlyUnavailableArray)
															}												
						},
						{ data: 'status', sWidth: '80px', fnCreatedCell:	function (nTd, sData, oData, iRow, iCol) {
																	$(nTd).css('border-left', '0.2vw solid #555555')
																	//////log(sData)
																	if (sData == postponedMatch){
																		$(nTd).css('background-color', '#ff8080')
																		$(nTd).css('text-decoration', 'underline')
																	} else if (sData == playersCurrentlyPlaying ){
																		$(nTd).css('background-color', '#ffffb3')
																	} else if (sData == playersUnavailable ){
																		$(nTd).css('background-color', '#ff8080')
																	} else if (sData == readyToPlay){
																		$(nTd).css('background-color', '#71da71')
																	}
																}											
							},
							{ data: 'scoresComment', fnCreatedCell: 	function (nTd, sData, oData, iRow, iCol){
																				$(nTd).css('padding-left', '5px')
																				$(nTd).css('text-align', 'left')
																				$(nTd).css('width', '60px')
																				$(nTd).css('border-right', '3px solid #555555')
																			}
							}														
					]
				})
			return my_PLATable}				
		
		if(noPlayersTable == true){
			//log("no PLA")
			my_playersTable = makeNoPlayersTable(allPLAdata)
		} else {
			my_playersTable = makePlayersTable(allPLAdata)
		}
	document.getElementById("playersLoader").style.display = "none"
}