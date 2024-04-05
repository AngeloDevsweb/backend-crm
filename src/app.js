import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import clientRoutes from './routes/client.routes.js'
import contactRoutes from './routes/contact.routes.js'
import activityRoutes from './routes/activity.routes.js'
import contratRoutes from './routes/contrat.routes.js'

const app = express()

app.use(morgan('dev'))
// middleware para convertir los req body o que el back lo pueda entender con express
app.use(express.json())
app.use(cors())
app.use(cookieParser())


app.use("/api", authRoutes);
app.use(clientRoutes)
app.use(contactRoutes)
app.use(activityRoutes)
app.use(contratRoutes)

export default app