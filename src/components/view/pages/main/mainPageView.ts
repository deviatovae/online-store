import {FiltersView} from "./filters/filtersView";
import {View} from "../../view";
import {ProductListView} from "./products/productListView";
import {MainPageDataType} from "../../../types/mainPageDataType";
import {HeaderView} from "../../header/headerView";
import {FooterView} from "../../footer/footerView";
import {SortingFiltersView} from "./sorting/sortingView";
import {Controller} from "../../../controller/controller";
import {Router} from "../../../router/router";


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
                <input class="find-input" type="text" placeholder="Search..."/>
                <div class="find-input-img"></div>
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
                  ${this.views.sorting.render(data.filters)}
                  </div>
                  <div class="main-catalog__products ${data.switchType === 'row' ? 'row-view' : ''}">
                    ${this.views.productList.render(data.products)}
                  </div>
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

      switchingRow.addEventListener('click', (event: Event) => {
        Router.setUrlParam('switch-view', 'row')
      })

      switchingBlock.addEventListener('click', (event: Event) => {
        Router.setUrlParam('switch-view', 'block')
      })

      if (mainCatalogProducts.classList.contains('row-view')) {
        switchingRow.classList.add('switch-active');
        switchingBlock.classList.remove('switch-active');
      }

  }
}


