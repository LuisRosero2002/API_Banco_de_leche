# Esquema de Base de Datos - Banco de Leche Humana

## 1. Visión General

La base de datos del sistema de Banco de Leche Humana está diseñada para gestionar todo el ciclo de vida de la leche materna donada, desde la captación de madres donantes hasta la distribución final a los beneficiarios. El esquema está compuesto por **más de 50 tablas** organizadas en módulos funcionales.

### Características Principales
- **Motor**: MySQL
- **ORM**: TypeORM
- **Prefijo de tablas SQL**: `blh` (Banco de Leche Humana)
- **Estrategia de nomenclatura**: snake_case
- **Integridad referencial**: Uso extensivo de Foreign Keys
- **Trazabilidad**: Cada proceso crítico tiene registro de empleado responsable y fechas

### ⚠️ Diferencias entre SQL Original y Entidades TypeORM

**IMPORTANTE:** Este documento refleja la implementación **actual** de las entidades TypeORM, que difiere en varios aspectos del script SQL original (`blh-1770351238.sql`). Las principales diferencias son:

1. **Nombres de tablas**: La mayoría de las tablas en TypeORM **NO usan el prefijo `blh`**
   - SQL: `blhusuarios`, `blhempleados`, `blhmadres_potenciales_friam_041`
   - TypeORM: `usuarios`, `empleados`, `madres_potenciales`

2. **Campos de auditoría**: TypeORM agrega automáticamente campos de timestamp en muchas tablas:
   - `created_at` (TIMESTAMP): Fecha de creación del registro
   - `update_at` (TIMESTAMP): Fecha de última actualización

3. **Auto-incrementos**: Todas las entidades TypeORM usan `@PrimaryGeneratedColumn("increment")`, mientras que el SQL original no siempre especifica AUTO_INCREMENT.

4. **Tipos de datos**:
   - `BIT(1)` en SQL → `INT` en TypeORM (valores 0 o 1)
   - `BIGINT` → `INT` en algunos casos
   - `VARCHAR(500)` → `VARCHAR` sin longitud especificada

5. **Campos nullable**: Muchos campos que en el SQL original no son nullable, en TypeORM están marcados como `nullable: true`.

6. **Campos adicionales**: Algunas entidades tienen campos que no existen en el SQL original:
   - `info_madres`: campo `celular` adicional
   - `info_madres`: `nombre` y `apellido` separados en lugar de `nombre_completo`

7. **Nombres de campos**: Algunos campos tienen nombres diferentes:
   - SQL: `id_info_madres` → TypeORM: `id_info_madre`
   - SQL: `id_madres_potenciales` → TypeORM: `id_madre_potencial`

**Recomendación**: Para desarrollo y mantenimiento, siempre referirse a las entidades TypeORM en `src/entities/` como fuente de verdad, ya que son las que definen la estructura real de la base de datos en producción.

---

## 2. Módulos Principales

### 2.1 Gestión de Usuarios y Seguridad

#### `usuarios`
Almacena las credenciales de acceso al sistema.

**Nota:** El nombre de la tabla en TypeORM es `usuarios` (sin prefijo `blh`).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_usuario` | INT (PK, AUTO_INCREMENT) | Identificador único del usuario |
| `id_empleado` | INT (FK) | Referencia al empleado asociado |
| `usuario` | VARCHAR | Nombre de usuario para login |
| `password` | VARCHAR | Contraseña hasheada (bcrypt) |
| `activo` | INT (default: 1) | Estado del usuario (1=activo, 0=inactivo) |
| `created_at` | TIMESTAMP | Fecha de creación del registro |
| `update_at` | TIMESTAMP | Fecha de última actualización |

**Relaciones:**
- `id_empleado` → `empleados.id_empleado` (OneToOne)

**Diferencias con SQL original:**
- Campos de auditoría `created_at` y `update_at` agregados por TypeORM
- `activo` es INT en lugar de BIT(1)

#### `sessions`
Gestiona las sesiones activas de usuarios.

**Nota:** El nombre de la tabla en TypeORM es `sessions` (sin prefijo `blh`).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_session` | INT (PK, AUTO_INCREMENT) | Identificador de sesión |
| `id_usuario` | INT (FK) | Usuario propietario de la sesión |
| `token` | TEXT | Token JWT de la sesión |
| `created_at` | TIMESTAMP | Fecha de creación (auto-generada) |
| `update_at` | TIMESTAMP | Última actualización (auto-generada) |

**Relaciones:**
- `id_usuario` → `usuarios.id_usuario` (OneToOne)

**Diferencias con SQL original:**
- Campos de auditoría auto-generados

#### `roles`
Roles del sistema.

**Nota:** El nombre de la tabla en TypeORM es `roles` (sin prefijo `blh`).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_rol` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `descripcion` | VARCHAR(255) | Descripción del rol |
| `activo` | BIT | Estado del rol (1=activo, 0=inactivo) |

#### `roles_usuario`
Asignación de roles a usuarios.

**Nota:** El nombre de la tabla en TypeORM es `roles_usuario` (sin prefijo `blh`).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_rol_usuario` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `id_usuario` | INT (FK) | Usuario |
| `id_rol` | INT (FK) | Rol asignado |

**Relaciones:**
- `id_usuario` → `usuarios.id_usuario` (ManyToOne)
- `id_rol` → `roles.id_rol` (ManyToOne)

---

### 2.2 Gestión de Personal

#### `empleados`
Registro de empleados del banco de leche.

