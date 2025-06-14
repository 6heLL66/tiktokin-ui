/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TokenSnapshotDto } from './TokenSnapshotDto';
export type TokenRetrieveDto = {
    id: number;
    name: string;
    symbol: string;
    uri: string;
    address: string;
    video_url?: (string | null);
    user_id?: (string | null);
    user_name?: (string | null);
    user_url?: (string | null);
    is_completed: boolean;
    snapshots: Array<TokenSnapshotDto>;
};

