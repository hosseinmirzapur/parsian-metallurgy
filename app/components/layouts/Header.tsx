"use client"

import Image from "next/image"
import { AiOutlineMenu } from "react-icons/ai"
import { MdOutlineAccountCircle } from "react-icons/md"

import { anchor } from "@/app/utils/css"
import Link from "next/link"

const Header = () => {
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
					<p className={anchor().styles}>درباره ما</p>
					<p className={anchor().styles}>تماس با ما</p>
					<p className={anchor().styles}>وبلاگ</p>
					<p className={anchor().styles}>سوالات متداول</p>
				</div>

				{/* Login/Signup or Profile Pic */}
				<div className="hidden md:flex text-xs lg:text-base gap-2">
					<h5 className={anchor().styles}>ورود</h5>
					<h5>|</h5>
					<h5 className={anchor().styles}>ثبت نام</h5>
					<MdOutlineAccountCircle className="text-p-white" size={27} />
				</div>
			</div>
		</div>
	)
}

export default Header