**Nota:** El nombre de la tabla en TypeORM es `empleados` (sin prefijo `blh`).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_empleado` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `nombre` | VARCHAR | Nombre completo del empleado |
| `cargo` | VARCHAR | Cargo o función |
| `telefono` | INT | Número de contacto |
| `correo` | VARCHAR (nullable) | Email |
| `created_at` | TIMESTAMP | Fecha de creación del registro |
| `update_at` | TIMESTAMP | Fecha de última actualización |

**Nota:** Esta tabla es referenciada por casi todos los procesos como `responsable`, `profesional`, `auxiliar`, etc.

**Diferencias con SQL original:**
- Campos de auditoría `created_at` y `update_at` agregados por TypeORM
- Campo `correo` es nullable

---

### 2.3 Gestión de Madres

#### `info_madres`
Información personal compartida entre madres potenciales y donantes.

**Nota:** El nombre de la tabla en TypeORM es `info_madres` (sin prefijo `blh`).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_info_madre` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `nombre` | VARCHAR | Nombre |
| `apellido` | VARCHAR | Apellido |
| `documento` | VARCHAR | Documento de identidad |
| `fecha_nacimiento` | DATE | Fecha de nacimiento |
| `fecha_parto` | DATE (nullable) | Fecha del parto |
| `telefono` | VARCHAR (nullable) | Teléfono fijo |
| `celular` | VARCHAR (nullable) | Teléfono celular |
| `departamento` | VARCHAR (nullable) | Departamento de residencia |
| `ciudad` | VARCHAR (nullable) | Ciudad de residencia |
| `barrio` | VARCHAR (nullable) | Barrio |
| `direccion` | VARCHAR (nullable) | Dirección completa |
| `profesion` | VARCHAR (nullable) | Profesión |
| `eps` | VARCHAR (nullable) | Entidad Promotora de Salud |

**Diferencias con SQL original:**
- Campos `nombre` y `apellido` separados (en lugar de `nombre_completo`)
- Campo adicional `celular` no presente en el SQL original
- Mayoría de campos son nullable en la implementación actual

#### `madres_potenciales`
Madres identificadas como posibles donantes.

**Nota:** El nombre de la tabla en TypeORM es `madres_potenciales` (sin el sufijo FRIAM-041).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_madre_potencial` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `id_entidad` | INT (FK) | Entidad de salud asociada |
| `id_info_madre` | INT (FK) | Información personal |
| `educacion_presencial` | INT (nullable) | Recibió educación presencial (1=sí, 0=no) |
| `fecha_llamada` | DATE (nullable) | Fecha de contacto telefónico |
| `llamada` | ENUM('saliente', 'entrante') (nullable) | Tipo de llamada |
| `asesoria` | INT (nullable) | Recibió asesoría (1=sí, 0=no) |
| `donante_efectiva` | INT (nullable) | Se convirtió en donante (1=sí, 0=no) |
| `fecha_visita` | DATE (nullable) | Fecha de visita domiciliaria |
| `observacion` | TEXT (nullable) | Observaciones generales |
| `fecha_registro` | TIMESTAMP | Fecha de registro en el sistema (auto-generada) |

**Relaciones:**
- `id_entidad` → `entidades.id_entidad`
- `id_info_madre` → `info_madres.id_info_madre`
- `id_empleado` → `empleados.id_empleado`

**Diferencias con SQL original:**
- Todos los campos son nullable excepto el ID y fecha_registro
- Campo `llamada` es ENUM en lugar de VARCHAR
- `fecha_registro` es auto-generado con `@CreateDateColumn`

#### `madres_donantes_friam_018`
Madres activas como donantes (Formato FRIAM-018).

**Nota:** El nombre de la tabla en TypeORM mantiene el sufijo `friam_018`.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_madre_donante` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `id_madre_potencial` | INT (FK) | Referencia a madre potencial |
| `donante_exclusivo` | INT | Donante exclusiva (1=sí, 0=no) |
| `tipo_donante` | ENUM('interna', 'externa') | Tipo de donante |
| `recoleccion_domicilio` | INT | Acepta recolección en casa (1=sí, 0=no) |
| `capacitado` | VARCHAR | Estado de capacitación |
| `recibio_educacion` | TEXT | Lugar/tipo de educación recibida |
| `donante_apta` | INT (nullable) | Apta para donar (1=sí, 0=no) |
| `firma_donante` | TEXT (nullable) | Firma digital/ruta de la donante |
| `firma_profesional` | TEXT (nullable) | Firma del profesional |
| `firma_acompañante` | TEXT (nullable) | Firma del acompañante |
| `activo` | INT (default: 1) | Estado activo (1=activo, 0=inactivo) |
| `fecha_diligenciamiento` | TIMESTAMP | Fecha de registro (auto-generada) |

**Relaciones:**
- `id_madre_potencial` → `madres_potenciales.id_madre_potencial` (OneToOne)
- `id_empleado` → `empleados.id_empleado` (ManyToOne)

**Diferencias con SQL original:**
- Campo `donante_exclusivo` en lugar de solo tipo
- `tipo_donante` es ENUM en lugar de VARCHAR
- Campo adicional `firma_acompañante`
- Campo adicional `activo` para soft delete
- `recibio_educacion` en lugar de `recibio_educacion_en`
- `fecha_diligenciamiento` es auto-generado con `@CreateDateColumn`

#### Tablas Relacionadas con Madres Donantes

