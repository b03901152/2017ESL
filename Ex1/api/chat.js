import { Router } from 'express';
import path from 'path';
import assert from 'assert';
import models from '../src/models';
import bodyParser from 'body-parser';
// var spawn = require( 'child_process' ).spawn;
import multer from 'multer';
import MessageObj from '../src/DataStructure/Message';
const { UserGroup, Message, ChatGroup } = models;
var newFilename = '';
var storage = multer.diskStorage({
   //设置上传后文件路径，uploads文件夹会自动创建。
      destination: function (req, file, cb) {
          cb(null, 'uploads/')
     }, 
   //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        newFilename = fileFormat[ 0 ] + '-' + Date.now() + "." + fileFormat[ 1 ];
        cb( null, newFilename );
    }
});  



var upload = multer( {
      storage
} );

const defaultMsg = new MessageObj(
  'you',
  [
    'text',
    'welcome!',
  ],
  'default isread' );

const preState = {
  username: 'Myname',
  friendList: [],
  chatIdx: 0,
};

const { User } = models;
const returnRouter = function ( io ) {
  const router = new Router();
  router.use( bodyParser.urlencoded( { extended: false } ) );
  router.use( bodyParser.json() );
  var usernameList = [];
  var socketList = [];
  io.on( 'connection', socket => {
    // console.log( 'usernameList:', usernameList );
    // console.log( 'socketList:', socketList );
    socket.on( 'init', username => {
      const idx = usernameList.indexOf( username );
      if ( idx === -1 ) {
        usernameList.push( username );
        socketList.push( socket.id );
      } else {
        socketList[ idx ] = socket.id;
      }
    // console.log( 'usernameList:', usernameList );
    // console.log( 'socketList:', socketList );
    } );

    socket.on( 'disconnect', () => {
      const idx = socketList.indexOf( socket.id );
      socketList.splice( idx, 1 );
      usernameList.splice( idx, 1 );
      // console.log( socketList ,usernameList );
    } );

   } );

  router.post( '/setChat', async ( req, res ) => {
    // console.log( '/setChat', req.body );
    // console.log( 'req.session.loggedInUserId', req.session.loggedInUserId );
    const { 
      recipientGroupId,
      type,
      text, } = req.body;
    const msg = {
      senderUserId: req.session.loggedInUserId,
      recipientGroupId,
      type,
      text,
    };
    await Message.create( msg );
    const senderUser = await User.findById( req.session.loggedInUserId );
    msg.name = senderUser.name;
    msg.sentDate = new Date();
    const group = await UserGroup.all( { where: { GroupID: recipientGroupId } } );
    for ( let goupIdx = 0; goupIdx < group.length; goupIdx++ ) {
      // console.log( 'req.session.loggedInUserId ', req.session.loggedInUserId ,'idx',goupIdx);
      if ( group[ goupIdx ].userID !== req.session.loggedInUserId ) {
        // console.log( 'group[ idx ] inside',  goupIdx ,group[ goupIdx ]);
        // console.log( 'group[ idx ]', group[ goupIdx ] );
        // console.log( 'group[ idx ].userID', group[ goupIdx ].userID );
        const user = await User.findById( group[goupIdx ].userID );
        const UNLidx = usernameList.indexOf( user.name );
        // console.log( 'XXXXX', usernameList, socketList, UNLidx, user.name );
        if ( UNLidx !== -1 )
          io.to( socketList[ UNLidx ] ).emit( 'getChat', msg );
      }
    };


  } );

  router.post( '/upload',upload.single( "icon" ) ,( req, res ) => {
    console.log( 'req.file', req.file );
    console.log( 'req.originalname', req.file.originalname );
    console.log( 'req.body:', req.body );
    console.log( 'newFilename:', newFilename );
    res.json( { originalname: newFilename } );
  } );

  router.get( '/loadFriend', async ( req, res ) => {
    // console.log( 'loadFriend ');
    const id = req.session.loggedInUserId;
    const groups = await UserGroup.all( { where: { userId: id } } );
    // console.log( 'groups Len:', groups.length );
    if ( groups.length === 0 ) {
      const group = await ChatGroup.create( { } );
      const UG = { userID: req.session.loggedInUserId, groupID: group.id };
      // console.log( 'UG:', UG );
      await UserGroup.create( { 
        userID: req.session.loggedInUserId, 
        groupID:group.id } );
      res.json( {
      friendList: [ {
        groupID: group.id,
        name: 'system',
        msgs: [ defaultMsg ],
      } ],
    } );
    } else {
      let friendList = [];
      for ( let idx = 0; idx < groups.length; idx++ )
      {
        const group = groups[ idx ];
        // console.log( 'query group.groupID:', group.groupID );
        const userGroupOfOther = await UserGroup.all(
          { where: { groupID: group.groupID } } );
        let name;
        if ( userGroupOfOther.length > 2 )
          name = 'Group Chat(default)';
        else {
          // console.log( 'FL else', userGroupOfOther[ 0 ].id, userGroupOfOther[ 1 ].id );
          let id;
          if( userGroupOfOther[ 0 ].id === req.session.loggedInUserId )
            id = userGroupOfOther[ 1 ].id;
          else
            id = userGroupOfOther[ 0 ].id;
          const user = await User.findById( id );
          name = user.name;
          // console.log( 'the firned Name:', name );
        }
        const msgsInDB = await Message.all( {
          where: { recipientGroupId: group.groupID },
        } );
        // console.log( 'msgsInDB:', msgsInDB );
        // console.log( 'typeof( msgsInDB )', typeof( msgsInDB ) );
        const msgs = [];
        for ( let idx = 0; idx < msgsInDB.length; idx += 1 ) {
          const v = msgsInDB[ idx ];
          const author = await User.findById( v.senderUserId )
          // console.log( author.name, v.type, v.text , v.createdAt );
          msgs.push( {
                    author: author.name,
                    msg: [ v.type, v.text ],
                    isread: true,
                    sentDate: v.createdAt,
          } );
        };
        // console.log( 'msgs', msgs );
        // console.log( 'typeof( msgsInDB )', typeof( msgsInDB ) );
        if( msgs.length === 0 )
          msgs.push( defaultMsg );
        const friend = {
          groupID: group.groupID,
          name,
          msgs,
        };
        friendList.push( friend );
      }
      res.json( {
        friendList,
      } );
    };
  } );

  router.post( '/addFriend', async ( req, res ) => {
    // console.log( 'req.body:', req.body );
    const { friendName } = req.body;
    const friend = await User.find( { where: { name: friendName } } );
    if ( !friend )
      res.json( { status: false } );
    const group = await ChatGroup.create();
    const userID = req.session.loggedInUserId;
    const groupID = group.id;
    UserGroup.create( { userID, groupID, } );
    UserGroup.create( { userID: friend.id, groupID, } );
    res.json( { status: true, groupID } );
  } );

  return router;
};

module.exports = returnRouter;
