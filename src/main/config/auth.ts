if (!process.env.GOOGLE_OAUTH_CLIENT_ID) {
    throw new Error('Undefined google oauth client id');
}

if (!process.env.GOOGLE_OAUTH_CLIENT_SECRET) {
    throw new Error('Undefined google oauth client secret');
}

interface AuthConfig {
    client_id: string;
    client_secret: string;
    scopes: string[];
}

export const auth: AuthConfig = {
    client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
    client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    scopes: [
        'profile',
        'https://www.googleapis.com/auth/photoslibrary.readonly'
    ]
};
