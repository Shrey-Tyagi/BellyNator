var coord;
 function clientShare(pass)
 {
	const net = require('net');

	// Connect to a server @ port 9898
	const client = net.createConnection({ port: 9898 }, () => {
	  //console.log('Log: CS');
	  client.write(pass);
	});

	client.on('data', (data) => {
	  //console.log(data.toString());
	  coord = data.toString();
	  client.end();
	  console.log(coord);
	});

	client.on('end', () => {
	  //console.log('Log: dis');
	});
}
clientShare("CC: 120x120");



