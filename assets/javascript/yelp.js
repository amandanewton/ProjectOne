  // FIREBASE
  // ==========================================================
  //var firebaseConfig = {
    //apiKey: "AIzaSyDlI0DiPN75v4F8xJiXW8KXD0O7FydwyOg",
    //authDomain: "projectone-cbd2c.firebaseapp.com",
    //databaseURL: "https://projectone-cbd2c.firebaseio.com",
    //projectId: "projectone-cbd2c",
    //storageBucket: "projectone-cbd2c.appspot.com",
    //messagingSenderId: "282583437650",
    //appId: "1:282583437650:web:eaf7c5591e59000e"
  //};
  // Initialize Firebase
  //firebase.initializeApp(firebaseConfig);

  // FUNCTIONS
  // ==========================================================

function buildQueryURL() {
    // queryURL is the base of the url we'll use to query the API
    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?sort_by=best_match";

    // Grab text the user typed into the search input
    var term =  $("#search-term")
    .val()
    .trim();

    // Grab text the user typed into the location input
    var location =  $("#location-term")
    .val()
    .trim();

    // Style the location input so that we can pass it as a parameter through the URL
    updatedLocation = document.getElementById('location-term').value.replace(" ","%20");

    // Grab limit the user typed into the number of results input
    var numRestaurants = $("#restaurant-count")
    .val()
    .trim();

    // Create queryURL with user-inpuit parameters added
    fullQueryURL = queryURL + '&term=' + term + '&location=' + updatedLocation + '&limit=' + numRestaurants

    // Return the fullQueryURL
    return fullQueryURL;
  }

  // CLICK HANDLERS
  // ==========================================================
  
  // .on("click") function associated with the Search Button
  $("#run-search").on("click", function(event) {
    // This line allows us to take advantage of the HTML "submit" property
    // This way we can hit enter on the keyboard and it registers the search
    // (in addition to clicks). Prevents the page from reloading on form submit.
    event.preventDefault();

    // Update firebase number of searches
    database.ref().once("value", function (snapshot) {
        let numOfSearches;
        numOfSearches = snapshot.val().yelpSearches;
        numOfSearches++
        console.log(numOfSearches);
        database.ref().update({
            yelpSearches: numOfSearches
        });
    });

    // Empty the region associated with the restaurants
    $("#accordion-yelp").empty();
  
    // Build the query URL for the ajax request to the Yelp API
    var queryURL = buildQueryURL();
  
    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    $.ajax({
      url: queryURL,
      method: "GET",
      async: true,
      crossDomain: true,
      headers: {
          Authorization: "Bearer 3W073978bR8KCElVotaVX3V3BoNtlG0_YMVNByS9ciGwuHJvwpTog1SsSxbpphOtal7vZze7JHIewER3wU8pCIXY_3XN2MtsgqzqbkRHgPsmTv7WIOniMEjSQN_WXHYx",
      }
    }).then(function (response) {
    
    // Loops through every result returned and loads requested data (Restaruant Name w/Yelp URL, Image, Rating, Phone)
      for (i=0; i< response.businesses.length; i++) {
        
        // Create new entries for the accordion
        let h3 = $("<h3>");
        h3.text(response.businesses[i].name);
        $("#accordion-yelp").append(h3);
        
        let newDiv = $("<div>");
        newDiv.addClass("match-info");
        newDiv.css("display", "inline-block");
        
          let newImage = $("<img>");
          newImage.attr("src", response.businesses[i].image_url);
          newImage.css("width", "75%");
          newImage.css("float", "left");
          $(newDiv).append(newImage);
          
          let newLink = $('<a>',{
              text: "Website",
              title: response.businesses[i].name,
              href: response.businesses[i].url,
              target: "_blank"
          });
          newLink.css("font-weight", "bold");
          $(newDiv).append(newLink);

          let newBreak = $("<br>");
          $(newDiv).append(newBreak);
          let newBreak2 = $("<br>");
          $(newDiv).append(newBreak2);

          let newParagraphRating = $("<p>");
          newParagraphRating.html("<b>Rating:</b> " + response.businesses[i].rating);
          $(newDiv).append(newParagraphRating);

          let newParagraphPhone = $("<p>");
          newParagraphPhone.html("<b>Phone:</b> " + response.businesses[i].display_phone);
          $(newDiv).append(newParagraphPhone);

      $("#accordion-yelp").append(newDiv);
      $("#accordion-yelp").accordion("refresh");
      }
    });
  });