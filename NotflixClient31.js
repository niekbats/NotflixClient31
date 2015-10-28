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
				 	if(index == 4){
				 		return;
				 	}
				 	$('.headerMovie'+index).html(element.titel);
				 	$('.descriptionMovie'+index).html(element.beschrijving);

				 		$.ajax({ 
				     type: "GET",
				     dataType: "json",
				     url: "http://www.omdbapi.com/?t=" + element.titel + "&y=&plot=short&r=json",

						    success: function(data){       

						      document.getElementById("imageMovie"+index).src = data.Poster;
					    	}
				  	});
			});

	     }
	});
}


function showMovieDetails() {
	var titel = getName();
	console.log("titel: "+titel);
	var newWindow = window.open("details.html");
}

function loadDetails(){
	var titel = getName();
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
							    	$("#movieContainer").append('<div class="col-md-4"><img id="imageMovie'+index+'" src="" alt="movie" width="275" height="430"><h2 id="headerMovie'+index+'">Spotlight movie number 1</h2><div style="height: 100px;"><p id="descriptionMovie'+index+'">Information about the movie</p></div><p><a class="btn btn-default" href="details.html" role="button">View details »</a></p></div>');
							      	document.getElementById("imageMovie"+index).src = data.Poster;
							      	$('#headerMovie'+index).html(element.titel);
					 				$('#descriptionMovie'+index).html(element.beschrijving);
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
    
							    	$("#userContainer").append('<div class="col-md-3" style="border:solid 1px black;margin:1px"><h2 id="headerUser'+index+'">nickname</h2><p id="voornaamUser'+index+'">voornaam</p><p id="tussenvoegselUser'+index+'">tussenvoegsel</p><p id="achternaamUser'+index+'">achternaam</p></div>');
							      	$('#headerUser'+index).html(element.nickname);
					 				$('#voornaamUser'+index).html("Voornaam: "+element.voornaam);
					 				$('#tussenvoegselUser'+index).html("Tussenvoegsel: "+element.tussenvoegsel);
					 				$('#achternaamUser'+index).html("Achternaam: "+element.achternaam);
						    	
				});

		     }
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