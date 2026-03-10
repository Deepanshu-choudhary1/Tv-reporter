import cloudinary from "../config/cloudinary.js"

export const uploadImage = async (req,res) => {

  try{

    const result = await new Promise((resolve,reject)=>{

      const stream = cloudinary.uploader.upload_stream(
        {folder:"tv-reporter"},
        (error,result)=>{
          if(error) reject(error)
          else resolve(result)
        }
      )

      stream.end(req.file.buffer)

    })

    res.json({
      url: result.secure_url
    })

  }
  catch(err){

    res.status(500).json({
      message:"Upload failed"
    })

  }

}