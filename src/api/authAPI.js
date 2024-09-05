const authAPI = (Axios) => ({
  hello: () =>
    Axios.get('/hello')
      .then((res) => {
        console.log('hello api 호출성공', res);
        return res;
      })
      .catch((err) => {
        console.log('hello err 발생', err);
        return err;
      }),

  login: ({ data }) =>
    Axios.post('/login', data)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      }),
  logout: () =>
    Axios.get('/logout', {
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

export default authAPI;
