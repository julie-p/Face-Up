var express = require('express');
var router = express.Router();

const fs = require('fs'); 
const uniqid = require('uniqid');
const request = require('sync-request');

//Importation de Cloudinary
var cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'juliep', 
  api_key: '319764196268319', 
  api_secret: 'yH4VRTK-rxmSx8TQ9dj0ZmWSX0g' 
});

//Détection des visages
'use strict';
const subscriptionKey = 'c480897dda6448138769af58167488d6';
const uriBase = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect';

const params = {
  'returnFaceId': 'true',
  'returnFaceLandmarks': 'false',
  'returnFaceAttributes': 'age,gender,headPose,smile,facialHair,glasses,' +
      'emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
};

/* request('POST', URL, options); {
if (error) {
  console.log('Error: ', error);
  return;
}
let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
console.log('JSON Response\n');
console.log(jsonResponse);
};
 */
router.post('/upload', async function(req, res, next) {

  let imagePath = './tmp/'+uniqid()+'.jpg';
  let resultCopy = await req.files.avatar.mv(imagePath);

  if (!resultCopy) {

    let resultCloudinary = await cloudinary.uploader.upload(imagePath);

    const options = {
      uri: uriBase,
      qs: params,
      body: '{"url": ' + '"' + resultCloudinary.url + '"}',
      headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key' : subscriptionKey
      }
    };

    let vision = request('POST', uriBase, options);
    let resultVision = vision.getBody();
    resultVision = JSON.parse(resultVision);
    console.log(resultVision);
    console.log('/////////////////////////////////', resultVision[0].faceAttributes.hair);

    let gender;
    let age;
    let glasses;
    let emotions;
    let beard;
    let smile; 
    let hair;
    if (resultVision) {
      gender = resultVision[0].faceAttributes.gender == "female" ? "femme" : "homme";
      age = resultVision[0].faceAttributes.age + " ans";
      glasses = resultVision[0].faceAttributes.glasses == "ReadingGlasses" ? true : false;
      emotions = resultVision[0].faceAttributes.emotion.happiness > 0.7 ? true : false;
      beard = resultVision[0].faceAttributes.facialHair > 0.5 ? true : false;
      smile = resultVision[0].faceAttributes.smile > 0.7 ? true : false;
      switch (resultVision[0].faceAttributes.hair.hairColor[0].color) {
        case "black" :
          hair = "Cheveux noirs";
          break;
        case "brown" :
          hair = "Cheveux châtains";
          break;
        case "blond" :
          hair = "Cheveux blonds";
          break;
        case "red" :
          hair = "Cheveux roux";
          break;
        case "gray" :
          hair = "Cheveux gris";
          break;
        default :
          hair = null;
          break;
      }
    };
    console.log(hair);
    res.json({url: resultCloudinary.url, gender, age, glasses, emotions, beard, hair, smile});
  
  } else {
    res.json({error: resultCopy});
  };

  fs.unlinkSync(imagePath);

});

module.exports = router;
