import './sortingView.scss';
import {View} from "../../../view";
import {Controller} from "../../../../controller/controller";
import {Router} from "../../../../router/router";
import {ProductViewDataType} from "../../../../types/sortDataType";
import {PaginationPerPageView} from "../../../common/pagination/paginationPerPageView";

export class SortingFiltersView extends View<ProductViewDataType> {
    private readonly sortOptions: { [key: string]: string } = {
        '': 'Recommended',
        'name': 'Name',
        'price-asc': 'Price ascending',
        'price-desc': 'Price descending',
        'stock-asc': 'Stock ascending',
        'stock-desc': 'Stock descending',
    }

    protected views = {
        paginationPerPage: new PaginationPerPageView(),
    }

    public render(data: ProductViewDataType): string {
        let colorFilter = '';
        if (data.filters.colors) {
            // language=HTML
            colorFilter = data.filters.colors.map((c) => {
                return `
                  <div class="selected-filters__item selected-item">
                    <div class="selected-item__name">${c}</div>
                    <div class="selected-item__remove-btn" data-params="colors" data-value="${c}"></div>
                  </div>`;
            }).join('')
        }
        let collectionFilter = '';
        if (data.filters.collections) {
            // language=HTML
            collectionFilter = data.filters.collections.map((c) => {
                return `
                  <div class="selected-filters__item selected-item">
                    <div class="selected-item__name">${c}</div>
                    <div class="selected-item__remove-btn" data-params="collections" data-value="${c}"></div>
                  </div>`;
            }).join('')
        }

        let priceFilter = '';
        if (data.filters.price?.selectedMin || data.filters.price?.selectedMax) {
            // language=HTML
            priceFilter = `
              <div class="selected-filters__item selected-item">
                <div class="selected-item__name">Price: $${data.filters.price.selectedMin} - $${data.filters.price.selectedMax}</div>
                <div class="selected-item__remove-btn" data-params="minPrice,maxPrice"></div>
              </div>`;
        }

        let sizeFilter = '';
        if (data.filters.size?.selectedMin || data.filters.size?.selectedMax) {
            // language=HTML
            sizeFilter = `
              <div class="selected-filters__item selected-item">
                <div class="selected-item__name">Size: ${data.filters.size.selectedMin}cm - ${data.filters.size.selectedMax}cm</div>
                <div class="selected-item__remove-btn" data-params="minSize,maxSize"></div>
              </div>`;
        }

        let categoryFilter = '';
        if (data.filters.categories) {
            // language=HTML
            categoryFilter = data.filters.categories.map((c) => {
                return `
                  <div class="selected-filters__item selected-item">
                    <div class="selected-item__name">${c.category}</div>
                    <div class="selected-item__remove-btn" data-params="categories" data-value="${c.category}"></div>
                  </div>`;
            }).join('')
        }

        let stockFilter = '';
        if (data.filters.stock?.selectedMin || data.filters.stock?.selectedMax) {
            // language=HTML
            stockFilter = `
              <div class="selected-filters__item selected-item">
                <div class="selected-item__name">Stock: ${data.filters.stock.selectedMin} - ${data.filters.stock.selectedMax}</div>
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


        const sortByOptions = Object.keys(this.sortOptions).map((value) => {
            const selectedAttr = data.sortBy === value ? 'selected="selected"' : '';
            return `<option ${selectedAttr} value="${value}">${this.sortOptions[value]}</option>`
        }).join('')

        // language=HTML
        return `
          <div class="main-center-section__selected selected-section">
            ${selectedFiltersBar}
            <div class="main-center-section__sorted sorted-filters">
              <div class="sorted-filters__filters-menu filters-menu">
                <div class="filters-menu__icon"></div>
                <div class="filters-menu__title">Show filters</div>
                <div class="filters-menu__count">${data.selectedFilters}</div>
              </div>
              <div class="sorted-filters__item-count">${data.productsCount} items</div>
              <div class="sorted-filters__select">
                <select class="filters-select" data-param="sortBy">
                  ${sortByOptions}
                </select>
              </div>
              <div class="sorted-filters__select">
                ${this.views.paginationPerPage.render({
                  selectedPerPage: data.pagination.perPage,
                  values: [5, 10, 20, 30, 0],
                })}
              </div>
              <div class="sorted-filters__switch-view switch-view">
                <div class="switch-view__line"></div>
                <div class="switch-view__block switch-active"></div>
              </div>
            </div>`
    }

    afterRender(controller: Controller) {
        super.afterRender(controller);

        const removeButtons = document.querySelectorAll<HTMLElement>('.selected-item__remove-btn')
        const removeFilters = document.querySelector<HTMLElement>('.selected-filters__remove-filters')
        const filterSelects = document.querySelectorAll<HTMLSelectElement>('.filters-select')

        removeButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                btn.dataset.params?.split(',').forEach(p => {
                    if (btn.dataset.value) {
                        Router.removeUrlParamValue(p, btn.dataset.value)
                    } else {
                        Router.removeUrlParamKey(p)
                    }
                    Router.removeUrlParamKey('page');
                })
            })
        })

        removeFilters?.addEventListener('click', () => {
            removeButtons.forEach((btn) => {
                btn.dataset.params?.split(',').forEach(p => {
                    Router.removeUrlParamKey(p)
                })
            })
            Router.removeUrlParamKey('q')
            Router.removeUrlParamKey('page');
        })

        filterSelects.forEach((select) => {
            select.addEventListener('change', () => {
                Router.removeUrlParamKey('page')
                Router.setUrlParam(select.dataset.param || '', select.value)
            })
        })

        const copyLink = document.querySelector<HTMLElement>('.selected-filters__copy-link')
        copyLink?.addEventListener('click', () => {
            navigator.clipboard.writeText(window.location.href).then(function() {
                copyLink.textContent = 'Copied'
            });
        })

        const filtersIcon = document.querySelector<HTMLElement>('.filters-menu__icon')
        filtersIcon?.addEventListener('click', () => {
            Router.setUrlParam('showFilters', 'true')
        })
    }
}
