let allRecipes = [];

async function fetchRecipes() {
    try {
        const response = await fetch("recipes.json");
        allRecipes = await response.json();

        const urlParams = new URLSearchParams(window.location.search);
        const recipeId = (urlParams.get("id"));

        const recipe = allRecipes.find(r => r.id === recipeId);

        if (!recipe) {
            document.getElementById("recipe-container").innerHTML = "<p class='text-center fs-4'>המתכון לא נמצא</p>";
            return;
        }

        renderRecipe(recipe);
    } catch (error) {
        console.error("Error:", error);
    }
}

function renderRecipe(recipe) {
    const title = document.getElementById("title");
    title.innerHTML = `${recipe.title}`

    const container = document.getElementById("recipe-container");
    
    container.innerHTML = `
        <div class="row">
                <div class="col-md-8">
                    <div class="card shadow-lg">
                        <div class="card-body">
                            <h1 class="card-title text-center">${recipe.title}</h1>
                            <hr>
                            <h4>מצרכים:</h4>
                            <ul class="list-group list-group-flush">
                                ${recipe.ingredients.map(ingredient => `<li class="list-group-item">${ingredient}</li>`).join('')}
                            </ul>
                            <hr>
                            <h4>הוראות הכנה:</h4>
                            <ul class="list-group list-group-flush">
                                ${recipe.instructions.map(instruction => `<li class="list-group-item">${instruction}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 d-flex justify-content-center align-items-center mb-4">
                    <img src="${recipe.image}" class="img-fluid rounded" alt="${recipe.title}">
                </div>
            </div>
    `;
}

document.addEventListener("DOMContentLoaded", fetchRecipes);

