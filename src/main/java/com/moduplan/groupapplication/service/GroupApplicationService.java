package com.moduplan.groupapplication.service;

import com.moduplan.groupapplication.dto.GroupApplicationCreateResponse;

public interface GroupApplicationService {
    GroupApplicationCreateResponse apply(Long userId, Long groupId);
}
