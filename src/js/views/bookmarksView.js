import View from "./View";
import previewView from "./previewView.js";
import icons from "url:../../img/icons.svg"; // parcel 2

class BookmarksView extends View {
    _parentElement = document.querySelector(".bookmarks__list");
    _errorMessage = "no bookmarks yet. Find a nice recipe and bookmark it ;)";
    _message = "";

    _generateMarkup() {
        return this._data
            .map((bookmark) => previewView.render(bookmark, false))
            .join("");
    }
}

export default new BookmarksView();

// preview__link--active
{
    /* <div class="preview__user-generated">
<svg>
    <use href="${icons}#icon-user"></use>
</svg>
</div> */
}
