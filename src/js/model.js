import { async } from "regenerator-runtime";
import { API_URL, RES_PER_PAGE, KEY } from "./config.js";
import { getJSON } from "./helpers.js";

export const state = {
    recipe: {},
    search: {
        query: "",
        results: [],
        page: 1,
        resultsPerPage: RES_PER_PAGE,
    },
    bookmarks: [],
};

export const loadRecipe = async function (id) {
    try {
        const data = await getJSON(`${API_URL}${id}?key=${KEY}`);

        // console.log(res, data);
        const { recipe } = data.data;

        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
        };

        if (state.bookmarks.some((bookmark) => bookmark.id === id))
            state.recipe.bookmarked = true;
        else state.recipe.bookmarked = false;

        // console.log(state.recipe);
    } catch (error) {
        // console.error(`${error} 💣💣💣`);
        throw error;
    }
};

export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;

        const data = await getJSON(`${API_URL}?search=${query}&key=${KEY}`);
        console.log(`data:- `, data);

        state.search.results = data.data.recipes.map((recipe) => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url,
            };
        });
        // console.log(`results:- `, state.search.results);

        state.search.page = 1;
    } catch (error) {
        // console.error(`${error} 💣💣💣`);
        throw error;
    }
};

export const getSearchResultsPage = function (page = state.search.page) {
    state.search.page = page;

    const start = (page - 1) * state.search.resultsPerPage; // 0;
    const end = page * state.search.resultsPerPage; //9;

    return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
    state.recipe.ingredients.forEach((ing) => {
        ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
        // newQt = oldQt * newServings / oldServings //=> 2 * 8 / 4 = 4

        state.recipe.servings = newServings;
    });
};

export const addBookmark = function (recipe) {
    // add bookmark
    state.bookmarks.push(recipe);

    // mark current recipr as bookmarked
    if (recipe.id === state.recipe.id) state.recipe.bookmarks = true;
};

export const deletBookmark = function (id) {
    // delete bookmark
    const index = state.bookmarks.findIndex((el) => el.id === id);
    state.bookmarks.splice(index, 1);

    // mark current recipr not bookmarked
    if (id === state.recipe.id) state.recipe.bookmarks = false;
};
