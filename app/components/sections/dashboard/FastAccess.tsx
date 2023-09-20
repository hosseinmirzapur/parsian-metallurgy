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

interface FastAccessProps {
	toggleNewOrder: () => void
}

const FastAccess: React.FC<FastAccessProps> = ({ toggleNewOrder }) => {
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
							<div
								onClick={toggleNewOrder}
								className="flex flex-col items-center justify-center">
								<VscNewFile className="h-5 w-5" onClick={toggleNewOrder} />
								<Typography
									color="black"
									className="text-xs font-normal"
									onClick={toggleNewOrder}>
									سفارش جدید
								</Typography>
							</div>
						</SpeedDialAction>
						<SpeedDialAction className="h-16 w-16">
							<div
								className="flex flex-col items-center justify-center"
								onClick={() => router.push("/")}>
								<AiOutlineHome className="h-5 w-5" />
								<Typography color="black" className="text-xs font-normal">
									<Link href="/">خانه</Link>
								</Typography>
							</div>
						</SpeedDialAction>
						<SpeedDialAction className="h-16 w-16">
							<div
								className="flex flex-col items-center justify-center"
								onClick={handleLogout}>
								<CiLogout className="h-5 w-5" />
								<Typography color="black" className="text-xs font-normal">
									خروج
								</Typography>
							</div>
						</SpeedDialAction>
					</SpeedDialContent>
				</SpeedDial>
			</div>
		</div>
	)
}

export default FastAccess
