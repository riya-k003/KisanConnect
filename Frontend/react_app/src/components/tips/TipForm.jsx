import {useState} from "react";
import style from "../../styles/tips.module.css";

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

     onSubmit(tipData, () =>
      setTipData({ title: "", category: "", content: "" })
    );
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