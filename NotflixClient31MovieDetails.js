$( document ).ready(function() {
  console.log( "document loaded" );

	$.ajax({ 
	     type: "GET",
	     dataType: "json",
	     url: "http://localhost:8080/notflix31/api/movies",

		     	success: function(data){        
		       	console.log(data);

					$.each(data, function(index, element) {
					 	++index;
					 	$('.headerMovie'+index).html(element.titel);
					 	$('.descriptionMovie'+index).html("Description: <br>" + element.beschrijving);
					 	$('.regiseurMovie'+index).html("Regiseur: "+ element.regiseur);
					 	$('.imdbCodeMovie'+index).html("Imdb Code: "+element.imdbcode);
					 	$('.lengteMinMovie'+index).html("Lengte in minuten: "+element.lengteMin);
					 	$('.publicatieDatumMovie'+index).html("Publicatie datum: "+element.publicatieDatum);
					 	$('.ratingMovie'+index).html("Imdb rating: "+element.avarageNumber);

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
});
