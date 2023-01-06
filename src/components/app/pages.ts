import {ViewStorage} from "../view/viewStorage";
import {Controller} from "../controller/controller";

/**
 * занимается отрисовкой конкретных страниц
 */
export class Pages {
    private readonly controller: Controller;
    private views: ViewStorage;
    private container = document.querySelector('#app') as HTMLElement;

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
        this.controller.catalog((data) => {
            this.container.innerHTML = this.views.mainPage.render(data)
            this.views.mainPage.afterRender(this.controller);
        })
    }

    public cart(): void {
        this.controller.cart((cartData) => {
            this.container.innerHTML = this.views.cartPage.render(cartData)
            this.views.cartPage.afterRender(this.controller);
        })
    }

    public product(id: string): void {
        this.controller.product(id, (product) => {
            this.container.innerHTML = this.views.productPage.render(product)
            this.views.productPage.afterRender(this.controller);
        })
    }

    public notFound(): void {
        this.container.innerHTML = this.views.notFoundPage.render();
    }
}
