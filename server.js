var coord;
function serverShare(pass)
{
	const net = require('net');
	

	// Create a server object
	const server = net.createServer((socket) => {
	  socket.on('data', (data) => {
	    console.log(data.toString());
	    coord = data.toString();
	  //console.log(coord);
	  });

	  socket.write(pass);
	//  socket.end('SERVER: Closing connection now.\n');
	}).on('error', (err) => {
	  console.error(err);
	});

	// Open server on port 9898
	server.listen(9898, () => {
	  console.log('opened server on', server.address().port);

	}); 
}
serverShare("CS:100x090");


