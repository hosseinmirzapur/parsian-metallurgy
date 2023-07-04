"use client"

import Image from "next/image"
import Typewriter from "typewriter-effect"
import HeroImage from "../../../public/hero.jpg"
import { motion } from "framer-motion"

const Hero = () => {
	return (
		<>
			<div className="bg-p-black relative ">
				<div className="absolute text-center top-[50%] lg:top-[33%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
					<motion.h1
						className="text-[15px] md:text-[30px] lg:text-[72px] font-extrabold"
						initial={{
							opacity: 0,
						}}
						whileInView={{
							opacity: 1,
						}}>
						مرکز متالورژی پارسیان
					</motion.h1>

					<div
						className="text-center text-p-white text-sm lg:text-xl mt-10 lg:mt-20 lg:font-bold"
						dir="rtl">
						<Typewriter
							options={{
								strings: [
									"تجربه ای متفاوت در بزرگ ترین بازار آنلاین آهن در ایران",
									"اعتماد شما، دلیل انگیزه و اعتبار ماست",
								],
								autoStart: true,
								loop: true,
								delay: 75,
							}}
						/>
					</div>
				</div>
				<Image src={HeroImage} alt="hero" className="h-[80%]" />
			</div>
		</>
	)
}

export default Hero
