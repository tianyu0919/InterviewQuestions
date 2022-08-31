/*
 * @Author: 归宿
 * @Date: 2022-08-31 12:31:03
 * @Description: 
 */
let content = document.querySelector('#content');

const list = [
  [1, 1, 1, 0, 0],
  [1, 0, 0, 0, 1],
  [0, 0, 1, 0, 1],
  [1, 1, 1, 0, 1],
  [1, 0, 1, 1, 0]
]

function render({
  el,
  list,
  onClick,
  contentWidth = 300,
  contentHeight = 300
}) {

  let content = null;
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
        const {
          dom
        } = saveArr[i][j];
        if (onClick) {
          onClick(saveArr[i][j]);
        }
        if (ev.target.classList.contains('active')) {
          return;
        }
        const text = dom.innerText;
        dom.classList.add('active');
        clickHistory = removeClassName(clickHistory);
        clickHistory.push(dom);
        findDomOfCoordinate({
          text,
          x: j,
          y: i
        }, saveArr)
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
  clickHistory.forEach(dom => {
    if (dom.classList.contains('active')) {
      dom.classList.remove('active');
    } else if (dom.classList.contains('lineActive')) {
      dom.classList.remove('lineActive');
    }
  })
  return [];
}

function findDomOfCoordinate({
  text,
  x,
  y
}, list) {
  if (x >= 0 && x <= list[0].length - 1 && y >= 0 && y <= list.length - 1) {
    let {
      dom
    } = list[y][x];
    const domText = dom.innerText;
    if (text === domText) {
      console.log(x, y, domText);
      console.log(list[0].length);
      findDomOfCoordinate({
        text,
        x: x - 1,
        y: y - 1
      }, list);
      // findDomOfCoordinate({
      //   text,
      //   x: x + 1,
      //   y: y - 1
      // }, list);
      // findDomOfCoordinate({
      //   text,
      //   x: x - 1,
      //   y: y + 1
      // }, list);
      // findDomOfCoordinate({
      //   text,
      //   x: x + 1,
      //   y: y + 1
      // }, list);
    }
  }
}

function onClick(data) {
  console.log(data);
}

render({
  el: content,
  list,
  onClick: onClick
});

// * 1. 存储所有的位置 {x,y,el}