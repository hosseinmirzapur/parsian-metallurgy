"use client"

import { LuQuote } from "react-icons/lu"
import WebsiteSlider, { WebsiteSliderProps } from "../builders/WebsiteSlider"

// Everything related to swiper
import { Swiper, SwiperSlide } from "swiper/react"
import { Scrollbar } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/scrollbar"

const testimonialItems: WebsiteSliderProps[] = [
	{
		sentence:
			"پارسیان باعث میشود قبل از انجام معاملات بزرگ از کیفیت محصول مطمئن باشم",
		first: true,
		fullname: "علی نوروزی",
		role: "مشتری",
	},
	{
		sentence:
			"با یاری خداوند و تلاش بچه های زحمتکش مجموعه، سعی میکنیم هیچ ارباب رجوعی ناراضی از پارسیان خارج نشود",
		fullname: "مهندس محمدرضا همافر",
		role: "مدیر مجموعه",
	},
	{
		sentence:
			"فعالیت در مجموعه پارسیان و در کنار مهندس همافر باعث افتخار بنده و کل تیم است",
		fullname: "اصغر مرادی",
		last: true,
		role: "مهندس بخش کنترل کیفیت",
	},
]

const Testimonials = () => {
	return (
		<div className="flex flex-col gap-16 h-[600px] pt-20 pb-20 relative">
			<div className="flex justify-center items-center">
				<LuQuote size={80} className="text-p-white" />
			</div>
			<div>
				<Swiper
					modules={[Scrollbar]}
					slidesPerView={1}
					navigation
					scrollbar={{ draggable: true, hide: true }}>
					{testimonialItems.map((item, index) => (
						<SwiperSlide key={index}>
							<WebsiteSlider
								first={item.first}
								fullname={item.fullname}
								last={item.last}
								role={item.role}
								sentence={item.sentence}
								key={index}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	)
}

export default Testimonials
