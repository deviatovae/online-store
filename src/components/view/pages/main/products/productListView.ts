import './productListView.scss'
import {ViewInterface} from "../../../viewInterface";

// import {ProductView} from "./productView"

import products from '../../../../../assets/data/products.json' ;

export class ProductListView implements ViewInterface<void> {
    
    // private productView: ProductView = new ProductView()

    render(data?: void): string {
        return `
        <div class="product-item">
          <div class="product-item__img"></div>
          <div class="product-item__cart-text">Add to cart</div>
          <div class="product-item__info">
            <div class="item-info__name-price">
              <span class="item-info__name">Шарик</span>
              <span class="item-info__price">$100</span>
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