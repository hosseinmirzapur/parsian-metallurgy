"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"

import {
	SpeedDial,
	SpeedDialHandler,
	SpeedDialContent,
	SpeedDialAction,
	IconButton,
	Typography,
} from "@material-tailwind/react"

import { AiOutlinePlus, AiOutlineHome } from "react-icons/ai"
import { VscNewFile } from "react-icons/vsc"
import { CiLogout } from "react-icons/ci"

import { useDispatch } from "react-redux"
import { logout } from "@/redux/features/auth-slice"

const FastAccess = () => {
	// ** Variables
	const dispatch = useDispatch()
	const router = useRouter()

	const handleLogout = async () => {
		router.push("/")
		dispatch(logout())
	}

	return (
		<div className="relative h-80 w-full">
			<div className="absolute bottom-0 right-0">
				<SpeedDial>
					<SpeedDialHandler>
						<IconButton size="lg" className="rounded-full bg-p-black">
							<AiOutlinePlus className="h-5 w-5 transition-transform group-hover:rotate-45" />
						</IconButton>
					</SpeedDialHandler>
					<SpeedDialContent>
						<SpeedDialAction className="h-16 w-16">
							<VscNewFile className="h-5 w-5" />
							<Typography color="blue-gray" className="text-xs font-normal">
								سفارش جدید
							</Typography>
						</SpeedDialAction>
						<SpeedDialAction className="h-16 w-16">
							<AiOutlineHome
								className="h-5 w-5"
								onClick={() => router.push("/")}
							/>
							<Typography
								color="blue-gray"
								className="text-xs font-normal"
								onClick={() => router.push("/")}>
								<Link href="/">خانه</Link>
							</Typography>
						</SpeedDialAction>
						<SpeedDialAction className="h-16 w-16">
							<CiLogout className="h-5 w-5" onClick={handleLogout} />
							<Typography
								color="blue-gray"
								className="text-xs font-normal"
								onClick={handleLogout}>
								خروج
							</Typography>
						</SpeedDialAction>
					</SpeedDialContent>
				</SpeedDial>
			</div>
		</div>
	)
}

export default FastAccess
