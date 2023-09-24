import OrderPageContainer from "./OrderPageContainer"

interface IParams {
	id: string | number
}

const OrderPage = ({ params }: { params: IParams }) => {
	return <OrderPageContainer orderID={params.id} />
}

export default OrderPage
