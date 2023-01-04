import './productView.scss'

import {Product} from "../../../../types/product";
import {Controller} from "../../../../controller/controller";
import {View} from "../../../view";

import {Router} from "../../../../router/router";

type ProductViewDataType = {
    isInCart: boolean
    product: Product
}
/**
 * view отвечающий за формирование html для одного товара
 *   - используется в productListView
 */
export class ProductView extends View<ProductViewDataType> {
    render(data: ProductViewDataType): string {
        const productItemButton = !data.isInCart
            ? `<div class="product-item__cart-add" data-id="${data.product.id}">Add to cart</div>`
            : `<div class="product-item__cart-added" data-id="${data.product.id}">In cart</div>`

        return `
        <div class="product-item" data-id="${data.product.id}">
          <img class="product-item__img" data-id="${data.product.id}" src="${data.product.images[0]}" alt="product image">
          <div class="product-item__text-wrapper">
            ${productItemButton}
          </div>
          <div class="product-item__info">
            <div class="item-info__name-price">
              <span class="item-info__name">${data.product.name}</span>
              <span class="item-info__price">$${data.product.price}</span>
            </div>
            <div class="item-info__color">Color: ${data.product.color}</div>
            <div class="item-info__colection">Colection: ${data.product.collection}</div>
            <div class="item-info__size">Size: ${data.product.size}cm</div>
            <div class="item-info__category">Category: ${data.product.category}</div>
            <div class="item-info__in-stock">In stock: ${data.product.stock}</div>
          </div>
        </div>
    `
    }

    /**
     * После рендера (когда html компонента попадет в DOM) ставим обработчик события при клике на "Add to card"
     *   - находим все элементы (кнопки Add to card) с помощью селектора .product-item__cart-add
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

        document.querySelectorAll<HTMLElement>('.product-item__cart-add')
            .forEach((button) => {
                button.addEventListener('click', (event) => {
                  event.stopPropagation()
                    const button = event.currentTarget as HTMLElement
                    controller.addProductToCart(Number(button.dataset.id));
                })
            })

        document.querySelectorAll<HTMLElement>('.product-item__cart-added')
            .forEach((button) => {
                button.addEventListener('click', (event) => {
                    const button = event.currentTarget as HTMLElement
                    controller.removeProductFromCartAll(Number(button.dataset.id));
                })
            })

          document.querySelectorAll<HTMLElement>('.product-item__img')
          .forEach((button: HTMLElement) => {
              button.addEventListener('click', (event: Event) => {
                Router.redirectTo('/product/' + button.dataset.id);
              })
          })
    }
}


