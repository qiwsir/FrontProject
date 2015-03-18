var xml_data = {};

function playaudio(){
	var word_file = "source/abandon.xml";
	var word_image = "source/abandon.png";
	readXml(word_file);
	
	//document.getElementById("english").innerHTML = "<p>" + xml_data["mp3"] + "</p>";
	document.getElementById("picture").innerHTML = "<img src=" + word_image + ">";
}

function updateTrackTime(track){
	var current_time = Math.round(track.currentTime*10)/10;
	//document.getElementById("time").innerHTML = current_time + "======" + track.currentTime;
	//var word_file = "source/abandon.xml";
	//var word_image = "source/abandon.png";
	
	//readXml(word_file);
	
	//document.getElementById("english").innerHTML = "<p>" + xml_data["mp3"] + "</p>";
	//document.getElementById("picture").innerHTML = "<img src=" + word_image + ">";
	//$("#englishword").css("background-image", "url("+background_image+") ");
	
	
	if (current_time >= (xml_data.explain_time+0)){
		document.getElementById("word").innerHTML = "<p>" + xml_data["explain"] + "</p>";
	} else {
		document.getElementById("word").innerHTML = "";
	}
	
	var splited_sent = splitWord(xml_data["mnemonic"]);
	
	if (current_time >= (xml_data.mnemonic_time+0)){
		var eng1_arr = splited_sent['english1'];
		var eng2_arr = splited_sent['english2'];
		
		var table = "<div class='table-responsive'><table class='table'><tr class='success'><td>";
		
		for(var i=0; i<eng1_arr.length; i++){
			if (i<eng1_arr.length-1){
				table += eng1_arr[i] + "</td><td>";
			} else {
				table += eng1_arr[i] + "</td></tr><tr class='warning'><td>";
			}
		}
		for(var i=0; i<eng2_arr.length; i++){
			if (i<eng2_arr.length-1){
				table += "(" + eng2_arr[i] + "</td><td>";
			} else {
				table += "(" + eng2_arr[i] + "</td></tr></table></div>"
			}
		}
		document.getElementById("analyze").innerHTML = table + "<div><p>===>" + splited_sent["chinese_sent"] + "</p></div>";
	} else {
		document.getElementById("analyze").innerHTML = "";
	}
	
	if (current_time > (xml_data.sentence_english_time+0)){
		document.getElementById("enexample").innerHTML ="<div><p>" + xml_data.sentence_english + "</p></div>";
	} else {
		document.getElementById("enexample").innerHTML = "";
	}
	
	if (current_time >= (xml_data.sentence_chinese_time+0)){
		document.getElementById("cnexample").innerHTML = "<div><p>" + xml_data.sentence_chinese + "</p></div>"; 
	} else {
		document.getElementById("cnexample").innerHTML = "";
	}
}


function readXml(xml_file){
	$.get(xml_file, function(xml){	
		$(xml).find("word").each(function(){
			var word = $(this);
			//var explain = word.find("explain").text();
			xml_data.explain = word.find("explain").text();
			xml_data.explain_time = word.find("explain").attr("timelabel");
			xml_data.mnemonic = word.find("mnemonic").text();
			xml_data.mnemonic_time = word.find("mnemonic").attr("timelabel");
			xml_data.sentence_english = word.find("sentence_english").text();
			xml_data.sentence_english_time = word.find("sentence_english").attr("timelabel");
			xml_data.sentence_chinese = word.find("sentence_chinese").text();
			xml_data.sentence_chinese_time = word.find("sentence_chinese").attr("timelabel");
			xml_data.mp3 = word.find("mp3").text();
			
			document.getElementById("english").innerHTML = "<p>" + xml_data["mp3"] + "</p>";
		});
	});
}

function splitWord(spword){
	var result = {};
	if (spword){
	var arr = spword.split("→");
	var chinese_arry =new Array() ;
	for (var i=1; i<arr.length; i++){
		chinese_arry[i-1] = arr[i];
	}
	result['chinese_sent'] = chinese_arry.join("→");
	
	var english1 = new Array();
	var english2 = new Array();
	var english_arr = arr[0].split("+");
	for (var i=0; i<english_arr.length; i++){
		var temp_arr = english_arr[i].split("(");
		english1[i] = temp_arr[0];
		english2[i] = temp_arr[1];
	}
	
	result["english1"] = english1;
	result["english2"] = english2;
	return result;
	}
}