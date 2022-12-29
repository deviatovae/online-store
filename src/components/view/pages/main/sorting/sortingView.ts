import './sortingView.scss';
import {View} from "../../../view";
import {Product} from "../../../../types/product";
import {ProductView} from "../products/productView";
import {Controller} from "../../../../controller/controller";
import {FiltersDataType} from "../../../../types/filtersDataType";
import {Router} from "../../../../router/router";

export class SortingFiltersView extends View<FiltersDataType> {

    public render(data: FiltersDataType): string {
        let colorFilter = '';
        if (data.selected.colors) {
            // language=HTML
            colorFilter = data.selected.colors.map((c) => {
                return `
                  <div class="selected-filters__item selected-item">
                    <div class="selected-item__name">${c}</div>
                    <div class="selected-item__remove-btn" data-params="colors" data-value="${c}"></div>
                  </div>`;
            }).join('')
        }
        let collectionFilter = '';
        if (data.selected.collections) {
            // language=HTML
            collectionFilter = data.selected.collections.map((c) => {
                return `
                  <div class="selected-filters__item selected-item">
                    <div class="selected-item__name">${c}</div>
                    <div class="selected-item__remove-btn" data-params="collections" data-value="${c}"></div>
                  </div>`;
            }).join('')
        }

        let priceFilter = '';
        if (data.selected.price?.min || data.selected.price?.max) {
            // language=HTML
            priceFilter = `
              <div class="selected-filters__item selected-item">
                <div class="selected-item__name">Price: $${data.selected.price.min} - $${data.selected.price.max}</div>
                <div class="selected-item__remove-btn" data-params="minPrice,maxPrice"></div>
              </div>`;
        }

        let sizeFilter = '';
        if (data.selected.size?.min || data.selected.size?.max) {
            // language=HTML
            priceFilter = `
              <div class="selected-filters__item selected-item">
                <div class="selected-item__name">Size: ${data.selected.size.min}cm - ${data.selected.size.max}cm</div>
                <div class="selected-item__remove-btn" data-params="minSize,maxSize"></div>
              </div>`;
        }

        let categoryFilter = '';
        if (data.selected.categories) {
            // language=HTML
            categoryFilter = data.selected.categories.map((c) => {
                return `
                  <div class="selected-filters__item selected-item">
                    <div class="selected-item__name">${c.category}</div>
                    <div class="selected-item__remove-btn" data-params="categories" data-value="${c.category}"></div>
                  </div>`;
            }).join('')
        }

        let stockFilter = '';
        if (data.selected.stock?.min || data.selected.stock?.max) {
            // language=HTML
            stockFilter = `
              <div class="selected-filters__item selected-item">
                <div class="selected-item__name">Stock: ${data.selected.stock.min} - ${data.selected.stock.max}</div>
                <div class="selected-item__remove-btn" data-params="minStock,maxStock"></div>
              </div>`;
        }
        const selectedFilters = [
            colorFilter,
            collectionFilter,
            priceFilter,
            sizeFilter,
            categoryFilter,
            stockFilter,
        ].filter((s) => s.length).join('')

        const selectedFiltersBar = !selectedFilters ? "" : `<div class="selected-section__filters selected-filters">
              <div class="selected-filters__title">Selected filters:</div>
               ${selectedFilters}
              <div class="selected-filters__remove-filters">Clear all</div>
              <div class="selected-filters__copy-link">Copy link</div>
            </div>`
        // language=HTML
        return `
          <div class="main-center-section__selected selected-section">
            ${selectedFiltersBar}
            <div class="main-center-section__sorted sorted-filters">
              <div class="sorted-filters__item-count">15 items</div>
              <div class="sorted-filters__select filters-select">
                <select class="filters-select__form" id="select">
                  <option value="favorite">Favorite</option>
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
                  <option value="all">Show items: all</option>
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

        const removeButtons = document.querySelectorAll<HTMLElement>('.selected-item__remove-btn')
        const removeFilters = document.querySelector<HTMLElement>('.selected-filters__remove-filters')

        removeButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                btn.dataset.params?.split(',').forEach(p => {
                    if (btn.dataset.value) {
                        Router.removeUrlParamValue(p, btn.dataset.value)
                    } else {
                        Router.removeUrlParamKey(p)
                    }
                })
            })
        })

        removeFilters?.addEventListener('click', () => {
            removeButtons.forEach((btn) => {
                btn.dataset.params?.split(',').forEach(p => {
                    Router.removeUrlParamKey(p)
                })
            })
        })

    }
}
