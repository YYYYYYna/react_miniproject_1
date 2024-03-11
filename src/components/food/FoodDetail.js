import {useState,useEffect} from "react";
import {useParams} from "react-router-dom";
function FoodDetail(){
    let {fno}=useParams()
    return(
        <h1 className={"text-center"}>맛집 {fno}</h1>
    )
}
export default FoodDetail