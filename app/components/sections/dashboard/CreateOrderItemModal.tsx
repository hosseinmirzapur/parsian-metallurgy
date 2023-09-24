"use client"

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
	return <div>CreateOrderItemModal</div>
}

export default CreateOrderItemModal
