function getGroupsRankingTable(my_listGroupsRanking){
	log("making groups ranking table...")
	try{
		my_groupsRankingTable.destroy()
	} catch(err){
		//log(err)
	}
	
	if(my_listGroupsRanking.length <= 1){
		var GrRrow_id = 0
		var tr = $('<tr id=' + GrRrow_id + '/>');
		tr.append("<td colspan='7' class='noUpcomingMatchesRow'>" + "No groups have been set up." + "</td>")
		$('#groupsRankingTable').append(tr)
		document.getElementById("groupsRankingLoader").style.display = "none"
	} else {
		for(var grR = 0; grR < my_listGroupsRanking.length; grR++){
			var grRrow_id = grR + 1
			var grRrow_id = "grRrow-" + grRrow_id
		} /** end of for loop **/
				
	function makeGroupsRankingTable(my_data){
			var my_gRRTable = $('#groupsRankingTable').DataTable({
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
					{ data: 'rank', fnCreatedCell: 	function (namedExpectedTimeMins, sData, oData, iRow, iCol) {
															$(namedExpectedTimeMins).css('border-left', '3px solid #555555')
															$(namedExpectedTimeMins).css('border-right', '0.2vw solid #555555')
															$(namedExpectedTimeMins).css('padding-left', '5px')
															$(namedExpectedTimeMins).css('padding-right', '5px')
														}
					},
					{ data: 'name', fnCreatedCell:  	function (namedExpectedTimeMins, sData, oData, iRow, iCol) {
																$(namedExpectedTimeMins).css('padding-right', '5px')
																$(namedExpectedTimeMins).css('text-align', 'left')
																$(namedExpectedTimeMins).css('border-right', '0.2vw solid #555555')
															}
					},
					{ data: 'sumPoints', fnCreatedCell:  function (namedExpectedTimeMins, sData, oData, iRow, iCol) {
																$(namedExpectedTimeMins).css('padding-right', '5px')
																$(namedExpectedTimeMins).css('text-align', 'right')
																$(namedExpectedTimeMins).css('border-right', '0.2vw solid #555555')
															}																							
					},
					{ data: 'nrSets', fnCreatedCell:  function (namedExpectedTimeMins, sData, oData, iRow, iCol) {
															$(namedExpectedTimeMins).css('padding-right', '5px')
															$(namedExpectedTimeMins).css('text-align', 'right')
															$(namedExpectedTimeMins).css('border-right', '0.2vw solid #555555')
														}
					},
					{ data: 'relative', fnCreatedCell:  	function (namedExpectedTimeMins, sData, oData, iRow, iCol) {
															$(namedExpectedTimeMins).css('padding-left', '5px')
															$(namedExpectedTimeMins).css('text-align', 'right')
															$(namedExpectedTimeMins).css('border-right', '0.2vw solid #555555')
														}
					},
					{ data: 'nrPlayers', fnCreatedCell:  	function (namedExpectedTimeMins, sData, oData, iRow, iCol) {
															$(namedExpectedTimeMins).css('padding-left', '5px')
															$(namedExpectedTimeMins).css('text-align', 'right')
															$(namedExpectedTimeMins).css('border-right', '3px solid #555555')
														}
					}
				]
		})
	return my_gRRTable}
	
	my_groupsRankingTable = makeGroupsRankingTable(my_listGroupsRanking) 
		
	document.getElementById("groupsRankingLoader").style.display = "none"
	}
}