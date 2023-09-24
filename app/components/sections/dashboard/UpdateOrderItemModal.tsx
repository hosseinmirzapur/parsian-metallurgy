"use client"

import { OrderItem } from "@/app/dashboard/orders/[id]/OrderPageContainer"

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
	return <div>UpdateOrderItemModal</div>
}

export default UpdateOrderItemModal
