# EXPLORER

Aplicación web para consultar el clima actual de una ciudad o país usando la API pública de [OpenWeather](https://openweathermap.org/current).

## Uso

Abre `index.html` desde un servidor local o visita la versión publicada en GitHub Pages. Es recomendable usar Live Server en VS Code o ejecutar cualquier servidor estático en esta carpeta para evitar restricciones del navegador. Escribe una ciudad, pulsa **Buscar** y la aplicación mostrará la temperatura, sensación térmica, humedad y viento.

Versión publicada: <https://ecaviedesq-hash.github.io/ExploradordeClima/>

Para activar GitHub Pages, entra en `Settings > Pages` del repositorio, selecciona `Deploy from a branch`, elige la rama `main` y la carpeta `/ (root)`, y pulsa `Save`. El archivo de entrada debe conservar el nombre `index.html` en minúsculas.

La interfaz contempla validación de búsquedas vacías, carga, resultado exitoso, errores con reintento e historial de las últimas cinco búsquedas exitosas mediante `localStorage`.

## API y respuesta

La función `buscarDatos(query)` usa `fetch` con `async/await` y consulta:

```text
https://api.openweathermap.org/data/2.5/weather?q=CIUDAD&appid=API_KEY&units=metric&lang=es
```

Los datos utilizados son `name`, `sys.country`, `main.temp`, `main.feels_like`, `main.humidity`, `wind.speed` y `weather[0]`.

La clave se encuentra en el JavaScript del navegador porque este proyecto es una práctica de frontend. En producción debería mantenerse en un backend o en una función serverless.

## Entrega Git

El historial del proyecto conserva un flujo de trabajo con ramas y merges descriptivos:

- `main`: rama estable de entrega.
- `feature/consulta-clima`: desarrollo inicial de la aplicación.
- `docs/historial-git`: documentación del proceso de versionado.
- `chore/calidad-proyecto`: configuración de archivos auxiliares del proyecto.

Las ramas de trabajo se integran en `main` mediante merges explícitos (`--no-ff`), conservando el contexto de cada tarea.

Commits principales:

1. `feat: crea interfaz base para consulta meteorologica`
2. `feat: conecta OpenWeather y renderiza resultados`
3. `feat: gestiona estados, validacion e historial`
4. `style: actualiza identidad visual a Explorer`
5. `docs: documenta ramas y merges de la entrega`
