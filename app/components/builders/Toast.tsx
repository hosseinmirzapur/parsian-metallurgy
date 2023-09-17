"use client"

import { Toaster } from "react-hot-toast"

const Toast = () => {
	return (
		<Toaster
			position="top-right"
			reverseOrder={false}
			toastOptions={{
				style: {
					zIndex: 9999,
				},
			}}
		/>
	)
}

export default Toast
