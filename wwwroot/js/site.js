// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

let apiURL = "https://forkify-api.herokuapp.com/api/v2/recipes";
let apikey = "76b36e7d-40eb-4fea-ac2b-c772ece6b8d2";

async function GetRecipes(recipeName, id, isAllShow) {
    try {
        const resp = await fetch(`${apiURL}?search=${recipeName}&key=${apikey}`);
        const result = await resp.json();
        const Recipes = isAllShow ? result.data.recipes : result.data.recipes.slice(1, 7);
        showRecipes(Recipes, id);
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
}
function showRecipes(recipes, id) {
    $.ajax({
        contentType: "application/json; charset=utf-8",
        dataType: 'html',
        type: 'POST',
        url: '/Recipe/GetRecipeCard',
        data: JSON.stringify(recipes),
        success: function (htmlResult) {
            $('#' + id).html(htmlResult);
        },
        error: function (xhr, status, error) {
            console.error("Error posting recipes:", error);
        }
    });
}

async function getOrderRecipe(id,showId) {
    let resp = await fetch(`${apiURL}/${id}?key=${apikey}`);
    let result = await resp.json();
    let recipe = result.data.recipe;
    showOrderRecipeDetails(recipe, showId);
}

function showOrderRecipeDetails(orderRecipeDetails, showId){
    $.ajax({
        url: '/Recipe/ShowOrder',
        data: orderRecipeDetails,
        dataType: 'html',
        type: 'POST',
        success: function (htmlResult) {
            $('#' + showId).html(htmlResult);
        }
    });
}
