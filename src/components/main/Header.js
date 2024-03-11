import {Fragment} from "react";
import {Link} from "react-router-dom";
//장점 : 개발 생산성이 높다 (컴포넌트를 사용한다 = 나눠서 코딩한다.)
let nav={
    backgroundColor:"white" ,
    color:"#444",
    marginBottom:"30px",
    border:"1px solid #999"
}
//방법1)
function Header(){
    return(
        <nav className="navbar navbar-inverse" style={nav}>
            <div className="container-fluid">
                <div className="navbar-header">
                    <Link className="navbar-brand" to={"/"}>
                        YYYYYYna_Portfolio [React_ROUTER]
                    </Link>
                </div>
                <ul className="nav navbar-nav">
                    <li className="active"><a href="#">Home</a></li>
{/*                    <li className="dropdown">
                        <Link className="dropdown-toggle" data-toggle="dropdown"
                              to={"/"}>Store
                            <span className="caret"></span></Link>
                        <ul className="dropdown-menu">
                            <li><Link to={"/goods/all"}>전체상품</Link></li>
                            <li><Link to={"/goods/best"}>베스트상품</Link></li>
                            <li><Link to={"/goods/special"}>특가상품</Link></li>
                            <li><Link to={"/goods/new"}>신상품</Link></li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <Link className="dropdown-toggle" data-toggle="dropdown"
                              to={"/"}>Food
                            <span className="caret"></span></Link>
                        <ul className="dropdown-menu">
                            <li><Link to={"/food/list"}>맛집목록</Link></li>
                            <li><Link to={"/food/find"}>맛집검색</Link></li>
                        </ul>
                    </li>*/}
                    <li><Link to={"/moim/list"}>소모임</Link></li>
                    <li><Link to={"/news/list"}>책 뉴스</Link></li>
                    <li><Link to={"/board/list"}>커뮤니티</Link></li>
                    <li><Link to={"/todo/list"}>TODO LIST</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Header

//방법2)
// export const Header=()=>{
//     return(
//
//     )
// }

/*
    문법 : 1. function / class => 명칭은 대문자로 한다
          html은 모두 소문자로 한다.

          function Detail / function Header
      호출시=> <Detail>        <Header>
           Html이 xml형식 => 여는태그와 닫는태그가 동일
                         => 루트태그가 존재
                         => style = {{}}
                         => <input/>, <img/>
 */