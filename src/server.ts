import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import { using, filter } from 'bluebird';
import { callbackify } from 'util';
//import { LocalNotifications } from 'nativescript-local-notifications';

const { check, validationResult } = require('express-validator');

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the   

  app.get( "/filteredimage", async ( req, res ) => {
    //const re:string = req.query.image_url;
    var re = req.query.image_url;
    
    if (!re){
      return res.status(400).send(`Image URL is required`);
    }

    const filteredpath = await filterImageFromURL(re);
    return res.status(200).sendfile(filteredpath);
    await deleteLocalFiles([filteredpath]);

    //comment test test test

    // return res.status(200).sendFile(filteredpath, async () => {
    //   await deleteLocalFiles([filteredpath]);
    // });

    // var myfun = async function(data, callback) {
    //   try{
    //     var filteredpath = await filterImageFromURL(data);
    //     callback([filteredpath]);        
    //   }catch(err){
    //     console.error(err);
    //   }
    // };
    // try{
    //   var re = req.query.image_url;

    //   if (!re){
    //     return res.status(400).send('Image URL is required');
    //   }
    // await myfun(re, deleteLocalFiles);
    // }catch(err){
    //   console.error(err);
    // }
  } );


  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();