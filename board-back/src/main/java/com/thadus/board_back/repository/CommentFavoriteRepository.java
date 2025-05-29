package com.thadus.board_back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.thadus.board_back.entity.CommentFavoriteEntity;
import com.thadus.board_back.entity.primaryKey.CommentFavoritePk;

import jakarta.transaction.Transactional;

@Repository
public interface CommentFavoriteRepository extends JpaRepository<CommentFavoriteEntity, CommentFavoritePk> {

    CommentFavoriteEntity findByCommentNumberAndUserEmail(Integer commentNumber, String userEmail);

    @Transactional
    void deleteByCommentNumber(Integer CommentNumber);
}
