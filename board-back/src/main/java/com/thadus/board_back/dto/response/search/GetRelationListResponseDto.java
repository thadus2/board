package com.thadus.board_back.dto.response.search;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.thadus.board_back.common.ResponseCode;
import com.thadus.board_back.common.ResponseMessage;
import com.thadus.board_back.dto.response.ResponseDto;

import lombok.Getter;

@Getter
public class GetRelationListResponseDto extends ResponseDto {

    private List<String> relativeWordList;

    private GetRelationListResponseDto() {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);

        List<String> relativeWordList = new ArrayList<>();
        
        this.relativeWordList = relativeWordList;
    }

    public static ResponseEntity<GetRelationListResponseDto> success(){
        GetRelationListResponseDto result = new GetRelationListResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
    
}
