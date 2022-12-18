import {Controller} from "../controller/controller";

export interface ViewCallbacksInterface {
    afterRender(controller: Controller): void;
}
