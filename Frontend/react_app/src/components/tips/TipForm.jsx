import {useState} from "react";
import style from "../../styles/tips.module.css";
import {validateTip} from "../../utils/validateTip"
import imageCompression from "browser-image-compression";

function TipForm({onSubmit  , error , setError}){

const [tipData , setTipData] = useState({
    title : "",
    category : "",
    content : ""
});

const [imageFile, setImageFile] = useState(null);
const [imagePreview, setImagePreview] = useState(null);
const [compressing, setCompressing] = useState(false); 

    const handleTipChange =(e)=>{
  setError("");
  const {name , value} = e.target;
  setTipData({
    ...tipData,
    [name]:value
  })
}

const handleImageChange = async (e) =>{
  const file = e.target.files[0];
  if(!file) return;

  const previewURL = URL.createObjectURL(file);
  setImagePreview(previewURL);

  setCompressing(true);
  try{
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1200,
      useWebWorker: true
    };
    const compressedFile = await imageCompression(file, options);
    setImageFile(compressedFile);
    }catch (err){
      setError("Image compress nahi hui, dobara try karo");
    }finally{
      setCompressing(false);
  }
};
  const handlePostTip = async () => {

    const validationError = validateTip(tipData);
    if(validationError){
      setError(validationError);
      return;
    }

    const formData = new FormData();
    formData.append("title" , tipData.title);
    formData.append("category" , tipData.category);
    formData.append("content" , tipData.content);
    if(imageFile){
      formData.append("image" , imageFile);
    }

    console.log("title:", formData.get("title"));
console.log("category:", formData.get("category"));
console.log("content:", formData.get("content"));
console.log("image:", formData.get("image"));

     onSubmit(formData, () =>{
      setTipData({ title: "", category: "", content: "" });
     setImageFile(null);
     setImagePreview(null);
});
  };

 

 

    return(
        <>
         <div className="createTip">
              {error && <p className={style.errorBox}>⚠️{error}</p>}
                <input
                  name="title"
                  type="text"
                  placeholder="Tip Title"
                  value={tipData.title}
                  onChange={handleTipChange}
                  className="border border-gray-300"
                />
                <input
                  name="category"
                  type="text"
                  placeholder="Category"
                  value={tipData.category}
                  onChange={handleTipChange}
                  className="border border-gray-300"
                />
                <textarea
                  name="content"
                  placeholder=" Tip content"
                  value={tipData.content}
                  onChange={handleTipChange}
                  className="border border-gray-300"
                
                />
                
                {/* Image Upload */}
                <label htmlFor = "imageUpload" className="border border-red-500">
                  Photo add karo 
                </label>
                <input 
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{display: "none"}}
                className="border border-gray-300"
                />

                {/* Image preview */}
                {compressing && <p> Image compress ho rahi hai...</p>}
                {imagePreview && !compressing && (
                  <div className={style.previewContainer}>
                    <img src={imagePreview} alt="Preview" className={style.previewImage} />
                    <button onClick={() =>{
                      setImageFile(null);
                      setImagePreview(null);
                    }}> X </button>
                    </div>
                )}
                <button onClick={handlePostTip} disabled={compressing}>
                  {compressing ? "Processing..." : "POST" }
                  </button>
              </div>
        </>
    )

}

export default TipForm;