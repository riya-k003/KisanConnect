import {useState} from "react";
import { ImagePlus, Tag, Send, X } from "lucide-react";
import style from "../../styles/tips.module.css";
import {validateTip} from "../../utils/validateTip"
import imageCompression from "browser-image-compression";

const CATEGORIES = ["Irrigation", "Pest Control", "Soil Health", "Organic Farming", "Wheat Farming", "Other"];

function TipForm({tip , onSubmit  , error , setError}){

const [tipData , setTipData] = useState({
    title : "",
    category : "",
    content : ""
});

const [showCategoryPicker , setShowCategoryPicker] = useState(false);
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

const handleCategorySelect = (cat) =>{
  setTipData({ ...tipData , category: cat});
  setShowCategoryPicker(false);
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
         <div className="flex flex-col gap-6">
              {error && <p className={style.errorBox}>⚠️{error}</p>}

              <div className="flex items-start gap-4">
        <div className="h-11 w-11 rounded-full bg-green-100 flex items-center justify-center text-[#2F6B3F] font-bold text-lg shrink-0">
           {localStorage.getItem("name")?.charAt(0)?.toUpperCase()}
          </div>

          <div className="flex-1 flex flex-col gap-3">
             
                <input
                  name="title"
                  type="text"
                  placeholder="Tip Title"
                  value={tipData.title}
                  onChange={handleTipChange}
                  className="w-full h-11 px-4 rounded-2xl border border-[#E8EDE0] bg-[#F7F8F3] text-sm focus:outline-none focus:ring-2 focus:ring-[#57B847]"
                />
                
                {tipData.title && (
                  <textarea
                  name="content"
                  placeholder="Add more details..."
                  value={tipData.content}
                  onChange={handleTipChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded-2xl border border-[#E8EDE0] bg-[#F7F8F3] text-sm resize-none focus:outlie-none focus:ring-2 focus:ring-[#57B847]"
                  />
                )}
             </div>
      </div>

                
           
      {/* Image preview */}
      {compressing && <p className="text-sm text-[#667366] pl-14">Image compress ho rahi hai...</p>}
      {imagePreview && !compressing && (
        <div className="relative w-fit pl-14 pt-2">
          <img src={imagePreview} alt="Preview" className="h-20 w-20 object-cover rounded-xl border border-[#E8EDE0]" />
          <button
            onClick={() => {
              setImageFile(null);
              setImagePreview(null);
            }}
            className="absolute -top-2 left-12 h-5 w-5 bg-white border border-[#E8EDE0] rounded-full flex items-center justify-center shadow-sm"
          >
            <X className="w-3 h-3 text-[#666]" />
          </button>
        </div>
      )}

      {/* Bottom row: add image / add category / post button */}
      <div className="flex items-center justify-between pl-14 pt-3 flex-wrap gap-3">
        <div className="flex items-center gap-5 relative">
          <label
            htmlFor="imageUpload"
            className="flex items-center gap-1.5 text-sm text-[#556B55] hover:text-[#2F6B3F] cursor-pointer transition-colors"
          >
            <ImagePlus className="w-4 h-4" />
            Add Image
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />

          <button
            type="button"
            onClick={() => setShowCategoryPicker(!showCategoryPicker)}
            className="flex items-center gap-1.5 text-sm text-[#556B55] hover:text-[#2F6B3F] transition-colors"
          >
            <Tag className="w-4 h-4" />
            {tipData.category || "Add Category"}
          </button>

          {showCategoryPicker && (
            <div className="absolute top-10 left-0 bg-white border border-[#E8EDE0] rounded-xl shadow-md py-2 w-44 z-10">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className="block w-full text-left px-4 py-1.5 text-sm text-[#333] hover:bg-[#F1F6EC]"
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handlePostTip}
          disabled={compressing}
          className="ml-auto flex items-center gap-2 h-10 px-5 bg-[#57B847] hover:bg-[#4EA73F] text-white font-semibold text-sm rounded-full shadow-sm transition-colors disabled:opacity-50"
        >
          {compressing ? "Processing..." : "Post Tip"}
          {!compressing && <Send className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

export default TipForm;