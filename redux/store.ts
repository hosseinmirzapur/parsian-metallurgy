import { configureStore } from "@reduxjs/toolkit"
import { useSelector, TypedUseSelectorHook } from "react-redux"
import authReducer from "./features/auth-slice"

export const store = configureStore({
	reducer: { authReducer },
})

// These 2 types should be exported because we're dealing with TS
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
