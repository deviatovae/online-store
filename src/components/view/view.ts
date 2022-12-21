import {ViewInterface} from "./viewInterface";
import {Controller} from "../controller/controller";
import {ViewCallbacksInterface} from "./viewCallbacksInterface";

/**
 * общий абстрактный класс от которого наследуются все классы view.
 * класс использует Generic чтобы указать конкретный тип данных в методе render
 * - имеет поле views, в которое можно добавлять более мелкие view, которые могут потребоваться при отрисовке большого
 * - имеет абстрактный метод render, который должен быть реализован в дочерних классах
 * - имеет реализацию метода afterRender. Она пробегает по всем view, которые были установлены в объекте this.views и
 *      вызывает для них метод afterRender (т.к. они имеют интерфейс с этим методом)
 */
export abstract class View<T> implements ViewInterface<T> {
    protected views: { [key: string]: ViewCallbacksInterface } = {};

    abstract render(data?: T): string;

    public afterRender(controller: Controller): void {
        Object.values(this.views).forEach(view => view.afterRender(controller));
    }
}
