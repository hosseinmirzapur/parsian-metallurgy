"use client"

interface ContainerProps {
	children: React.ReactNode
	className?: string
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
	return (
		<div className={`w-11/12 mx-auto ${className}`} dir="rtl">
			{children}
		</div>
	)
}

export default Container
