BASE_URL = "https://my-awesome-shopping-list-app.herokuapp.com/";
var availableMeals = document.querySelector("#available-meals");


// GET ONE
var addMealToShoppingList = function(id){
    var url = BASE_URL + "meals/" + id;
    fetch(url,{
        credentials: "include"
    }).then(function (response) {
        response.json().then(function(data) {
           meal = data;
           
           var groceryList = document.querySelector("#grocery-list");
            
           // Add the name of the meal to the list
            var groceryItemTitle = document.createElement("li");
            groceryItemTitle.innerHTML = meal.name;
            groceryItemTitle.style.fontSize = '1rem';
            groceryItemTitle.style.fontWeight = 'bold';
            groceryItemTitle.style.padding = '20px 0 0 0';
            groceryList.appendChild(groceryItemTitle);


            // Add the ingredients of the meal to the list
            var groceryItemIngredients = document.createElement("li");
            groceryItemIngredients.innerHTML = "Ingredients: " + meal.ingredients;
            groceryList.appendChild(groceryItemIngredients);
        });
    });
};

// GET 
var getData = function(){
    MEALS = [];
    fetch(BASE_URL + "meals",{
        credentials: "include"
    }).then(function (response) {
        if(response.status == 200){
            response.json().then(function(data) {
                MEALS = data;
                availableMeals.innerHTML = "";
                for(i=0; i < MEALS.length; i++) {
                    addMealToMenu(MEALS[i]);
                }

                
                var loginDiv = document.querySelector("#login-div")
                loginDiv.style.display = "none";   
        
                var addMenuItemDiv = document.querySelector(".add-item-div")
                addMenuItemDiv.style.display = "flex";
                var menuDiv = document.querySelector("#menu-div")
                menuDiv.style.display = "block";
                var groceryListDiv = document.querySelector("#grocery-list-div")
                groceryListDiv.style.display = "block";
            });
        }
    });
};

getData();

var addMealToMenu = function(meal){
    var currentMeal = meal
    var menuItem = document.createElement("li");

    var detailsDiv = document.createElement("div");

    var title = document.createElement("p");
    title.innerHTML = currentMeal.name;
    title.style.fontSize = '1rem';
    title.style.display = "block";

    var details = document.createElement("p");
    details.innerHTML = currentMeal.cusine + " | " + currentMeal.meal_type + " | " + currentMeal.difficulty;
    details.style.fontSize = '.75rem';
    details.style.display = "block";

    detailsDiv.appendChild(title);
    detailsDiv.appendChild(details);

    var buttonDiv = document.createElement("div");

    var addButton = document.createElement("button");
    addButton.innerHTML = "+"
    addButton.classList.add("menu-item-button");
    addButton.onclick = function (){
        addMealToShoppingList(currentMeal.id);
    }

    var editButton = document.createElement("button");
    editButton.innerHTML = "Edit"
    editButton.classList.add("menu-item-button");
    editButton.onclick = function (){
        editMeal(currentMeal.id);
    }

    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "delete";
    deleteButton.classList.add("menu-item-button");
    deleteButton.onclick = function (){
        deleteMeal(currentMeal.id);
    }

    buttonDiv.appendChild(addButton);
    buttonDiv.appendChild(editButton);
    buttonDiv.appendChild(deleteButton);
    menuItem.appendChild(detailsDiv);
    menuItem.appendChild(buttonDiv);
    availableMeals.appendChild(menuItem);
}




