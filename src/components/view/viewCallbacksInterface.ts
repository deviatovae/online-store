import {Controller} from "../controller/controller";

/**
 * интерфейс для всех view классов, который который содержит метод afterRender
 * этот метод вызывается после того как данные (html) view попадут в DOM дерево
 *
 * в качестве аргумента afterRender принимает контроллер (пока что будет один общий для всего)
 */
export interface ViewCallbacksInterface {
    afterRender(controller: Controller): void;
}
