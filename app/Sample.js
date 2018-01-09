// MySQL-Klasse wird in die App geladen
require('classes/MySQL.js');

var App = (new function AppContainer() {
		this.onAppStart = function onAppStart() {
				// Setzen der Verbindungsinformationen (HTTPS wird empfohlen!)
				MySQL.setConnection('https://example.tld/MySQL.php', 'localhost', 3306, 'root', '*****', 'demo');
		};
		
		this.chatCommands = {
			Query: function Query(user, params) {
				if(user.isAppDeveloper()) {
					user.sendPrivateMessage('Du hast keine Berechtigungen um diese Aktion ausführen zu können');
					return;
				}
				
				MySQL.query(params, function onCallback(result) {
					user.sendPrivateMessage(result);
				});
			},
		};
}());
