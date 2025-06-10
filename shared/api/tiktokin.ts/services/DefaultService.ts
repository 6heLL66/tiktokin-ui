/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * Tiktok Verification File
     * @returns any Successful Response
     * @throws ApiError
     */
    public static tiktokVerificationFileTiktokdGxOugCgAzWqdWl3KnptcQuEDd5Gkgs2TxtGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tiktokdGxOUGCgAzWqdWL3KnptcQuEDd5gkgs2.txt',
        });
    }
}
