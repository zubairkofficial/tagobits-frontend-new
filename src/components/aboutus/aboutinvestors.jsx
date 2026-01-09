import Button from "../button";
const AboutInvestors = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-15 lg:gap-20 px-10 bg-gradient-to-br from-[#2A3E9C] to-[#1478C7] py-10 my-50 mx-20 rounded-[60px]">
            <div className="flex flex-col items-center justify-center">
                <span className="urbanist-regular border border-gray-50/10 p-2 rounded-4xl w-fit text-white">Global Impact</span>
                <span className="urbanist-bold text-white text-[64px] text-center mx-100">Ready to Shape the Future of Borderless Payments?</span>
                <span className="urbanist-regular text-white/60 text-[24px] text-center mx-100">Join millions of users, businesses, and partners already moving money with TagoCash</span>
                <div className="flex flex-row gap-10 py-10">
                    <Button
                        background="#ffffff"
                        color="#235BB2"
                        buttontext="Contact Us"
                        border="2px solid #ffffff"
                        hoverBackground="linear-gradient(to right, #2A3E9C, #1478C7)"
                        hoverColor="#ffffff"
                        hoverBorder="2px solid #ffffff"
                    />
                    <Button
                        background=""
                        color="#ffffff"
                        buttontext="Contact Us"
                        border="2px solid #ffffff"
                        hoverBackground="#ffffff"
                        hoverColor="#235BB2"
                        hoverBorder="2px solid #ffffff"
                    />
                </div>
            </div>
        </div>
    )
}

export default AboutInvestors;