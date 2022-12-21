import {ViewCallbacksInterface} from "./viewCallbacksInterface";

/**
 * общий интерфейс для всех view классов, т.е все классы, которые возвращают html представление,
 * должны реализовывать метод render.
 * Этот интерфейс использует Generic, чтобы можно было указать какиой тип данных требуется для метода render
 */
export interface ViewInterface<T> extends ViewCallbacksInterface {
    render(data?: T): string;
}