// POST
var addNewMenuItemBtn = document.querySelector("#add-new-menu-item-btn");
addNewMenuItemBtn.onclick = function() {
    // inputField.value
    var newMenuItemNameInput = document.querySelector("#new-menu-item-name-input");
    var newMenuItemName = newMenuItemNameInput.value;

    var newMenuItemCuisineInput = document.querySelector("#new-menu-item-cuisine-input");
    var newMenuItemCuisine = newMenuItemCuisineInput.value;

    var newMenuItemMealTypeSelector = document.querySelector("#new-menu-item-meal-type-selector");
    var newMenuItemMealType = newMenuItemMealTypeSelector.value;

    var newMenuItemDifficultySelector = document.querySelector("#new-menu-item-difficulty-selector");
    var newMenuItemDifficulty = newMenuItemDifficultySelector.value;

    var newMenuItemIngredientsInput = document.querySelector("#new-menu-item-ingredients-input");
    var newMenuItemIngredients = newMenuItemIngredientsInput.value;
    var bodyStr = 
                    "name=" + encodeURIComponent(newMenuItemName) + 
                    "&cuisine=" + encodeURIComponent(newMenuItemCuisine) + 
                    "&meal_type=" + encodeURIComponent(newMenuItemMealType) +
                    "&difficulty=" + encodeURIComponent(newMenuItemDifficulty) +  
                    "&ingredients=" + encodeURIComponent(newMenuItemIngredients);

    fetch(BASE_URL + "meals", {
        method: "POST",
        credentials: "include",
        body: bodyStr,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function(response){
        // handle the response
        console.log("Server is responding")
        getData();
    });
    document.querySelector("#new-menu-item-name-input").value = "";
    document.querySelector("#new-menu-item-cuisine-input").value = "";
    document.querySelector("#new-menu-item-ingredients-input").value = "";
    document.querySelector("#new-menu-item-meal-type-selector").value = "";
    document.querySelector("#new-menu-item-difficulty-selector").value = "";
};

// DELETE
var deleteMeal = function(id){
    var url = BASE_URL + "meals/" + id;
    fetch( url, {
        method: "DELETE",
        credentials: "include",
    }).then( function( response ){
        if( response.status == 200 ){
            console.log( "It worked" );
            getData();
        } else if ( response.status == 400 ) {
                alert("failed");
        }
    })
};

// PUT
var editMeal = function(id){
    var url = BASE_URL + "meals/" + id;
    fetch(url, {
        credentials: "include"
    }).then(function (response) {
        response.json().then(function(data) {
            meal = data;
            
            // query input feilds
            var newMenuItemNameInput = document.querySelector("#new-menu-item-name-input");
            var newMenuItemCuisineInput = document.querySelector("#new-menu-item-cuisine-input");
            var newMenuItemIngredientsInput = document.querySelector("#new-menu-item-ingredients-input");
            var newMenuItemMealTypeSelector = document.querySelector("#new-menu-item-meal-type-selector");
            var newMenuItemDifficultySelector = document.querySelector("#new-menu-item-difficulty-selector");

            // populate input feilds 
            newMenuItemNameInput.value = meal.name;
            newMenuItemCuisineInput.value = meal.cusine;
            newMenuItemIngredientsInput.value = meal.ingredients;
            newMenuItemMealTypeSelector.value = meal.meal_type;
            newMenuItemDifficultySelector.value = meal.difficulty;

            // change button innerHTML
            var updateButton = document.querySelector("#update-menu-item-btn");
            updateButton.style.display = "inline-block";
            addNewMenuItemBtn.style.display = "none";

            // Call update with edited feilds
            updateButton.onclick = function(){
                var bodyStr = 
                    "name=" + encodeURIComponent(newMenuItemNameInput.value) + 
                    "&cuisine=" + encodeURIComponent(newMenuItemCuisineInput.value) + 
                    "&meal_type=" + encodeURIComponent(newMenuItemMealTypeSelector.value) +
                    "&difficulty=" + encodeURIComponent(newMenuItemDifficultySelector.value) +  
                    "&ingredients=" + encodeURIComponent(newMenuItemIngredientsInput.value) +
                    "&id=" + encodeURIComponent(meal.id);
                
                fetch(url, {
                    method: "PUT",
                    credentials: "include",
                    body: bodyStr,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }).then(function(response){
                    // handle the response
                    if(response.status == 200){
                        console.log("It worked");
                        newMenuItemNameInput.value = "";
                        newMenuItemCuisineInput.value = "";
                        newMenuItemIngredientsInput.value = "";
                        newMenuItemMealTypeSelector.value = "";
                        newMenuItemDifficultySelector.value = "";
                        updateButton.style.display = "none";
                        addNewMenuItemBtn.style.display = "inline-block";
                        getData();
                    } else if ( response.status == 404 ) {
                            alert("Failed");
                    }
                });
            };
                
        });
    });
};

var signUpLink = document.querySelector("#sign-up-btn");
signUpLink.onclick = function(){
    var registerDiv = document.querySelector("#register-div");
    registerDiv.style.display = "flex";
    var loginDiv = document.querySelector("#login-div");
    loginDiv.style.display = "none";
}

var loginLink = document.querySelector("#login-btn");
loginLink.onclick = function(){
    var registerDiv = document.querySelector("#register-div");
    registerDiv.style.display = "none";
    var loginDiv = document.querySelector("#login-div");
    loginDiv.style.display = "flex";
}

// Register
var registerBtn = document.querySelector("#register-btn");
registerBtn.onclick = function(){
    var firstname = document.querySelector("#signup-first-name-input").value
    var lastname = document.querySelector("#signup-last-name-input").value
    var email = document.querySelector("#signup-email-input").value
    var password = document.querySelector("#signup-password-input").value

    var bodyStr = 
        "first_name=" + encodeURIComponent(firstname) + 
        "&last_name=" + encodeURIComponent(lastname) + 
        "&email=" + encodeURIComponent(email) +
        "&password=" + encodeURIComponent(password);

    fetch(BASE_URL + "users", {
        method: "POST",
        credentials: "include",
        body: bodyStr,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function(response){
        if(response.status == 201){
            var registerDiv = document.querySelector("#register-div");
            registerDiv.style.display = "none";
            var loginDiv = document.querySelector("#login-div");
            loginDiv.style.display = "flex";
            alert("You are now registered")
        } else {
            alert("Email already exists")
        }
    });    
}

// Authenticate 
var loginBtn = document.querySelector("#authenticate-btn");
loginBtn.onclick = function(){
    var email = document.querySelector("#login-email-input").value
    var password = document.querySelector("#login-password-input").value
    var bodyStr = 
                "email=" + encodeURIComponent(email) + 
                "&password=" + encodeURIComponent(password);

    fetch(BASE_URL + "sessions", {
        method: "POST",
        credentials: "include",
        body: bodyStr,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function(response){
        // handle the response
        if(response.status == 200){
           getData();
        } else if(response.status == 401){
            alert("Incorrect Email or Password");
        }
    });
}

