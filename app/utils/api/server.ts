import axios, { AxiosInstance, AxiosError } from "axios"
import toast from "react-hot-toast"

const server: AxiosInstance = axios.create({
	baseURL: "https://parsian.iran.liara.run/api",
	headers: {
		Accept: "application/json",
	},
})

export const handleResponse = (
	err: AxiosError,
	type: "toast" | "text",
): string => {
	return type === "toast" ? handleToastError(err) : handleTextError(err)
}

const handleToastError = (err: AxiosError) => {
	if (err.response?.status === 400) {
		toast.error("خطایی رخ داده است")
		return ""
	} else if (err.response?.status === 401) {
		toast.error("شما برای انجام این درخواست باید ابتدا وارد شوید")
		return ""
	} else if (err.response?.status === 404) {
		toast.error("نتیجه ای یافت نشد")
		return ""
	} else if (err.response?.status === 405) {
		toast.error("فراخوانی درخواست اشتباه")
		return ""
	} else if (err.response?.status == 422) {
		toast.error("درخواست شما ناقص است")
		return ""
	} else if (err.response?.status === 500) {
		toast.error("خطای سرور")
		return ""
	} else return "خطای ناشناخته"
}

const handleTextError = (err: AxiosError) => {
	if (err.response?.status === 400) {
		return "خطایی رخ داده است"
	} else if (err.response?.status === 401) {
		return "شما برای انجام این درخواست باید ابتدا وارد شوید"
	} else if (err.response?.status === 404) {
		return "نتیجه ای یافت نشد"
	} else if (err.response?.status === 405) {
		return "فراخوانی درخواست اشتباه"
	} else if (err.response?.status == 422) {
		return "درخواست شما ناقص است"
	} else if (err.response?.status === 500) {
		return "خطای سرور"
	} else return "خطای ناشناخته"
}

export default server
