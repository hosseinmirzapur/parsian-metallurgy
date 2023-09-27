"use client"

import { useEffect, useState } from "react"

import { OrderItem } from "@/app/dashboard/orders/[id]/OrderPageContainer"

import {
	Alert,
	Button,
	Checkbox,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
	Input,
	Option,
	Select,
	Textarea,
} from "@material-tailwind/react"

import { useAppSelector } from "@/redux/store"

import server, { handleResponse } from "@/app/utils/api/server"
import toast from "react-hot-toast"

interface UpdateOrderItemModalProps {
	listener: () => void
	orderItem: OrderItem
	open: boolean
	toggleOpen: () => void
	loading: boolean
	enableLoading: () => void
	cancelLoading: () => void
}

type TestType = "ANALYZE" | "HARDNESS" | "BOTH"

interface OrderItemUpdateRequest {
	name?: string
	sand_paper?: boolean
	destruction?: boolean
	test_type?: string
	quantity?: number
	description?: string
}

const UpdateOrderItemModal: React.FC<UpdateOrderItemModalProps> = ({
	listener,
	open,
	orderItem,
	toggleOpen,
	loading,
	cancelLoading,
	enableLoading,
}) => {
	// ** variables
	const [updatedOrderItem, setUpdatedOrderItem] =
		useState<OrderItemUpdateRequest>()
	const [alertOpen, setAlertOpen] = useState(true)
	const [error, setError] = useState("")

	// ** redux variables
	const selector = useAppSelector((state) => state.persistedReducer.value)

	// ** functions
	const toggleAlert = () => setAlertOpen(!alertOpen)

	const acceptUpdate = async () => {
		enableLoading()
		await server
			.put(
				`/order-item/${orderItem.id}`,
				{
					...updatedOrderItem,
				},
				{
					headers: {
						Authorization: `Bearer ${selector.token}`,
					},
				},
			)
			.then(() => {
				listener()
				toggleOpen()
				toast.success("آیتم مورد نظر با موفقیت ویرایش شد")
			})
			.catch((err) => {
				setError(handleResponse(err, "text"))
			})
			.finally(() => cancelLoading())
	}

	// ** useEffect
	useEffect(() => {
		setUpdatedOrderItem({
			description: orderItem.description,
			destruction: orderItem.destruction,
			name: orderItem.name,
			quantity: orderItem.quantity,
			sand_paper: orderItem.sand_paper,
			test_type: orderItem.test_type,
		})
		setAlertOpen(true)
		setError("")
	}, [open])

	return (
		<Dialog open={open} handler={toggleOpen} dir="rtl" size="sm">
			<DialogHeader>افزودن قطعه به سفارش</DialogHeader>
			<DialogBody className="flex flex-col gap-4 md:w-10/12 md:mx-auto">
				<Input
					type="text"
					label="نام قطعه"
					defaultValue={orderItem.name}
					onChange={(e) =>
						setUpdatedOrderItem({
							...updatedOrderItem!,
							name: e.target.value,
						})
					}
				/>
				<div className="flex items-center gap-4">
					<Checkbox
						label={<p className="text-p-black font-normal">اجازه سنگ سنباده</p>}
						defaultChecked={orderItem.sand_paper}
						onChange={(e) =>
							setUpdatedOrderItem({
								...updatedOrderItem!,
								sand_paper: e.target.checked,
							})
						}
					/>
					<Checkbox
						label={
							<p className="text-p-black font-normal">
								اجازه تخریب بعد از آزمایش
							</p>
						}
						defaultChecked={orderItem.destruction}
						onChange={(e) =>
							setUpdatedOrderItem({
								...updatedOrderItem!,
								destruction: e.target.checked,
							})
						}
					/>
				</div>
				{!updatedOrderItem?.destruction && (
					<Alert
						open={alertOpen}
						onClose={toggleAlert}
						className="space-x-1"
						color="orange">
						<div>
							<span className="text-p-black font-medium">
								در صورت عدم اجازه تخریب،
							</span>{" "}
							<span className="underline text-p-white font-medium">احتمال</span>{" "}
							<span className="text-p-black font-medium">
								خطا در جواب آزمون وجود دارد.
							</span>
						</div>
					</Alert>
				)}
				<Select
					label={
						updatedOrderItem?.test_type === "ANALYZE"
							? "آنالیز"
							: updatedOrderItem?.test_type === "HARDNESS"
							? "سختی"
							: "هر دو"
					}
					onChange={(text) => {
						setUpdatedOrderItem({
							...updatedOrderItem!,
							test_type: text as TestType,
						})
					}}>
					<Option value="ANALYZE">آنالیز</Option>
					<Option value="HARDNESS">سختی</Option>
					<Option value="BOTH">هر دو</Option>
				</Select>
				<Input
					type="number"
					defaultValue={orderItem.quantity}
					label="تعداد"
					onChange={(e) =>
						setUpdatedOrderItem({
							...updatedOrderItem!,
							quantity: parseInt(e.target.value),
						})
					}
				/>
				<Textarea
					label="توضیحات (اختیاری)"
					defaultValue={orderItem?.description}
					onChange={(e) =>
						setUpdatedOrderItem({
							...updatedOrderItem!,
							description: e.target.value,
						})
					}
					resize
				/>
			</DialogBody>
			<DialogFooter className="flex flex-col gap-3">
				{error && (
					<p className="font-medium text-center text-red-600">{error}</p>
				)}
				<div className="flex gap-5">
					<Button disabled={loading} onClick={acceptUpdate}>
						تایید
					</Button>
					<Button color="red" onClick={toggleOpen}>
						لغو
					</Button>
				</div>
			</DialogFooter>
		</Dialog>
	)
}

export default UpdateOrderItemModal
