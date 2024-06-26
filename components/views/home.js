import html from "html-literal";
import bdy from "./assets/img/bdy.png";

export default () => html`
<span id="namesAndPic" style="height:48vw">
        <div id="names">
        <h1 id="name"></h1>
        <h1 id="lname"></h1>
        </div>
        <img id= "headshot" src=${bdy}>
        </span>
`;
