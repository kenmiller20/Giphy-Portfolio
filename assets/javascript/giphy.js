var giphyPortfolio = {

	topic: ['Pointer Dog', 'Puppy', 'Cat', 'Ragdoll Cat', 'Kitten', 'Hamster', 'Gerbil', 'Goldfish', 'Ferret'],


	initButtons: function() {
		// Clear existing buttons
		$("#animal-topics").empty();

		this.topic.forEach(this.addButton);
	},

	addButton: function(item, index) {
        var $input = $('<button class="btn btn-primary btn-animal" value="'+item+'"><h4>'+item+'</h4></button>');

        $input.appendTo($("#animal-topics"));	  
	},
};


giphyPortfolio.initButtons();


// When page is loaded
$(document).ready(function() {

	
 //   $(".gif").on("click", function() {
   $(document).on("click", ".gif", function() { 	
    	console.log(this);

      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");

      console.log(state);

      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });

	
	$("#run-search").on("click", function(event) {
	  	// This line allows us to take advantage of the HTML "submit" property
	  	// This way we can hit enter on the keyboard and it registers the search
	  	// (in addition to clicks).
	  	event.preventDefault();

	  	// This line of code will grab the input from the textbox
		var animal = $('#added-animal').val().trim();

		// Add animal to topic array
		giphyPortfolio.topic.push(animal.replace(/\b\w/g, l => l.toUpperCase()));

		// Redisplay buttons
		giphyPortfolio.initButtons();

		$('#added-animal').val("");
	});


	// 
	$(document).on("click", ".btn-animal", function() {
//	$(".btn-animal").on("click", function() {		
		console.log(this.value);

	  	$.ajax ({
	    	url: "https://api.giphy.com/v1/gifs/search?q="+this.value+"&api_key=dc6zaTOxFJmzC&limit=10",
	    	type: "GET",

	    success: function(response) {
	      console.log(response.data);

			// Clear existing images
			$("#animal-images").empty();

			var results = response.data;

	      	for (var idx=0; idx<response.data.length; idx++) {

		      	// Saving the still and animated images
		        var animiatedImageUrl = results[idx].images.fixed_height.url;
		        var stillImageUrl = results[idx].images.fixed_height_still.url;

		    	// Creating a paragraph tag with the result item's rating
		        var p = $('<p>').text("Rating: " + results[idx].rating);

				// Creating and storing an image tag
		    	var animalImage = $("<img>");

		        // Setting the animalImage src attribute to imageUrl
		        animalImage.attr("src", stillImageUrl);
		        animalImage.attr("alt", this.value+" image");

		        animalImage.attr("data-state", "still");
		        animalImage.attr("data-animate", animiatedImageUrl);
		        animalImage.attr("data-still", stillImageUrl);
		        animalImage.attr("class", "gif");

console.log(animalImage);

		        // Prepending the catImage to the images div
		        $("#animal-images").append(animalImage);
		       	// $("#animal-images").append(p);
	     	}
	    }, 

	    error: function(e) {console.log("uh oh"); }
	    });
	});	
});


