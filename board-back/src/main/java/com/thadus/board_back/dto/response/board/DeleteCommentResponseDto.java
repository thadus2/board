package com.thadus.board_back.dto.response.board;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.thadus.board_back.common.ResponseCode;
import com.thadus.board_back.common.ResponseMessage;
import com.thadus.board_back.dto.response.ResponseDto;

import lombok.Getter;

@Getter
public class DeleteCommentResponseDto extends ResponseDto {

    private DeleteCommentResponseDto() {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

    public static ResponseEntity<DeleteCommentResponseDto> success() {
        DeleteCommentResponseDto result = new DeleteCommentResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    public static ResponseEntity<ResponseDto> noExistComment() {
        ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_COMMENT, ResponseMessage.NOT_EXISTED_COMMENT);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

    public static ResponseEntity<ResponseDto> noPermission() {
        ResponseDto result = new ResponseDto(ResponseCode.NO_PERMISSION, ResponseMessage.NO_PERMISSION);
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(result);
    }

    public static ResponseEntity<ResponseDto> noExistUser() { 
        ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_USER, ResponseMessage.NOT_EXISTED_USER);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
    }
}