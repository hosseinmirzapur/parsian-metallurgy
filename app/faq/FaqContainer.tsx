"use client"

import {
	Accordion,
	AccordionHeader,
	AccordionBody,
} from "@material-tailwind/react"
import Container from "../components/builders/Container"
import { useState } from "react"
import { anchor } from "../utils/css"
import Image from "next/image"
import FaqImage from "../../public/faq.svg"

const faqItems: AccordionItem[] = [
	{
		question: "متالورژی چیست؟",
		answer:
			"شاخه‌ای از علم مواد است که به شناخت و استخراج فلزات و فناوری‌های کار با فلزات می‌پردازد. این علم تفکیک مواد معدنی از سنگ معدن آن‌ها، ذوب، تصفیه و تولید شمش، بهبود خواص و تهیهٔ آلیاژها و فن کار بر روی فلزات و شکل‌دهی آن‌ها را دربر می‌گیرد",
	},
	{
		question: "تعرفه خدمات مختلف در پارسیان به چه صورت است؟",
		answer:
			"هر فعالیتی که در پارسیان صورت می پذیرد، زمان و ابزار و نیروی حرفه ای خاص خود را دارد و با توجه به نوع درخواست شما قیمت در بازه مشخصی تغییر میکند",
	},
	{
		question: "سوال دلخواه",
		answer: "جواب دلخواه",
	},
]

const FaqContainer = () => {
	// ** Variables
	const [open, setOpen] = useState(-1)

	// ** Functions
	const handleOpen = (index: number) => {
		setOpen(open === index ? -1 : index)
	}

	return (
		<Container className="flex flex-col gap-14 pt-10 pb-20">
			<h1 className="text-p-black text-center text-2xl">سوالات متداول</h1>

			<div className="flex flex-col lg:flex-row gap-5 justify-between">
				<Container className="from-gray-800 to-black bg-gradient-to-t rounded-xl">
					{faqItems.map((faq, index) => (
						<Accordion
							open={open === index}
							id={index.toString()}
							className="flex flex-col"
							key={index}
							dir="rtl">
							<AccordionHeader
								dir="rtl"
								onClick={() => handleOpen(index)}
								className={`
                                text-p-white
                                text-[12px]
                                md:text-[13px]
                                lg:text-[16px]
                                ${anchor().styles}
                                py-4
                                px-1
                            `}>
								{faq.question}
							</AccordionHeader>
							<AccordionBody>
								<h3 className="text-p-white text-base p-2 font-sans">
									{faq.answer}
								</h3>
							</AccordionBody>
						</Accordion>
					))}
				</Container>
				<Image alt="faq-image" src={FaqImage} />
			</div>
		</Container>
	)
}

export default FaqContainer

// ** Types
export interface AccordionItem {
	question: string
	answer: string
}
