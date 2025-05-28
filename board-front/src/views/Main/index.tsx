import React, { useEffect, useState } from 'react'
import './style.css';
import { BoardListItem } from 'types/interface';
import Top3Item from 'components/Top3Item';
import BoardItem from 'components/BoardItem';
import Pagination from 'components/Pagination/idex';
import { useNavigate } from 'react-router-dom';
import { AUTH_PATH, BOARD_PATH, BOARD_WRITE_PATH, SEARCH_PATH } from 'constant';
import { getLatestBoardListRequest, getPopularListRequest, getTop3BoardListRequest } from 'apis';
import { GetLatestBoardListResponseDto, GetTop3BoardListResponseDto } from 'apis/response/board';
import { ResponseDto } from 'apis/response';
import { usePagination } from 'hooks';
import { GetPopularListResponseDto } from 'apis/response/search';
import { toast } from 'react-toastify';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLoginUserStore } from 'stores';

//          component: 메인 화면 컴포넌트               //
export default function Main() {

  //          component: 메인 화면 상단 컴포넌트               //
  const MainTop = () => {

    //          function: 캐러셀 개수 설정              //
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 2000
    };
    //          state: 주간 top3 게시물 리스트 상태           //
    const [top3BoardList, setTop3BoardList] = useState<BoardListItem[]>([]);

    //          function: get top 3 board list response 처리 함수           //
    const getTop3BoardListResponse = (responseBody: GetTop3BoardListResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'DBE') toast('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      const { top3List } = responseBody as GetTop3BoardListResponseDto;
      setTop3BoardList(top3List);
    }
    //          effect: 첫 마운트 시 실행될 함수            //
    useEffect(() => {
      getTop3BoardListRequest().then(getTop3BoardListResponse);
    }, []);

    //          render: 메인 화면 상단 컴포넌트 렌더링          //
    return (
      <div id='main-top-wrapper'>
        <div className='main-top-container'>
          <div className='main-top-title'><span className='emphasis'>{'Somyeon\'s board'}</span>{'에서 \n 다양한 이야기를 나누어보세요.'}</div>
          <div className='main-top-contents-box'>
            <div className='main-top-contents-title'>{'주간 Top 10 게시물'}</div>
              <div className='main-top-contents'>
              <Slider {...settings}>
                {top3BoardList.map(item => (
                  <div key={item.boardNumber}>
                    <Top3Item top3ListItem={item} />
                  </div>
                ))}
              </Slider>
              </div>
          </div>
        </div>
      </div>
    )
  }
  //          component: 메인 화면 하단 컴포넌트               //
  const MainBottom = () => {

    //          function: 네비게이트 함수             //
    const navigate = useNavigate();

    //          state: 페이지 네이션 관련 상태          //
    const { 
        currentPage, currentSection, viewList, viewPageList, totalSection,
        setCurrentPage, setCurrentSection, setTotalList
     } = usePagination<BoardListItem>(5);
    //          state: 인기 검색어 리스트 상태          //
    const [popularWordList, setPopularWordList] = useState<string[]>([]);

    //          function: get latest board list response 처리 함수          //
    const getLatestBoardListResponse = (responseBody: GetLatestBoardListResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'DBE') toast('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      const { latestList } = responseBody as GetLatestBoardListResponseDto;
      setTotalList(latestList);
    };

    //          function: get popular list response 처리 함수           //
    const getPopularListRespone = (responseBody: GetPopularListResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'DBE') toast('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      const { popularWordList } = responseBody as GetPopularListResponseDto;
      setPopularWordList(popularWordList);
    }

    //         state: 로그인 유저 상태            //
    const { loginUser } = useLoginUserStore();
    //          event handler: 인기 검색어 클릭 이벤트 처리           //
    const onPopularWordClickHandler = (word: string) => {
      navigate(SEARCH_PATH(word));
    }
    //          event handler: 글쓰기 버튼 클릭 이벤트 처리           //
    const onWriteBoardClickHandler = () => {
      if (!loginUser){
        toast('로그인이 필요합니다.');
        navigate(AUTH_PATH());
        return;
      }
      navigate(BOARD_PATH() + '/' + BOARD_WRITE_PATH())
    }
    //          effect: 첫 마운트 시 실행될 함수            //
    useEffect(() => {
      getLatestBoardListRequest().then(getLatestBoardListResponse);
      getPopularListRequest().then(getPopularListRespone);
    }, []);

    //          render: 메인 화면 하단 컴포넌트 렌더링          //
    return (
      <div id='main-bottom-wrapper'>
        <div className='main-bottom-container'>
          <div className='main-bottom-title'>{'최신 게시물'}</div>
          <div className='main-bottom-contents-box'>
            <div className='main-bottom-current-contents'>
              <div className='write-box' onClick={onWriteBoardClickHandler}>
                <div className='main-bottom-write-content-button'>
                  <div className='icon-box'>
                    <div className='icon edit-icon'></div>
                  </div>
                  <div className='main-bottom-write-content'>글쓰기</div>
                </div>
              </div>
              {viewList.map(boardListItem => <BoardItem boardListItem={boardListItem} />)}</div>
            <div className='main-bottom-popular-box'>
              <div className='main-bottom-popular-card'>
                <div className='main-bottom-popular-card-box'>
                  <div className='main-bottom-popular-card-title'>{'인기 검색어'}</div>
                  <div className='main-bottom-popular-card-contents'>
                    {popularWordList.map(word => <div className='word-badge' onClick={() => onPopularWordClickHandler(word)}>{word}</div>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='main-bottom-pagination-box'>
            <Pagination
            currentPage={currentPage}
            currentSection={currentSection}
            setCurrentPage={setCurrentPage}
            setCurrentSection={setCurrentSection}
            viewPageList={viewPageList}
            totalSection={totalSection}
            />
          </div>
        </div>        
      </div>
    )
  }
  //          render: 메인 화면 컴포넌트 렌더링          //
  return (
    <>
      <MainTop />
      <MainBottom />
    </>
  )
}
