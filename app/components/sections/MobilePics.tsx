"use client"

// ** Components
import Mobile from "../builders/Mobile"

const MobilePics = () => {
	return (
		<div className="pt-20 bg-p-white pb-20 border-t-2 border-t-p-black">
			<p className="text-center text-p-black text-2xl font-bold pb-20">
				کیفیت از ما، سود از شما
			</p>

			<div
				className="
					flex
					flex-col
					lg:flex-row
					gap-4
					items-center
					justify-center
            	"
				dir="rtl">
				<Mobile
					image="/xrf1.jpg"
					description="TT- X7000 Handheld Portable XRF Mineral Ore Analyzer"
					more={["آزمون غیر مخرب با دقت بالا"]}
				/>
				<Mobile
					image="/xrf2.jpg"
					description="آنالیز کیفیت فلز از طریق پیدا کردن مواد سازنده آن"
				/>
				<Mobile
					image="/lab-1.jpg"
					description="کادر فنی حرفه ای"
					more={["تیمی با بیش از 10 سال سابقه فنی"]}
				/>
				<Mobile image="/lab-2.jpg" description="متن دلخواه" />
			</div>
		</div>
	)
}

export default MobilePics
