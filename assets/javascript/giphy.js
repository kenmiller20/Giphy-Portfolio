var giphyPortfolio = {

	// Existing animal topics
	topic: ['Pointer Dog', 'Puppy', 'Cat', 'Ragdoll Cat', 'Kitten', 'Hamster', 'Gerbil', 'Goldfish', 'Ferret'],

	// Create one button for each topic in array
	initButtons: function() {
		// Clear existing buttons
		$("#animal-topics").empty();

		// Loop though topics
		this.topic.forEach(this.addButton);
	},

	// Add topic button
	addButton: function(item, index) {
        var $input = $('<button class="btn btn-primary btn-animal" value="'+item+'"><h4>'+item+'</h4></button>');
        $input.appendTo($("#animal-topics"));	  
	},
};


// Display one button for each animal topic in topic array
giphyPortfolio.initButtons();


// When page is loaded
$(document).ready(function() {

	// When Add Animal Submit button is clicked
	$(document).on("click", "#add-animal", function(event) { 

		// Don't refresh 
	  	event.preventDefault();

	  	// Get entered topic
		var animal = $('#added-animal').val().trim();

		// If a topic was eneterd
		if (animal) {

			// Add animal to topic array, capitalizing topic
			giphyPortfolio.topic.push(animal.replace(/\b\w/g, l => l.toUpperCase()));

			// Recreate all topic buttons, including newly entered topic
			giphyPortfolio.initButtons();

			// Clear topic
			$('#added-animal').val("");
		}
	});

	
 	// On image click, animate image or make image still
   	$(document).on("click", ".image-animal", function() { 	

      	// Get image animation state
      	var state = $(this).attr("data-state");

      	// If state = still, then animate image
      	if (state === "still") {
        	$(this).attr("src", $(this).attr("data-animate"));
        	$(this).attr("data-state", "animate");

		// If state = animate, then make image still
    	} else {
        	$(this).attr("src", $(this).attr("data-still"));
        	$(this).attr("data-state", "still");
      	} 
    });


	// On topic button click, query GIPHY and popualte 10 images
	$(document).on("click", ".btn-animal", function() {

		// Giphy API call
	  	$.ajax ({
	    	url: "https://api.giphy.com/v1/gifs/search?q="+this.value+"&api_key=dc6zaTOxFJmzC&limit=10",
	    	type: "GET",

	    // On successful API call
	    success: function(response) {

			// Clear existing images
			$("#animal-images").empty();

			// Get API data
			var results = response.data;

			// Loop through API data
	      	for (var idx=0; idx<response.data.length; idx++) {

		      	// Saving the still and animated image URL's
		        var animiatedImageUrl = results[idx].images.fixed_height.url;
		        var stillImageUrl = results[idx].images.fixed_height_still.url;

		        // Create next image
		    	var animalImage = $("<img>");
		        animalImage.attr("src", stillImageUrl);
		        animalImage.attr("alt", this.value+" image");
		        animalImage.attr("data-state", "still");
		        animalImage.attr("data-animate", animiatedImageUrl);
		        animalImage.attr("data-still", stillImageUrl);
		        animalImage.attr("class", "image-animal");;

		    	// Create item's rating
		        var ratingCaption = $("<h4>");
		        ratingCaption.text("Rating: " + results[idx].rating);
				ratingCaption.attr("class", "caption text-center");

				// Append image
		       	$("#animal-images").append(animalImage);	

				// Append rating - Not Working
				$(".image-animal").text("Rating: "+results[idx].rating);	
	     	}
	    }, 

	    error: function(e) {console.log("uh oh"); }
	    });
	});	
});



