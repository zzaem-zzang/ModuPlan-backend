package com.moduplan.group.dto;

import java.util.List;

public record GroupListResponse(
        List<GroupListItemResponse> content,
        int page,
        int size,
        long totalElements
) {
}
