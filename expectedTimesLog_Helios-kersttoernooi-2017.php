<?php
	$servername = "mysql1139int.cp.hostnet.nl";
	$username = "u281503_jelle_td";
	$password = "tDashboard#";
	$dbname = "db281503_tourniaDashboard";

	// Create connection
	$conn = mysqli_connect($servername, $username, $password, $dbname);
	// Check connection
	if (!$conn) {
		die("Connection failed: " . mysqli_connect_error());
	} else{
		echo("connection succeeded");
	}

	$UM_loopLogPHP = [];
	$UM_loopLogPHPSplit = [];
	
	if (isset($_POST['UM_loopLogStrings'])) {
		$UM_loopLogPHP = $_POST['UM_loopLogStrings'];
	}    
	 // Instructions if $ _POST [ 'trick'] exists    
	 
	$UM_loopLogPHP = $_POST['UM_loopLogStrings'];
	
	
	$UM_loopLogPHPLength = count($UM_loopLogPHP);
	
	for($p = 0; $p < $UM_loopLogPHPLength; $p++){
       /* $myInput = $UM_loopLogPHP[$p]; 
        $sql1 = "INSERT INTO ExpectedTimesLog2 (logInput)
        VALUES ('$myInput')";
        
		mysqli_query($conn, $sql1);*/
		
		$UM_loopLogPHPSplit = explode(";", $UM_loopLogPHP[$p]);
		
		
		$tournamantName = $UM_loopLogPHPSplit[0];
		$dataRefreshCount = (int)$UM_loopLogPHPSplit[1];
		$processID = $UM_loopLogPHPSplit[2];
		$status = $UM_loopLogPHPSplit[3];
		$matchId = $UM_loopLogPHPSplit[4];
		$pool = $UM_loopLogPHPSplit[5];
		$dateTime = $UM_loopLogPHPSplit[6];
		$expectedTime = (int)$UM_loopLogPHPSplit[7];
		$ifReadyToPlay = $UM_loopLogPHPSplit[8];
		$ifPlayerPlaying = $UM_loopLogPHPSplit[9];
		$ifPlayerUnavailable = $UM_loopLogPHPSplit[10];
		$reloadDataTimeInterval  = (int)$UM_loopLogPHPSplit[11];
		$timeSinceLastRefresh = (int)$UM_loopLogPHPSplit[12];
		$expectedTimeDifferenceCalc = (int)$UM_loopLogPHPSplit[13];
		$timeDifferenceCalc = (int)$UM_loopLogPHPSplit[14];
		$tournamentID = $UM_loopLogPHPSplit[15];
		
		$sql2 = "INSERT INTO Kerst_toernooi
        VALUES ('$tournamentID', '$tournamantName', '$dataRefreshCount', '$processID', '$status', '$matchId', '$pool', '$dateTime', '$expectedTime', '$ifReadyToPlay', '$ifPlayerPlaying', '$ifPlayerUnavailable', '$reloadDataTimeInterval', '$timeSinceLastRefresh', '$expectedTimeDifferenceCalc', '$timeDifferenceCalc')";
        
		mysqli_query($conn, $sql2);
    }
	
	if (mysqli_query($conn, $sql2)) {
		echo "New record created successfully";
	} else {
		echo "Error: " . $sql2 . "<br>" . mysqli_error($conn);
	}

	mysqli_close($conn);
?>