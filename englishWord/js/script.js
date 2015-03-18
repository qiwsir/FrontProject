xml_data = {};
$(document).ready(function(){
	var audio = $("#abandon_mp3").get(0);    //autoplay mp3
	audio.play();
 
	var xml_file = "source/abandon.xml";
    
	var word_image = "source/abandon.png";	
	$("#picture").html( "<img src=" + word_image + ">");
	
	$.get(xml_file, function(xml){	    //read the word and the other information from xml file.
		$(xml).find("word").each(function(){
			var word = $(this);
			xml_data.explain = word.find("explain").text();
			xml_data.explain_time = word.find("explain").attr("timelabel");
			xml_data.mnemonic = word.find("mnemonic").text();
			xml_data.mnemonic_time = word.find("mnemonic").attr("timelabel");
			xml_data.sentence_english = word.find("sentence_english").text();
			xml_data.sentence_english_time = word.find("sentence_english").attr("timelabel");
			xml_data.sentence_chinese = word.find("sentence_chinese").text();
			xml_data.sentence_chinese_time = word.find("sentence_chinese").attr("timelabel");
			var mp3 = word.find("mp3").text();
			
			$("#english").html("<p>" + mp3 + "</p>");    //display the word in the page.
			
			var splited_sent = splitWord(xml_data["mnemonic"]);    //split the string of mnemonic
			var arr1 = splited_sent['english1'];
			var arr2 = splited_sent['english2'];
			var table = "<div class='table-responsive'><table class='table'>";    //display the analysize of the word
			for(var i=0; i<arr1.length; i++){
				table +="<tr><td class='success'>" + arr1[i] + "</td><td class='info' style='text-align:left'>(" + arr2[i] + "</td></tr>" 
			} 
			
			$("#analyze").html( table + "</table></div><div><p>===>" + splited_sent["chinese_sent"] + "</p></div>");
	
		});
	});

})

function playaudio(){
	var word_file = "source/abandon.xml";
	var word_image = "source/abandon.png";
	readXml(word_file);
	
	//document.getElementById("english").innerHTML = "<p>" + xml_data["mp3"] + "</p>";
	$("#picture").html( "<img src=" + word_image + ">");
}

function updateTrackTime(track){
	var current_time = Math.round(track.currentTime*10)/10;
	
	if (current_time >= (xml_data.explain_time+0)){
		$("#word").html("<p>" + xml_data["explain"] + "</p>");
	} else {
		$("#word").html("");
	}
	
	var splited_sent = splitWord(xml_data["mnemonic"]);
	
	if (current_time >= (xml_data.mnemonic_time+0)){
		$("#analyze").css("display","block");
	} else {
		$("#analyze").css("display","none");
	}
	
	if (current_time > (xml_data.sentence_english_time+0)){
		$("#enexample").html("<div><p>" + xml_data.sentence_english + "</p></div>");
	} else {
		$("#enexample").html( "");
	}
	
	if (current_time >= (xml_data.sentence_chinese_time+0)){
		$("#cnexample").html("<div><p>" + xml_data.sentence_chinese + "</p></div>"); 
	} else {
		$("#cnexample").html("");
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
			
			$("#english").html("<p>" + xml_data["mp3"] + "</p>");
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
