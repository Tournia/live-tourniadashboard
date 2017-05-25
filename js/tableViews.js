function tableConfigurations(){
	log("setting table configurations...")
	var ifLeftTables = []
	ifLeftTables.push(currentTable, upcomingTable, postponedTable)
	//log(ifLeftTables)
	countLeftTables = countItemsTrue(ifLeftTables)
	//log(countLeftTables)
	if(countLeftTables == 3){
		var showUpcomingAndCurrentANDPostTables = true
		var shownoLeftTables = false
	} else if(countLeftTables == 0){
		var shownoLeftTables = true
		var showUpcomingAndCurrentANDPostTables = false
	} else {
		var shownoLeftTables = false
		var showUpcomingAndCurrentANDPostTables = false
	}
	
	if(countLeftTables == 1){
		log("only 1 left table")
		document.getElementById("myLeftTabsBox").style.display="none"
		document.getElementById("myRightTabsBox").style.display="none"
		document.getElementById("rightBox").style.marginTop="15px"
		document.getElementById("leftBox").style.marginTop="15px"	
	} else {
		document.getElementById("myLeftTabsBox").style.display=""
		document.getElementById("myRightTabsBox").style.display=""
		document.getElementById("rightBox").style.marginTop="0px"
		document.getElementById("leftBox").style.marginTop="0px"
	}

	if(currentTable == false){
		document.getElementById("currentMatches-button").style.display="none"
		document.getElementById("currentmatches-tab-content").style.display="none"
		if(upcomingTable == true){
			startTab = tabTableContents[1]
			$("a[href='#upcomingmatches-tab-content']").trigger('click');
			//simpleTabChangeOnce()
			//UMclickChange = 2
			$("#currentMatches-button").removeClass("active")
			$("#upcomingMatches-button").addClass("active")
			$("#postponedMatches-button").removeClass("active")

		} else if (postponedTable == true){ // only postponed is turned on
			startTab = tabTableContents[2]
			//switchTabOnce()
			$("a[href='#postponedmatches-tab-content']").trigger('click');
			
			//simpleTabChangeOnce()
			//simpleTabChangeOnce()
			//PMclickChange = 2
			$("#currentMatches-button").removeClass("active")
			$("#upcomingMatches-button").removeClass("active")
			$("#postponedMatches-button").addClass("active")
		}
	} else {
		startTab = tabTableContents[0]
		$("a[href='#currentmatches-tab-content']").trigger('click');
		document.getElementById("currentMatches-button").style.display=""
		document.getElementById("currentmatches-tab-content").style.display=""
		//CMclickChange = 2
	}

	if(upcomingTable == false){
		//log("upcoming off")
		document.getElementById("upcomingMatches-button").style.display="none"
		document.getElementById("upcomingmatches-tab-content").style.display="none"
		
		/*if(postponedTable == true){
			//log("upcoming off -- postponed on")
			//switchTableOnce()
			$("#currentMatches-button").removeClass("active")
			$("#upcomingMatches-button").removeClass("active")
			$("#postponedMatches-button").addClass("active")

		} else {
			//log("upcoming off -- postponed off")
			if(currentTable == false){
				//switchTableOnce()
				//switchTableOnce()
			} else {
				//$("#currentMatches-button").addClass("active")
				//$("#upcomingMatches-button").removeClass("active")
				//$("#postponedMatches-button").removeClass("active")
			}
		}*/
	} else 	{
		document.getElementById("upcomingMatches-button").style.display=""
		document.getElementById("upcomingmatches-tab-content").style.display=""
	}

	if(postponedTable == false){
		document.getElementById("postponedMatches-button").style.display="none"
		document.getElementById("postponedmatches-tab-content").style.display="none"
		if(currentTable == true){
			//switchTableOnce()
			$("#currentMatches-button").addClass("active")
			$("#upcomingMatches-button").removeClass("active")
			$("#postponedMatches-button").removeClass("active")

		} /*else {
			//switchTableOnce()
			//switchTableOnce()
			$("#currentMatches-button").removeClass("active")
			$("#upcomingMatches-button").addClass("active")
			$("#postponedMatches-button").removeClass("active")
		}*/
	} else {
		document.getElementById("postponedMatches-button").style.display=""
		document.getElementById("postponedmatches-tab-content").style.display=""
	}

	if(poolsTable == false){
		document.getElementById("rightBox").style.display="none"
		document.getElementById("leftBox").style.width = "70%"
		document.getElementById("leftBox").style.float = "none"
		document.getElementById("leftBox").style.marginLeft = "auto"
		document.getElementById("leftBox").style.marginRight = "auto"
	} else {
		document.getElementById("rightBox").style.display=""
		document.getElementById("leftBox").style.width = "47%"
		document.getElementById("leftBox").style.float = "left"
		//document.getElementById("poolsOverviewLoader").style.MarginLeft = "auto"
		//document.getElementById("poolsOverviewLoader").style.MarginRight = "auto"
		//document.getElementById("poolsOverviewLoader").style.float = "none"
	}

	//resize width tables
	if(shownoLeftTables == true){
		
		document.getElementById("leftBox").style.display = "none"
		document.getElementById("rightBox").style.width = "70%"
		document.getElementById("rightBox").style.float = "none"
		document.getElementById("rightBox").style.marginLeft = "auto"
		document.getElementById("rightBox").style.marginRight = "auto"
		//document.getElementById("poolsOverviewTable").style.width = "98%"
		//document.getElementById("poolsOverviewTable").style.float = "none"
		
		
	} else {
		document.getElementById("leftBox").style.display = ""
		document.getElementById("rightBox").style.width = "47%"
		document.getElementById("rightBox").style.float = "right"
		//document.getElementById("poolsOverviewTable").style.width = "98%"
		//document.getElementById("poolsOverviewTable").style.float = "none"
	}

	
	if(customSorting == true){
		document.getElementById("poolColumn").innerHTML = "Pools<br/>(presumed order)";	
	} else {
		document.getElementById("poolColumn").innerHTML = "Pools";	
	}

	if(showExpectedTimeColumn == false){
		document.getElementById("UM_notes").style.display="none"
	} else {
		document.getElementById("UM_notes").style.display=""
	}
}

