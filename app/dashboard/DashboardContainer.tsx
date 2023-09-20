"use client"

// Main imports
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

// ** Components
import Tab from "../components/sections/dashboard/Tab"

// ** Api utilities
import server, { handleResponse } from "../utils/api/server"
import { useAppSelector } from "@/redux/store"

export interface Order {
	mobile: string
	customer_name?: string
	requester_name?: string
	result_destination: string
	status: boolean
}

export interface Profile {
	mobile: string
	name: string
	status: string
	orders_count: string | number
	registered_at: string
}

const DashboardContainer = () => {
	// ** Variables
	const [orders, setOrders] = useState<Order[]>([])
	const [profile, setProfile] = useState<Profile>({
		mobile: "",
		name: "",
		orders_count: 0,
		status: "",
		registered_at: "",
	})
	const selector = useAppSelector((state) => state.persistedReducer.value)
	const router = useRouter()

	// ** Functions
	const fillOrders = (orders: Order[]) => setOrders(orders)
	const fillProfile = (profile: Profile) => setProfile(profile)

	// ** UseEffects

	useEffect(() => {
		if (!selector.loggedIn) {
			router.push("/")
			return
		}
	}, [])

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
			.then(({ data }) => {
				const fillable = data.data
				fillProfile(fillable)
			})
			.catch((err) => handleResponse(err, "toast"))
	}, [])

	return (
		<div dir="rtl" className="mt-5 pb-48 md:px-10">
			<Tab orders={orders} userProfile={profile} />
		</div>
	)
}

export default DashboardContainer
