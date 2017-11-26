function getPlayersRankingTable(my_listPlayersRanking){
	log("making players ranking table...")
	try{
		my_playersRankingTable.destroy()
	} catch(err){
		//log(err)
	}
	
	if(my_listPlayersRanking.length == 0){
		var PlRrow_id = 0
		var tr = $('<tr id=' + PlRrow_id + '/>');
		tr.append("<td colspan='7' class='noUpcomingMatchesRow'>" + "No Players have been imported." + "</td>")
		$('#playersRankingTable').append(tr)
		document.getElementById("#playersRankingLoader").style.display = "none"
	} else {
		for(var plR = 0; plR < my_listPlayersRanking.length; plR++){
			var plRrow_id = plR + 1
			var plRrow_id = "plRrow-" + plRrow_id
			var newPlayer = {}
			newPlayer.name = my_listPlayersRanking[plR].name
			newPlayer.text = my_listPlayersRanking[plR].name
			newPlayer.id = plR
			listPlayers.push(newPlayer)
		} /** end of for loop **/
		listPlayers.sort(dynamicSort("name"))
		
		$("#playerSelector").select2({
			closeOnSelect: true,
			placeholder: "select player",
			data: listPlayers,
		})
		
	function makePlayersRankingTable(my_data){
			var my_PlRTable = $('#playersRankingTable').DataTable({
				data: my_data,
				searching: true,
				paging: ifPaging,
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
					{ data: 'rank'/*sWidth: '150px'*/, fnCreatedCell: 	function (nTd, sData, oData, iRow, iCol) {
															$(nTd).css('border-left', '3px solid #555555')
															$(nTd).css('border-right', '0.2vw solid #555555')
															$(nTd).css('padding-left', '5px')
															$(nTd).css('padding-right', '5px')
														}
					},
					{ data: 'name', fnCreatedCell:  	function (nTd, sData, oData, iRow, iCol) {
																$(nTd).css('padding-right', '5px')
																$(nTd).css('text-align', 'left')
																$(nTd).css('border-right', '0.2vw solid #555555')
															}
					},
					{ data: 'relative', fnCreatedCell:  function (nTd, sData, oData, iRow, iCol) {
																$(nTd).css('padding-right', '5px')
																$(nTd).css('text-align', 'right')
																$(nTd).css('border-right', '0.2vw solid #555555')
															}																							
					},
					{ data: 'sumPoints', fnCreatedCell:  function (nTd, sData, oData, iRow, iCol) {
															$(nTd).css('padding-right', '5px')
															$(nTd).css('text-align', 'right')
															$(nTd).css('border-right', '0.2vw solid #555555')
														}
					},
					{ data: 'nrSets', fnCreatedCell:  	function (nTd, sData, oData, iRow, iCol) {
															$(nTd).css('padding-left', '5px')
															$(nTd).css('text-align', 'right')
															$(nTd).css('border-right', '3px solid #555555')
														}
					},
					{ data: 'gender', fnCreatedCell:  	function (nTd, sData, oData, iRow, iCol) {
															$(nTd).css('padding-left', '5px')
															$(nTd).css('text-align', 'left')
															$(nTd).css('border-right', '3px solid #555555')
														}
					}
				]
		})
	return my_PlRTable}
	
	my_playersRankingTable = makePlayersRankingTable(my_listPlayersRanking) 
		
	document.getElementById("playersRankingLoader").style.display = "none"
	}
}