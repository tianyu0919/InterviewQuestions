/*
 * @Author: 归宿
 * @Date: 2022-08-31 12:31:03
 * @Description: 
 */
let content = document.querySelector('#content');

// const list = [
//   [1, 1, 1, 0, 0],
//   [1, 0, 0, 0, 1],
//   [0, 0, 1, 0, 1],
//   [1, 1, 1, 0, 1],
//   [1, 0, 1, 1, 0],
// ]

const list = [];

for (let i = 0; i < 10; i++) {
  let tempList = [];
  for (let j = 0; j < 10; j++) {
    tempList.push(Math.floor(Math.random() * 3));
    // tempList.push(2);
  }
  list.push(tempList);
}

function render({
  el,
  list,
  onClick,
  contentWidth = 300,
  contentHeight = 300
}) {

  let content = null; // * 渲染的盒子
  let saveArr = [];
  if (typeof el === 'string') {
    content = document.querySelector(el);
  } else if (typeof el === 'object' && el instanceof HTMLElement) {
    content = el;
  }

  let rowLength = list.length;
  let columnLength = list[0].length;

  let colHeight = ((contentHeight - 16) - ((rowLength - 1) * 3)) / rowLength;
  let colWidth = ((contentWidth - 16) - ((columnLength - 1) * 3)) / columnLength;

  let clickHistory = [];

  let frm = document.createDocumentFragment();
  for (let i = 0; i < rowLength; i++) {
    let row = document.createElement('div');
    row.classList.add('row');
    row.style = `--h: ${colHeight}px; --w: ${colWidth}px`;
    let tempSaveRow = [];

    for (let j = 0; j < columnLength; j++) {
      let column = document.createElement('div');
      tempSaveRow.push({
        dom: column,
        x: j,
        y: i
      })
      column.classList.add('column');
      column.addEventListener('click', (ev) => {
        const item = saveArr[i][j];
        const { dom } = item;
        if (ev.target.classList.contains('active')) {
          return;
        }
        if (onClick) {
          onClick(saveArr[i][j]);
        }
        clickHistory = removeClassName(clickHistory);
        dom.classList.add('active');
        clickHistory = findDomOfCoordinate(item, saveArr);
        console.log(clickHistory);
      })
      column.innerText = list[i][j];
      row.appendChild(column);
    }
    saveArr.push(tempSaveRow);

    frm.appendChild(row);
  }
  content.appendChild(frm);
};

function removeClassName(clickHistory) {
  clickHistory.forEach(({ dom, timer }) => {
    if (dom.classList.contains('active')) {
      dom.classList.remove('active');
    } else if (dom.classList.contains('lineActive')) {
      dom.classList.remove('lineActive');
    }
    if(timer) {
      clearTimeout(timer);
    }
  })
  return [];
}

function findDomOfCoordinate(item, saveArr) {
  const { x, y, dom } = item;
  const text = dom.innerText;
  const readyWalkArr = []; // * 记录已经走过的，就不再走了
  const lineItem = []; // * 存储相邻的。
  let index = 1;

  // * 递归查找
  function recursion({
    text,
    x,
    y
  }, list) {
    if (x >= 0 && x <= list[0].length - 1 && y >= 0 && y <= list.length - 1 && !readyWalkArr.some((items) => items.x === x && items.y === y)) {
      const items = list[y][x]
      readyWalkArr.push(items);
      let {
        dom
      } = items;
      const domText = dom.innerText;
      if (text === domText) {
        const { dom: itemsDom } = items;
        // * 因为如果点击的过快，上次的timeout还会继续执行。添加到timer后面用于取消。
        const copyItems = { ...items, timer: null };
        if (!itemsDom.classList.contains('active')) {
          copyItems.timer = setTimeout(() => {
            itemsDom.classList.add('lineActive');
          }, 16 * index);
          index += 4;
        }
        lineItem.push(copyItems);
        // * 往左走
        recursion({
          text: domText,
          x: x - 1,
          y
        }, list);
        // * 往上走
        recursion({
          text: domText,
          x,
          y: y - 1
        }, list);
        // * 往右走
        recursion({
          text: domText,
          x: x + 1,
          y
        }, list);
        // * 往下走
        recursion({
          text: domText,
          x,
          y: y + 1
        }, list);
      }
    }
  }

  // * 递归
  recursion({ text, x, y }, saveArr);

  return lineItem;
}

function onClick(data) {
  console.log(data);
}

render({
  el: content,
  list,
  onClick: onClick,
  contentWidth: 500,
  contentHeight: 500,
});