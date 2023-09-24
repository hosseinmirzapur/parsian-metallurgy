"use client"

// ** react imports
import { useEffect, useState } from "react"

// ** components
import CreateOrderItemModal from "@/app/components/sections/dashboard/CreateOrderItemModal"
import DeleteOrderItemModal from "@/app/components/sections/dashboard/DeleteOrderItemModal"
import OrderDetailCard from "@/app/components/sections/dashboard/OrderDetailCard"
import OrderItemTable from "@/app/components/sections/dashboard/OrderItemTable"
import UpdateOrderItemModal from "@/app/components/sections/dashboard/UpdateOrderItemModal"

// ** server utilities
import server, { handleResponse } from "@/app/utils/api/server"
import { useAppSelector } from "@/redux/store"

interface OrderPageParams {
	orderID: string | number
}

export interface SingleOrder {
	id: string | number
	mobile: string
	customer_name: string
	requester_name?: string
	result_destination: "PERSON" | "ITTA" | "RUBIKA" | "BALE" | "EMAIL" | string
	result_email?: string
	special_id: string
	orderItems: OrderItem[]
	created_at: string
}

export interface OrderItem {
	name: string
	sand_paper: boolean
	destruction: boolean
	status: "PENDING" | "PARTIAL" | "OFFICE" | "PAID" | string
	test_type: "ANALYZE" | "HARDNESS" | "BOTH" | string
	quantity: number
	description?: string
	image?: string
	created_at: string
}

const OrderPageContainer: React.FC<OrderPageParams> = ({ orderID }) => {
	// ** redux variables
	const selector = useAppSelector((state) => state.persistedReducer.value)

	// ** order variables
	const baseOrder = {
		id: "",
		customer_name: "",
		created_at: "",
		mobile: "",
		orderItems: [],
		result_destination: "",
		special_id: "",
		requester_name: "",
		result_email: "",
	}
	const [order, setOrder] = useState<SingleOrder>(baseOrder)
	const [selectedOrderItem, setSelectedOrderItem] = useState<OrderItem>({
		created_at: "",
		destruction: false,
		name: "",
		quantity: 0,
		sand_paper: false,
		status: "",
		test_type: "",
		description: "",
		image: "",
	})

	// ** state variables
	const [fired, setFired] = useState(false)
	const [loading, setLoading] = useState(false)
	const [createModal, setCreateModal] = useState(false)
	const [updateModal, setUpdateModal] = useState(false)
	const [deleteModal, setDeleteModal] = useState(false)

	// ** functions
	const fireEvent = () => setFired(!fired)
	const toggleLoading = () => setLoading(!loading)
	const chooseOrderItem = (orderItem: OrderItem) =>
		setSelectedOrderItem(orderItem)
	const toggleCreateModal = () => setCreateModal(!createModal)
	const toggleUpdateModal = () => setUpdateModal(!updateModal)
	const toggleDeleteModal = () => setDeleteModal(!deleteModal)

	useEffect(() => {
		server
			.get(`/order/${orderID}`, {
				headers: {
					Authorization: `Bearer ${selector.token}`,
				},
			})
			.then((res) => {
				const data: SingleOrder = res.data.order
				setOrder(data)
			})
			.catch((err) => handleResponse(err, "toast"))
	}, [fired])

	return (
		<div
			dir="rtl"
			className="flex flex-col gap-5 w-11/12 md:w-10/12 mx-auto py-10">
			<OrderDetailCard order={order} />

			<OrderItemTable
				orderItems={order.orderItems}
				toggleDelete={toggleDeleteModal}
				toggleUpdate={toggleUpdateModal}
				chooseOrderItem={chooseOrderItem}
			/>

			<CreateOrderItemModal
				listener={fireEvent}
				open={createModal}
				toggleOpen={toggleCreateModal}
				loading={loading}
				toggleLoading={toggleLoading}
			/>

			<UpdateOrderItemModal
				listener={fireEvent}
				orderItem={selectedOrderItem}
				open={updateModal}
				toggleOpen={toggleUpdateModal}
				loading={loading}
				toggleLoading={toggleLoading}
			/>

			<DeleteOrderItemModal
				listener={fireEvent}
				orderItem={selectedOrderItem}
				open={deleteModal}
				toggleOpen={toggleDeleteModal}
				loading={loading}
				toggleLoading={toggleLoading}
			/>
		</div>
	)
}

export default OrderPageContainer
