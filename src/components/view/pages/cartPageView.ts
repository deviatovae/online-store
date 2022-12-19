import {View} from "../view";
import {Controller} from "../../controller/controller";

export default class CartPageView extends View<void> {
    render(data?: void): string {
        return "<h1>This is cart page</h1>";
    }

    afterRender(controller: Controller) {
        super.afterRender(controller);
    }
}
