import './filtersView.scss'
import {View} from "../../../view";
import {Controller} from "../../../../controller/controller";
import noUiSlider from 'nouislider';

/**
 * view отвечающий за отрисовку фильтров каталога
 */
export class FiltersView extends View<void> {
    /**
     * @todo нужно принимать здесь объект с данными, требующимися для отрисовки фильтров
     * @todo объект должен содержать все значения фильтров (нужно получать их из списка продуктов)
     * @todo также объект должен содержать выбранные пользователем фильтры (из GET параметров)
     */
    public render(data?: void): string {
        // language=HTML
        return `
          <div class="filters" xmlns="http://www.w3.org/1999/html">
            <div class="filters__item filters-item">
              <div class="filters-item__title">Color</div>
              <div class="filters-item__content item-content">
                <div class="item-content__colors colors">
                  <div class="colors__color is-multi"></div>
                  <div class="colors__color is-black"></div>
                  <div class="colors__color is-grey"></div>
                  <div class="colors__color is-silver"></div>
                  <div class="colors__color is-white"></div>
                  <div class="colors__color is-yellow"></div>
                  <div class="colors__color is-green"></div>
                  <div class="colors__color is-pink"></div>
                  <div class="colors__color is-red"></div>
                  <div class="colors__color is-blue"></div>
                  <div class="colors__color is-brown"></div>
                </div>
              </div>
            </div>
            <div class="filters__item filters-item">
              <div class="filters-item__title">Collection</div>
              <div class="filters-item__content item-content">
                <div class="item-content__collection collection">
                  <div class="collection__year">2021</div>
                  <div class="collection__year">2022</div>
                  <div class="collection__year">2023</div>
                </div>
              </div>
            </div>
            <div class="filters__item filters-item">
              <div class="filters-item__title">Price</div>
              <div class="filters-item__content item-content">
                <div class="item-content__price price">
                  <div>
                    <input type="text" class="price__box-start box-start" value="0">
                    <span class="price__dollar_start">$</span>
                  </div>
                  <div>
                    <input type="text" class="price__box-end box-end" value="0">
                    <span class="price__dollar_end">$</span>
                  </div>
                </div>
                <div class="item-content__dual-range dual-range">
                  <div id="range-price"></div>
                </div>
              </div>
            </div>
            <div class="filters__item filters-item">
              <div class="filters-item__title">Size</div>
              <div class="filters-item__content item-content">
                <div class="item-content__size size">
                  <input type="text" class="price__box-start box-start" placeholder="0 cm">
                  <input type="text" class="price__box-end box-end" placeholder="0 cm">
                </div>
                <div class="item-content__dual-range dual-range">
                  <div id="range-size"></div>
                </div>
              </div>
            </div>
            <div class="filters__item filters-item">
              <div class="filters-item__title">Category</div>
              <div class="filters-item__content item-content">
                <div class="item-content__category category">
                  <label for="tree-decorations" class="category__label">Tree decorations</label>
                  <div class="category__count">(12)</div>
                  <input id="tree-decorations" type="checkbox" class="category__checkbox" value="">
                </div>
                <div class="item-content__category category">
                  <label for="christmas-decorations" class="category__label">Christmas decorations</label>
                  <div class="category__count">(15)</div>
                  <input id="christmas-decorations" type="checkbox" class="category__checkbox" value="">
                </div>
                <div class="item-content__category category">
                  <label for="garland-wreath" class="category__label">Garland & Wreath</label>
                  <div class="category__count">(15)</div>
                  <input id="garland-wreath" type="checkbox" class="category__checkbox" value="">
                </div>
                <div class="item-content__category category">
                  <label for="do-it-yourself" class="category__label">Do It Yourself</label>
                  <div class="category__count">(5)</div>
                  <input id="do-it-yourself" type="checkbox" class="category__checkbox" value="">
                </div>
                <div class="item-content__category category">
                  <label for="christmas-lights" class="category__label">Christmas lights</label>
                  <div class="category__count">(8)</div>
                  <input id="christmas-lights" type="checkbox" class="category__checkbox" value="">
                </div>
              </div>
            </div>
            <div class="filters__item filters-item">
              <div class="filters-item__title">In stock</div>
              <div class="filters-item__content item-content">
                <div class="item-content__stock stock">
                  <input type="text" class="price__box-start box-start" placeholder="0">
                  <input type="text" class="price__box-end box-end" placeholder="0">
                </div>
                <div class="item-content__dual-range dual-range">
                  <div id="range-stock"></div>
                </div>
              </div>
            </div>
          </div>
        `
    }

    afterRender(controller: Controller) {
        super.afterRender(controller);

        const rangePrice = document.querySelector('#range-price') as HTMLElement;
        noUiSlider.create(rangePrice, {
            start: [20, 80],
            connect: true,
            range: {
                'min': 0,
                'max': 100
            },
        });

        const rangeStock = document.querySelector('#range-stock') as HTMLElement;
        noUiSlider.create(rangeStock, {
            start: [10, 90],
            connect: true,
            range: {
                'min': 0,
                'max': 100
            },
        });

        const rangeSize = document.querySelector('#range-size') as HTMLElement;
        noUiSlider.create(rangeSize, {
            start: [5, 95],
            connect: true,
            range: {
                'min': 0,
                'max': 100
            },
        });
    }
}
