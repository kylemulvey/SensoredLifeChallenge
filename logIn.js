localStorage.clear();
const userNameBox = document.querySelector("#userNameBox");
const passWordBox = document.querySelector("#passWordBox");

function logIn()
{
    // Keys and Values
    const userNameKey = "username" + userNameBox.value;
    const passWordKey = userNameBox.value + passWordBox.value;

    const userMovieListKey = userNameBox.value + "MovieList";
    const userPokemonListKey = userNameBox.value + "PokemonList";

    const storedUserName = localStorage.getItem(userNameKey);
    const storedPassword = localStorage.getItem(passWordKey);

    // To keep track of current user
    let currentUserMovieKey = "currentUserMovieKey";
    let currentUserPokemonKey = "currentUserPokemonKey";

    if(storedUserName == null)    // first log-in, i.e., sign-up
    {
        // Set username, password, and lists
        localStorage.setItem(userNameKey, userNameBox.value);
        localStorage.setItem(passWordKey, passWordBox.value);

        localStorage.setItem(userMovieListKey, ""); // empty list to start with
        localStorage.setItem(userPokemonListKey, "");

        localStorage.setItem(currentUserMovieKey, userMovieListKey);
        localStorage.setItem(currentUserPokemonKey, userPokemonListKey);

        window.location.href = "homepage.html"  // redirect to homepage
    }
    else if(storedUserName != userNameBox.value || storedPassword != passWordBox.value) // incorrect credentials
    {
        document.querySelector("#errorMessage").innerHTML = "Username and password combination incorrect."  // display error message
    }
    else    // successful login
    {
        localStorage.setItem(currentUserPokemonKey, userPokemonListKey);
        localStorage.setItem(currentUserMovieKey, userMovieListKey);

        window.location.href = "homepage.html";    // redirect to homepage
    }
}