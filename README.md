# CrowdStarter

CrowdStarter es una plataforma web de crowdfunding que permite a personas y organizaciones presentar sus proyectos, obtener visibilidad y buscar financiamiento directamente dentro de una comunidad interesada en apoyar nuevas iniciativas.

La plataforma busca conectar a quienes tienen una idea o proyecto con personas dispuestas a contribuir a su desarrollo, facilitando tanto la publicación de campañas como la búsqueda y realización de aportes.

## 1. Visión general

Convertir una buena idea en un proyecto real suele requerir algo más que motivación: también se necesitan financiamiento, visibilidad y personas dispuestas a confiar en ella.

CrowdStarter busca abordar esta problemática mediante una plataforma que facilite la conexión entre personas u organizaciones que necesitan financiamiento y una comunidad interesada en apoyar proyectos.

## 2. Objetivo y alcance

### Objetivo

El objetivo principal de CrowdStarter es proporcionar una plataforma web de crowdfunding que permita publicar campañas, descubrir proyectos y realizar aportes de manera sencilla.

### Alcance actual

Actualmente, la plataforma permite:

- Registrar usuarios.
- Iniciar y cerrar sesión.
- Crear campañas de crowdfunding.
- Consultar campañas disponibles.
- Buscar campañas.
- Aportar a campañas.
- Consultar el historial de aportes realizados.
- Gestionar las campañas creadas por un usuario.
- Activar campañas.
- Modificar campañas.
- Cancelar campañas.
- Eliminar campañas.
- Consultar y actualizar el perfil, cambiar contraseña y eliminar la cuenta con restricciones.
- Guardar y consultar campañas favoritas por usuario.

## 3. Funcionalidades actualmente implementadas

### Autenticación de usuarios

Los usuarios pueden registrarse e iniciar sesión en la plataforma para acceder a las funcionalidades que requieren autenticación.

### Gestión de campañas

Los usuarios pueden administrar sus propias campañas, incluyendo:

- Creación.
- Modificación.
- Activación.
- Cancelación.
- Eliminación.

### Exploración de campañas

Los usuarios pueden visualizar las campañas actualmente disponibles y utilizar un buscador para encontrar proyectos de su interés.

### Aportes

Los usuarios pueden realizar aportes a las campañas y consultar posteriormente su historial de aportes.

## 4. Tecnologías

CrowdStarter utiliza las siguientes tecnologías:

| Tecnología | Uso |
|---|---|
| **Bun** | Runtime, gestión de dependencias y testing unitario |
| **Vue** | Desarrollo del frontend |
| **Vite** | Herramienta de desarrollo y build del frontend |
| **SQLite** | Base de datos |
| **JavaScript** | Lenguaje principal |
| **Cypress** | Testing end-to-end |
| **Bun Test** | Testing unitario |


## 5. Requisitos previos

Antes de instalar CrowdStarter es necesario contar con:

- **Bun 1.4.2** o una versión compatible.
- Un sistema operativo compatible con Bun.
- Conexión a internet para instalar las dependencias.

No es necesario instalar Node.js para ejecutar el proyecto.

### Sistema operativo

El proyecto está pensado para funcionar en cualquier sistema operativo compatible con Bun, incluyendo:

- Windows
- Linux
- macOS

## 6. Instalación

### 6.1. Clonar el repositorio

Clona el repositorio de CrowdStarter:

```bash
git clone https://github.com/j4vin/Proyecto_pds.git
```

Ingresa al directorio del proyecto:

```bash
cd Proyecto_pds
```

### 6.2. Instalar dependencias

Ejecuta:

```bash
bun install
```

## 7. Ejecución

CrowdStarter requiere ejecutar el servidor de la API y el servidor de desarrollo del frontend.

### 7.1. Ejecutar la API

```bash
bun run dev:server
```

### 7.2. Ejecutar el frontend

En otra terminal:

```bash
bun run dev
```


### 7.3. URLs de desarrollo

Una vez iniciados ambos servicios:

- **Frontend:** http://localhost:5173
- **API:** http://localhost:3000

## 8. Ejecución de pruebas

### 8.1. Tests unitarios

Para ejecutar las pruebas unitarias:

```bash
bun test
```


### 8.2. Tests end-to-end

El proyecto utiliza Cypress para validar los flujos críticos desde la perspectiva del usuario.

Cypress obtiene la dirección de la aplicación mediante la variable de entorno `BASE_URL`. Si no se configura, utiliza `http://localhost:5173` de forma predeterminada.

Con la API y el frontend ejecutándose localmente, ejecuta toda la suite en modo headless:

```bash
bun run test:e2e
```

El comando equivalente, usando directamente el ejecutable local de Cypress, es:

```bash
bunx --no-install cypress run
```

Para seleccionar pruebas y depurarlas mediante la interfaz de Cypress, utiliza uno de estos comandos equivalentes:

```bash
bun run test:e2e:open
# o bien
bunx --no-install cypress open
```

