CREATE TABLE comment_favorite
(
  user_email VARCHAR(50) NOT NULL COMMENT '사용자 이메일',
  comment_number         INT NOT NULL COMMENT '댓글 번호',
  PRIMARY KEY (user_email, comment_number)
) COMMENT '댓글 좋아요 테이블';

ALTER TABLE comment_favorite
  ADD CONSTRAINT FK_user_TO_comment_favorite
  FOREIGN KEY (user_email)
  REFERENCES user(email);

ALTER TABLE comment_favorite
  DROP FOREIGN KEY FK_comment_TO_comment_favorite,
  ADD CONSTRAINT FK_comment_TO_comment_favorite
  FOREIGN KEY (comment_number)
  REFERENCES comment(comment_number);