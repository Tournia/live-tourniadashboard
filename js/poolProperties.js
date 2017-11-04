function getPoolProperties(){
	log("getting pool Properties...")
	
	poolProperties = [	
		{
				altNames: ["Average Pool", "Overall Average", "Average", "General Pool"],
				avgTime: 1871,
				stdDev: 386,
				abbreviations: ["Avg", "Mean", "General"],
		},
		{
				altNames: ["Men Singles A", "Men Single A", "MSA", "Mens Singles A", "Mens Single A"],
				avgTime: 2147,
				stdDev: 589,
				abbreviations: ["MSA"]
		},
		{
			altNames: ["Men Singles B", "Men Single B", "MSB", "Mens Singles B", "Mens Single B"],
				avgTime: 2030,
				stdDev: 514,
				abbreviations: ["MSB"]
		},
		{
				altNames: ["Men Singles C", "Men Single C", "MSC", "Mens Singles C", "Mens Single C"],
				avgTime: 1845,
				stdDev: 390,
				abbreviations: ["MSC"]
		},
		{
				altNames: ["Men Singles D", "Men Single D", "MSD", "Mens Singles D", "Mens Single D"],
				avgTime: 1491,
				stdDev: 290,
				abbreviations: ["MSD"]			
		},
		{
				altNames: ["Ladies Singles A", "Ladies Single A", "LSA", "Ladie Singles A", "Ladie Single A", "WSA", "Womens Single A", "Womens Singles A", "Women Single A", "Women Singles A"],
				avgTime: 1914,
				stdDev: 268,
				abbreviations: ["LSA", "WSA"]		
		},
		{
				altNames: ["Ladies Singles B", "Ladies Single B", "LSB", "Ladie Singles B", "Ladie Single B", "WSB", "Womens Single B", "Womens Singles B", "Women Single B", "Women Singles B"],
				avgTime: 1920,
				stdDev: 280,
				abbreviations: ["LSB", "WSB"]
		},
		{
				altNames: ["Ladies Singles C", "Ladies Single C", "LSC", "Ladie Singles C", "Ladie Single C", "WSC", "Womens Single C", "Womens Singles C", "Women Single C", "Women Singles C"],
				avgTime: 1981,
				stdDev: 296,
				abbreviations: ["LSC",  "WSC"]
		},
		{
				altNames: ["Ladies Singles D", "Ladies Single D", "LSD", "Ladie Singles D", "Ladie Single D", "WSD", "Womens Single D", "Womens Singles D", "Women Single D", "Women Singles D"],
				avgTime: 1487,
				stdDev: 228,
				abbreviations: ["LSD", "WSD"]
		},
		{
				altNames: ["Men Doubles A", "Men Double A", "MDA", "Mens Doubles A", "Mens Double A"],
				avgTime: 1897,
				stdDev: 268,
				abbreviations: ["MDA"]
		},
		{
				altNames: ["Men Doubles B", "Men Double B", "MDB", "Mens Doubles B", "Mens Double B"],
				avgTime: 1985,
				stdDev: 348,
				abbreviations: ["MDB"]
		},
		{
				altNames: ["Men Doubles C", "Men Double C", "MDC", "Mens Doubles C", "Mens Double C"],
				avgTime: 1751,
				stdDev: 321,
				abbreviations: ["MDC"]
		},
		{
				altNames: ["Men Doubles D", "Men Double D", "MDD", "Mens Doubles D", "Mens Double D"],
				avgTime: 1535,
				stdDev: 179,
				abbreviations: ["MDD"]
		},
		{
				altNames: ["Ladies Doubles A", "Ladies Double A", "LDA", "Ladie Doubles A", "Ladie Double A", "WDA", "Womens Double A", "Womens Doubles A", "Women Double A", "Women Doubles A"],
				avgTime: 1872,
				stdDev: 252,
				abbreviations: ["LDA", "WDA"]
		},
		{
				altNames: ["Ladies Doubles B", "Ladies Double B", "LDB", "Ladie Doubles B", "Ladie Double B", "WDB", "Womens Double B", "Womens Doubles B", "Women Double B", "Women Doubles B"],
				avgTime: 1874,
				stdDev: 319,
				abbreviations: ["LDB", "WDB"]
		},
		{
				altNames: ["Ladies Doubles C", "Ladies Double C", "LDC", "Ladie Doubles C", "Ladie Double C", "WDC", "Womens Double C", "Womens Doubles C", "Women Double C", "Women Doubles C"],
				avgTime: 1878,
				stdDev: 305,
				abbreviations: ["LDC", "WDC"]
		},
		{
				altNames: ["Ladies Doubles D", "Ladies Double D", "LDD", "Ladie Doubles D", "Ladie Double D", "WDD", "Womens Double D", "Womens Doubles D", "Women Double D", "Women Doubles D"],
				avgTime: 1574,
				stdDev: 175,
				abbreviations: ["LDD", "WDD"]			
		},
		{
				altNames: ["Mixed Doubles A", "Mixed Double A", "Mix Double A", "Mix Doubles A", "MXA", "XDA"],
				avgTime: 1887,
				stdDev: 365,
				abbreviations: ["MXA", "XDA"]
		},
		{
				altNames: ["Mixed Doubles B", "Mixed Double B", "Mix Double B", "Mix Doubles B", "MXB", "XDB"],
				avgTime: 1946,
				stdDev: 342,
				abbreviations: ["MXB", "XDB"]
		},
		{
				altNames: ["Mixed Doubles C", "Mixed Double C", "Mix Double C", "Mix Doubles C", "MXC", "XDC"],
				avgTime: 1864,
				stdDev: 402,
				abbreviations: ["MXC", "XDC"]			
		},
		{
				altNames: [ "Mixed Doubles D", "Mixed Double D", "Mix Double D", "Mix Doubles D",  "MXD", "XDD"],
				avgTime: 1717,
				stdDev: 300,
				abbreviations: ["MXD", "XDD"]
		}
	]
}

