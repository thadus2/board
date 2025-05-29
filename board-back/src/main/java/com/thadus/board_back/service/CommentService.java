package com.thadus.board_back.service;

import org.springframework.http.ResponseEntity;

import com.thadus.board_back.dto.response.board.PutCommentFavoriteResponseDto;

public interface CommentService {

    ResponseEntity<? super PutCommentFavoriteResponseDto> putCommentFavorite(Integer commentNumber, String email);
    
}
