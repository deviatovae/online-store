import './sortingView.scss';
import {View} from "../../../view";
import {Product} from "../../../../types/product";
import {ProductView} from "../products/productView";
import {Controller} from "../../../../controller/controller";

export class SortingFiltersView extends View<Product[]> {
    protected views = {
        product: new ProductView(),
    }

    public render(products: Product[]): string {
        return `<div class="main-center-section__selected selected-section">
                    <div class="selected-section__filters selected-filters">
                      <div class="selected-filters__title">Selected filters:</div>
                      <div class="selected-filters__item selected-item">
                        <div class="selected-item__name">Color: silver</div>
                        <div class="selected-item__remove-btn"></div>
                      </div>
                      <div class="selected-filters__remove-filters">Clear all</div>
                      <div class="selected-filters__copy-link">Copy link</div>
                    </div>
                    <div class="main-center-section__sorted sorted-filters">
                      <div class="sorted-filters__item-count">15 items</div>
                      <div class="sorted-filters__select filters-select">
                        <select class="filters-select__form" id="select">
                          <option value="favorite">Favourite</option>
                          <option value="price-asc">Price ascending</option>
                          <option value="price-desc">Price descending</option>
                          <option value="name">Name</option>
                        </select>
                      </div>
                      <div class="sorted-filters__count-per-page filters-count-per-page">
                        <select class="filters-count-per-page" id="count-per-page">
                          <option value="10">Show items: 10</option>
                          <option value="20">Show items: 20</option>
                          <option value="30">Show items: 30</option>
                          <option value="all">Show all</option>
                        </select>
                      </div>
                      <div class="sorted-filters__switch-view switch-view">
                      <div class="switch-view__line switch-active"></div>
                      <div class="switch-view__block"></div>
                      </div>
                    </div>`
    }

    afterRender(controller: Controller) {
        super.afterRender(controller);
    }
}
