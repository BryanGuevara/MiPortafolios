# Portafolio de Bryan Guevara

Este repositorio contiene el portafolio web de Bryan Guevara, que presenta su experiencia laboral, estudios y proyectos destacados. 

## Estructura del Proyecto

El proyecto está compuesto por tres archivos HTML principales:

1. **index.html**: La página principal del portafolio.
2. **experiencia.html**: Muestra la experiencia laboral y estudios académicos de Bryan Guevara.
3. **proyectos.html**: Presenta los proyectos destacados de Bryan Guevara.

### index.html

- **Descripción**: Página principal del portafolio.
- **Contenido**:
  - Información personal.
  - Enlaces a proyectos destacados y experiencia laboral.
  - Enlaces a redes sociales.
  - Sección que muestra los lenguajes de programación más utilizados en los proyectos de GitHub de Bryan Guevara mediante un script JavaScript.

### experiencia.html

- **Descripción**: Detalla la experiencia laboral y los estudios académicos de Bryan Guevara.
- **Contenido**:
  - Experiencia laboral en diferentes roles y organizaciones.
  - Estudios académicos en diferentes instituciones.
  - Capacitación adicional y habilidades.

### proyectos.html

- **Descripción**: Muestra los proyectos destacados de Bryan Guevara.
- **Contenido**:
  - Lista de proyectos pinneados en GitHub, obtenida a través de la API GraphQL de GitHub.

## Scripts

- **`script.js`**: 
  - Obtiene los colores de los lenguajes de programación desde un archivo YAML en GitHub.
  - Calcula el porcentaje de bytes de código en cada lenguaje y muestra esta información en la página principal.

- **`pinneados.js`**:
  - Obtiene los proyectos pinneados en GitHub de Bryan Guevara usando la API GraphQL.
  - Muestra los proyectos en la página de proyectos destacados.

## Dependencias

- **JavaScript YAML**: Para parsear archivos YAML que contienen datos sobre lenguajes de programación.
- **GitHub API**: Para obtener información sobre repositorios y proyectos pinneados.