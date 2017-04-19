import { Router } from 'express';
import path from 'path';
import models from '../src/models';
import chat from './chat';
import express from 'express';

const { User } = models;

const returnRouter = ( io ) => {
  const router = new Router();
  router.use( express.static( 'uploads' ) );
  router.use( chat( io ) );
  router.get( '*', ( req, res ) => {
    res.sendFile( path.join( __dirname, '../index.html' ) );
  } );

  return router;
};

module.exports = returnRouter;
