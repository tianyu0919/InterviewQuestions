# 面试题

## 创建Element的函数

Q: 创建一个创建元素的函数，addELement(TagName, options): Element

A:

```js
function addElement(TagName, options) {
  const ele = document.createElement(TagName);

  const keys = Object.keys(options);

  keys.forEach((item) => {
    ele.setAttribute(item, options[item]);
  })

  return ele;
}
```

## 懒加载的实现

### 第一种方式，监听Scroll事件。

答案如下：

```html
<!DOCTYPE HTML>
<html lang="zh-cn">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no" />
  <meta name="description" content="网站的描述内容。" />
  <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
  <meta name="Author" content="归宿" />
  <meta name="Keywords" content="关键字" />
  <title>监听scroll事件</title>
  <style>
    * {
      margin: 0px;
    }

    div+div {
      margin-top: 20px;
      border: 1px solid #ddd;
    }

    div {
      text-align: center;
    }

    img {
      width: 90vh;
      height: 300px;
      object-fit: cover;
    }
  </style>
</head>

<body>
  <div><img src="" alt="" data-src="../img.jpg"></div>
  <div><img src="" alt="" data-src="../img.jpg"></div>
  <div><img src="" alt="" data-src="../img.jpg"></div>
  <div><img src="" alt="" data-src="../img.jpg"></div>
  <div><img src="" alt="" data-src="../img.jpg"></div>
  <div><img src="" alt="" data-src="../img.jpg"></div>
  <div><img src="" alt="" data-src="../img.jpg"></div>
  <div><img src="" alt="" data-src="../img.jpg"></div>
  <div><img src="" alt="" data-src="../img.jpg"></div>
  <div><img src="" alt="" data-src="../img.jpg"></div>
  <div><img src="" alt="" data-src="../img.jpg"></div>
  <div><img src="" alt="" data-src="../img.jpg"></div>
  <div><img src="" alt="" data-src="../img.jpg"></div>
  <div><img src="" alt="" data-src="../img.jpg"></div>
  <div><img src="" alt="" data-src="../img.jpg"></div>
  <div><img src="" alt="" data-src="../img.jpg"></div>
  <div><img src="" alt="" data-src="../img.jpg"></div>
  <div><img src="" alt="" data-src="../img.jpg"></div>
  <div><img src="" alt="" data-src="../img.jpg"></div>
  <div><img src="" alt="" data-src="../img.jpg"></div>
</body>

<script>
  const imgs = [...document.querySelectorAll('img')];

  function setImgSrc() {
    const t = document.documentElement.scrollTop;
    const h = window.innerHeight;
    imgs.forEach((img, idx) => {
      if (img.offsetTop <= t + h && !img.getAttribute('src')) {
        img.setAttribute('src', img.dataset.src);
      }
    });
  }

  window.addEventListener('scroll', setImgSrc);
  setImgSrc();
</script>

</html>
```

### 第二种方式，使用API，IntersectionObserver

答案如下：

```html
<!DOCTYPE HTML>
<html lang="zh-cn">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no" />
  <meta name="description" content="网站的描述内容。" />
  <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
  <meta name="Author" content="归宿" />
  <meta name="Keywords" content="关键字" />
  <title>IntersectionObserver</title>
  <style>
    * {
      margin: 0px;
    }

    div+div {
      margin-top: 20px;
      border: 1px solid #ddd;
    }

    div {
      text-align: center;
    }

    img {
      width: 90vh;
      height: 300px;
      object-fit: cover;
    }
  </style>
</head>

<body>
  <div><img src="" alt="" data-src="../img.jpg"></div>
  <div><img src="" alt="" data-src="../img.jpg"></div>
  <div><img src="" alt="" data-src="../img.jpg"></div>
  <div><img src="" alt="" data-src="../img.jpg"></div>
  <div><img src="" alt="" data-src="../img.jpg"></div>
  <div><img src="" alt="" data-src="../img.jpg"></div>
  <div><img src="" alt="" data-src="../img.jpg"></div>
  <div><img src="" alt="" data-src="../img.jpg"></div>
  <div><img src="" alt="" data-src="../img.jpg"></div>
  <div><img src="" alt="" data-src="../img.jpg"></div>
  <div><img src="" alt="" data-src="../img.jpg"></div>
  <div><img src="" alt="" data-src="../img.jpg"></div>
  <div><img src="" alt="" data-src="../img.jpg"></div>
  <div><img src="" alt="" data-src="../img.jpg"></div>
  <div><img src="" alt="" data-src="../img.jpg"></div>
  <div><img src="" alt="" data-src="../img.jpg"></div>
  <div><img src="" alt="" data-src="../img.jpg"></div>
  <div><img src="" alt="" data-src="../img.jpg"></div>
  <div><img src="" alt="" data-src="../img.jpg"></div>
  <div><img src="" alt="" data-src="../img.jpg"></div>
</body>

<script>
  let allImgs = document.querySelectorAll('img');

  let observer = new IntersectionObserver((OBItems) => {
    OBItems.forEach(item => {
      if (item.intersectionRatio > 0) {
        const {
          target: img
        } = item;
        observer.unobserve(img);
        img.setAttribute('src', img.dataset.src);
      }
    })
  }, {
    rootMargin: '0px 0px 0px 0px',
  })

  allImgs.forEach(img => {
    observer.observe(img)
  })
</script>

</html>
```

## webpack的实现原理？以及基本使用，常用的属性，例如 entry module 之类的。

### 实现原理

1. webpack的实现原理，第一步分析模块，使用`@babel/parser`进行分析。
2. 第二步是收集依赖，使用`@babel/traverse`进行转换。
3. 如果需要将代码转换为ES5的话，还需要使用`@babel/core`和`@babel/preset-env`进行转换代码。
4. 第三步是递归获取所有依赖。
5. 最后一步是使用 `ejs` 创建一个出口文件，也就是bundle。

## node 的基本使用，服务怎么启动？路由怎么配置（路径返回资源）？

启动服务

```js
const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200,{
    'content-type': 'text/plain;charset=utf-8'
  })
  res.end('22');
})
```

## vue2,vue3的实现原理，他俩的区别是什么？

### vue2

vue2 使用 `Object.definedProperty()` 修改 `get` 和 `set`，添加访问器属性，实现修改数据同时修改dom的作用。

### vue3

vue3 使用 `new Proxy()` 创建一个新的对象，监听这个对象来实现修改对象中数据同时修改dom的作用。

## vuex的实现原理？

## vue 和 React 的区别是什么？

## vue 当中 input 是怎么是现在视图中修改 Data 中的数据的，也就是说 v-model 是什么？