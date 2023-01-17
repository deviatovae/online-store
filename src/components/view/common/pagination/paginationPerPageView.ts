import {View} from "../../view";
import {Router} from "../../../router/router";
import {Controller} from "../../../controller/controller";
import {capitalizeFirst} from "../../helpers/helpers";
import {UrlParam} from "../../../types/urlParam";
import {UrlParamValue} from "../../../types/urlParamValue";

export type PaginationPerPageViewData = {
    selectedPerPage: number
    values: number[]
}

export class PaginationPerPageView extends View<PaginationPerPageViewData> {
    render(data: PaginationPerPageViewData): string {
        // language=HTML
        return `
          <div class="pagination__select">
            <select class="pagination-select" data-param="${UrlParam.PER_PAGE}">
              ${data.values.map((value) => {
                const selectedAttr = data.selectedPerPage === value ? 'selected="selected"' : '';
                const showAll = UrlParamValue.PAGINATION_ALL
                return `<option ${selectedAttr} value="${value || showAll}">Show items: ${value || capitalizeFirst(showAll)}</option>`
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
            Router.setUrlParam(UrlParam.PAGE, '1')
        })
    }
}
