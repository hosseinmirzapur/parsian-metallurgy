"use client"

// Main imports
import { useEffect, useState } from "react"

// ** Components
import Tab from "../components/sections/dashboard/Tab"

// ** Api utilities
import server, { handleResponse } from "../utils/api/server"
import { useAppSelector } from "@/redux/store"

export interface Order {
	mobile: string
	customer_name?: string
	requester_name?: string
	status: string
}

export interface Profile {}

const DashboardContainer = () => {
	// ** Variables
	const [orders, setOrders] = useState<Order[]>([])
	const [profile, setProfile] = useState<Profile>({})
	const selector = useAppSelector((state) => state.persistedReducer.value)

	// ** Functions
	const fillOrders = (orders: Order[]) => setOrders(orders)

	// ** UseEffects
	useEffect(() => {
		server
			.get("/user/orders", {
				headers: {
					Authorization: `Bearer ${selector.token}`,
				},
			})
			.then(({ data }) => fillOrders(data.orders))
			.catch((err) => {
				handleResponse(err, "toast")
			})
	}, [])

	useEffect(() => {
		server
			.get("/user", {
				headers: {
					Authorization: `Bearer ${selector.token}`,
				},
			})
			.then(({ data }) => console.log(data))
			.catch((err) => handleResponse(err, "toast"))
	}, [])

	return (
		<div dir="rtl" className="mt-5 pb-48 md:px-10">
			<Tab orders={orders} userProfile={profile} />
		</div>
	)
}

export default DashboardContainer
