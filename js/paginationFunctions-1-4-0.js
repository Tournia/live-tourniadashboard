function paginationConfig(table){
	////log("height table for:", table)
	_screenHeight = screen.height
	_windowsHeight = $(window).height()
	
	
	//if (!window.screenTop && !window.screenY) {
		my_windowsHeight = _screenHeight
	/*} else {
		my_windowsHeight = _windowsHeight
	}*/
	
	my_headerHeight = $('#my_header').outerHeight()
	my_announcementsHeight = $('#announcements').outerHeight() 
	if(document.getElementById("myLeftTabsBox").style.display=== "none"){
		my_TabsBoxHeight = 0
	} else {
		my_TabsBoxHeight = $('#myLeftTabsBox').outerHeight()
	}
	
	my_filterHeight = $('#currentMatchesTable_filter').outerHeight()
	my_paginationNavHeight = $('#currentMatchesTable_paginate').outerHeight()		
	
	my_CMtHeadHeight = $('#my_CMtHead').outerHeight()
	my_UMtHeadHeight = $('#my_UMtHead').outerHeight()
	my_PMtHeadHeight = $('#my_PMtHead').outerHeight()
	my_POtHeadHeight = $('#my_POtHead').outerHeight()
	////log("UMTH:", my_UMtHeadHeight, "POTH:", my_POtHeadHeight)
	
	my_CMnotesHeight = $('#CM_notes').outerHeight()
	my_UMnotesHeight = $('#UM_notes').outerHeight()
	////log("WH:", my_windowsHeight, "HH:", my_headerHeight, "FH:", my_filterHeight, "PNH:", my_paginationNavHeight, "CmtH:",my_CMtHeadHeight, "CMno:", my_CMnotesHeight, "UmtH:",my_UMtHeadHeight, "UMno:", my_UMnotesHeight, "PmtH:",my_PMtHeadHeight, "POtH:",my_POtHeadHeight)
	
	function averagerowHeight(table, skipRows){
			var rowHeightsSum = 0
			var my_table = document.getElementById(table).rows;
				for (var my_row = skipRows; my_row < my_table.length; my_row++){
					var rowHeight = my_table[my_row].offsetHeight
					////log(table, rowHeight)
					rowHeightsSum +=rowHeight
				}
			var avgRowHeights = (rowHeightsSum / (my_table.length - skipRows))
			
		return avgRowHeights
	}
	
	function getRowsCount(table, tableHeadHeight, skipRows, noteHeight){
		////log(my_windowsHeight, my_headerHeight, my_TabsBoxHeight, my_filterHeight, tableHeadHeight, noteHeight, my_paginationNavHeight)
		var availableTableHeight = my_windowsHeight - my_headerHeight - my_TabsBoxHeight - my_filterHeight - tableHeadHeight - (1 * noteHeight) - (1 * my_paginationNavHeight)
		////log("availableTableHeight", table, ":", availableTableHeight)
		var avgRowHeight = averagerowHeight(table, skipRows)	
		var countRows = Math.floor(availableTableHeight / avgRowHeight)
		////log(table, countRows)
			return countRows
	}
	
	if (table === 'currentMatchesTable'){
		var my_rowCount = getRowsCount(table, my_CMtHeadHeight, 2, my_CMnotesHeight)
		availableCMTableHeight = my_windowsHeight - my_headerHeight - my_announcementsHeight - my_TabsBoxHeight - my_filterHeight - my_CMtHeadHeight - (1 * my_CMnotesHeight) - (1 * my_paginationNavHeight)
	} else if(table === 'upcomingMatchesTable'){
		var my_rowCount = getRowsCount(table, my_UMtHeadHeight, 3, my_UMnotesHeight)
		availableUMTableHeight = my_windowsHeight - my_headerHeight - my_announcementsHeight - my_TabsBoxHeight - my_filterHeight - my_UMtHeadHeight - (1 * my_UMnotesHeight) - (1 * my_paginationNavHeight)
	} else if(table === 'postponedMatchesTable'){
		var my_rowCount = getRowsCount(table, my_PMtHeadHeight, 3, 0)
		availablePMTableHeight = my_windowsHeight - my_headerHeight - my_announcementsHeight - my_TabsBoxHeight - my_filterHeight - my_PMtHeadHeight - 0 - (1 * my_paginationNavHeight)
	}else if(table === 'poolsOverviewTable'){
		var my_rowCount = getRowsCount(table, my_POtHeadHeight, 2, 0)
		availablePOTableHeight = my_windowsHeight - my_headerHeight - my_announcementsHeight - my_TabsBoxHeight - my_filterHeight - my_POtHeadHeight - 0 - (1 * my_paginationNavHeight)
	}
						
	
return my_rowCount
}

