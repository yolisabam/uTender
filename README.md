# uTender

### Overview

Discover a new way to choose cocktails you love next time you're at happy hour, on a date or at a work event. uTender is brand new application that lets you pick alcoholic beverages based on your daily horoscope.

## Getting Started
uTender is currently deployed ot Github. After reading prerequisites,  use [this link](https://yolisabam.github.io/uTender/.) to get started.

### Prerequisites
*This application functions optimally on Google Chrome*. Please make sure you have it installed before using uTender to see all features in the best way possible.

### Instructions
1. Open the application - preferably on Google Chrome
2. Type your first name and birthday into the form
* Note: If you are under 21, the app will not let you access your horoscop or cocktail recommendations
3. Choose whether you want to see your cocktail of the day for yesterday, today or tomorrow by clicking the buttons
4. Click "get a random cocktail" to generate your cocktail of the day
5. If you want to see another cocktail, click "get a another cocktail" or "see 15 random cocktails"
6. Once you've chosen your cocktail, click "I want to make this cocktail"
7. Click "view history" to see the cocktails that have been  chosen by different


## Built With
* [Bootstrap](http://getbootstrap.com/docs/3.3/getting-started/) - The web framework used
* [FireBase](https://firebase.google.com/) - Data Management
* [AZTRO](https://aztro.readthedocs.io/en/latest/) - API used to generate daily horoscope
* [The CocktailDB](http://www.thecocktaildb.com/api.php) - Used to generate cocktail images and recipes
* [Animate CSS](https://daneden.github.io/animate.css/) - Used to generate animations
* Javascript
* JQuery
* Moment JS
* HTML
* CSS

## Relevent Code Snippets
Our motivation was to use the technical tools at our disposal to create a fluid application with two polar APIs. The following snippet of code illustrates how we were able to use the cocktail API to create a list of cocktail ingredients and dynamically display them as an unordered list in the browser.
```javascript
//create a list for the ingredients
var ul = $("<ul>");

var paragraphTag3 = $("<p>");
var paragraphTag4 = $("<p>");

ul.addClass("text-center");
paragraphTag3.addClass("text-center");
paragraphTag4.addClass("text-center");
heading2.addClass("text-center");
heading2.css("text-decoration","underline");
heading2.text("Recipe")

//put the list together
for (var i = 1; i <= 12; i++) {
var ingredientNumber = "strIngredient" + i;
var measureNumber = "strMeasure" + i;

var ingredient = response.drinks[0][ingredientNumber];
var measurement = response.drinks[0][measureNumber];

if (response.drinks[0][ingredientNumber]) {// !== "" || response.drinks[0][ingredientNumber] !== null || response.drinks[0][ingredientNumber] !== "null") {
ul.append($("<li>" + measurement + " " + ingredient + "</li>"))
}
}

paragraphTag3.text("Mixing Instructions:");
paragraphTag4.text(response.drinks[0].strInstructions);
```
## Version Control
Our team used git for version control.

### Contributing
Each team member maintained their own branch on github. We agreed to do a pull request to master daily to make sure our branches were up to date. Pull requests were approved only by other members of the team instead of the individual who made it.




## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgements
* Alex Zhen, Winfred Sunga, Sairam Jalakam, Yolisa Bam
* Chi Lu, Garret Gruessing & Jerome Chennette
* Pinterest for all visual inspiration





