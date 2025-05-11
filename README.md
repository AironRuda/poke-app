# 🎮 Poke-App

¡Bienvenido a Poke-App! Una aplicación moderna y divertida construida con Next.js que te permite explorar el mundo Pokémon.

## 🚀 Pasos para ejecutar el proyecto localmente

1. **Clona el repositorio**

   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd poke-app
   ```

2. **Instala las dependencias**

   ```bash
   npm install
   ```

3. **Configura las variables de entorno**
   Crea un archivo `.env` en la raíz del proyecto y agrega la siguiente variable:

   ```env
   NEXT_PUBLIC_API_URL="https://pokeapi.co/api/v2/"
   ```

4. **Inicia el servidor de desarrollo**

   ```bash
   npm run dev
   ```

5. **Abre tu navegador**
   La aplicación estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
poke-app/
├── src/
│   ├── app/          # Componentes y páginas de la aplicación
│   └── api/          # Configuración de Axios
├── public/           # Archivos estáticos
├── .next/           # Build de producción
└── [archivos de configuración]
```

### Tecnologías Principales

- **Next.js 15.3.2**: Framework de React para aplicaciones web
- **React 19**: Biblioteca para interfaces de usuario
- **TypeScript**: Superset tipado de JavaScript
- **Tailwind CSS**: Framework de utilidades CSS
- **React Query**: Manejo de estado y caché
- **Axios**: Cliente HTTP para peticiones a la API
- **Jest**: Framework de testing

## ✨ Funcionalidades Implementadas

### 🎯 Páginas Principales

#### 1. Pokédex

- Listado numérico de todos los Pokémon
- Sistema de paginación para navegar entre los Pokémon
- Filtrado por nombre o ID de Pokémon
- Interfaz intuitiva y responsive

#### 2. Filter by Type

- Sección desplegable con todos los tipos de Pokémon disponibles
- Filtrado dinámico al seleccionar un tipo específico
- Visualización de Pokémon relacionados con el tipo seleccionado
- Actualización en tiempo real de los resultados

#### 3. Pokémon Captured

- Lista ordenada de Pokémon capturados
- Funcionalidad para liberar Pokémon capturados
- Persistencia de datos de capturas
- Integración con las otras secciones para capturar Pokémon

### 🛠️ Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Genera la versión de producción
- `npm run start`: Inicia el servidor de producción
- `npm run test`: Ejecuta las pruebas
- `npm run lint`: Verifica el código con ESLint

## 🧪 Testing

El proyecto incluye configuración de Jest para pruebas unitarias y de integración. Puedes ejecutar las pruebas con:

```bash
npm test
```

## 🎥 Demostración

[Video de demostración de la aplicación]

## 📝 Notas Adicionales

- La aplicación utiliza la API pública de Pokémon
- Implementa las mejores prácticas de desarrollo web moderno
- Optimizada para SEO y rendimiento
- Gestión de estado y caché con React Query
- Configuración centralizada de Axios para peticiones HTTP
- El archivo `.env` es necesario para la configuración de la URL de la API de Pokémon

---

¡Espero que disfrutes explorando el mundo Pokémon con nuestra aplicación! 🎉
