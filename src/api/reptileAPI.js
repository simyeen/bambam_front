const REQUEST_URL = '/api/reptile';

const reptileAPI = (Axios) => ({
  reptile: ({ id, headers }) =>
    Axios.get(REQUEST_URL + `/${id}`, { headers })
      .then((res) => {
        console.log('reptile 데이터 호출', res);
        return res;
      })
      .catch(function (err) {
        throw err;
      }),

  reptiles: ({ headers }) =>
    Axios.get(REQUEST_URL, { headers })
      .then((res) => {
        console.log('reptiles 데이터 호출', res);
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

  delete: ({ id, headers }) =>
    Axios.delete(REQUEST_URL + `/${id}`, { headers })
      .then((res) => {
        console.log('reptile 데이터 호출', res);
        return res;
      })
      .catch(function (err) {
        throw err;
      })
});

export default reptileAPI;
