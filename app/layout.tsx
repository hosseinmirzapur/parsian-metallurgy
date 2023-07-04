import Footer from "./components/layouts/Footer"
import Header from "./components/layouts/Header"
import "./globals.css"
import { Noto_Sans_Arabic } from "next/font/google"

const arab = Noto_Sans_Arabic({
	subsets: ["arabic"],
})

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
				<Footer />
			</body>
		</html>
	)
}
