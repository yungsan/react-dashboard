export const ITEM_PER_PAGE = 5;
export const EXPIRES = 1;
export const DEFAULT_IMAGE = 'https://res.cloudinary.com/dfib3gi7p/image/upload/v1709286674/AdminDashboard/user_avatars/vjyyjxgsnzkyzg8wreur.webp';

export const EXAMPLE_USER = {
    "id": 0,
    "full_name": "Username",
    "email": "example@gmail.com",
    "role": "admin",
    "avatar": "https://res.cloudinary.com/dfib3gi7p/image/upload/v1709286674/AdminDashboard/user_avatars/vjyyjxgsnzkyzg8wreur.webp",
    "created_at": "2024-03-01T12:14:14.000000Z",
    "updated_at": "2024-03-01T20:18:46.000000Z"
}

export interface ProductData {
    "name": string,
    "description": string,
    "category": string,
    "price": number,
    "stock": number,
    "promotion": number,
    "author": number,
    "thumbnail": File,
}