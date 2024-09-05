import { useEffect, useState } from 'react';

function Map({ mapRef, handleConfirm }) {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);

  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
      setInnerHeight(window.innerHeight);
    };
    window.addEventListener('resize', resizeListener); //화면 사이즈 변경을 감지한다!!!
  }, []);

  return (
    <div className="relative h-screen">
      <div id="map" className=" overflow-hidden" style={{ width: innerWidth, height: innerHeight }}>
        {mapRef.current ? <></> : <h1>로딩중</h1>}
        <button
          onClick={handleConfirm}
          className="absolute p-1 mb-2 bottom-2 right-2 w-24 rounded-xl bg-sky-600 text-white z-20"
        >
          위치 선택
        </button>
      </div>
    </div>
  );
}

export default Map;
