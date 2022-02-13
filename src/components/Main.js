import { useEffect, useState, useRef } from "react";
import Search  from "./Search";
import ShowModal from "./Modal";
export default function Main(){

    const [list,setList] = useState([]);

    let [page,setPage] = useState(0);
    const [popimage,setPopImage] = useState(false);
    let [path,setPath] = useState("");
    const loader = useRef(null);

    // code for infinite scrolling

    useEffect(() => {
        var options = {
           root: null,
           rootMargin: "20px",
           threshold: 1.0
        };

        const observer = new IntersectionObserver(handleObserver, options);
        if (loader.current) {
           observer.observe(loader.current)
        }

   }, []);

   const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting) {   
            setPage((page) => page + 1)
        }
    }

    // to call getrecent api

    useEffect(()=>{
        fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=b198091c72f3e597f6b23555d221416b&per_page=10&page=${page}&format=json&nojsoncallback=1`)       
        .then((res) => res.json())
        .then((data) => {            
            if(data.length == 0){
                setList([]) 
            }
            else{
                const newList = list.concat(data.photos.photo);
                setList(newList)
            }
        });        

    },[page])
   
    // call back function for Search component

    function parentCallback(val){
        setList([]);
        setPage(val);
    } 

    // function to show image in modal and also call back function for modal component to close modal

    function openModal(image){
        setPath(image);
        setPopImage(!popimage);
    }

    return(
        <>
        
        
        <header className="header">
            <label>Search Photos</label>
            <Search parentCallback={parentCallback}></Search>
        </header>

        <div className="row">
     
        {list && list.map((items,index)=>{
            return(
                <span key={index} className="col-lg-4 col-md-4 col-sm-12 col-xs-12" >
                <img  src={`https://live.staticflickr.com/${items.server}/${items.id}_${items.secret}.jpg`} onClick={()=>openModal(`https://live.staticflickr.com/${items.server}/${items.id}_${items.secret}.jpg`)}></img>
                </span>
            )
        })}
        
        </div>
        {/* To show loader when there is o data or when api is fetching more data */}
        
        <div className="loading" ref={loader}>
                    <h2>Loading More.....</h2>
        </div>
        
        <ShowModal path={path} popimage={popimage} callback={openModal}></ShowModal>
      </>
    )
}