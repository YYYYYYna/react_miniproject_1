import {Fragment,useState,useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import FoodDetail from "./FoodDetail";
function FoodList(){
const [count,setCount]=useState(0);
const [startPage,setStartPage]=useState(0);
const [endPage,setEndPage]=useState(0);
const [totalpage,setTotalpage]=useState(0);
const [curpage,setCurpage]=useState(1);
const [foodList, setFoodList]=useState([]);
const [foodDetail, setFoodDetail]=useState({});
const [open, setOpen]=useState(false);
//서버로부터 값을 받아오기
useEffect(()=>{
    axios.get('http://localhost/food/list_react',{
        params:{
            page:curpage
        }
    }).then(res=>{
        console.log(res.data)
        setCount(res.data.count)
        setTotalpage(res.data.totalpage)
        setCurpage(res.data.curpage)
        setStartPage(res.data.startPage)
        setEndPage(res.data.endPage)
        setFoodList(res.data.list)
    })
},[curpage])
    let html=foodList.map((vo)=>
        <div className="col-md-3">
            <div className="thumbnail">
                <Link to={"/food/detail/"+vo.fno}>
                    <img src={'http://www.menupan.com'+vo.poster} title={vo.name} style={{"width":"100%"}}/>
                    <div className="caption">
                        <p>{vo.name}</p>
                    </div>
                </Link>
            </div>
        </div>
    )
    //이벤트 처리부분 ex)버튼클릭
    const prevHandler=()=>{
        setCurpage(curpage>1?curpage-1:curpage)
    }

    const nextHandler=()=>{
        setCurpage(curpage<totalpage?curpage+1:curpage)
    }
    const onFoodDetail=(vo)=>{
        setOpen(true)
        setFoodDetail(vo)
    }
    return(
        <Fragment>
            <div className={"row"}>
                <h4>총
                    &nbsp;
                    <span style={{"fontSize": "30px", "color": "green"}}>
                        {count}
                    </span>
                    &nbsp;
                    개의 추천 맛집이 있습니다.</h4>
                <hr/>
            </div>
            <div className={"col-md-4"}>
                {html}
            </div>
            <div className={"col-md-8"}>
                {open?<FoodDetail vo={foodDetail}/>:null}
            </div>
            <div className={"row"}>
                <div className={"text-center"}>
                    <input type={"button"} value={"이전"} className={"btn-sm btn"}
                           onClick={prevHandler}/>
                    &nbsp; {curpage} page / {totalpage} pages &nbsp;
                    <input type={"button"} value={"다음"} className={"btn-sm btn"}
                           onClick={nextHandler}/>
                </div>
            </div>
        </Fragment>
    )
}
function Detail(props){
    return(
        <table className={"table"}>
            <tbody>
            <tr>
                <td colSpan={"2"} className={"text-center"}>
                    <img src={"props.vo.poster"}/>
                </td>
            </tr>
            <tr>
                <td colSpan={"2"}>
                    <h3>{props.vo.name}
                        <span style={{"color":"orange"}}>{props.score}</span>
                    </h3>
                </td>
            </tr>
            <tr>
                <td width={"20%"} className={""}></td>
            </tr>
            </tbody>
        </table>
    )
}
//state => useState, props, => property => 태그의 속성을 이용해서 값을 가져온다
//
export default FoodList