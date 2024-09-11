const REQUEST_URL = '/api/users';

const userAPI = (Axios) => ({
  info: ({ headers }) =>
    Axios.get(REQUEST_URL + '/info', { headers })
      .then((res) => {
        console.log('데이터 가져오기 성공', res);
        return res;
      })
      .catch((err) => {
        console.log('로그인 실패', err);
        throw err; // 에러를 상위로 전달
      }),

  logout: () =>
    Axios.get(REQUEST_URL + '/logout', {
      headers: {
        Access_Token: '1111111'
      }
    })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      })
});

export default userAPI;