function pageTimeconfig(ifTabTable, tableName, table, pageCount, minPageTime, tableTime, data){
	//log("--------\nin pageTimeConfig:", tableName, "\nPageCount:", pageCount, "\nminpageTime", minPageTime, "\ntableTime:", tableTime /*"\nobject data:\n", data*/)

	var my_returns = []
	if((pageCount * minPageTime) >= tableTime){
		var my_newTableTime = pageCount * minPageTime
		var my_newPageTime = minPageTime
		my_returns.push(my_newPageTime, my_newTableTime)
	} else if((pageCount * minPageTime) < tableTime){
		var my_newPageTime = tableTime / pageCount
		var my_newTableTime = my_newPageTime * pageCount
		my_returns.push(my_newPageTime, my_newTableTime)
	} /*else if(data.length === 0){
		var my_pageTime = 5000
		my_returns.push(my_pageTime, tableTime)
	}*/
	if(tableName === "CM"){
		var ifTabTable = true
		if(noCurrentMatches === true){
			//log("no CM tc")
			my_returns = []
			my_newPageTime = 5000
			my_newTableTime = 1 * 5000
			newCMPageTime = my_newPageTime
			newCMTableTime = my_newTableTime
			my_returns.push(my_newPageTime, my_newTableTime)
			
		} else {
			newCMPageTime = my_newPageTime
			newCMTableTime = my_newTableTime	
		}
	} else if(tableName === "UM"){
		var ifTabTable = true
		if(noUpcomingMatches === true){
			//log("no UM tc")
			my_returns = []
			my_newPageTime = 5000
			my_newTableTime = 1 * 5000
			newUMPageTime = my_newPageTime
			newUMTableTime = my_newTableTime
			my_returns.push(my_newPageTime, my_newTableTime)
		} else {
			newUMPageTime = my_newPageTime
			newUMTableTime = my_newTableTime
		}
	} else if(tableName === "PM"){
		var ifTabTable = true
		if(noUnavPostponedMatches === true){
			log("no PM tc")
			my_returns = []
			my_newPageTime = 5000 
			my_newTableTime = 1 * 5000
			newPMPageTime = my_newPageTime 
			newPMTableTime = my_newTableTime
			my_returns.push(my_newPageTime, my_newTableTime)
		} else {
			newPMPageTime = my_newPageTime 
			newPMTableTime = my_newTableTime
		}
	} else if(tableName === "PO"){
		newPOPageTime = my_newPageTime 
		newPOTableTime = my_newTableTime
		var ifTabTable = false
	} else {
		log("error occured in pageTimeConfig")
	}
	//log("new times:", newCMPageTime, newCMTableTime, newUMPageTime, newUMTableTime, newPMPageTime, newPMTableTime, newPOPageTime, newPOTableTime)
	//log("my page time configurations result of", tableName+":", my_returns)
	
	
	if(tableName != "PO"){
		totCycleTime += my_newTableTime
		nextTablePage(ifTabTable, tableName, table, my_newPageTime, my_newTableTime)
	} else {
		poolsOverviewTableTime(ifTabTable, tableName, table, pageCount, my_newPageTime, my_newTableTime)
	}
return my_returns
}

