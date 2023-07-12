"use client"

import dynamic from "next/dynamic"
import { useMemo } from "react"

const MapContainer = () => {
	const Map = useMemo(() => dynamic(() => import("./Map"), { ssr: false }), [])
	return (
		<div className="pt-20 pb-20 bg-gray-200">
			<p className="text-center pb-10 text-2xl font-bold text-p-black">
				با ما در ارتباط باشید
			</p>
			<div className="flex justify-between flex-col lg:flex-row w-11/12 mx-auto gap-5 pt-5">
				<div className="flex justify-start">
					<Map />
				</div>
				<div className="flex flex-col gap-7">
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
							دفتر نمایندگی:
						</h3>

						<p className="text-p-black" dir="rtl">
							غرب به شرق بزرگراه فتح (جاده قدیم کرج)، نرسیده به میدان شیر
							پاستوریزه، مجتمع تجاری تهران، شماره 114
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

					<div className="flex flex-col gap-2">
						<h3
							className="text-lg font-semibold text-p-black text-right"
							dir="rtl">
							تلفن دفتر نمایندگی:
						</h3>

						<p className="text-p-black" dir="rtl">
							66798681 - 66809731
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MapContainer
