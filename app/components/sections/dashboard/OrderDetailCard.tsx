"use client"

import { SingleOrder } from "@/app/dashboard/orders/[id]/OrderPageContainer"

interface OrderDetailCardProps {
	order: SingleOrder
}

const OrderDetailCard: React.FC<OrderDetailCardProps> = ({ order }) => {
	return (
		<div className="shadow-lg w-10/12 md:w-9/12 lg:w-3/12">
			<div className="flex gap-5 p-10">
				<h1 className="text-p-black font-semibold">کد رهگیری:</h1>
				<h4 className="text-p-black">{order.special_id}</h4>
			</div>
		</div>
	)
}

export default OrderDetailCard
