/*
 * @Author: tianyu
 * @Date: 2023-06-16 10:39:45
 * @Description:
 */
import createOverload from "./overload.mjs";

const getUsers = createOverload();

getUsers.addImpl(() => {
  console.log("查询所有用户");
});

const searchPage = (page, size = 10) => {
  console.log("按照页码查询用户");
};

getUsers.addImpl("number", searchPage);

getUsers.addImpl("number", "number", searchPage);

getUsers.addImpl("string", (name) => {
  console.log("按照名字查询记录");
});

getUsers.addImpl("string", "string", (name, sex) => {
  console.log("按照名字和性别查询记录");
});

getUsers("s", "2");
