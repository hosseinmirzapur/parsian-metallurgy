"use client"

import { useState } from "react"

import Image from "next/image"
import Link from "next/link"

import { AiOutlineMenu } from "react-icons/ai"
import { FaPeopleRoof } from "react-icons/fa6"
import { MdOutlineAccountCircle, MdOutlineContactPhone } from "react-icons/md"
import { RxDashboard } from "react-icons/rx"
import { BsQuestionDiamond } from "react-icons/bs"
import { CiLogout } from "react-icons/ci"

import LoginModal from "../builders/LoginModal"
import RegisterModal from "../builders/RegisterModal"
import Sidebar, { SidebarItem } from "../builders/Sidebar"

import { useAppSelector } from "@/redux/store"
import { logout } from "@/redux/features/auth-slice"
import { useDispatch } from "react-redux"

import { anchor } from "@/app/utils/css"

import { Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react"

const Header = () => {
	// ** Variables
	const [loginModal, setLoginModal] = useState(false)
	const [registerModal, setRegisterModal] = useState(false)
	const [sidebar, setSidebar] = useState(false)

	// ** Redux variables
	const selector = useAppSelector((state) => state.persistedReducer.value)
	const dispatch = useDispatch()

	// ** Functions
	const toggleLoginModal = () => setLoginModal(!loginModal)
	const toggleRegisterModal = () => setRegisterModal(!registerModal)
	const toggleSidebar = () => setSidebar(!sidebar)

	const commonSidebarItems: SidebarItem[] = [
		{
			text: "سوالات متداول",
			link: "/faq",
			icon: BsQuestionDiamond,
		},
		{
			text: "تماس با ما",
			link: "/contact-us",
			icon: MdOutlineContactPhone,
		},
		{
			text: "درباره ما",
			link: "/about-us",
			icon: FaPeopleRoof,
		},
	]

	const authSidebarItems: SidebarItem[] = [
		{
			text: "داشبورد",
			link: "/dashboard",
			icon: RxDashboard,
		},
		...commonSidebarItems,
		{
			text: "خروج",
			icon: CiLogout,
			onClick: () => dispatch(logout()),
		},
	]

	const normalSidebarItems: SidebarItem[] = [
		{
			text: "ورود یا ثبت نام",
			icon: MdOutlineAccountCircle,
			onClick: () => {
				toggleSidebar()
				toggleLoginModal()
			},
		},
	]

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
				<div className="block lg:hidden">
					<AiOutlineMenu
						size={24}
						className="text-p-white"
						onClick={toggleSidebar}
					/>
					<Sidebar
						open={sidebar}
						items={selector.loggedIn ? authSidebarItems : normalSidebarItems}
						toggleOpen={toggleSidebar}
					/>
				</div>

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
				{!selector.loggedIn && (
					<div className="hidden md:flex text-xs lg:text-base gap-2">
						<h5 className={anchor().styles} onClick={toggleLoginModal}>
							ورود
						</h5>
						<h5>|</h5>
						<h5 className={anchor().styles} onClick={toggleRegisterModal}>
							ثبت نام
						</h5>
						<MdOutlineAccountCircle
							className={"text-p-white " + anchor().styles}
							size={27}
						/>
					</div>
				)}
				{selector.loggedIn && (
					<div className="hidden md:block">
						<Menu placement="bottom">
							<MenuHandler>
								<MdOutlineAccountCircle
									className={"text-p-white " + anchor().styles}
									size={27}
								/>
							</MenuHandler>

							<MenuList dir="rtl">
								<Link href={"/dashboard"}>
									<MenuItem>داشبورد</MenuItem>
								</Link>
								<MenuItem onClick={() => dispatch(logout())}>خروج</MenuItem>
							</MenuList>
						</Menu>
					</div>
				)}

				<LoginModal
					isOpen={loginModal}
					toggleModal={toggleLoginModal}
					toggleRegisterModal={toggleRegisterModal}
				/>
				<RegisterModal
					isOpen={registerModal}
					toggleModal={toggleRegisterModal}
					toggleLoginModal={toggleLoginModal}
				/>
			</div>
		</div>
	)
}

export default Header
