import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

if (module.hot) {
    module.hot.accept();
}

const controlRecipes = async function () {
    try {
        const id = window.location.hash.slice(1);
        console.log(`${id}`);

        if (!id) return;
        recipeView.renderSpinner();

        // 01) update results view to matk selected searchresult
        resultsView.updata(model.getSearchResultsPage());
        bookmarksView.updata(model.state.bookmarks);

        // 1) loding rrecipe
        await model.loadRecipe(id);

        // 2) rendering recipe
        recipeView.render(model.state.recipe);
    } catch (error) {
        // console.log(error);
        recipeView.renderError(`${error} 💣💣💣`);
    }
};

const controlSearchResults = async function () {
    try {
        resultsView.renderSpinner();

        // 1) get earch query
        const query = searchView.getQuery();
        if (!query) return;

        // 2) load search results
        await model.loadSearchResults(query);

        // 3) render results
        // console.log(`results:- `, model.state.search.results);
        // resultsView.render(model.state.search.results);
        resultsView.render(model.getSearchResultsPage());

        // 4) render initial pagination buttons
        paginationView.render(model.state.search);
    } catch (error) {
        console.log(`error:- `, error);
    }
};

const controlPagination = function (goToPage) {
    // 1) render new results
    resultsView.render(model.getSearchResultsPage(goToPage));

    // 4) render new pagination buttons
    paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
    // updata the recipe servings (in state)
    model.updateServings(newServings);

    // update the recipe view
    // recipeView.render(model.state.recipe);
    recipeView.render(model.state.recipe);
};

const controlAddBookmark = function () {
    // 1) add/remove bookmark
    if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
    else model.deletBookmark(model.state.recipe.id);

    // 2) update recipe view
    recipeView.updata(model.state.recipe);

    // 3) render bookmarks
    bookmarksView.render(model.state.bookmarks);
};

const init = function () {
    recipeView.addHandlerRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerAddBookmark(controlAddBookmark);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
    // controlServings();
};
init();
