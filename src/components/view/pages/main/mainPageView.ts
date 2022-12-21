import {FiltersView} from "./filters/filtersView";
import {View} from "../../view";
import {ProductListView} from "./products/productListView";
import products from '../../../../assets/data/products.json'

/**
 * view-компонент, который возвращает страницу main (фильтры, каталог)
 *   - использует (вызывает) внутри себя более мелкие компоненты FiltersView, ProductListView
 */
export class MainPageView extends View<void> {
    protected views = {
        filters: new FiltersView(),
        productList: new ProductListView(),
    }

    /**
     * @todo нужно прпнимать здесь объект со всеми данными, требующимися для отрисовки (вызова render) всех компонентов
     */
    public render(data: void): string {
        // language=HTML
        return `
          <div class="find-container">
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
              <div class="main-catalog__bread-crumbs"></div>
              <div class="main-catalog__filters">
                                  ${this.views.filters.render()}
              </div>
              <div class="main-catalog__products">
                                  ${this.views.productList.render(products)}
              </div>
            </section>
          </div>
        `
    }
}
