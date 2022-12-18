import {ViewInterface} from "./viewInterface";
import {Controller} from "../controller/controller";
import {ViewCallbacksInterface} from "./viewCallbacksInterface";

export abstract class View<T> implements ViewInterface<T> {
    protected views: { [key: string]: ViewCallbacksInterface } = {};

    abstract render(data?: T): string;

    public afterRender(controller: Controller): void {
        Object.values(this.views).forEach(view => view.afterRender(controller));
    }
}
