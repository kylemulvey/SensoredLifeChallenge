"use strict";
window.onload = getData;
import{userMovieListKey} from "./module.js";
function getData()
{
    const SERVICE_URL = "https://imdb-api.com/en/API/Top250Movies/";

    const API_KEY = "k_vs9w7279";

    let url = SERVICE_URL + API_KEY;

    $.ajax({
        dataType: "json",
        url: url,
        data: null,
        success: jsonLoaded
    });
}

let moviesList = [];

function jsonLoaded(obj)
{
    // If there is no data, display a message and return
    if(!obj.items || obj.items.length == 0)
    {
        document.querySelector("#content").innerHTML = "<p>No movies found!</p>";
        return;
    }

    let results = obj.items;
    let bigString = `<p>Here are the top 10 movies!</p>`;

    for(let i = 0; i < 10; i++)
    {
        let result = `<div class="movieResult">${results[i].title}<button type="button" value="${results[i].title}" onclick="addToMovieList(this.value)">Add to List</button></div>`;
        bigString += result;
    }

    document.querySelector("#content").innerHTML = bigString;
}


//localStorage.getItem(userMovieListKey);
let gamesList = [];

function addToMovieList(title)
{
    if(!moviesList.includes(title))    // check if movie is already in the user's list
    {
        let movies = localStorage.getItem(userMovieListKey);    // list of movies in a string
        console.log("Movies: " + movies);
        console.log("userMovieListKey: " + userMovieListKey);
        movies += title;
        localStorage.setItem(userMovieListKey, movies);
        moviesList.push(title);
        
        document.querySelector("#feedback").innerHTML = `Successfully added ${title} to the list!`;
    }
    else
    {
        document.querySelector("#feedback").innerHTML = "That movie is already in your list!";
    }
}

function removeMovieFromList(title)
{
    let movies = localStorage.getItem(userMovieListKey);    // list of movies in a string
    let favMovies = JSON.parse(movies); // change string into array

    movies = favMovies.splice(favMovies.indexOf(title), 1) // remove movie from list

    movies = JSON.stringify(movies);    // change array back into string
    localStorage.setItem(userMovieListKey, movies);

    document.querySelector("#feedback").innerHTML = `Successfully removed ${title} from your list!`;
}

function viewLists()
{
    let favMovies = localStorage.getItem(userMovieListKey); // list of movies in a string
    favMovies = JSON.parse(favMovies);  // change string into array
    let s = `<p>Here are your favorite movies!</p>`;
    for(let i = 0; i < favMovies.length; i++)
    {
        let movie = `<div class="favMovie">${favMovies[i].title}<button type="button" value="${favMovies[i].title}" onclick="removeMovieFromList(this.value)">Remove from List</button></div>`;
        s += movie;
    }

    document.querySelector("#favMovies").innerHTML = s;
}