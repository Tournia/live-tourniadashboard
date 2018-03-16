/** Players Table**/
function getPlayersTable(player){
	log("making players table...")
	allPLAdata = []
	try{
		my_playersTable.destroy()
	} catch(err){
		//log(err)
	}
	var playerNamesCurrentlyPlayingArray = []
	var playerNamesReadyToPlayArray = []
	var playerNamesCurrentlyUnavailableArray = []

	
	if(player === "none"){
		var noPlayersTable = true
		var PLArow_id = 0
		var tr = $('<tr id=' + PLArow_id + '/>');
		tr.append("<td colspan='8' class='noUpcomingMatchesRow'>No Player selected.</td>")
		$('#playersTable').append(tr)
	} else {
		//log(player)
		var noPlayersTable = false
		
		//filter matches
		my_playerMatches = []
		for (var play in my_matches){
			var my_team1 = my_matches[play].team1
			var my_team2 = my_matches[play].team2
			if(my_team1.includes(player) == true){
				my_playerMatches.push(my_matches[play])
			} else if(my_team2.includes(player) == true){
				my_playerMatches.push(my_matches[play])
			} else {}
			continue
		}
		//log(my_playerMatches)
		for (var pla in my_playerMatches){
			//log("processing new match..",  my_playerMatches[pla])
			var singlePLAData = {}
			
			var statusPlayers = [];
			var playerNamesCurrentlyPlayinginMatchArray = []
			var playersPlayingObects = []
			
			var my_PLArowNumber = pla + 1
			var my_PoolName = my_playerMatches[pla].pool
			
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
			singlePLAData.matchNr = my_playerMatches[pla].localId

			if(ifMobile == false){
				//tri.append("<td class='poolColumn'>" + my_PoolName + "</td>");
				singlePLAData.PoolName = my_PoolName 
			} else {
				var abbrPoolName = getPoolNameAbbr(my_PoolName)
				//tri.append("<td class='poolColumn'>" + abbrPoolName + "</td>");
				singlePLAData.PoolName = abbrPoolName 
			}
			singlePLAData.abbrPoolName = abbrPoolName
			//tri.append("<td>" + my_playerMatches[pla].localId + "</td>");
		
			//Name Team 1 column
			var team1Players = my_playerMatches[pla].team1.split(" & ")
			var team1_nameClean = team1Players.map(e=>e.split("\"").map((a,i)=>i%2==0?a:undefined).join(""))
			var Team1NamesCleanTrim = []
			for (var t1 = 0; t1 < team1_nameClean.length; t1++) {
				var string = team1_nameClean[t1].replace(/  +/g, ' ');
				Team1NamesCleanTrim.push(string)
			}
			var team1_nameAll = Team1NamesCleanTrim.join(" & ")
			var team1 = team1_nameAll.replace(" & ", "<br>")
			
			singlePLAData.team1 = team1
			//vs column
			//tri.append("<td class='vsColumn'>" + "<b>vs.</b>" + "</td>");
			
			singlePLAData.vsColumn = "vs."
			
			//Name Team 1 column
			var team2Players = my_playerMatches[pla].team2.split(" & ")
			var team2_nameClean = team2Players.map(e=>e.split("\"").map((a,i)=>i%2==0?a:undefined).join(""))
			var Team2NamesCleanTrim = []
			for (var t2 = 0; t2 < team2_nameClean.length; t2++) {
				var string = team2_nameClean[t2].replace(/  +/g, ' ');
				Team2NamesCleanTrim.push(string)
			}
			var team2_nameAll = Team2NamesCleanTrim.join(" & ")
			var team2 = team2_nameAll.replace(" & ", "<br>")
			
			singlePLAData.team2 = team2
			
			//round
			singlePLAData.round = my_playerMatches[pla].round
			
			/*Scores / comment column */
			
			singlePLAData.status = my_playerMatches[pla].status
			if(my_playerMatches[pla].status === "Played"){
				/*var my_scores = my_playerMatches[pla].score.split(" ")
				var scoresList = []
				for (var sc = 0; sc < my_scores.length; sc++){
					scoresList.push(my_scores[sc])
				}
				var my_finalScoresComment = scoresList.join("<br>")*/
				var my_finalScoresComment = my_playerMatches[pla].score
			} else if (my_playerMatches[pla].status === "Finished"){
				var my_finalScoresComment = "no scores yet"
			} else if (my_playerMatches[pla].status === "Postponed"){
				var my_finalScoresComment = ""
			}
		
			
			singlePLAData.scoresComment = my_finalScoresComment;		

			//status
			singlePLAData.status = my_playerMatches[pla].status
			
		//log("single PLA data:", singlePLAData)
		allPLAdata.push(singlePLAData)
		} /** end of for loop **/
		
	//append Table
	//allPLAdata.sort(dynamicSort("matchNr"));
	allPLAdata.reverse()
	//log("allPLAdata:", allPLAdata)

	function makePlayersTable(my_data){
		var my_PLATable = $('#playersTable').DataTable({
			data: my_data,
			paging: false,
			searching: false,
			ordering: false,
			responsive: false,
			dom: tableInfoLocations(),
			//pageResize: true,
			//bAutoWidth: false,			
			columns: [
				{ data: 'matchNr', autoWidth: false, fnCreatedCell: 	function (nTd, sData, oData, iRow, iCol) {
														$(nTd).css('border-left', '3px solid #555555')
														$(nTd).css('text-align', 'center')
													}
				},
				{ data: 'team1', fnCreatedCell:  function (nTd, sData, oData, iRow, iCol) {
														$(nTd).css('padding-left', '5px')
														$(nTd).css('text-align', 'left')
														//////log(sData)
													}
												
				},
				{ data: 'vsColumn', fnCreatedCell:	function (nTd, sData, oData, iRow, iCol) {
															$(nTd).css('font-weight', 'bold')
													}
				},
				{ data: 'team2', fnCreatedCell:  function (nTd, sData, oData, iRow, iCol) {
														$(nTd).css('padding-left', '5px')
														$(nTd).css('text-align', 'left')
														$(nTd).css('border-right', '0.2vw solid #555555')

													}												
				},
				{ data: 'PoolName', autoWidth: true, fnCreatedCell: 	function (nTd, sData, oData, iRow, iCol) {
														$(nTd).css('border-right', '0.2vw solid #555555')
														$(nTd).css('background-color', '#b3ccff')
														$(nTd).css('padding-left', '5px')
														$(nTd).css('padding-right', '5px')
													}
				},
				{ data: 'round', fnCreatedCell: 	function (nTd, sData, oData, iRow, iCol){
																	$(nTd).css('padding-left', '5px')
																	$(nTd).css('text-align', 'left')
																	$(nTd).css('width', '60px')
																	$(nTd).css('border-right', '0.2vw solid #555555')
																}
				},						
				{ data: 'scoresComment', fnCreatedCell: 	function (nTd, sData, oData, iRow, iCol){
																	$(nTd).css('padding-left', '5px')
																	$(nTd).css('text-align', 'left')
																	$(nTd).css('width', '60px')
																	$(nTd).css('border-right', '0.2vw solid #555555')
																}
				},
				{ data: 'status', fnCreatedCell:	function (nTd, sData, oData, iRow, iCol) {
															$(nTd).css('border-right', '3px solid #555555')
															
														}											
				}						
			]
		})
	return my_PLATable}
	my_playersTable = makePlayersTable(allPLAdata)
	}
	document.getElementById("playersLoader").style.display = "none"
}