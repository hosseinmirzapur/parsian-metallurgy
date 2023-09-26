"use client"

import {
	Button,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
} from "@material-tailwind/react"

interface CreateOrderItemModalProps {
	listener: () => void
	open: boolean
	toggleOpen: () => void
	loading: boolean
	toggleLoading: () => void
}

const CreateOrderItemModal: React.FC<CreateOrderItemModalProps> = ({
	listener,
	open,
	toggleOpen,
	loading,
	toggleLoading,
}) => {
	return (
		<Dialog open={open} handler={toggleOpen} dir="rtl">
			<DialogHeader>افزودن قطعه به سفارش</DialogHeader>
			<DialogBody>Create Modal</DialogBody>
			<DialogFooter className="flex justify-around">
				<Button>تایید</Button>
				<Button color="red" onClick={toggleOpen}>
					لغو
				</Button>
			</DialogFooter>
		</Dialog>
	)
}

export default CreateOrderItemModal
