export type responseType<T> = {
    loading:    true,
    data:       T
} | {
    loading:    false,
    data:       null
}

export type responsesType<T> = {
    success:    true,
    data:       T,
    error:      null
} | {
    success:    false,
    data:       null,
    error:      string
}