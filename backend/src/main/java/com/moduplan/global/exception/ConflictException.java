package com.moduplan.global.exception;

public class ConflictException extends RuntimeException {

    public ConflictException() {
        super("요청이 현재 리소스 상태와 충돌합니다.");
    }

    public ConflictException(String message) {
        super(message);
    }
}
