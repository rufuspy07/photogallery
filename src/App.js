import { useState } from "react";
import MyImages from "./components/images";
import NavBar from "./components/navBar";

function App() {
  const [imgData, setImgData] = useState([]);
  const [count, setCount] = useState(0);
  const getData = (data) => {
    setImgData(data);
    console.log('prop',data);
  };
  return (
    <div className="">
      <NavBar getData = {getData} setCount={setCount} />
      <MyImages imgData = {imgData} count = {count}/>
    </div>
  );
}

export default App;
