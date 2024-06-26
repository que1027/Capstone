import html from "html-literal";

export default item => {
    return html`
    <li>
        <button class="${item.class}"><a href="${item.url}"  data-navigo>${item.text}</a></button>
    </li> 
`;
};