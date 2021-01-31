const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    mealsEl = document.getElementById('meals'),
    resultHeading = document.getElementById('result-heading'),
    singleMealEl = document.getElementById('single-meal')

//search Meal fetch API
    function searchMeal(e){
        e.preventDefault()

        singleMealEl.innerHTML = ''

        const term = search.value
        if(term.trim()){
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
                .then(res => res.json())
                .then(data =>{
                    console.log(data)
                    resultHeading.innerHTML = `<h2>Search results for '${term}'</h2>`
                    if(data.meals === null){
                        resultHeading.innerHTML = `The entered meal is not present, Please try again!`
                    }
                    else{
                        mealsEl.innerHTML = data.meals.map(meal =>
                            `<div class='meal'>
                            <div class="meal-info" id="${meal.idMeal}">
                                    <h3>${meal.strMeal}</h3>
                                </div>
                                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                                
                            </div>`
                        )
                        .join('')
                    }
                    
                })
                search.value=''
        }else{
            alert('Please enter the meal')
        }
    }
    //fetch meal by Id func
    function getMealById(mealId){
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
            .then(res => res.json())
            .then(data =>{
                const meal = data.meals[0]

                addMealToDom(meal)
            }) 
    }
    //fetch random meal by ID
    function randomMeal(){
        //clera meals
        mealsEl.innerHTML =''
        resultHeading.innerHTML= ''

        fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
            .then(res => res.json())
            .then(data =>{
               const meal = data.meals[0]

               addMealToDom(meal)
            })
    }
    //add meal to DOM
    function addMealToDom(meal){
        const ingredients = []

        for(let i=1; i<=20; i++){
            if(meal[`strIngredient${i}`]){
                ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strIngredient${i}`]}`)
            }else{
                break
            }
        }
       singleMealEl.innerHTML = `
        <div class="singleMeal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div class="single-meal-info">
            ${meal.strCategory ? `<p> ${meal.strCategory}</p>`:''}
            ${meal.strArea ? `<p> ${meal.strArea}</p>`:''}
        </div>
        <div class="main">
            <p>${meal.strInstructions}</p>
            <h2>Ingredients</h2>
            <ul>
                ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
        </div
        </div>
       `
    }

    //Event Listeners

    submit.addEventListener('submit',searchMeal)
    random.addEventListener('click',randomMeal)

    mealsEl.addEventListener('click',e =>{
        const mealInfo = e.path.find(item =>{
           if(item.classList){
               return item.classList.contains('meal-info')
           }else{
               return false
           }
        })
      const mealId = mealInfo.getAttribute('id')
      getMealById(mealId)
    })
