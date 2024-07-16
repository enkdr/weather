export default customElements.define('weather-block', class extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    set data(value) {
        this._data = value;
        this.render();
    }

    render() {
        if (!this._data) return;

        this.shadowRoot.innerHTML = `
<style>
 @import url("/static/css/app.css");
</style>
            <div class="weather-block">
                <h2>${this._data.location.name}, ${this._data.location.country}</h2>
                <p><strong>Temperature:</strong> ${this._data.current.temp_c} °C</p>
                <p><strong>Condition:</strong> ${this._data.current.condition.text}</p>
                <p><strong>Wind:</strong> ${this._data.current.wind_kph} km/h</p>
                <p><strong>Humidity:</strong> ${this._data.current.humidity}%</p>                
                <button class="remove-weather-block">Remove</button>
             </div>
        `;

        const removeBtn = this.shadowRoot.querySelector('.remove-weather-block');
        removeBtn.addEventListener('click', () => {
            this.remove();
        });
    }
});
