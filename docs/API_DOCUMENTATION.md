# Documentación de API - Banco de Leche Humana

Este documento detalla **todos** los endpoints disponibles en la API del Banco de Leche Humana por módulo. Total aproximado: 110+ endpoints.

<!-- Tabla de Contenidos -->
- [Autenticación](#autenticación)
- [Usuarios](#usuarios)
- [Empleados](#empleados)
- [Entidades](#entidades)
- [Madres Potenciales](#madres-potenciales)
- [Madres Donantes](#madres-donantes)
- [Ruta de Recolección](#ruta-de-recolección)
- [Visitas Madres](#visitas-madres)
- [Seguimiento Madres](#seguimiento-madres)
- [Conformidad (Friam017)](#conformidad-friam017)
- [Control Microbiológico](#control-microbiológico)
- [Control Reenvase](#control-reenvase)
- [Curva Penetración](#curva-penetración)
- [Distribución (Friam031)](#distribución-friam031)
- [Leche Distribución (Frhos063)](#leche-distribución-frhos063)
- [Leche Sala Extracción](#leche-sala-extracción)
- [Selección y Clasificación](#selección-y-clasificación)
- [Temperatura Pasteurizador](#temperatura-pasteurizador)
- [Entradas y Salidas](#entradas-y-salidas)
- [Ingreso Pasteurizada (Frnut013)](#ingreso-pasteurizada-frnut013)

---

## Autenticación

### Login
**Descripción general:** Inicia sesión y obtiene token JWT.
**Método/URL:** `POST /api/login`
**Body:**
```json
{ "usuario": "mjimenez", "password": "Password123" }
```
**Query Parameters:** N/A
**Ejemplo de solicitud:** `POST /api/login`
**Headers requeridos:** `Content-Type: application/json`
**Ejemplo de respuesta:**
```json
{ "accessToken": "eyJ...", "user": { "id": 1, "usuario": "mjimenez" } }
```
**Notas importantes:** Token requerido para todas las demás rutas.

---

## Usuarios

### Crear Usuario
**Descripción general:** Crea un usuario asociado a un empleado.
**Método/URL:** `POST /api/CreateUser`
**Body:**
```json
{ "usuario": "jperez", "password": "123", "activo": 1, "empleado": { "id": 5 } }
```
**Query Parameters:** N/A
**Headers requeridos:** `Authorization: Bearer <token>`
**Ejemplo de respuesta:** JSON con usuario creado.

### Obtener Usuarios
**Descripción general:** Lista todos los usuarios.
**Método/URL:** `GET /api/users`
**Query Parameters:** N/A
**Headers requeridos:** `Authorization: Bearer <token>`
**Ejemplo de respuesta:** `[ { "id": 1, "usuario": "mjimenez" }, ... ]`

### Eliminar Usuario (Lógico)
**Descripción general:** Desactiva un usuario.
**Método/URL:** `PUT /api/deleteUser/:id`
**Query Parameters:** N/A
**Headers requeridos:** `Authorization: Bearer <token>`
**Ejemplo de respuesta:** `200 OK`

---

## Empleados

### Crear Empleado
**Descripción general:** Registra un nuevo empleado.
**Método/URL:** `POST /api/CreateEmpleado`
**Body:**
```json
{ "nombre": "Juan", "cargo": "Conductor", "telefono": 123456 }
```
**Headers requeridos:** `Authorization: Bearer <token>`

### Obtener Empleados
**Descripción general:** Lista todos los empleados.
**Método/URL:** `GET /api/GetEmpleados`
**Headers requeridos:** `Authorization: Bearer <token>`

---

## Entidades

### Obtener Todas las Entidades
**Descripción general:** Lista entidades de salud.
**Método/URL:** `GET /api/getAllEntidades`
**Headers requeridos:** `Authorization: Bearer <token>`

### Obtener Entidad por ID
**Descripción general:** Datos detallados de una entidad.
**Método/URL:** `GET /api/getEntidadById/:id`

### Crear Entidad
**Descripción general:** Crea una entidad.
**Método/URL:** `POST /api/createEntidad`
**Body:** `{ "nombre": "Hospital X" }`

### Eliminar Entidad
**Descripción general:** Desactiva una entidad.
**Método/URL:** `PUT /api/deleteEntidad/:id`

---

## Madres Potenciales

### Crear Madre Potencial
**Descripción general:** Registra madre potencial.
**Método/URL:** `POST /api/CreateMadrePotencial`
**Body:**
```json
{ "infoMadre": { "nombre": "Ana" }, "entidad": { "id": 1 }, "empleado": { "id": 2 } }
```

### Actualizar Madre Potencial
**Descripción general:** Edita datos de madre potencial.
**Método/URL:** `PUT /api/UpdateMadrePotencial/:id`

### Obtener Madre Potencial (Filtro)
**Descripción general:** Filtra por mes/año.
**Método/URL:** `GET /api/getMadresPotenciales?mes=5&anio=2025`

### Obtener Todas
**Descripción general:** Lista completa sin paginación.
**Método/URL:** `GET /api/getAllMadresPotenciales`

### Obtener Todas (Vista Donante)
**Descripción general:** Lista para convertir a donantes.
**Método/URL:** `GET /api/getAllMadresPotencialesByMadreDonante`

### Obtener Info Completa
**Descripción general:** Detalle completo por ID.
**Método/URL:** `GET /api/getInfoCompleteMadrePotencial/:id`

---

## Madres Donantes

### Crear Madre Donante
**Descripción general:** Convierte a donante.
**Método/URL:** `POST /api/CreateMadreDonante`
**Body:**
```json
{ "madreDonante": { "donanteApta": 1 }, "infoMadre": { "id": 10 } }
```

### Obtener Madre Donante
**Descripción general:** Lista donantes.
**Método/URL:** `GET /api/GetMadreDonante`

### Cargar PDF
**Descripción general:** Sube archivo PDF.
**Método/URL:** `POST /api/uploadPDFs`
**Body:** `FormData` con archivo `pdf`.

### Visualizar PDF
**Descripción general:** Descarga PDF.
**Método/URL:** `GET /api/pdfs/:filename`

---

## Ruta de Recolección

### Crear Ruta
**Método/URL:** `POST /api/createRutaRecoleccion`
**Body:** `{ "nombreConductor": "Luis", "placa": "ABC" }`

### Obtener Todas las Rutas
**Método/URL:** `GET /api/getAllRutasRecoleccion`

### Obtener Ruta por ID
**Método/URL:** `GET /api/getRutaRecoleccionById/:id`

### Actualizar Ruta
**Método/URL:** `PUT /api/updateRutaRecoleccion/:id`

### Crear Temperatura Casa
**Método/URL:** `POST /api/createTemperaturaCasas`
**Body:** `{ "numeroCasa": 1, "temperatura": 4, "ruta": { "id": 10 } }`

### Obtener Temperaturas Casas
**Método/URL:** `GET /api/getTemperaturasCasas/:id` (ID Ruta)

### Actualizar Temperatura Casa (ID)
**Método/URL:** `PUT /api/updateTemperaturaCasas/:id`

### Actualizar Temperatura Casa (Batch)
**Método/URL:** `PUT /api/updateTemperaturaCasas`

### Crear Visita Casa
**Método/URL:** `POST /api/createCasasVisitas`
**Body:** `{ "numeroCasa": 1, "madreDonante": { "id": 5 } }`

### Obtener Visitas Casas de Ruta
**Método/URL:** `GET /api/getCasasVisitas/:id` (ID Ruta)

### Actualizar Visita Casa
**Método/URL:** `PUT /api/updateCasas/:id`

### Crear Frascos Recolectados
**Método/URL:** `POST /api/createFrascosRecolectados`
**Body:** `{ "volumen": 200, "madreDonante": { "id": 5 } }`

### Obtener Frascos Recolectados (Por Ruta)
**Método/URL:** `GET /api/getFrascosRecolectados/:id`

### Actualizar Frascos
**Método/URL:** `PUT /api/updateFrascos/:id`

### Obtener Congeladores
**Método/URL:** `GET /api/getCongeladores`

### Crear Temperatura Ruta
**Método/URL:** `POST /api/createTemperaturaRuta`
**Body:** `{ "tipo": "Salida", "temperatura": 4 }`

### Obtener Temperatura Ruta
**Método/URL:** `GET /api/getTemperaturaRuta/:id`

### Actualizar Temperatura Ruta
**Método/URL:** `PUT /api/updateTemperaturaRuta/:id`

---

## Visitas Madres

### Crear Visita
**Método/URL:** `POST /api/CreateVisitaMadre`
**Body:** `{ "fecha": "2025-01-01", "estado": "Realizada" }`

### Obtener Visita por ID
**Método/URL:** `GET /api/GetVisitaMadre/:id`

### Guardar Respuestas Visita
**Método/URL:** `POST /api/SaveRespuestasVisitaMadre`
**Body:** `{ "respuestas": [ { "preguntaId": 1, "valor": 1 } ] }`

### Obtener Respuestas
**Método/URL:** `GET /api/GetRespuestasVisitaMadre/:id`

### Obtener Preguntas
**Método/URL:** `GET /api/GetPreguntasVisitaMadre`

### Obtener Categorías
**Método/URL:** `GET /api/GetCategoriasVisitaMadre`

---

## Seguimiento Madres

### Obtener Donantes Aptas
**Método/URL:** `GET /api/getMadresDonantesAptas`

### Obtener Visitas por Madre
**Método/URL:** `GET /api/getVisitasPorMadre/:idMadre`

### Crear Visita Seguimiento
**Método/URL:** `POST /api/crearVisitaSeguimiento`
**Body:** `{ "idMadreDonante": 10, "fecha": "2025-05-20" }`

### Actualizar Fecha
**Método/URL:** `PUT /api/actualizarFechaVisita`

### Obtener Preguntas FRIAM-038
**Método/URL:** `GET /api/getPreguntasFriam038`

### Guardar Respuestas y Datos
**Método/URL:** `POST /api/guardarRespuestasYDatos`

### Obtener Detalles Completos
**Método/URL:** `GET /api/getDetallesVisita/:idVisita`

---

## Conformidad (Friam017)

### Obtener Conformidades (Mes/Año)
**Método/URL:** `GET /api/conformidades/:mes/:anio`

### Obtener Conformidad por Lote
**Método/URL:** `GET /api/lote/:lote/:fecha`

### Crear Conformidad
**Método/URL:** `POST /api/conformidades`

---

## Control Microbiológico

### Obtener por Lote/Ciclo
**Método/URL:** `GET /api/getControlMicrobiologico/:idLote/:idCiclo`

### Crear Control
**Método/URL:** `POST /api/postControlMicrobiologico`
**Body:** `{ "infoControl": {...}, "controles": [...] }`

### Actualizar Control
**Método/URL:** `PUT /api/putControlMicrobiologico`

---

## Control Reenvase

### Obtener Frascos por Madre
**Método/URL:** `GET /api/getFrascosByMadreDonante/:id`

### Obtener Todos
**Método/URL:** `GET /api/getAllControlReenvase`

### Crear Control Reenvase
**Método/URL:** `POST /api/postControlReenvase`

### Actualizar Control Reenvase
**Método/URL:** `PUT /api/putControlReenvase`

### Obtener Control por ID
**Método/URL:** `GET /api/getControlReenvase/:id`

### Crear Frasco Pasteurizado
**Método/URL:** `POST /api/postFrascoPasteurizado`

### Actualizar Frasco Pasteurizado
**Método/URL:** `PUT /api/putFrascoPasteurizado/:id`

### Obtener Frascos por Control
**Método/URL:** `GET /api/getFrascoPasteurizadoByControlReenvase/:id`

### Obtener Todos Frascos Pasteurizados
**Método/URL:** `GET /api/getAllFrascosPasteurizados`

---

## Curva Penetración

### Obtener por Volumen
**Método/URL:** `GET /api/curva/:volumen`

### Obtener por ID
**Método/URL:** `GET /api/curva-id/:id`

### Crear Curva
**Método/URL:** `POST /api/curva`

### Actualizar Curva
**Método/URL:** `PUT /api/curva/:id`

---

## Distribución (Friam031)

### Obtener Distribución Mensual
**Método/URL:** `GET /api/distribucion/:mes/:anio`

### Obtener por ID
**Método/URL:** `GET /api/distribucion/:id`

### Crear Distribución
**Método/URL:** `POST /api/distribucion`

### Actualizar Distribución
**Método/URL:** `PUT /api/distribucion/:id`

### Obtener Frascos para Distribución
**Método/URL:** `GET /api/frascos-pasteurizados-distribucion`

---

## Entradas y Salidas

### Obtener Entradas/Salidas Leche Cruda
**Método/URL:** `GET /api/getEntradasSalidaLecheCruda/:mes/:anio`

### Crear Entrada/Salida Cruda
**Método/URL:** `POST /api/createEntradaSalidaLecheCruda`

### Actualizar Entrada/Salida Cruda
**Método/URL:** `PUT /api/putEntradaSalidaLecheCruda/:id`

### Obtener Entradas/Salidas Pasteurizada
**Método/URL:** `GET /api/getEntradasSalidaLechePasteurizada/:lote`

### Actualizar Entrada/Salida Pasteurizada
**Método/URL:** `PUT /api/putEntradaSalidaLechePasteurizada/:id`

---

## Ingreso Pasteurizada (Frnut013)

### Obtener Ingresos Mensuales
**Método/URL:** `GET /api/ingresos/:mes/:anio`

### Crear Ingreso
**Método/URL:** `POST /api/ingresos`

### Actualizar Ingreso
**Método/URL:** `PUT /api/ingresos/:id`

### Obtener Lactarios
**Método/URL:** `GET /api/lactarios/:id`

### Crear Lactario
**Método/URL:** `POST /api/lactarios`

### Actualizar Lactario
**Método/URL:** `PUT /api/lactarios/:id`

### Obtener Frascos para Ingreso
**Método/URL:** `GET /api/frascos-pasteurizados-ingreso`

---

## Leche Distribución (Frhos063)

### Crear Distribución Hospitalaria
**Método/URL:** `POST /api/postLecheDistribucion`

### Obtener Distribuciones
**Método/URL:** `GET /api/getLecheDistribucion`

### Actualizar Distribución
**Método/URL:** `PUT /api/putLecheDistribucion/:id`

### Obtener Neonatos/Madres Internas
**Método/URL:** `GET /api/getMadresInternasNoDonantes`

---

## Leche Sala Extracción

### Crear Registro Sala
**Método/URL:** `POST /api/postLecheSalaExtraccion`

### Agregar Frascos
**Método/URL:** `POST /api/postFrascosExtraccion`

### Obtener Todos
**Método/URL:** `GET /api/getAllLecheSalaExtraccion`

### Actualizar Registro Sala
**Método/URL:** `PUT /api/putLecheSalaExtraccion/:id`

### Actualizar Frascos
**Método/URL:** `PUT /api/putFrascosExtraccion/:id`

### Obtener Frascos por Sala
**Método/URL:** `GET /api/getFrascosRecolectadosBySalaExtraccion/:id`

---

## Selección y Clasificación

### Obtener Clasificación
**Método/URL:** `GET /api/getSeleccionClasificacion`

### Obtener Acidez
**Método/URL:** `GET /api/getAcidezDornic/:id`

### Obtener Análisis Sensorial
**Método/URL:** `GET /api/getAnalisisSensorial/:id`

### Obtener Crematocrito
**Método/URL:** `GET /api/getCrematocrito/:id`

### Crear Acidez
**Método/URL:** `POST /api/postAcidezDornic`

### Crear Análisis Sensorial
**Método/URL:** `POST /api/postAnalisisSensorial`

### Crear Crematocrito
**Método/URL:** `POST /api/postCrematocrito`

### Actualizar Selección
**Método/URL:** `PUT /api/putSeleccionClasificacion/:id`

### Actualizar Acidez
**Método/URL:** `PUT /api/putAcidezDornic/:id`

### Actualizar Análisis
**Método/URL:** `PUT /api/putAnalisisSensorial/:id`

### Actualizar Crematocrito
**Método/URL:** `PUT /api/putCrematocrito/:id`

---

## Temperatura Pasteurizador

### Obtener Temperaturas
**Método/URL:** `GET /api/temperatura-pasteurizador`

### Crear Temperatura
**Método/URL:** `POST /api/temperatura-pasteurizador`

### Crear Calentamiento
**Método/URL:** `POST /api/temperatura-pasteurizador/calentamiento`

### Crear Enfriamiento
**Método/URL:** `POST /api/temperatura-pasteurizador/enfriamiento`

### Actualizar Calentamiento
**Método/URL:** `PUT /api/temperatura-pasteurizador/calentamiento`

### Actualizar Enfriamiento
**Método/URL:** `PUT /api/temperatura-pasteurizador/enfriamiento`

### Actualizar Temperatura
**Método/URL:** `PUT /api/temperatura-pasteurizador/:id`

### Obtener Lotes Disponibles
**Método/URL:** `GET /api/lotes-disponibles`
