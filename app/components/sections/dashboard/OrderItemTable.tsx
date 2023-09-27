"use client"

import { OrderItem } from "@/app/dashboard/orders/[id]/OrderPageContainer"

import { BsEye, BsImage, BsThreeDotsVertical } from "react-icons/bs"
import ImageModal from "./ImageModal"
import { useState } from "react"
import toast from "react-hot-toast"
import {
	Button,
	Popover,
	PopoverContent,
	PopoverHandler,
	Menu,
	MenuHandler,
	MenuList,
	MenuItem,
} from "@material-tailwind/react"
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"

interface OrderItemTableProps {
	orderItems: OrderItem[]
	toggleUpdate: () => void
	toggleDelete: () => void
	chooseOrderItem: (orderItem: OrderItem) => void
}

const OrderItemTable: React.FC<OrderItemTableProps> = ({
	orderItems,
	toggleDelete,
	toggleUpdate,
	chooseOrderItem,
}) => {
	// ** variables
	const TableHeaders = [
		"#",
		"نام قطعه",
		"تعداد",
		"اجازه سنگ سنباده",
		"اجازه تخریب",
		"نوع آزمون",
		"وضعیت",
		"توضیحات اضافه",
		"تصویر",
		"تاریخ ایجاد",
		"اقدامات",
	]
	const [imgSrc, setImgSrc] = useState("")
	const [showImage, setShowImage] = useState(false)

	// ** functions
	const toggleShowImage = () => setShowImage(!showImage)
	const handleTestType = (
		testType: "HARDNESS" | "ANALYZE" | "BOTH" | string,
	) => {
		switch (testType) {
			case "HARDNESS":
				return "سختی"
			case "ANALYZE":
				return "آنالیز"
			case "BOTH":
				return "هر دو"
			default:
				return ""
		}
	}

	const handleOrderItemStatus = (
		status: "PENDING" | "PARTIAL" | "PAID" | "OFFICE" | string,
	) => {
		switch (status) {
			case "PENDING":
				return "در حال بررسی"
			case "PARTIAL":
				return "پرداخت جزئی"
			case "PAID":
				return "پرداخت شده"
			case "OFFICE":
				return "حساب دفتری"
			default:
				return ""
		}
	}

	return (
		<div className="flex md:justify-center md:items-center mt-10 overflow-y-scroll lg:overflow-visible w-full h-full">
			<table className="w-full min-w-max table-auto">
				<thead>
					<tr>
						{TableHeaders.map((header, index) => (
							<th
								className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
								key={index}>
								<span className="text-small">{header}</span>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{orderItems.length !== 0 ? (
						orderItems.map((item, index) => (
							<tr key={index} className="border">
								<td className="py-4 text-center text-p-black font-normal text-sm">
									{index + 1}
								</td>
								<td className="py-4 text-center text-p-black text-sm">
									{item.name}
								</td>
								<td className="py-4 text-center text-p-black font-normal text-sm">
									{item.quantity}
								</td>
								<td className="py-4 text-center text-p-black font-normal text-sm">
									{item.sand_paper ? "دارد" : "ندارد"}
								</td>
								<td className="py-4 text-center text-p-black font-normal text-sm">
									{item.destruction ? "دارد" : "ندارد"}
								</td>
								<td className="py-4 text-center text-p-black font-normal text-sm">
									{handleTestType(item.test_type)}
								</td>
								<td className="py-4 text-center text-p-black font-normal text-sm">
									{handleOrderItemStatus(item.status)}
								</td>
								<td className="py-4 justify-center text-p-black font-normal text-sm">
									<div className="flex items-center justify-center px-3">
										<Popover placement="top">
											<PopoverHandler>
												<Button
													color="blue-gray"
													variant="outlined"
													size="sm"
													className="flex gap-4 text-p-black">
													<BsEye size={18} color="teal" />
													مشاهده
												</Button>
											</PopoverHandler>
											<PopoverContent
												className="text-p-white text-base bg-p-black text-start"
												dir="rtl">
												{item.description
													? item.description
													: "توضیحاتی درج نشده است"}
											</PopoverContent>
										</Popover>
									</div>
								</td>
								<td
									className="py-4 text-center text-p-black font-normal text-sm cursor-pointer flex items-center justify-center"
									onClick={() => {
										if (item.image) {
											setImgSrc(item.image!)
											toggleShowImage()
										} else {
											toast("این مورد عکسی ندارد")
										}
									}}>
									<Button color="blue-gray" variant="outlined" size="sm">
										<BsImage size={18} />
									</Button>
								</td>
								<td className="py-4 text-center text-p-black font-normal text-sm">
									{item.created_at}
								</td>
								<td className="py-4 text-center text-p-black font-normal text-sm">
									<Menu>
										<MenuHandler>
											<Button color="blue-gray" variant="outlined" size="sm">
												<BsThreeDotsVertical size={18} />
											</Button>
										</MenuHandler>
										<MenuList>
											<MenuItem
												className="flex justify-between w-full mx-auto font-medium"
												onClick={() => {
													chooseOrderItem(item)
													toggleUpdate()
												}}>
												<AiOutlineEdit size={18} />
												ویرایش
											</MenuItem>
											<MenuItem
												className="flex justify-between w-full mx-auto font-medium"
												onClick={() => {
													chooseOrderItem(item)
													toggleDelete()
												}}>
												<AiOutlineDelete size={18} />
												حذف
											</MenuItem>
										</MenuList>
									</Menu>
								</td>
							</tr>
						))
					) : (
						<>
							<tr>
								<td
									colSpan={11}
									className="py-4 text-p-black text-center font-normal text-sm">
									این سفارش هنوز آیتمی ندارد
								</td>
							</tr>
						</>
					)}
				</tbody>
			</table>
			<ImageModal
				imgSrc={imgSrc}
				open={showImage}
				toggleOpen={toggleShowImage}
			/>
		</div>
	)
}

export default OrderItemTable
