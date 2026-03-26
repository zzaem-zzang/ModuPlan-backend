package com.moduplan.group.dto;

import org.springframework.data.domain.Page;

import java.util.List;

public record MyGroupPageResponse(
        List<MyGroupResponse> content,
        int page,
        int size,
        long totalElements
) {
    public static MyGroupPageResponse from(Page<MyGroupResponse> pageResult) {
        return new MyGroupPageResponse(
                pageResult.getContent(),
                pageResult.getNumber(),
                pageResult.getSize(),
                pageResult.getTotalElements()
        );
    }
}
