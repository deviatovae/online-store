import './productView.scss'
import {ViewInterface} from "../../../viewInterface";


import products from '../../../../../assets/data/products.json' ;
import {Product} from "../../../../types/product";


export class ProductView implements ViewInterface<void> {
    render(data?: void): string {
      
   const num = 12

        return `
        <div class="product-item">
          <div class="product-item__img"></div>
          <div class="product-item__cart-text">Add to cart</div>
          <div class="product-item__info">
            <div class="item-info__name-price">
              <span class="item-info__name">${products[num].name}</span>
              <span class="item-info__price">$${products[num].price}</span>
            </div>
            <div class="item-info__color">Color: ${products[num].color}</div>
            <div class="item-info__colection">Colection: ${products[num].collection}</div>
            <div class="item-info__size">Size: ${products[num].size}cm</div>
            <div class="item-info__category">Categor: ${products[num].category}</div>
          </div>
        </div>
    `
    }
}