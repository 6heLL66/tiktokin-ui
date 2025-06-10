/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthTokenDto } from '../models/AuthTokenDto';
import type { RefreshTokenDto } from '../models/RefreshTokenDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * Tiktok Challenge
     * @returns any Successful Response
     * @throws ApiError
     */
    public static tiktokChallengeAuthChallengeGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/challenge',
        });
    }
    /**
     * Refresh Token
     * @param requestBody
     * @returns AuthTokenDto Successful Response
     * @throws ApiError
     */
    public static refreshTokenAuthRefreshPost(
        requestBody: RefreshTokenDto,
    ): CancelablePromise<AuthTokenDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/refresh',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Tiktok Challenge
     * @param code
     * @returns AuthTokenDto Successful Response
     * @throws ApiError
     */
    public static tiktokChallengeAuthCallbackGet(
        code: string,
    ): CancelablePromise<AuthTokenDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/callback',
            query: {
                'code': code,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
