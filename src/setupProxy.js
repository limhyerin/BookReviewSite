const { createProxyMiddleware } = require('http-proxy-middleware');

// 프록시 설정하는 법 참고
// https://msyu1207.tistory.com/entry/React%EB%A1%9C-%EC%98%81%ED%99%94-%EC%A0%95%EB%B3%B4%EB%A5%BC-%EA%B2%80%EC%83%89%ED%95%B4%EB%B3%B4%EC%9E%90-%EB%91%90%EB%B2%88%EC%A7%B8-%EB%84%A4%EC%9D%B4%EB%B2%84-API-%EC%82%AC%EC%9A%A9-CORS-%EC%84%A4%EC%A0%95-%ED%95%98%EA%B8%B0#toc-%F0%9F%93%A2CORS%EB%A5%BC%20%EC%B2%98%EB%A6%AC%ED%95%98%EB%8A%94%20%EB%B0%A9%EB%B2%95%20ONE

// 개발시 cors에러 방지용 프록시

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/naver-api', {
      target: 'https://openapi.naver.com',
      changeOrigin: true,
      // 하단 처리는 필수로 해주어야 한다. 아래의 내용이 없으면 url 경로에
      // api가 추가되어 경로를 찾을 수 없어진다.
      pathRewrite: {
        '^/naver-api/': '/'
      }
    })
  );
};
