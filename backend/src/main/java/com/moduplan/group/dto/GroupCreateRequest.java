package com.moduplan.group.dto;

import com.moduplan.group.entity.GroupCategory;
import jakarta.validation.constraints.*;

public record GroupCreateRequest(

        @NotBlank(message = "모임명은 필수입니다.")
        @Size(max = 100, message = "모임명은 100자 이하로 입력해주세요.")
        String name,

        @NotBlank(message = "모임 설명은 필수입니다.")
        String description,

        @NotNull(message = "카테고리는 필수입니다.")
        GroupCategory category,

        @NotNull(message = "최대 인원은 필수입니다.")
        @Min(value = 2, message = "최대 인원은 2명 이상이어야 합니다.")
        @Max(value = 100, message = "최대 인원은 100명 이하로 설정해주세요.")
        Integer maxMembers,

        @NotBlank(message = "지역은 필수입니다.")
        @Size(max = 100, message = "지역은 100자 이하로 입력해주세요.")
        String region,

        @NotNull(message = "공개 여부는 필수입니다.")
        Boolean isPublic
) {
}