const REQUEST_URL = '/api/feeding';

const feedingAPI = (Axios) => ({
  feeding: ({ id, headers }) =>
    Axios.get(REQUEST_URL + `/${id}`, { headers })
      .then((res) => {
        console.log('feeding 데이터 호출', res);
        return res;
      })
      .catch(function (err) {
        throw err;
      }),

  feedings: ({ headers }) =>
    Axios.get(REQUEST_URL, { headers })
      .then((res) => {
        console.log('feedings 데이터 호출', res);
        return res;
      })
      .catch(function (err) {
        throw err;
      }),

  create: ({ data, headers }) =>
    Axios.post(REQUEST_URL, data, { headers })
      .then((res) => {
        console.log('로그인 성공', res);
        return res;
      })
      .catch((err) => {
        console.log('로그인 실패', err);
        throw err; // 에러를 상위로 전달
      }),

  logout: () =>
    Axios.get('/logout')
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      })
});

export default feedingAPI;
