import {Fragment,useState,useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function Home() {
    //여기가 변수(초기값)잡는 구간
    //set메소드를 이용하면 userState가 호출되도록 만듬
    const [count,setCount]=useState(0);
    const [startPage,setStartPage]=useState(0);
    const [endPage,setEndPage]=useState(0);
    const [totalpage,setTotalpage]=useState(0);
    const [curpage,setCurpage]=useState(1);
    const [recipeList,setRecipeList]=useState([]);
    const [recipeData,setRecipeData]=useState({});
    useEffect(()=>{
        axios.get('http://localhost/recipe/list_react',{
            params:{
                page:curpage
            }
        }).then(response=>{
            console.log(response.data)
            setCount(response.data.count)
            setTotalpage(response.data.totalpage)
            setCurpage(response.data.curpage)
            setStartPage(response.data.startPage)
            setEndPage(response.data.endPage)
            setRecipeList(response.data.list)
        })
    },[curpage])

    let html=recipeList.map((vo)=>
        <div className="col-md-3">
            <div className="thumbnail">
                <Link to={"/recipe/detail/"+vo.no}>
                    <img src={vo.poster} title={vo.title} style={{"width":"100%"}}/>
                    <div className="caption">
                        <p>{vo.chef}</p>
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
    return (
        // 루트태그를 꼭 만들어 줘야함!!!
        <Fragment>
            <div className={"row"}>
                <h4>총
                    &nbsp;
                    <span style={{"fontSize":"30px","color":"green"}}>
                        {count}
                    </span>
                    &nbsp;
                    개의 맛있는 레시피가 있습니다.</h4>
                <hr/>
            </div>
            <div className={"row"}>
                {html}
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

export default Home