import {ViewStorage} from "../view/viewStorage";
import {Controller} from "../controller/controller";
import {CartType} from "../types/cartType";

/**
 * занимается отрисовкой конкретных страниц
 */
export class Pages {
    private controller: Controller;
    private views: ViewStorage;
    constructor() {
        this.controller = new Controller();
        this.views = new ViewStorage();
    }

    /**
     * отрисовывает страницу main.
     * вызывает контроллер для получения данных, передавая коллбэк который выполнится когда будут готовы данные.
     * в коллбэке мы вызываем рендер view (который вернет нам строку html) и вставляем ее в наш контейнер <main></main>
     * после чего вызываем afterRender, чтобы сооьщить, что в DOM добавились элементы
     */
    public main(): void {
        this.init();

        this.controller.catalog(() => {
            this.getPageContainer().innerHTML = this.views.mainPage.render()
            this.views.mainPage.afterRender(this.controller);
        })
    }

    public notFound(): void {
        this.init();

        this.getPageContainer().innerHTML = this.views.notFoundPage.render();
    }

    private init() {
        this.controller.cart((cartData: CartType) => {
            const cartContainer = document.querySelector('#header-cart');
            if (cartContainer) {
                cartContainer.innerHTML = this.views.cartHeader.render(cartData);
            }
        })
    }

    private getPageContainer(): HTMLElement {
        const container = document.querySelector('main');
        if (!container) {
            throw new Error('main tag not found');
        }

        return container;
    }
}
