//localStorage.clear();
const userNameBox = document.querySelector("#userNameBox");
const passWordBox = document.querySelector("#passWordBox");
//var userMovieListKey ="";

function logIn()
{
    const userNameKey = "username" + userNameBox.value;
    const passWordKey = userNameBox.value + passWordBox.value;

    userMovieListKey = userNameBox.value + "MovieList";
    //let userMovieListValue = "";

    const userGameListKey = userNameBox.value + "GameList";
    //let userGameListValue = "";

    const storedUserName = localStorage.getItem(userNameKey);
    const storedPassword = localStorage.getItem(passWordKey);

    if(storedUserName == null)    // first log-in, i.e., sign-up
    {
        // Set username, password, and list
        localStorage.setItem(userNameKey, userNameBox.value);
        localStorage.setItem(passWordKey, passWordBox.value);

        localStorage.setItem(userMovieListKey, ""); // empty list to start with
        localStorage.setItem(userGameListKey, "");

        window.location.href = "homepage.html"
    }
    else if(storedUserName != userNameBox.value || storedPassword != passWordBox.value) // incorrect credentials
    {
        document.querySelector("#errorMessage").innerHTML = "Username and password combination incorrect."  // display error message
    }
    else    // successful login
    {
        window.location.href = "homepage.html";    // redirect to homepage
    }
}