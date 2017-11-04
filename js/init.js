
var time = new Date();
var timeString = time.toString();


 $( function() { /**init**/
	/*customized CSS**/	
	if(urlData[0] == "demo"){
		sampleData = true
	}
	
	var fileref = document.createElement("link");

	fileref.setAttribute("rel", "stylesheet");
	fileref.setAttribute("type", "text/css");
	fileref.setAttribute("href", cssPath)
	document.getElementsByTagName("head")[0].appendChild(fileref)
	
	/*plasce old URL */
	//setTournialiveUrl(mytID)
	
	/*check Browser*/
	checkBrowsers()
	
	/*show clock */
	if(ifMobile == false){
		displayTime();
		var my_tickingClock = setInterval(displayTime, 1000);
		$('a[data-toggle="tooltip"]').tooltip({
			animated: 'fade',
			placement: 'bottom',
			html: true
		});
		
		$('[data-toggle="popover"]').popover({
			html: true	
		})
		
		if(startSetupWindow == true){
		$('#settingsModal').modal('show')
		}
		
		placeVarsInput()
	} else { //mobile == true
		//$('table.display').DataTable()
	}
	
	/*settings page*/
	//localStorageArray = []
	
	//placeVarsInput()
	//Object.keys(localStorage).forEach(key => localStorageArray.push(localStorage[key]));

	
	//trigger handlers
	
	
	
	/*function tournamentiIdText(){
		
		var initial = "Required. You can find your tournament ID <a data-toggle='tooltip' title='<img src='images/tournamentID.png'/>here</a>in the URL of your Tournia tournament homepage."
		
		var second="here </a>in the URL of your Tournia tournament homepage.-->
	}*/
	/*
	 if(ifMobile == true){
		document.getElementById("BoxRight").style.display = "none"
		document.getElementById("LeftBox").style.width = "100%"
		document.getElementById("createPageButton").style.width = "100%"
		document.getElementById("createPageButton").style.height = "70px"
		document.getElementById("createPageButton").style.fontSize = "30px"
	}*/

	//document.getElementById("myTournamentId").value = localStorage.getItem(ls_my_tournamentId)
	 //document.getElementById("myGSheetUrl").value = localStorage.getItem("StoreGoogleSheetUrl")
	 /*window.onerror = function() {
			document.getElementById("GDataLoader").style.display = "none";
			document.getElementById("dataCross").style.display = ""
			if_error = true
			document.getElementById("myGSheetUrl").value =  ""
			alert("Google Sheet URL doesn't exist. Provide a valid Google sheet URL.");
			
			
	};*/
	/*$("#parent").keyup(function(event){
		if(event.keyCode == 13){
			if(document.getElementById("createPageButton").disabled == false){
				//log("in here")
				$("#createPageButton").click();
				checkVariables()
				
			}
		}
	});*/
	
	
	$('#organizerPreset').click(function() {
		if($('#organizerPreset').is(':checked')){
			//log("in organizer Preset", document.getElementById("ifUpcomingMatches").checked, document.getElementById("ifCurrentMatches").checked == false)
			if(document.getElementById("ifPoolsOverview").checked == true){
				//log("Organizer checked");
				document.getElementById("showTotTeamsCb").checked = true
				document.getElementById("showRoundsNeededCb").checked = true
				document.getElementById("showRoundsCreatedCb").checked = true
				document.getElementById("showRoundsLeftCb").checked = true
				document.getElementById("showStatusCb").checked = true
				document.getElementById("showByeDataCb").checked = true
			}
		}
	});
	$('#viewerPreset').click(function() {
		if($('#viewerPreset').is(':checked')){
			//log("in player Preset", document.getElementById("ifUpcomingMatches").checked, document.getElementById("ifCurrentMatches").checked == false)
			if(document.getElementById("ifPoolsOverview").checked == true){				//log(" Viewer checked");
				document.getElementById("showTotTeamsCb").checked = false
				document.getElementById("showRoundsNeededCb").checked = false
				document.getElementById("showRoundsCreatedCb").checked = true
				document.getElementById("showRoundsLeftCb").checked = false
				document.getElementById("showStatusCb").checked = true
				document.getElementById("showByeDataCb").checked = true
			}
		}
	});
	$('#upcomingTime').keyup(function() {
        if($(this).val() < '10') {
			if_error = true
			alert("For better performance minimum time cannot be lower than 10 seconds.")
			document.getElementById("upcomingTime").value = 10
        }
    });
	$('#currentTime').keyup(function() {
        if($(this).val() < '10') {
			if_error = true
			alert("For better performance minimum time cannot be lower than 10 seconds.")
			document.getElementById("currentTime").value = 10
        }
    });
	
	$('#myReloadTimeInput').keyup(function() {
        if($(this).val() < '60') {
			if_error = true
			alert("For better performance minimum time cannot be lower than 60 seconds.")
			document.getElementById("myReloadTimeInput").value = 60
        }
    });
	 
	$("#settingsButtonDiv").click(function(){
		//log("clicked on settings button")
		placeVarsInput()
		$("#settingsModal").modal();
	});
	$("#statisticsButtonDiv").click(function(){
		//log("clicked on settings button")
		$("#statisticsModal").modal();
	});
		

	if(startSetupWindow == false){
		createPage()
	}
}) // end of init




