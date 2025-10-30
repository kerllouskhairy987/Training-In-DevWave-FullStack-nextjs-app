import RegisterForm from "@/app/(user)/register/RegisterForm"
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Register - MyApp",
    description: 'Create a new account on MyApp to get started!',
}

const RegisterPage = async () => {
    // const cookieStore = await cookies()
    // const token = cookieStore.get('jwtToken')?.value as string;
    // if (token) redirect("/")

    return (
        <section className="fix-height container m-auto px-7 flex items-center justify-center">
            <div className="m-auto bg-white rounded-lg p-5 w-full md:w-2/3">
                <h1 className="text-3xl font-bold text-gray-800 mb-5">
                    Create New Account
                </h1>
                <RegisterForm />
            </div>
        </section>
    )
}

export default RegisterPage