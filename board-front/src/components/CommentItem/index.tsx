import React, { useEffect, useState } from 'react'
import './style.css'
import { CommentFavoriteListItem, CommentListItem } from 'types/interface'
import DefaultProfileImage from 'assets/images/default-profile-image.jpg'
import dayjs from 'dayjs';
import { getCommentFavoriteListRequest, PutCommentFavoriteRequest } from 'apis';
import { useLoginUserStore } from 'stores';
import { useCookies } from 'react-cookie';
import { PutCommentFavoriteResponseDto } from 'apis/response/board';
import { ResponseDto } from 'apis/response';
import { toast } from 'react-toastify';
import GetCommentFavoriteListResponseDto from 'apis/response/board/get-comment-favorite-list.response.dto';

interface Props{
    commentListItem: CommentListItem;
}
//              component: Comment List Item 컴포넌트               //

export default function CommentItem({  commentListItem  }: Props) {

  //            properties          //
  const { commentNumber, nickname, profileImage, writeDatetime, content, favoriteCount } = commentListItem;
  //          state: 로그인 유저 상태         //
  const { loginUser } = useLoginUserStore();
  //          state: 쿠키 상태          //
  const [cookies, setCookies] = useCookies();
  //          state: 좋아요 상태             //
  const [isFavorite, setFavorite] = useState<boolean>(false);
  //          state: 좋아요 리스트 상태             //
  const [favoriteList, setFavoriteList] = useState<CommentFavoriteListItem[]>([]);

  //          event handler: 좋아요 클릭 이벤트 처리          //
const onCommentFavoriteClickHandler = () => {
  if (!commentNumber || !loginUser || !cookies.accessToken) return
  PutCommentFavoriteRequest(commentNumber, cookies.accessToken).then(putCommentFavoriteResponse);
  }

  //            function: 작성일 경과시간 함수                      //
  const getElapsedTime = () => {
    const now = dayjs().add(9, 'hour');
    const writeTime = dayjs(writeDatetime);

    const gap = now.diff(writeTime, 's');
    if (gap < 60) return `${gap}초 전`;
    if (gap < 3600) return `${Math.floor(gap/60)}분 전`
    if (gap < 86400) return `${Math.floor(gap/ 3600)}시간 전`
    if (gap < 604800) return `${Math.floor(gap/86400)}일 전`
    return writeTime.format('YYYY. MM. DD');;
  }
    //          function: get favorite list response 처리 함수          //
    const getCommentFavoriteListResponse = (responseBody: GetCommentFavoriteListResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'NB') toast('존재하지 않는 게시물입니다.');
      if (code === 'DBE') toast('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      const { commentFavoriteList } = responseBody as GetCommentFavoriteListResponseDto;
      setFavoriteList(commentFavoriteList);

      if (!loginUser) {
        setFavorite(false)
        return;
      }
      const isFavorite = commentFavoriteList.findIndex(favorite => favorite.email === loginUser.email) !== -1;
      setFavorite(isFavorite);
    }
  //          function: put comment favorite response 처리 함수         //
  const putCommentFavoriteResponse = (responseBody: PutCommentFavoriteResponseDto | ResponseDto | null) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === 'VF') toast('잘못된 접근입니다.');
    if (code === 'NU') toast('존재하지 않는 유저입니다.');
    if (code === 'NC') toast('존재하지 않는 게시물입니다.');
    if (code === 'AF') toast('인증에 실패했습니다.');
    if (code === 'DBE') toast('데이터베이스 오류입니다.');
    if (code !== 'SU') return;

    if (!commentNumber) return;
    getCommentFavoriteListRequest(commentNumber).then(getCommentFavoriteListResponse);
  }

  //            effect: 좋아요 갱신             //
  useEffect(() => {
    if (!commentNumber) return;
    getCommentFavoriteListRequest(commentNumber).then(getCommentFavoriteListResponse);
  }, [commentNumber]);
  //            render: Comment List Item 렌더링                    //
  return (
    <div className='comment-list-item'>
        <div className='comment-list-item-top'>
            <div className='comment-list-item-profile-box'>
                <div className='comment-list-item-profile-image' style={{backgroundImage: `url(${profileImage ? profileImage : DefaultProfileImage})`}}></div>
            </div>
            <div className='comment-list-item-nickname'>{nickname}</div>            
            <div className='comment-list-item-divider'>{'\|'}</div>
            <div className='comment-list-item-time'>{getElapsedTime()}</div>
        </div>
        <div className='comment-list-item-main'>
          <div className='comment-list-item-content'>{content}</div>
        </div>
        <div className='comment-list-item-bottom'>
          <div className='icon-button' onClick={onCommentFavoriteClickHandler}>
            {isFavorite ?
            <div className='icon favorite-fill-icon'></div> :
            <div className='icon favorite-light-icon'></div>
            }
          </div>
          <div className='comment-list-item-favorite-count'>{favoriteList.length}</div>
        </div>
    </div>
  )
}