function nextTablePage(ifTabTable, tableName, table, pageTime, tableTime){
 // Get the page info, so we know what the last is
	//log("inNextPageTime\nTableName:", tableName,"\nPageTime", pageTime, "\ntableTime:", tableTime)
	
	var pageInfo = table.page.info();
	 //log("tablePageInfo:", pageInfo)  
	// Set the ending interval to the last page
	var endInt = pageInfo.pages;

	// Current page
	var my_currentInt = 0;

	// Start an interval to go to the "next" page every TIME seconds
	//var my_string = "PI_"+table
	 
	tabTableInterval = setInterval(function(){
		// "Next" ...
		table.page( my_currentInt ).draw( 'page' );

		// Increment the current page int
		my_currentInt++;

		// If were on the last page, reset the currentInt to the first page #
		if ( my_currentInt ===  endInt){
			if(ifTabTable === true && countLeftTables > 1){
				clearInterval(tabTableInterval)
				
				var currentActiveTable = $('.tab-content').find('.tab-pane.active').attr('id')
				//log("--------\non last page of", currentActiveTable)
				if(currentActiveTable === tabTableContents[0]){
					setCMPageTableConfig = true
					CMdetectChangeCount = 0
				} else if(currentActiveTable === tabTableContents[1]){
					setUMPageTableConfig = true
					UMdetectChangeCount = 0
				} else if(currentActiveTable === tabTableContents[2]){
					setPMPageTableConfig = true
					PMdetectChangeCount = 0
				} else {
					alert("error occured in checking active table to set table time")
				}
				
				var myNextTableContent = checkWhichNextTableActive(currentActiveTable)[0]
				//log("my next table:", myNextTableContent)
				lastpageTimeoutMatchTable = setTimeout(function(){
						
					//log("last page timeout finshed\n\n------------------\n\n")
					if(myNextTableContent === tabTableContents[0]){
						var my_tableMetaData = my_currentMatchesTable
						var myNextTableTime = currentMatchesTabTime
						var my_pageCount = CMPageCount
						var my_data = allCMdata
					} else if(myNextTableContent === tabTableContents[1]){
						var my_tableMetaData = my_upcomingMatchesTable
						var myNextTableTime = upcomingMatchesTabTime
						var my_pageCount = UMPageCount
						var my_data = allUMdata
					} else if(myNextTableContent === tabTableContents[2]){
						var my_tableMetaData = my_postponedMatchesTable
						var myNextTableTime = postponedMatchesTabTime
						var my_pageCount = PMPageCount
						var my_data = allPMdata	
					}
					
				
				currentInt = 0;
				table.page(currentInt).draw('page')
				switchTableOnce(tableName)
				
				
				/*var myTimeout2 = setTimeout(function(){pageTimeconfig(/*ifTable,*/// myNextTable, //tableData, my_pageCount, minPageTime, myNextTableTime, my_data)}, 2000)*/
				
				
				}, pageTime)
				//var my_pageTime = my_pageTimeTableTime[0]
				//var my_newTableTime = my_pageTimeTableTime[1]			
					
				//nextTablePage(myNextTable, my_pageTime, my_newTableTime)

			} else //only one table shown
				currentInt = 0;
		}
	}, pageTime);
	
}

function poolsOverviewTableTime(ifTabTable, tableName, table, pageCount, pageTime, tableTime){
 // Get the page info, so we know what the last is
	////log("inNextPageTime\nPageTime", pageTime, "\ntableTime:", tableTime)
	
	var pageInfo = table.page.info();
	 //log("PO tablePageInfo:", pageInfo)  
	// Set the ending interval to the last page
	var endInt = pageCount
	
	// Current page
	var POcurrentInt = 0;

	// Start an interval to go to the "next" page every TIME seconds
	 
	POInterval = setInterval(function(){
		// "Next" ...
		table.page( POcurrentInt ).draw( 'page' );

		// Increment the current page int
		POcurrentInt++;

		// If were on the last page, reset the currentInt to the first page #
		if ( POcurrentInt ===  endInt){
				POcurrentInt = 0;
		} 
	}, pageTime + 2000)
}


/**Intervals**/
//functions
/*function goToNextTab(time){
	function nextTab(time){
		myTimeout = setTimeout(function(time){
			var nextTab = $('.tab-content').find('.tab-pane.active').next().attr('id');
			if(typeof nextTab === 'undefined'){
				$('#myLeftTabsBox ul li:first-child').find('a').trigger('click');
				upcomingMatchesOnClick()
			}else {
				$('a[href="#' + nextTab + '"]').trigger('click');
				currentMatchesOnClick()
			}
		}, time)
	}
	nextTab(time)
}*/
function switchTableOnce(activeTable){
	////log("in switch table once with:", activeTable)
	if(activeTable === tabTableContents[0] || activeTable === tabTableIds[0] || activeTable === tabTableAbbrs[0]){
		var my_activeTableContent = tabTableContents[0]
	} else if(activeTable === tabTableContents[1] || activeTable === tabTableIds[1] || activeTable === tabTableAbbrs[1]){
		var my_activeTableContent = tabTableContents[1]
	} else if(activeTable === tabTableContents[2] || activeTable === tabTableIds[2] || activeTable === tabTableAbbrs[2]){
		var my_activeTableContent = tabTableContents[2] 
	} 
	
	var my_nextTableContent = $('.tab-content').find('.tab-pane.active').next().attr('id')
			if(typeof my_nextTableContent === 'undefined'){
				if(currentTable === true){
					$('#myLeftTabsBox ul li:first-child').find('a').trigger('click').trigger('changeTable')
				} else if(upcomingTable === true){
					$('#myLeftTabsBox ul li:nth-child(2)').find('a').trigger('click').trigger('changeTable')	
				}
			} else {
				
				var my_nextActiveTable = checkWhichNextTableActive(my_activeTableContent)[0]
				////log("in switch table once going to next regular table with:", my_nextActiveTable)
				$('a[href="#' + my_nextActiveTable + '"]').trigger('click').trigger('changeTable')
			}
}

