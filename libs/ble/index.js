// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This basic example scans for BLE peripherals and
prints out details when found
*********************************************/
// Import the BLE library
var noble = require('noble');
// USB modules don't have to be explicitly connected

// Wait for the module to report that it is powered up first
noble.on('stateChange', function(state) {
    if (state === 'poweredOn') {
        console.log('beginning to scan...');
        // Begin scanning for BLE peripherals
        noble.startScanning();
    }
});

// When a peripheral is discovered
noble.on('discover', function(peripheral) {
    // Print out the address
    console.log('peripheral found at:', peripheral.address);
});

console.log('waiting for power up...');