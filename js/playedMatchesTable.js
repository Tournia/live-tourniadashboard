/** Played matches **/
function getPlayedMatchesTable(){
	log("making played matches table...")
	try{
		my_playedMatchesTable.destroy()
	} catch(err){
		//log(err)
	}
		var playerNamesCurrentlyPlayingArray = []
		var playerNamesReadyToPlayArray = []
		var playerNamesCurrentlyUnavailableArray = []

		
		if(my_playedMatches.length == 0){
			var noPlayedMatches = true
		} else {
			var noPlayedMatches = false
			for (var plm = 0; plm < my_playedMatches.length; plm++){
					//////log("processing new match..",  my_playedMatches.length)
					var singlePLMData = {}
					
					var statusPlayers = [];
					var playerNamesCurrentlyPlayinginMatchArray = []
					var playersPlayingObects = []
					
					var my_PLMrowNumber = plm + 1
					var my_PoolName = my_playedMatches[plm].pool
					
					var poolPropertiesObject = findPoolProperties(my_PoolName)
					singlePLMData.poolProperties = poolPropertiesObject
					
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
					
					var PLMrow_id = "PLMrow-" + my_PLMrowNumber
					//tri = $('<tr id=' + UMrow_id + '/>');
					// um nr
					//tri.append("<td class='vsColumn'>" + my_UMrowNumber + "</td>")
					singlePLMData.matchNr = my_playedMatches[plm].localId

					if(ifMobile == false){
						//tri.append("<td class='poolColumn'>" + my_PoolName + "</td>");
						singlePLMData.PoolName = my_PoolName 
					} else {
						var abbrPoolName = getPoolNameAbbr(my_PoolName)
						//tri.append("<td class='poolColumn'>" + abbrPoolName + "</td>");
						singlePLMData.PoolName = abbrPoolName 
					}
					singlePLMData.abbrPoolName = abbrPoolName
					//tri.append("<td>" + my_playedMatches[plm].localId + "</td>");
				
					//Name Team 1 column
					var my_T1count = 0
					for (var t1 = 0; t1 < my_playedMatches[plm].team1.players.length; t1++){
							my_T1count +=1
							var playerNickNameTeam1 = my_playedMatches[plm].team1.players[t1].name
							var playerNameTeam1 = playerNickNameTeam1.replace(/".*"/, "")
							var t1PlayerCurrentlyPlaying = my_playedMatches[plm].team1.players[t1].currentlyPlaying
							//////////log(playerNameTeam1, "playing:", t1PlayerCurrentlyPlaying)
							var t1PlayerReady = my_playedMatches[plm].team1.players[t1].ready
							//////////log(playerNameTeam1, "ready:", t1PlayerReady)
							var amountT1Players = my_playedMatches[plm].team1.players.length
							var Td1Input, t1PlayerStatus
							var my_t1Input = getStatus(playerNickNameTeam1, playerNameTeam1, amountT1Players, t1PlayerCurrentlyPlaying, t1PlayerReady, Td1Input, t1PlayerStatus)
					//tri.append(my_t1Input)
						if(my_playedMatches[plm].team1.players.length == 1){
							singlePLMData.teamOne1 = my_t1Input
							singlePLMData.teamOne2 = ""
						} else if(my_playedMatches[plm].team1.players.length > 1 && my_T1count == 1){
							singlePLMData.teamOne1 = my_t1Input
						} else if (my_playedMatches[plm].team1.players.length > 1 && my_T1count == 2){
							singlePLMData.teamOne2 = my_t1Input
						}
					}
					if(my_playedMatches[plm].team1.players.length == 0){
						my_t1Input = "-"
						singlePLMData.teamOne1 = "-"
						singlePLMData.teamOne2 = ""
					}
					
					//vs column
					//tri.append("<td class='vsColumn'>" + "<b>vs.</b>" + "</td>");
					//Scores column
					var my_scores = my_playedMatches[plm].score.split(" ")
					var scoresList = []
					for (var sc = 0; sc < my_scores.length; sc++){
						scoresList.push(my_scores[sc])
					}
					var my_finalScores = scoresList.join("<br>")
					singlePLMData.scores = my_finalScores;
					
					//singlePLMData.vsColumn = "vs."
					
					//Name Team 2 Column
					var my_T2count = 0
					for (var t2 = 0; t2 < my_playedMatches[plm].team2.players.length; t2++){
							my_T2count +=1
							var playerNickNameTeam2 = my_playedMatches[plm].team2.players[t2].name
							var playerNameTeam2 = playerNickNameTeam2.replace(/".*"/, "")
							var t2PlayerCurrentlyPlaying = my_playedMatches[plm].team2.players[t2].currentlyPlaying
							//////////log(playerNameTeam2, "playing:", t2PlayerCurrentlyPlaying)
							var t2PlayerReady = my_playedMatches[plm].team2.players[t2].ready
							//////////log(playerNameTeam2, "ready:", t2PlayerReady)
							var amountT2Players = my_playedMatches[plm].team2.players.length
							var Td2Input, t2PlayerStatus
							var my_t2Input = getStatus(playerNickNameTeam2, playerNameTeam2, amountT2Players, t2PlayerCurrentlyPlaying, t2PlayerReady, Td2Input, t2PlayerStatus)
					//tri.append(my_t2Input);
					if(my_playedMatches[plm].team2.players.length == 1){
						singlePLMData.teamTwo1 = my_t2Input
						singlePLMData.teamTwo2 = ""
					} else if(my_playedMatches[plm].team2.players.length > 1 && my_T2count == 1){
						singlePLMData.teamTwo1 = my_t2Input
					} else if (my_playedMatches[plm].team2.players.length > 1 && my_T2count == 2){
						singlePLMData.teamTwo2 = my_t2Input
					}
					}
					if(my_playedMatches[plm].team2.players.length == 0){
						my_t2Input = "-"
						singlePLMData.teamTwo1 = "-"
						singlePLMData.teamTwo2 = ""
					}
					
				//Scores column
				var my_scores = my_playedMatches[plm].score.split(" ")
				var scoresList = []
				for (var sc = 0; sc < my_scores.length; sc++){
					scoresList.push(my_scores[sc])
				}
				var my_finalScores = scoresList.join("<br>")
				singlePLMData.scores = my_finalScores;		
			
				//deltaStartTime
				singlePLMData.deltaStartTime = my_playedMatches[plm].deltaStartTime
			//////log("single PLM data:", singlePLMData)
			allPLMdata.push(singlePLMData)
			}
		}
		
		//append Table
		allPLMdata.sort(dynamicSort("deltaStartTime"));
		//log("allPLMdata", allPLMdata)
			function makeNoPlayedMatchesTable(my_data){
				var my_PLMTable = $('#playedMatchesTable').DataTable({
					data: my_data,
					paging: false,
					searching: true,
					ordering: false,
					responsive: false,
					dom: tableInfoLocations(),
					//pageResize: true,
					//bAutoWidth: false,			
					columns: [
						{ data: 'matchNr', fnCreatedCell: 	function (namedExpectedTimeMins, sData, oData, iRow, iCol) {
																$(namedExpectedTimeMins).css('text-overflow', 'visible')
																$(namedExpectedTimeMins).css('white-space', 'nowrap')
															}
						},
						{ data: 'PoolName' },
						{ data: 'teamOne1' },
						{ data: 'teamOne2' },
						{ data: 'vsColumn' },
						{ data: 'teamTwo1' },
						{ data: 'teamTwo2' },
						{ data: 'scores'  },
					]
				})
			return my_PLMTable}

			function makePlayedMatchesTable(my_data){
				var my_PLMTable = $('#playedMatchesTable').DataTable({
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
						{ data: 'matchNr', sWidth: '15px', autoWidth: false, fnCreatedCell: 	function (namedExpectedTimeMins, sData, oData, iRow, iCol) {
																$(namedExpectedTimeMins).css('border-left', '3px solid #555555')
																$(namedExpectedTimeMins).css('text-align', 'center')
															}
						},
						{ data: 'PoolName', sWidth: '150px', autoWidth: true, fnCreatedCell: 	function (namedExpectedTimeMins, sData, oData, iRow, iCol) {
																$(namedExpectedTimeMins).css('border-left', '0.2vw solid #555555')
																$(namedExpectedTimeMins).css('border-right', '0.2vw solid #555555')
																$(namedExpectedTimeMins).css('background-color', '#b3ccff')
																$(namedExpectedTimeMins).css('padding-left', '5px')
																$(namedExpectedTimeMins).css('padding-right', '5px')
															}
						},
						{ data: 'teamOne1', fnCreatedCell:  function (namedExpectedTimeMins, sData, oData, iRow, iCol) {
																$(namedExpectedTimeMins).css('padding-left', '5px')
																$(namedExpectedTimeMins).css('text-align', 'left')
																//////log(sData)
															}
														
						},
						{ data: 'teamOne2', fnCreatedCell:  function (namedExpectedTimeMins, sData, oData, iRow, iCol) {
																$(namedExpectedTimeMins).css('padding-left', '5px')
																$(namedExpectedTimeMins).css('text-align', 'left')
																$(namedExpectedTimeMins).css('border-right', '0.2vw solid #555555')
															}											
						},
						{ data: 'scores', width: '60px', fnCreatedCell:	function (namedExpectedTimeMins, sData, oData, iRow, iCol) {
																	$(namedExpectedTimeMins).css('font-weight', 'bold')
															}
						},
						{ data: 'teamTwo1', fnCreatedCell:  function (namedExpectedTimeMins, sData, oData, iRow, iCol) {
																$(namedExpectedTimeMins).css('padding-left', '5px')
																$(namedExpectedTimeMins).css('text-align', 'left')
																$(namedExpectedTimeMins).css('border-left', '0.2vw solid #555555')

															}												
						},
						{ data: 'teamTwo2', fnCreatedCell:  function (namedExpectedTimeMins, sData, oData, iRow, iCol) {
																$(namedExpectedTimeMins).css('padding-left', '5px')
																$(namedExpectedTimeMins).css('text-align', 'left')
																//////log(sData)
																//////log("arrays:", playerNamesReadyToPlayArray, playerNamesCurrentlyPlayingArray, playerNamesCurrentlyUnavailableArray)
																$(namedExpectedTimeMins).css('border-right', '3px solid #555555')

															}												
						}															
					]
				})
			return my_PLMTable}				
		
		if(noPlayedMatches == true){
			//log("no PLM")
			my_playedMatchesTable = makeNoPlayedMatchesTable(allPLMdata)
		} else {
			my_playedMatchesTable = makePlayedMatchesTable(allPLMdata)
		}
document.getElementById("playedMatchesLoader").style.display = "none"
}