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
}

const Tab: React.FC<TabProps> = ({ orders, userProfile }) => {
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
						{value == "orders" && <OrdersTable orders={orders} key={index} />}

						{value === "profile" && (
							<UserProfile profile={userProfile} key={index} />
						)}
					</TabPanel>
				))}
			</TabsBody>
		</Tabs>
	)
}

export default Tab
