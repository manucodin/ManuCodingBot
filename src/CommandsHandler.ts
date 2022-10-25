export class CommandsHandler {
    manage(channel: string, command: string, username: string): Promise<string> {
        return new Promise((resolve, reject) => {
            switch (command) {
                case '!twitter':
                    resolve(this.sendTwitterAccount())
                    break
                case '!github':
                    resolve(this.sendGithubAccount())
                    break
                case '!discord': 
                    resolve(this.sendDiscordServer())
                    break
                case '!instagram':
                    resolve(this.sendDiscordServer())
                    break
                case '!promo_luis':
                    resolve(this.makePromoLuis())
                    break
                case '!promo_altas':
                    resolve(this.makePromoAltas())
                    break
                default:
                    resolve(this.manageOtherCommands(command, username))
                    break
            }
        })        
    }

    private manageOtherCommands(command: string, username: string): string {
        if(/![0-9]*d[0-9]*/.test(command)) {
            return this.diceRoll(command, username)
        }

        return ''
    }

    private diceRoll(diceCommand: string, username: string): string {
        const diceParameters = diceCommand.replace('!', '').split('d')
        const numberOfDices = parseInt(diceParameters[0])
        const numberOfFaces = parseInt(diceParameters[1])

        console.log(`Dices ${numberOfDices}, faces ${numberOfFaces}`)

        if(numberOfDices === 1) {
            const result = Math.floor(Math.random() * (numberOfFaces - numberOfDices + 1) + numberOfDices)
            console.log(result)
            if(result === 1) {
                return `La pifiaste ${username} -> ${result}`
            } 
            
            if (result === numberOfFaces) {
                return `Éxito total ${username} -> ${result}`
            }

            return `${numberOfDices}d${numberOfFaces} = ${result}`
        } else {
            let totalValue = 0
            for(let dice = 0; dice < numberOfDices; dice++) {
                const newValue = Math.floor(Math.random() * (numberOfFaces - 1 + 1) + 1)
                totalValue += newValue

                console.log('--------------------------------')
                console.log(`Roll number: ${dice}`)
                console.log(`Roll value: ${newValue}`)
                console.log(`Roll summatory: ${totalValue}`)
                console.log('--------------------------------')
            }
            return `${numberOfDices}d${numberOfFaces} = ${totalValue}`
        }
    }

    private sendTwitterAccount(): string {
        return `Mi cuenta de Twitter: ${process.env.TWITTER_URL}`
    }

    private sendGithubAccount(): string {
        return `Mi repositorio de Github: ${process.env.GITHUB_URL}`
    }

    private sendDiscordServer(): string {
        return `Discord de la comunidad: ${process.env.DISCORD}`
    }

    private sendInstagramAccount(): string {
        return `Mi cuenta de Instagram: ${process.env.INSTAGRAM_URL}`
    }

    private makePromoLuis(): string {
        return `Canal de Twitch de @${process.env.LUIS_LLAMAS_USER}: ${process.env.LUIS_LLAMAS_TWITCH}`
    }

    private makePromoAltas(): string {
        return `Canal de Twitch de @${process.env.ALTAS_USER}: ${process.env.ALTAS_TWITCH}`
    }
}

