import { configureStore } from "@reduxjs/toolkit"
import { useSelector, TypedUseSelectorHook } from "react-redux"
import authReducer from "./features/auth-slice"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import thunk from "redux-thunk"

const persistConfig = {
	key: "root",
	storage,
}

const persistedReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
	reducer: { persistedReducer },
	middleware: [thunk],
})

// These 2 types should be exported because we're dealing with TS
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const persistor = persistStore(store)
