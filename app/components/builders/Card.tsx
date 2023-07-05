"use client"

import { IconType } from "react-icons/lib"

interface ComponentProps {
	icon: IconType
	title: string
	description: string
}

const Card: React.FC<ComponentProps> = ({ description, icon: Icon, title }) => {
	return (
		<div
			className="
                flex
                flex-col
                items-center
                justify-around
                gap-4
                rounded-md
                p-4
                shadow-lg
                text-center
                bg-p-orange
                w-[280px]
                h-[280px]
                md:w-[300px]
                md:h-[300px]
                mx-auto
                hover:scale-110
                hover:shadow-2xl
                ease-in
                duration-[400ms]
        ">
			<Icon className="text-4xl md:text-5xl lg:text-6xl text-p-chocolate hover:rotate-[360deg] duration-300" />
			<h2 className="text-xl md:text-2xl font-bold text-p-black">{title}</h2>
			<p className="text-sm md:text-base text-p-black">{description}</p>
		</div>
	)
}

export default Card
