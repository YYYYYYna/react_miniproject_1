import Header from "./components/main/Header";
import Home from "./components/main/Home";
import FoodList from "./components/food/FoodList";
import FoodDetail from "./components/food/FoodDetail";
import GoodsBest from "./components/goods/GoodsBest";
import GoodsAll from "./components/goods/GoodsAll";
import GoodsNew from "./components/goods/GoodsNew";
import GoodsSpecial from "./components/goods/GoodsSpecial";
import RecipeDetail from "./components/recipe/RecipeDetail";
import FoodFind from "./components/food/FoodFind";
// import {GoodsAll,GoodsBest,GoodsSpecial,GoodsNew} from "./components/goods"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import MoimList from "./components/moim/MoimList";
import BoardList from "./components/borad/BoardList";
import BoardInsert from "./components/borad/BoardInsert";
import BoardDetail from "./components/borad/BoardDetail";
import BoardUpdate from "./components/borad/BoardUpdate";
import BoardDelete from "./components/borad/BoardDelete";
import NewsList from "./components/news/NewsList";
import TodoList from "./components/todo/TodoList";

function App() {
  return (
      //Router = 화면 바꿔주는 역할
      <Router>
        <Header/>
        <div className={"container"}>
            {/*Routes = 경로바꿔주는역할*/}
          <Routes>
            <Route exact path={"/"} element={<Home/>}/>
            <Route path={"/food/list"} element={<FoodList/>}/>
              <Route path={"/food/find"} element={<FoodFind/>}/>
            <Route path={"/food/detail/:fno"} element={<FoodDetail/>}/>
              <Route path={"/goods/all"} element={<GoodsAll/>}/>
              <Route path={"/goods/best"} element={<GoodsBest/>}/>
              <Route path={"/goods/special"} element={<GoodsSpecial/>}/>
              <Route path={"/goods/new"} element={<GoodsNew/>}/>
              <Route path={"/recipe/detail/:no"} element={<RecipeDetail/>}/>
              <Route path={"/moim/list"} element={<MoimList/>}/>
              <Route path={"/board/list"} element={<BoardList/>}/>
              <Route path={"/board/insert"} element={<BoardInsert/>}/>
              <Route path={"/board/detail/:no"} element={<BoardDetail/>}/>
              <Route path={"/board/update/:no"} element={<BoardUpdate/>}/>
              <Route path={"/board/delete/:no"} element={<BoardDelete/>}/>
              <Route path={"/news/list"} element={<NewsList/>}/>
              <Route path={"/todo/list"} element={<TodoList/>}/>
          </Routes>
        </div>
      </Router>
  )
}

export default App;
