import {FiltersView} from "./filters/filtersView";
import {View} from "../../view";
import {ProductListView} from "./products/productListView";
import {MainPageDataType} from "../../../types/mainPageDataType";
import {HeaderView} from "../../header/headerView";
import {FooterView} from "../../footer/footerView";
import {SortingFiltersView} from "./sorting/sortingView";
import {Controller} from "../../../controller/controller";
import {Router} from "../../../router/router";
import {TimeoutId} from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";
import {PaginationPerPageView} from "../../common/pagination/paginationPerPageView";
import {PaginationPagesView} from "../../common/pagination/paginationPagesView";


/**
 * view-компонент, который возвращает страницу main (фильтры, каталог)
 *   - использует (вызывает) внутри себя более мелкие компоненты FiltersView, ProductListView
 */
export class MainPageView extends View<MainPageDataType> {
    protected views = {
        header: new HeaderView(),
        footer: new FooterView(),
        filters: new FiltersView(),
        productList: new ProductListView(),
        sorting: new SortingFiltersView(),
        paginationPages: new PaginationPagesView(),
    }
    /**
     * @todo нужно прпнимать здесь объект со всеми данными, требующимися для отрисовки (вызова render) всех компонентов
     */
    public render(data: MainPageDataType): string {
        // language=HTML
        return `
          ${this.views.header.render(data.cart)}
          <main>
            <div class="find-container">
              <div class="snow-blocks">
                <div class="snow1"></div>
                <div class="snow2"></div>
              </div>
              <div class="find-title">
                Find Christmas decorations to create
                a festive atmosphere at your home
              </div>
              <div class="find-input-wrapper">
                <input class="find-input" type="search" value="${Router.getUrlParam('q', '')}" placeholder="Search..."/>
                <div class="find-input-img_search"></div>
                <div class="find-input-img_clear"></div>
              </div>
            </div>
            <div class="store-page">
              <section class="main-catalog">
                <div class="main-catalog__bread-crumbs bread-crumbs">
                  <div class="bread-crumbs__path">Home</div>
                </div>
                <div class="main-catalog__filters">
                  ${this.views.filters.render(data.filters)}
                </div>
                <div class="main-catalog__center-section main-center-section">
                  ${this.views.sorting.render(data.view)}
                  </div>
                  <div class="main-catalog__products ${data.switchType === 'row' ? 'row-view' : ''}">
                    ${this.views.productList.render(data.products)}
                  </div>
                  ${this.views.paginationPages.render({
                    selectedPage: data.view.pagination.page,
                    pageCount: data.view.pagination.pageCount,
                  })}
                </div>
              </section>
            </div>
          </main>
          ${this.views.footer.render()}
        `
    }

    public afterRender(controller: Controller): void {
        super.afterRender(controller);

        const switchingRow = document.querySelector('.switch-view__line') as HTMLElement;
        const switchingBlock = document.querySelector('.switch-view__block') as HTMLElement;
        const mainCatalogProducts = document.querySelector('.main-catalog__products') as HTMLElement;
        const inputSearch = document.querySelector('.find-input') as HTMLInputElement;
        const clearButton = document.querySelector('.find-input-img_clear') as HTMLElement;

        switchingRow.addEventListener('click', () => {
            Router.setUrlParam('switch-view', 'row')
        })

        switchingBlock.addEventListener('click', () => {
            Router.setUrlParam('switch-view', 'block')
        })

        if (mainCatalogProducts.classList.contains('row-view')) {
            switchingRow.classList.add('switch-active');
            switchingBlock.classList.remove('switch-active');
        }

        clearButton.addEventListener('click', () => {
            Router.removeUrlParamKey('q')
        })

        let timeouts: TimeoutId[] = []
        inputSearch.addEventListener('input', () => {
            timeouts.forEach((timeout) => clearTimeout(timeout))
            timeouts.push(
                setTimeout(() => {
                    timeouts.push(
                        setTimeout(() => {
                            const newInputSearch = document.querySelector('.find-input') as HTMLInputElement;
                            newInputSearch.focus();
                            newInputSearch.setSelectionRange(inputSearch.selectionStart, inputSearch.selectionEnd)
                        }, 1)
                    );

                    Router.removeUrlParamKey('page');
                    inputSearch.value ? Router.setUrlParam('q', inputSearch.value) : Router.removeUrlParamKey('q');
                }, 1000)
            );
        })
    }
}


