import {ViewInterface} from "./viewInterface";
import {HeaderCartView} from "./cartHeader/headerCartView";
import {MainPageView} from "./pages/main/mainPageView";
import {NotFoundPageView} from "./pages/notFound/notFoundPageView";
import {Product} from "../types/product";

/**
 * храним поля с view которые нужно вызывать в классе Pages
 */
export class ViewStorage {
    public readonly cartHeader: ViewInterface<Product[]>;
    public readonly mainPage: ViewInterface<void>;
    public readonly notFoundPage: ViewInterface<void>;

    constructor() {
        this.cartHeader = new HeaderCartView();
        this.mainPage = new MainPageView();
        this.notFoundPage = new NotFoundPageView();
    }
}
