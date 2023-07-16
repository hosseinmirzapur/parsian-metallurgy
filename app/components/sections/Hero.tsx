"use client"

import Image from "next/image"
import Typewriter from "typewriter-effect"
// import HeroImage from "../../../public/ultra-nice.jpg"
import HeroImage from "../../../public/ultra-nice.jpg"
import { motion } from "framer-motion"

const Hero = () => {
	return (
		<div className="bg-p-black relative">
			<div
				className="
					absolute
					text-center
					top-[50%]
					lg:top-[50%]
					left-[50%]
					translate-x-[-50%]
					translate-y-[-50%]
					w-full
				">
				<motion.h1
					className="text-[20px] md:text-[30px] lg:text-[72px] font-extrabold"
					initial={{
						opacity: 0,
					}}
					whileInView={{
						opacity: 1,
						animationDuration: "1s",
					}}>
					مرکز متالورژی پارسیان
				</motion.h1>

				<div
					className="
						text-center
						text-p-white
						text-sm
						lg:text-xl
						mt-10
						lg:mt-20
						lg:font-bold
						w-9/12
						mx-auto
					"
					dir="rtl">
					<Typewriter
						options={{
							strings: [
								"پارسیان، بزرگ ترین مرکز کنترل کیفیت قطعات فلزی در ایران",
								"اعتماد شما، دلیل انگیزه و اعتبار ماست",
								"به مدیریت مهندس محمدرضا همافر، مدیر تولید کارخانه فولادریزان",
							],
							autoStart: true,
							loop: true,
							delay: 60,
							deleteSpeed: 10,
						}}
					/>
				</div>
			</div>
			<div className="flex items-center justify-center w-[96%] mx-auto pt-5">
				<Image src={HeroImage} alt="hero" className="opacity-30 rounded-lg" />
			</div>
		</div>
	)
}

export default Hero
