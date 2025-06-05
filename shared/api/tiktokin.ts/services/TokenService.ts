/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Paginated_TokenDto_ } from '../models/Paginated_TokenDto_';
import type { TokenCreateRequestDto } from '../models/TokenCreateRequestDto';
import type { TokenDto } from '../models/TokenDto';
import type { TokenRetrieveDto } from '../models/TokenRetrieveDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TokenService {
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
     * Token List
     * @param search
     * @param orderBy
     * @param limit Page size limit
     * @param offset Page offset
     * @returns Paginated_TokenDto_ Successful Response
     * @throws ApiError
     */
    public static tokenListTokensGet(
        search?: (string | null),
        orderBy?: (string | null),
        limit?: (number | null),
        offset?: number,
    ): CancelablePromise<Paginated_TokenDto_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tokens',
            query: {
                'search': search,
                'order_by': orderBy,
                'limit': limit,
                'offset': offset,
            },
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
