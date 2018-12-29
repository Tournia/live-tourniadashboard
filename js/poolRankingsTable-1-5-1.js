/**Pool Rankings table**/
function getPoolRankingsTable(pool, poolId){
	log("making pool rankings table...")
	allPRdata = []
	//////log(my_upcomingMatchesTable)
	//////log("here", selectedPRTable)
	document.getElementById("poolRankingsLoader").style.display = ""
	try{
		my_poolRankingsTable.destroy()
	} catch (err){
		////log(err)		
	}
	var poolSelector = $('#poolSelector :selected').text()
	if(noPools === true){
		var PRrow_id = 0
		tr = $('<tr id=' + PRrow_id + '/>');
		tr.append("<td colspan='18' class='noUpcomingMatchesRow'>" + "No Pools have been set up." + "</td>")
		$('#poolRankingsTable').append(tr)
		document.getElementById("poolRankingsLoader").style.display = "none"
	} else if(poolSelector ==='Select a pool' || poolSelector ==='' || poolSelector === undefined){
		tr = $('<tr id=' + PRrow_id + '/>');
		tr.append("<td colspan='18' class='noUpcomingMatchesRow'>" + "No pool selected." + "</td>")
		$('#poolRankingsTable').append(tr)
		document.getElementById("poolRankingsLoader").style.display = "none"
	} else { // pool selected
		var poolRankingsUrl = tourniaApiUrl + tournament_ID + "/rankings/pool/" + poolId
		getPoolRankingData(pool, poolId, poolRankingsUrl)
	}			
	
	function getPoolRankingData(pool, poolId, poolRankingsUrl){
		$.getJSON(poolRankingsUrl, function (data) {
			var my_poolRankingsData = data 
			for (p = 0; p < my_poolRankingsData.length; p++){
				my_poolRankingsData[p].pool = pool
			}			
			if(poolRankings.length === 0){
				poolRankings.push(my_poolRankingsData)
				//poolRankings[0].push(pool)
				poolNamesRanked.push(pool)
			} else {
				for(prk = 0; prk < poolRankings.length; prk++){
					if(inArray(pool, poolNamesRanked) === true){
						break
					} else {
						poolRankings.push(my_poolRankingsData)
						//poolRankings.push(pool)
						//poolRankings[0].push(pool)
						poolNamesRanked.push(pool)
						break
					}
				}
			}
			poolRankingsTable(pool, my_poolRankingsData)		
		})
	}
	
	function poolRankingsTable(pool, poolRankingData){
		//////////log("pools with teams", my_poolsWithTeams)
		document.getElementById("poolRankingsLoader").style.display = ""
		allPRdata = poolRankingData
		for(var pRk = 0; pRk < allPRdata.length; pRk++){
			var players = []
			var cleanPlayers = []
			var all_players = allPRdata[pRk].players
			for (key in all_players){
				if (all_players.hasOwnProperty(key)){
					var cleanPlayerName = all_players[key].replace(/".*"/, "").replace("  ", " ")
					players.push(all_players[key]);
					cleanPlayers.push(cleanPlayerName);
				}
			}
			
			var pRkrow_id = pRk + 1
			var pRkrow_id = "pRkrow-" + pRkrow_id 
	
			var my_players = cleanPlayers.join(" & ")
			allPRdata[pRk].my_players = my_players
			/*var singlePRData = {}
			singlePRData.my_matchesWon = poolRankingData[PRk].matchesWon
			singlePRData.my_matchesDraPRk = poolRankingData[PRk].matchesDraPRk
			singlePRData.my_matchesLost = poolRankingData[PRk].matchesLost
			singlePRData.my_setsWon = poolRankingData[PRk].setsWon
			singlePRData.my_setsLost = poolRankingData[PRk].setsLost
			singlePRData.my_pointsWon = poolRankingData[PRk].pointsWon
			singlePRData.my_pointsLost = poolRankingData[PRk].poinsLost
			singlePRData.my_matchesPlayed = poolRankingData[PRk].matchesPlayed
			singlePRData.my_matchesRelative = poolRankingData[PRk].matchesRelative
			singlePRData.my_matchesPlayed = poolRankingData[PRk].matchesRelative
			singlePRData.my_pointsRelative = poolRankingData[PRk].pointsRelative
			singlePRData.my_rank = poolRankingData[PRk].rank
			singlePRData.teamId = poolRankingData[PRk].teamId
			singlePRData.pool = pool*/
				
			//allPRdata.push(singlePRData)
		} /** end of for loop **/ 
		//log(allPRdata)	
		//append table
		////log("allPRdata", allPRdata)

		function makePoolRankingTable(my_data){
			var tableInfoLocations = setTableInfoLocations(ifOrganizerViewPreset);
			var my_PRTable = $('#poolRankingsTable').DataTable({
				data: my_data,
				searching: true,
				paging: ifPaging,
				ordering: false,
				responsive: false,
				dom: tableInfoLocations,
				/*dom: 'Bfrtip',
				buttons: [
							'colvis'
						],*/
				//pageResize: true,
				//bAutoWidth: false,			
				columns: [
					{ data: 'rank', fnCreatedCell: 	function (nTd, sData, oData, iRow, iCol) {
															$(nTd).css('border-left', '3px solid #555555')
															$(nTd).css('border-right', '0.2vw solid #555555')
															$(nTd).css('padding-left', '5px')
															$(nTd).css('padding-right', '5px')
														}
					},{ data: 'my_players', fnCreatedCell:  	function (nTd, sData, oData, iRow, iCol) {
																$(nTd).css('padding-right', '5px')
																$(nTd).css('text-align', 'left')
																$(nTd).css('border-right', '3px solid #555555')
															}
					},
					{ data: 'matchesPlayed', fnCreatedCell:  function (nTd, sData, oData, iRow, iCol) {
																$(nTd).css('padding-right', '5px')
																$(nTd).css('text-align', 'right')
																$(nTd).css('border-right', '0.2vw solid #555555')
															}																							
					},
					{ data: 'matchesWon', fnCreatedCell:  function (nTd, sData, oData, iRow, iCol) {
															$(nTd).css('padding-right', '5px')
															$(nTd).css('text-align', 'right')
															$(nTd).css('border-right', '0.2vw solid #555555')
														}
					},
					{ data: 'matchesDraw', fnCreatedCell:  	function (nTd, sData, oData, iRow, iCol) {
															$(nTd).css('padding-left', '5px')
															$(nTd).css('text-align', 'right')
															$(nTd).css('border-right', '0.2vw solid #555555')
														}
					},
					{ data: 'matchesLost', fnCreatedCell:  	function (nTd, sData, oData, iRow, iCol) {
															$(nTd).css('padding-left', '5px')
															$(nTd).css('text-align', 'right')
															$(nTd).css('border-right', '0.2vw solid #555555')
														}
					},
					{ data: 'matchesRelative', fnCreatedCell:  	function (nTd, sData, oData, iRow, iCol) {
															$(nTd).css('padding-left', '5px')
															$(nTd).css('text-align', 'right')
															$(nTd).css('border-right', '0.2vw solid #555555')
															$(nTd).css('border-right', '3px solid #555555')
														}							
					},
					{ data: 'setsWon', fnCreatedCell:  	function (nTd, sData, oData, iRow, iCol) {
																$(nTd).css('padding-right', '5px')
																$(nTd).css('text-align', 'right')
																$(nTd).css('border-right', '0.2vw solid #555555')
														}
					},
					{ data: 'setsLost', fnCreatedCell:  	function (nTd, sData, oData, iRow, iCol) {
																$(nTd).css('padding-right', '5px')
																$(nTd).css('text-align', 'right')
																$(nTd).css('border-right', '0.2vw solid #555555')
															}
					},
					{ data: 'setsRelative', fnCreatedCell:  	function (nTd, sData, oData, iRow, iCol) {
																	$(nTd).css('padding-right', '5px')
																	$(nTd).css('text-align', 'right')
																	$(nTd).css('border-right', '0.2vw solid #555555')
																	$(nTd).css('border-right', '3px solid #555555')
																}	
					},
					{ data: 'pointsWon', fnCreatedCell:  	function (nTd, sData, oData, iRow, iCol) {
																$(nTd).css('padding-right', '5px')
																$(nTd).css('text-align', 'right')
																$(nTd).css('border-right', '0.2vw solid #555555')
															}
					},
					{ data: 'pointsLost', fnCreatedCell:  	function (nTd, sData, oData, iRow, iCol) {
																$(nTd).css('padding-right', '5px')
																$(nTd).css('text-align', 'right')
																$(nTd).css('border-right', '0.2vw solid #555555')
															}
					},
					{ data: 'pointsRelative', fnCreatedCell:  	function (nTd, sData, oData, iRow, iCol) {
																$(nTd).css('padding-right', '5px')
																$(nTd).css('text-align', 'right')
																$(nTd).css('border-right', '3px solid #555555')
															}
					}
				]
			})
		return my_PRTable}
		my_poolRankingsTable = makePoolRankingTable(allPRdata)
		document.getElementById("poolRankingsLoader").style.display = "none"
	}
}