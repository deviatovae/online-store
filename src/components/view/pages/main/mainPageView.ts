import {ViewInterface} from "../../viewInterface";
import {FiltersView} from "./filters/filtersView";
import {ProductView} from "./products/productView"
import {ProductListView} from "./products/productListView"


export class MainPageView implements ViewInterface<void> {
    private filtersView: FiltersView = new FiltersView()
    private productView: ProductView = new ProductView()
    // private productListView: ProductListView = new ProductListView()
    
    render(data: void): string {

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
                ${this.filtersView.render()}
              </div>
              <div class="main-catalog__products">
                ${this.productView.render()}
              </div>
            </section>
          </div>
        `
    }
}
