import {Fragment,useState,useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function FoodFind(){
    //여기가 변수(초기값)잡는 구간
    const [startPage,setStartPage]=useState(0);
    const [endPage,setEndPage]=useState(0);
    const [totalpage,setTotalpage]=useState(0);
    const [curpage,setCurpage]=useState(1);
    const [foodFindList, setFoodFindList]=useState([]);
    const [address , setAddress]=useState('마포');

    useEffect(()=>{
        axios.post('http://localhost/food/find_react',null,{
            params:{
                page:curpage,
                address:address
            }
        }).then(res=>{
            console.log(res.data)
            setFoodFindList(res.data.list)
            setTotalpage(res.data.totalpage)
            setCurpage(res.data.curpage)
            setStartPage(res.data.startPage)
            setEndPage(res.data.endPage)
        })
    },[address,curpage])
    let html=foodFindList.map((vo)=>
        <div className="col-md-3">
            <div className="thumbnail">
                <Link to={"/food/detail/" + vo.fno}>
                    <img src={vo.poster} title={vo.name} style={{"width": "100%"}}/>
                    <div className="caption">
                        <p>{vo.name}</p>
                    </div>
                </Link>
            </div>
        </div>
    )
    const pageChange=(page)=>{
        setCurpage(page)
    }
    const prevHandler=()=>{
        setCurpage(startPage-1)
    }
    const nextHandler=()=>{
        setCurpage(endPage+1)
    }

    const findHandler = () => {
        setCurpage(1)
    }
    const changeHandler=(e)=>{
        setCurpage(1)
        setAddress(e.target.value)
    }
    let row=[]
    if(startPage>1)
    {
        row.push(<li><a href={"#"} onClick={()=>prevHandler}>&laquo;</a></li>)
    }
    for(let i=startPage;i<=endPage;i++)
    {
        if(curpage===i)
        {
            row.push(<li className={"active"}><a href={"#"} onClick={()=>pageChange(i)} >{i}</a></li>)
        }
        else
        {
            row.push(<li><a href={"#"} onClick={()=>pageChange(i)}>{i}</a></li>)
        }
    }
    if(endPage<totalpage)
    {
        row.push(<li><a href={"#"} onClick={()=>nextHandler}>&raquo;</a></li>)
    }

    return(
        <Fragment>
            <div className={"row"}>
                <input type={"text"} size={"20"} className={"input-sm"} placeholder={"검색어 입력"}
                       onChange={changeHandler} value={address}
                />
                <input type={"button"} className={"btn btn-sm"} value={"검색"}
                       onClick={findHandler}
                />
            </div>
            <div style={{"height": "10px"}}></div>
            <div className={"row"}>
                {html}
            </div>
            <div style={{"height": "10px"}}></div>
            <div className={"row"}>
                <div className={"text-center"}>
                    <ul className={"pagination"}>
                        {row}
                    </ul>
                </div>
            </div>
        </Fragment>
    )
}

export default FoodFind