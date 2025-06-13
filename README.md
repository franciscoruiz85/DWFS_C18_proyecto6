# Proyecto 6 - API REST con Node.js, Express y MongoDB

Este proyecto es una API RESTful desarrollada como parte del curso de Desarrollo Web Full Stack (DWFS), Cohort 18 de UDD. Proporciona endpoints para gestionar usuarios y productos, con autenticación mediante JWT y documentación Swagger.

El proyecto está enfocado en una cervecería, los usuarios que les compran y los variados productos que ellos venden.


## 📦 Tecnologías y dependencias
- **Node.js**: Entorno de ejecución para JavaScript del lado del servidor.
- **Express**: Framework minimalista y flexible para aplicaciones web que proporciona un conjunto robusto de características.
- **MongoDB**: Base de datos NoSQL orientada a documentos que ofrece alto rendimiento, alta disponibilidad y escalabilidad fácil. Almacena datos en documentos flexibles similares a JSON, lo que permite esquemas dinámicos.
- **Mongoose**: ODM (Object Data Modeling) para MongoDB y Node.js que proporciona una solución basada en esquemas para modelar los datos de la aplicación.
- **bcryptjs**: Biblioteca para hashing de contraseñas, esencial para el almacenamiento seguro de credenciales.
- **jsonwebtoken (jwt)**: Estándar abierto para crear tokens de acceso que permiten la autenticación y autorización segura.
- **dotenv**: Módulo que carga variables de entorno desde un archivo .env a process.env.
- **cors**: Mecanismo que permite solicitar recursos restringidos en una página web desde un dominio diferente.
- **swagger-jsdoc**: Genera automáticamente documentación Swagger/OpenAPI a partir de comentarios JSDoc en tu código, manteniendo la documentación siempre sincronizada con la implementación real.
- **swagger-ui-express**: Sirve la interfaz interactiva de Swagger UI directamente desde tu aplicación Express, permitiendo probar los endpoints API directamente desde el navegador con una interfaz intuitiva.
- **nodemon** (dev): Herramienta esencial para desarrollo que monitorea cambios en los archivos y reinicia automáticamente el servidor Node.js, acelerando el ciclo de desarrollo al eliminar la necesidad de reinicios manuales constantes. Configurado en el script "dev" del package.json para un flujo de trabajo optimizado.


## 📁 Estructura del proyecto

![Imagen estructura del proyecto](./assets/images/readme/estructura.png)


## 🗄️ Base de Datos – MongoDB
Este proyecto utiliza MongoDB como sistema de gestión de base de datos NoSQL, alojado en la nube mediante MongoDB Atlas.


## 🔌 Conexión
La conexión a la base de datos se realiza usando la librería mongoose, un ODM (Object Data Modeling) para Node.js que permite interactuar con MongoDB mediante esquemas definidos.

La URI de conexión está definida en el archivo .env:
MONGODB_URI=mongodb+srv://mongodb+srv://`usuario`:`contraseña`@`cluster`/`nombre_base_de_datos`

La función connectDB() ubicada en src/config/db.js se encarga de iniciar la conexión al momento de arrancar el servidor.


## 🔐 Autenticación
El middleware authorization.js protege rutas que requieren un token JWT válido en el header.

Este middleware se encarga de verificar que:
- El encabezado Authorization esté presente.
- El token sea válido y no haya expirado.
- El formato del encabezado sea correcto:
    - Authorization: (Bearer `token` o Token `token`).


## 🧩 Esquemas
## 🧑‍💻 Usuario (User)
Ubicado en src/models/user.model.js, este esquema define los datos de cada usuario:

| Campo    | Tipo   | Requerido   | Descripción                    
| -------- | ------ | ---------   | ------------------------------
| username | String | ✅         | Nombre de usuario
| email    | String | ✅ (único) | Correo electrónico del usuario
| password | String | ✅         | Contraseña cifrada

## 🍺 Producto (Product)
Ubicado en src/models/product.model.js, este esquema define los productos registrados:

| Campo       | Tipo   | Requerido | Descripción                                 
| ----------- | ------ | --------- | -------------------------------------------
| productname | String | ✅        | Nombre del producto
| type        | String | ✅        | Tipo o categoría del producto
| cc          | Number | ❌        | Capacidad en centímetros cúbicos (opcional)
| price       | Number | ✅        | Precio del producto

**NOTA:** Ambos esquemas están configurados con timestamps: true, lo que permite que MongoDB registre automáticamente las fechas de creación y modificación (createdAt, updatedAt) de cada documento.


## Instalación
1. Clonar el repositorio: git clone `https://github.com/franciscoruiz85/DWFS_C18_proyecto6`
2. Instalar dependencias: npm install
3. Configurar variables de entorno:
    Crear un archivo .env en la raíz del proyecto con las siguientes variables:
    - MONGO_URI=mongodb+srv://`usuario`:`contraseña`@`cluster`/`nombre_base_de_datos`
    - URL=`http://localhost:3000`
    - PORT=`3000`
    - JWT_SECRET=`tu_secreto_para_jwt`


## Despliegue
El proyecto fue disponibilizado para su uso en línea a través de Railway [dwfsc18proyecto6-production.up.railway.app](https://dwfsc18proyecto6-production.up.railway.app/)


## 📄 Documentación Swagger
Accede a la documentación en: https://dwfsc18proyecto6-production.up.railway.app/api-docs/

![Imagen documentación swagger](./assets/images/readme/swagger.png)

## Endpoints
## 🧑‍💼 Endpoints de Usuario (/api/users)
| Método | Ruta           | Descripción                        | Autenticación
| ------ | -------------- | ---------------------------------- | -------------
| POST   | `/create`      | Registrar un nuevo usuario         | ❌
| POST   | `/login`       | Iniciar sesión y obtener token JWT | ❌
| GET    | `/verify-user` | Verificar validez del token        | ✅
| GET    | `/`            | Obtener todos los usuarios         | ❌
| PUT    | `/:id`         | Actualizar un usuario por ID       | ✅
| DELETE | `/:id`         | Eliminar un usuario por ID         | ✅

## 📦 Endpoints de Productos (/api/products)
| Método | Ruta   | Descripción                   | Autenticación
| ------ | ------ | ----------------------------- | -------------
| POST   | `/`    | Crear un nuevo producto       | ✅
| GET    | `/`    | Obtener todos los productos   | ❌
| PUT    | `/:id` | Actualizar un producto por ID | ✅
| DELETE | `/:id` | Eliminar un producto por ID   | ✅


## ✅ Conclusión
Este proyecto representa una API RESTful robusta y bien estructurada que implementa funcionalidades esenciales de gestión de usuarios y productos utilizando el stack Node.js, Express y MongoDB. Incorpora medidas de seguridad modernas mediante autenticación con JWT, lo que garantiza que solo usuarios autorizados puedan acceder a operaciones sensibles como la edición o eliminación de recursos.

Además, cuenta con documentación automática mediante Swagger, lo que facilita la comprensión, prueba y mantenimiento del sistema. Esta arquitectura modular permite escalar o adaptar fácilmente el proyecto a distintos contextos, como aplicaciones de e-commerce, sistemas de inventario o cualquier otro entorno donde se gestionen usuarios y productos.

En resumen, este proyecto es una base sólida para desarrollar aplicaciones web modernas que requieren una API segura, documentada y eficiente.
