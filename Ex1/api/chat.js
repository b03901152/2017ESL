import { Router } from 'express';
import path from 'path';
import assert from 'assert';
import models from '../src/models';
import bodyParser from 'body-parser';
// var spawn = require( 'child_process' ).spawn;
import multer from 'multer';
import Message from '../src/DataStructure/Message';


var storage = multer.diskStorage({
   //设置上传后文件路径，uploads文件夹会自动创建。
      destination: function (req, file, cb) {
          cb(null, 'uploads/')
     }, 
   //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        // var fileFormat = (file.originalname).split(".");
        // const newFilename = fileFormat[ 0 ] + '-' + Date.now() + "." + fileFormat[ 1 ];
        cb( null, file.originalname );
    }
});  

var upload = multer( {
      storage
} );

const defaultMsg = new Message(
  'you',
  [
    'text',
    'defaultMsg',
  ],
  'default isread' );

const preState = {
  username: 'Myname',
  friendList: [
    {
      name: '1',
      msgs: [ defaultMsg ],
    },
    {
      name: '123',
      msgs: [ defaultMsg ],
    },
  ],
  chatIdx: 0,
};

let defaultFL = [
    {
      name: '1',
      msgs: [ defaultMsg ],
    },
    {
      name: '123',
      msgs: [ defaultMsg ],
    },
  ];

const { User } = models;
const returnRouter = function ( io ) {
  const router = new Router();
  router.use( bodyParser.urlencoded( { extended: false } ) );
  router.use( bodyParser.json() );
  var usernameList = [];
  var userFriendList = [ defaultFL, defaultFL, defaultFL ];
  var socketList = [];
  io.on( 'connection', socket => {
    console.log( 'usernameList:', usernameList );
    console.log( 'socketList:', socketList );
    socket.on( 'init', username => {
      const idx = usernameList.indexOf( username );
      if ( idx === -1 ) {
        usernameList.push( username );
        socketList.push( socket.id );
      } else {
        socketList[ idx ] = socket.id;
      }
    console.log( 'usernameList:', usernameList );
    console.log( 'socketList:', socketList );
    } );

    socket.on( 'disconnect', () => {
      const idx = socketList.indexOf( socket.id );
      socketList.splice( idx, 1 );
      usernameList.splice( idx, 1 );
    } );

   } );

  router.post( '/setChat', ( req, res ) => {
    console.log( '/setChat', req.body );
    const { msg, recipient } = req.body;
    console.log( 'msg', msg);
    console.log( 'recipient', recipient);

    const idx = usernameList.indexOf( recipient );
    console.log( 'idx', idx );
    // if( msg[ 0 ] !== 'text' )
      // msg[ 1 ] = uploadFilename
      io.to( socketList[ idx ] ).emit( 'getChat', msg );
    // else

// io.to( allClients[ i ] ).emit( 'index', i );
  } );

  router.post( '/upload',upload.single( "icon" ) ,( req, res ) => {
    console.log( 'req.file', req.file );
    console.log( 'req.originalname', req.file.originalname );
    console.log( 'req.body:', req.body );
    res.json( { originalname: req.file.originalname } );
  } );

  router.get( '/loadFriend', ( req, res ) => {
    console.log( 'loadFriend ');
    const id = req.session.loggedInUserId;
    // res.json( { friendList: userFriendList[ id ] } );
    res.json( { friendList: defaultFL } );
  } );

  router.post( '/addFriend', ( req, res ) => {
    console.log( 'req.body:', req.body );
    const id = req.session.loggedInUserId;
    console.log( 'id', id );
    userFriendList[ id ].unshift( req.body.friend );
    res.json( { friendList: userFriendList[ id ] } );
    // res.json( { originalname: req.file.originalname } );
  } );

  // router.post( '/setHumidity', ( req, res ) => {
  //   console.log('/setHumidity');
  //   const { Hunmidity } = req.body;
  //   io.emit( 'setHunmidity', Hunmidity );
  //   console.log(100);
  //   res.json( { test:9487 } );
  // } );


  // router.post( '/setTemperature', ( req, res ) => {
  //   console.log('/setTemperature');
  //   const { Temperature } = req.body;
  //   io.emit( 'setTemperature', Temperature );
  //   console.log(200);
  //   res.json( { test:9487 } );
  // } );

  // router.get( '/record', async ( req, res ) => {
  //   const weathers = await Weather.findAll( {
  //     limit: 8,
  //     order: [
  //       [ 'updatedAt', 'DESC' ]
  //     ],
  //   } );
  //   const temp = weathers.map( w => w.temperature );
  //   const humi = weathers.map( w => w.humidity );
  //   res.json( { recordTemperature: temp, recordHumidity: humi } );
  // } );

  // router.post( '/saveWeatherPerHour', async ( req, res ) => {
  //   const { Temperature, Humidity } = req.body;
  //   const weather = await Weather.create( {
  //     temperature: Temperature,
  //     humidity: Humidity,
  //   } );
  //   console.log('weather',Weather);
  // } );

  // router.get( 'predict', async ( req, res ) => {
  //   const weathers = await Weather.findAll( {
  //     limit: 20,
  //     order: [
  //       [ 'updatedAt', 'DESC' ]
  //     ],
  //   } );
  //   const temp = weathers.map( w => w.temperature );
  //   const humi = weathers.map( w => w.humidity );
  //   var ls = spawn( 'python3', [ 'newtest.py', ...temp, ...humi ] );

  //   ls.stdout.on( 'data', ( data ) => {
  //     let th = data.split(',');
  //     return res.json( { predictTemperature: th[0], predictHumidity: th[1] } );
  //   } );
  // } );




  // router.post( '/RFID', ( req, res ) => {
  //   console.log('/RFID');
  //   const { RFID } = req.body;
  //   console.log( RFID );
  //   io.emit( 'RFID', RFID );
  //   res.json( { test:9487 } );
  // } );

  // router.post( '/Number', ( req, res ) => {
  //   console.log('/Number');
  //   const { Number } = req.body;
  //   io.emit( 'Number', Number );
  //   res.json( { test:9487 } );
  // } );

  // router.get( '/surplus', ( req, res ) => {
  //   res.json( { surplus: 9999 } );
  // } );

  // router.post( '/deposit', ( req, res ) => {
  //   const { deposit } = req.body;
  //   console.log( 'deposit', deposit );
  // } );




  // router.post( '/', ( req, res ) => {
  //   gamerooms.push( { roomname: 'default room', player_num: 1, max_player_num: 10, id: gamerooms.length } );
  //   res.json( gamerooms.length );
  // } );
  return router;
};

module.exports = returnRouter;
