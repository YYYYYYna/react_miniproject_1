import {Fragment,useState,useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

function  RecipeDetail(){
    const [recipeVO,setRecipeVO]=useState({})
    const {no}=useParams()
    const [stuff,setStuff]=useState([])
    const [foodImg, setFoodImg]=useState([])
    const [foodMake, setFoodMake]=useState([])
    const nav=useNavigate()

    //아래부분을 mount()로 생각하면됨 맨처음 한번 읽기때문
    useEffect(()=>{
        axios.get('http://localhost/recipe/detail_react',{
            params:{
                no:no
            }
        }).then(res=>{
            console.log(res)
            console.log(res.data)
            setRecipeVO(res.data.recipe)

            let str=res.data.recipe.stuff
            str=str.replaceAll("구매","")
            setStuff(str.split(","))

            setFoodImg(res.data.image)
            setFoodMake(res.data.make)
        })
    },[])

    let ss=stuff.map((s)=>
        <li>{s}</li>
    )

    let mm=foodMake.map((fm,index)=>
        <tr>
            <td className={"text-left"}>{fm}</td>
            <td className={"text-right"}>
                <img src={foodImg[index]} style={{"width":"150px","height":"100px"}}/>
            </td>
        </tr>
    )

    return(
        <div className={"row"}>
            <table className={"table"}>
                <tr>
                    <td className={"text-center"} colSpan={"3"}>
                        <img src={recipeVO.poster} style={{"width":"600px", "height": "250px"}}/>
                    </td>
                </tr>
                <tr>
                    <td colSpan={"3"}>
                        <h3 className={"text-center"}>{recipeVO.title}</h3>
                    </td>
                </tr>
                <tr>
                    <td className={"text-center"} colSpan={"3"}>
                        {recipeVO.content}
                    </td>
                </tr>
                <tr>
                    <td className={"text-center"}>
                        <img src={"/icon/a1.png"}/>
                    </td>
                    <td className={"text-center"}>
                        <img src={"/icon/a2.png"}/>
                    </td>
                    <td className={"text-center"}>
                        <img src={"/icon/a3.png"}/>
                    </td>
                </tr>
                <tr>
                    <td className={"text-center"}>
                        {recipeVO.info1}
                    </td>
                    <td className={"text-center"}>
                        {recipeVO.info2}
                    </td>
                    <td className={"text-center"}>
                        {recipeVO.info3}
                    </td>
                </tr>
            </table>
            <table className={"table"}>
                <caption><h3>재료</h3></caption>
                <tr>
                    <td>
                        <ul>
                            {ss}
                        </ul>
                    </td>
                </tr>
            </table>
            <table className={"table"}>
                <caption><h3>요리 방법</h3></caption>
                <tbody>
                {mm}
                </tbody>
            </table>
            <table className={"table"}>
                <caption><h3>쉐프 정보</h3></caption>
                <tr>
                    <td className={"text-center"} rowSpan={"2"} width={"30%"}>
                        <img src={recipeVO.chef_poster} style={{"width":"80px","height":"60px"}}/>
                    </td>
                    <td width={"70%"}>
                        {recipeVO.chef}
                    </td>
                </tr>
                <tr>
                    <td width={"70%"}>
                        {recipeVO.chef_profile}
                    </td>
                </tr>
            </table>
            <table className={"table"}>
                <tr>
                    <td className={"text-right"}>
                        <button className={"btn-sm btn"}
                                onClick={()=>nav(-1)}
                        >목록</button>
                    </td>
                </tr>
            </table>
        </div>

    )
}

export default RecipeDetail