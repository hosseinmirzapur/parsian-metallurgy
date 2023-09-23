"use client"

import { Profile } from "@/app/dashboard/DashboardContainer"
import { Badge, Card, CardBody, CardHeader } from "@material-tailwind/react"

import { GrUserManager } from "react-icons/gr"

interface UserProfileProps {
	profile: Profile
}

const UserProfile: React.FC<UserProfileProps> = ({ profile }) => {
	// minimal component
	const TextComponent = ({
		label,
		value,
	}: {
		label: string
		value: string | number | React.ReactNode
	}) => (
		<div className="flex flex-row gap-6">
			<p className="text-p-black font-medium">{label}:</p>
			<h4 className="text-p-black">{value}</h4>
		</div>
	)

	// ** Functions
	const handleUserStatus = (status: string) => {
		if (status === "ACTIVE") {
			return <Badge color="green" className="p-2" content="فعال" />
		} else {
			return <Badge color="red" className="p-1" content="غیر فعال" />
		}
	}

	return (
		<div
			className="
				flex
				flex-col
				lg:flex-row
				items-center
				justify-center
				w-10/12
				md:w-9/12
				lg:w-8/12
				mx-auto
			">
			<Card className="mt-10">
				<CardHeader
					className={`
						flex
						items-center
						justify-center
						mx-auto
						hover:bg-p-orange
						ease-in-out
						duration-300
						cursor-pointer
					`}>
					<GrUserManager size={50} className="p-2" />
				</CardHeader>
				<CardBody className="grid grid-cols-1 md:grid-cols-2 gap-4 hover:shadow-xl ease-in-out duration-300">
					<TextComponent label="نام" value={profile.name} />
					<TextComponent label="موبایل" value={profile.mobile} />
					<TextComponent label="تاریخ ثبت نام" value={profile.registered_at} />
					<TextComponent label="تعداد سفارشات" value={profile.orders_count} />
					<TextComponent
						label="وضعیت کاربر"
						value={handleUserStatus(profile.status)}
					/>
				</CardBody>
			</Card>
		</div>
	)
}

export default UserProfile
