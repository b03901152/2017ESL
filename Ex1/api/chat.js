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
  'System',
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
    socket.on( 'init', username => {
      const idx = usernameList.indexOf( username );
      if ( idx === -1 ) {
        usernameList.push( username );
        socketList.push( socket.id );
      } else {
        socketList[ idx ] = socket.id;
      }
    } );

    socket.on( 'disconnect', () => {
      const idx = socketList.indexOf( socket.id );
      if ( idx == -1 ) {
        console.log( 'remove socketid err!' );   
      } else {
        socketList.splice( idx, 1 );
        usernameList.splice( idx, 1 );
      }
    } );

   } );

  router.post( '/addFriendToGroup', async ( req, res ) => {
    try {
        console.log( 'QQQQ' );
        const { friendName, groupID } = req.body;
        const friend = await User.findOne( { where: { name: friendName } } );
        console.log( friend ? 'friend is exist: ' : 'friend isn;t exist' );
        if ( friend ) {
          console.log( 'addFriendToGroup success' );
          await UserGroup.create( { userID: friend.id, groupID } );
          res.json( { status: true } );
          return;
        } else {
          return res.json( { status: false } );
          console.log( 'addFriendToGroup fail' );
        }
    } catch ( err ) {
      console.error( err );
    }
  } );

  router.post( '/setChat', async ( req, res ) => {
    console.log('/setChat');
    const {
      recipientGroupId,
      type,
      text, } = req.body;
    console.log( 'req.body', req.body );
    const msg = {
      senderUserId: req.session.loggedInUserId,
      recipientGroupId,
      type,
      text,
    };
    const MsgInDB = await Message.create( msg );
    const senderUser = await User.findById( req.session.loggedInUserId );
    msg.name = senderUser.name;
    console.log( 'MsgInDB.createdAt', MsgInDB.createdAt );
    console.log( 'MsgInDB.id', MsgInDB.id );
    msg.sentDate = MsgInDB.createdAt;
    const group = await UserGroup.all( { where: { GroupID: recipientGroupId } } );
    for ( let goupIdx = 0; goupIdx < group.length; goupIdx++ ) {
      if ( group[ goupIdx ].userID !== req.session.loggedInUserId ) {
        const user = await User.findById( group[goupIdx ].userID );
        const UNLidx = usernameList.indexOf( user.name );
        if ( UNLidx !== -1 )
          io.to( socketList[ UNLidx ] ).emit( 'getChat', msg );
        console.log( 'user.name:', user.name , ' ' , UNLidx );
        console.log( 'usernameList', usernameList );
        console.log( 'socketList', socketList );
      }
    };
  } );

  router.post( '/setGroupName', async ( req, res ) => {
    const { groupName, groupID } = req.body;
    console.log( 'req.body', req.body );
    console.log('setGroupName gourpID:', groupID );
    const group = await ChatGroup.findById( groupID );
    group.groupName = groupName;
    group.save();
  } );

  router.post( '/setLastReadTime', async ( req, res ) => {
    try{
        console.log( 'setLastReadTime' );
        const { groupID } = req.body;
        const group = await UserGroup.findOne( {
          where: { 
            groupID,
            userID: req.session.loggedInUserId,
           }
        });
        console.log( 'groupID', group.id );
        const groups = await UserGroup.findAll( {
          where: { groupID }
        } );
        console.log( "groups.length", groups.length );
        if ( groups.length == 2 ) {
          const msgs = await Message.findAll( {
            where: {
              recipientGroupId: groupID,
              createdAt: {
                gt: group.lastReadTime,
              },
            }
          } );
          console.log( "msgs.length", msgs.length );
          for ( let msgIdx = 0; msgIdx < msgs.length; msgIdx++ )
          {
            console.log( msgs[ msgIdx ].id, "update" );
            if ( msgs[ msgIdx ].senderUser === req.session.loggedInUserId ||
              msgs[ msgIdx ].read !== null
            )
              continue;
            msgs[ msgIdx ].read = ( new Date() ).toLocaleString();
            msgs[ msgIdx ].save();
          }
        } else {
          const msgs = await Message.findAll( {
            where: {
              recipientGroupId: groupID,
              createdAt: {
                gt: group.lastReadTime,
              },
            }
          } );
          for ( let msgIdx = 0; msgIdx < msgs.length; msgIdx++ )
          {
            if ( ! msgs[ msgIdx ].read )
              msgs[ msgIdx ].read = '1';
            else
              msgs[ msgIdx ].read = String( Number( msgs[ msgIdx ].read ) + 1 );
            msgs[ msgIdx ].save();
          }
        }
        group.lastReadTime = new Date().toLocaleString();
        group.save();
      } catch ( err ) {
        console.error( err );
      }
  } );

  router.post( '/upload',upload.single( "icon" ) ,( req, res ) => {
    console.log( 'upload' );
    console.log( 'req.file', req.file );
    console.log( 'req.originalname', req.file.originalname );
    console.log( 'req.body:', req.body );
    console.log( 'newFilename:', newFilename );
    res.json( { originalname: newFilename } );
  } );

  router.post( '/uploadProfilePhoto',upload.single( "icon" ) ,async ( req, res ) => {
    console.log( 'uploadProfilePhoto' );
    console.log( 'upload' );
    console.log( 'req.originalname', req.file.originalname );
    const user = await User.findById( req.session.loggedInUserId );
    console.log( user, req.session.loggedInUserId );
    user.profilePath = newFilename;
    console.log( 'newFilename:', newFilename );
    user.save();
  } );


  router.get( '/loadFriend', async ( req, res ) => {
    try {
        console.log( 'loadFriend' );
        const id = req.session.loggedInUserId;
        const groups = await UserGroup.all( { where: { userId: id } } );
        if ( groups.length === 0 ) {
          return res.json( {
            friendList: [ {
            groupID: 0,
            name: 'system',
            msgs: [ defaultMsg ],
            } ],
          } );
        } else {
          let friendList = [];
          for ( let idx = 0; idx < groups.length; idx++ )
          {
            console.log( 'query groups.length:', groups.length );
            const group = groups[ idx ];
            console.log( 'query group.groupID:', group.groupID );
            const userGroupOfOther = await UserGroup.all(
              { where: { groupID: group.groupID } } );
            const chatGroup = await ChatGroup.findById( group.groupID );
            let name;
            console.log( 'userGroupOfOther.length:', userGroupOfOther.length );
            console.log( 'chatGroup.groupName:', chatGroup.groupName );
            let profilePath = 'group-registration-icon-26-1490924394760.png';
            if ( chatGroup.groupName )
              name = chatGroup.groupName;
            else {
              if ( userGroupOfOther.length > 2 )
                name = 'Group Chat(default)';
              else {
                // console.log( 'FL else', userGroupOfOther[ 0 ].userID, userGroupOfOther[ 1 ].userID );
                let userID;
                if( userGroupOfOther[ 0 ].userID === req.session.loggedInUserId ) {
                  userID = userGroupOfOther[ 1 ].userID;
                  const user = await User.findById( userID );
                  profilePath = user.profilePath;
                  console.log( 'ZZZZZ', profilePath );
                }
                else {
                  userID = userGroupOfOther[ 0 ].userID;
                  const user = await User.findById( userID );
                  profilePath = user.profilePath;
                  console.log( 'QQQQQQ', userGroupOfOther[ 0 ] );

                  console.log( 'QQQQQQ', profilePath,userID );
                }
                const user = await User.findById( userID );
                name = user.name;
                // console.log( 'the firned Name:', name );
              }
            }

            const msgsInDB = await Message.all( {
              where: { recipientGroupId: group.groupID },
            } );
            // console.log( 'msgsInDB:', msgsInDB );
            // console.log( 'typeof( msgsInDB )', typeof( msgsInDB ) );
            const msgs = [];
            for ( let idx = 0; idx < msgsInDB.length; idx += 1 ) {
              const v = msgsInDB[ idx ];
              const author = await User.findById( v.senderUserId );
              console.log( author.name, v.type, v.text , v.createdAt, v.read );
              msgs.push( {
                        author: author.name,
                        msg: [ v.type, v.text ],
                        isread: v.read,
                        sentDate: v.createdAt,
              } );
            };
            // console.log( 'msgs', msgs );
            console.log( "p" );
            console.log( "p" );
            console.log( "p" );
            console.log( "p" );
            console.log( "p" );
            console.log( "p" );
            console.log( "p" );
            console.log( "p" );
            console.log( "p" );
            console.log( "p" );
            console.log( "p" );
            console.log( "p" );
            if( msgs.length === 0 )
              msgs.push( defaultMsg );
            const friend = {
              groupID: group.groupID,
              name,
              msgs,
              profilePath: profilePath || '',
            };
            console.log('load a friend', friend);
            friendList.push( friend );
          }
          return res.json( {
            friendList,
          } );
        };
    } catch (err) {
      console.error( err );
    }
  } );

  router.post( '/addFriend', async ( req, res ) => {
    // console.log( 'req.body:', req.body );
    const { friendName } = req.body;
    const friend = await User.find( { where: { name: friendName } } );
    if ( !friend )
      return res.json( { status: false } );
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
