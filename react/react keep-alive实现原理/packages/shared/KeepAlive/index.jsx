/*
 * @Author: 卢天宇
 * @Date: 2025-05-28 17:41:21
 * @Description:
 */
import React, { Component, createContext } from "react";

const { Provider, Consumer } = createContext();
const withScope = (WrappedComponent) => (props) => {
  console.group("WrappedComponent");
  console.log(WrappedComponent);
  console.log(props);
  console.groupEnd();
  return (
    <Consumer>
      {(keep) => {
        console.group("Consumer");
        console.log(keep);
        console.groupEnd();
        return <WrappedComponent {...props} keep={keep} />;
      }}
    </Consumer>
  );
};

export class AliveScope extends Component {
  nodes = {};
  state = {};

  keep = (id, children) => {
    console.group("keep");
    console.log(id, children);
    console.groupEnd();
    return new Promise((resolve) =>
      this.setState(
        {
          [id]: { id, children },
        },
        () => resolve(this.nodes[id])
      )
    );
  };

  render() {
    return (
      <Provider value={this.keep}>
        {this.props.children}
        {Object.values(this.state).map(({ id, children }) => (
          <div
            key={id}
            ref={(node) => {
              this.nodes[id] = node;
            }}
          >
            {children}
          </div>
        ))}
      </Provider>
    );
  }
}

@withScope
class KeepAlive extends Component {
  constructor(props) {
    super(props);
    this.init(props);
  }

  init = async ({ id, children, keep }) => {
    console.group("init");
    console.log(id, children, keep);
    console.groupEnd();
    const realContent = await keep(id, children);
    this.placeholder.appendChild(realContent);
  };

  render() {
    return (
      <div
        ref={(node) => {
          this.placeholder = node;
        }}
      />
    );
  }
}

export default KeepAlive;
