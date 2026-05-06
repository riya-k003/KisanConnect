import {useState} from "react";

function TipForm({onSubmit  , error , setError}){

const [tipData , setTipData] = useState({
    title : "",
    category : "",
    content : ""
});
    const handleTipChange =(e)=>{
  setError("");
  const {name , value} = e.target;
  setTipData({
    ...tipData,
    [name]:value
  })
}
  const handlePostTip = async () => {
      const trimmedTitle = tipData.title.trim();
  const trimmedCategory = tipData.category.trim();
  const trimmedContent = tipData.content.trim();

  if (!trimmedTitle || !trimmedCategory || !trimmedContent) {
    setError("All fields are required");
    return;
  }

  if (/^\d+$/.test(trimmedTitle)) {
    setError("Title cannot contain only numbers");
    return;
  }

  if (trimmedTitle.length < 3) {
    setError("Title must be at least 3 characters");
    return;
  }

  if (trimmedContent.length < 10) {
    setError("Content must be at least 10 characters");
    return;
  }
  
     onSubmit(tipData, () =>
      setTipData({ title: "", category: "", content: "" })
    );
  };

 

 

    return(
        <>
         <div className="createTip">
              {error && <p className={style.errorBox}>⚠️{Error}</p>}
                <input
                  name="title"
                  type="text"
                  placeholder="Tip Title"
                  value={tipData.title}
                  onChange={handleTipChange}
                />
                <input
                  name="category"
                  type="text"
                  placeholder="Category"
                  value={tipData.category}
                  onChange={handleTipChange}
                />
                <textarea
                  name="content"
                  placeholder=" Tip content"
                  value={tipData.content}
                  onChange={handleTipChange}
                
                ></textarea>
                <button onClick={handlePostTip}>POST</button>
              </div>
        </>
    )

}

export default TipForm;