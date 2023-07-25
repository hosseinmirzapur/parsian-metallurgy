"use client"

import {
	Button,
	Checkbox,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
	Input,
} from "@material-tailwind/react"
import { IoCloseOutline } from "react-icons/io5"

interface LoginModalProps {
	isOpen: boolean
	toggleModal: () => void
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, toggleModal }) => {
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
			<DialogBody>
				<div className="w-7/12 mx-auto flex flex-col gap-4">
					<Input
						type="text"
						label="شماره موبایل"
						className="opacity-75 border-none bg-gray-800 text-white"
						autoComplete="off"
					/>
					<Input
						type="password"
						label="رمز عبور"
						className="opacity-75 border-none bg-gray-800 text-white"
						autoComplete="off"
					/>
					<div className="flex items-center justify-start gap-2">
						<Checkbox defaultChecked />
						<h2 className="text-sm">مرا بخاطر بسپار</h2>
					</div>
				</div>
			</DialogBody>
			<DialogFooter className="flex items-center justify-center gap-10">
				<Button color="blue" size="sm">
					ورود
				</Button>
				<Button color="red" size="sm">
					لغو
				</Button>
			</DialogFooter>
		</Dialog>
	)
}

export default LoginModal
