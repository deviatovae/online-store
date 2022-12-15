import {Router} from "../router/router";
import {Pages} from "./pages";

export class App {
    private router: Router;
    private pages: Pages;

    public constructor() {
        this.pages = new Pages();
        this.router = new Router();
    }

    public start(): void {
        this.router.route('/', () => this.pages.main());
        this.router.fallback(() => this.pages.notFound());
        this.router.start();
    }
}
