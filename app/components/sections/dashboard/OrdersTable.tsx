"use client"

import { useState } from "react"

import { useRouter } from "next/navigation"

import { Order } from "@/app/dashboard/DashboardContainer"

import {
	Input,
	Select,
	Option,
	Button,
	Menu,
	MenuHandler,
	MenuItem,
	MenuList,
} from "@material-tailwind/react"

import { BsThreeDotsVertical } from "react-icons/bs"
import { AiOutlineCheck } from "react-icons/ai"
import {
	MdDeleteOutline,
	MdModeEditOutline,
	MdOutlineCancel,
} from "react-icons/md"

import server, { handleResponse } from "@/app/utils/api/server"
import { useAppSelector } from "@/redux/store"
import toast from "react-hot-toast"
import { BiPlus } from "react-icons/bi"
import DeleteOrderModal from "../../builders/DeleteOrderModal"

interface OrdersTableProps {
	orders: Order[]
	newOrder?: boolean
	toggleNewOrder?: () => void
	emitOrderCreate?: () => void
	emitOrderDelete?: () => void
	emitOrderUpdate?: () => void
}

const OrdersTable: React.FC<OrdersTableProps> = ({
	orders,
	newOrder,
	toggleNewOrder,
	emitOrderCreate,
	emitOrderDelete,
	emitOrderUpdate,
}) => {
	// ** Variables
	const [tempOrder, setTempOrder] = useState<Omit<Order, "status" | "id">>()
	const [selectedOrder, setSelectedOrder] = useState<Order>({
		mobile: "",
		result_destination: "",
		status: false,
		customer_name: "",
		requester_name: "",
		result_email: "",
		id: "",
	})
	const [deleteOpen, setDeleteOpen] = useState(false)
	const [editMode, setEditMode] = useState(false)
	const [loading, setLoading] = useState(false)

	const router = useRouter()

	const selector = useAppSelector((state) => state.persistedReducer.value)

	const heads = [
		"#",
		"نام مشتری",
		"نام درخواست کننده",
		"شماره تماس",
		"ارسال نتیجه",
		"ایمیل نتیجه",
		"اقدامات",
	]

	// ** Functions
	const toggleDeleteOpen = () => setDeleteOpen(!deleteOpen)
	const enableLoading = () => setLoading(true)
	const disableLoading = () => setLoading(false)
	const toggleEdit = () => setEditMode(!editMode)
	const selectOrder = (order: Order) => setSelectedOrder(order)
	const cancelSelectOrder = () => {
		setSelectedOrder({
			id: "",
			mobile: "",
			result_destination: "",
			status: false,
			customer_name: "",
			requester_name: "",
			result_email: "",
		})
	}

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

	const resetTempOrder = () => {
		setTempOrder({
			mobile: "",
			result_destination: "",
			customer_name: "",
			requester_name: "",
			result_email: "",
		})
		toggleNewOrder?.()
	}

	const acceptTempOrder = async () => {
		enableLoading()
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
				emitOrderCreate?.()
				toggleNewOrder?.()
				toast.success(
					"سفارش ایجاد شد. از بخش اقدامات سفارش خود را تکمیل کنید.",
					{
						duration: 5000,
					},
				)
				disableLoading()
			})
			.catch((err) => {
				handleResponse(err, "toast")
				disableLoading()
			})
	}

	const acceptEdit = async () => {
		enableLoading()
		await server
			.put(
				`/order/${selectedOrder.id}`,
				{ ...selectedOrder },
				{
					headers: {
						Authorization: `Bearer ${selector.token}`,
					},
				},
			)
			.then(() => {
				emitOrderUpdate?.()
				toggleEdit()
				toast.success("ویرایش سفارش موفقیت آمیز بود")
				disableLoading()
			})
			.catch((err) => {
				handleResponse(err, "toast")
				disableLoading()
			})
	}

	const navigateToOrderDetail = (orderID: number) => {
		router.push(`/dashboard/orders/${orderID}`)
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
					{orders.map((order, index) => (
						<tr key={index} className="py-3">
							<td className="text-center py-3 text-p-black font-normal">
								{index + 1}
							</td>
							<td className="text-center py-3 text-p-black font-normal">
								{editMode && selectedOrder.id == order.id ? (
									<Input
										type="text"
										label="نام مشتری"
										defaultValue={order.customer_name}
										onChange={(e) =>
											setSelectedOrder({
												...selectedOrder!,
												customer_name: e.target.value,
											})
										}
									/>
								) : (
									order.customer_name
								)}
							</td>
							<td className="text-center py-3 text-p-black font-normal">
								{editMode && selectedOrder.id == order.id ? (
									<Input
										type="text"
										label="نام درخواست کننده"
										defaultValue={order.requester_name}
										onChange={(e) =>
											setSelectedOrder({
												...selectedOrder!,
												requester_name: e.target.value,
											})
										}
									/>
								) : (
									order.requester_name
								)}
							</td>
							<td className="text-center py-3 text-p-black font-normal">
								{editMode && selectedOrder.id == order.id ? (
									<>
										<Input
											type="number"
											label="موبایل"
											defaultValue={order.mobile}
											onChange={(e) =>
												setSelectedOrder({
													...selectedOrder!,
													mobile: e.target.value,
												})
											}
										/>
									</>
								) : (
									<>{order.mobile}</>
								)}
							</td>
							<td className="text-center py-3 text-p-black font-normal">
								{editMode && selectedOrder.id == order.id ? (
									<>
										<Select
											labelProps={{
												dir: "ltr",
											}}
											label={handleResultDest(order.result_destination)}
											defaultValue={order.result_destination}
											onChange={(e) =>
												setSelectedOrder({
													...selectedOrder!,
													result_destination: e as string,
												})
											}>
											<Option value="PERSON">حضوری</Option>
											<Option value="ITTA">ایتا</Option>
											<Option value="RUBIKA">روبیکا</Option>
											<Option value="BALE">بله</Option>
											<Option value="EMAIL">ایمیل</Option>
										</Select>
									</>
								) : (
									<>{handleResultDest(order.result_destination)}</>
								)}
							</td>
							<td className="text-center py-3 text-p-black font-normal">
								{editMode && selectedOrder.id == order.id ? (
									<Input
										type="text"
										label="ایمیل نتیجه"
										defaultValue={order?.result_email}
										onChange={(e) => {
											setSelectedOrder({
												...selectedOrder!,
												result_email: e.target.value,
											})
										}}
										disabled={selectedOrder?.result_destination !== "EMAIL"}
									/>
								) : (
									<>{order.result_email || "ندارد"}</>
								)}
							</td>
							<td className="flex items-center justify-center py-3 text-p-black font-normal">
								{editMode && selectedOrder.id == order.id ? (
									<div className="flex items-center gap-2 p-2">
										<Button
											color="red"
											variant="gradient"
											size="sm"
											onClick={() => {
												toggleEdit()
												cancelSelectOrder()
											}}>
											<MdOutlineCancel size={19} />
										</Button>
										<Button
											color="green"
											variant="gradient"
											size="sm"
											disabled={loading}
											onClick={acceptEdit}>
											<AiOutlineCheck size={16} />
										</Button>
									</div>
								) : (
									<Menu placement="right">
										<MenuHandler>
											<Button variant="outlined" color="teal" size="sm">
												<BsThreeDotsVertical size={20} />
											</Button>
										</MenuHandler>
										<MenuList>
											<MenuItem
												className="flex justify-between w-full"
												onClick={() => {
													selectOrder(order)
													toggleDeleteOpen()
												}}>
												<MdDeleteOutline size={20} />
												<span className="font-semibold">حذف</span>
											</MenuItem>
											<MenuItem
												className="flex justify-between"
												onClick={() => {
													selectOrder(order)
													toggleEdit()
												}}>
												<MdModeEditOutline size={20} />
												<span className="font-semibold">ویرایش</span>
											</MenuItem>
											<MenuItem
												className="flex justify-between"
												onClick={() => {
													navigateToOrderDetail(order.id as number)
												}}>
												<BiPlus size={20} />
												<span className="font-semibold">جزییات سفارش</span>
											</MenuItem>
										</MenuList>
									</Menu>
								)}
							</td>
						</tr>
					))}
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
							<td className="text-center py-32 md:py-3 text-p-black font-normal">
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

							<td className="flex items-center justify-center gap-4 px-2 py-32 md:py-5">
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
									disabled={loading}
									onClick={acceptTempOrder}>
									<AiOutlineCheck size={16} />
								</Button>
							</td>
						</tr>
					)}
				</tbody>
			</table>
			<DeleteOrderModal
				open={deleteOpen}
				toggleOpen={toggleDeleteOpen}
				order={selectedOrder}
				emitOrderDelete={emitOrderDelete}
				enableLoading={enableLoading}
				disableLoading={disableLoading}
				loading={loading}
			/>
		</div>
	)
}

export default OrdersTable
