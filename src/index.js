import _ from "lodash";
import Icon from "./icon.png";
import "./index.css";
import "./common.less";

function component() {
  const element = document.createElement("div");
  const btn = document.createElement("button");

  element.innerHTML = _.join(["Hello", "webpack"], " ");

  btn.innerHTML = "Click me and check the console!";
  btn.onclick = () => {
    console.log("btn click");
  };
  element.classList.add("hello");
  element.appendChild(btn);

  // 将图像添加到我们已经存在的 div 中。
  const myIcon = new Image();
  myIcon.src = Icon;
  element.appendChild(myIcon);

  return element;
}

document.body.appendChild(component());
