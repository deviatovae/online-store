import {View} from "../../view";
import {Router} from "../../../router/router";
import {Controller} from "../../../controller/controller";
import {UrlParam} from "../../../types/urlParam";

export type PaginationPagesViewDataType = {
    selectedPage: number
    pageCount: number
}

export class PaginationPagesView extends View<PaginationPagesViewDataType> {
    render(data: PaginationPagesViewDataType): string {
        // language=HTML
        return `
          <div class="shopping-cart__pagination-button-container">
            ${[...new Array(data.pageCount)].map((p, i) => {
              return `<div class="pagination-button ${(data.selectedPage === i + 1) ? 'pagination-button-active' : ''}">${i + 1}</div>`
            }).join('')}
          </div>
        `
    }

    afterRender(controller: Controller) {
        super.afterRender(controller);

        const paginationButtons = document.querySelectorAll<HTMLElement>('.pagination-button')
        paginationButtons.forEach((button) => {
            button?.addEventListener('click', () => {
                Router.setUrlParam(UrlParam.PAGE, button.textContent || '1')
                window.scroll({
                    top: 150,
                    left: 0,
                    behavior: "smooth"
                })
            })
        })
    }
}
