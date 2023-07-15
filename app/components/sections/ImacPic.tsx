"use client"

import Image from "next/image"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Scrollbar, EffectFade, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/autoplay"
import "swiper/css/scrollbar"
import "swiper/css/effect-fade"
import "swiper/css/pagination"
import { useState } from "react"

interface ImageInterface {
	src: string
	alt: string
	width: number
	height: number
	text: string
}

const images: ImageInterface[] = [
	{
		src: "/xrf1.jpg",
		alt: "xrf-image",
		height: 550,
		width: 550,
		text: "آزمون غیر مخرب با دقت بالا",
	},
	{
		src: "/xrf2.jpg",
		alt: "xrf-image",
		height: 550,
		width: 550,
		text: "آنالیز کیفیت فلز از طریق پیدا کردن مواد سازنده آن",
	},
	{
		src: "/lab-2.jpg",
		alt: "lab-2-image",
		height: 550,
		width: 550,
		text: "متن دلخواه",
	},
]

const MobilePics = () => {
	// ** Variables
	const [text, setText] = useState(images[0].text)

	return (
		<div className="pt-20 bg-gray-200 pb-20 border-t-2 border-t-p-black">
			<p className="text-center text-p-black text-2xl font-bold pb-20">
				کیفیت از ما، سود از شما
			</p>

			<div className="flex flex-row justify-center items-center w-10/12 md:w-9/12 mx-auto">
				<Swiper
					modules={[Autoplay, Scrollbar, EffectFade, Pagination]}
					effect="fade"
					autoplay={{
						delay: 3000,
					}}
					grabCursor
					pagination={{
						type: "progressbar",
					}}
					loop
					className="w-11/12 mx-auto"
					scrollbar={{ draggable: true, hide: true }}
					onSlideChange={(e) => setText(images[e.activeIndex]?.text)}>
					{images.map((image, index) => (
						<SwiperSlide key={index} className="flex flex-row py-10">
							<div className="flex items-center justify-center">
								<Image
									src={image.src}
									alt={image.alt}
									width={image.width}
									height={image.height}
									className="absolute top-20 rounded-t-lg"
								/>
							</div>
						</SwiperSlide>
					))}
					<div className="flex items-center justify-center">
						<Image
							src={"/imac-4.png"}
							alt={"imac-image"}
							height={550}
							width={550}
							className="relative"
						/>
					</div>
				</Swiper>
			</div>

			{text !== "" && (
				<div className="flex text-center items-center justify-center pt-20 pb-20">
					<p className="text-p-black text-xl">{text}</p>
				</div>
			)}
		</div>
	)
}

export default MobilePics
