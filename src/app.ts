import express from 'express'
import config from 'config'
import cors from 'cors'
import ErrorHandler from '@Util/ErrorHandler'

const app = express()
app.use(cors())
app.use(express.json())

//ROUTES GO HERE

app.use(ErrorHandler)

const port = process.env.PORT || config.get<number>('Server.port')

function start() {
	try {
		app.listen(port, () => console.log(`Server started on port ${port}`))
	} catch (e) {
		console.error(e)
	}
}

start()
