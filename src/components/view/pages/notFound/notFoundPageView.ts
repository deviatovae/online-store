import './notFoundPageView.scss';
import {View} from "../../view";

/**
 * возвращает html для страницы 404
 *
 * @todo доделать верстку/стили
 */
export class NotFoundPageView extends View<null> {
    public render(): string {
        return `
<div class="not-found">
  <h1>404</h1>
  <h2>Page is not found!</h2>
</div>
`
    }
}
