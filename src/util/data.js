// 데이터베이스로 보낼 때 양식 변환
// int -> CONST 처리
const DAO = number => {
  switch (number) {
    case 1:
      return 'OSP_SAFECHECK';
    case 2:
      return 'OSP_PATROL';
    case 3:
      return 'SRT';
    case 4:
      return 'INSPECT_BUILDING';
    case 5:
      return 'FREE_FORMAT';
    default:
      return 'UNKNOWN_OPERATION'; // 예상치 못한 입력을 처리하기 위한 기본값
  }
};

const DTO = string => {
  switch (string) {
    case 'OSP_SAFECHECK':
      return 1;
    case 'OSP_PATROL':
      return 2;
    case 'SRT':
      return 3;
    case 'INSPECT_BUILDING':
      return 4;
    case 'FREE_FORMAT':
      return 5;
    default:
      return 6;
  }
};

export { DAO, DTO };
