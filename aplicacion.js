const API_KEY = 'f8691d177f1c032ff4950388e3cc3653';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const HISTORY_KEY = 'atlas-clima-history';
const form = document.querySelector('#search-form');
const input = document.querySelector('#city-input');
const results = document.querySelector('#results');
const emptyState = document.querySelector('#empty-state');
const loadingState = document.querySelector('#loading-state');
const loadingCity = document.querySelector('#loading-city');
const errorState = document.querySelector('#error-state');
const errorTitle = document.querySelector('#error-title');
const errorMessage = document.querySelector('#error-message');
const weatherCard = document.querySelector('#weather-card');
const retryButton = document.querySelector('#retry-button');
const validationMessage = document.querySelector('#validation-message');
const historyList = document.querySelector('#history-list');
const clearHistoryButton = document.querySelector('#clear-history');
let lastQuery = '';

function getHistory() {
	try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; } catch { return []; }
}

function saveToHistory(city) {
	const history = [city, ...getHistory().filter((item) => item.toLowerCase() !== city.toLowerCase())].slice(0, 5);
	localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
	renderHistory();
}

function renderHistory() {
	const history = getHistory();
	historyList.replaceChildren();
	clearHistoryButton.hidden = history.length === 0;
	history.forEach((city) => {
		const button = document.createElement('button');
		button.className = 'history-chip';
		button.type = 'button';
		button.textContent = city;
		button.addEventListener('click', () => buscarDatos(city));
		historyList.append(button);
	});
}

function setState(state) {
	emptyState.hidden = state !== 'empty';
	loadingState.hidden = state !== 'loading';
	errorState.hidden = state !== 'error';
	weatherCard.hidden = state !== 'success';
	results.setAttribute('aria-busy', state === 'loading' ? 'true' : 'false');
}

function showValidation(message) {
	validationMessage.textContent = message;
	validationMessage.hidden = false;
	input.setAttribute('aria-invalid', 'true');
}

function clearValidation() {
	validationMessage.hidden = true;
	input.removeAttribute('aria-invalid');
}

function renderWeather(data) {
	const temperature = Math.round(data.main.temp);
	const feelsLike = Math.round(data.main.feels_like);
	const description = data.weather[0].description;
	const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
	weatherCard.innerHTML = `<div class="card-topline"><span>Condiciones actuales</span><span>${new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}</span></div><div class="location-line"><div><p class="card-kicker">Ubicación</p><h2>${data.name}<span>, ${data.sys.country}</span></h2></div><img src="${iconUrl}" alt="${description}"></div><div class="temperature-line"><strong>${temperature}°</strong><span>${description}</span></div><div class="metrics"><div class="metric"><span class="metric-label">Sensación</span><strong>${feelsLike}°C</strong></div><div class="metric"><span class="metric-label">Humedad</span><strong>${data.main.humidity}%</strong></div><div class="metric"><span class="metric-label">Viento</span><strong>${Math.round(data.wind.speed * 3.6)} km/h</strong></div></div>`;
	setState('success');
}

async function buscarDatos(query) {
	const cleanQuery = query.trim();
	if (!cleanQuery) { showValidation('Escribe una ciudad o país para comenzar.'); input.focus(); return; }
	clearValidation();
	lastQuery = cleanQuery;
	input.value = cleanQuery;
	loadingCity.textContent = cleanQuery;
	setState('loading');
	try {
		const url = `${API_URL}?q=${encodeURIComponent(cleanQuery)}&appid=${API_KEY}&units=metric&lang=es`;
		const response = await fetch(url);
		const data = await response.json();
		console.log('Respuesta de la API:', data);
		if (!response.ok) throw new Error(response.status === 404 ? 'No encontramos esa ciudad o país.' : 'El servicio meteorológico no está disponible ahora.');
		renderWeather(data);
		saveToHistory(data.name);
	} catch (error) {
		errorTitle.textContent = error.message === 'Failed to fetch' ? 'Sin conexión' : 'No pudimos completar la búsqueda';
		errorMessage.textContent = error.message === 'Failed to fetch' ? 'Revisa tu conexión a internet e inténtalo de nuevo.' : error.message;
		setState('error');
	}
}

form.addEventListener('submit', (event) => { event.preventDefault(); buscarDatos(input.value); });
retryButton.addEventListener('click', () => buscarDatos(lastQuery));
input.addEventListener('input', clearValidation);
clearHistoryButton.addEventListener('click', () => { localStorage.removeItem(HISTORY_KEY); renderHistory(); });
renderHistory();
