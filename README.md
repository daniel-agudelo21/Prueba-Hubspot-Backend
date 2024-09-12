# Prueba-Hubspot-Backend
Esta prueba consiste en una API para gestionar contactos utilizando una integración con HubSpot. La API permite crear, obtener, actualizar y eliminar contactos, proporcionando una interfaz para interactuar con la misma. También se han incluido pruebas unitarias para asegurar la funcionalidad.

## Pasos para arrancar el programa
### Requisitos:
- Node.js (v14 o superior)
- NPM (v6 o superior)

### Configuración:
1. Clonar el repositorio:
   ```
   git clone https://github.com/daniel-agudelo21/Prueba-Hubspot-Backend.git
   ```
2. Ingresamos a la carpeta:
   ```
   cd Prueba-Hubspot-Backend
   ```
3. Instalar las dependencias:
   ```
   npm install
   ```
4. Crear un archivo .env en la raíz del proyecto con las siguientes variables:
   ```
   API_KEY=tu_api_key_de_hubspot
   API_URL=https://api.hubapi.com/crm/v3
   ```
5. Ejecutar la aplicación:
   ```
   node --watch index.js
   ```
6. Ejecutamos la interfaz ingresando al archivo `web/index.html`, le damos click derecho y luego open with Live Server, para esto podriamos descargar la extension `Live Server`, dentro del apartado extensiones de Visual Studio Code

## Pruebas unitarias
El proyecto incluye pruebas unitarias usando Jest y Supertest. Estas pruebas validan que los endpoints funcionen correctamente, simulando respuestas de la API externa de HubSpot.
### Ejecutar las pruebas
Abrimos la terminal con `ctrl + j` y escribimos:
```
npm test
```
Las pruebas están ubicadas en los archivos `__tests__/api.test.js` y `__tests__/validations.test.js` y cubren las siguientes funcionalidades:
- Prueba del endpoint GET /
- Prueba del endpoint POST /
- Prueba del endpoint PATCH /:id
- Prueba del endpoint DELETE /:id
- Pruebas de validaciones

## Tecnologías utilizadas
Este proyecto fue desarrollado utilizando las siguientes tecnologías:
- **Node.js**: Entorno de ejecución para el backend.
- **Express**: Framework minimalista para crear servidores en Node.js.
- **Axios**: Cliente HTTP para realizar peticiones a la API externa de HubSpot.
- **Jest**: Framework de pruebas unitarias para JavaScript.
- **Supertest**: Librería para realizar pruebas a las rutas HTTP en Express.
- **Zod**: Para la validación de datos en el backend.
