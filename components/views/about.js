import html from "html-literal";

export default state => html`
   
        <p>
    The weather in ${state.weather.city} is ${state.weather.description}. Temperature is ${state.weather.temp}F.
  </p>
`;