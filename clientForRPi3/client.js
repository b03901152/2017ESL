var fetch = require('isomorphic-fetch');

var trade = {
        productName: 'coke',
        tradeTime: 'Thu Jun 15 2017 20:50:15 GMT+0800 (CST)',
};

fetch( 'http://52.179.13.42:3000/setTrade', {
headers: {
  Accept: 'application/json',
  'Content-Type': 'application/json',
},
method: 'POST',
body: JSON.stringify( trade ),
credentials: 'same-origin',
} )


