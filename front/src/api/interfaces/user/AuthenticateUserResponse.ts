export default interface AuthenticateUserResponse {
	id: string
	login: string,
	password: string
	accessToken: string,
	successful: boolean
}