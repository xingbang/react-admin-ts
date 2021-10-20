import adminRouter from './router';

const routes = [...adminRouter];

export const rootSubmenuKeys = (() => {
  const arr: string[] = [];
  for (let index = 0; index < routes.length; index++) {
    //const element = routes[index];
    //if (window.location.pathname.startsWith(element.path)) {
    routes[index].children.forEach((e) => {
      arr.push(e.path);
      e.children &&
        e.children.forEach((i) => {
          arr.push(i.path);
        });
    });
    //}
  }
  // console.log(arr);
  return arr;
})();

export default routes;
