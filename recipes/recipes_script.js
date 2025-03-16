let allRecipes = [];
let currentCategory = "all";
let searchTerm = ""; 

async function fetchRecipes() {
    try {
        const response = await fetch("recipes.json");
        allRecipes = await response.json();

        const urlParams = new URLSearchParams(window.location.search);
        currentCategory = urlParams.get("category") || "all";

        renderRecipes();
    } catch (error) {
        console.error("error:", error);
    }
}

function renderRecipes() {
    const container = document.getElementById("recipe-container");
    container.innerHTML = "";

    let recipesToRender = currentCategory === "all" 
        ? allRecipes 
        : allRecipes.filter(recipe => recipe.category === currentCategory);

    if (searchTerm) {
        recipesToRender = recipesToRender.filter(recipe => 
            recipe.title.includes(searchTerm)
        );
    }

    recipesToRender.forEach(recipe => {
        const card = `
            <div class="col">
                <a href="recipe.html?id=${recipe.id}" class="text-decoration-none text-dark">
                    <div class="card h-100 shadow hover-effect">
                        <div class="overflow-hidden" style="height: 200px; background-color: white;">
                            ${recipe.image ? 
                                `<img src="${recipe.image}" class="card-img-top w-100" style="height: 100%; object-fit: cover; transition: transform 0.3s ease;" alt="${recipe.title}">` 
                                : ''
                            }
                        </div>
                        <div class="card-body d-flex flex-column justify-content-between">
                            <h5 class="card-title">${recipe.title}</h5>
                        </div>
                    </div>
                </a>
            </div>
        `;
        container.innerHTML += card;
    });
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".nav-item.nav-link").forEach(link => {
        link.addEventListener("click", function (event) {
            if (this.id === "categories") {
                event.preventDefault();
                currentCategory = this.getAttribute("data-category");

                history.pushState(null, "", `?category=${currentCategory}`);
                renderRecipes();
            }
        });
    });

    document.getElementById("search-input").addEventListener("input", function (e) {
        searchTerm = e.target.value.trim();
        renderRecipes();
    });

    fetchRecipes();
});