function calculatePoolsStats(poolsArray){
	var selectedPools = []
	for (var pn  in poolsArray){
		var poolName = poolsArray[pn]
		var selectedPool = findPoolProperties(poolName)
		selectedPools.push(selectedPool)
	}

	var avgTimesArray = []
	var stdDevTimesArray = []
	for (var p in selectedPools){
		var averageTime = selectedPools[p].avgTime
		var stdDevTime = selectedPools[p].stdDev
		avgTimesArray.push(averageTime)
		stdDevTimesArray.push(stdDevTime)
	}
	avgTimesArray.sort(function(a,b){return b-a})
	stdDevTimesArray.sort(function(a,b){return b-a})
	maxAvgTime = avgTimesArray[0]
	maxStdDevTime = stdDevTimesArray[0]
	minAvgTime = avgTimesArray[avgTimesArray.length - 1]
	minStdDevTime = stdDevTimesArray[stdDevTimesArray.length - 1]
	
	var avgTimeTotal = 0
	for(var i in avgTimesArray) { avgTimeTotal += avgTimesArray[i]}
	var stdDevTimeTotal = 0
	for(var j in stdDevTimesArray) { stdDevTimeTotal += stdDevTimesArray[j]}
	avgAvgTime = avgTimeTotal/avgTimesArray.length
	avgStdDevTime = stdDevTimeTotal/stdDevTimesArray.length
}

function getPoolNameAbbr(poolName){
	var abbrpt2 = poolName.split(" ").pop()
	if(poolName.includes("Mixed Doubles")){
		var abbrpt1 = "MX"
		var abbreviation = abbrpt1+abbrpt2
	} else if(poolName.includes("Men Doubles")){
		var abbrpt1 = "MD"
		var abbreviation = abbrpt1+abbrpt2
	} else if(poolName.includes("Ladies Doubles")){
		var abbrpt1 = "LD"
		var abbreviation = abbrpt1+abbrpt2
	} else if(poolName.includes("Men Singles")){
		var abbrpt1 = "MS"
		var abbreviation = abbrpt1+abbrpt2
	} else if(poolName.includes("Ladies Singles")){
		var abbrpt1 = "LS"
		var abbreviation = abbrpt1+abbrpt2
	} else {
		var abbreviation = poolName
	}
		return abbreviation
}

function inNamesObject(array, key, prop){
	prop = (typeof prop === 'undefined') ? 'name' : prop;    

	for (var i=0; i < array.length; i++) {
		if (array[i][prop] === key) {
			var my_object = array[i]
			break
		} else {
			return false
		}
	}
	return true;
}

function inNamesArray(needle, haystack) {
	for (var i = 0; i < haystack.length; i++) {
		if (haystack[i].toLowerCase() == needle){
			return true;
		}
	}
	return false;
}

function findPoolProperties(namePool){
	//log("finding pool properties of:", namePool, poolProperties)
	var ifinPool = false
	var poolsCount = 0
	for (var pn = 0; pn < poolProperties.length; pn++){
		//log(pn, namePool, poolProperties[pn])
		namePool_LC = namePool.toLowerCase()
		ifinPool = inNamesArray(namePool_LC, poolProperties[pn].altNames)
		if(ifinPool == true){
			//log("pool found:", namePool, poolProperties[pn])
			var selectedPool = poolProperties[pn]
			break
		} else poolsCount +=1
	}
	if (poolsCount == poolProperties.length){
		//log("pool not found:", poolProperties[0]) // "Average Pool"
		var selectedPool =  poolProperties[0] // "Average Pool"
	}
	return selectedPool
}