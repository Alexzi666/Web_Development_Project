import { StringLiteralLike } from "typescript";

export interface Review{
    author:string;
    rating:number;
    content:string;
    created_at:string;
    url:string;
    avatar_path:string;
}