function switchTabOnce(){
	
	var activeTableContent = $('.tab-content').find('.tab-pane.active').attr('id')
	var my_nextTableContent = $('.tab-content').find('.tab-pane.active').next().attr('id');
	//log("in switch tab once; active:", activeTableContent, "next",my_nextTableContent)
			if(typeof my_nextTableContent === 'undefined'){
				if(currentTable === true){
					$('#myLeftTabsBox ul li:first-child').find('a').trigger('click')
				} else if(upcomingTable === true){
					$('#myLeftTabsBox ul li:nth-child(2)').find('a').trigger('click')
				}					
			} else {
				var my_nextActiveTable = checkWhichNextTableActive(activeTableContent)[0]
				$('a[href="#' + my_nextActiveTable + '"]').trigger('click');
			}
}

function simpleTabChangeOnce(){
	var my_nextTab = $('.tab-content').find('.tab-pane.active').next().attr('id');
			if(typeof my_nextTab === 'undefined'){
				$('#myLeftTabsBox ul li:first-child').find('a').trigger('click');
			}else {
				$('a[href="#' + my_nextTab + '"]').trigger('click');
			}
}

function checkWhichNextTableActive(currentActiveTableContent){
	////log("in check which next table with:", currentActiveTableContent)
	var activeTable = currentActiveTableContent
	
	if(activeTable === tabTableContents[0] || activeTable === tabTableIds[0] || activeTable === tabTableAbbrs[0]){
		if(upcomingTable === true){
			var my_nextTableContent = tabTableContents[1]
			var my_nextTableId = tabTableIds[1]
			var my_nextTableAbbr = tabTableAbbrs[1]
		} else if(postponedTable === true){
			var my_nextTableContent =tabTableContents[2]
			var my_nextTableId = tabTableIds[2]
			var my_nextTableAbbr = tabTableAbbrs[2]
		}
	} else if(activeTable === tabTableContents[1] || activeTable === tabTableIds[1] || activeTable === tabTableAbbrs[1]){
		if (postponedTable === true){
			var my_nextTableContent = tabTableContents[2]
			var my_nextTableId = tabTableIds[2]
			var my_nextTableAbbr = tabTableAbbrs[2]
		} else if (currentTable === true){
			var my_nextTableContent = tabTableContents[0]
			var my_nextTableId = tabTableIds[0]
			var my_nextTableAbbr = tabTableAbbrs[0]
		}
	} else if (activeTable === tabTableContents[2] || activeTable === tabTableIds[2] || activeTable === tabTableAbbrs[2]){
		if(currentTable === true){
			var my_nextTableContent = tabTableContents[0]
			var my_nextTableId = tabTableIds[0]
			var my_nextTableAbbr = tabTableAbbrs[0]
		} else if(upcomingTable === true){
			var my_nextTableContent = tabTableContents[1]
			var my_nextTableId = tabTableIds[1]
			var my_nextTableAbbr = tabTableAbbrs[1]
		}
	}
	var nextTableInfo = []
	nextTableInfo.push(my_nextTableContent, my_nextTableId, my_nextTableAbbr)
	//log("my next TableInfo:", nextTableInfo)
return nextTableInfo
}
/*
function upcomingMatchesOnClick(){
	goToNextTab(upcomingMatchesTabTime)	
}

function currentMatchesOnClick(){
	refreshCount += 1
	if(refreshCount === 1){
	goToNextTab(0)
	} else {
		goToNextTab(currentMatchesTabTime)
	}
}
*/
// start tab interval
/*if(ifMobile === false) {
	if(turnOnNextTabCaroussel === true){
		////////log("in first timeout")
		my_firstTimeout = setTimeout("currentMatchesOnClick()", upcomingMatchesTabTime);
	}
}*/

function lengthMenu(ifPaging, data, rowsCount){
			if(ifPaging === false){
				////console.//log("false, all")
				var my_counts = [[-1],["All"]]
				return my_counts
			} else {
				if(rowsCount >= data.length){
					var my_counts = [[-1],["All"]]
				} else {
					var my_counts = [[rowsCount,-1], [rowsCount,"All"]]
				}
				return my_counts
			}
}