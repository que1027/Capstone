import html from "html-literal";
import bdy from "./assets/img/bdy.png";

export default () => html`
  <button id="addEvent">Add Meeting</button>

  <span id="calendar"> </span>

  <div id="flow">
    <form id="schedForm" method="POST">
      <label>
        Name:
      </label>
      <input id="appName" />

      <label>
        Date
      </label>
      <input id="appDate" />
      <label>
        &nbsp;
      </label>
      <label>
        Time
      </label>
      <input id="appTime" />
      <label>
        Length
      </label>
      <select name="appLength" id="appLength">
        <option value="15">15 Min</option>
        <option value="30">30 Min</option>
        <option value="45">45 Min</option>
        <option value="60">1 Hour</option>
      </select>
      <!-- your other form fields go here -->
      <button id="appSubmit" type="submit">Send</button>
    </form>

    <svg id="sched" height="400px" width="700px">
      <rect
        width="700px"
        height="400px"
        stroke="green"
        stroke-width="6"
        fill="white"
      />
    </svg>
  </div>
`;
