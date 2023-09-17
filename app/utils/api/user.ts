interface User {
	mobile: string
	name: string
	status: string
}

export interface LoginResponse {
	user: User
	token: string
}

export interface RegisterResponse {
	user: User
	token: string
}

export interface InfoResponse {
	user: User
}
