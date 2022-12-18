import './productView.scss'

import {Product} from "../../../../types/product";
import {Controller} from "../../../../controller/controller";
import {View} from "../../../view";


export class ProductView extends View<Product> {
    render(product: Product): string {
        return `
        <div class="product-item" data-id="${product.id}">
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

    public afterRender(controller: Controller): void {
        super.afterRender(controller);

        document
            .querySelector('.product-item__cart-text')
            ?.addEventListener('click', (el: Event) => {
                console.log(1111)
                const button = el.target as HTMLElement
                controller.addProductToCart(Number(button.dataset.id));
            });
    }
}
