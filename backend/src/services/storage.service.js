import ImageKit from 'imagekit';
import dotenv from 'dotenv';


dotenv.config();
var imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT

})

function uploadAudioFileFromStream(fileStream) {
    return new Promise((resolve, reject) => {
        imagekit.upload({
            file: fileStream,
            fileName: "audio-file-" + Date.now() + ".mp3",
            folder: "/audio-files/"
        }, function (error, result) {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        })

    })
}