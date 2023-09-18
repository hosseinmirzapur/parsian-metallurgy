import Hero from "./components/sections/Hero"
import WazGood from "./components/sections/WazGood"
import MobilePics from "./components/sections/ImacPic"
import Testimonials from "./components/sections/Testimonials"
import MapContainer from "./components/sections/MapContainer"
import { ThemeProvider } from "@material-tailwind/react"

export default function Home() {
	return (
		<div className="bg-p-black">
			<Hero />
			<WazGood />
			<MobilePics />
			<Testimonials />
			<MapContainer />
		</div>
	)
}
