// DTO for creating an article
export interface CreateArticleDto {
    title: string;
    description: string;
}
// DTO for updating an article
export interface IUpdateArticleDto {
    title?: string;
    description?: string;
}
// DTO for creating an account
export interface IRegisterDto {
    username: string;
    email: string;
    password: string;
}
// DTO for login
export interface ILoginDto {
    email: string;
    password: string;
}
// DTO for update user
export interface updateUserDto {
    username?: string;
    email?: string;
    password?: string;
}
// DTO for create comment
export interface ICreateCommentDto {
    text: string;
    articleId: number;
}
// DTO for create comment
export interface IUpdateCommentDto {
    text: string;
}