**`gestacion`**: Información del embarazo y parto.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_gestacion` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `id_madre_donante` | INT (FK) | Madre donante asociada |
| `lugar_control_prenatal` | TEXT | Lugar del control prenatal |
| `asistio_control_prenatal` | INT | Asistió a control (1=sí, 0=no) |
| `tipo_ips` | INT | Tipo de IPS (1=pública, 0=privada) |
| `peso_gestacion_inicial` | DOUBLE | Peso inicial en kg |
| `peso_gestacion_final` | DOUBLE | Peso final en kg |
| `talla` | FLOAT | Talla en cm |
| `parto_a_termino` | INT | Parto a término (1=sí, 0=no) |
| `pre_termino` | INT | Parto pretérmino (1=sí, 0=no) |
| `semanas` | INT | Semanas de gestación |
| `fecha_parto` | DATE | Fecha del parto |

**`hijos_madres`**: Hijos de la madre donante.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_hijos_madres` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `id_madres_donantes` | INT (FK) | Madre donante |
| `nombre` | VARCHAR | Nombre del hijo |
| `peso` | DOUBLE | Peso al nacer en gramos |

**`examenes_prenatal`**: Resultados de exámenes prenatales.

**Nota:** El nombre de la tabla en TypeORM es `examenes_prenatal` (sin prefijo `blh`).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_examenes_prenatal` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `id_madre_donante` | INT (FK) | Madre donante |
| `hemoglobina` | INT | Nivel de hemoglobina |
| `hematocrito` | INT | Nivel de hematocrito |
| `transfuciones` | INT | Recibió transfusiones (1=sí, 0=no) |
| `enfermedades_gestacion` | TEXT | Enfermedades durante gestación |
| `fuma` | INT | Fuma (1=sí, 0=no) |
| `alcohol` | INT | Consume alcohol (1=sí, 0=no) |

**Relaciones:**
- `id_madre_donante` → `madres_donantes_friam_018.id_madre_donante` (OneToOne)

**`medicamentos`**: Medicamentos y sustancias consumidas.

**Nota:** El nombre de la tabla en TypeORM es `medicamentos` (sin prefijo `blh`).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_medicamentos` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `id_madre_donante` | INT (FK) | Madre donante |
| `medicamento` | TEXT | Medicamentos consumidos |
| `psicoactivos` | TEXT | Sustancias psicoactivas |

**Relaciones:**
- `id_madre_donante` → `madres_donantes_friam_018.id_madre_donante` (OneToOne)

**`laboratorios`**: Resultados de laboratorios (VIH, Sífilis, etc.).

**Nota:** El nombre de la tabla en TypeORM es `laboratorios` (sin prefijo `blh`).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_laboratorios` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `id_tipo_laboratorio` | INT (FK) | Tipo de examen |
| `id_madre_potencial` | INT (FK) | Madre potencial |
| `resultado` | INT | Resultado (1=positivo, 0=negativo) |
| `fecha_vencimiento` | DATE | Fecha de vencimiento del resultado |
| `documento` | TEXT | Ruta del documento |
| `fecha_registro` | TIMESTAMP | Fecha de registro (auto-generada) |

**Relaciones:**
- `id_tipo_laboratorio` → `tipo_laboratorio.id_tipo_laboratorio`
- `id_madre_potencial` → `madres_potenciales.id_madre_potencial`

**`tipo_laboratorio`**: Tipos de exámenes de laboratorio.

**Nota:** El nombre de la tabla en TypeORM es `tipo_laboratorio` (sin prefijo `blh`).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_tipo_laboratorio` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `nombre` | VARCHAR | Nombre del tipo de examen |

---

### 2.4 Recolección de Leche

#### `rutas_recoleccion_friam_011`
Rutas de recolección domiciliaria (Formato FRIAM-011).

**Nota:** El nombre de la tabla en TypeORM mantiene el sufijo `friam_011`.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_ruta` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `fecha_registro` | TIMESTAMP | Fecha de creación de la ruta (auto-generada) |
| `jornada` | TEXT | Jornada (Mañana/Tarde/Noche) |
| `nombreConductor` | TEXT | Nombre del conductor |
| `placa_vehiculo` | VARCHAR | Placa del vehículo |
| `kilometraje_inicial` | DOUBLE | Kilometraje al inicio |
| `kilometraje_final` | DOUBLE (nullable) | Kilometraje al final |
| `hora_salida` | VARCHAR (nullable) | Hora de salida |
| `hora_llegada` | VARCHAR (nullable) | Hora de llegada |
| `id_empleado` | INT (FK) | Empleado responsable |
| `total_visitas` | INT (nullable) | Número de visitas realizadas |
| `volumen_total` | DOUBLE (nullable) | Volumen total recolectado en ml |

**Relaciones:**
- `id_empleado` → `empleados.id_empleado`

**Diferencias con SQL original:**
- Campo `fecha_registro` auto-generado en lugar de `fecha` manual
- Campo `nombreConductor` en lugar de `nombre_conductor`
- Mayoría de campos son nullable
- No tiene campo `fecha` manual

#### `casas_visitas`
Casas visitadas en cada ruta.

**Nota:** El nombre de la tabla en TypeORM es `casas_visitas` (sin prefijo `blh`).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_casa_visita` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `numero_casa` | INT | Número de casa en la ruta |
| `observacion` | TEXT (nullable) | Observaciones de la visita |
| `id_ruta` | INT (FK) | Ruta asociada |
| `id_madre_donante` | INT (FK) | Madre visitada |

**Relaciones:**
- `id_ruta` → `rutas_recoleccion_friam_011.id_ruta`
- `id_madre_donante` → `madres_donantes_friam_018.id_madre_donante`

