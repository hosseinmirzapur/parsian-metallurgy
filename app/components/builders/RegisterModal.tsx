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

import server, { handleResponse } from "@/app/utils/api/server"
import toast from "react-hot-toast"

// server utils

interface RegisterModalProps {
	isOpen: boolean
	toggleModal: () => void
}

const RegisterModal: React.FC<RegisterModalProps> = ({
	isOpen,
	toggleModal,
}) => {
	// ** Variables
	const [mobile, setMobile] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPass, setConfirmPass] = useState("")
	const [name, setName] = useState("")
	const [errMsg, setErrMsg] = useState("")
	const [loading, setLoading] = useState(false)

	// ** Functions
	const fillMobile = (e: React.ChangeEvent<HTMLInputElement>) =>
		setMobile(e.target.value)
	const fillPassword = (e: React.ChangeEvent<HTMLInputElement>) =>
		setPassword(e.target.value)
	const fillConfirmPass = (e: React.ChangeEvent<HTMLInputElement>) =>
		setConfirmPass(e.target.value)
	const fillName = (e: React.ChangeEvent<HTMLInputElement>) =>
		setName(e.target.value)

	const validateFormData = (): boolean => {
		if (name === "") {
			setErrMsg("وارد کردن نام کامل الزامیست")
			return false
		}
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
		if (confirmPass != password) {
			setErrMsg("رمز عبور و تکرار آن با هم یکسان نیستند")
			return false
		}

		return true
	}

	const handleRegister = async () => {
		let isValid = validateFormData()
		if (!isValid) {
			return
		}
		setLoading(true)
		await server
			.post("/user/register", { mobile, password, name })
			.then(() => {
				toggleModal()
				toast("ثبت نام شما موفقیت آمیز بود، اکنون میتوانید وارد شوید")
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
			setName("")
			setConfirmPass("")
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
				<p className="text-center font-light text-xl">ثبت نام</p>
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
			<DialogBody>
				<div className="w-7/12 mx-auto flex flex-col gap-4">
					<Input
						type="text"
						label="نام کامل"
						className="opacity-75 bg-gray-800 text-white"
						autoComplete="off"
						onChange={fillName}
						dir="rtl"
					/>
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

					<Input
						type="password"
						label="تکرار رمز عبور"
						className="opacity-75 bg-gray-800 text-white"
						autoComplete="off"
						onChange={fillConfirmPass}
						dir="ltr"
					/>
				</div>
				{errMsg !== "" && (
					<p className="text-red-500 text-center font-medium mt-3">{errMsg}</p>
				)}
			</DialogBody>
			<DialogFooter className="flex items-center justify-center gap-10">
				<Button
					color="blue"
					size="md"
					onClick={handleRegister}
					disabled={loading}>
					{loading ? <Spinner className="h-3 w-3" /> : "ثبت نام"}
				</Button>
				<Button color="red" size="md" onClick={toggleModal}>
					لغو
				</Button>
			</DialogFooter>
		</Dialog>
	)
}

export default RegisterModal
