import {View} from "../../view";
import {Router} from "../../../router/router";
import {Controller} from "../../../controller/controller";

export type PaginationPerPageViewDataType = {
    selectedPerPage: number
    values: number[]
}

export class PaginationPerPageView extends View<PaginationPerPageViewDataType> {
    render(data: PaginationPerPageViewDataType): string {
        // language=HTML
        return `
          <div class="pagination__select">
            <select class="pagination-select" data-param="perPage">
              ${data.values.map((value) => {
                const selectedAttr = data.selectedPerPage === value ? 'selected="selected"' : '';
                return `<option ${selectedAttr} value="${value}">Show items: ${value}</option>`
              })}
            </select>
          </div>
        `
    }

    afterRender(controller: Controller) {
        super.afterRender(controller);

        const perPageSelect = document.querySelector<HTMLSelectElement>('.pagination-select')
        perPageSelect?.addEventListener('change', () => {
            Router.setUrlParam(perPageSelect.dataset.param || '', perPageSelect.value)
            Router.setUrlParam('page', '1')
        })
    }
}
