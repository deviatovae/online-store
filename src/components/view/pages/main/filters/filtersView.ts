import './filtersView.scss'
import {ViewInterface} from "../../../viewInterface";

export class FiltersView implements ViewInterface<void> {
    render(data?: void): string {
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
                  <input type="text" class="price__box-start box-start" placeholder="0 cm">
                  <input type="text" class="price__box-end box-end" placeholder="700 cm">
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
