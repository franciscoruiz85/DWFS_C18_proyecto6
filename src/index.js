const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const userRouter = require('./routes/user.routes')
const productRouter = require('./routes/product.routes')
const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const path = require('path')

require('dotenv').config()
const PORT = process.env.PORT || 5000
const serverUrl = process.env.URL || `http://localhost:${port}`

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API for managing users and products'
        },
        servers: [
            {
                url: serverUrl,
            }
        ]
    },
    apis: [`${path.join(__dirname, './routes/*.js')}`]
}
const swaggerDocs = swaggerJsDoc(swaggerOptions)

connectDB()
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto: ${PORT}`))
