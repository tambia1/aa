// https://www.npmjs.com/package/ws
// npm i ws -g
// ws


const { WebSocket, WebSocketServer } = require('C:/Users/A/node_modules/ws');


let clients = {};

const wss = new WebSocketServer({ port: 80 });

wss.on('connection', (ws, req) => {
	const ip = req.socket.remoteAddress;

	ws.clientId = new Date().getTime();
	ws.clientName = ws.clientId;

	console.log('connection client ip: ' + ip + ', id: ' + ws.clientId);

	//save client
	clients[ws.clientId] = ws.clientName;

	//send to the client his id
	ws.send(JSON.stringify({action: 'CONNECTED', clientId: ws.clientId, clientName: ws.clientName}));

	//send to all clients that we have new connection
    wss.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
        	client.send(JSON.stringify({action: 'CONNECTION', clientId: ws.clientId, clientName: ws.clientName, clients: clients}));
		}
	});

	//on error
	ws.on('error', () => {
		console.log('error');
	});
	
	//on client disconnect
	ws.on('disconnect', () => {
		console.log('disconnect');
	});
	
	//on message from client
	ws.on('message', (message, isBinary) => {
		let data = JSON.parse(message);
		
		console.log('Client sent the server: ' + JSON.stringify(data));

		//send to all clients the message (except to himself)
		switch (data.action) {
			case 'NAME': {
				ws.clientName = data.clientName;
				clients[ws.clientId] = ws.clientName;

				wss.clients.forEach((client) => {
					if (client.readyState === WebSocket.OPEN) {
						client.send(JSON.stringify({action: 'NAME', clientId: ws.clientId, clientName: ws.clientName, clients: clients}));
					}
				});
						
				break;
			}

			case 'MESSAGE': {
				wss.clients.forEach((client) => {
					if (client != ws && client.readyState === WebSocket.OPEN) {
						client.send(JSON.stringify({action: 'MESSAGE', clientId: ws.clientId, clientName: ws.clientName, message: data.message}));
					}
				});
						
				break;
			}
		}
	});
});


console.log('WebSockets Server Running');
