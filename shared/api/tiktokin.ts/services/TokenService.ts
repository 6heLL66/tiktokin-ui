/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Paginated_TokenWithPriceDto_ } from '../models/Paginated_TokenWithPriceDto_';
import type { TokenRetrieveDto } from '../models/TokenRetrieveDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TokenService {
    /**
     * Token List
     * @param search
     * @param orderBy
     * @param limit Page size limit
     * @param offset Page offset
     * @returns Paginated_TokenWithPriceDto_ Successful Response
     * @throws ApiError
     */
    public static tokenListTokensGet(
        search?: (string | null),
        orderBy?: (string | null),
        limit?: (number | null),
        offset?: number,
    ): CancelablePromise<Paginated_TokenWithPriceDto_> {
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
    /**
     * Users Tokens
     * @param authorization
     * @param search
     * @param orderBy
     * @param limit Page size limit
     * @param offset Page offset
     * @returns Paginated_TokenWithPriceDto_ Successful Response
     * @throws ApiError
     */
    public static usersTokensUsersMeTokensGet(
        authorization: string,
        search?: (string | null),
        orderBy?: (string | null),
        limit?: (number | null),
        offset?: number,
    ): CancelablePromise<Paginated_TokenWithPriceDto_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/me/tokens',
            headers: {
                'authorization': authorization,
            },
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
}
