package com.moduplan.group.controller;

import com.moduplan.global.exception.UnauthorizedException;
import com.moduplan.global.response.ApiResponse;
import com.moduplan.group.dto.GroupCreateRequest;
import com.moduplan.group.dto.GroupCreateResponse;
import com.moduplan.group.repository.GroupRepository;
import com.moduplan.group.service.GroupService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/groups")
public class GroupController {

    private final GroupRepository groupRepository;
    private final GroupService groupService;

    @Operation(summary = "모임 생성")
    @PostMapping
    public ResponseEntity<ApiResponse<GroupCreateResponse>> createGroup(
            Authentication authentication,
            @Valid @RequestBody GroupCreateRequest request
            ){
        if (authentication == null || authentication.getPrincipal() == null) {
            throw new UnauthorizedException("인증되지 않은 사용자입니다.");
        }

        Long userId = (Long) authentication.getPrincipal();

        GroupCreateResponse response = groupService.createGroup(userId, request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(201,"모임 생성이 완료되었습니다.", response));
    }
}
