import { ChatClient } from "./ChatClient"

export class ManuCodingBot {
    private client = new ChatClient()

    start() {
        this.client.start()
    }

    stop() {
        this.client.stop()
    }
}