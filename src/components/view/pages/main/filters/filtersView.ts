import './filtersView.scss'
import {View} from "../../../view";
import {Controller} from "../../../../controller/controller";
import noUiSlider from 'nouislider';
import {FiltersDataType} from "../../../../types/filtersDataType";
import {Router} from "../../../../router/router";

/**
 * view отвечающий за отрисовку фильтров каталога
 */
export class FiltersView extends View<FiltersDataType> {
    public render(data: FiltersDataType): string {
        // language=HTML
        return `
          <div class="filters" xmlns="http://www.w3.org/1999/html">
            <div class="filters__item filters-item">
              <div class="filters-item__title">Color</div>
              <div class="filters-item__content item-content">
                <div class="item-content__colors colors">
                  ${data.colors?.map((color) => {
                    const selectedClass = data.selected.colors?.includes(color) ? 'is-selected' : ''
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
                  ${data.collections?.map((collection) => {
                    const selectedClass = data.selected.collections?.includes(collection) ? 'is-selected' : '';
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
                    <input type="text" class="box-start" value="${data.price?.min}">
                    <span class="price__dollar_start">$</span>
                  </div>
                  <div>
                    <input type="text" class="box-end" value="${data.price?.max}">
                    <span class="price__dollar_end">$</span>
                  </div>
                </div>
                <div class="item-content__dual-range dual-range">
                  <div class="slider" 
                       data-min_selected="${data.selected.price?.min}" 
                       data-max_selected="${data.selected.price?.max}" 
                       data-min="${data.price?.min}" 
                       data-max="${data.price?.max}"></div>
                </div>
              </div>
            </div>
            <div class="filters__item filters-item">
              <div class="filters-item__title">Size</div>
              <div class="filters-item__content item-content">
                <div class="item-content__size size">
                  <input type="text" class="box-start" placeholder="${data.size?.min}cm">
                  <input type="text" class="box-end" placeholder="${data.size?.max}cm">
                </div>
                <div class="item-content__dual-range dual-range">
                  <div class="slider"
                       data-min_selected="${data.selected.size?.min}"
                       data-max_selected="${data.selected.size?.max}"
                       data-min="${data.size?.min}" 
                       data-max="${data.size?.max}"></div>
                </div>
              </div>
            </div>
            <div class="filters__item filters-item">
              <div class="filters-item__title">Category</div>
              <div class="filters-item__content item-content">
                ${data.categories?.map((item) => {
                  const id = item.category.toLowerCase().replace(' ', '-')
                  const checked = data.selected.categories?.some(c => c.category === item.category) ? 'checked="checked"' : '';
                  // language=HTML
                  return `<div class="item-content__category category">
                      <label for="${id}" class="category__label">${item.category}</label>
                      <div class="category__count">(${item.products})</div>
                      <input id="${id}" type="checkbox" class="category__checkbox" data-categories="${item.category}" ${checked}>
                  </div>`
                }).join('')}
              </div>
            </div>
            <div class="filters__item filters-item">
              <div class="filters-item__title">In stock</div>
              <div class="filters-item__content item-content">
                <div class="item-content__stock stock">
                  <input type="text" class="box-start" placeholder="${data.stock?.min}">
                  <input type="text" class="box-end" placeholder="${data.stock?.max}">
                </div>
                <div class="item-content__dual-range dual-range">
                  <div class="slider"
                       data-min_selected="${data.selected.stock?.min}"
                       data-max_selected="${data.selected.stock?.max}"
                       data-min="${data.stock?.min}" 
                       data-max="${data.stock?.max}"></div>
                </div>
              </div>
            </div>
          </div>
        `
    }

    afterRender(controller: Controller) {
        super.afterRender(controller);

        const priceFilter = document.querySelector('.filters-item .price') as HTMLElement | null;
        if (priceFilter) {
            this.initializeSlider(priceFilter, (start, end) => {
                Router.setUrlParam('minPrice', start)
                Router.setUrlParam('maxPrice', end)
            }, 2);
        }

        const sizeFilter = document.querySelector('.filters-item .size') as HTMLElement | null;
        if (sizeFilter) {
            this.initializeSlider(sizeFilter, (start, end) => {
                Router.setUrlParam('minSize', start)
                Router.setUrlParam('maxSize', end)
            });
        }

        const stockFilter = document.querySelector('.filters-item .stock') as HTMLElement | null;
        if (stockFilter) {
            this.initializeSlider(stockFilter, (start, end) => {
                Router.setUrlParam('minStock', start)
                Router.setUrlParam('maxStock', end)
            });
        }

        const colors = document.querySelectorAll<HTMLElement>('.colors__color')
        colors.forEach(c => c.addEventListener('click', () => {
            if (c.classList.contains('is-selected')) {
                Router.removeUrlParamValue('colors', c.dataset.color || '');
            } else {
                Router.addUrlParamValue('colors', c.dataset.color || '');
            }
        }))

        const collections = document.querySelectorAll<HTMLElement>('.collection__year')
        collections.forEach(c => c.addEventListener('click', () => {
            if (c.classList.contains('is-selected')) {
                Router.removeUrlParamValue('collections', c.dataset.collection || '');
            } else {
                Router.addUrlParamValue('collections', c.dataset.collection || '');
            }
        }))

        const categories = document.querySelectorAll<HTMLInputElement>('.category__checkbox')
        categories.forEach(c => c.addEventListener('change', () => {
            if (!c.checked) {
                Router.removeUrlParamValue('categories', c.dataset.categories || '');
            } else {
                Router.addUrlParamValue('categories', c.dataset.categories || '');
            }
        }))
    }

    private initializeSlider(container: HTMLElement, onChange: (min: string, max:string) => void, maxDecimals: number = 0) {
        const slider = container.nextElementSibling?.querySelector('.slider') as HTMLElement | null;
        const startInput = container.querySelector('.box-start') as HTMLInputElement | null;
        const endInput = container.querySelector('.box-end') as HTMLInputElement | null;

        if (!slider || !startInput || !endInput) {
            return
        }

        const minValue = parseFloat(slider.dataset.min ?? '')
        const maxValue = parseFloat(slider.dataset.max ?? '')
        let startMin = minValue
        let startMax = maxValue

        if (Number(slider.dataset.min_selected)) {
            startMin = Number(slider.dataset.min_selected)
        }
        if (Number(slider.dataset.max_selected)) {
            startMax = Number(slider.dataset.max_selected)
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

        startInput.addEventListener('change', function () {
            api.set([this.value, endInput.value]);
        });

        endInput.addEventListener('change', function () {
            api.set([startInput.value, this.value]);
        });

        [startInput, endInput]
            .forEach((input) => input.addEventListener('keypress', (e: KeyboardEvent) => {
                const target = e.target as HTMLInputElement;
                const value = target.value;
                const dotPos = value.indexOf('.');
                const decimal = value.toString().split('.')[1];

                const canEnterDecimal = !decimal || decimal.length < maxDecimals;
                const selectionBeforeDot = (target.selectionStart ?? 0) <= dotPos;
                const isReplaceDecimals = !selectionBeforeDot && (target.selectionEnd ?? 0) > (target.selectionStart ?? 0)

                if (!isNaN(parseInt(e.key)) && (canEnterDecimal || selectionBeforeDot || isReplaceDecimals)) {
                    return;
                }

                if (e.key === '.' && maxDecimals > 0 && dotPos < 0) {
                    return;
                }

                e.preventDefault();
            }))
    }
}
