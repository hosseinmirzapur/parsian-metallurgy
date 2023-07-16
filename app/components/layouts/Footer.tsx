"use client"

import { IconType } from "react-icons/lib"
import { BsInstagram, BsTelegram, BsWhatsapp, BsTwitter } from "react-icons/bs"
import Link from "next/link"
import { anchor } from "@/app/utils/css"
import Image from "next/image"

// ** Interfaces
interface FooterItem {
	name: string
	url: string
}

interface SocialMediaItem {
	icon: IconType
	url: string
}

interface ServiceItem {
	name: string
	url: string
}

// ** Data
// const fastAccessItems: FooterItem[] = [
// 	{ name: "سوالات متداول", url: "/faq" },
// 	{ name: "وبلاگ", url: "/blog" },
// 	{ name: "تماس با ما", url: "/contact-us" },
// 	{ name: "درباره ما", url: "/about-us" },
// ]
const fastAccessItems: FooterItem[] = [
	{ name: "سوالات متداول", url: "#" },
	{ name: "وبلاگ", url: "#" },
	{ name: "تماس با ما", url: "#" },
	{ name: "درباره ما", url: "#" },
]

const socialMediaItems: SocialMediaItem[] = [
	{ icon: BsInstagram, url: "#" },
	{ icon: BsTelegram, url: "#" },
	{ icon: BsWhatsapp, url: "#" },
	{ icon: BsTwitter, url: "#" },
]

// const serviceItems: ServiceItem[] = [
// 	{ name: "خدمات آزمایشگاهی", url: "/lab" },
// 	{ name: "دوره های آموزشی", url: "/study" },
// 	{ name: "مشاوره و انتخاب مواد", url: "/consult" },
// 	{ name: "بازرسی کالا", url: "/examination" },
// ]
const serviceItems: ServiceItem[] = [
	{ name: "خدمات آزمایشگاهی", url: "#" },
	{ name: "دوره های آموزشی", url: "#" },
	{ name: "مشاوره و انتخاب مواد", url: "#" },
	{ name: "بازرسی کالا", url: "#" },
]

const Footer = () => {
	return (
		<div className="bottom-0 w-full bg-p-black h-auto text-p-white" dir="rtl">
			<div className="w-10/12 md:w-9/12 lg:w-8/12 mx-auto pt-10 flex justify-between">
				<div className="flex flex-col gap-4">
					<p className="font-bold border-b-2 border-p-white pb-2">
						دسترسی سریع
					</p>
					<div className="flex flex-col gap-4">
						{fastAccessItems.map((item, index) => (
							<Link
								href={item.url}
								key={index}
								className={`${anchor().styles}`}>
								{item.name}
							</Link>
						))}
					</div>
				</div>
				<div className="hidden md:block">
					<Image
						src={"/main-logo.png"}
						width={200}
						height={200}
						alt="parsian-logo"
						className="rounded-full hover:rotate-[360deg] ease-in duration-300"
					/>
				</div>
				<div className="flex flex-col gap-4" dir="ltr">
					<p className="font-bold border-b-2 border-p-white pb-2">
						خدمات پارسیان
					</p>
					<div className="flex flex-col gap-4">
						{serviceItems.map((item, index) => (
							<Link
								href={item.url}
								key={index}
								className={`${anchor().styles}`}>
								{item.name}
							</Link>
						))}
					</div>
				</div>
			</div>
			<div className="w-8/12 mx-auto pt-20 pb-10 flex flex-row gap-10 items-center justify-center">
				{socialMediaItems.map((Social, index) => (
					<Link href={Social.url} key={index}>
						<Social.icon
							className={`${anchor().styles} text-p-white`}
							size={25}
						/>
					</Link>
				))}
			</div>
		</div>
	)
}

export default Footer
