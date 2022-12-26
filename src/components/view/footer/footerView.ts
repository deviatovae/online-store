import {View} from "../view";

export class FooterView extends View<void> {
    render(): string {
        // language=HTML
        return `
          <footer class="footer">
            <div class="footer__container wrapper">
              <div class="footer-github">
                <p>Creators:</p>
                <a class="github-link" href="https://github.com/AlexeiKozlovskiy" target="_blank">
                  <span class="github-link-img"></span>
                  <span class="github-person">Alexei Kozlovskiy</span>
                </a>
                <a class="github-link" href="https://github.com/deviatovae" target="_blank">
                  <span class="github-link-img"></span>
                  <span class="github-person">Alena Deviatova</span>
                </a>
              </div>
              <div class="footer-rsschool">
                <a class="rsschool-link" href="https://rs.school/js/" target="_blank">
                  <div class="rsschool-logo"></div>
                </a>
                <div class="footer-task">Online Store 2022</div>
              </div>
            </div>
          </footer>`
    }
}
