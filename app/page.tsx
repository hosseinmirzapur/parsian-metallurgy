import Hero from "./components/sections/Hero"
import { Metadata } from "next"
import WazGood from "./components/sections/WazGood"
import MobilePics from "./components/sections/MobilePics"
import Testimonials from "./components/sections/Testimonials"

export const metadata: Metadata = {
	title: "متالورژی پارسیان",
	description: "این وبسایت جهت تست دمو و تایید دیزاین اولیه است",
}

export default function Home() {
	return (
		<div className="bg-p-black">
			<Hero />
			<WazGood />
			<MobilePics />
			<Testimonials />
		</div>
	)
}
