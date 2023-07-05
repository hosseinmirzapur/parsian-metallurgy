"use client"

import { GiTestTubes } from "react-icons/gi"
import { GoGear } from "react-icons/go"
import { SiVitest } from "react-icons/si"
import { GiDiamondHard } from "react-icons/gi"
import Card from "../builders/Card"

const WazGood = () => {
	const wazzGItems = [
		{
			icon: GiTestTubes,
			title: "کوانتومتری",
			description:
				"پارسیان با دسترسی به آخرین استاندارد های معتبر بین المللی، مطابقت ترکیب شیمیایی بدست آمده با استاندارد های موجود را انجام می دهد",
		},
		{
			icon: GoGear,
			title: "کنترل کیفیت",
			description:
				"تمامی قطعاتی که از پارسیان خارج میشوند توسط کارشناسان حرفه ای ما، تست و کنترل شده اند",
		},
		{
			icon: SiVitest,
			title: "آزمون های متالوگرافی",
			description:
				"با استفاده از تجهیزات مورد نیاز، این آزمون به منظور بررسی عیوب سطحی و عمقی بر روی قطعات انجام میگیرد",
		},
		{
			icon: GiDiamondHard,
			title: "سختی سنجی",
			description:
				"سختی سنجی يک روش مرجع برای تعيين صحت عمليات حرارتی اعمالی بر روی قطعات است",
		},
	]
	return (
		<div className="flex flex-col items-center justify-center gap-10 bg-p-black pt-20 pb-20">
			<p className="text-base md:text-xl lg:text-2xl font-bold text-center">
				در پارسیان چه میگذرد؟
			</p>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-8 pt-5">
				{wazzGItems.map((item, index) => (
					<Card
						description={item.description}
						title={item.title}
						icon={item.icon}
						key={index}
					/>
				))}
			</div>
		</div>
	)
}

export default WazGood
