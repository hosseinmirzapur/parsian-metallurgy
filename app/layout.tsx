import { Metadata } from "next"
import Footer from "./components/layouts/Footer"
import Header from "./components/layouts/Header"
import "./globals.css"
import { Noto_Sans_Arabic } from "next/font/google"
import Support from "./components/builders/Support"

const arab = Noto_Sans_Arabic({
	subsets: ["arabic"],
})

export const metadata: Metadata = {
	title: "متالورژی پارسیان",
	description: "بزرگترین ",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="fa">
			<body className={arab.className}>
				<Header />
				{children}
				<Support />
				<Footer />
			</body>
		</html>
	)
}
