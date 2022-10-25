export class UsersHandler {
	manage(channel: string, username: string, self: boolean) {
		if (self) {
			return
		}

		console.log(`${username} is joined to channel ${channel}`)
	}
}
