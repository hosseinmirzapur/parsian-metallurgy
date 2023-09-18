import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialState = {
	value: AuthState
}

type AuthState = {
	loggedIn: boolean
	token: string
}

const initialState: InitialState = {
	value: {
		loggedIn: false,
		token: "",
	},
}

export const auth = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: () => {
			localStorage.clear()
			return initialState
		},
		login: (state, action: PayloadAction<string>) => {
			return {
				value: {
					loggedIn: true,
					token: action.payload,
				},
			}
		},
	},
})

export const { login, logout } = auth.actions
export default auth.reducer
