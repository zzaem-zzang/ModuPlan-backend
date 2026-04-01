package com.moduplan.groupinvitecode.service;

import com.moduplan.groupinvitecode.dto.GroupInviteCodeCreateResponse;
import com.moduplan.groupinvitecode.dto.GroupInviteCodeJoinRequest;
import com.moduplan.groupinvitecode.dto.GroupInviteCodeJoinResponse;

public interface GroupInviteCodeService {

    GroupInviteCodeCreateResponse createInviteCode(Long userId, Long groupId);

    GroupInviteCodeCreateResponse getInviteCode(Long userId, Long groupId);

    GroupInviteCodeCreateResponse regenerateInviteCode(Long userId, Long groupId);

    GroupInviteCodeJoinResponse joinByCode(Long userId, GroupInviteCodeJoinRequest request);
}
