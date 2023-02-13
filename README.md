1. Clone the repository to your local drive by GIT. 
2. Initial node modules.
3. Create Firebase account and Realtime Database.
		EXAMPLE STRUCTURE: 
				
		{
		"users": {
			"admin": {
				"barcode": number,
				"login": string,
				"password": string
		}
		}
4. Make config.js in root folder with code:

		const  firebaseConfig = {
			databaseURL:  "YOUR DATABASE LINK",
		};
		export {
			firebaseConfig
		}
5. Make users.js file in login folder that include code: 

		const  user1 = {
			login :  "YOUR RANDOM LOGIN",
			password :  "YOUR RANDOM PASSWORD
		};
		const  user2 = {
			login :  "YOUR RANDOM LOGIN"",
			password :  "YOUR RANDOM PASSWORD"
		};
		const  user3 = {
			login :  "YOUR RANDOM LOGIN"",
			password :  "YOUR RANDOM PASSWORD"
		};
		export{
			user1,user2,user3
		} 
7. Run all scripts from package.json.
