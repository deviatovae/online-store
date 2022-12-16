import './productView.scss'
import {ViewInterface} from "../../../viewInterface";

export class ProductView implements ViewInterface<void> {
    render(data?: void): string {
        return `
        <div class="product-item">
          <div class="product-item__img"></div>
          <div class="product-item__cart-text">Add to cart</div>
          <div class="product-item__info">
            <div class="item-info__name-price">
              <span class="item-info__name">Name</span>
              <span class="item-info__price">Price</span>
            </div>
            <div class="item-info__color">Color:</div>
            <div class="item-info__colection">Colection:</div>
            <div class="item-info__size">Size:</div>
            <div class="item-info__category">Categor:</div>
          </div>
        </div>
    `
    }
}    