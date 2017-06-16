import { Router } from 'express';
import path from 'path';
import assert from 'assert';
import models from '../src/models';
import bodyParser from 'body-parser';
var spawn = require( 'child_process' ).spawn;

const { User } = models;
let datas = {
  name :['coke', '7up', 'apple juice'],
  time: [ [
    "Thu Jun 15 2017 20:50:15 GMT+0800 (CST)",
    "Thu Jun 11 2017 20:50:15 GMT+0800 (CST)"
  ], [
    "Thu Jun 15 2017 20:50:15 GMT+0800 (CST)",
  ], [
    "Thu Jun 15 2017 20:50:15 GMT+0800 (CST)",
    "Thu Jun 13 2017 20:50:15 GMT+0800 (CST)"
  ] ],
};

const returnRouter = function ( io ) {
  const router = new Router();
  router.use( bodyParser.urlencoded( { extended: false } ) );
  router.use( bodyParser.json() );

  io.on( 'connection', ( socket ) => {
    console.log("socket");
    socket.on( 'setHumidity', Humidity => io.emit( 'setHumidity', Humidity ) );
    socket.on( 'setTemperature', Temperature => io.emit( 'setTemperature', Temperature ) );
    socket.on( 'RFID', RFID => io.emit( 'RFID', RFID ) );
   } );


  router.post( '/setTrade', ( req, res ) => {
    console.log('/setTrade');
    const { productName, tradeTime } = req.body;
    const idx = datas.name.indexOf(productName);
    datas.time[ idx ].push(tradeTime);
    io.emit( 'setTrade', req.body );
    res.json( { test:9999 } );
  } );

  router.get( '/getCommodityDatas', async ( req, res ) => {
    res.json( { datas } );
  } );

  router.post( '/setCommodityDatas', async ( req, res ) => {
    const { name, time } = req.body;
    const idx = datas.name.indexOf(name);
    datas.time[idx].push(time);
  } );


  router.post( '/deposit', ( req, res ) => {
    const { deposit } = req.body;
    console.log( 'deposit', deposit );
  } );




  router.post( '/', ( req, res ) => {
    gamerooms.push( { roomname: 'default room', player_num: 1, max_player_num: 10, id: gamerooms.length } );
    res.json( gamerooms.length );
  } );
  return router;
};

module.exports = returnRouter;
