// Component for showing image in pop when clicked

import { useEffect, useState } from "react"

export default function ShowModal({path,popimage,callback}){

    const [image,setImage] = useState(false);

    useEffect(()=>{
        setImage(popimage)
    },[popimage])

    function closeModal(){
        setImage(!image);
        callback("");
    }

    return(
        <>
        <div className={image ? "modal show"  : "modal"} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-body">
                <p>
                    <img src={path}></img>
                </p>
            </div>
            <div className="modal-footer">
                <button type="button" className="modalButton" onClick={closeModal}>Close</button>
            </div>
            </div>
        </div>
        </div>
        </>
    )
}