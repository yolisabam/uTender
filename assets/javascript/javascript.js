//initialize variables
var firstName = "";
var dob = "";
var cocktail = "";
//var dobValidationMsg = "DOB is not in proper format!";
var age = 0;


//submit button click listener
$("#startAssesment").on("click", function(){
  //prevent page from refreshing
  event.preventDefault();

  //remove the p tag if it exists
  $("#dob-validation-msg").remove();

  //grab the dob provided by user
  firstName = $("#name-input").val().trim();
  dob = $("#birth-input").val().trim();
  dobMoment = moment(dob).format("MM DD YYYY");
  age = moment().diff(dobMoment, "years");
  
  console.log("firstName : " + firstName);
  console.log("dob : " + dob);
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
    //empty out anything inside a row div
    $(".panel").empty();
  }


});