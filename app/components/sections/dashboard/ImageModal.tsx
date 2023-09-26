"use client"

import {
	Button,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
} from "@material-tailwind/react"
import Image from "next/image"

interface ImageModalProps {
	imgSrc: string
	open: boolean
	toggleOpen: () => void
}

const ImageModal: React.FC<ImageModalProps> = ({
	imgSrc,
	open,
	toggleOpen,
}) => {
	return (
		<>
			<Dialog open={open} handler={toggleOpen} dir="rtl">
				<DialogHeader>
					<p className="text-p-black text-lg">تصویر قطعه</p>
				</DialogHeader>

				<DialogBody className="flex items-center justify-center">
					<Image
						alt="item-pic"
						src={imgSrc}
						width={400}
						height={400}
						className="object-cover"
						loading="eager"
					/>
				</DialogBody>

				<DialogFooter className="flex items-center justify-center">
					<Button color="red" variant="gradient" onClick={toggleOpen}>
						متوجه شدم
					</Button>
				</DialogFooter>
			</Dialog>
		</>
	)
}

export default ImageModal
