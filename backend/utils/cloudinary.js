// import { v2 as cloudinary } from 'cloudinary'

// import fs from "fs"

// const uploadOnCloudinary = async (file) => {
//     cloudinary.config({
//         cloud_name: 'dx7v6nkph',
//         api_key: '979685851976656',
//         api_secret: '7KrSJZWz-rOWj5J4dtB0n7YuYlY'
//     });
//     try {
//        const result = await cloudinary.uploader.upload(file)
//        fs.unlinkSync(file)
//        return result.secure_url
//     } catch (error) {
//         fs.unlinkSync(file)
//         console.log(error);
        
//     }
// }


// export default uploadOnCloudinary;

import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: 'dx7v6nkph',
  api_key: '979685851976656',
  api_secret: '7KrSJZWz-rOWj5J4dtB0n7YuYlY',
});

const uploadOnCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: "food_items", // optional
    });

    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }

    return result.secure_url;
  } catch (error) {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }
    console.error("Cloudinary upload failed:", error);
    return null;
  }
};

export default uploadOnCloudinary;