function removeTables(){
	log("removing tables...")
	////////log("refreshing tables now...")
	//my_poolsOverviewTable.destroy();
	
	
	removeTable('currentMatchesTable', 2)
	removeTable('upcomingMatchesTable', 3)
	removeTable('postponedMatchesTable', 3)
	
	
	try{
		my_poolsOverviewTable.page(0).draw('page')
	} catch (er){}
	removeTable('poolsOverviewTable', 2)
	
	CMclickChange = 0; UMclickChange = 0; PMclickChange = 0; POclickChange = 0
	
	newCMPageTime = null; newCMTableTime = null; newUMPageTime = null; newUMTableTime = null; newPMPageTime = null; newPMTableTime = null; newPOPageTime = null; newPOTableTime = null
		
	totCycleTime = 0
	
	setCMPageTableConfig = false; setUMPageTableConfig = false; setPMPageTableConfig = false; setPOPageTableConfig = false
	
	
	//Get Input Table rows
	var newTime = new Date();
	var timeString = newTime.toString();
	//////log("refreshing all 4 tables on:", timeString+"...")
	document.getElementById("upcomingMatchesLoader").style.display = ""
	document.getElementById("currentMatchesLoader").style.display = ""
	document.getElementById("postponedMatchesLoader").style.display = ""
	document.getElementById("poolsOverviewLoader").style.display = ""
	if (localTesting == true){
		getLocalDataAndMakeLocalTables()
		simpleTabChangeOnce() //directly go to upcoming matches table
	} else {
		getAPIDataAndMakeTables()
	}
}