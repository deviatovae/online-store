import {ViewStorage} from "../view/viewStorage";
import {Controller} from "../controller/controller";
import {CartDataType} from "../types/cartDataType";

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

        this.controller.catalog((data) => {
            this.getPageContainer().innerHTML = this.views.mainPage.render(data)
            this.views.mainPage.afterRender(this.controller);
        })
    }

    public cart(): void {
        this.init();

        this.getPageContainer().innerHTML = this.views.cartPage.render()
        this.views.cartPage.afterRender(this.controller);
    }

    public payment(): void {
        this.init();

        this.controller.cart((cartData) => {
            this.getPageContainer().innerHTML = this.views.paymentPage.render(cartData)
            this.views.paymentPage.afterRender(this.controller);
        })
    }

    public notFound(): void {
        this.init();

        this.getPageContainer().innerHTML = this.views.notFoundPage.render();
    }

    private init() {
        this.controller.cart((cartData: CartDataType) => {
            const cartContainer = document.querySelector('#header-cart');
            if (cartContainer) {
                cartContainer.innerHTML = this.views.cartHeader.render(cartData);
                this.views.cartHeader.afterRender(this.controller)
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
