import './filtersView.scss'
import {View} from "../../../view";
import {Controller} from "../../../../controller/controller";
import noUiSlider from 'nouislider';
import {FiltersDataType} from "../../../../types/filtersDataType";

/**
 * view отвечающий за отрисовку фильтров каталога
 */
export class FiltersView extends View<FiltersDataType> {
    /**
     * @todo нужно принимать здесь объект с данными, требующимися для отрисовки фильтров
     * @todo объект должен содержать все значения фильтров (нужно получать их из списка продуктов)
     * @todo также объект должен содержать выбранные пользователем фильтры (из GET параметров)
     */
    public render(data: FiltersDataType): string {
        // console.log(data)
        // language=HTML
        return `
          <div class="filters" xmlns="http://www.w3.org/1999/html">
            <div class="filters__item filters-item">
              <div class="filters-item__title">Color</div>
              <div class="filters-item__content item-content">
                <div class="item-content__colors colors">
                  <div class="colors__color is-multi"></div>
                  ${data.colors.map((color) => `<div class="colors__color is-${color}"></div>`).join('')}
                </div>
              </div>
            </div>
            <div class="filters__item filters-item">
              <div class="filters-item__title">Collection</div>
              <div class="filters-item__content item-content">
                <div class="item-content__collection collection">
                  ${data.collections.map((collection) => `<div class="collection__year">${collection}</div>`).join('')}
                </div>
              </div>
            </div>
            <div class="filters__item filters-item">
              <div class="filters-item__title">Price</div>
              <div class="filters-item__content item-content">
                <div class="item-content__price price">
                  <div>
                    <input type="text" class="box-start" value="${data.price.min}">
                    <span class="price__dollar_start">$</span>
                  </div>
                  <div>
                    <input type="text" class="box-end" value="${data.price.max}">
                    <span class="price__dollar_end">$</span>
                  </div>
                </div>
                <div class="item-content__dual-range dual-range">
                  <div class="slider" data-min="${data.price.min}" data-max="${data.price.max}"></div>
                </div>
              </div>
            </div>
            <div class="filters__item filters-item">
              <div class="filters-item__title">Size</div>
              <div class="filters-item__content item-content">
                <div class="item-content__size size">
                  <input type="text" class="box-start" placeholder="${data.size.min}cm">
                  <input type="text" class="box-end" placeholder="${data.size.max}cm">
                </div>
                <div class="item-content__dual-range dual-range">
                  <div class="slider" data-min="${data.size.min}" data-max="${data.size.max}"></div>
                </div>
              </div>
            </div>
            <div class="filters__item filters-item">
              <div class="filters-item__title">Category</div>
              <div class="filters-item__content item-content">
                ${data.categories.map((item) => {
                  const id = item.category.toLowerCase().replace(' ', '-')
                  // language=HTML
                  return `<div class="item-content__category category">
                      <label for="${id}" class="category__label">${item.category}</label>
                      <div class="category__count">(${item.products})</div>
                      <input id="${id}" type="checkbox" class="category__checkbox" value="">
                  </div>`
                }).join('')}
              </div>
            </div>
            <div class="filters__item filters-item">
              <div class="filters-item__title">In stock</div>
              <div class="filters-item__content item-content">
                <div class="item-content__stock stock">
                  <input type="text" class="box-start" placeholder="${data.stock.min}">
                  <input type="text" class="box-end" placeholder="${data.stock.max}">
                </div>
                <div class="item-content__dual-range dual-range">
                  <div class="slider" data-min="${data.stock.min}" data-max="${data.stock.max}"></div>
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
            this.initializeSlider(priceFilter, 2);
        }

        const sizeFilter = document.querySelector('.filters-item .size') as HTMLElement | null;
        if (sizeFilter) {
            this.initializeSlider(sizeFilter);
        }

        const stockFilter = document.querySelector('.filters-item .stock') as HTMLElement | null;
        if (stockFilter) {
            this.initializeSlider(stockFilter);
        }
    }

    private initializeSlider(container: HTMLElement, maxDecimals: number = 0) {
        const slider = container.nextElementSibling?.querySelector('.slider') as HTMLElement | null;
        const startInput = container.querySelector('.box-start') as HTMLInputElement | null;
        const endInput = container.querySelector('.box-end') as HTMLInputElement | null;

        if (!slider || !startInput || !endInput) {
            return
        }

        const minValue = parseInt(slider.dataset.min ?? '')
        const maxValue = parseInt(slider.dataset.max ?? '')

        const api = noUiSlider.create(slider, {
            start: [maxValue * 0.15, maxValue * 0.85],
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

        api.on('update', function (values: any, handle: any) {
            const value = values[handle];
            if (handle) {
                endInput.value = value;
            } else {
                startInput.value = value;
            }
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