Los modos `run` y `open` son alternativas: no es necesario ejecutarlos consecutivamente. `--no-install` evita descargas implícitas y requiere haber ejecutado previamente `bun install`.

Para utilizar otra dirección en Linux o macOS:

```bash
BASE_URL=http://servidor:puerto bun run test:e2e
```

En PowerShell:

```powershell
$env:BASE_URL = "http://servidor:puerto"
bun run test:e2e
```

Para reproducir localmente el flujo utilizado por Jenkins, con una base SQLite temporal:

```bash
bun run build
BASE_URL=http://localhost:5173 bash scripts/ci-e2e.sh
```

Este script requiere Bash y `curl`, además de los puertos 3000 y 5173 disponibles. En Windows debe ejecutarse desde WSL o un entorno Bash compatible. El script levanta la API y el frontend compilado, espera que ambos servicios estén disponibles, ejecuta Cypress en modo headless y genera reportes JUnit, logs y videos. Las capturas se generan automáticamente cuando falla una prueba.


### 8.3. Build

Para generar el build de producción:

```bash
bun run build
```


## 9. Uso básico

### 9.1. Registro e inicio de sesión

Al ingresar a CrowdStarter, el usuario debe registrarse o iniciar sesión para acceder a las funcionalidades de la plataforma.

### 9.2. Explorar campañas

Una vez autenticado, el usuario puede visualizar las campañas actualmente activas.

La plataforma también cuenta con un buscador que permite encontrar campañas de acuerdo con el interés del usuario.

### 9.3. Consultar una campaña

Al seleccionar una campaña, el usuario puede acceder a su información y conocer los detalles del proyecto.

### 9.4. Realizar un aporte

Desde la página de una campaña, el usuario puede realizar un aporte al proyecto.

Los aportes realizados quedan registrados y posteriormente pueden consultarse desde el historial de aportes del usuario.

### 9.5. Gestionar campañas propias

Los usuarios cuentan con una sección destinada a sus propias campañas.

Desde allí pueden:

- Crear nuevas campañas.
- Modificar campañas existentes.
- Activar campañas.
- Cancelar campañas.
- Eliminar campañas.


## Gestión del perfil — HU09

Desde **Mi perfil** puedes consultar y modificar nombre y correo, cambiar tu contraseña o eliminar la cuenta. La eliminación exige escribir `entiendo`, se bloquea si tienes campañas activas y conserva los aportes mediante anonimización.

- [Historia, criterios, API y pruebas](HU-09.md)

## Campañas favoritas — HU10

Desde el detalle de una campaña activa, selecciona **Guardar en favoritas**.
En **Mis favoritas** puedes abrir sus detalles o quitarlas de la selección.
Las favoritas se conservan entre sesiones y pertenecen únicamente a tu cuenta.
Las campañas canceladas dejan de ser visibles para otros usuarios, también en esta lista.

- [Historia, criterios y API](HU-10.md)
- [Verificación de favoritas](docs/HU10-verificacion.md)

## Integrantes

- Javiera Cortés
- Beatriz Vázquez

## Enlaces

- [Repositorio](https://github.com/j4vin/Proyecto_pds)
- [Video existente](https://youtu.be/O6EkOwl1mQY)
- [Cápsula de entrega 2](https://youtu.be/Fn5n3GNrePk)
- [Wiki](https://github.com/j4vin/Proyecto_pds/wiki)
- [Releases](https://github.com/j4vin/Proyecto_pds/releases)

## Integración continua — Entrega 3

El pipeline de Jenkins automatiza la validación completa del proyecto ante cambios en el repositorio.

Cada ejecución realiza las siguientes etapas:

1. Obtiene y limpia el código del repositorio.
2. Instala las dependencias.
3. Ejecuta 137 pruebas Bun.
4. Compila el frontend.
5. Levanta la API y el frontend utilizando una base SQLite temporal.
6. Ejecuta 24 escenarios Cypress distribuidos en 5 especificaciones.
7. Publica reportes JUnit y conserva logs, videos y capturas ante fallos.
8. Notifica mediante Slack si el pipeline finaliza correctamente o falla.

La dirección utilizada por Cypress no está fijada en las pruebas: se proporciona mediante `BASE_URL`. En Jenkins se utiliza `http://localhost:5173`, pero puede reemplazarse para ejecutar la suite contra otro entorno.

El pipeline marca la ejecución como fallida cuando una prueba Bun, la compilación o una prueba E2E no se completa correctamente.

- [Configuración base de CI/CD de la Entrega 2](docs/CI-CD.md)
- [Documentación y evidencias de la Entrega 3](https://github.com/j4vin/Proyecto_pds/wiki/Entrega-3)
- [Jenkins](https://crowdstarter-jenkins.duckdns.org/) (requiere autenticación)

- [Documento principal de entrega 2 y arquitectura](docs/ENTREGA-2.md)
- [Índice de evidencias](docs/evidencias/entrega-2/README.md)
- [Registro de cambios](CHANGELOG.md)
- [Notas de la release 2](docs/RELEASE-2.md)
