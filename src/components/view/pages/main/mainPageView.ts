import {ViewInterface} from "../../viewInterface";

export class MainPageView implements ViewInterface<void> {
    render(data: void): string {
        return `
<div class="find-container">
<div class="find-title">
  Find Christmas decorations to create
  a festive atmosphere at your home
</div>
<div class="find-input-wrapper">
  <input class="find-input" type="text" placeholder="Search..."/>
  <div class="find-input-img"></div>
</div>
</div>
<div class="store-page">
</div>
`
    }
}
