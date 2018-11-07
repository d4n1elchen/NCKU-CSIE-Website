// Router for /home
import express from 'express';
import path from 'path';
import config from 'settings/server/config.js';

const router = express.Router();

// Resolve URL `/`
router.get( /^\/$/, ( req, res ) => {
    res.sendFile( path.join( config.projectRoot, `/static/dist/html/home/index.${ req.query.language }.html` ) );
} );

// Route to login page
router.get( /^\/login$/, ( req, res ) => {
    res.sendFile( path.join( config.projectRoot, `/static/dist/html/home/index.${ req.query.language }.html` ) );
} );

// Route to search page
router.get( /^\/search$/, ( req, res ) => {
    res.sendFile( path.join( config.projectRoot, `/static/dist/html/home/index.${ req.query.language }.html` ) );
} );

// Route to calender page
router.get( /^\/calendar$/, ( req, res ) => {
    res.sendFile( path.join( config.projectRoot, `/static/dist/html/home/index.${ req.query.language }.html` ) );
} );

export default router;
