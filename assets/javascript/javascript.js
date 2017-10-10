//initialize variables
var firstName = "";
var dob = "";
var age = 0;
var cocktail = "";
var zodiacSign = "";
var cockTailDBURL = "http://www.thecocktaildb.com/api/json/v1/1/random.php";

//submit button click listener
$("#startAssesment").on("click", function(){
  //prevent page from refreshing
  event.preventDefault();

  //remove the p tag if it exists
  $("#dob-validation-msg").remove();
  $("#firstName-validation-msg").remove();

  //grab the dob provided by user
  firstName = $("#name-input").val().trim();
  dob = $("#birth-input").val().trim();
  dobMoment = moment({month : parseInt(dob.split("-")[1] - 1), day : parseInt(dob.split("-")[2]), year : parseInt(dob.split("-")[0])}).format("MM DD YYYY");
  age = moment().diff(dobMoment, "years");
  
  console.log("firstName : " + firstName);
  console.log("dob : " + dob);
  console.log("dob moment: " + dobMoment);
  console.log("age : " + age);

  //validate if first name was provided
  if (firstName === "") {
    var validation = $("<p>").attr("id", "firstName-validation-msg").text("Please provide your first name!");
    
    //display the validation message
    $("#name-label").append(validation);
  }
  //validate if the dob is in the proper format, the front-end framework will return an empty string as the value if the improper format is provided
  else if (dob === "" || dob.toLowerCase() === "invalid date" ||dob.split("/")[0] === "" || dob.split("/")[1] === "" || dob.split("/")[2]) {
    //create a new p tag and the validation message
    var validation = $("<p>").attr("id", "dob-validation-msg").text("DOB is not in proper format!");
    
    //display the validation message  between the dob label and input text box
    $("#dob-label").append(validation);
  } 
  //else if the user is < 21, they cannot use the app
  else if (age < 21) {
    var validation = $("<p>").attr("id", "dob-validation-msg").text("You are too young to be drinking cocktails, " + firstName + "!");
    
    //display underage notification 
    $("#dob-label").append(validation); 
  } //else move on to next page 
  else {
    //empty out anything inside row div
    $(".row").empty();

    //create the grid
    var col1 = $("<div>").addClass("col-md-2");
    var col2 = $("<div>").addClass("col-md-8").attr("id", "div-content");
    var col3 = $("<div>").addClass("col-md-2");

    //append 3 cols inside the parent row
    $(".row").append(col1);
    $(".row").append(col2)
    $(".row").append(col3);

    //create 2 rows inside col2
    var col2Row0 = $("<div>").addClass("row").attr("id", "row0");
    var col2Row1 = $("<div>").addClass("row").attr("id", "row1");
    var col2Row2 = $("<div>").addClass("row").attr("id", "row2");
    var col2Row3 = $("<div>").addClass("row").attr("id", "row3");
    var col2Row4 = $("<div>").addClass("row").attr("id", "row4");

    
    //append the 2 rows inside div content
    $("#div-content").append(col2Row0, col2Row1, col2Row2, col2Row3, col2Row4);

    //grab row 1 of col 2 and add 2 cols inside,
    col1 = $("<div>").addClass("col-md-6").attr('id','row1-col1');
    col2 = $("<div>").addClass("col-md-6").attr('id','row1-col2');

    $("#row1").append(col1, col2);

    //get the zodiac sign based on dob
    zodiacSign = getZodiacSign(dob);
    console.log(zodiacSign);

    //display zodiac sign
    //$("#row1").empty();
    $("#row0").append("<h3>Hello " + zodiacSign + "!</h3>");

    //display zodiac image
    //$("#row2").empty();
    var img = $("<img>");
    img.attr("src", getZodiacImageURL(zodiacSign)).attr("alt", zodiacSign + " thumbnail").attr("id", "img-zodiac");

    $("#row1-col1").append(img);
  
    //display horoscope details  
    //create variables
    var color = "";
    var compatibility = "";
    var horoscope = "";
    var luckyNumber = "";
    var luckyTime = "";
    var mood = "";

    //create placeholders for horoscope info
    var p1 = $("<p>").attr("id", "date");
    var p2 = $("<p>").attr("id", "color");
    var p3 = $("<p>").attr("id", "compatibility");
    var p4 = $("<p>").attr("id", "horoscope");
    var p5 = $("<p>").attr("id", "lucky-number");
    var p6 = $("<p>").attr("id", "lucky-time");
    var p7 = $("<p>").attr("id", "mood");

    //$("#row3").empty();
    //$("#col2-row3").append(p1, p2, p3, p4, p5, p6, p7);
    $("#row1-col2").append(p1, p2, p3, p5, p6, p7);
    $("#row2").append(p4);

    var day = "today";
    var queryURL = "https://aztro.herokuapp.com?sign=" + zodiacSign + "&day=" + day;

    $.ajax({
      method : "POST",
      url : queryURL
    }).done(function(response){
      // console.log(response);
      // console.log(response.description);
      $("#date").text('Date : ' + response.current_date);
      $("#color").text('Color : ' + response.color);
      $("#compatibility").text('Compatibility : ' + response.compatibility);
      $("#horoscope").text('Horoscope : ' + response.description);
      $("#lucky-number").text('Lucky Number : ' + response.lucky_number);
      $("#lucky-time").text('Lucky Time : ' + response.lucky_time);
      $("#mood").text('Mood : ' + response.mood);
    });

    //display yesterday, today and tomorrow buttons

    //creat the divs for the buttons
    var col1Div = $("<div>");
    col1Div.addClass("col-xs-4");
    col1Div.attr("id", "col-div-1");

    var col2Div = $("<div>");
    col2Div.addClass("col-xs-4");
    col2Div.attr("id", "col-div-2");

    var col3Div = $("<div>");
    col3Div.addClass("col-xs-4");
    col3Div.attr("id", "col-div-3");

    //$("#row4").empty();
    $("#row4").append(col1Div, col2Div, col3Div);

    //create the yesterday button
    var btnYest = $("<button>");
    btnYest.addClass("btn btn-default btn-day");
    btnYest.attr("id", "btn-yest");
    btnYest.attr("type", "submit");
    btnYest.attr("data-text", "yesterday");
    btnYest.text("Yesterday");

    //append the yesterday button
    $("#row3").append(btnYest);

    //create the today button
    var btnToday = $("<button>");
    btnToday.addClass("btn btn-default btn-day");
    btnToday.attr("id", "btn-today");
    btnToday.attr("type", "submit");
    btnToday.attr("data-text", "today");
    btnToday.text("Today");

     //append the today button
    $("#row3").append(btnToday);

    //create the tomorrow button
    var btnTomorrow = $("<button>");
    btnTomorrow.addClass("btn btn-default btn-day");
    btnTomorrow.attr("id", "btn-tomorrow");
    btnTomorrow.attr("type", "submit");
    btnTomorrow.attr("data-text", "tomorrow");
    btnTomorrow.text("Tomorrow");

    //append the tomorrow button
    $("#row3").append(btnTomorrow);

    //display random cocktail button
    var btnRandom = $("<button>");
    btnRandom.addClass("btn btn-default btn-get-random");
    btnRandom.attr("id", "btn-random");
    btnRandom.attr("type", "submit");
    btnRandom.text("Get A Random Cocktail");

    // $("#row5").append($("<div class='col-xs-12' id='col-btn-random'>"));
    $("#row4").append(btnRandom);

  }

  //listener for yesterday, today and tomorrow buttons
  $(document).on("click", ".btn-day", function() {
    //prevent page from refreshing
    event.preventDefault();
    day = $(this).attr("data-text");

    //set the query url
    var queryURL = "https://aztro.herokuapp.com?sign=" + zodiacSign + "&day=" + day;
    //ajax get call
    $.ajax({
      method : "POST",
      url : queryURL
    }).done(function(response){
      //console.log(response);
      // console.log(response.description);
      $("#date").text('Date : ' + response.current_date);
      $("#color").text('Color : ' + response.color);
      $("#compatibility").text('Compatibility : ' + response.compatibility);
      $("#horoscope").text('Horoscope : ' + response.description);
      $("#lucky-number").text('Lucky Number : ' + response.lucky_number);
      $("#lucky-time").text('Lucky Time : ' + response.lucky_time);
      $("#mood").text('Mood : ' + response.mood);
    });
    //console.log("I clicked : " + day);
  });

  //listener for load cocktail selection button
  //$(document).on("click", ".btn-cocktail-selection", function(){
  $(document).on("click", "#cocktail-database", function(){  
    //empty out the row to be replaced with new stuff
    $(".row").empty();

    //create the grid
    var col1 = $("<div>").addClass("col-xs-12 col-sm-12 col-md-2");
    var col2 = $("<div>").addClass("col-xs-12 col-sm-12 col-md-8").attr("id", "div-content");
    var col3 = $("<div>").addClass("col-xs-12 col-sm-12 col-md-2");

    //create 4rows inside col2
    col2.append($("<div class='row' id='col2-row1'></div"));
    col2.append($("<div class='row' id='col2-row2'></div"));
    col2.append($("<div class='row' id='col2-row3'></div"));
    col2.append($("<div class='row' id='col2-row4'></div"))

    $(".row").append(col1, col2, col3);

    //ajax get request to get a list of all cocktails
    queryURL = "http://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail";

    $.ajax({
      method : "GET",
      url : queryURL
    }).done(function(response) {
      var length = response.drinks.length;

      // console.log(response);
      // console.log(response.length);
      // console.log(response.drinks[0].strDrinkThumb);
      
      var cocktail = "";
      var cocktailImageURL = "";

      for (var i = 0; i < 15; i++) {
        //get a random 16 cocktails
        var index = Math.floor(Math.random * (length));
        console.log("imageURL " + i + " :" + response.drinks[i].strDrinkThumb);
        cocktail = response.drinks[i].strDrink;
        cocktailImageURL = response.drinks[i].strDrinkThumb;
        

        //append the column in the appropriate row

        var img = $("<img>");
        img.attr("src", cocktailImageURL);
        img.attr("alt", cocktail);
        img.addClass("img-cocktail-thumbnail");
       $("#div-content").append(img);
      }
    });

  });

  function getZodiacSign(date) {
    var mmdd = parseMMDD(date);
    mmdd = parseInt(mmdd);

    console.log(mmdd);

    if (mmdd >= 321 && mmdd <= 419) {
      return "Aries";
    } else if (mmdd >= 420 && mmdd <= 520) {
      return "Taurus";
    } else if (mmdd >= 521 && mmdd <= 620) {
      return "Gemini";
    } else if (mmdd >= 621 && mmdd <= 722) {
      return "Cancer";
    } else if (mmdd >= 723 && mmdd <= 822) {
      return "Leo";
    } else if (mmdd >= 823 && mmdd <= 922) {
      return "Virgo";
    } else if (mmdd >= 923 && mmdd <= 1022) {
      return "Libra";
    } else if (mmdd >= 1023 && mmdd <= 1121) {
      return "Scorpio";
    } else if (mmdd >= 1122 && mmdd <= 1221) {
      return "Sagittarius";
    } else if ( (mmdd >= 1222 && mmdd <= 1231) || (mmdd >= 101 && mmdd <= 119)) {
      return "Capricorn";
    } else if (mmdd >= 120 && mmdd <= 218) {
      return "Aquarius";
    } else if (mmdd >= 219 && mmdd <= 320) {
      return "Pisces";
    } else {
      return 'error!';
    }
  }

  function parseMMDD(date) {
    var mm = date.split("-")[1];
    var dd = date.split("-")[2];

    return mm + dd;
  }

function getZodiacImageURL(zodiac) {

  var zodiacImageURL = "http://www.astrology-zodiac-signs.com/images/" + zodiac + "-w.png";
 
  return zodiacImageURL;
}

});


