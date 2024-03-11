import {Fragment,useState,useEffect} from "react";
import axios from "axios";
/* global kakao */
let title={
    overflow:"hidden",
    textOverflow:"ellipsis",
    whiteSpace:"wrap",
    textAlign:"center",
    marginTop:"15px"
}
function MoimList(){
    const [curpage,setCurpage]=useState(1)
    const [startPage,setStartPage]=useState(0)
    const [endPage,setEndPage]=useState(0)
    const [totalpage,setTotalpage]=useState(0)
    const [moimList,setMoimList]=useState([])
    const [moimDetail,setMoimDetail]=useState({})
    const [open,setOpen]=useState(false)

    useEffect(() => {
        axios.get('http://localhost/moim/list_react',{
            params:{
                page:curpage
            }
        }).then(response=>{
            setMoimList(response.data.list)
            setCurpage(response.data.curpage)
            setTotalpage(response.data.totalpage)
            setStartPage(response.data.startPage)
            setEndPage(response.data.endPage)
        })
    }, [curpage]);
    useEffect(()=>{
        const script=document.createElement("script")
        // <script src=""></script>
        script.async=true
        script.src="//dapi.kakao.com/v2/maps/sdk.js?appkey=23e8040d553778eeeb77f0900cb92322&autoload=false&libraries=services"
        document.head.appendChild(script)
        /*
            <head>
             <script src=""></script>
            </head>
         */
        script.onload=()=>{
            kakao.maps.load(()=>{
                var mapContainer = document.getElementById('map'), // 지도를 표시할 div
                    mapOption = {
                        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                        level: 3 // 지도의 확대 레벨
                    };

                // 지도를 생성합니다
                var map = new kakao.maps.Map(mapContainer, mapOption);

                // 주소-좌표 변환 객체를 생성합니다
                var geocoder = new kakao.maps.services.Geocoder();

                // 주소로 좌표를 검색합니다
                geocoder.addressSearch(moimDetail.addr1, function(result, status) {

                    // 정상적으로 검색이 완료됐으면
                    if (status === kakao.maps.services.Status.OK) {

                        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                        // 결과값으로 받은 위치를 마커로 표시합니다
                        var marker = new kakao.maps.Marker({
                            map: map,
                            position: coords
                        });

                        // 인포윈도우로 장소에 대한 설명을 표시합니다
                        var infowindow = new kakao.maps.InfoWindow({
                            content: '<div style="width:150px;text-align:center;padding:6px 0;">'+moimDetail.loc+'</div>'
                        });
                        infowindow.open(map, marker);

                        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                        map.setCenter(coords);
                    }
                });
            })
        }
    },[moimDetail])
    const pageChange=(page)=>{
        setCurpage(page)
    }
    const prevHandler=()=>{
        setCurpage(startPage-1)
    }
    const nextHandler=()=>{
        setCurpage(endPage+1)
    }
    const onMoimDetail=(vo)=>{
        setOpen(true)
        setMoimDetail(vo)
    }

    let html=moimList.map((vo) =>
        <div className="col-md-4">
            <div className="thumbnail">
                <img src={vo.img} style={{"width": "100%", "height":"200px"}}
                     onClick={() => onMoimDetail(vo)}
                />
                <div className="caption">
                    <p style={title}>{vo.loc}</p>
                </div>
            </div>
        </div>
    )

    let row = []
    if (startPage > 1) {
        row.push(<li><a href={"#"} style={{"color":"#111", "borderRadius":"30px"}} onClick={() => prevHandler()}>&laquo;</a></li>)

    }
    for (let i = startPage; i <= endPage; i++) {
        if (curpage === i) {
            row.push(<li className={"active"}><a href={"#"} style={{"background":"#111", "borderRadius":"30px"}}  onClick={() => pageChange(i)}>{i}</a></li>)
        } else {
            row.push(<li><a style={{"color":"#111", "borderRadius":"30px"}} href={"#"} onClick={()=>pageChange(i)}>{i}</a></li> )
        }

    }
    if(endPage<totalpage)
    {
        row.push(<li><a href={"#"} style={{"color":"#111", "borderRadius":"30px"}} onClick={()=>nextHandler()}>&raquo;</a></li>)
    }

    return (
        <Fragment>
            <div className={"row"}>
                <div className={"col-sm-8"}>
                    {html}
                    <div style={{"height":"20px"}}></div>
                    <div className={"text-center"}>
                        <ul className={"pagination"}>
                            {row}
                        </ul>

                    </div>
                </div>
                <div className={"col-sm-4"}>
                    {open ? <Detail vo={moimDetail}/> : null}
                    <div style={{"height": "10px"}}></div>
                    <Maps/>
                </div>
            </div>

        </Fragment>
    )
}
function Maps()
{
    return (
        <div id="map" style={{"width": "100%", "height": "350px"}}></div>
    )
}
function Detail(props) {
    return (
        <table className={"table"}>
            <tbody>
            <tr>
                <td colSpan={"2"} className={"text-center"}>
                    <img src={props.vo.img} style={{"width": "100%"}}/>
                </td>
            </tr>
            <tr>
                <td colSpan={"2"}>
                    <h3>{props.vo.loc}&nbsp;<span style={{"color": "orange"}}>{props.type}</span></h3>
                </td>
            </tr>
            <tr>
                <td width={"25%"} className={"text-center"}>주소</td>
                <td width={"75%"}>{props.vo.addr1}</td>
            </tr>
            <tr>
                <td width={"25%"} className={"text-center"}>전화</td>
                <td width={"75%"}>{props.vo.call}</td>
            </tr>
            <tr>
                <td width={"25%"} className={"text-center"}>음식종류</td>
                <td width={"75%"}>{props.vo.food}</td>
            </tr>
            <tr>
                <td width={"25%"} className={"text-center"}>가격대</td>
                <td width={"75%"}>{props.vo.cost}</td>
            </tr>
            <tr>
                <td width={"25%"} className={"text-center"}>영업시간</td>
                <td width={"75%"}>{props.vo.time}</td>
            </tr>
            <tr>
                <td width={"25%"} className={"text-center"}>좌석</td>
                <td width={"75%"}>{props.vo.method}</td>
            </tr>
            </tbody>
        </table>
    )
}
export default MoimList