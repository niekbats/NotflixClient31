$( document ).ready(function() {
  console.log( "document loaded" );
});

function getFrontPageMovies(){
	$.ajax({ 
	 type: "GET",
	 dataType: "json",
	 url: "http://localhost:8080/notflix31/api/movies",

	     	success: function(data){        
	       	console.log(data);

				$.each(data, function(index, element) {
				 	++index;
				 	if(index >= 4){
				 		return;
				 	}

				 		$.ajax({ 
				     type: "GET",
				     dataType: "json",
				     url: "http://www.omdbapi.com/?t=" + element.titel + "&y=&plot=short&r=json",
  
							    success: function(data){       
							    	$("#movieContainerFront").append('<div class="col-md-4"><img id="imageMovie'+index+'" src="" alt="movie" width="295" height="440">'
							    		+'<h2 id="headerMovie'+index+'">Spotlight movie number 1</h2><div style="height: 100px;">'
							    		+'<p id="descriptionMovie'+index+'">Information about the movie</p></div>'
							    		+'<form action="details.html" method="GET"><input type="submit" name="titel" value="'+element.titel+'"></form></div>');
							      	document.getElementById("imageMovie"+index).src = data.Poster;
							      	$('#headerMovie'+index).html(element.titel);
					 				$('#descriptionMovie'+index).html(element.beschrijving);
						    	}
					    	
				  	});
			});

	     }
	});
}

function loadDetails(){
	var fullLocationSearch = window.location.search;
	var titel = fullLocationSearch.slice(7);
	console.log("titel: "+titel);

		$.ajax({ 
	     type: "GET",
	     dataType: "json",
	     url: "http://localhost:8080/notflix31/api/movies/titel?titel="+titel,

		     	success: function(data){        
		       	console.log(data);

				 	$('#detailsTitel').html(data.titel);
				 	$('#detailsBeschrijving').html("<strong>Description:</strong><br>" + data.beschrijving);
				 	$('#detailsRegiseur').html("Regiseur: "+ data.regiseur);
				 	$('#detailsImdbCode').html("Imdb Code: "+data.imdbcode);
				 	$('#detailsLengteMin').html("Lengte in minuten: "+data.lengteMin);
				 	$('#detailsPublicatieDatum').html("Publicatie datum: "+data.publicatieDatum);
				 	$('#detailsAvarageNumber').html("Imdb rating: "+data.avarageNumber);

				 		$.ajax({ 
				     type: "GET",
				     dataType: "json",
				     url: "http://www.omdbapi.com/?t=" + titel + "&y=&plot=short&r=json",

						    success: function(data){       

						      document.getElementById("detailsImageMovie").src = data.Poster;
					   }
				});
	     	}
	  });
}

function showAllMovies() {
	$.ajax({ 
		 type: "GET",
		 dataType: "json",
		 url: "http://localhost:8080/notflix31/api/movies",

		     	success: function(data){        
		       	console.log(data);

					$.each(data, function(index, element) {
					 	++index;
					 		$.ajax({ 
					     type: "GET",
					     dataType: "json",
					     url: "http://www.omdbapi.com/?t=" + element.titel + "&y=&plot=short&r=json",

							    success: function(data){       
							    	$("#movieContainer").append('<div class="col-md-4"><img id="imageMovie'+index+'" src="" alt="movie" width="295" height="440">'
							    		+'<h2 id="headerMovie'+index+'">Spotlight movie number 1</h2><div style="height: 100px;">'
							    		+'<p id="descriptionMovie'+index+'">Information about the movie</p></div>'
							    		+'<form action="details.html" method="GET"><input type="submit" name="titel" value="'+element.titel+'"></form></div>');
							      	document.getElementById("imageMovie"+index).src = data.Poster;
							      	$('#headerMovie'+index).html(element.titel);
					 				$('#descriptionMovie'+index).html(element.beschrijving);

					 				$('#button'+ element.titel.replace(/\ /g, "")).click(function(){
					 					showMovieDetails(element.titel);
					 				});
						    	}
					  	});
				});

		     }
		});
}

function showAllUsers() {
	$.ajax({ 
		 type: "GET",
		 dataType: "json",
		 url: "http://localhost:8080/notflix31/api/users",

		     	success: function(data){        
		       	console.log(data);

					$.each(data, function(index, element) {
					 	++index;
    
							    	$("#userContainer").append('<div class="col-md-3" style="border:solid 1px black;margin:1px">'
							    		+'<h2 id="headerUser'+index+'">nickname</h2><p id="voornaamUser'+index+'">voornaam</p>'
							    		+'<p id="tussenvoegselUser'+index+'">tussenvoegsel</p>'
							    		+'<p id="achternaamUser'+index+'">achternaam</p></div>');
							      	$('#headerUser'+index).html(element.nickname);
					 				$('#voornaamUser'+index).html("<strong>Voornaam: </strong>"+element.voornaam);
					 				$('#tussenvoegselUser'+index).html("<strong>Tussenvoegsel: </strong>"+element.tussenvoegsel);
					 				$('#achternaamUser'+index).html("<strong>Achternaam: </strong>"+element.achternaam);
						    	
				});

		     }
		});
}

function registreer(){
	window.open ('registreer.html','_self',false)
}

function registreerUser(){
	var voornaam = document.getElementById("first_name").value;
	var tussenvoegsel = document.getElementById("tussenvoegsel").value;
	var achternaam = document.getElementById("last_name").value;
	var nickname = document.getElementById("display_name").value;
	var wachtwoord = document.getElementById("password").value;
	
	$.ajax({
			type: "POST",
			url: "http://localhost:8080/notflix31/api/users/newUser",
			data: "voornaam="+voornaam+"&tussenvoegsel="+tussenvoegsel+"&achternaam="+achternaam+"&nickname="+nickname+"&wachtwoord="+wachtwoord,
		
	}).fail(function(jqXHR,	textStatus, errorThrown ) {	
 		console.log(""+errorThrown);	
 		if(errorThrown == "Expectation Failed"){
	 		$('#beneathFormMessage').empty();
			$('#beneathFormMessage').append("vul alle velden in (uitzondering tussenvoegsel)");
		}else{
	 		$('#beneathFormMessage').empty();
			$('#beneathFormMessage').append("De volgende nickname bestaat helaas al: <strong>"+nickname+"</strong>");
		}
	}).done(function(data) {  	
		$('#beneathFormMessage').empty();
		$('#beneathFormMessage').append("succesvol aangemeld met de nickname: <strong>"+nickname+"</strong>");
   	});
}



function login() {
	$.ajax({
			type: "POST",
			url: "http://localhost:8080/notflix31/api/users/getToken",
			data: "nickname=memer&wachtwoord=987",
		
	}).fail(function(jqXHR,	textStatus) {	
  	alert("API Request failed: " + textStatus);	
	}).done(function(data) {  	
  	//Do something with the data
		alert("succesvol ingelogt");
   	});
	return false;
}