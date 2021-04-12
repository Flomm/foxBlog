import IError from './IError';

export const serverErr: IError = { message: 'There was a problem with the server. Please try again later.' };
export const loginErr: IError = { message: 'Invalid login or password.' };
export const searchErr: IError = { message: 'Post does not exist.' };
export const noPostErr: IError = { message: "There aren't any posts yet." };
export const noUserErr: IError = { message: 'The user does not exist.' };
export const authorErr: IError = { message: 'This post belongs to another user.' };
export const validErr: IError = { message: 'Content or title is missing or too short.' };
