import './productView.scss'

import {Product} from "../../../../types/product";
import {Controller} from "../../../../controller/controller";
import {View} from "../../../view";

/**
 * view отвечающий за формирование html для одного товара
 *   - используется в productListView
 */
export class ProductView extends View<Product> {
    render(product: Product): string {
        return `
        <div class="product-item">
          <div class="product-item__img"></div>
          <div class="product-item__text-wrapper">
            <div class="product-item__cart-text" data-id="${product.id}">Add to cart</div>
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

    /**
     * После рендера (когда html компонента попадет в DOM) ставим обработчик события при клике на "Add to card"
     *   - находим все элементы (кнопки Add to card) с помощью селектора .product-item__cart-text
     *   - вешаем на них обработчик по клику
     *   - обработчик получает элемент, из элемента берёт id и аттрибута data-id
     *   - вызывает метод контроллера addProductToCart и передает id продукта
     *
     * предполагается что:
     * контроллер должен будет добавить этот идентификатор продукта в корзину (в стейт),
     * что должно привести к изменению состояния,
     * что должно вызвать перерисовку компонентов
     */
    public afterRender(controller: Controller): void {
        super.afterRender(controller);

        document.querySelectorAll('.product-item__cart-text')
            .forEach((button: Element) => {
                button.addEventListener('click', (event: Event) => {
                    const button = event.target as HTMLElement
                    controller.addProductToCart(Number(button.dataset.id));
                })
            })
    }
}


