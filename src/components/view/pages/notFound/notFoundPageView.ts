import {ViewInterface} from "../../viewInterface";
import './notFoundPageView.scss';

export class NotFoundPageView implements ViewInterface<null> {
    render(): string {
        return `
<div class="not-found">
  <h1>404</h1>
  <h2>Page is not found!</h2>
</div>
`
    }
}
