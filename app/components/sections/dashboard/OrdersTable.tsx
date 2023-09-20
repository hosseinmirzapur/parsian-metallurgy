"use client"

import { useState } from "react"

import { Order } from "@/app/dashboard/DashboardContainer"

import { Input, Select, Option, Button } from "@material-tailwind/react"

import { BsThreeDotsVertical } from "react-icons/bs"
import { AiOutlineCheck } from "react-icons/ai"
import { MdDeleteOutline } from "react-icons/md"

import server, { handleResponse } from "@/app/utils/api/server"
import { useAppSelector } from "@/redux/store"
import toast from "react-hot-toast"

interface OrdersTableProps {
	orders: Order[]
	newOrder?: boolean
	toggleNewOrder?: () => void
	emitOrderCreate?: () => void
}

const OrdersTable: React.FC<OrdersTableProps> = ({
	orders,
	newOrder,
	toggleNewOrder,
	emitOrderCreate,
}) => {
	// ** Variables
	const [tempOrder, setTempOrder] = useState<Omit<Order, "status">>()
	const selector = useAppSelector((state) => state.persistedReducer.value)

	const heads = [
		"#",
		"نام مشتری",
		"نام درخواست کننده",
		"شماره تماس",
		"ارسال نتیجه",
		"ایمیل نتیجه",
		"وضعیت",
		"اقدامات",
	]

	// ** Functions
	const handleResultDest = (dest: string): string => {
		switch (dest) {
			case "PERSON":
				return "حضوری"
			case "ITTA":
				return "ایتا"
			case "RUBIKA":
				return "روبیکا"
			case "BALE":
				return "بله"
			case "EMAIL":
				return "ایمیل"
			default:
				return ""
		}
	}

	const handleOrderStatus = (ready: boolean): string => {
		return ready ? "تحویل داده شده" : "در حال آماده سازی"
	}

	const resetTempOrder = () => {
		setTempOrder({
			mobile: "",
			result_destination: "",
			customer_name: "",
			requester_name: "",
			result_email: "",
		})
		if (toggleNewOrder) toggleNewOrder()
	}

	const acceptTempOrder = async () => {
		await server
			.post(
				"/order",
				{
					...tempOrder,
				},
				{
					headers: {
						Authorization: `Bearer ${selector.token}`,
					},
				},
			)
			.then(() => {
				if (emitOrderCreate) emitOrderCreate()
				if (toggleNewOrder) toggleNewOrder()
				toast.success("سفارش ایجاد شد. از بخش اقدامات سفارش خود را تکمیل کنید.")
			})
			.catch((err) => handleResponse(err, "toast"))
	}

	return (
		<div className="flex md:justify-center md:items-center mt-10 overflow-y-scroll lg:overflow-visible w-full h-full">
			<table className="w-full min-w-max table-auto">
				<thead>
					<tr className="py-3">
						{heads.map((head, index) => (
							<th
								key={index}
								className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
								<span className="text-small">{head}</span>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{orders.map(
						(
							{
								mobile,
								status,
								customer_name,
								requester_name,
								result_destination,
								result_email,
							},
							index,
						) => (
							<tr key={index} className="py-3">
								<td className="text-center py-3 text-p-black font-normal">
									{index + 1}
								</td>
								<td className="text-center py-3 text-p-black font-normal">
									{customer_name}
								</td>
								<td className="text-center py-3 text-p-black font-normal">
									{requester_name}
								</td>
								<td className="text-center py-3 text-p-black font-normal">
									{mobile}
								</td>
								<td className="text-center py-3 text-p-black font-normal">
									{handleResultDest(result_destination)}
								</td>
								<td className="text-center py-3 text-p-black font-normal">
									{result_email || "ندارد"}
								</td>
								<td className="text-center py-3 text-p-black font-normal">
									{handleOrderStatus(status)}
								</td>
								<td className="flex items-center justify-center py-3 text-p-black font-normal">
									<BsThreeDotsVertical size={20} />
								</td>
							</tr>
						),
					)}
					{newOrder && (
						<tr>
							<td className="text-center">{orders.length + 1}</td>
							<td>
								<Input
									type="text"
									label="نام مشتری"
									error={tempOrder?.customer_name === ""}
									onChange={(e) =>
										setTempOrder({
											...tempOrder!,
											customer_name: e.target.value,
										})
									}
								/>
							</td>
							<td>
								<Input
									type="text"
									error={tempOrder?.requester_name === ""}
									label="نام درخواست کننده"
									onChange={(e) => {
										setTempOrder({
											...tempOrder!,
											requester_name: e.target.value,
										})
									}}
								/>
							</td>
							<td>
								<Input
									type="number"
									error={tempOrder?.mobile === ""}
									label="شماره موبایل"
									onChange={(e) => {
										setTempOrder({
											...tempOrder!,
											mobile: e.target.value,
										})
									}}
								/>
							</td>
							<td>
								<Select
									labelProps={{
										dir: "ltr",
									}}
									error={tempOrder?.result_destination === ""}
									label="ارسال نتیجه"
									onChange={(e) =>
										setTempOrder({
											...tempOrder!,
											result_destination: e as string,
										})
									}>
									<Option value="PERSON">حضوری</Option>
									<Option value="ITTA">ایتا</Option>
									<Option value="RUBIKA">روبیکا</Option>
									<Option value="BALE">بله</Option>
									<Option value="EMAIL">ایمیل</Option>
								</Select>
							</td>
							<td>
								<Input
									type="text"
									label="ایمیل نتیجه"
									error={tempOrder?.result_email === ""}
									onChange={(e) => {
										setTempOrder({
											...tempOrder!,
											result_email: e.target.value,
										})
									}}
									disabled={tempOrder?.result_destination !== "EMAIL"}
								/>
							</td>
							<td>
								<Input
									type="text"
									disabled
									value={"در حال بررسی"}
									labelProps={{
										className: "flex justify-center items-center",
									}}
									label="وضعیت"
								/>
							</td>
							<td className="flex items-center justify-center gap-4 p-2">
								<Button
									color="red"
									variant="gradient"
									size="sm"
									onClick={resetTempOrder}>
									<MdDeleteOutline size={16} />
								</Button>
								<Button
									color="green"
									variant="gradient"
									size="sm"
									onClick={acceptTempOrder}>
									<AiOutlineCheck size={16} />
								</Button>
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}

export default OrdersTable
