import {Router} from "../router/router";
import {Pages} from "./pages";
import {subscribe} from "../../store/store";

/**
 * логика отрисовки приложения
 */
export class App {
    private router: Router;
    private readonly pages: Pages;

    public constructor() {
        this.pages = new Pages();
        this.router = new Router();
    }

    public start(): void {
        const mainPage = () => this.pages.main()
        const productPage = (id: string) => this.pages.product(id)
        const cartPage = () => {
            this.pages.cart()
        }
        const notFoundPage = () => this.pages.notFound()

        this.router.route('/', () => subscribe(mainPage));
        this.router.route('/product/:id', (id: string) => subscribe(productPage, id));
        this.router.route('/cart', () => subscribe(cartPage));
        this.router.fallback(() => subscribe(notFoundPage));

        this.router.start();
    }
}
