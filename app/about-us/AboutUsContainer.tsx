"use client"

// ** Images
import FactoryImage from "../../public/factory.svg"
import CertificateImage from "../../public/certificate.svg"
import ManagerImage from "../../public/manager.svg"

// ** Components
import Container from "../components/builders/Container"

// ** Other Imports
import Image from "next/image"
import { motion } from "framer-motion"

const AboutUsContainer = () => {
	return (
		<Container className="pt-10 pb-56 overflow-y-hidden">
			<p className="text-center text-p-black text-xl font-semibold">
				درباره پارسیان
			</p>
			<hr className="w-[200px] mx-auto border-t-p-black border-1 mt-1" />

			<Container className="mt-20 flex flex-col gap-20">
				<motion.div
					dir="rtl"
					initial={{ opacity: 0, x: 100, visibility: "hidden" }}
					whileInView={{ opacity: 1, x: 0, visibility: "visible" }}
					viewport={{ once: false }}
					transition={{
						duration: 1,
					}}
					className="
                        flex
                        flex-col
                        md:flex-row
                        gap-16
                        md:gap-24
                        lg:gap-32
                        md:w-11/12
                        mx-auto
                        items-center
                    ">
					<Image
						src={CertificateImage}
						alt="about us"
						draggable={false}
						className="w-[200px] md:w-[300px] lg:w-[400px]"
					/>
					<h3
						className="
                            text-p-black
                            text-base
                            md:text-lg
                            lg:text-xl
                            flex
                            md:items-center
                            md:justify-center
                            h-[250px]
                            md:h-full
                            bg-gray-200
                            md:bg-gray-100
                            overflow-x-auto
                            px-2
                            py-5
                            rounded-xl
                            scroll-smooth
                            opacity-75
                            w-auto
                        ">
						مرکز متالورژی پارسیان یک مرکز خصوص در زمینه مهندسی و فناوری مواد
						است. حوزه خدماتی مرکز تاکید بر زمینه های فلزات است. این مرکز ارائه
						کننده خدمات آزمایشگاهی و مشاوره ای در زمینه های متالورزی و ریخته گری
						می باشد. طراحی و ساخت قطعات و ماشن آلات صنعتی. تامین مواد ( فولاد ها
						و سوپر آلیاژ ها و فلزات آهنی وغیر آهنی …) از بازار های داخلی و خارجی
						و تهیه شناسنامه فنی برای قطعات از جمله فعالیت های مرکز متالورزی
						پارسیان است. یکی از فعالیت های این مرکز بررسی علل تخریب و شکست قطعات
						صنعتی . تعیین طول عمر قطعات می باشد. این مرکز دارای تاییده استاندارد
						ISO 9001-2000 از موسسه TUV Rheiland آلمان می باشد.
					</h3>
				</motion.div>
				<motion.div
					dir="rtl"
					initial={{ opacity: 0, x: -100, visibility: "hidden" }}
					whileInView={{ opacity: 1, x: 0, visibility: "visible" }}
					viewport={{ once: true }}
					transition={{
						duration: 1,
					}}
					className="
                        flex
                        flex-col-reverse
                        md:flex-row
                        gap-16
                        md:gap-24
                        lg:gap-32
                        md:w-11/12
                        lg:w-10/12
                        mx-auto
                        items-center
                        mt-10
                    ">
					<h3
						className="
                            text-p-black
                            text-base
                            md:text-lg
                            lg:text-xl
                            flex
                            md:items-center
                            md:justify-center
                            h-[250px]
                            md:h-full
                            bg-gray-200
                            md:bg-gray-100
                            overflow-x-auto
                            px-2
                            py-5
                            rounded-xl
                            scroll-smooth
                            opacity-75
                            w-auto
                        ">
						مرکز متالورژی پارسیان در اردیبهشت ماه سال 1392 با هدف براورده نمودن
						نیازهای آزمایشگاهی بخش صنعت تاسیس شد. خط مشی مرکز جلب رضایت مشتریان
						با تاکید بر انجام آزمایشات دقیق و کامل بر روی قطعات و طراحی و ساخت
						قطعات و تحویل به موقع آن می باشد. بدین منظور مرکز متالورژی پارسیان
						با استفاده از نیروهای متحصص در رشته های متالورژی و مکانیک با سابقه
						زیاد و مرتبط با صنعت و همچنین بهره گیری از دستگاه های پیشرفته
						آزمایشگاهی و کنترل نظیر کوانتومتر ثابت و کوانتومتر پرتابل. سختی سنج
						ثابت وسختی سنج پرتابل دستگاه UT تست ضخامت سنج. تجهیزات متالوگرافی. و
						… فعالیت ها می نماید.
					</h3>
					<Image
						src={FactoryImage}
						alt="factory"
						draggable={false}
						className="w-[200px] md:w-[300px] lg:w-[400px]"
					/>
				</motion.div>

				<motion.div
					dir="rtl"
					initial={{ opacity: 0, x: 100, visibility: "hidden" }}
					whileInView={{ opacity: 1, x: 0, visibility: "visible" }}
					viewport={{ once: true }}
					transition={{
						duration: 1,
					}}
					className="
                        flex
                        flex-col
                        md:flex-row
                        gap-16
                        md:gap-24
                        lg:gap-32
                        md:w-11/12
                        lg:w-10/12
                        mx-auto
                        items-center
                        mt-10
                    ">
					<Image
						src={ManagerImage}
						alt="manager-image"
						draggable={false}
						className="w-[200px] md:w-[300px] lg:w-[400px]"
					/>
					<h3
						className="
                            text-p-black
                            text-base
                            md:text-lg
                            lg:text-xl
                            flex
                            md:items-center
                            md:justify-center
                            h-[250px]
                            md:h-full
                            bg-gray-200
                            md:bg-gray-100
                            overflow-x-auto
                            px-2
                            py-5
                            rounded-xl
                            scroll-smooth
                            opacity-75
                            w-auto
                        ">
						مرکز متالورژی پارسیان با هدف بهبود و اثر بخشی عملکرد اقدام به ایجاد
						سیستم مدیریت کیفیت نموده است. سیستم مدیریت کیفیت در تمامی فعالیت های
						مرکز مورد استفاده قرار می گیرد. همچنین مرکز متالورژی پارسیان این
						امکان را دارد که در صورت در خواست مشتری آزمایشات را در حضور بازرس و
						یا مشتری انجام داده و امکان آنالیز با دستگاه پرتابل در محل را نیز
						فراهم ساخته است.
					</h3>
				</motion.div>
			</Container>
		</Container>
	)
}

export default AboutUsContainer
