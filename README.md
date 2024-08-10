# AnimalDex

AnimalDex es una aplicación web inspirada en la Pokédex, pero en lugar de capturar Pokémon, permite a los usuarios identificar animales reales utilizando la cámara de su dispositivo. La aplicación escanea al animal, y mediante una API hacia Gemini, detecta la especie y genera un archivo JSON con sus datos.

## Características

- **Búsqueda Básica por Nombre:** Los usuarios pueden buscar animales por su nombre para acceder rápidamente a su información.
- **Datos Básicos:** Muestra una tarjeta con información básica del animal, incluyendo nombre, familia, dieta, y más.
- **Favoritos:** Los usuarios pueden marcar sus animales favoritos para un acceso rápido.
- **Historial de Escaneos:** Se guarda un historial de los animales escaneados, con la fecha y hora del escaneo.
- **Modo Noche:** Interfaz de usuario optimizada para ambientes de poca luz.

## Instalación

1. Clona este repositorio en tu máquina local:
    ```bash
    git clone https://github.com/tu-usuario/animalDex.git
    ```
2. Navega al directorio del proyecto:
    ```bash
    cd animalDex
    ```
3. Instala las dependencias:
    ```bash
    npm install
    ```
4. Inicia la aplicación:
    ```bash
    npm start
    ```

## Uso

1. Abre la aplicación en tu navegador web.
2. Utiliza la cámara de tu dispositivo para escanear un animal.
3. AnimalDex detectará la especie y mostrará los datos básicos del animal.
4. Utiliza las funcionalidades de búsqueda, historial, y favoritos para explorar y organizar la información de los animales.

## API

AnimalDex utiliza la API de Gemini para detectar y obtener la información de los animales. Asegúrate de configurar las credenciales de la API en un archivo `.env` en la raíz del proyecto.

```env
VITE_IA_KEY=tu-api-key
```
## Capturas

<img src='https://i.imgur.com/yvTtVWv.png' width ='200'/>
<img src='https://i.imgur.com/YBPOJsu.png' width ='200'/>
<img src='https://i.imgur.com/Z48abhC.png' width ='200'/>
<img src='https://i.imgur.com/gGcb1bk.png' width ='200'/>
<img src='https://i.imgur.com/E86nn4I.png' width ='200'/>
