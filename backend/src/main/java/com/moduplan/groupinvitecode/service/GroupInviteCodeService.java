package com.moduplan.groupinvitecode.service;

import com.moduplan.groupinvitecode.dto.GroupInviteCodeCreateResponse;

public interface GroupInviteCodeService {

    GroupInviteCodeCreateResponse createInviteCode(Long userId, Long groupId);
}
