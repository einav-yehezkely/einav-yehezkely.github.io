let allRecipes = [];


async function fetchRecipes() {
    try {
        const response = await fetch("recipes.xlsx"); // טוען את קובץ ה-Excel
        const arrayBuffer = await response.arrayBuffer(); // ממיר לבינארי

        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const sheetName = workbook.SheetNames[0]; // בחירת הגיליון הראשון
        const sheet = workbook.Sheets[sheetName];

        allRecipes = XLSX.utils.sheet_to_json(sheet); // המרה למערך של אובייקטים

        const urlParams = new URLSearchParams(window.location.search);
        const recipeId = urlParams.get("id");

        const recipe = allRecipes.find(r => r.id == recipeId);

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
    title.innerHTML = `${recipe.title}`;

    const container = document.getElementById("recipe-container");
    // console.log(ingredients1[0])

    container.innerHTML = `
        <div class="row ${recipe.image ? '' : 'justify-content-center'}">
        <div class="${recipe.image ? 'col-md-8' : 'col-md-8 mx-auto'}">
            <div class="card shadow-lg">
                <div class="card-body">
                    <h1 class="card-title text-center">${recipe.title}</h1>
                    <hr>
                    <h4>מצרכים</h4>
                    <ul class="list-group list-group-flush">
                        ${recipe.ingredients.split("|").map(ingredient => `<li class="list-group-item">${ingredient.trim()}</li>`).join('')}
                    </ul>
                    ${recipe.ingredients1 ? `
                        <h6>${recipe.ingredients1.split("|")[0]}</h6>
                        
                        <ul class="list-group list-group-flush">
                            ${recipe.ingredients1.split("|").slice(1).map(ingredient => `<li class="list-group-item">${ingredient.trim()}</li>`).join('')}
                        </ul>
                    ` : ''}
                    <hr>
                    <h4>הוראות הכנה</h4>
                    <ul class="list-group list-group-flush">
                        ${recipe.instructions.split("|").map(instruction => `<li class="list-group-item">${instruction.trim()}</li>`).join('')}
                    </ul>
                    ${recipe.notes ? `
                    <hr>
                    <h5>הערות</h5>
                    <p>${recipe.notes}</p>
                    ` : ''}
                </div>
            </div>
        </div>
    ${recipe.image ? `
    <div class="col-md-4 d-flex justify-content-center align-items-center mt-md-0 mt-3">
        <img src="${recipe.image}" class="img-fluid rounded" alt="${recipe.title}">
    </div>
    ` : ''}
</div>
    `;
}


document.addEventListener("DOMContentLoaded", fetchRecipes);

// סה\"כ