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
	id: number | string
	mobile: string
	customer_name?: string
	requester_name?: string
	result_destination: string
	result_email?: string
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
	const [fired, setFired] = useState(false)

	const selector = useAppSelector((state) => state.persistedReducer.value)
	const router = useRouter()

	// ** Functions
	const fillOrders = (orders: Order[]) => setOrders(orders)
	const fillProfile = (profile: Profile) => setProfile(profile)
	const emitOrderCreate = () => setFired(!fired)
	const emitOrderDelete = () => setFired(!fired)
	const emitOrderUpdate = () => setFired(!fired)

	const authorize = () => {
		if (!selector.loggedIn) {
			router.push("/")
			return
		}
	}

	// ** UseEffects
	useEffect(() => {
		authorize()
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
	}, [fired])

	useEffect(() => {
		authorize()
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
			<Tab
				orders={orders}
				userProfile={profile}
				emitOrderCreate={emitOrderCreate}
				emitOrderDelete={emitOrderDelete}
				emitOrderUpdate={emitOrderUpdate}
			/>
		</div>
	)
}

export default DashboardContainer
