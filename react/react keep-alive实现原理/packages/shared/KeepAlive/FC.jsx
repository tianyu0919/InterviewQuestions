/*
 * @Author: 卢天宇
 * @Date: 2025-05-30 10:39:42
 * @Description: 函数组件实现keep-alive
 */
import React, { useState, useEffect, createContext, useContext } from "react";

const KeepAliveContext = createContext();

const KeepAlive = (props) => {
  const keep = useContext(KeepAliveContext);
  const [realContent, setRealContent] = useState(null);

  useEffect(() => {
    keep(props.id, props.children).then((content) => {
      setRealContent(content);
    });
  }, [props.id, props.children]);

  return <>{realContent}</>;
};

export const AliveScope = (props) => {
  const [nodes, setNodes] = useState({});

  const keep = (id, children) => {
    return new Promise((resolve) => {
      setNodes((prev) => ({ ...prev, [id]: children }));
      resolve(nodes[id]);
    });
  };

  useEffect(() => {
    console.log(nodes);
  }, [nodes]);

  return (
    <KeepAliveContext.Provider value={keep}>
      {props.children}
      {/* {Object.values(nodes).map(({ id, children }) => (
        <div key={id}>{children}</div>
      ))} */}
    </KeepAliveContext.Provider>
  );
};

export default KeepAlive;
