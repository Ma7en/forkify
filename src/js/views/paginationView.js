import View from "./View";
import icons from "url:../../img/icons.svg"; // parcel 2

class PaginationView extends View {
    _parentElement = document.querySelector(".pagination");

    addHandlerClick(handler) {
        this._parentElement.addEventListener("click", function (e) {
            const btn = e.target.closest(".btn--inline");

            if (!btn) return;
            const goToPage = +btn.dataset.goto;

            handler(goToPage);
        });
    }

    _generateMarkup() {
        const curPage = this._data.page;

        const numPages = Math.ceil(
            this._data.results.length / this._data.resultsPerPage
        );

        // 1) page 1, and there are other pages
        if (curPage === 1 && numPages > 1) {
            return `
            <button class="btn--inline pagination__btn--prev" style="visibility: hidden;">
                <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>

            <span class="pagination__num">${curPage}</span>

            <button data-goto="${
                curPage + 1
            }" class="btn--inline pagination__btn--next">
                <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>

            `;
        }

        // 2) last page
        if (curPage === numPages && numPages > 1) {
            return `
            <button data-goto="${
                curPage - 1
            }"  class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curPage - 1}</span>
            </button>
            
            <span class="pagination__num">${curPage}</span>

            <button class="btn--inline pagination__btn--next" style="visibility: hidden;">
                <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>

            `;
        }

        // 3) other page
        if (curPage < numPages) {
            return `
            <button data-goto="${
                curPage - 1
            }"  class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curPage - 1}</span>
            </button>

            <span class="pagination__num">${curPage}</span>

            <button data-goto="${
                curPage + 1
            }"  class="btn--inline pagination__btn--next">
                <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button> 
            `;
        }

        // 4) page 2, and there are no other pages
        return `only 1`;
    }
}

export default new PaginationView();
