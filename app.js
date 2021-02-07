const search = document.getElementById('meal-search');
const submit = document.getElementById('submit');
const meals = document.getElementById('meals');
const resultHeading = document.getElementsByClassName('result-heading');
const singleMeal = document.getElementById('single-meal');


function searchMeals(e){
    e.preventDefault();

    singleMeal.innerHTML ="";

    // console.log(search.value);
    const searchElement = search.value;


    if(searchElement.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchElement}`
        ).then(res => res.json())
        .then((data) => {
            resultHeading.innerHTML = `<h2>Search Result for ${searchElement}`;
            if(data.meals === null){
                resultHeading.innerHTML = `<h2>There Are No Result for ${searchElement}`;
            }else{
                meals.innerHTML = data.meals.map(
                    meal => `
                    
                    <div class="card">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <div class="card-body">
                    <div class="meal-info" data-mealID="${meal.idMeal}">
                    <h3>${meal.strMeal}</h3> 
                    </div>
                    </div>
                    </div>`
                )
                .join("");
            }
        });

    }else{
        alert("Please enter Something");
    }

    
}
function getMealById(mealID){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
    ).then(res => res.json()).then(data =>{
        console.log(data);
        const meal = data.meals[0];
        mealDetailView(meal);
    });
}
function mealDetailView(meal){
    const ingredients = [];
    for(let i = 0; i <=20; i++){
       if(meal[`strIngredient${i}`]) {
           ingredients.push(
               `${meal[`strIngredient${i}`]} 
            }`
         );

       } else{
           break;
       }
    
    }
    singleMeal.innerHTML =`

    <div class="single-meal">
    
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <div class="main">
    <h1>${meal.strMeal}</h1> 
    <h3>Ingredients</h3>
    <ul>
    ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
    </ul>
    </div>
    </div>
    `;
}





// listener
submit.addEventListener('submit', searchMeals);
meals.addEventListener('click', (e) => {
    const mealInfo = e.path.find((item) => {
        if(item.classList){
            return item.classList.contains("meal-info");
        }else{
            return false;
        }
    });
    if(mealInfo){
        const mealID = mealInfo.getAttribute("data-mealid");
        getMealById(mealID);
    }
} )


























// fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
// .then(res => res.json())
// .then(data => displayFoods(data));


// // const displayFoods = foods => {
// //   console.log(foods);
// // }
// const displayFoods = foods => {
//     const ul = document.getElementById('foods');
//     for (let i = 0; i < foods.length; i++) {
//         const food = foods[i];
//         const li = document.createElement('li');
//         li.innerText = food.meals;
//         // console.log(food.meals);
//         ul.appendChild(li);
        
//     }
//   }