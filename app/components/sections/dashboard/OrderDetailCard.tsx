"use client"

import { SingleOrder } from "@/app/dashboard/orders/[id]/OrderPageContainer"
import {
	SpeedDial,
	SpeedDialHandler,
	SpeedDialContent,
	SpeedDialAction,
	IconButton,
	Breadcrumbs,
} from "@material-tailwind/react"
import Link from "next/link"
import { BsArrowLeft, BsPlus } from "react-icons/bs"

interface OrderDetailCardProps {
	order: SingleOrder
	toggleCreate: () => void
}

const OrderDetailCard: React.FC<OrderDetailCardProps> = ({
	order,
	toggleCreate,
}) => {
	return (
		<div className="flex flex-col w-full gap-10">
			<Breadcrumbs>
				<Link href={"/"}>صفحه اصلی</Link>
				<Link href={"/dashboard"}>داشبورد</Link>
				<Link href={"#"}>سفارشات</Link>
			</Breadcrumbs>
			<div className="flex flex-col gap-6 md:gap-2 lg:gap-0 lg:flex-row md:justify-between">
				<div className="flex gap-5">
					<h1 className="text-p-black font-semibold">کد رهگیری سفارش</h1>
					<BsArrowLeft size={18} className="align-baseline" />
					<h4 className="text-p-black">{order.special_id}</h4>
				</div>
				<div>
					<SpeedDial placement="right">
						<SpeedDialHandler>
							<IconButton className="rounded-full bg-p-black">
								<BsPlus size={30} color="white" />
							</IconButton>
						</SpeedDialHandler>
						<SpeedDialContent>
							<SpeedDialAction>
								<div
									className="flex flex-col justify-center items-center gap-2 p-2"
									onClick={toggleCreate}>
									<h3 className="text-p-black text-sm">قطعه جدید</h3>
								</div>
							</SpeedDialAction>
						</SpeedDialContent>
					</SpeedDial>
				</div>
			</div>
		</div>
	)
}

export default OrderDetailCard
