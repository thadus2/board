package com.thadus.board_back.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.thadus.board_back.dto.response.ResponseDto;
import com.thadus.board_back.dto.response.board.PutCommentFavoriteResponseDto;
import com.thadus.board_back.dto.response.board.PutFavoriteResponseDto;
import com.thadus.board_back.entity.CommentEntity;
import com.thadus.board_back.entity.CommentFavoriteEntity;
import com.thadus.board_back.repository.CommentFavoriteRepository;
import com.thadus.board_back.repository.CommentRepository;
import com.thadus.board_back.repository.UserRepository;
import com.thadus.board_back.service.CommentService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentServiceImplement implements CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final CommentFavoriteRepository commentFavoriteRepository;

    @Override
    public ResponseEntity<? super PutCommentFavoriteResponseDto> putCommentFavorite(Integer commentNumber, String email) {

        try {

            boolean existedUser = userRepository.existsByEmail(email);
            if (!existedUser) return PutFavoriteResponseDto.noExistUser();

            CommentEntity commentEntity = commentRepository.findByCommentNumber(commentNumber);
            if (commentEntity == null) return PutCommentFavoriteResponseDto.noExistComment();

            CommentFavoriteEntity commentFavoriteEntity = commentFavoriteRepository.findByCommentNumberAndUserEmail(commentNumber, email);
            if (commentFavoriteEntity == null) {
                commentFavoriteEntity = new CommentFavoriteEntity(email, commentNumber);
                commentFavoriteRepository.save(commentFavoriteEntity);
                commentEntity.increaseFavoriteCount();
            }
            else {
                commentFavoriteRepository.delete(commentFavoriteEntity);
                commentEntity.decreaseFavoriteCount();
            }

            commentRepository.save(commentEntity);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PutCommentFavoriteResponseDto.success();

    }

}
