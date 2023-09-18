"use client"

import React, { useEffect, useState } from "react"

// ** Material UI Imports
import {
	Button,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
	Input,
	Spinner,
} from "@material-tailwind/react"

// react icons
import { IoCloseOutline } from "react-icons/io5"

// server utils
import server, { handleResponse } from "@/app/utils/api/server"

// redux stuff
import { login } from "@/redux/features/auth-slice"
import { AppDispatch } from "@/redux/store"
import { useDispatch } from "react-redux"

interface LoginModalProps {
	isOpen: boolean
	toggleModal: () => void
	toggleRegisterModal: () => void
}

const LoginModal: React.FC<LoginModalProps> = ({
	isOpen,
	toggleModal,
	toggleRegisterModal,
}) => {
	// ** Variables
	const [mobile, setMobile] = useState("")
	const [password, setPassword] = useState("")
	const [errMsg, setErrMsg] = useState("")
	const [loading, setLoading] = useState(false)
	const dispatch = useDispatch<AppDispatch>()

	// ** Functions
	const fillMobile = (e: React.ChangeEvent<HTMLInputElement>) =>
		setMobile(e.target.value)
	const fillPassword = (e: React.ChangeEvent<HTMLInputElement>) =>
		setPassword(e.target.value)

	const validateFormData = (): boolean => {
		if (mobile === "") {
			setErrMsg("وارد کردن شماره موبایل الزامیست")
			return false
		}

		let regex = new RegExp("^(\\+98|0)?9\\d{9}$")

		if (!regex.test(mobile)) {
			setErrMsg("شماره موبایل نامعتبر است")
			return false
		}

		if (password == "") {
			setErrMsg("وارد کردن رمز عبور الزامیست")
			return false
		}

		if (password.length < 8) {
			setErrMsg("رمز عبور باید بیشتر از 8 رقم داشته باشد")
			return false
		}
		return true
	}

	const handleLogin = async () => {
		let isValid = validateFormData()
		if (!isValid) {
			return
		}

		setLoading(true)
		await server
			.post("/user/login", { mobile, password })
			.then((res) => {
				const token: string = res.data.token
				dispatch(login(token))
				toggleModal()
			})
			.catch((err) => {
				let errText: string = handleResponse(err, "text")
				setErrMsg(errText)
			})
			.finally(() => setLoading(false))
	}

	useEffect(() => {
		if (!isOpen) {
			setMobile("")
			setPassword("")
			setErrMsg("")
			setLoading(false)
		}
	}, [isOpen])

	return (
		<Dialog
			handler={toggleModal}
			open={isOpen}
			dir="rtl"
			size="sm"
			className="bg-p-black">
			<DialogHeader className="flex items-center justify-center relative">
				<p className="text-center font-light text-xl">ورود</p>
				<IoCloseOutline
					onClick={toggleModal}
					className="
                        absolute
                        text-white
                        top-5
                        right-5
                        cursor-pointer
                        hover:scale-110
                        hover:shadow-lg
                        ease-in
                        duration-200
                    "
					size={30}
				/>
			</DialogHeader>
			<DialogBody className="flex flex-col justify-center items-center">
				<div className="flex flex-col md:w-7/12 mx-auto gap-4">
					<Input
						type="number"
						label="شماره موبایل"
						className="opacity-75 bg-gray-800 text-white"
						autoComplete="off"
						onChange={fillMobile}
						dir="ltr"
					/>

					<Input
						type="password"
						label="رمز عبور"
						className="opacity-75 bg-gray-800 text-white"
						autoComplete="off"
						onChange={fillPassword}
						dir="ltr"
					/>
				</div>
				{errMsg !== "" && (
					<p className="text-red-500 text-center font-medium mt-3">{errMsg}</p>
				)}
			</DialogBody>
			<DialogFooter className="flex items-center justify-center gap-10">
				<Button color="blue" size="md" onClick={handleLogin} disabled={loading}>
					{loading ? <Spinner className="h-3 w-3" /> : "ورود"}
				</Button>
				<Button color="red" size="md" onClick={toggleModal}>
					لغو
				</Button>
			</DialogFooter>
			<div className="flex flex-col items-center gap-2 pb-3">
				<p>حساب کاربری ندارید؟</p>
				<p
					className="text-blue-500 cursor-pointer font-medium"
					onClick={() => {
						toggleModal()
						toggleRegisterModal()
					}}>
					ثبت نام کنید
				</p>
			</div>
		</Dialog>
	)
}

export default LoginModal
