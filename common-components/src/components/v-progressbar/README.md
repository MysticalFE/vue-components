# 使用场景

## 在 `axios` 中使用

```typescript
let loading = 0;

// 请求拦截器
axios.interceptors.request.use((config: AxiosRequestConfig)) => {
  if (loading++) {
    $progress.start();
  } else {
    $progress.dec(10);
  }

  //自定义其他逻辑
  ...

  return config;
});

// 响应拦截器
axios.interceptors.response.use((value: AxiosResponse) => {
  if (!loading--) $progress.finish();

  //自定义其他逻辑
  ...

  return value;
}, (err: AxiosError) => {
  if (!loading--) {
    $progress.fail();
    $progress.done();
  }

  //自定义其他逻辑
  ...

  return Promise.reject(err);
});
```

## 在 `router` 中使用

```typescript
//路由跳转前
router.beforeEach((route, from, next) => {
  $progress.start();
  next();
});
//路由跳转前
router.afterEach(() => {
  $progress.done();
});
```
