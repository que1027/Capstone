import html from "html-literal";

export default () => html`
  <form id="signInForm" method="POST">
    <label>
      Username
    </label>
    <input id="uName" />

    <label>
      Password
    </label>
    <input id="pass" />
    <label>
      &nbsp;
    </label>
    <!-- your other form fields go here -->
    <button id="ESubmit" type="submit">Send</button>
  </form>
`;
