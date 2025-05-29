package com.thadus.board_back.dto.object;

import java.util.ArrayList;
import java.util.List;

import com.thadus.board_back.repository.resultSet.GetCommentListResultSet;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CommentListItem {
    private int commentNumber;
    private String nickname;
    private String profileImage;
    private String writeDatetime;
    private String content;
    private String userEmail;
    private int favoriteCount;

    public CommentListItem(GetCommentListResultSet resultSet) {
        this.commentNumber = resultSet.getCommentNumber();
        this.nickname = resultSet.getNickname();
        this.profileImage = resultSet.getProfileImage();
        this.writeDatetime = resultSet.getWriteDatetime();
        this.content = resultSet.getContent();
        this.userEmail = resultSet.getUserEmail();
        this.favoriteCount = resultSet.getFavoriteCount();
    }

    public static List<CommentListItem> copyList(List<GetCommentListResultSet> resultSets) {
        List<CommentListItem> list = new ArrayList<>();
        for (GetCommentListResultSet resultSet: resultSets) {
            CommentListItem commentListItem = new CommentListItem(resultSet);
            list.add(commentListItem);
        }
        return list;
    }
}