**Diferencias con SQL original:**
- `id_casa_visita` en lugar de `id_casas_visitas`
- Campo adicional `numero_casa`
- `observacion` en lugar de `observaciones`

#### `temperatura_casas`
Control de temperatura en cada casa visitada.

**Nota:** El nombre de la tabla en TypeORM es `temperatura_casas` (sin prefijo `blh`).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_temperatura_casas` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `numero_casa` | INT | Número de casa en la ruta |
| `temperatura` | DOUBLE (nullable) | Temperatura del congelador en °C |
| `caja` | INT | Número de caja térmica |
| `id_ruta` | INT (FK) | Ruta asociada |

**Relaciones:**
- `id_ruta` → `rutas_recoleccion_friam_011.id_ruta`

**Diferencias con SQL original:**
- `temperatura` es DOUBLE y nullable

#### `temperaturas_rutas`
Control de temperatura de las cajas térmicas durante la ruta.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_temperatura_ruta` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `numero_caja` | INT | Número de caja térmica |
| `temperatura_salida` | DOUBLE | Temperatura al salir del banco |
| `temperatura_llegada` | DOUBLE (nullable) | Temperatura al regresar |
| `id_ruta` | INT (FK) | Ruta asociada |

**Relaciones:**
- `id_ruta` → `rutas_recoleccion_friam_011.id_ruta` (CASCADE DELETE)

**Diferencias con SQL original:**
- Tiene PK auto-increment `id_temperatura_ruta` en lugar de PK compuesta
- `numero_caja` en lugar de `id_caja`
- `temperatura_llegada` es nullable

#### `frascos_recolectados`
Frascos de leche recolectados en cada visita.

**Nota:** El nombre de la tabla en TypeORM es `frascos_recolectados` (sin prefijo `blh`).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_frascos_recolectados` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `volumen` | DOUBLE | Volumen en ml |
| `fecha_de_extraccion` | DATE | Fecha de extracción |
| `termo` | INT | Número de termo |
| `gaveta` | INT | Número de gaveta |
| `activo` | INT (default: 1) | Estado (1=activo, 0=inactivo) |
| `id_congelador` | INT (FK) | Congelador de almacenamiento |
| `id_casa_visita` | INT (FK) | Casa donde se recolectó |

**Relaciones:**
- `id_congelador` → `congelador.id_congelador`
- `id_casa_visita` → `casas_visitas.id_casa_visita`

**Diferencias con SQL original:**
- `id_frascos_recolectados` en lugar de `id_frasco_recolectado`
- Campo adicional `activo` para soft delete
- `id_congelador` en lugar de `id_cogelador` (typo corregido)
- `fecha_de_extraccion` sin typo

---

### 2.5 Sala de Extracción

#### `leche_sala_extraccion_friam_016`
Madres que extraen leche directamente en el banco (Formato FRIAM-016).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_leche_sala_extraccion` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `id_madre_potencial` | INT (FK) | Madre que extrae |
| `procedencia` | TEXT (nullable) | Procedencia (Urgencias, Hospitalización, etc.) |
| `consejeria` | INT (nullable) | Recibió consejería (1=sí, 0=no) |
| `fecha_registro` | DATE (nullable) | Fecha de registro |

**Relaciones:**
- `id_madre_potencial` → `madres_potenciales.id_madre_potencial`

**Diferencias con SQL original:**
- Todos los campos son nullable excepto el ID

#### `extraccion_friam_016`
Frascos extraídos en sala.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_extraccion` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `cantidad` | FLOAT | Volumen extraído |
| `hora` | TIME | Hora de extracción |
| `gaveta` | INT | Gaveta de almacenamiento |
| `id_congelador` | INT (FK) | Congelador |
| `id_leche_sala_extraccion` | INT (FK) | Registro de sala |
| `fecha_de_extrtaccion` | DATE | Fecha de extracción |
| `motivo_consulta` | TEXT | Motivo de la extracción |
| `observaciones` | TEXT | Observaciones |

---

### 2.6 Inventario de Leche Cruda

#### `entradas_salidas_friam_012`
Control de entradas y salidas de leche cruda (Formato FRIAM-012).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_entradas_salidas` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `id_madre_donante` | INT (FK) | Madre donante |
| `id_extraccion` | INT (FK, nullable) | Extracción en sala (opcional) |
| `id_frasco_recolectado` | INT (FK, nullable) | Frasco de ruta (opcional) |
| `procedencia` | TEXT (nullable) | Origen del frasco |
| `fecha_entrada` | DATE (nullable) | Fecha de ingreso al banco |
| `responsable_entrada` | INT (FK, nullable) | Empleado que recibe |
| `fecha_salida` | DATE (nullable) | Fecha de salida para procesamiento |
| `responsable_salida` | INT (FK, nullable) | Empleado que entrega |
| `fecha_vencimiento` | DATE (nullable) | Fecha de vencimiento |

**Relaciones:**
- `id_madre_donante` → `madres_donantes_friam_018.id_madre_donante`
- `id_extraccion` → `extraccion_friam_016.id_extraccion`
- `id_frasco_recolectado` → `frascos_recolectados.id_frascos_recolectados`
- `responsable_entrada` → `empleados.id_empleado`
- `responsable_salida` → `empleados.id_empleado`

**Diferencias con SQL original:**
- Todos los campos son nullable excepto ID
- Relaciones con empleados son nullable

---

### 2.7 Procesamiento de Leche