$(document).on("click", ".btn-get-random",function(){

  $(".row").empty();  
  callAjaxForCocktail();
  //renderElementsForRandomCoctail();
});

$(document).on("click",".btn-day1",function(){

  $(".row").empty();  
  callAjaxForCocktail();

});


function callAjaxForCocktail(){

  $.ajax({

  method:"GET",

  url:cockTailDBURL

  }).done(function(response){

  console.log(response);

  console.log(response.drinks[0].strDrink);

  renderElementsForRandomCoctail(response);

  console.log(response.drinks[0].strDrinkThumb);
  });
}

function renderElementsForRandomCoctail(response){

    var divContainer = $("<div>");

    divContainer.addClass("container");

    var divRow = $("<div>");

    divRow.addClass("row");

    var divImage =  $("<div>");

    divImage.addClass("col-lg-12");

    imageTag = $("<img>");
    
    imageTag.addClass("img-responsive img-center center-block");
    
    imageTag.attr("src",response.drinks[0].strDrinkThumb);

    imageTag.css("width","300px");

    imageTag.css("height","300px");

    var cocktailNameDiv =   $('<div>');

    var heading1 = $("<h1 class ='text-center'>");

    heading1.text(response.drinks[0].strDrink);

    var paragraphDiv = $('<div>');

    paragraphDiv.addClass("row");

    var paragraphDivSize = $('<div>');

    paragraphDivSize.addClass("col-lg-12");

    var buttonDiv = $("<div>");

    buttonDiv.addClass("container");

    var buttonRow = $("<div>");

    buttonRow.addClass("row")

    var buttonRowSize = $("<div>");

    buttonRowSize.addClass("col-lg-12").attr("id","col12");

    var buttonPopulateSize = $("<div>");

    buttonPopulateSize.addClass("col-lg-12").attr("id","col12");

    var heading2 = $("<h2>");
    //var paragraphTag1 = $("<p>");
    //var paragraphTag2 = $("<p>");

    //create a list for the ingredients
    var ul = $("<ul>");

    //
    var paragraphTag3 = $("<p>");
    var paragraphTag4 = $("<p>");


    //paragraphTag1.addClass("text-center");
    //paragraphTag2.addClass("text-center");

    ul.addClass("text-center");
    paragraphTag3.addClass("text-center");
    paragraphTag4.addClass("text-center");
    heading2.addClass("text-center");
    heading2.css("text-decoration","underline");
    heading2.text("Recipe")

    

    //put the list together
    for (var i = 1; i <= 15; i++) {
      var ingredientNumber = "strIngredient" + i;
      var measureNumber = "strMeasure" + i;

      console.log("ingredientNumber : " + ingredientNumber);
      console.log("measureNumber : " + measureNumber);

      var ingredient = response.drinks[0][ingredientNumber];
      var measurement = response.drinks[0][measureNumber];

      console.log("ingredient : " + ingredient);
      console.log("measurement : " + measurement);

      if (response.drinks[0][ingredientNumber] !== "") {
        ul.append($("<li>" + measurement + " " + ingredient + "</li>"))
      }
    }

    //paragraphTag1.text("Main Ingredients : " + response.drinks[0].strIngredient1 + " , " + response.drinks[0].strIngredient2 + " and " + response.drinks[0].strIngredient3);
    //paragraphTag2.text("take " + response.drinks[0].strMeasure1 + " " + response.drinks[0].strIngredient1 + " , " +response.drinks[0].strMeasure2 + " " + response.drinks[0].strIngredient2 + " and " + response.drinks[0].strMeasure3 + " " + response.drinks[0].strIngredient3 + ".");
    paragraphTag3.text("Mixing Instructions:");
    paragraphTag4.text(response.drinks[0].strInstructions);

    var anotherRandomCocktail = $("<button>");
    anotherRandomCocktail.addClass("btn btn-default btn-day1");
    anotherRandomCocktail.attr("id", "another-random-cocktail");
    anotherRandomCocktail.attr("type", "submit");

    // anotherRandomCocktail.attr("data-text", "generate another coctail for you?");
    // anotherRandomCocktail.text("generate another coctail for you?");
    anotherRandomCocktail.attr("data-text", "Lets generate another random drink");
    anotherRandomCocktail.text("Lets generate another random drink");  

    var cocktailDataBase = $("<button>");
    cocktailDataBase.addClass("btn btn-default btn-day2");
    cocktailDataBase.attr("id", "cocktail-database");
    cocktailDataBase.attr("type", "submit");

    // cocktailDataBase.attr("data-text", "Check out the drinks that suits you");
    // cocktailDataBase.text("Check out the drinks that suits you");
    cocktailDataBase.attr("data-text", "Or pick from random 15");
    cocktailDataBase.text("Or pick from random 15");

    var addToFireBase = $("<button>");
    addToFireBase.addClass("btn btn-default btn-day3");
    addToFireBase.attr("id", "cocktail-database");
    addToFireBase.attr("type", "submit");
    addToFireBase.attr("data-text", "Awesome! I will make this drink");
    addToFireBase.text("Awesome! I will make this drink");
    //paragraph

    divImage.append(imageTag);
    cocktailNameDiv.append(heading1);
    divImage.append(cocktailNameDiv);
    cocktailNameDiv.append(heading2);

    //add the ingredients list
    cocktailNameDiv.append(ul);

    //cocktailNameDiv.append(paragraphTag1);
    //cocktailNameDiv.append(paragraphTag2);
    cocktailNameDiv.append(paragraphTag3);
    cocktailNameDiv.append(paragraphTag4)
    
    cocktailNameDiv.append(buttonDiv);
    buttonDiv.append(buttonRow);
    buttonRow.append(buttonPopulateSize);
    buttonPopulateSize.append(anotherRandomCocktail);

    buttonDiv.append(buttonRow);
    buttonRow.append(buttonPopulateSize);
    buttonPopulateSize.append(cocktailDataBase);

    buttonDiv.append(buttonRow);
    buttonRow.append(buttonPopulateSize);
    buttonPopulateSize.append(addToFireBase);
    
    divRow.append(divImage);

    divContainer.append(divRow);

    //remove the row to be replaced by new stuff
    $(".row").remove();

    //add the new stuff
    $(".app-container").append(divRow);
    //$(".row").append(divContainer);



}