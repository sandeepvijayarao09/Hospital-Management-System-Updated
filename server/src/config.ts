// Central place for required configuration. Anything security-sensitive has no
// fallback: the server refuses to start instead of running with a guessable value.
export const getJwtSecret = (): string => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not set. Copy server/.env.example to server/.env and set it.');
    }
    return secret;
};
