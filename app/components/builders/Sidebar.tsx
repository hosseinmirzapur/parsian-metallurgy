import {
	Drawer,
	Button,
	Typography,
	IconButton,
	List,
	ListItem,
	ListItemPrefix,
	ListItemSuffix,
	Chip,
} from "@material-tailwind/react"

import Link from "next/link"
import { IconType } from "react-icons/lib"
import { AiOutlineCloseCircle } from "react-icons/ai"

interface SidebarProps {
	open: boolean
	items: SidebarItem[]
	toggleOpen: () => void
}

export interface SidebarItem {
	text: string
	link?: string
	icon?: IconType
	onClick?: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ open, items, toggleOpen }) => {
	return (
		<Drawer
			open={open}
			onClose={toggleOpen}
			placement="right"
			dir="rtl"
			className="bg-p-black">
			<div className="flex justify-between items-center p-4">
				<Typography variant="h5" className="text-p-white">
					منو
				</Typography>
				<AiOutlineCloseCircle
					size={24}
					className="cursor-pointer text-p-white"
					onClick={toggleOpen}
				/>
			</div>

			<List>
				{items.map((item, index) => (
					<ListItem
						key={index}
						className="gap-4"
						onClick={() => {
							if (item.onClick) {
								item.onClick()
							}
							toggleOpen()
						}}>
						{item.icon && (
							<ListItemPrefix>
								<item.icon size={24} className="text-p-white" />
							</ListItemPrefix>
						)}
						{item.link ? (
							<Link href={item.link} className="text-p-white font-medium">
								{item.text}
							</Link>
						) : (
							<p className="text-p-white font-medium">{item.text}</p>
						)}
					</ListItem>
				))}
			</List>
		</Drawer>
	)
}

export default Sidebar
