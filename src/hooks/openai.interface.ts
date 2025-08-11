export interface ChatCompletionResponse {
    index: number;
    message: massage;
    logprobs: number;
    finish_reason: string;
}

export interface massage {
    role: "assistant" | "system" | "user",
    content: string,
    refusal: null,
    annotations: []
}
