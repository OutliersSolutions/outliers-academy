# Outliers Academy Theme

Un tema moderno y elegante para plataformas de e-learning construido específicamente para Odoo.

## Características

- ✨ Diseño moderno y responsivo
- 🎨 Paleta de colores profesional
- 📱 Optimizado para móviles
- 🚀 Rendimiento optimizado
- 🔧 Fácil personalización
- 📚 Componentes específicos para cursos
- 👨‍🏫 Perfiles de instructores
- 📊 Seguimiento de progreso
- 🎓 Sistema de certificaciones

## Instalación

1. Copia el directorio del tema a tu carpeta de addons de Odoo
2. Actualiza la lista de aplicaciones
3. Instala el tema desde la interfaz de administración
4. Activa el tema en la configuración del sitio web

## Estructura del Tema

```
theme_outliers_academy/
├── __manifest__.py
├── static/
│   ├── description/
│   │   ├── icon.png
│   │   └── theme_screenshot.png
│   └── src/
│       ├── scss/
│       │   ├── variables.scss    # Variables de color y espaciado
│       │   ├── fonts.scss        # Tipografía
│       │   ├── base.scss         # Estilos base
│       │   ├── layout.scss       # Layout y estructura
│       │   ├── components.scss   # Componentes UI
│       │   └── courses.scss      # Estilos específicos de cursos
│       └── js/
│           └── theme.js          # JavaScript del tema
└── views/
    ├── layout.xml           # Layout principal
    ├── course_templates.xml # Plantillas de cursos
    └── assets.xml          # Definición de assets
```

## Personalización

### Colores

Los colores del tema se definen en `variables.scss`. Puedes personalizar la paleta editando las variables CSS:

```scss
:root {
  --oa-primary: #2F27CE;      // Color primario
  --oa-accent: #433BFF;       // Color de acento
  --oa-secondary: #DEDCFF;    // Color secundario
  // ... más variables
}
```

### Tipografía

El tema utiliza las fuentes Inter y Poppins. Puedes cambiarlas en `fonts.scss`:

```scss
--oa-font-primary: 'Inter', sans-serif;
--oa-font-headings: 'Poppins', sans-serif;
```

## Componentes Incluidos

### Botones
- `.oa-btn` - Botón base
- `.oa-btn-primary` - Botón primario
- `.oa-btn-secondary` - Botón secundario
- `.oa-btn-outline` - Botón con borde

### Tarjetas de Curso
- `.oa-course-card` - Tarjeta de curso
- `.oa-course-grid` - Grid de cursos
- `.oa-course-progress` - Barra de progreso

### Layout
- `.oa-container` - Contenedor principal
- `.oa-grid` - Sistema de grid
- `.oa-flex` - Utilidades flexbox

## Soporte

Para soporte y documentación adicional, visita [outliersacademy.com](https://outliersacademy.com)

## Licencia

LGPL-3

## Créditos

Desarrollado por Outliers Academy Team