#### `control_reenvase_friam_032`
Control de reenvase de leche cruda para pasteurización (Formato FRIAM-032).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_control_reenvase` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `id_empleado` | INT (FK) | Empleado responsable |
| `fecha` | DATE | Fecha del reenvase |
| `id_madre_donante` | INT (FK) | Madre donante |
| `id_frasco_crudo` | INT (FK) | Frasco de leche cruda |

**Relaciones:**
- `id_frasco_crudo` → `entradas_salidas_friam_012.id_entradas_salidas` (OneToOne)
- `id_empleado` → `empleados.id_empleado`
- `id_madre_donante` → `madres_donantes_friam_018.id_madre_donante`

**Diferencias con SQL original:**
- Campo `id_frasco_crudo` en lugar de `frasco_crudo`

#### `frascos_pasteurizados`
Frascos de leche pasteurizada resultantes del reenvase.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_frasco_pasteurizado` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `numero_frasco` | INT (nullable) | Número de frasco |
| `id_control_reenvase` | INT (FK) | Control de reenvase |
| `volumen` | FLOAT (nullable) | Volumen en ml |
| `observaciones` | TEXT (nullable) | Observaciones |
| `activo` | BOOLEAN (default: true) | Estado (true=activo, false=inactivo) |

**Relaciones:**
- `id_control_reenvase` → `control_reenvase_friam_032.id_control_reenvase`

**Diferencias con SQL original:**
- `activo` es BOOLEAN en lugar de INT
- `numero_frasco` no es AUTO_INCREMENT ni UNIQUE
- Todos los campos excepto ID y activo son nullable

#### `ciclo` y `lote`
Organización de la pasteurización en ciclos y lotes.

**`ciclo`**: Ciclos de pasteurización

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_ciclo` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `numero_ciclo` | INT | Número del ciclo |

**Relaciones:**
- OneToMany con `lote`
- OneToOne con `temperatura_pasteurizador_friam_036`

**`lote`**: Lotes de leche para pasteurizar

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_lote` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `numero_lote` | INT | Número del lote |
| `id_ciclo` | INT (FK) | Ciclo asociado |
| `id_control_reenvase` | INT (FK) | Control de reenvase |

**Relaciones:**
- `id_ciclo` → `ciclo.id_ciclo`
- `id_control_reenvase` → `control_reenvase_friam_032.id_control_reenvase`

**Diferencias con SQL original:**
- Campo `curva` no existe en la entidad `ciclo` de TypeORM

---

### 2.8 Control de Calidad

#### `seleccion_clasificacion_friam_015`
Proceso de selección y clasificación de leche (Formato FRIAM-015).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_seleccion_clasificacion` | INT (PK) | Identificador único |
| `id_control_reenvase` | INT (FK) | Control de reenvase |
| `fecha` | DATE | Fecha del análisis |

#### `acidez_dornic`
Prueba de acidez Dornic.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_acidez` | INT (PK) | Identificador único |
| `primera` | INT | Primera medición |
| `segunda` | INT | Segunda medición |
| `tercera` | INT | Tercera medición |
| `resultado` | INT | Resultado promedio |
| `id_seleccion_clasificacion` | INT (FK) | Selección asociada |

#### `analisis_sensorial`
Análisis sensorial de la leche.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_analisis` | INT (PK) | Identificador único |
| `embalaje` | INT | Calificación del embalaje |
| `suciedad` | INT | Presencia de suciedad |
| `color` | INT | Calificación del color |
| `flavor` | INT | Calificación del sabor |
| `id_seleccion_clasificacion` | INT (FK) | Selección asociada |

#### `crematocrito`
Medición de contenido graso (crematocrito).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_crematocrito` | INT (PK) | Identificador único |
| `ct1`, `ct2`, `ct3` | INT | Mediciones de crema total |
| `cc1`, `cc2`, `cc3` | INT | Mediciones de crema compactada |
| `kcal` | INT | Kilocalorías calculadas |
| `id_seleccion_clasificacion` | INT (FK) | Selección asociada |

#### `info_seleccion_clasificacion`
Información adicional del proceso de selección.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_info_seleccion_clasificacion` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `id_seleccion_clasificacion` | INT (FK) | Selección asociada |
| `profesional` | INT | ID del profesional |
| `auxiliar` | INT | ID del auxiliar |
| `numero_frascos_pasteurizados` | INT | Cantidad de frascos |
| `volumen` | FLOAT | Volumen total |
| `lote_cultivos` | INT | Lote de cultivos |
| `fecha_vencimiento` | DATE | Fecha de vencimiento |
| `observaciones` | TEXT | Observaciones |
| `fecha_vencimiento_cultivos` | DATE | Vencimiento de cultivos |

---

### 2.9 Pasteurización

#### `temperatura_pasteurizador_friam_036`
Control de temperatura durante la pasteurización (Formato FRIAM-036).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_temperatura_pasteurizador` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `fecha` | DATE | Fecha de pasteurización |
| `id_lote` | INT (FK) | Lote pasteurizado |
| `id_ciclo` | INT (FK) | Ciclo de pasteurización |
| `hora_inicio` | VARCHAR(255) | Hora de inicio |
| `hora_finalizacio` | VARCHAR(255) | Hora de finalización |
| `id_calentamiento` | INT | Referencia a calentamiento |
| `id_enfriamiento` | INT | Referencia a enfriamiento |
| `responsable` | INT (FK) | Empleado responsable |
| `observaciones` | TEXT | Observaciones |

