import html from "html-literal";

export default () => html`
            <form id="eForm"
      method="POST"
    >
      <label>
        Your email:
      </label>
        <input  id="eSubject">
     
      <label>
        Your message:
      </label>
        <textarea id="eBody" name="message"></textarea>
        <label>
     &nbsp;
        </label>
      <!-- your other form fields go here -->
      <button id="ESubmit"  type="submit">Send</button>
    </form>
       
       
        `;
  

