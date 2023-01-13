import './filtersView.scss'
import {View} from "../../../view";
import {Controller} from "../../../../controller/controller";
import noUiSlider from 'nouislider';
import {FiltersData} from "../../../../types/filtersData";
import {Router} from "../../../../router/router";
import {UrlParam} from "../../../../types/urlParam";
import {UrlParamValue} from "../../../../types/urlParamValue";

/**
 * view отвечающий за отрисовку фильтров каталога
 */
export class FiltersView extends View<FiltersData> {
    public render(data: FiltersData): string {
        const {
            colors,
            categories,
            collections,
            price,
            size,
            stock,
            selected: {
                colors: selectedColors,
                collections: selectedCollections,
                categories: selectedCategories,
                size: selectedSize,
                stock: selectedStock,
                price: selectedPrice
            },
            showFilters
        } = data

        // language=HTML
        return `
            <div class="filters" xmlns="http://www.w3.org/1999/html" data-show="${showFilters ? UrlParamValue.FILTERS_SHOW : ''}">
            <div class="filters__item filters-item">
              <div class="filters-item__title">Color</div>
              <div class="filters-item__content item-content">
                <div class="item-content__colors colors">
                  ${colors?.map((color) => {
                    const selectedClass = selectedColors?.includes(color) ? 'is-selected' : ''
                    return `<div class="colors__color is-${color} ${selectedClass}" data-color="${color}">
                       </div>`
                  }).join('')}
                </div>
              </div>
            </div>
            <div class="filters__item filters-item">
              <div class="filters-item__title">Collection</div>
              <div class="filters-item__content item-content">
                <div class="item-content__collection collection">
                  ${collections?.map((collection) => {
                    const selectedClass = selectedCollections?.includes(collection) ? 'is-selected' : '';
                    return `<div class="collection__year ${selectedClass}" data-collection="${collection}">${collection}</div>`;
                  }).join('')}
                </div>
              </div>
            </div>
            <div class="filters__item filters-item">
              <div class="filters-item__title">Price</div>
              <div class="filters-item__content item-content">
                <div class="item-content__price price">
                  <div>
                    <input type="text" class="box-start" value="${price?.selectedMin}" maxlength="6">
                    <span class="price__dollar_start">$</span>
                  </div>
                  <div>
                    <input type="text" class="box-end" value="${price?.selectedMax}" maxlength="6">
                    <span class="price__dollar_end">$</span>
                  </div>
                </div>
                <div class="item-content__dual-range dual-range">
                  <div class="slider"
                       data-min_selected="${selectedPrice?.selectedMin || selectedPrice?.defaultMin}"
                       data-max_selected="${selectedPrice?.selectedMax || selectedPrice?.defaultMax}"
                       data-min="${price?.min}"
                       data-max="${price?.max}"></div>
                </div>
              </div>
            </div>
            <div class="filters__item filters-item">
              <div class="filters-item__title">Size</div>
              <div class="filters-item__content item-content">
                <div class="item-content__size size">
                  <input type="text" class="box-start" placeholder="cm" maxlength="3">
                  <input type="text" class="box-end" placeholder="cm" maxlength="3">
                </div>
                <div class="item-content__dual-range dual-range">
                  <div class="slider"
                       data-min_selected="${selectedSize?.selectedMin || selectedSize?.defaultMin}"
                       data-max_selected="${selectedSize?.selectedMax || selectedSize?.defaultMax}"
                       data-min="${size?.min}"
                       data-max="${size?.max}"></div>
                </div>
              </div>
            </div>
            <div class="filters__item filters-item">
              <div class="filters-item__title">Category</div>
              <div class="filters-item__content item-content">
                ${categories?.map(({ category: categoryName, products }) => {
                  const id = categoryName.toLowerCase().replace(' ', '-')
                  const checked = selectedCategories?.some(({category}) => category === categoryName)
                          ? 'checked="checked"'
                          : '';
                  // language=HTML
                  return `<div class="item-content__category category">
                      <label for="${id}" class="category__label">${categoryName}</label>
                      <div class="category__count">(${products})</div>
                      <input id="${id}" type="checkbox" class="category__checkbox" data-categories="${categoryName}" ${checked}>
                  </div>`
                }).join('')}
              </div>
            </div>
            <div class="filters__item filters-item">
              <div class="filters-item__title">In stock</div>
              <div class="filters-item__content item-content">
                <div class="item-content__stock stock">
                  <input type="text" class="box-start" maxlength="2">
                  <input type="text" class="box-end" maxlength="2">
                </div>
                <div class="item-content__dual-range dual-range">
                  <div class="slider"
                       data-min_selected="${selectedStock?.selectedMin || selectedStock?.defaultMin}"
                       data-max_selected="${selectedStock?.selectedMax || selectedStock?.defaultMax}"
                       data-min="${stock?.min}"
                       data-max="${stock?.max}"></div>
                </div>
              </div>
            </div>
            <div class="filters__close-btn"></div>
          </div>
        `
    }

