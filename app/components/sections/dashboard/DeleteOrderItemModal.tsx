"use client"

import { OrderItem } from "@/app/dashboard/orders/[id]/OrderPageContainer"
import {
	Button,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
} from "@material-tailwind/react"

import server, { handleResponse } from "@/app/utils/api/server"
import { useAppSelector } from "@/redux/store"

interface DeleteOrderItemModalProps {
	listener: () => void
	orderItem: OrderItem
	open: boolean
	toggleOpen: () => void
	loading: boolean
	enableLoading: () => void
	cancelLoading: () => void
}

const DeleteOrderItemModal: React.FC<DeleteOrderItemModalProps> = ({
	listener,
	loading,
	open,
	orderItem,
	cancelLoading,
	enableLoading,
	toggleOpen,
}) => {
	// ** variables
	const selector = useAppSelector((state) => state.persistedReducer.value)

	// ** functions
	const handleDelete = async () => {
		enableLoading()
		await server
			.delete(`/order-item/${orderItem.id}`, {
				headers: {
					Authorization: `Bearer ${selector.token}`,
				},
			})
			.then(() => {
				toggleOpen()
				listener()
			})
			.catch((err) => handleResponse(err, "toast"))
			.finally(() => cancelLoading())
	}

	return (
		<Dialog open={open} handler={toggleOpen} dir="rtl">
			<DialogHeader>تاییدیه حذف</DialogHeader>
			<DialogBody className="space-x-1">
				<span className="text-p-black font-medium">
					آیا از حذف این قطعه با نام
				</span>
				<span className="text-p-black font-medium">{` ${orderItem.name}`}</span>
				<span className="text-p-black font-medium">مطمئن هستید؟</span>
				<span className="text-p-black font-medium">
					در صورت حذف امکان بازگشت این مورد وجود نخواهد داشت!
				</span>
			</DialogBody>
			<DialogFooter className="flex justify-around">
				<Button onClick={handleDelete} disabled={loading}>
					تایید
				</Button>
				<Button color="red" onClick={toggleOpen}>
					لغو
				</Button>
			</DialogFooter>
		</Dialog>
	)
}

export default DeleteOrderItemModal
