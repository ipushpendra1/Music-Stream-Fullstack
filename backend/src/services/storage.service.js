import ImageKit from 'imagekit';
import config from '../config/config.js';


// Check if ImageKit environment variables are configured
const isImageKitConfigured = config.IMAGEKIT_PUBLIC_KEY &&
                             config.IMAGEKIT_PRIVATE_KEY &&
                             config.IMAGEKIT_URL_ENDPOINT;

let imagekit = null;

if (isImageKitConfigured) {
    imagekit = new ImageKit({
        publicKey: config.IMAGEKIT_PUBLIC_KEY,
        privateKey: config.IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: config.IMAGEKIT_URL_ENDPOINT
    });
}

export function UploadFile(file) {
    return new Promise((resolve, reject) => {
        if (!isImageKitConfigured) {
            // For development/testing without ImageKit
            console.warn('ImageKit not configured. Using mock upload for development.');
            setTimeout(() => {
                resolve({
                    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
                    fileId: 'mock-file-id-' + Date.now()
                });
            }, 1000);
            return;
        }

        imagekit.upload({
            file: file,
            fileName: "audio-file-" + Date.now() + ".mp3",
            folder: "/audio-files/"
        }, function (error, result) {
            if (error) {
                console.error('ImageKit upload error:', error);
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}