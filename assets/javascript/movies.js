var firebaseConfig = {
    apiKey: "AIzaSyDlI0DiPN75v4F8xJiXW8KXD0O7FydwyOg",
    authDomain: "projectone-cbd2c.firebaseapp.com",
    databaseURL: "https://projectone-cbd2c.firebaseio.com",
    projectId: "projectone-cbd2c",
    storageBucket: "projectone-cbd2c.appspot.com",
    messagingSenderId: "282583437650",
    appId: "1:282583437650:web:eaf7c5591e59000e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create shorthand firebase variable
const database = firebase.database();

let randomMovieTitles = [];
let randomMovieObjects = [];
let isLinked = false;
let ranOutOfMovies = false;
let thereAreNoMovies = false;

// Builds a link to justwatch.com
function linkToJustWatch(movieTitle) {
isLinked = true;

// Creates an array of every word in the title
let titleWords = movieTitle.split(" ");

baseURL = "https://www.justwatch.com/us/search?q="

// Adds %20 after every word in the title, in order, and concatenates it to baseURL
for (i=0; i < titleWords.length; i++) {
    baseURL = baseURL + titleWords[i] + "%20"
};

// Cuts off the final %20
finalURL = baseURL.slice(0, -3);

// Creates link in HTML using the URL just created
$('[check-streaming="' + movieTitle + '"]').html("<a href='" + finalURL + "' target='_blank'><b>Where can I stream it?</b></a>");

};

function matchInfo(movieTitle) {
// Take title assigned to image from TMDB and match it with the object pulled asynchronously from OMDB
isLinked = false;
for (i = 0; i < randomMovieObjects.length; i++) {
    if (movieTitle === randomMovieObjects[i].title) {
        
        // Once matched, update the browser with the relevant information
        $('[plot="' + movieTitle + '"]').html("<b>Plot:</b> " + randomMovieObjects[i].plot);
        $('[genre="' + movieTitle + '"]').html("<b>Genre:</b> " + randomMovieObjects[i].genre);
        $('[rating="' + movieTitle + '"]').html("<b>Rating:</b> " + randomMovieObjects[i].rating);
        $('[release-date="' + movieTitle + '"]').html("<b>Release Date:</b> " + randomMovieObjects[i].release_date);
        $('[imdb-rating="' + movieTitle + '"]').html("<b>IMDB Rating:</b> " + randomMovieObjects[i].imdbRating);

        if (isLinked === false) {
            linkToJustWatch(movieTitle);
        };
    }
}

}

function getMoreInfo(movieTitle) {

let omdbURL = "https://www.omdbapi.com/?t=" + movieTitle + "&apikey=4a69ca58"
$.ajax (
    {url: omdbURL,
    method: "GET"})
.then(function (response) {
    console.log(response);
    
    movieObject = {
        title: movieTitle,
        plot: response.Plot,
        genre: response.Genre,
        rating: response.Rated,
        release_date: response.Released,
        website: response.Website,
        imdbRating: response.imdbRating
    }
    
    randomMovieObjects.push(movieObject);
})
}

function findStreamingMovies(numOfMoviesChoice, genreChoice) {

$("#accordion-movies").empty();
randomMovieTitles = [];
randomMovieObjects = [];
ranOutOfMovies = false;
thereAreNoMovies = false;

// Converts the string passed from the html form into integer
numOfMoviesChoice = parseInt(numOfMoviesChoice);

// Converts string passed from html form into integer only if a non-random genre was chosen
if (genreChoice === "") {
    // Do nothing
} else {
    genreChoice = parseInt(genreChoice)
}

console.log("genreChoice: " + genreChoice);

// Setting the possible range of randomPage higher or lower depending on if the genre is random or selected
let randomPage;
// Widest range if there is no genre chosen (so, the results returned are random)
if (genreChoice === "") {
    randomPage = "&page=" + Math.floor(Math.random()* 234 + 1);
// Customized ranges for each particular genre. I checked how many pages are in each genre, given my search criteria
} else if (genreChoice === 28) {
    randomPage = "&page=" + Math.floor(Math.random()* 56 + 1);
} else if (genreChoice === 12) {
    randomPage = "&page=" + Math.floor(Math.random()* 40 + 1);
} else if (genreChoice === 16) {
    randomPage = "&page=" + Math.floor(Math.random()* 19 + 1);
} else if (genreChoice === 35) {
    randomPage = "&page=" + Math.floor(Math.random()* 84 + 1);
} else if (genreChoice === 80) {
    randomPage = "&page=" + Math.floor(Math.random()* 36 + 1);
} else if (genreChoice === 99) {
    randomPage = "&page=" + Math.floor(Math.random()* 3 + 1);
} else if (genreChoice === 18) {
    randomPage = "&page=" + Math.floor(Math.random()* 104 + 1);
} else if (genreChoice === 10751) {
    randomPage = "&page=" + Math.floor(Math.random()* 30 + 1);
} else if (genreChoice === 14) {
    randomPage = "&page=" + Math.floor(Math.random()* 25 + 1);
} else if (genreChoice === 36) {
    randomPage = "&page=" + Math.floor(Math.random()* 8 + 1);
} else if (genreChoice === 27) {
    randomPage = "&page=" + Math.floor(Math.random()* 32 + 1);
} else if (genreChoice === 10402) {
    randomPage = "&page=" + Math.floor(Math.random()* 7 + 1);
} else if (genreChoice === 9648) {
    randomPage = "&page=" + Math.floor(Math.random()* 24 + 1);
} else if (genreChoice === 10749) {
    randomPage = "&page=" + Math.floor(Math.random()* 39 + 1);
} else if (genreChoice === 878) {
    randomPage = "&page=" + Math.floor(Math.random()* 30 + 1);
} else if (genreChoice === 10770) {
    randomPage = "&page=" + Math.floor(Math.random()* 2 + 1);
} else if (genreChoice === 53) {
    randomPage = "&page=" + Math.floor(Math.random()* 73 + 1);
} else if (genreChoice === 10752) {
    randomPage = "&page=" + Math.floor(Math.random()* 5 + 1);
} else if (genreChoice === 37) {
    randomPage = "&page=" + Math.floor(Math.random()* 2 + 1);
} else {
    randomPage = 1;
}

let queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=ababaad76d9803e8be9e6860ddca4c64&language=en-US&include_adult=false&include_video=false" + randomPage + "&primary_release_date.gte=1995-01-01&vote_count.gte=150&with_original_language=en&with_genres=" + genreChoice;

console.log(queryURL);

$.ajax (
    {url: queryURL,
    method: "GET"})
    .then(function (response) {
        
        // Randomizing which of the 20 results are displayed, depending on how many movies are requested
        let numOfResults = response.results.length;
        let randomArrayStart;

        if (numOfResults === 0 ) {
            // Alert user below if there are no movies under that search criteria
            thereAreNoMovies = true;
        } else if (numOfResults < 3 && numOfMoviesChoice >= 3 || numOfResults < 5 && numOfMoviesChoice >= 5 || numOfResults < 10 && numOfMoviesChoice === 10) {
            // In case the number of movies requested is greater than the number of movies returned in the response, just display all the movies
            randomArrayStart = 0;
            numOfMoviesChoice = numOfResults;
            ranOutOfMovies = true;
        } else {
            // Randomizing which of the results are displayed, depending on how many movies are requested
            randomArrayStart = Math.floor(Math.random()*(numOfResults - numOfMoviesChoice + 1));
        }

        if (thereAreNoMovies === false) {
            for (i=randomArrayStart; i < (randomArrayStart + numOfMoviesChoice); i++) {
                
                // The key variable 
                movieTitle = response.results[i].original_title
    
                // Starts other ajax call
                randomMovieTitles.push(movieTitle);
                getMoreInfo(movieTitle);
                
                // Create new entries for the accordion
                let h3 = $("<h3>");
                h3.text(movieTitle);
                $("#accordion-movies").append(h3);
                
                let newDiv = $("<div>");
                newDiv.addClass("match-info"); // Allows whole div to be clicked via event delegation below
                newDiv.attr("data-movie-title", movieTitle) // Allows the whole div to be identified later
                newDiv.css("display", "inline-block");
    
                    // Grabbing poster information from TMDB, in this ajax call
                    let newPoster = $("<img>");
                    newPoster.attr("src", "https://image.tmdb.org/t/p/" + "/w185" + response.results[i].poster_path);
                    newPoster.attr("just-watch-link", "");
                    newPoster.attr("poster", movieTitle);
                    newPoster.css("float", "left");
                    newDiv.append(newPoster);
    
                       // Creating divs for information to be added later from the OMDB ajax call
                       let plotDiv = $("<div>");
                       plotDiv.attr("plot", movieTitle);
                       newDiv.append(plotDiv);
    
                       let genreDiv = $("<div>");
                       genreDiv.attr("genre", movieTitle);
                       newDiv.append(genreDiv);
    
                       let ratingDiv = $("<div>");
                       ratingDiv.attr("rating", movieTitle);
                       newDiv.append(ratingDiv);
    
                       let release_dateDiv = $("<div>");
                       release_dateDiv.attr("release-date", movieTitle);
                       newDiv.append(release_dateDiv);
                   
                       let imdbRatingDiv = $("<div>");
                       imdbRatingDiv.attr("imdb-rating", movieTitle);
                       newDiv.append(imdbRatingDiv);
    
                       let checkStreamingDiv = $("<div>");
                       checkStreamingDiv.attr("check-streaming", movieTitle);
                       newDiv.append(checkStreamingDiv);
    
                $("#accordion-movies").append(newDiv);
                $("#accordion-movies").accordion("refresh");
            };
        }

        if (thereAreNoMovies === true) {
            let newDiv = $("<div>");
            let p = $("<p>")
            p.html('<b>Search returned no results! Try different parameters.</b>');
            newDiv.append(p);
            $("#accordion-movies").append(newDiv);
        } else {
            // Only run these code blocks if there are results to process
            // Show user that there are no more movies to display
            if (ranOutOfMovies === true) {
                let newDiv = $("<div>");
                newDiv.addClass("match-info"); 
                newDiv.css("display", "block");
                newDiv.css("text-align", "center");
                
                    let porkyDiv = $("<div>")
                    porkyDiv.html('<b>You requested more movies than results!</b>');
                    newDiv.append(porkyDiv);

                    porkyPig = $("<img>")
                    porkyPig.attr("src", "https://thumbs.gfycat.com/AdorableGrizzledAdmiralbutterfly-max-1mb.gif");
                    porkyPig.css("width", "250px");
                    $(newDiv).append(porkyPig);
                                        
                $("#accordion-movies").append(newDiv);
            }
            // Calls matchInfo after a delay, to allow for the other AJAX call to complete
            setTimeout(function() {
                  for (let i = 0; i < randomMovieTitles.length; i++) {
                    matchInfo(randomMovieTitles[i]);
                }
            }, 1000);
        }
    });

};

function findMoviesInTheaters(numOfMoviesChoice, genreChoice) {

$("#accordion-movies").empty();
randomMovieTitles = [];
randomMovieObjects = [];
ranOutOfMovies = false;
thereAreNoMovies = false;

// Converts the strings passed from the html form into integers
numOfMoviesChoice = parseInt(numOfMoviesChoice);

// Converts string passed from html form into integer only if a non-random genre was chosen
if (genreChoice === "") {
    // Do nothing
} else {
    genreChoice = parseInt(genreChoice)
}

// Setting the possible range of randomPage higher or lower depending on if the genre is random or selected
let randomPage;
// Widest range if there is no genre chosen (so, the results returned are somewhat random)
if (genreChoice === "") {
    randomPage = "&page=" + Math.floor(Math.random()* 2 + 1);
// Restrict to one page if there is a genre chosen (to ensure that a real page is returned)
} else {
    randomPage = "&page=" + 1;
}

let queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=ababaad76d9803e8be9e6860ddca4c64&language=en-US&include_adult=false&include_video=false&with_release_type=3|2&region=US&page=" + randomPage + "&primary_release_year=2019&vote_count.gte=100&with_genres=" + genreChoice;

console.log(queryURL);

$.ajax (
    {url: queryURL,
    method: "GET"})
    .then(function (response) {
        console.log(response);
        
        // Randomizing which of the 20 results are displayed, depending on how many movies are requested
        let numOfResults = response.results.length;
        let randomArrayStart;

        if (numOfResults === 0 ) {
            // Alert user below if there are no movies under that search criteria
            thereAreNoMovies = true;
        } else if (numOfResults < 3 && numOfMoviesChoice >= 3 || numOfResults < 5 && numOfMoviesChoice >= 5 || numOfResults < 10 && numOfMoviesChoice === 10) {
            // In case the number of movies requested is greater than the number of movies returned in the response, just display all the movies
            randomArrayStart = 0;
            numOfMoviesChoice = numOfResults;
            ranOutOfMovies = true;
        } else {
            // Randomizing which of the results are displayed, depending on how many movies are requested
            randomArrayStart = Math.floor(Math.random()*(numOfResults - numOfMoviesChoice + 1));
        }
        
        // Only run loop to display movies if there ARE movies
        if (thereAreNoMovies === false) {
            for (i=randomArrayStart; i < (randomArrayStart + numOfMoviesChoice); i++) {
                // The key variable 
                movieTitle = response.results[i].original_title
    
                // Starts other ajax call
                randomMovieTitles.push(movieTitle);
                getMoreInfo(movieTitle);
                
                // Create new entries for the accordion
                let h3 = $("<h3>");
                h3.text(movieTitle);
                $("#accordion-movies").append(h3);

                let newDiv = $("<div>");
                newDiv.addClass("match-info"); // Allows whole div to be clicked via event delegation below
                newDiv.attr("data-movie-title", movieTitle) // Allows the whole div to be identified later
                newDiv.css("display", "inline-block");
                
                    // Grabbing title information from TMDB, in this ajax call
                    let newPoster = $("<img>");
                    newPoster.attr("src", "https://image.tmdb.org/t/p/" + "/w185" + response.results[i].poster_path);
                    newPoster.attr("just-watch-link", "");
                    newPoster.attr("poster", movieTitle);
                    newPoster.css("float", "left");
                    newDiv.append(newPoster);
    
                       // Creating divs for information to be added later from the OMDB ajax call
                       let plotDiv = $("<div>");
                       plotDiv.attr("plot", movieTitle);
                       newDiv.append(plotDiv);
    
                       let genreDiv = $("<div>");
                       genreDiv.attr("genre", movieTitle);
                       newDiv.append(genreDiv);
    
                       let ratingDiv = $("<div>");
                       ratingDiv.attr("rating", movieTitle);
                       newDiv.append(ratingDiv);
    
                       let release_dateDiv = $("<div>");
                       release_dateDiv.attr("release-date", movieTitle);
                       newDiv.append(release_dateDiv);
                   
                       let imdbRatingDiv = $("<div>");
                       imdbRatingDiv.attr("imdb-rating", movieTitle);
                       newDiv.append(imdbRatingDiv);
    
                $("#accordion-movies").append(newDiv);
                $("#accordion-movies").accordion("refresh");
            };
        }
        
        if (thereAreNoMovies === true) {
            let newDiv = $("<div>");
            let p = $("<p>")
            p.html('<b>Search returned no results! Try different parameters.</b>');
            newDiv.append(p);
            $("#movie-results").append(newDiv);
        } else {
            // Only run these code blocks if there are results to process
            // Show user that there are no more movies to display
            if (ranOutOfMovies === true) {
                let newDiv = $("<div>");
                newDiv.addClass("match-info"); 
                newDiv.css("display", "block");
                newDiv.css("text-align", "center");
                
                    let porkyDiv = $("<div>")
                    porkyDiv.html('<b>You requested more movies than results!</b>');
                    newDiv.append(porkyDiv);

                    porkyPig = $("<img>")
                    porkyPig.attr("src", "https://thumbs.gfycat.com/AdorableGrizzledAdmiralbutterfly-max-1mb.gif");
                    porkyPig.css("width", "250px");
                    $(newDiv).append(porkyPig);
                                        
                $("#movie-results").append(newDiv);
            }
    
            // Calls matchInfo after a delay, to allow for the other AJAX call to complete
            setTimeout(function() {
                for (let i = 0; i < randomMovieTitles.length; i++) {
                    matchInfo(randomMovieTitles[i]);
                }
            }, 1000);
        }
    });

};

// Pull JSON from TMDB on click
$("#pick-movies").on("click", function (event) {
    event.preventDefault(); // This is necessary to prevent page refresh
<<<<<<< HEAD
    $("#movie-results").show();
    
=======

    database.ref().once("value", function (snapshot) {
        let numOfSearches;
        numOfSearches = snapshot.val().movieSearches;
        numOfSearches++
        console.log(numOfSearches);
        database.ref().update({
            movieSearches: numOfSearches
        });
    });

>>>>>>> 87426b680f8cdfc3773fecd304dc861ad101fad5
    let numOfMoviesList = document.getElementById("number-of-movies");
    let numOfMoviesChoice = numOfMoviesList.options[numOfMoviesList.selectedIndex].value;
    
    let genreList = document.getElementById("genre");
    let genreChoice = genreList.options[genreList.selectedIndex].value;

    if (document.getElementById("streaming").checked) {
        findStreamingMovies(numOfMoviesChoice, genreChoice);
    } else {
        findMoviesInTheaters(numOfMoviesChoice, genreChoice);
    };
    
});