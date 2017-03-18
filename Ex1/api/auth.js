import { Router } from 'express';
import express from 'express';
import models from '../src/models';
import multer from 'multer';
import bcrypt from 'bcryptjs';
import Message from '../src/DataStructure/Message.js';
const upload = multer();

const { ChatGroup, User, UserGroup } = models;
const authRouter = new Router();

import bodyParser from 'body-parser';
authRouter.use( bodyParser.urlencoded( { extended: false } ) );
authRouter.use( bodyParser.json() );
authRouter.use( express.static( 'public' ) );

const defaultMsg = new Message(
  'you',
  [
    'text',
    'defaultMsg',
  ],
  'default isread' );

let defaultFL = [
    {
      groupID: 10000,
      name: '1',
      msgs: [ defaultMsg ],
    },
    {
      groupID: 10001,
      name: '123',
      msgs: [ defaultMsg ],
    },
  ];

authRouter.get( '/profile', async ( req, res ) => {
  if ( req.session.loggedInUserId ) {
    const user = await User.findById( id: req.session.loggedInUserId );
    if ( user ) {
      const { username, email, rest } = user;
      return res.json( { username, email, rest } );
    }
  }
} );

authRouter.post( '/check', ( req, res ) => {
  if ( req.session.loggedInUserId ) {
    const userId = req.session.loggedInUserId;
    const username = req.session.loggedInUserName;
    return res.json( {
      status: true,
      userId,
      username,
    } );
  }
  res.json( {
    status: false,
  } );
} );

authRouter.post( '/signup', async ( req, res ) => {
  try {
    console.log( 'signup:', req.body );
    const { password, name, email } = req.body;
    const check_user_name = await User.find( {
      where: {
        name,

      },
    } );

    const check_user_email = await User.find( {
      where: {
        email,
      },
    } );

    if ( check_user_name || check_user_email ) {
      return res.json( { status: false } );
    }
    const user = await User.create( {
      name,
      password,
      email,
    } );
    res.json( {
      user,
      status: true,
      friendList: defaultFL,
    } );
  }
  catch ( err ) {
    console.error( err );
  }
} );

authRouter.post( '/login', async ( req, res ) => {
  try {
    const { password, name } = req.body;
    const user = await User.find( {
      where: {
        password,
      },
    } );
    if ( user && ( password === user.password ) ) {
      req.session.loggedInUserId = user.id;
      req.session.loggedInUserName = user.name;
      res.json( { 
        status: true,
        username: user.name,
      } );
    };
    res.json( { status: false } );
  }
  catch ( err ) {
    console.log( err );
  }
} );

authRouter.post( '/logout', ( req, res ) => {
  req.session.destroy();
  console.log( 'logout' );
  return res.json( {
    status: true,
  } );
} );


export default authRouter;
