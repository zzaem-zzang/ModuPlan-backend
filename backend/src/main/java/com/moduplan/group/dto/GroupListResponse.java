package com.moduplan.group.dto;

import org.springframework.data.domain.Page;

import java.util.List;

public record GroupListResponse(
        List<GroupListItemResponse> content,
        int page,
        int size,
        long totalElements
) {
    public static GroupListResponse from(Page<GroupListItemResponse> pageResult) {
        return new GroupListResponse(
                pageResult.getContent(),
                pageResult.getNumber(),
                pageResult.getSize(),
                pageResult.getTotalElements()
        );
    }
}