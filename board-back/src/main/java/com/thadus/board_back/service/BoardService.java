package com.thadus.board_back.service;

import org.springframework.http.ResponseEntity;

import com.thadus.board_back.dto.request.board.PatchBoardRequestDto;
import com.thadus.board_back.dto.request.board.PostBoardRequestDto;
import com.thadus.board_back.dto.request.board.PostCommentRequestDto;
import com.thadus.board_back.dto.response.board.DeleteBoardResponseDto;
import com.thadus.board_back.dto.response.board.DeleteCommentResponseDto;
import com.thadus.board_back.dto.response.board.GetBoardResponseDto;
import com.thadus.board_back.dto.response.board.GetCommentFavoriteListResponseDto;
import com.thadus.board_back.dto.response.board.GetCommentListResponseDto;
import com.thadus.board_back.dto.response.board.GetFavoriteListResponseDto;
import com.thadus.board_back.dto.response.board.GetLatestBoardListResponseDto;
import com.thadus.board_back.dto.response.board.GetSearchBoardListResponseDto;
import com.thadus.board_back.dto.response.board.GetTop3BoardListResponseDto;
import com.thadus.board_back.dto.response.board.GetUserBoardListResponseDto;
import com.thadus.board_back.dto.response.board.IncreaseViewCountResponseDto;
import com.thadus.board_back.dto.response.board.PatchBoardResponseDto;
import com.thadus.board_back.dto.response.board.PostBoardResponseDto;
import com.thadus.board_back.dto.response.board.PostCommentResponseDto;
import com.thadus.board_back.dto.response.board.PutCommentFavoriteResponseDto;
import com.thadus.board_back.dto.response.board.PutFavoriteResponseDto;

public interface BoardService {
    ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(Integer boardNumber, String email);
    ResponseEntity<? super DeleteCommentResponseDto> deleteComment(Integer commentNumber, String email);
    ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber);
    ResponseEntity<? super GetCommentFavoriteListResponseDto> getCommentFavoriteList(Integer commentNumber);
    ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(Integer boardNumber);
    ResponseEntity<? super GetCommentListResponseDto> getCommentList(Integer boardNumber);
    ResponseEntity<? super GetLatestBoardListResponseDto> getLatestBoardList();
    ResponseEntity<? super GetTop3BoardListResponseDto> getTop3BoardList();
    ResponseEntity<? super GetSearchBoardListResponseDto> getSearchBoardList(String searchWord, String preSearchWord);
    ResponseEntity<? super GetUserBoardListResponseDto> getUserBoardList(String email);
    ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email);
    ResponseEntity<? super PostCommentResponseDto> postComment(PostCommentRequestDto dto,Integer BoardNumber, String email);   
    ResponseEntity<? super PutCommentFavoriteResponseDto> putCommentFavorite(Integer commentNumber, String email); 
    ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer boardNumber, String email);
    ResponseEntity<? super PatchBoardResponseDto> patchBoard(PatchBoardRequestDto dto, Integer boardNumber, String email);
    ResponseEntity<? super IncreaseViewCountResponseDto> increaseViewCount(Integer boardNumber);
}
