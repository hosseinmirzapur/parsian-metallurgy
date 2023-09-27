"use client"

import { useState } from "react"
import Image from "next/image"

import {
	Alert,
	Button,
	Checkbox,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
	Input,
	Option,
	Select,
	Textarea,
} from "@material-tailwind/react"

import toast from "react-hot-toast"
import server, { handleResponse } from "@/app/utils/api/server"
import { useAppSelector } from "@/redux/store"

interface CreateOrderItemModalProps {
	listener: () => void
	open: boolean
	toggleOpen: () => void
	loading: boolean
	enableLoading: () => void
	cancelLoading: () => void
	orderID: number | string
}

type TestType = "ANALYZE" | "HARDNESS" | "BOTH"

interface OrderItemCreateSchema {
	name: string
	sand_paper: boolean
	destruction: boolean
	test_type: TestType
	quantity: number
	description?: string
	order_id: number | string
}

const CreateOrderItemModal: React.FC<CreateOrderItemModalProps> = ({
	listener,
	open,
	toggleOpen,
	loading,
	enableLoading,
	cancelLoading,
	orderID,
}) => {
	// ** variables
	const [orderItem, setOrderItem] = useState<OrderItemCreateSchema>()
	const [image, setImage] = useState<File>()
	const [imagePreview, setImagePreview] = useState<string>()
	const [error, setError] = useState("")
	const [alertOpen, setAlertOpen] = useState(true)

	// ** redux
	const selector = useAppSelector((state) => state.persistedReducer.value)

	// ** functions
	const toggleAlert = () => setAlertOpen(!alertOpen)

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setImage(e.target.files[0])
			setImagePreview(URL.createObjectURL(e.target.files[0]))
		}
	}

	const handleClearImage = () => {
		setImage(undefined)
		setImagePreview("")
	}

	const clearAllInputs = () => {
		setOrderItem(undefined)
		setImage(undefined)
		setImagePreview("")
		setError("")
	}

	const validateData = (): boolean => {
		if (!orderItem?.name) {
			setError("وارد کردن نام قطعه اجباری است")
			return false
		}

		if (!orderItem?.test_type) {
			setError("تعیین نوع آزمون روی قطعه اجباری است")
			return false
		}

		if (!orderItem?.quantity) {
			setError("وارد کردن تعداد این قطعه اجباری است")
			return false
		}

		if (orderItem?.quantity < 1) {
			setError("تعداد قطعه نمیتواند از یک کمتر باشد")
			return false
		}

		return true
	}

	const acceptOrderItem = async () => {
		enableLoading()
		if (!validateData()) {
			return false
		}
		const fd = new FormData()
		fd.append("name", orderItem?.name!)
		fd.append("sand_paper", orderItem?.sand_paper ? "1" : "0")
		fd.append("destruction", orderItem?.destruction ? "1" : "0")
		fd.append("test_type", orderItem?.test_type!)
		fd.append("quantity", orderItem?.quantity?.toString()!)
		fd.append("description", orderItem?.description!)
		fd.append("order_id", orderID as string)
		if (image) fd.append("image", image)

		await server
			.post("/order-item", fd, {
				headers: {
					Authorization: `Bearer ${selector.token}`,
				},
			})
			.then(() => {
				listener()
				toggleOpen()
				toast.success("قطعه مورد نظر با موفقیت به سفارش افزوده شد")
			})
			.catch((err) => {
				setError(handleResponse(err, "text"))
			})
			.finally(() => cancelLoading())
	}

	return (
		<Dialog
			open={open}
			handler={() => {
				clearAllInputs()
				toggleOpen()
				setAlertOpen(true)
				cancelLoading()
			}}
			dir="rtl"
			className="h-[42rem] overflow-y-scroll">
			<DialogHeader>افزودن قطعه به سفارش</DialogHeader>
			<DialogBody className="flex flex-col gap-4 md:w-10/12 md:mx-auto">
				<Input
					type="text"
					label="نام قطعه"
					onChange={(e) =>
						setOrderItem({
							...orderItem!,
							name: e.target.value,
						})
					}
				/>
				<div className="flex items-center gap-4">
					<Checkbox
						label={<p className="text-p-black font-normal">اجازه سنگ سنباده</p>}
						onChange={(e) =>
							setOrderItem({
								...orderItem!,
								sand_paper: e.target.checked,
							})
						}
					/>
					<Checkbox
						label={
							<p className="text-p-black font-normal">
								اجازه تخریب بعد از آزمایش
							</p>
						}
						onChange={(e) =>
							setOrderItem({
								...orderItem!,
								destruction: e.target.checked,
							})
						}
					/>
				</div>
				{!orderItem?.destruction && (
					<Alert
						open={alertOpen}
						onClose={toggleAlert}
						className="space-x-1"
						color="orange">
						<div>
							<span className="text-p-black font-medium">
								در صورت عدم اجازه تخریب،
							</span>{" "}
							<span className="underline text-p-white font-medium">احتمال</span>{" "}
							<span className="text-p-black font-medium">
								خطا در جواب آزمون وجود دارد.
							</span>
						</div>
					</Alert>
				)}
				<Select
					label={"نوع آزمون"}
					onChange={(text) => {
						setOrderItem({
							...orderItem!,
							test_type: text as TestType,
						})
					}}>
					<Option value="ANALYZE">آنالیز</Option>
					<Option value="HARDNESS">سختی</Option>
					<Option value="BOTH">هر دو</Option>
				</Select>
				<Input
					type="number"
					label="تعداد"
					onChange={(e) =>
						setOrderItem({
							...orderItem!,
							quantity: parseInt(e.target.value),
						})
					}
				/>
				<Textarea
					label="توضیحات (اختیاری)"
					onChange={(e) =>
						setOrderItem({
							...orderItem!,
							description: e.target.value,
						})
					}
					resize
				/>
				<Input
					type="file"
					accept="image/*"
					label="تصویر قطعه (اختیاری)"
					onChange={(e) => {
						if (e.target.files && e.target.files[0]) {
							handleImageChange(e)
						}
					}}
				/>

				{image && (
					<div className="flex flex-col items-center justify-center gap-4">
						<Image
							src={imagePreview!}
							width={400}
							height={400}
							alt="image preview"
						/>
						<Button color="red" variant="gradient" onClick={handleClearImage}>
							این عکس مد نظرتان نیست؟
						</Button>
					</div>
				)}
			</DialogBody>
			<DialogFooter className="flex flex-col gap-3">
				{error && (
					<p className="font-medium text-center text-red-600">{error}</p>
				)}
				<div className="flex gap-5">
					<Button disabled={loading} onClick={acceptOrderItem}>
						تایید
					</Button>
					<Button color="red" onClick={toggleOpen}>
						لغو
					</Button>
				</div>
			</DialogFooter>
		</Dialog>
	)
}

export default CreateOrderItemModal
