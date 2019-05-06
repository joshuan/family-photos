export const auth = {
    client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
    client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    scopes: [
        'profile',
        'https://www.googleapis.com/auth/photoslibrary.readonly'
    ]
};
