import html from "html-literal";
import Inception from "./assets/img/Inception.png";

export default () => html`
  <div id="movie-container">
    <div class="movie">
      <img class="mov" src=${Inception} alt="HTML" />
      <div class="caption">Inception</div>
    </div>
  </div>
`;
