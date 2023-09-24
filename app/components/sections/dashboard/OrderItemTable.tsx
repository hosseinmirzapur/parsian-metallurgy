"use client"

import { OrderItem } from "@/app/dashboard/orders/[id]/OrderPageContainer"

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
	return <div>OrderItemTable</div>
}

export default OrderItemTable
