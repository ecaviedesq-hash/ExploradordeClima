# EXPLORER

Aplicación web para consultar el clima actual de una ciudad o país usando la API pública de [OpenWeather](https://openweathermap.org/current).

## Uso

Abre `Index.html` desde un servidor local. Es recomendable usar Live Server en VS Code o ejecutar cualquier servidor estático en esta carpeta para evitar restricciones del navegador. Escribe una ciudad, pulsa **Buscar** y la aplicación mostrará la temperatura, sensación térmica, humedad y viento.

La interfaz contempla validación de búsquedas vacías, carga, resultado exitoso, errores con reintento e historial de las últimas cinco búsquedas exitosas mediante `localStorage`.

## API y respuesta

La función `buscarDatos(query)` usa `fetch` con `async/await` y consulta:

```text
https://api.openweathermap.org/data/2.5/weather?q=CIUDAD&appid=API_KEY&units=metric&lang=es
```

Los datos utilizados son `name`, `sys.country`, `main.temp`, `main.feels_like`, `main.humidity`, `wind.speed` y `weather[0]`.

La clave se encuentra en el JavaScript del navegador porque este proyecto es una práctica de frontend. En producción debería mantenerse en un backend o en una función serverless.

## Entrega Git

El trabajo se organiza en commits significativos:

1. `feat: crea interfaz base para consulta meteorologica`
2. `feat: conecta OpenWeather y renderiza resultados`
3. `feat: gestiona estados, validacion e historial`
