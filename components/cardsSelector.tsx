import { FunctionComponent, useRef } from 'react';

const CardsSelector: FunctionComponent = ({ children }) => {
  const ref = useRef<any>();

  const scrollLeft = () => {
    ref.current.scroll({
      left: ref.current.scrollLeft + 300,
      behavior: 'smooth',
    });
  };
  const scrollRight = () => {
    ref.current.scroll({
      left: ref.current.scrollLeft - 300,
      behavior: 'smooth',
    });
  };

  return (
    <div className=" flex items-center overflow-hidden">
      <button
        className=" absolute  flex items-center justify-center z-20 w-6 h-6 font-bold "
        onClick={() => scrollRight()}
      >
        <i className="bi bi-chevron-left"></i>
      </button>
      <div
        ref={ref}
        className="no_scrollbar px-40 w-[100%] flex items-center overflow-x-scroll snap-mandatory snap-x"
      >
        {children}
      </div>
      <button
        className="absolute  right-6 flex items-center justify-center z-10 w-6 h-6 font-bold  dark:border-white"
        onClick={() => scrollLeft()}
      >
        <i className="bi bi-chevron-right"></i>
      </button>
    </div>
  );
};

export default CardsSelector;
