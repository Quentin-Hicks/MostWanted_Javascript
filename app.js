"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits
      searchResults = searchByTraits(people);
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor("Found " + person.firstName + " " + person.lastName + 
  " . Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
      // TODO: get person's info
      displayPerson(person);
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName === firstName && potentialMatch.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person single person object using the name they entered.
  return foundPerson[0];
}


function searchByTraits(people){

  let listOfPeople = people
  let traitCriteria = promptFor("Type a trait. Search by eyecolor, gender, height, weight.", autoValid)
  let continueSearch = true

  while(continueSearch != false){

    switch(traitCriteria){
      
      case "eyecolor":
        listOfPeople = searchByEyeColor(listOfPeople)
        displayPeople(listOfPeople)
        break;
      case "gender":
        listOfPeople = searchByGender(listOfPeople)
        displayPeople(listOfPeople)
        break;
      case "height":
        listOfPeople = searchByHeight(listOfPeople)
        displayPeople(listOfPeople)
        break;
      case "weight":
        listOfPeople = searchByWeight(listOfPeople)
        displayPeople(listOfPeople)
        break;
      default:
        return searchByTraits(people);
    }
    
    
    //displayPeople(listOfPeople)

    let user = promptFor("Would you like to search for more traits, yes or no?", autoValid)
    if(user === 'yes'){
      traitCriteria = ' '
      traitCriteria = promptFor("Type a trait. Search by eyecolor, gender, height, weight.", autoValid)
    }
    else if(user === 'no'){
      continueSearch = false
    }

  }

  app(people) //restart app
}


//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
function searchByEyeColor(people){
  let chosenEyeColor = promptFor("Please type an eye color.", autoValid);

  let foundEyeColor = people.filter(function(potentialMatch){
    if(potentialMatch.eyeColor === chosenEyeColor){
      return true;
    }
    else{
      return false;
    }
  });


  return foundEyeColor;

}

function searchByGender(people){
  let chosenGender = promptFor("Please type a gender.", autoValid);

  let foundGender = people.filter(function(potentialMatch){
    if(potentialMatch.gender === chosenGender){
      return true;
    }
    else{
      return false;
    }
  });


  return foundGender;

}

function searchByHeight(people){
  let chosenHeight = parseInt(promptFor("Please type a height.", autoValid));

  let foundHeight = people.filter(function(potentialMatch){
    if(potentialMatch.height === chosenHeight){
      return true;
    }
    else{
      return false;
    }
  });

  return foundHeight;

}

function searchByWeight(people){
  let chosenWeight = parseInt(promptFor("Please type weight.", autoValid));

  let foundWeight = people.filter(function(potentialMatch){
    if(potentialMatch.weight === chosenWeight){
      return true;
    }
    else{
      return false;
    }
  });

  

  return foundWeight;

}

// assign data to a temp variable
// ask user to select criteria to use
// use a switch case to filter data or compound if else 
// repeat until 5 criteria or user is done
// display results
// use conditional for correct function call

//TODO: add other trait filter functions here.



//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // TODO: finish getting the rest of the information to display.
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "gender: " + person.gender + "\n";
  personInfo += "dob: " + person.dob + "\n";
  personInfo += "height: " + person.height + "\n";
  personInfo += "weight: " + person.weight + "\n";
  personInfo += "eyeColor: " + person.eyeColor + "\n";
  personInfo += "occupation: " + person.occupation + "\n";
  personInfo += "currentSpouse: " + person.currentSpouse + "\n";
  personInfo += "parents: " + person.parents + "\n";
  personInfo += "id: " + person.id + "\n";
  alert(personInfo);
}

//#endregion



//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid){
  let isValid;
  do{
    var response = prompt(question).trim();
    isValid = valid(response);
  } while(response === ""  ||  isValid === false)
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input){
  
}

//#endregion