"use client"

import { Order } from "@/app/dashboard/DashboardContainer"

import { BsThreeDotsVertical } from "react-icons/bs"

interface OrdersTableProps {
	orders: Order[]
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
	// ** Variables
	const heads = [
		"#",
		"نام مشتری",
		"نام درخواست کننده",
		"شماره تماس",
		"ارسال نتیجه",
		"وضعیت",
		"اقدامات",
	]

	// ** Functions
	const handleResultDest = (dest: string): string => {
		switch (dest) {
			case "PERSON":
				return "حضوری"
			case "ITTA":
				return "ایتا"
			case "RUBIKA":
				return "روبیکا"
			case "BALE":
				return "بله"
			case "EMAIL":
				return "ایمیل"
			default:
				return ""
		}
	}

	const handleOrderStatus = (ready: boolean): string => {
		return ready ? "تحویل داده شده" : "در حال آماده سازی"
	}

	return (
		<div className="flex justify-center items-center mt-10">
			<table>
				<thead>
					<tr>
						{heads.map((head, index) => (
							<th
								key={index}
								className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
								<span className="text-small">{head}</span>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{orders.map(
						(
							{
								mobile,
								status,
								customer_name,
								requester_name,
								result_destination,
							},
							index,
						) => (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>{customer_name}</td>
								<td>{requester_name}</td>
								<td>{mobile}</td>
								<td>{handleResultDest(result_destination)}</td>
								<td>{handleOrderStatus(status)}</td>
								<td>
									<BsThreeDotsVertical size={20} />
								</td>
							</tr>
						),
					)}
				</tbody>
			</table>
		</div>
	)
}

export default OrdersTable
