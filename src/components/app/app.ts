import {Router} from "../router/router";
import {Pages} from "./pages";
import store from "../store/store";

/**
 * логика отрисовки приложения
 */
export class App {
    private router: Router;
    private pages: Pages;

    public constructor() {
        this.pages = new Pages();
        this.router = new Router();
    }

    public start(): void {
        this.router.route('/', () => {
            this.pages.main()
            return store.subscribe(() => this.pages.main())
        });

        this.router.route('/product/:id', (id: string) => {
            this.pages.product(id)
            return store.subscribe(() => this.pages.product(id))
        });

        this.router.route('/cart', () => {
            this.pages.cart()
            return store.subscribe(() => this.pages.cart())
        });

        this.router.route('/payment', () => {
            this.pages.payment()
            return store.subscribe(() => this.pages.payment())
        });

        this.router.fallback(() => {
            this.pages.notFound()
            return store.subscribe(() => this.pages.notFound())
        });

        this.router.start();
    }
}
