"use client"

import { useState } from "react"
import Image from "next/image"
import { AiOutlineMenu } from "react-icons/ai"
import { MdOutlineAccountCircle } from "react-icons/md"
import { anchor } from "@/app/utils/css"
import Link from "next/link"
import LoginModal from "../builders/LoginModal"
import RegisterModal from "../builders/RegisterModal"

const Header = () => {
	const [loginModal, setLoginModal] = useState(false)
	const [registerModal, setRegisterModal] = useState(false)

	const toggleLoginModal = () => setLoginModal(!loginModal)
	const toggleRegisterModal = () => setRegisterModal(!registerModal)

	return (
		<div className="flex bg-p-black h-20 items-center">
			<div
				className="
                    w-10/12
                    m-auto
                    flex
                    flex-row-reverse
                    justify-between
                    items-center
                ">
				{/* Hamburger Menu */}
				<AiOutlineMenu
					className="
                            block
                            lg:hidden
                            text-p-white
                    "
					size={24}
				/>

				{/* Company Logo */}
				<Link href={"/"} className="hover:cursor-pointer">
					<Image
						src={"/main-logo.png"}
						alt="Parsian Logo"
						width={80}
						height={80}
						className="rounded-xl"
					/>
				</Link>

				{/* Navbar Items */}
				<div
					className="
                        hidden
                        lg:flex
                        flex-row
                        gap-20
                    ">
					<Link
						href={"/about-us"}
						className={anchor().styles + " text-p-white"}>
						درباره ما
					</Link>
					<Link
						href={"/contact-us"}
						className={anchor().styles + " text-p-white"}>
						تماس با ما
					</Link>
					<Link href={"#"} className={anchor().styles + " text-p-white"}>
						وبلاگ
					</Link>
					<Link href={"/faq"} className={anchor().styles + " text-p-white"}>
						سوالات متداول
					</Link>
				</div>

				{/* Login/Signup or Profile Pic */}
				<div className="hidden md:flex text-xs lg:text-base gap-2">
					<h5 className={anchor().styles} onClick={toggleLoginModal}>
						ورود
					</h5>
					<h5>|</h5>
					<h5 className={anchor().styles} onClick={toggleRegisterModal}>
						ثبت نام
					</h5>
					<MdOutlineAccountCircle className="text-p-white" size={27} />
				</div>

				<LoginModal isOpen={loginModal} toggleModal={toggleLoginModal} />
				<RegisterModal
					isOpen={registerModal}
					toggleModal={toggleRegisterModal}
				/>
			</div>
		</div>
	)
}

export default Header
