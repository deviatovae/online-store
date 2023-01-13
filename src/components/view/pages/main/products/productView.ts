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
        const {
            product: {id, images, name, price, color, collection, size, category, stock},
            isInCart
        } = data

        const productItemButton = !isInCart
            ? `<div class="product-item__cart-add" data-id="${id}">Add to cart</div>`
            : `<div class="product-item__cart-added" data-id="${id}">In cart</div>`

        return `
        <div class="product-item" data-id="${id}">
          <img class="product-item__img" data-id="${id}" src="${images[0]}" alt="product image">
          <div class="product-item__text-wrapper">
            ${productItemButton}
          </div>
          <div class="product-item__info">
            <div class="item-info__name-price">
              <span class="item-info__name">${name}</span>
              <span class="item-info__price">$${price}</span>
            </div>
            <div class="item-info__color">Color: ${color}</div>
            <div class="item-info__colection">Colection: ${collection}</div>
            <div class="item-info__size">Size: ${size}cm</div>
            <div class="item-info__category">Category: ${category}</div>
            <div class="item-info__in-stock">In stock: ${stock}</div>
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


