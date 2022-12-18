import './filtersView.scss'
import {View} from "../../../view";

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
                  <input type="text" class="price__box-start box-start" value="$">
                  <input type="text" class="price__box-end box-end" value="$">
                </div>
                <div class="item-content__dual-range dual-range">
                  <input class="range-bar" type="range" step="100">
                </div>
              </div>
            </div>
            <div class="filters__item filters-item">
              <div class="filters-item__title">Category</div>
              <div class="filters-item__content item-content">
                <div class="item-content__category category">
                  <label for="checkbox" class="category__label">Tree decorations</label>
                  <input id="checkbox" type="checkbox" class="category__checkbox" value="">
                </div>
                <div class="item-content__category category">
                  <label for="checkbox" class="category__label">Christmas decorations</label>
                  <input id="checkbox" type="checkbox" class="category__checkbox" value="">
                </div>
                <div class="item-content__category category">
                  <label for="checkbox" class="category__label">Garland & Wreath</label>
                  <input id="checkbox" type="checkbox" class="category__checkbox" value="">
                </div>
                <div class="item-content__category category">
                  <label for="checkbox" class="category__label">Do It Yourself</label>
                  <input id="checkbox" type="checkbox" class="category__checkbox" value="">
                </div>
                <div class="item-content__category category">
                  <label for="checkbox" class="category__label">Christmas lights</label>
                  <input id="checkbox" type="checkbox" class="category__checkbox" value="">
                </div>
              </div>
            </div>
            <div class="filters__item filters-item">
              <div class="filters-item__title">In stock</div>
              <div class="filters-item__content item-content">
                <div class="item-content__stock stock">
                  <input type="text" class="price__box-start box-start" value="cm">
                  <input type="text" class="price__box-end box-end" value="cm">
                </div>
                <div class="item-content__dual-range dual-range">
                  <input class="range-bar" type="range" step="100">
                </div>
              </div>
            </div>
          </div>
        `
    }
}