#### `calentamiento_pasteurizador`
Registro de temperaturas durante el calentamiento.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_calentamiento` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `id_temperatura_pasteurizador` | INT (FK) | Temperatura asociada |
| `minuto` | VARCHAR(255) | Minuto de la medición |
| `valor` | FLOAT | Temperatura medida |

#### `enfriamiento_temperatura`
Registro de temperaturas durante el enfriamiento.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_enfriamiento` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `id_temperatura_pasteurizador` | INT (FK) | Temperatura asociada |
| `minuto` | VARCHAR(255) | Minuto de la medición |
| `valor` | INT | Temperatura medida |

#### `curva_de_penetracion`
Validación de la curva de penetración térmica del pasteurizador.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_curva` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `numero_frascos` | INT | Número de frascos testigo |
| `tipo_frasco` | VARCHAR(255) | Tipo de frasco |
| `tipo_termometro` | VARCHAR(255) | Tipo de termómetro |
| `marca` | VARCHAR(255) | Marca del termómetro |
| `certificado` | VARCHAR(255) | Certificado de calibración |
| `agua_pasteurizador` | INT | Temperatura del agua |
| `temperatura_equipo` | FLOAT | Temperatura del equipo |
| `volumen` | INT | Volumen del frasco |
| `agua_enfriador` | FLOAT | Temperatura del enfriador |
| `temperatura_agua` | FLOAT | Temperatura del agua |
| `fecha` | DATE | Fecha de la prueba |
| `promedio_pasteurizador` | FLOAT | Promedio de temperatura |
| `minutos_pasteurizador` | INT | Minutos de pasteurización |
| `promedio_enfriador` | INT | Promedio de enfriamiento |
| `minutos_enfriador` | INT | Minutos de enfriamiento |
| `id_responsable_one` | INT (FK) | Responsable 1 |
| `id_responsable_two` | INT (FK) | Responsable 2 |

#### `pasteurizador` y `enfriador`
Mediciones detalladas durante la curva de penetración.

**`pasteurizador`**:
- Tiempo, frasco testigo, agua, muestra

**`enfriador`**:
- Tiempo, frasco testigo, agua, muestra

---

### 2.10 Control Microbiológico

#### `control_microbiologico_friam_014`
Control microbiológico de frascos pasteurizados (Formato FRIAM-014).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_control_microbiologico` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `id_frasco_pasteurizado` | INT (FK) | Frasco analizado |
| `id_info_control` | INT (FK) | Información del control |
| `fecha` | DATE | Fecha del análisis |
| `coliformes` | INT | Resultado de coliformes |
| `conformidad` | INT | Conformidad (1=conforme) |
| `prueba_confirmatoria` | INT | Resultado de prueba |
| `liberacion` | INT | Liberado para distribución |

#### `info_control_microbiologico`
Información compartida del control microbiológico.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_info_control` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `fecha_siembre` | DATETIME | Fecha de siembra |
| `primeta_lectura` | DATETIME | Fecha de primera lectura |
| `responsable_siembre` | INT (FK) | Empleado que siembra |
| `responsable_lectura` | INT (FK) | Empleado que lee |
| `responsable_procesamiento` | INT (FK) | Empleado procesador |
| `coordinador` | INT (FK) | Coordinador |

#### `conformidades_friam_017`
Conformidad física y sensorial del lote (Formato FRIAM-017).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_conformidades` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `fecha` | DATE | Fecha de evaluación |
| `envase` | INT | Frascos con envase conforme |
| `suciedad` | INT | Frascos sin suciedad |
| `color` | INT | Frascos con color conforme |
| `flavor` | INT | Frascos con sabor conforme |
| `acidez` | INT | Frascos con acidez conforme |
| `muestra_testeadas` | INT | Total de muestras |
| `muestras_reprobadas` | INT | Muestras reprobadas |
| `id_lote` | INT (FK) | Lote evaluado |

---

### 2.11 Inventario de Leche Pasteurizada

#### `entradas_salidas_pasteurizada_friam_013`
Control de entradas y salidas de leche pasteurizada (Formato FRIAM-013).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_entradas_salidas` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `gaveta` | INT (nullable) | Gaveta de almacenamiento |
| `id_responsable_entrada` | INT (FK, nullable) | Empleado que ingresa |
| `fecha_salida` | DATE (nullable) | Fecha de salida |
| `id_responsable_salida` | INT (FK, nullable) | Empleado que entrega |
| `id_frasco_pasteurizado` | INT (FK) | Frasco pasteurizado |

**Relaciones:**
- `id_responsable_entrada` → `empleados.id_empleado`
- `id_responsable_salida` → `empleados.id_empleado`
- `id_frasco_pasteurizado` → `frascos_pasteurizados.id_frasco_pasteurizado`

**Diferencias con SQL original:**
- Todos los campos son nullable excepto ID

---

### 2.12 Distribución de Leche

#### `distribucion_leche_procesada_friam_031`
Distribución de leche a beneficiarios externos (Formato FRIAM-031).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_distribucion` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `responsable` | VARCHAR(255) (FK) | Empleado responsable |
| `nombre_beneficiario` | VARCHAR(255) | Nombre del beneficiario |
| `identificacion` | INT | Documento del beneficiario |
| `semanas_gestacion` | INT | Semanas de gestación del bebé |
| `eps` | VARCHAR(255) | EPS del beneficiario |

