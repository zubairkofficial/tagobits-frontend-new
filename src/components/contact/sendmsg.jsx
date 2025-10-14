import { FaStar } from "react-icons/fa6";
const SendMsg = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20 mx-15">
            <div className="flex xl:flex-row flex-col items-center justify-center w-full">
                <div className="flex flex-col gap-10 w-1/2 justify-center items-center">
                    <div className="flex flex-col gap-10 w-1/2">
                        <div className="flex flex-col justify-center xl:items-start gap-5">
                            <div className="flex flex-row items-center gap-2 urbanist-regular border border-gray-200 p-3 rounded-4xl w-fit">
                                <div className="text-primary">
                                <FaStar />
                                </div>
                                Connect
                            </div>
                            <span className="urbanist-bold text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] text-center xl:text-left text-primary leading-[1.1]">
                                Send us a message
                            </span>
                        </div>
                        <div className="flex flex-col justify-center xl:items-start">
                            <span className="text-[16px] w-full sm:text-[18px] md:text-[20px] urbanist-regular text-center xl:text-left max-w-[780px] text-black">
                            We’re here to help! Reach out with your questions, feedback, or suggestions, and we’ll get back to you as soon as possible.”                            </span>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 flex justify-center items-center">
                <form className="border border-gray-200 rounded-2xl p-8 w-full max-w-[560px] h-[598px]">
                    <div className="mb-6">
                        <label htmlFor="name" className="block mb-2 urbanist-medium text-gray-900">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="block w-full rounded-lg border border-gray-200 bg-white/60 px-4 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-primary transition-shadow"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 urbanist-medium text-gray-900">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="block w-full rounded-lg border border-gray-200 bg-white/60 px-4 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-primary transition-shadow"
                        />
                    </div>
                    <div className="mb-8">
                        <label htmlFor="message" className="block mb-2 urbanist-medium text-gray-900">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            className="block w-full rounded-lg border border-gray-200 bg-white/60 px-4 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-primary transition-shadow resize-none"
                        ></textarea>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="urbanist-semibold bg-primary text-white rounded-xl px-6 py-2 hover:bg-[#214AA2] transition-colors"
                        >
                            Send
                        </button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    )
}

export default SendMsg;