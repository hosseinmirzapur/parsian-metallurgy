"use client"

import { Order } from "@/app/dashboard/DashboardContainer"
import React from "react"

interface OrdersTableProps {
	orders: Order[]
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
	return <div>OrdersTable</div>
}

export default OrdersTable
