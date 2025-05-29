/*
 * @Author: 卢天宇
 * @Date: 2025-05-28 10:08:56
 * @Description: 
 */
import { StrictMode } from "react";
import ReactDom, { createRoot } from "react-dom/client";
import "@ant-design/v5-patch-for-react-19";
import "./index.css";
import App from "./App.jsx";
import "antd/dist/reset.css";

console.log(ReactDom);

createRoot(document.getElementById("root")).render(<App />);
