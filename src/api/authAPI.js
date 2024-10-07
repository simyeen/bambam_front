const authAPI = (Axios) => ({
  signIn: ({ data }) =>
    Axios.post('/api/users/join', data)
      .then((res) => {
        console.log('회원가입 성공', res);
        return res;
      })
      .catch((err) => {
        console.log('회원가입 실패');
        throw err;
      }),

  login: ({ data }) =>
    Axios.post('/login', data)
      .then((res) => {
        console.log('로그인 성공', res);

        const jwtToken = res.headers['authorization'].replace('Bearer ', '');
        return jwtToken;
      })
      .catch((err) => {
        console.log('로그인 실패', err);
        throw err; // 에러를 상위로 전달
      }),

  logout: ({ headers }) =>
    Axios.get('/logout', headers)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      })
});

export default authAPI;
