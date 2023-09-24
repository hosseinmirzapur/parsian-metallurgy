"use client"

import { OrderItem } from "@/app/dashboard/orders/[id]/OrderPageContainer"

interface DeleteOrderItemModalProps {
	listener: () => void
	orderItem: OrderItem
	open: boolean
	toggleOpen: () => void
	loading: boolean
	toggleLoading: () => void
}

const DeleteOrderItemModal: React.FC<DeleteOrderItemModalProps> = () => {
	return <div>DeleteOrderItemModal</div>
}

export default DeleteOrderItemModal
