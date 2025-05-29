package com.thadus.board_back.repository.resultSet;

public interface GetCommentListResultSet {
    Integer getCommentNumber();
    String getNickname();
    String getProfileImage();
    String getWriteDatetime();
    String getContent();    
    String getUserEmail();
} 
