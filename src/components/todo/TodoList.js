import React, {Fragment, useEffect, useRef, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";

function TodoList() {
    let midLine = {
        textDecoration: "line-through",
        color:"#c8c8c8"
    };
    const[check_col, setCheck_col]=useState(0)
    const check_colChange=(e)=>{
        setCheck_col(1)
    }
    const todoFin=(no)=>{
        console.log("no:"+no)
        axios.post('http://localhost/todo/complete_react', null, {
            params: {
                no: no,
                check_col:check_col
            }
        }).then(response => {
            if (response.data === "yes") {
                //window.location.reload();
            } else {
                alert("todo 완료에 실패하셨습니다.")
            }
        })
    }
    const todoDel=(no)=>{
        axios.post('http://localhost/todo/delete_react',null,{
            params:{
                no:no
            }
        }).then(response=>{
            if(response.data==='yes')
            {
                window.location.href="/todo/list"
            }
            else
            {
                alert("todo 삭제에 실패했습니다.")
            }
        })
    }

    const [content,setContent]=useState('')
    const contentRef=useRef(null)
    const contentChange=(e)=>{
        setContent(e.target.value)
    }
    const insert=()=>{
        if(content.trim()==="")
        {
            contentRef.current.focus()
            return
        }
        axios.post('http://localhost/todo/insert_react',null,{
            params:{
                content:content
            }
        }).then(response=>{
            if(response.data==="yes")
            {
                window.location.href="/todo/list"
            }
            else
            {
                alert("todo 추가에 실패하셨습니다")
            }
        })
    }

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        return `${year}/${month}/${day}`;
    };

    const [todoList, setTodoList] = useState([]);
    const [curpage, setCurpage] = useState(1);
    const [totalpage, setTotalpage] = useState(0);
    const [isTheadVisible, setIsTheadVisible] = useState(false);

    const theadVisibility = () => {
        setIsTheadVisible(!isTheadVisible); // thead의 표시 여부를 반전
    };

    useEffect(() => {
        axios.get("http://localhost/todo/list_react", {
            params: {
                page: curpage,
            },
        }).then((res) => {
            setTodoList(res.data.list);
            setCurpage(res.data.curpage);
            setTotalpage(res.data.totalpage);
        });
    }, [curpage]);

    let html = todoList.map((vo, index) => (
        <tr style={vo.check_col==1 ? midLine : null} key={vo.no}>
            <td className={"text-center"} width={"10%"}>
                {vo.no}
            </td>
            <td width={"50%"}>{vo.content}</td>
            <td className={"text-center"} width={"20%"}>
                {vo.regdate.substring(0, vo.regdate.indexOf(" "))}
            </td>
            <td className={"text-center"} width={"20%"}>
                <input
                    type={"button"}
                    value={"완료"}
                    onClick={()=>todoFin(vo.no)}
                />
                &nbsp;&nbsp;
                <input type={"button"} value={"삭제"}
                       onClick={() => todoDel(vo.no)}
                />
            </td>
        </tr>
    ));

    return (
        <Fragment>
            <h1 className={"text-center"} style={{marginBottom: "30px"}}>
                {getTodayDate()} TODO LIST
            </h1>
            <table className={"table"}>
                <thead>
                <tr>
                    <td colSpan={"5"} className={"text-center"}>
                        <input type={"button"} value={"+할일추가"}
                               onClick={theadVisibility}/>
                        &nbsp;&nbsp;&nbsp;
                        <input type={"button"} value={"-전체삭제"}/>
                    </td>
                </tr>
                </thead>
                <tbody>{html}</tbody>
                {isTheadVisible && (
                    <tfoot>
                    <tr>
                        <td colSpan={"5"}
                            className={"text-center"}
                        >
                            <textarea style={{"width": "100%"}}
                                      onChange={contentChange} ref={contentRef}
                            ></textarea>
                            <input type={"button"}
                                   value={"추가하기"}
                                   onClick={insert}
                            />
                        </td>
                    </tr>
                    </tfoot>
                )}
            </table>
        </Fragment>
    );
}

export default TodoList;
