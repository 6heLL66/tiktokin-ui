/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TokenCreateRequestDto } from '../models/TokenCreateRequestDto';
import type { TokenDto } from '../models/TokenDto';
import type { TokenRetrieveDto } from '../models/TokenRetrieveDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TokenService {
    /**
     * Token List
     * @returns TokenDto Successful Response
     * @throws ApiError
     */
    public static tokenListTokensGet(): CancelablePromise<Array<TokenDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tokens',
        });
    }
    /**
     * Token Create
     * @param requestBody
     * @returns TokenDto Successful Response
     * @throws ApiError
     */
    public static tokenCreateTokensPost(
        requestBody: TokenCreateRequestDto,
    ): CancelablePromise<TokenDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tokens',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Token Retrieve
     * @param tokenId
     * @param fromDatetime
     * @param toDatetime
     * @param interval
     * @returns TokenRetrieveDto Successful Response
     * @throws ApiError
     */
    public static tokenRetrieveTokensTokenIdGet(
        tokenId: number,
        fromDatetime: string,
        toDatetime: string,
        interval: number,
    ): CancelablePromise<TokenRetrieveDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tokens/{token_id}',
            path: {
                'token_id': tokenId,
            },
            query: {
                'from_datetime': fromDatetime,
                'to_datetime': toDatetime,
                'interval': interval,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
