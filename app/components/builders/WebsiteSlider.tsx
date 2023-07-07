"use client"

import NavigationButton from "./NavigationButton"
import { useSwiper } from "swiper/react"

export interface WebsiteSliderProps {
	sentence: string
	fullname: string
	role: string
	first?: boolean
	last?: boolean
}

const WebsiteSlider: React.FC<WebsiteSliderProps> = ({
	fullname,
	role,
	sentence,
	first = false,
	last = false,
}) => {
	// ** Functions
	const swiper = useSwiper()

	return (
		<div className="flex flex-col justify-center items-center text-p-white gap-10 pt-[-10px] pb-20">
			<div className="flex flex-row gap-5 justify-between w-11/12 md:w-10/12 lg:w-9/12 mx-auto">
				<NavigationButton
					disabled={first}
					type="previous"
					onNext={() => swiper.slideNext()}
					onPrevious={() => swiper.slidePrev()}
				/>
				<div className="flex flex-col justify-center items-center">
					<h1 className="text-center text-lg">{sentence}</h1>
				</div>
				<NavigationButton
					disabled={last}
					type="next"
					onNext={() => swiper.slideNext()}
					onPrevious={() => swiper.slidePrev()}
				/>
			</div>
			<hr className="text-white h-1 w-4/12 mx-auto" />
			<div className="flex flex-col items-center justify-center gap-6">
				<h1 className="font-bold">{fullname}</h1>
				<h3 className="italic font-medium">{role}</h3>
			</div>
		</div>
	)
}

export default WebsiteSlider
