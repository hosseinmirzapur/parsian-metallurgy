"use client"

import { GiTrade } from "react-icons/gi"
import { GoGear } from "react-icons/go"
import { BiSupport } from "react-icons/bi"
import { CiReceipt } from "react-icons/ci"
import Card from "../builders/Card"

const WazGood = () => {
	const wazzGItems = [
		{
			icon: GiTrade,
			title: "خرید و فروش",
			description:
				"امکان معامله هم به صورت حضوری هم به صورت ثبت سفارش آنلاین برای شما موجود است",
		},
		{
			icon: GoGear,
			title: "کنترل کیفیت",
			description:
				"کالا به دقت فراوان توسط کارشناسان کنترل کیفیت بازرسی شده و در صورت تایید، مجوز بارگیری صادر می شود",
		},
		{
			icon: BiSupport,
			title: "پشتیبانی 24 ساعته",
			description:
				"در 24 ساعت روز و در 7 روز هفته پشتیبانی از کلیه کالا های خود را ارائه میدهیم",
		},
		{
			icon: CiReceipt,
			title: "صدور فاکتور رسمی",
			description:
				"پس ار مشخص شدن ارزش دقیق خرید شما، تسویه نهایی صورت گرفته و فاکتور رسمی خرید شما چاپ و ارسال می گردد",
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
