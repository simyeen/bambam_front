import { Link } from 'react-router-dom';

import Input from '../../atoms/Input';
import Dropdown from '../../atoms/Dropdown';

import ArrowDownCircle from '../../../assets/svg/Arrow-down-circle';
import MapPin from '../../../assets/svg/Map-pin';
import { READ_ONLY_CONTENT_LIST, READ_ONLY_TITLE_LIST, MAP_SHOW_LIST } from '../../../constants/board';
import MinusCircle from '../../../assets/svg/Minus-circle';
import { DAO } from '../../../util/data';

const Board = ({
  arr,
  latestBoardType,
  selectedIndex,
  setSelectedIndex,
  boardData,
  handleFormChange,
  handleSelect,
}) => {
  const getMatchedSVG = (title, index) => {
    const itemList = arr[index];

    if (DAO(latestBoardType) !== 'FREE_FORMAT' && MAP_SHOW_LIST.includes(title)) {
      return (
        <Link to="/map">
          <MapPin className="hover:animate-bounce" />
        </Link>
      );
    } else if (DAO(latestBoardType) !== 'FREE_FORMAT' && READ_ONLY_CONTENT_LIST.includes(title)) {
      return <MinusCircle class="cursor-not-allowed" />;
    } else {
      return (
        <div
          className="relative cursor-pointer"
          onClick={() => {
            // 동일한 버튼 클릭시 닫기
            if (selectedIndex === index) {
              setSelectedIndex(null);
            } else {
              setSelectedIndex(index);
            }
          }}
        >
          <ArrowDownCircle />
          <Dropdown
            itemList={itemList}
            isOpend={selectedIndex === index}
            setIsOpend={setSelectedIndex}
            index={index}
            handleSelect={handleSelect}
          />
        </div>
      );
    }
  };

  return (
    <div class="space-y-1 text-base leading-5 text-gray-600">
      {boardData.map(({ title, content }, index) => (
        <div class="flex justify-center items-center space-x-2 ">
          <Input
            className="w-1/4 m-0 text-center text-4xl"
            name="title"
            value={title}
            index={index}
            onChange={handleFormChange}
            readOnly={DAO(latestBoardType) !== 'FREE_FORMAT' && READ_ONLY_TITLE_LIST.includes(title) ? true : false}
          />
          <Input
            className="w-3/4"
            name="content"
            value={DAO(latestBoardType) === 'FREE_FORMAT' && index !== 5 ? '*' + content.replace(/^\*+/g, '') : content}
            index={index}
            onChange={handleFormChange}
            readOnly={DAO(latestBoardType) !== 'FREE_FORMAT' && READ_ONLY_CONTENT_LIST.includes(title) ? true : false}
          />
          <div id="emo-button">{getMatchedSVG(title, index)}</div>
        </div>
      ))}
      <ul class="space-y-2"></ul>
      <div className="flex justify-between"></div>
    </div>
  );
};

export default Board;

// {READ_ONLY_CONTENT_LIST.includes(title) ? <MinusCircle /> : }
