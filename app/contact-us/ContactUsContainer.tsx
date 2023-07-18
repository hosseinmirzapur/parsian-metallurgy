"use client"

import { Button, Card, CardBody, CardHeader } from "@material-tailwind/react"
import Container from "../components/builders/Container"
import {
	AiOutlineInstagram,
	AiOutlineMail,
	AiOutlinePhone,
	AiOutlineTwitter,
	AiOutlineWhatsApp,
} from "react-icons/ai"
import { BsPostage, BsTelegram } from "react-icons/bs"
import { useRouter } from "next/navigation"
import { GoLocation } from "react-icons/go"

interface ContactUsInfo {
	email: string
	phoneNumbers: string[]
	address: string
	instagram: string
	telegram: string
	twitter: string
	whatsapp: string
	postalCode: string
}
enum LinkType {
	Instagram,
	Telegram,
	Twitter,
	WhatsApp,
}

const contactUsInfo: ContactUsInfo = {
	email: "parsian-metal@gmail.com",
	phoneNumbers: ["021-66672701", "021-66672407", "021-66672406"],
	postalCode: "1371873313",
	address:
		"بازار آهن شاد آباد.خیابان 17 شهریور. نرسیده به بلوار طاوس بلوک فروردین. پلاک 6",
	instagram: "https://instagram.com/parsianmetal",
	telegram: "https://t.me/parsianmetal",
	twitter: "https://twitter.com/parsianmetal",
	whatsapp: "https://wa.me/989120389135",
}

const ContactUsContainer = () => {
	// ** Variables
	const router = useRouter()

	// ** Functions
	const handleLink = (link: LinkType) => {
		switch (link) {
			case LinkType.Instagram:
				router.push(contactUsInfo.instagram)
				break
			case LinkType.Telegram:
				router.push(contactUsInfo.telegram)
				break
			case LinkType.Twitter:
				router.push(contactUsInfo.twitter)
				break
			case LinkType.WhatsApp:
				router.push(contactUsInfo.whatsapp)
				break
			default:
				break
		}
	}

	const handleGeo = () => {
		router.push(
			`https://www.google.com/maps/search/?api=1&query=35.66912628969876,51.31956858095572`,
		)
	}

	return (
		<Container className="pt-10 pb-56">
			<div className="flex flex-col items-center justify-center gap-2">
				<p className="text-center text-p-black text-xl font-semibold">
					راه های ارتباطی با ما
				</p>
				<hr className="w-[200px] mx-auto border-t-1 border-t-p-black" />
			</div>

			{/* Social Media */}
			<div
				className="
                    w-11/12
                    mx-auto
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    lg:grid-cols-4
                    gap-14
                    mt-20
                ">
				<Card className="group shadow-red-500">
					<CardHeader
						className="flex
                        justify-center
                        items-center
                        h-[100px]
                        bg-red-400
                    ">
						<p className="text-xl font-bold text-p-white">اینستاگرام</p>
					</CardHeader>
					<CardBody
						className="flex justify-center items-center h-[250px] cursor-pointer"
						onClick={() => handleLink(LinkType.Instagram)}>
						<AiOutlineInstagram
							size={50}
							className="group-hover:text-red-500 ease-in duration-200"
						/>
					</CardBody>
				</Card>
				<Card className="group shadow-blue-500">
					<CardHeader
						className="flex
                        justify-center
                        items-center
                        h-[100px]
                        bg-blue-500
                    ">
						<p className="text-xl text-p-white font-bold">تلگرام</p>
					</CardHeader>
					<CardBody
						className="flex justify-center items-center h-[250px] cursor-pointer"
						onClick={() => handleLink(LinkType.Telegram)}>
						<BsTelegram
							size={50}
							className="group-hover:text-blue-500 ease-in duration-200"
						/>
					</CardBody>
				</Card>
				<Card className="group shadow-green-500">
					<CardHeader
						className="flex
                        justify-center
                        items-center
                        h-[100px]
                        bg-green-500
                    ">
						<p className="text-xl text-p-white font-bold">واتساپ</p>
					</CardHeader>
					<CardBody
						className="flex justify-center items-center h-[250px] cursor-pointer"
						onClick={() => handleLink(LinkType.WhatsApp)}>
						<AiOutlineWhatsApp
							size={50}
							className="group-hover:text-green-500 ease-in duration-200"
						/>
					</CardBody>
				</Card>
				<Card className="group shadow-blue-700">
					<CardHeader
						className="flex
                        justify-center
                        items-center
                        h-[100px]
                        bg-blue-800
                    ">
						<p className="text-xl text-p-white font-bold">توئیتر</p>
					</CardHeader>
					<CardBody
						className="flex justify-center items-center h-[250px] cursor-pointer"
						onClick={() => handleLink(LinkType.Twitter)}>
						<AiOutlineTwitter
							size={50}
							className="group-hover:text-blue-700 ease-in duration-200"
						/>
					</CardBody>
				</Card>
			</div>

			{/* Contact Info */}
			<div
				className="
                    mx-auto
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    lg:flex
                    lg:flex-col
                    gap-14
                    justify-center
                    items-center
                    mt-20
                ">
				<div
					className="flex flex-col gap-2 cursor-pointer rounded-xl shadow-lg p-2 hover:shadow-2xl transition-all"
					onClick={handleGeo}>
					<div className="flex gap-5">
						<GoLocation size={30} />
						{contactUsInfo.address}
					</div>
					<div className="flex justify-center items-center">
						<Button onClick={handleGeo} color="red">
							مسیریابی
						</Button>
					</div>
				</div>
				<div
					className="flex gap-5 cursor-pointer rounded-xl shadow-lg p-5 hover:shadow-2xl transition-all"
					onClick={() =>
						window.open(`mailto:${contactUsInfo.email}`, "_blank")
					}>
					<AiOutlineMail size={30} />
					{contactUsInfo.email}
				</div>
				<div className="flex flex-col md:flex-row gap-5 rounded-xl shadow-lg p-2 hover:shadow-2xl transition-all">
					<div className="flex justify-center items-center">
						<AiOutlinePhone size={30} />
					</div>
					<div className="flex gap-1 md:gap-2 justify-center items-center">
						{contactUsInfo.phoneNumbers.map((pNum, index) => (
							<Button
								color="teal"
								key={index}
								onClick={() => window.open(`tel:${pNum}`, "_blank")}>
								{pNum}
							</Button>
						))}
					</div>
				</div>
				<div className="flex gap-5 rounded-xl shadow-lg p-4 hover:shadow-2xl transition-all">
					<BsPostage size={30} />
					{`کد پستی: ${contactUsInfo.postalCode}`}
				</div>
			</div>
		</Container>
	)
}

export default ContactUsContainer
