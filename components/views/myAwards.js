import html from "html-literal";
import comingSoon from "./assets/img/cs.jpg";
import HTML from "./assets/img/HTMLCert.jpg";
import js from "./assets/img/JSCert.jpg";
import ag from "./assets/img/agCert.jpg";
import sc from "./assets/img/savvyCert.png";
export default () => html`
  <div id="certificates-container">
    <div class="certificate">
      <img class="cert" src=${HTML} alt="HTML" />
      <div class="caption">HTML</div>
    </div>
    <div class="certificate">
      <img class="cert" src=${js} alt="Javascript" />
      <div class="caption">Javascript</div>
    </div>
    <div class="certificate">
      <img class="cert" src=${ag} alt="AZ-900" />
      <div class="caption">SavvyCoders</div>
    </div>
    <div class="certificate">
      <img class="cert" src=${sc} alt="Agile" />
      <div class="caption">Agile</div>
    </div>
    <div class="certificate">
      <img class="cert" src=${comingSoon} alt="Agile" />
      <div class="caption">Az-900</div>
    </div>
  </div>
`;
//add credly by pearson links
