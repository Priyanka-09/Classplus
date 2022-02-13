//component for Search bar in header

import { useRef, useState } from "react";

export default function Search({parentCallback}){

    const [search,setSearch] = useState("");
    const [show,setShow] = useState([]);
    const [inputVal,setInputVal] = useState("");
    
    // Debouncing when clicked enter in search bar to seaarch something.

    function debounce(event){
            let timer1;     
        
            let value =  event.target.value;
            
            function xyz(event){
                
                clearTimeout(timer1);
                timer1 = setTimeout(() => {
                    if(localStorage.getItem("searchKey"))
                        localStorage.setItem("searchKey",[localStorage.getItem("searchKey"),value]);
                    else
                        localStorage.setItem("searchKey",[value]);
    
                     updatePhoto();
                }, 1000);
            }    
            return xyz;
    }

    function updatePhoto(){
        setSearch((search)=>search+1);
        parentCallback(search);
    }

    return(
        <>
        {/* Onfocus and onblur event to show recent searches for search bar */}
        <input type="text" placeholder="Search..." id="searchBar" onFocus={()=>{setShow(localStorage.getItem("searchKey").split(","))}} onBlur={()=>{setShow([])}} onKeyPress={(event)=>{if(event.key == "Enter") return debounce(event)() 
                                                                    else return false }}/>
                                                                    
        <div id="myDropdown" className={show.length == 0 ? "dropdown-content" :"dropdown-content show"}>
        {show.map((items,index)=>{
            return(
                <>
                <a href="#" key={`${index}${items}`}>{items}</a>
                </>
            )
        })

        }
        </div>
        </>
    )
}