const MySQL = (new function MySQL() {
	let _server = {
		tunnel:		null,
		hostname:	'localhost',
		port:		3306,
		username:	'root',
		password:	null,
		database:	null
	};
	
	this.setConnection = function setConnection(tunnel, hostname, port, username, password, database) {
		_server.tunnel		= tunnel;
		_server.hostname	= hostname;
		_server.port		= port;
		_server.username	= username;
		_server.password	= password;
		_server.database	= database;
	};
	
	this.call = function call(data, callback) {
		KnuddelsServer.getExternalServerAccess().postURL(_server.tunnel, {
			data: data,
			onSuccess: function onSuccess(responseData, externalServerResponse) {
				callback(responseData);
			},
			onFailure: function(responseData, externalServerResponse) {
				callback(responseData);
			}
		});
	};
	
	this.query = function query(statement, callback) {
		this.call({
			action:		'query',
			hostname:	_server.hostname,
			port:		_server.port,
			username:	_server.username,
			password:	_server.password,
			database:	_server.database,
			query:		statement
		}, callback);
	};
}());
