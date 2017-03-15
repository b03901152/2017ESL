import { Router } from 'express';
import express from 'express';
import models from '../src/models';
import multer from 'multer';
import bcrypt from 'bcryptjs';
const upload = multer();

const { User } = models;
const authRouter = new Router();

import bodyParser from 'body-parser';
authRouter.use( bodyParser.urlencoded( { extended: false } ) );
authRouter.use( bodyParser.json() );
authRouter.use( express.static( 'public' ) );


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
    // console.log( 'signup:', req );

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
      res.json( { status: false } );
      return;
    }
    const user = await User.create( {
      name,
      password,
      email,
    } );
    res.json( { user, status: true } );
  }
  catch ( err ) {
    console.error( err );
  }
} );

authRouter.post( '/login', async ( req, res ) => {
  try {
    const { password, name } = req.body;
    console.log( 'login:', req.body );
    const user = await User.find( {
      where: {
        password,
      },
    } );
    if ( !user ) {
      res.json( { status: false } );
      return;
    }
    if ( password === user.password ) {
      req.session.loggedInUserId = user.id;
      req.session.loggedInUserName = user.name;
      res.json( { 
        status: true,
        username: user.name
       } );
    }
    else
      res.json( { status: false } );
  }
  catch ( err ) {
    console.log( err );
  }
} );

authRouter.post( '/logout', ( req, res ) => {
  req.session.destroy();
  res.json( {
    status: true,
  } );
} );


export default authRouter;
