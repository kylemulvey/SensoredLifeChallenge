"use strict";
window.onload = getData;

// Get and Present Data Functions //

// Get Data //
function getData()
{
    getMovieData();
    getPokemonData();
}

function getMovieData()
{
    const SERVICE_URL = "https://imdb-api.com/en/API/Top250Movies/";

    const API_KEY = "k_vs9w7279";

    let url = SERVICE_URL + API_KEY;

    $.ajax({
        dataType: "json",
        url: url,
        data: null,
        success: jsonMovieLoaded
    });
}

function getPokemonData()
{
    const SERVICE_URL = "https://pokeapi.co/api/v2/pokemon/";

    let url = SERVICE_URL;
    $.ajax({
        dataType: "json",
        url: url,
        data: null,
        success: jsonPokemonLoaded
    });
}

// Present Data //
function jsonMovieLoaded(obj)
{
    // If there is no data, display a message and return
    if(!obj.items || obj.items.length == 0)
    {
        document.querySelector("#movieContent").innerHTML = "<p>No movies found!</p>";
        return;
    }

    let results = obj.items;
    let bigString = `<p>Here are the top 10 movies!</p>`;

    // Build HTML
    for(let i = 0; i < 10; i++)
    {
        let result = `<div class="movieResult">${results[i].title}<button type="button" value="${results[i].title}" onclick="addToMovieList(this.value)">Add to List</button></div>`;
        bigString += result;
    }

    document.querySelector("#movieContent").innerHTML = bigString;
}

function jsonPokemonLoaded(obj)
{
    // If there is no data, display a message and return
    if(!obj.results || obj.results.length == 0)
    {
        document.querySelector("#pokemonContent").innerHTML = "<p>No Pokemon found!</p>";
        return;
    }

    let pokemonResults = obj.results;
    let bigString = `<p>Here are 10 Pokemon!</p>`;

    // Build HTML
    for(let i = 0; i < 10; i++)
    {
        let pokemon = `<div class="pokemonResult">${pokemonResults[i].name}<button type="button" value="${pokemonResults[i].name}" onclick="addToPokemonList(this.value)">Add to List</button></div>`;
        bigString += pokemon;
    }

    document.querySelector("#pokemonContent").innerHTML = bigString;
}

// Script Scope Variables //
let moviesList = [];
let pokemonsList = [];

let currentUserMovieKey = "currentUserMovieKey";
let userMovieListKey = localStorage.getItem(currentUserMovieKey);

let currentUserPokemonKey = "currentUserPokemonKey";
let userPokemonListKey = localStorage.getItem(currentUserPokemonKey);


// Add, Remove, View Functions //

// Add //
function addToMovieList(title)
{
    if(!moviesList.includes(title))    // check if movie is already in the user's list
    {
        let movies = localStorage.getItem(userMovieListKey);    // list of movies in a string
        movies += title;

        moviesList.push(title);
        let moviesListString = JSON.stringify(moviesList);
        localStorage.setItem(userMovieListKey, moviesListString);
        
        document.querySelector("#movieFeedback").innerHTML = `Successfully added ${title} to the list!`;
    }
    else
    {
        document.querySelector("#movieFeedback").innerHTML = `${title} pokemon is already in your list!`;
    }
}

function addToPokemonList(title)
{
    if(!pokemonsList.includes(title))    // check if movie is already in the user's list
    {
        let pokemons = localStorage.getItem(userPokemonListKey);    // get list of movies in a string

        pokemons += title;
        pokemonsList.push(title);

        let pokemonsListString = JSON.stringify(pokemonsList);
        localStorage.setItem(userPokemonListKey, pokemonsListString);   // update list of Pokemon
        
        document.querySelector("#pokemonFeedback").innerHTML = `Successfully added ${title} to the list!`;
    }
    else    // display error message
    {
        document.querySelector("#pokemonFeedback").innerHTML = `${title} pokemon is already in your list!`;
    }
}

// Remove //
function removeMovieFromList(title)
{
    let movies = localStorage.getItem(userMovieListKey);    // list of movies in a string
    let favMovies = JSON.parse(movies); // change string into array

    favMovies.splice(favMovies.indexOf(title), 1) // remove movie from list
    moviesList = favMovies; // public movieList object after splice

    favMovies = JSON.stringify(favMovies);    // change array back into string
    localStorage.setItem(userMovieListKey, favMovies);  // update movie list in database

    document.querySelector("#movieFeedback").innerHTML = `Successfully removed ${title} from your list!`;
    viewLists();    // display updated list
}

function removePokemonFromList(title)
{
    let pokemons = localStorage.getItem(userPokemonListKey);    // list of Pokemon in a string
    let favPokemons = JSON.parse(pokemons); // change string into array

    favPokemons.splice(favPokemons.indexOf(title), 1) // remove Pokemon from list
    pokemonsList = favPokemons; // public pokemonsList object after splice

    favPokemons = JSON.stringify(favPokemons);    // change array back into string
    localStorage.setItem(userPokemonListKey, favPokemons);  // update Pokemon list in database

    document.querySelector("#pokemonFeedback").innerHTML = `Successfully removed ${title} from your list!`;
    viewLists();    // display updated list
}

// View //
function viewLists()
{
    // Create Movie List
    let favMovies = localStorage.getItem(userMovieListKey); // list of movies in a string
    if(favMovies != "") // check if empty
    {
        favMovies = JSON.parse(favMovies);  // change string into array
        let movieString = `<p>Here are your favorite movies!</p>`;

        // Build HTML
        for(let i = 0; i < favMovies.length; i++)
        {
            let movie = `<div class="favMovie">${favMovies[i]}<button type="button" value="${favMovies[i]}" onclick="removeMovieFromList(this.value)">Remove from List</button></div>`;
            movieString += movie;
        }

        document.querySelector("#favMovies").innerHTML = movieString;
    }
    
    // Create Pokemon List
    let favPokemons = localStorage.getItem(userPokemonListKey); // list of movies in a string
    if(favPokemons != "")   // check if empty
    {
        favPokemons = JSON.parse(favPokemons);  // change string into array

        let pokemonString = `<p>Here are your favorite Pokemon!</p>`;

        // Build HTML
        for(let i = 0; i < favPokemons.length; i++)
        {
            let pokemon = `<div class="favPokemon">${favPokemons[i]}<button type="button" value="${favPokemons[i]}" onclick="removePokemonFromList(this.value)">Remove from List</button></div>`;
            pokemonString += pokemon;
        }

        document.querySelector("#favPokemons").innerHTML = pokemonString;
    }
}