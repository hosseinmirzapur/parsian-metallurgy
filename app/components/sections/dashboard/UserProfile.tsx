"use client"

import { useState } from "react"

import { Profile } from "@/app/dashboard/DashboardContainer"

import {
	Badge,
	Card,
	CardBody,
	CardHeader,
	Input,
	Tooltip,
} from "@material-tailwind/react"

import { GrUserManager } from "react-icons/gr"

import server, { handleResponse } from "@/app/utils/api/server"
import { useAppSelector } from "@/redux/store"
import toast from "react-hot-toast"

interface UserProfileProps {
	profile: Profile
	changedEvent: () => void
}

const UserProfile: React.FC<UserProfileProps> = ({ profile, changedEvent }) => {
	// ** variables
	const [editMode, setEditMode] = useState(false)
	const [name, setName] = useState("")
	const [loading, setLoading] = useState(false)

	// ** redux variables
	const selector = useAppSelector((select) => select.persistedReducer.value)

	// ** functions
	const toggleEdit = () => setEditMode(!editMode)
	const fillName = (e: React.ChangeEvent<HTMLInputElement>) =>
		setName(e.target.value)

	// ** server functions
	const handleEdit = async () => {
		if (name !== "") {
			setLoading(true)
			await server
				.put(
					"/user/edit-name",
					{ name },
					{
						headers: {
							Authorization: `Bearer ${selector.token}`,
						},
					},
				)
				.then(() => {
					changedEvent()
					setName("")
					toast.success("ویرایش موفقیت آمیز بود")
					setLoading(false)
				})
				.catch((err) => {
					handleResponse(err, "toast")
					setLoading(false)
				})
		}
	}

	// minimal component
	const TextComponent = ({
		label,
		value,
	}: {
		label: string
		value: string | number | any
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
			<Card className="mt-10 cursor-pointer">
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
				<Tooltip
					content={
						editMode
							? "برای خروج از حالت ویرایش کلیک کنید"
							: "برای ویرایش کلیک کنید"
					}
					placement="bottom">
					<CardBody
						className="grid grid-cols-1 md:grid-cols-2 gap-4 hover:shadow-xl ease-in-out duration-300"
						onClick={() => {
							if (loading) return
							if (editMode) {
								handleEdit()
							}
							toggleEdit()
						}}>
						{editMode ? (
							<Input
								label="نام"
								defaultValue={profile.name}
								onChange={fillName}
								autoFocus={editMode}
							/>
						) : (
							<TextComponent label="نام" value={profile.name} />
						)}
						<TextComponent label="موبایل" value={profile.mobile} />
						<TextComponent
							label="تاریخ ثبت نام"
							value={profile.registered_at}
						/>
						<TextComponent label="تعداد سفارشات" value={profile.orders_count} />
						<TextComponent
							label="وضعیت کاربر"
							value={handleUserStatus(profile.status)}
						/>
					</CardBody>
				</Tooltip>
			</Card>
		</div>
	)
}

export default UserProfile
