import {ViewInterface} from "./viewInterface";
import {HeaderCartView} from "./cartHeader/headerCartView";
import {MainPageView} from "./pages/main/mainPageView";
import {NotFoundPageView} from "./pages/notFound/notFoundPageView";
import {Product} from "../types/product";

export class ViewStorage {
    public readonly cartHeader = new HeaderCartView();
    public readonly mainPage = new MainPageView();
    public readonly notFoundPage = new NotFoundPageView();
}
