"use client"

import { OrderItem } from "@/app/dashboard/orders/[id]/OrderPageContainer"
import {
	Button,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
} from "@material-tailwind/react"

interface UpdateOrderItemModalProps {
	listener: () => void
	orderItem: OrderItem
	open: boolean
	toggleOpen: () => void
	loading: boolean
	toggleLoading: () => void
}

const UpdateOrderItemModal: React.FC<UpdateOrderItemModalProps> = ({
	listener,
	open,
	orderItem,
	toggleOpen,
}) => {
	return (
		<Dialog open={open} handler={toggleOpen} dir="rtl">
			<DialogHeader>افزودن قطعه به سفارش</DialogHeader>
			<DialogBody>Create Modal</DialogBody>
			<DialogFooter className="flex justify-around">
				<Button>تایید</Button>
				<Button color="red" onClick={toggleOpen}>
					لغو
				</Button>
			</DialogFooter>
		</Dialog>
	)
}

export default UpdateOrderItemModal
