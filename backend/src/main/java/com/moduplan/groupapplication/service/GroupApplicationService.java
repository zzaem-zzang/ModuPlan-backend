package com.moduplan.groupapplication.service;

import com.moduplan.groupapplication.dto.GroupApplicationCreateResponse;
import com.moduplan.groupapplication.dto.GroupApplicationProcessResponse;

public interface GroupApplicationService {
    GroupApplicationCreateResponse apply(Long userId, Long groupId);

    GroupApplicationProcessResponse approve(Long userId, Long groupId, Long applicationId);

    GroupApplicationProcessResponse reject(Long userId, Long groupId, Long applicationId);
}
