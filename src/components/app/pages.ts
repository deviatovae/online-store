import {ViewStorage} from "../view/viewStorage";
import {Controller} from "../controller/controller";
import {Product} from "../types/product";

export class Pages {
    private controller: Controller;
    private views: ViewStorage;

    constructor() {
        this.controller = new Controller();
        this.views = new ViewStorage();
        this.init();
    }

    public main(): void {
        this.controller.catalog(() => this.getPageContainer().innerHTML = this.views.mainPage.render())
    }

    public notFound(): void {
        this.getPageContainer().innerHTML = this.views.notFoundPage.render();
    }

    private init() {
        this.controller.cart((data: Product[]) => {
            const cartContainer = document.querySelector('#header-cart');
            if (cartContainer) {
                cartContainer.innerHTML = this.views.cartHeader.render(data);
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
