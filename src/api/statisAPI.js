const REQUEST_URL = '/api/statis';

const statisAPI = (Axios) => ({
  weight: ({ id, headers }) =>
    Axios.get(REQUEST_URL + `/weight/${id}`, { headers })
      .then((res) => {
        console.log('weight 데이터 호출', res);
        return res;
      })
      .catch(function (err) {
        throw err;
      }),
  foodType: ({ id, headers }) =>
    Axios.get(REQUEST_URL + `/foodType/${id}`, { headers })
      .then((res) => {
        console.log('foodType 데이터 호출', res);
        return res;
      })
      .catch(function (err) {
        throw err;
      }),
  feedDate: ({ id, headers }) =>
    Axios.get(REQUEST_URL + `/feedDate/${id}`, { headers })
      .then((res) => {
        console.log('feedDate 데이터 호출', res);
        return res;
      })
      .catch(function (err) {
        throw err;
      }),
  averages: ({ id, headers }) =>
    Axios.get(REQUEST_URL + `/averages/${id}`, { headers })
      .then((res) => {
        console.log('averages 데이터 호출', res);
        return res;
      })
      .catch(function (err) {
        throw err;
      })
});

export default statisAPI;
