import {HeaderView} from "./header/headerView";
import {MainPageView} from "./pages/main/mainPageView";
import {NotFoundPageView} from "./pages/notFound/notFoundPageView";
import CartPageView from "./pages/shoppingCart/cartPageView";
import {PaymentPageView} from "./pages/payment/paymentPageView";
import ProductPageView from "./pages/product/productPageView";


/**
 * храним поля с view которые нужно вызывать в классе Pages
 */
export class ViewStorage {

    public readonly cartHeader = new HeaderView();
    public readonly mainPage = new MainPageView();
    public readonly notFoundPage = new NotFoundPageView();
    public readonly cartPage = new CartPageView();
    public readonly paymentPage = new PaymentPageView();
    public readonly productPage = new ProductPageView();
}
