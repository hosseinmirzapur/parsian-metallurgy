import Hero from "./components/sections/Hero"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "متالورژی پارسیان",
	description: "این وبسایت جهت تست دمو و تایید دیزاین اولیه است",
}

export default function Home() {
	return (
		<div>
			<Hero />
		</div>
	)
}
