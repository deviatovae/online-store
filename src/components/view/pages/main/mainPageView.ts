import {FiltersView} from "./filters/filtersView";
import {View} from "../../view";
import {ProductListView} from "./products/productListView";
import {MainPageDataType} from "../../../types/mainPageDataType";
import {HeaderView} from "../../header/headerView";
import {FooterView} from "../../footer/footerView";
import {SortingFiltersView} from "./sorting/sortingView";
import {Controller} from "../../../controller/controller";

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
                  ${this.views.sorting.render(data.products)}
                  </div>
                  <div class="main-catalog__products">
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

      switchingRow.addEventListener('click', (event: Event) => {
        mainRowStyle(switchingRow, switchingBlock);
        localStorage.setItem('style', 'row');
      })

      switchingBlock.addEventListener('click', (event: Event) => {
        mainBlockStyle(switchingRow, switchingBlock);
        localStorage.setItem('style', 'block');
      })

      const style = localStorage.getItem("style")
      if (style === "row") {
        mainRowStyle(switchingRow, switchingBlock);
      }
      if (style === "block") {
        mainBlockStyle(switchingRow, switchingBlock);
      }
  }
}

function mainRowStyle (switchingRow: HTMLElement, switchingBlock: HTMLElement):void {
  switchingRow.classList.add('switch-active');
  switchingBlock.classList.remove('switch-active');

  document.querySelectorAll<HTMLElement>('.product-item').forEach((item: Element) => {
    item.classList.add('product-item-row');
  });
  document.querySelectorAll<HTMLElement>('.product-item__img').forEach((item: Element) => {
    item.classList.add('product-item__img-row');
  });
  document.querySelectorAll<HTMLElement>('.product-item__info').forEach((item: Element) => {
    item.classList.add('product-item__info-row');
  });
  document.querySelectorAll<HTMLElement>('.item-info__name-price').forEach((item: Element) => {
    item.classList.add('item-info__name-price-row');
  });
  document.querySelectorAll<HTMLElement>('.product-item__text-wrapper').forEach((item: Element) => {
    item.classList.add('product-item__text-wrapper-row');
  });
  document.querySelectorAll<HTMLElement>('.product-item__cart-text').forEach((item: Element) => {
    item.classList.add('product-item__cart-text-row');
  });
}

function mainBlockStyle (switchingRow: HTMLElement, switchingBlock: HTMLElement):void {

  switchingBlock.classList.add('switch-active');
  switchingRow.classList.remove('switch-active');

  document.querySelectorAll<HTMLElement>('.product-item').forEach((item: Element) => {
    item.classList.remove('product-item-row');
  });
  document.querySelectorAll<HTMLElement>('.product-item__img').forEach((item: Element) => {
    item.classList.remove('product-item__img-row');
  });
  document.querySelectorAll<HTMLElement>('.product-item__info').forEach((item: Element) => {
    item.classList.remove('product-item__info-row');
  });
  document.querySelectorAll<HTMLElement>('.item-info__name-price').forEach((item: Element) => {
    item.classList.remove('item-info__name-price-row');
  });
  document.querySelectorAll<HTMLElement>('.product-item__text-wrapper').forEach((item: Element) => {
    item.classList.remove('product-item__text-wrapper-row');
  });
  document.querySelectorAll<HTMLElement>('.product-item__cart-text').forEach((item: Element) => {
    item.classList.remove('product-item__cart-text-row');
  });
}

