import { atom } from 'recoil';

const userState = atom({
  key: 'userState',
  default: {
    uid: '', //firebase 제공 id
    dockey: '', //uuid로 생성한 임의 아이디
    name: '',
    team: '',
    email: '',
    // password: '',
    branchType: '',
    centerType: '',
    latestBoardType: '',
    createAt: '',
  },
});

const postState = atom({
  key: 'postState',
  default: {
    constructionName: '',
    constructionType: '',
    constructionDescription: '',
    constructInspector: '',
    addr: '',
    date: '',
    GPSLatitude: '',
    GPSLongitude: '',
    attachmentUrl: '',
    branchType: '',
    centerType: '',
    boardType: '',
    madeBy: '',
    createAt: '',
  },
});

// 이곳은 positionState 에서 gps랑 select로 나누는게 더 좋을 것 같긴한데

const positionState = atom({
  key: 'positionState',
  default: {
    GPS: { latitude: '', longitude: '' },
    SELECT: { latitude: '', longitude: '' },
  },
});

const imageUrlState = atom({
  key: 'imageUrlState',
  default: {
    ORIGINAL: { url: '' },
    COMBINE: { url: '' },
  },
});

const boardState = atom({
  key: 'boardState',
  default: [],
});

export { boardState, userState, positionState, imageUrlState };
