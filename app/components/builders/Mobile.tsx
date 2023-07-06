"use client"

import Image from "next/image"
import { useState } from "react"
import Typewriter from "typewriter-effect"
import { motion } from "framer-motion"

interface MobileProps {
	image: string
	description: string
	more?: string[]
	imageCustomClass?: string
}

const Mobile: React.FC<MobileProps> = ({
	image,
	description,
	imageCustomClass = "",
	more = [],
}) => {
	// ** Variables
	const [clicked, setClicked] = useState(true)

	// ** Variable Functions
	const toggleClick = () => setClicked(!clicked)

	return (
		<div
			onClick={toggleClick}
			className="
                w-[300px]
                h-[500px]
                rounded-3xl
                flex
                relative
				md:cursor-pointer
            ">
			<Image
				draggable={false}
				src={"/iphone.svg"}
				width={"300"}
				height={"500"}
				alt="mobile"
				className="
                    relative
                    z-0
                    object-contain
				"
			/>

			{clicked ? (
				<motion.div
					className="
						absolute
						top-[50%]
						left-[50%]
						translate-x-[-50%]
						translate-y-[-50%]
						flex
						justify-center
						text-center
						ease-in-out
						duration-200
					"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}>
					<Image
						draggable={false}
						src={"/main-logo.png"}
						width={200}
						height={600}
						alt="main-logo"
					/>
				</motion.div>
			) : (
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
					<Image
						draggable={false}
						src={image}
						width={200}
						height={600}
						alt="mobile-picture"
						className={`
							absolute
							top-[40%]
							left-[50%]
							translate-x-[-50%]
							translate-y-[-50%]
							z-10
							rounded-lg
							${imageCustomClass}
                		`}
					/>

					<div
						className="
							absolute
							top-[65%]
							left-[50%]
							translate-x-[-50%]
							translate-y-[-50%]
							z-10
							text-p-white
							text-sm
						">
						<Typewriter
							options={{
								strings: [description, ...more],
								autoStart: true,
								loop: true,
								delay: 70,
							}}
						/>
					</div>
				</motion.div>
			)}
		</div>
	)
}

export default Mobile
