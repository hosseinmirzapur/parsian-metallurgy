import {
	Tabs,
	TabsHeader,
	TabsBody,
	Tab as SingularTab,
	TabPanel,
} from "@material-tailwind/react"

import { IconType } from "react-icons/lib"
import { GiMetalScales } from "react-icons/gi"
import { ImProfile } from "react-icons/im"

import OrdersTable from "./OrdersTable"
import UserProfile from "./UserProfile"
import { Order, Profile } from "@/app/dashboard/DashboardContainer"
import FastAccess from "./FastAccess"
import { useState } from "react"

interface TabData {
	label: string
	value: string
	icon: IconType
}

const tabData: TabData[] = [
	{
		label: "سفارشات",
		value: "orders",
		icon: GiMetalScales,
	},
	{
		label: "پروفایل",
		value: "profile",
		icon: ImProfile,
	},
]

interface TabProps {
	orders: Order[]
	userProfile: Profile
	emitOrderCreate?: () => void
	emitOrderDelete?: () => void
	emitOrderUpdate?: () => void
	changedEvent: () => void
}

const Tab: React.FC<TabProps> = ({
	orders,
	userProfile,
	emitOrderCreate,
	emitOrderDelete,
	emitOrderUpdate,
	changedEvent,
}) => {
	// ** Variables
	const [newOrder, setNewOrder] = useState(false)

	// ** Functions
	const toggleNewOrder = () => setNewOrder(!newOrder)

	return (
		<Tabs value={"orders"}>
			<TabsHeader>
				{tabData.map(({ label, value, icon: Icon }) => (
					<SingularTab key={value} value={value}>
						<div className="flex items-center gap-2">
							<Icon size={24} />
							{label}
						</div>
					</SingularTab>
				))}
			</TabsHeader>
			<TabsBody>
				{tabData.map(({ value }, index) => (
					<TabPanel key={index} value={value}>
						{value === "orders" && (
							<>
								<OrdersTable
									orders={orders}
									key={index}
									newOrder={newOrder}
									toggleNewOrder={toggleNewOrder}
									emitOrderCreate={emitOrderCreate}
									emitOrderDelete={emitOrderDelete}
									emitOrderUpdate={emitOrderUpdate}
								/>
								<FastAccess toggleNewOrder={toggleNewOrder} />
							</>
						)}

						{value === "profile" && (
							<UserProfile
								profile={userProfile}
								key={index}
								changedEvent={changedEvent}
							/>
						)}
					</TabPanel>
				))}
			</TabsBody>
		</Tabs>
	)
}

export default Tab
