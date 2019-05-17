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

    // Empty the region associated with the restaurants
    $("#restaurant-section").empty();
  
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

        let newLink = $('<a>',{
          text: response.businesses[i].name,
          title: response.businesses[i].name,
          href: response.businesses[i].url,
          target: "_blank"
      }).appendTo('#restaurant-section');
      
        br = $("<br>");
        $("#restaurant-section").append(br);

        newImage = $("<img>");
        newImage.attr("src", response.businesses[i].image_url);
        newImage.css("width", "75%");
        $("#restaurant-section").append(newImage);

        newParagraphRating = $("<p>");
        newParagraphRating.text("Rating: " + response.businesses[i].rating);
        $("#restaurant-section").append(newParagraphRating);

        newParagraphPhone = $("<p>");
        newParagraphPhone.text("Phone: " + response.businesses[i].display_phone);
        $("#restaurant-section").append(newParagraphPhone);
      }
    });
  });