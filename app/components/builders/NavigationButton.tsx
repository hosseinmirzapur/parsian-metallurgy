"use client"

import { BiChevronRight, BiChevronLeft } from "react-icons/bi"

interface NavigationButtonProps {
	onNext: () => void
	onPrevious: () => void
	type: "previous" | "next"
	disabled: boolean
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
	onNext,
	onPrevious,
	type,
	disabled,
}) => {
	// ** Functions
	const handleClick = () => {
		if (type === "previous") {
			onPrevious()
		} else {
			onNext()
		}
	}

	return (
		<button
			disabled={disabled}
			className="
				disabled:cursor-not-allowed
				lg:cursor-pointer
				disabled:opacity-50
				text-p-white
				flex
				items-center
				justify-center
			">
			{type === "previous" ? (
				<BiChevronLeft
					onClick={handleClick}
					size={25}
					className="hover:shadow-md ease-in duration-300"
				/>
			) : (
				<BiChevronRight
					onClick={handleClick}
					size={25}
					className="hover:shadow-md ease-in duration-300"
				/>
			)}
		</button>
	)
}

export default NavigationButton
