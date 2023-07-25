"use client"

import { Button } from "@material-tailwind/react"
import dynamic from "next/dynamic"
import { useMemo } from "react"

const MapContainer = () => {
	// ** Special Component
	const Map = useMemo(() => dynamic(() => import("./Map"), { ssr: false }), [])

	// ** Functions
	const handleGeo = () => {
		const a = document.createElement("a")
		a.href = "geo:35.66912628969876,51.31956858095572;u=35"
		a.target = "_blank"
		a.click()
		a.remove()
	}

	return (
		<div className="pt-20 pb-20 bg-gray-200">
			<p className="text-center pb-10 text-2xl font-bold text-p-black">
				با ما در ارتباط باشید
			</p>
			<div className="flex justify-between flex-col lg:flex-row w-11/12 mx-auto gap-5 pt-5">
				<div className="flex flex-col gap-10 justify-start">
					<Map />
					<div className="flex items-center justify-center lg:hidden">
						<Button color="red" onClick={handleGeo}>
							مسیریابی
						</Button>
					</div>
				</div>

				<div className="flex flex-col gap-14">
					<div className="flex flex-col gap-2">
						<h3
							className="text-lg font-semibold text-p-black text-right"
							dir="rtl">
							دفتر مرکزی:
						</h3>

						<p className="text-p-black" dir="rtl">
							بازار آهن شاد آباد.خیابان 17 شهریور. نرسیده به بلوار طاوس بلوک
							فروردین. پلاک 6
						</p>
					</div>

					<div className="flex flex-col gap-2">
						<h3
							className="text-lg font-semibold text-p-black text-right"
							dir="rtl">
							کد پستی:
						</h3>

						<p className="text-p-black" dir="rtl">
							1371873313
						</p>
					</div>

					<div className="flex flex-col gap-2">
						<h3
							className="text-lg font-semibold text-p-black text-right"
							dir="rtl">
							تلفن دفتر مرکزی:
						</h3>

						<p className="text-p-black" dir="rtl">
							66672406 - 66672407 - 66672701
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MapContainer
