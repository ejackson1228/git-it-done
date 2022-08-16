var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
  
    // make a request to the url
    fetch(apiUrl)
    .then(function(response) {
      //request was succesful
        if (response.ok) {
        response.json().then(function(data) {
        displayRepos(data, user);
      });
    } else { 
        alert("Error: GitHub user not found");
    }
    })
    .catch(function(error) {
        //.catch() is being chained onto the end of the .then() method
        alert("Unable to connect to GitHub");
    });
  };
  
getUserRepos();



var formSubmitHandler = function(event) {
    // prevent broswer from refreshing
    event.preventDefault();
    // get value from input element
    var username = nameInputEl.value.trim();
    if (username) {
        getUserRepos(username);
        
        //clear old content
        nameInputEl.value = '';
        repoContainerEl.textContent = '';
    }else{ 
        alert("Please enter a valid GitHub username.");
    }
};

var displayRepos = function (repos, searchTerm) {
   if (repos.length === 0) {
    repoContainerEl.textContent = "No Repositories Found";
    return;
   }
   
    repoContainerEl.textContent = "";
   repoSearchTerm.textContent = searchTerm;

   for (let i=0; i < repos.length; i++) {
    //format repo name
    var repoName = repos[i].owner.login + "/" + repos[i].name
    
    //create a link for each repo
    var repoEl = document.createElement("a");
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName); // <<<<<<< ????
  
    // create a span element to hold repository name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;
    
    //create a status element 
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    //check if current repo has issues or not
    if(repos[i].open_issues_count > 0) {
        statusEl.innerHTML = 
        "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
    } else {
        statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }
    
    // append to container
    repoEl.appendChild(titleEl);
    
    //appen to container 
    repoEl.appendChild(statusEl);
    
    // append container to the dom
    repoContainerEl.appendChild(repoEl);
   }
}

userFormEl.addEventListener("submit", formSubmitHandler);