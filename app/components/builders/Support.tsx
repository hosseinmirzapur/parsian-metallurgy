"use client"

import Image from "next/image"
import SupportLogo from "../../../public/support.svg"

const Support = () => {
	return (
		<div className="fixed bottom-2 right-2 md:bottom-3 md:right-3 lg:bottom-5 lg:right-5 z-10">
			<Image
				src={SupportLogo}
				alt={"support-logo"}
				className="
					bg-p-orange
					rounded-full
					w-10
					md:w-12
					lg:w-14
					hover:w-16
					hover:shadow-lg
					hover:shadow-p-nescafe
					ease-in-out
					duration-200
					md:cursor-pointer
				"
			/>
		</div>
	)
}

export default Support