#### `info_distribucion_leche_procesada`
Detalle de frascos distribuidos.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_info_distribucion` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `fecha` | DATE | Fecha de distribución |
| `volumen_distribuido` | FLOAT | Volumen entregado |
| `id_frasco_pasteurizado` | INT (FK) | Frasco distribuido |
| `tipo` | VARCHAR(255) | Tipo de leche |
| `exclusiva` | INT | Lactancia exclusiva |
| `id_distribucion` | INT (FK) | Distribución asociada |

#### `leche_distribucion_frhos_063`
Distribución interna a neonatos hospitalizados (Formato FRHOS-063).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_leche_distribucion` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `fecha` | DATE | Fecha de distribución |
| `id_madre_potencial` | INT (FK) | Madre/neonato receptor |
| `volumen_mañana` | FLOAT | Volumen turno mañana |
| `volumen_tarde` | FLOAT | Volumen turno tarde |
| `perdidas` | FLOAT | Volumen perdido |
| `id_empleado` | INT (FK) | Empleado responsable |

#### `ingreso_leche_pasteurizada_friam_013`
Ingreso de leche al lactario hospitalario (Formato FRIAM-013).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_ingreso_leche` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `fecha_dispensacion` | INT | Fecha de dispensación |
| `tipo` | VARCHAR(255) | Tipo de leche |
| `id_frasco_pasteurizado` | INT (FK) | Frasco ingresado |
| `id_madre_donante` | INT (FK) | Madre donante |

#### `lactario`
Detalle de dosificación en lactario.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_lactario` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `nombre` | VARCHAR(255) | Nombre del paciente |
| `cama` | INT | Número de cama |
| `volumen_dosificado` | FLOAT | Volumen dosificado |
| `medico` | VARCHAR(255) | Médico tratante |
| `dosificador` | VARCHAR(255) | Empleado dosificador |
| `id_ingreso_leche` | INT (FK) | Ingreso asociado |

---

### 2.13 Seguimiento y Visitas

#### `visita_seguimiento_friam_038`
Visitas de seguimiento a madres donantes (Formato FRIAM-038).

**Nota:** El nombre de la tabla en TypeORM es `visita_seguimiento_friam_038` (sin prefijo `blh`).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_visita_seguimiento` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `id_madre_donante` | INT (FK) | Madre visitada |
| `fecha` | DATE | Fecha de la visita |

**Relaciones:**
- `id_madre_donante` → `madres_donantes_friam_018.id_madre_donante`

#### `preguntas_friam_038`
Preguntas del formulario de seguimiento.

**Nota:** El nombre de la tabla en TypeORM es `preguntas_friam_038` (sin prefijo `blh`).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_pregunta` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `pregunta` | TEXT | Texto de la pregunta |

#### `respuestas_friam_038`
Respuestas del seguimiento.

**Nota:** El nombre de la tabla en TypeORM es `respuestas_friam_038` (sin prefijo `blh`).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_respuesta` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `id_visita_seguimiento` | INT (FK) | Visita asociada |
| `id_pregunta` | INT (FK) | Pregunta respondida |
| `respuesta` | INT (nullable) | Respuesta (valor numérico) |

**Relaciones:**
- `id_visita_seguimiento` → `visita_seguimiento_friam_038.id_visita_seguimiento`
- `id_pregunta` → `preguntas_friam_038.id_pregunta`

#### `datos_visita_seguimiento`
Datos adicionales de la visita de seguimiento.

**Nota:** El nombre de la tabla en TypeORM es `datos_visita_seguimiento` (sin prefijo `blh`).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_datos_visita` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `id_visita_seguimiento` | INT (FK) | Visita asociada |
| `observaciones` | TEXT (nullable) | Observaciones |
| `recomendaciones` | TEXT (nullable) | Recomendaciones |
| `firma_usuario` | TEXT (nullable) | Firma del usuario |
| `firma_evaluador` | TEXT (nullable) | Firma del evaluador |

**Relaciones:**
- `id_visita_seguimiento` → `visita_seguimiento_friam_038.id_visita_seguimiento` (OneToOne)

#### `visita_domiciliaria_friam_037`
Visitas domiciliarias a madres potenciales (Formato FRIAM-037).

**Nota:** El nombre de la tabla en TypeORM es `visita_domiciliaria_friam_037` (sin prefijo `blh`).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_visita` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `id_evaluacion_lactancia` | INT (FK) | Evaluación de lactancia |
| `id_madre_potencial` | INT (FK) | Madre visitada |
| `observaciones` | TEXT (nullable) | Observaciones |
| `recomendaciones` | TEXT (nullable) | Recomendaciones |
| `donante_efectiva` | INT (nullable) | Se convirtió en donante (1=sí, 0=no) |
| `firma_usuario` | TEXT (nullable) | Firma del usuario |
| `firma_evaluador` | TEXT (nullable) | Firma del evaluador |

**Relaciones:**
- `id_madre_potencial` → `madres_potenciales.id_madre_potencial` (OneToOne)
- `id_evaluacion_lactancia` → `evaluacion_lactancia.id_evaluacion_lactancia` (OneToOne)

**Diferencias con SQL original:**
- `id_visita` en lugar de `id_visita_domiciliaria_donante`
- `donante_efectiva` es INT en lugar de BIT(1)
- Todos los campos excepto IDs son nullable

#### `evaluacion_lactancia`
Evaluación de la técnica de lactancia.

**Nota:** El nombre de la tabla en TypeORM es `evaluacion_lactancia` (sin prefijo `blh`).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_evaluacion_lactancia` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `madre` | TEXT | Evaluación de la madre |
| `bebe` | TEXT | Evaluación del bebé |
| `pechos` | TEXT | Estado de los pechos |
| `posicionBebe` | TEXT | Posición del bebé |
| `agarrePecho` | TEXT | Agarre al pecho |
| `succion` | TEXT | Succión |
| `deglucion` | TEXT | Deglución |

