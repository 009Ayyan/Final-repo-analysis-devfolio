// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()

function getUserInput() {
  // Prompt the user for input
  var userInput = prompt("Enter a Github username to see their repositories");

  // Display the input
  console.log("You entered: " + userInput);

  // Open a new connection, using the GET request on the URL endpoint
  request.open('GET', 'https://api.github.com/users/' + userInput + '/repos', true)

  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);

    var statusHTML = '';
    var count = 0; // new variable to keep track of count
    var languageCount = {}; // new object to keep track of language count
    var highestCount = 0; // new variable to keep track of highest language count
    var highestLanguage = ''; // new variable to keep track of language with highest count
    $.each(data, function(_, status) {
      statusHTML += '<tr>';
      statusHTML += '<td>' + (status.id || 0) + '</td>';
      statusHTML += '<td>' + status.name + '</td>';
      statusHTML += '<td><a href="' + status.html_url + '">' + status.html_url + '</a></td>';
      statusHTML += '<td>' + status.language + '</td>';
      statusHTML += '</tr>';
      count++; // increment count for each repository
      
      if (status.language !== null) {
        if (status.language in languageCount) {
          languageCount[status.language]++;
        } else {
          languageCount[status.language] = 1;
        }
        if (languageCount[status.language] > highestCount) {
          highestCount = languageCount[status.language];
          highestLanguage = status.language;
        }
      }
    });
    $('tbody').html(statusHTML);

    // Create new table row to display language count information
    var languageHTML = '<tr><td colspan="4"><table class="language-table"><tr><th>Language used</th><th>Count</th></tr>';
    for (var language in languageCount) {
      languageHTML += '<tr><td>' + language + '</td><td>' + languageCount[language] + '</td></tr>';
    }
    languageHTML += '<tr><td colspan="2">Total Repositories: ' + (count || 0) + '</td></tr>';
    languageHTML += '</table></td></tr>';

    // Display highest language count information
    var highestLanguageHTML = '<tr><td colspan="4">' + userInput + ' is more proficient in ';
    var highestLanguages = Object.keys(languageCount).filter(function(language) {
      return languageCount[language] === highestCount;
    });

    if (highestLanguages.length === 1) {
      highestLanguageHTML += highestLanguage;
    } else {
      highestLanguageHTML += highestLanguages.join(', ');
    }
    
    highestLanguageHTML += '</td></tr>';
    $('tbody').append(languageHTML + highestLanguageHTML);
    $('#getUserInputBtn').remove(); // remove the existing button, so that button will not multiply when user enters new username
    
    // Create new button to allow user to enter new username
    $('body').append('<button id="getUserInputBtn" onclick="getUserInput()" style="background-color: #4CAF50; /* Green */ border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 10px;">Enter new username</button>');
    
    // Create new button to redirect to menu
    $('body').append('<button id="returnToMenuBtn" onclick="window.location.href=\' https://yogirajbshinde21.github.io/FInal-Dev-Folio/\'" style="background-color: #4CAF50; /* Green */ border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 10px;">Return to menu</button>');
  }

  // Send request
  request.send();
}

getUserInput();
