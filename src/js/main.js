const searchBtn = document.getElementById("search-recipes");
const mealSearchResults = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");

// event listenenr for the search button

searchBtn.addEventListener("click", searchRecipe);
mealSearchResults.addEventListener("click", recipes);



// function for the search button
function searchRecipe() {
  let searchText = document.getElementById("search-Input").value;
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let bodyOfResult = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          bodyOfResult += `
          <div class = "meal-item" data-id =${meal.idMeal} >
            <div class = "meal-img">
              <img src =${meal.strMealThumb} alt = "food">
            </div>
            <div class = "meal-name" >
              <h3>${meal.strMeal}</h3>
            <p class="catego"></p>
               <a href = "#recipe" class = "recipe-btn">Get Recipe</a>
            </div>
          </div>
            `;
        });
        mealSearchResults.classList.remove("notAvail");
      } else {
        bodyOfResult = "Sorry , Not available";
        mealSearchResults.classList.add('notFound');
      }
      mealSearchResults.innerHTML = bodyOfResult;
    });
}

// function for the recipe button
function recipes(e, item) {
  e.preventDefault();
  if (e.target.classList.contains("recipe-btn")) {
    item = e.target.parentElement.parentElement;
    console.log(item);
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item.dataset.id}`
    )
      .then((res) => res.json())
      .then((data) => {
        mealRecipes(data.meals);
      });
  }
}

function mealRecipes(meal) {
  console.log(meal);
  meal = meal[0];
 
  let recipeDisplay = `
<h2 class = "recipe-title">${meal.strMeal}</h2>
<p class = "recipe-category">${meal.strCategory}</p>
<div class = "recipe-instruct">
    <h3>Instructions:</h3>
    <p>${meal.strInstructions}</p>
</div>
<div class = "recipe-meal-img">
    <img src = "${meal.strMealThumb}" alt = "">
</div>
<div class = "recipe-link">
    <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
</div>
`;
  mealDetailsContent.innerHTML = recipeDisplay;
  mealDetailsContent.parentElement.classList.add('showRecipe');
}