**Diferencias con SQL original:**
- Campos en camelCase en lugar de snake_case
- Todos los campos son TEXT en lugar de VARCHAR(500)

#### `preguntas_friam_037`
Preguntas del formulario de visita domiciliaria.

**Nota:** El nombre de la tabla en TypeORM es `preguntas_friam_037` (sin prefijo `blh`).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_pregunta_friam037` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `descripcion` | TEXT | Texto de la pregunta |
| `id_clasificacion_pregunta` | INT (FK) | Clasificación de la pregunta |

**Relaciones:**
- `id_clasificacion_pregunta` → `clasificacion_preguntas.id_clasificacion_preguntas`

#### `respuestas_friam_037`
Respuestas de visitas domiciliarias.

**Nota:** El nombre de la tabla en TypeORM es `respuestas_friam_037` (sin prefijo `blh`).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_respuesta` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `id_pregunta` | INT (FK) | Pregunta respondida |
| `id_visita_domiciliario` | INT (FK) | Visita asociada |
| `respuesta` | INT (nullable) | Respuesta (valor numérico) |

**Relaciones:**
- `id_pregunta` → `preguntas_friam_037.id_pregunta_friam037`
- `id_visita_domiciliario` → `visita_domiciliaria_friam_037.id_visita`

#### `clasificacion_preguntas`
Clasificación de preguntas para visitas.

**Nota:** El nombre de la tabla en TypeORM es `clasificacion_preguntas` (sin prefijo `blh`).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_clasificacion_preguntas` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `descripcion` | TEXT | Descripción de la clasificación |

---

### 2.14 Entidades y Catálogos

#### `entidades`
Entidades de salud asociadas.

**Nota:** El nombre de la tabla en TypeORM es `entidades` (sin prefijo `blh`).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_entidad` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `nombre` | VARCHAR | Nombre de la entidad |
| `activo` | INT | Estado (1=activo, 0=inactivo) |

**Diferencias con SQL original:**
- Campo adicional `activo` para soft delete

#### `congelador`
Congeladores disponibles para almacenamiento.

**Nota:** El nombre de la tabla en TypeORM es `congelador` (sin prefijo `blh`).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_congelador` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `descripcion` | VARCHAR | Descripción del congelador |

#### `tipo_laboratorio`
Tipos de exámenes de laboratorio.

**Nota:** El nombre de la tabla en TypeORM es `tipo_laboratorio` (sin prefijo `blh`).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_tipo_laboratorio` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `nombre` | VARCHAR | Nombre del tipo de examen |
Clasificación de preguntas de formularios.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_clasificacion_preguntas` | INT (PK) | Identificador único |
| `descripcion` | TEXT | Descripción de la clasificación |

---

## 3. Relaciones Clave

### 3.1 Flujo de Leche Cruda

```
blhmadres_donantes_friam_018
    ↓
blhfrascos_recolectados (Ruta) / extraccion_friam_016 (Sala)
    ↓
entradas_salidas_friam_012 (Inventario Crudo)
    ↓
control_reenvase_friam_032
    ↓
frascos_pasteurizados
```

### 3.2 Flujo de Pasteurización

```
frascos_pasteurizados
    ↓
lote → ciclo → curva_de_penetracion
    ↓
temperatura_pasteurizador_friam_036
    ↓
calentamiento_pasteurizador / enfriamiento_temperatura
```

### 3.3 Flujo de Control de Calidad

```
frascos_pasteurizados
    ↓
seleccion_clasificacion_friam_015
    ├→ acidez_dornic
    ├→ analisis_sensorial
    └→ crematocrito
    ↓
control_microbiologico_friam_014
    ↓
conformidades_friam_017
```

### 3.4 Flujo de Distribución

```
frascos_pasteurizados
    ↓
entradas_salidas_pasteurizada_friam_013 (Inventario)
    ↓
distribucion_leche_procesada_friam_031 (Externa)
    ↓
info_distribucion_leche_procesada

O

frascos_pasteurizados
    ↓
ingreso_leche_pasteurizada_friam_013 (Lactario)
    ↓
lactario

O

leche_distribucion_frhos_063 (Neonatos Hospitalizados)
```

---

## 4. Consideraciones de Diseño

### 4.1 Integridad Referencial
- Todas las relaciones importantes están protegidas con Foreign Keys.
- Cascadas no están definidas explícitamente, lo que requiere manejo manual de eliminaciones.

### 4.2 Trazabilidad
- Cada proceso crítico registra:
  - Empleado responsable
  - Fecha de ejecución
  - Observaciones

### 4.3 Normalización
- El esquema está en 3FN (Tercera Forma Normal) en su mayoría.
- Algunas desnormalizaciones intencionales para mejorar rendimiento (ej. `volumen_total` en rutas).

### 4.4 Auto-incrementos
- Las tablas más recientes usan `AUTO_INCREMENT` para IDs.
- Tablas antiguas requieren generación manual de IDs.

### 4.5 Campos Únicos
- Varios campos marcados como `UNIQUE` que pueden causar conflictos:
  - `fecha_vencimiento` en laboratorios
  - `temperatura` en temperatura_casas
  - `volumen_total` en rutas
  - Estos probablemente deberían revisarse.

---