package com.moduplan.group.service;

import com.moduplan.group.dto.GroupCreateRequest;
import com.moduplan.group.dto.GroupCreateResponse;
import com.moduplan.group.dto.GroupDetailResponse;
import com.moduplan.group.dto.GroupListResponse;
import com.moduplan.group.dto.MyGroupPageResponse;
import org.springframework.data.domain.Pageable;

public interface GroupService {

    GroupCreateResponse createGroup(Long userId, GroupCreateRequest request);

    GroupListResponse getGroups(String category, String region, String keyword, int page, int size);

    GroupDetailResponse getGroupDetail(Long groupId);

    MyGroupPageResponse getMyGroup(Long userId, Pageable pageable);

    void deleteGroup(Long userId, Long groupId);
}
