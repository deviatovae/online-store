import {ViewCallbacksInterface} from "./viewCallbacksInterface";

export interface ViewInterface<T> extends ViewCallbacksInterface {
    render(data?: T): string;
}
