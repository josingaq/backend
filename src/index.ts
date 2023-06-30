import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import { config } from 'dotenv'
import { router } from './routes/index.routes.js'

config()

const app = express()

app.use(bodyParser.json())

app.use(cookieParser())

app.use(compression())

app.use(
  cors({
    origin: '*',
    credentials: true
  })
)

app.use(router)

const server = http.createServer(app)

const PORT = process.env.PORT ?? 4000

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
