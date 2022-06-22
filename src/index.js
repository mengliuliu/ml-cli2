const f = () => {
  console.log("arrow");
};
f();
new Promise((resolve, reject) => {
  resolve("success");
}).then((value) => {
  console.log("value", value);
});
