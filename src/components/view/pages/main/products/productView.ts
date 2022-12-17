import './productView.scss'
import {ViewInterface} from "../../../viewInterface";


// import products from '../../../../../assets/data/products.json' ;
import {Product} from "../../../../types/product";


export class ProductView implements ViewInterface<Product> {
    render(product: Product): string {

        return `
        <div class="product-item">
          <div class="product-item__img"></div>
          <div class="product-item__text-wrapper">
            <div class="product-item__cart-text">Add to cart</div>
          </div>
          <div class="product-item__info">
            <div class="item-info__name-price">
              <span class="item-info__name">${product.name}</span>
              <span class="item-info__price">$${product.price}</span>
            </div>
            <div class="item-info__color">Color: ${product.color}</div>
            <div class="item-info__colection">Colection: ${product.collection}</div>
            <div class="item-info__size">Size: ${product.size}cm</div>
            <div class="item-info__category">Categor: ${product.category}</div>
          </div>
        </div>
    `
    }
}