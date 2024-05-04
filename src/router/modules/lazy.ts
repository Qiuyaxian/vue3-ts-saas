const LazyLoadingRoutes = function (done: Function | null) {
  const routes = [
    {
      id: 'anli',
      icon: 'shouye',
      name: '测试',
      url: null,
      route: null,
      children: [
        {
          id: 'demo',
          icon: 'shouye',
          name: '案例',
          route: '/demo',
          url: 'Demo',
          children: [
            {
              id: 'anli2',
              icon: 'shouye',
              name: '测试2',
              url: null,
              route: null,
              children: [
                {
                  id: 'demosub',
                  icon: 'shouye',
                  name: '案例2',
                  route: 'sub',
                  url: 'Product',
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'product',
      icon: 'xiangqu',
      name: '产品',
      route: '/product',
      url: 'Product',
    },
    {
      id: 'laicj',
      icon: 'xiangqu',
      name: '链接',
      route: '/laicj',
      url: 'https://laicj.cn/',
      meta: {
        auth: false
      }
    },
    {
      id: 'test',
      icon: 'xiangqu',
      name: '空链接',
      route: '/test',
      url: '',
      meta: {
        auth: true
      }
    }
  ]
  done && done(routes)
}
export default LazyLoadingRoutes
