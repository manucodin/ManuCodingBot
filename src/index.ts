import dotenv from 'dotenv'
import { ManuCodingBot } from './ManuCodingBot'

dotenv.config()

try {
	new ManuCodingBot().start()
} catch (error) {
	console.log(error)
}