    afterRender(controller: Controller) {
        super.afterRender(controller);

        const MAX_DECIMALS = 2

        const priceFilter = document.querySelector('.filters-item .price') as HTMLElement | null;
        if (priceFilter) {
            this.initializeSlider(priceFilter, (start, end) => {
                Router.removeUrlParamKey(UrlParam.PAGE);
                Router.setUrlParam(UrlParam.MIN_PRICE, start)
                Router.setUrlParam(UrlParam.MAX_PRICE, end)
            }, MAX_DECIMALS);
        }

        const sizeFilter = document.querySelector('.filters-item .size') as HTMLElement | null;
        if (sizeFilter) {
            this.initializeSlider(sizeFilter, (start, end) => {
                Router.removeUrlParamKey(UrlParam.PAGE);
                Router.setUrlParam(UrlParam.MIN_SIZE, start)
                Router.setUrlParam(UrlParam.MAX_SIZE, end)
            });
        }

        const stockFilter = document.querySelector('.filters-item .stock') as HTMLElement | null;
        if (stockFilter) {
            this.initializeSlider(stockFilter, (start, end) => {
                Router.removeUrlParamKey(UrlParam.PAGE);
                Router.setUrlParam(UrlParam.MIN_STOCK, start)
                Router.setUrlParam(UrlParam.MAX_STOCK, end)
            });
        }

        const colors = document.querySelectorAll<HTMLElement>('.colors__color')
        colors.forEach(c => c.addEventListener('click', () => {
            Router.removeUrlParamKey(UrlParam.PAGE);
            if (c.classList.contains('is-selected')) {
                Router.removeUrlParamValue(UrlParam.COLORS, c.dataset.color || '');
            } else {
                Router.addUrlParamValue(UrlParam.COLORS, c.dataset.color || '');
            }
        }))

        const collections = document.querySelectorAll<HTMLElement>('.collection__year')
        collections.forEach(c => c.addEventListener('click', () => {
            Router.removeUrlParamKey(UrlParam.PAGE);
            if (c.classList.contains('is-selected')) {
                Router.removeUrlParamValue(UrlParam.COLLECTIONS, c.dataset.collection || '');
            } else {
                Router.addUrlParamValue(UrlParam.COLLECTIONS, c.dataset.collection || '');
            }
        }))

        const categories = document.querySelectorAll<HTMLInputElement>('.category__checkbox')
        categories.forEach(c => c.addEventListener('change', () => {
            Router.removeUrlParamKey(UrlParam.PAGE);
            if (!c.checked) {
                Router.removeUrlParamValue(UrlParam.CATEGORIES, c.dataset.categories || '');
            } else {
                Router.addUrlParamValue(UrlParam.CATEGORIES, c.dataset.categories || '');
            }
        }))

        const closeButton = document.querySelector<HTMLElement>('.filters__close-btn')
        closeButton?.addEventListener('click', () => {
            Router.removeUrlParamKey(UrlParam.SHOW_FILTERS)
        })
    }

    private initializeSlider(container: HTMLElement, onChange: (min: string, max:string) => void, maxDecimals: number = 0) {
        const slider = container.nextElementSibling?.querySelector('.slider') as HTMLElement | null;
        const startInput = container.querySelector('.box-start') as HTMLInputElement | null;
        const endInput = container.querySelector('.box-end') as HTMLInputElement | null;

        if (!slider || !startInput || !endInput) {
            return
        }
        const {dataset: {min, max, min_selected: minSelected, max_selected: maxSelected}} = slider
        const minValue = parseFloat(min ?? '')
        const maxValue = parseFloat(max ?? '')
        let startMin = minValue
        let startMax = maxValue

        if (Number(minSelected)) {
            startMin = Number(minSelected)
        }
        if (Number(maxSelected)) {
            startMax = Number(maxSelected)
        }

        const api = noUiSlider.create(slider, {
            start: [startMin, startMax],
            connect: true,
            range: {
                'min': minValue,
                'max': maxValue
            },
            format: {
                to: (value) => Number(value).toFixed(maxDecimals),
                from: (value) => +Number(value).toFixed(maxDecimals),
            }
        });

        api.on('update', function (values, handle) {
            const value = values[handle];
            if (handle) {
                endInput.value = value.toString();
            } else {
                startInput.value = value.toString();
            }
        });

        api.on('change', function () {
            onChange(startInput.value, endInput.value);
        });
        api.on('set', function () {
            onChange(startInput.value, endInput.value);
        });

        [startInput, endInput]
            .forEach((input) => {
                const updateRangeValue = () => {
                    api.set([startInput.value, endInput.value]);
                }

                input.addEventListener('change', updateRangeValue)

                input.addEventListener('keypress', (e: KeyboardEvent) => {
                    const target = e.target as HTMLInputElement;
                    const value = target.value;
                    const dotPos = value.indexOf('.');
                    const decimal = value.toString().split('.')[1];

                    const canEnterDecimal = !decimal || decimal.length < maxDecimals;
                    const selectionBeforeDot = (target.selectionStart ?? 0) <= dotPos;
                    const isReplaceDecimals = !selectionBeforeDot && (target.selectionEnd ?? 0) > (target.selectionStart ?? 0)

                    if (e.key === 'Enter') {
                        return;
                    }

                    if (!isNaN(parseInt(e.key)) && (canEnterDecimal || selectionBeforeDot || isReplaceDecimals)) {
                        return;
                    }

                    if (e.key === '.' && maxDecimals > 0 && dotPos < 0) {
                        return;
                    }

                    e.preventDefault();
                })
            })
    }
}
