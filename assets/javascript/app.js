$(document).ready(function () {

	// Initial array of villains
	var villains = ['Loki', 'Harley Quinn', 'Thanos', 'The Joker'];

	// Function for displaying villain data 
	function renderButtons() {

		// Deletes the movies prior to adding new animals (this is necessary otherwise you will have repeat buttons)
		$('#superButtons').empty();

		// Loops through the array of movies
		for (var i = 0; i < villains.length; i++) {

			// Dynamicaly generates buttons for each villain in the array
			var still = villains[i].images.fixed_height.url;
			var animate = villains[i].images.fixed_height.url;
			var a = $('<button>'); // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
			
			a.addClass('villain'); // Added a class 
			a.attr('data-name', villains[i]); // Added a data-attribute
			a.attr('src', $(this).data('animate'));
			a.attr('data-state', $(this).attr('data-state', 'animate'));
			a.text(villains[i]); // Provided the initial button text
			$('#superButtons').append(a); // Added the button to the HTML
		}
	}

	// This function handles events where one button is clicked
	$('#addButton').on('click', function () {

		// This line of code will grab the input from the textbox
		var superv = $('#super-input').val().trim();

		// The villain from the textbox is then added to our array
		villains.push(superv);

		// Our array then runs which handles the processing of our villain array
		renderButtons();

		// We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
		return false;
	});

	// This calls the renderButtons() function
	renderButtons();

	// The next section performs the search and returns the GIFs
	$(document).on('click', '.villain', function () {
	
		var superv = $(this).data('name');
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + superv + "&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({
			url: queryURL,
			method: 'GET'
		})
		.done(function (response) {

			console.log(queryURL);
			console.log(response);

			var results = response.data;

			$('#supervillain').empty();

			for (var i = 0; i < results.length; i++) {

				var villainDiv = $('<div style = "display: inline-block">');

				var p = $('<p>').text("Rating: " + results[i].rating);

				var villainImage = $('<img>');
				villainImage.attr('src', results[i].images.fixed_height_still.url);

				villainDiv.prepend(p);
				villainDiv.prepend(villainImage);

				$('#supervillain').prepend(villainDiv);

			}
			// The next section should allow for pausing and unpausing of the GIFs
		});
	});

	$("#supervillain").on('click', '.vimg', function () {

		var state = $(this).attr('data-state');

	 		if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
	});
});   