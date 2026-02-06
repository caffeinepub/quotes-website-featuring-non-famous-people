import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Quote {
    text: string;
    author: string;
}
export interface backendInterface {
    addQuote(author: string, text: string): Promise<void>;
    getAuthorQuotes(author: string): Promise<Array<Quote>>;
    getQuotesSortedByAuthor(): Promise<Array<Quote>>;
}
