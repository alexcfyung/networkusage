const express = require('express');
const app = express();
const si = require('systeminformation');
const fixDigit = 5;

app.get('/interfacelist', function (req, res) {
    console.log("Interface request received.");
	si.networkInterfaceDefault().then(di => {
		si.networkInterfaces().then(data => {
			console.log(data);
			const iListName = [];
			data.forEach(i => {
				if (di == i.iface) {
					iListName.push(i.iface + " (default)");
				} else {					
					iListName.push(i.iface);
				}
			});
			res.send(iListName);
		});
	})
	
});

app.get('/networkusage', function (req, res) {
    console.log("Network usage request received.");
	si.networkStats(req.query.iface).then(data => {
		if (req.query.X) {
			if (isNaN(req.query.X)) {
				res.status(400).send("X need to be a number");
				return;
			}
			if (data.ms == 0) {
				// rx_sec and tx_sec will be -1 when run the first time.
				setTimeout(function() {
					si.networkStats(req.query.iface).then(data2 => {
						// Make sure it cap at the overall rx/tx
						res.send({
							iface: data2.iface, 
							rx_in_X_min: ((data2.rx_sec * (req.query.X*60)) > data2.rx ? data2.rx : data2.rx_sec * (req.query.X*60)).toFixed(fixDigit) + " bytes", 
							tx_in_X_min: ((data2.tx_sec * (req.query.X*60)) > data2.tx ? data2.tx : data2.tx_sec * (req.query.X*60)).toFixed(fixDigit) + " bytes", 
							X: req.query.X});
					});
				}, 1000);
			} else {
				res.send({
					iface: data.iface,
					rx_in_X_min: ((data.rx_sec * (req.query.X*60)) > data.rx ? data.rx : data.rx_sec * (req.query.X*60)).toFixed(fixDigit) + " bytes", 
					tx_in_X_min: ((data.tx_sec * (req.query.X*60)) > data.tx ? data.tx : data.tx_sec * (req.query.X*60)).toFixed(fixDigit) + " bytes", 
					X: req.query.X});
			}
		} else {
			res.send({iface: data.iface, rx: data.rx + " bytes", tx: data.tx + " bytes"});
		}
		
	});
	
    
});

app.listen(process.env.PORT || 3000, function () {
    console.log('The server is listening at http://%s:%s', this.address().address, this.address().port);
});