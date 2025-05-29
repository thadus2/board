package com.thadus.board_back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thadus.board_back.dto.response.board.DeleteCommentResponseDto;
import com.thadus.board_back.dto.response.board.PutCommentFavoriteResponseDto;
import com.thadus.board_back.service.CommentService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("api/v1/comment")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @DeleteMapping("/{commentNumber}")
    public ResponseEntity<? super DeleteCommentResponseDto> deleteComment(
        @PathVariable("commentNumber") Integer commentNumber,
        @AuthenticationPrincipal String email
    ) {
        ResponseEntity<? super DeleteCommentResponseDto> response = commentService.deleteComment(commentNumber, email);
        return response;

    }

    @PutMapping("/{commentNumber}/favorite")
    public ResponseEntity<? super PutCommentFavoriteResponseDto> putCommentFavorite(
        @PathVariable("commentNumber") Integer commentNumber,
        @AuthenticationPrincipal String email
    ) {
        ResponseEntity<? super PutCommentFavoriteResponseDto> response = commentService.putCommentFavorite(commentNumber, email);
        return response;
    }
    
}
