import { Client } from "tmi.js";
import { ConnectionHandler } from "./ConnectionHandler";
import { CommandsHandler } from "./CommandsHandler";
import { UsersHandler } from "./UsersHandler";

export class ChatClient {
    private client: Client
    private connectionHandler: ConnectionHandler
    private usersHandler: UsersHandler
    private commandsHandler: CommandsHandler

    constructor() {
        this.client = new Client({
            options: { 
                debug: true 
            },
            connection: { 
                secure: true,
                reconnect: true
            },
            identity: {
                username: process.env.TWITCH_USER,
                password: `oauth:${process.env.TWITCH_TOKEN}`
            },
            channels: [`${process.env.TWITCH_CHANNEL}`]
        })
        
        this.connectionHandler = new ConnectionHandler()
        this.usersHandler = new UsersHandler()
        this.commandsHandler = new CommandsHandler()
    }

    start() {
        this.client.connect().catch(console.log)

        this.client.on('connected', this.connectionHandler.manage)
        this.client.on('join', this.usersHandler.manage)
        this.client.on('part', this.usersHandler.manage)
        this.client.on('message', (channel, userstate, message, self) => {
            if (self) { return }

            const command = message.trim().toLowerCase()
            this.commandsHandler.manage(channel, command, userstate.username ?? 'Usuario').then( newMessage => {
                if(newMessage.length > 0) {
                    this.client.say(channel, newMessage)
                }
            }).catch(console.log)
        })
    }

    stop() {
        this.client.disconnect().catch(console.log)
    }
}