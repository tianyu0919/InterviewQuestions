/*
 * @Author: 卢天宇
 * @Date: 2025-05-28 10:08:56
 * @Description:
 */
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "antd";
import KeepAlive, { AliveScope } from "shared/KeepAlive";

function App() {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);

  return (
    <AliveScope>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Button onClick={() => setCount((count) => count - 1)}>减少</Button>
        <Button onClick={() => setCount((count) => count + 1)}>增加</Button>
        <Button onClick={() => setShow(!show)}>切换</Button>
        {show && <KeepAlive id="count">count is {count}</KeepAlive>}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </AliveScope>
  );
}

export default App;
