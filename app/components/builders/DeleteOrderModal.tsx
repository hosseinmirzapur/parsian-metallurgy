"use client"

import { Order } from "@/app/dashboard/DashboardContainer"

import {
	Button,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
} from "@material-tailwind/react"

import server, { handleResponse } from "@/app/utils/api/server"
import toast from "react-hot-toast"
import { useAppSelector } from "@/redux/store"

interface DeleteOrderModalProps {
	order: Order
	open: boolean
	toggleOpen: () => void
	emitOrderDelete?: () => void
	loading: boolean
	enableLoading: () => void
	disableLoading: () => void
}

const DeleteOrderModal: React.FC<DeleteOrderModalProps> = ({
	order,
	open,
	toggleOpen,
	emitOrderDelete,
	loading,
	disableLoading,
	enableLoading,
}) => {
	// ** Variables
	const selector = useAppSelector((state) => state.persistedReducer.value)

	// ** Functions
	const handleDelete = async () => {
		enableLoading()
		await server
			.delete(`/order/${order.id}`, {
				headers: {
					Authorization: `Bearer ${selector.token}`,
				},
			})
			.then(() => {
				toggleOpen()
				emitOrderDelete?.()
				toast.success("سفارش مورد نظر با موفقیت حذف شد.")
				disableLoading()
			})
			.catch((err) => {
				handleResponse(err, "toast")
				disableLoading()
			})
	}

	return (
		<>
			<Dialog open={open} handler={toggleOpen} dir="rtl">
				<DialogHeader>تاییدیه</DialogHeader>
				<DialogBody>
					<p className="text-p-black font-normal">
						در صورت حذف این سفارش امکان بازگشت آن وجود نخواهد داشت.
					</p>
					<p className="text-p-black font-normal">
						آیا از حذف کردن این سفارش اطمینان کامل دارید؟
					</p>
				</DialogBody>
				<DialogFooter className="flex justify-between">
					<Button color="blue-gray" onClick={handleDelete} disabled={loading}>
						حذف میکنم
					</Button>
					<Button color="red" onClick={toggleOpen}>
						منصرف شدم
					</Button>
				</DialogFooter>
			</Dialog>
		</>
	)
}

export default DeleteOrderModal
