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
});

/*
function login( {
	$.ajax({
			type: "GET",
			dataType: "json",
			url: "notflix/api/users/gettoken",
	
	}).fail(funcNon(jqXHR,	textStatus) {	
  	alert("API Request failed: " + textStatus);	
			}).done(funcNon(data) {  	
  	//Do something with the data
		alert("succesvol ingelogt");
   		});
})
*/