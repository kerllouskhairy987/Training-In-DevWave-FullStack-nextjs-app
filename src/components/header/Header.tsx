import Link from 'next/link'
import styles from "./header.module.css";
import Navbar from './Navbar';
import { cookies } from 'next/headers';
import { verifyTokenForPages } from '@/utils/verifyToken';
import LogoutBtn from './LogoutBtn';

const Header = async () => {

    const cookieStore = await cookies()
    const token = cookieStore.get('jwtToken')?.value as string;
    const user = await verifyTokenForPages(token);

    return (
        <header className={styles.header}>
            <Navbar isAdmin={user?.isAdmin || false} />
            <div className={styles.right}>
                {
                    user ?
                        <>
                            <Link href={"/profile"} className='flex items-center gap-2 border rounded-md ps-2'>
                                <span className='font-bold text-lg'>Profile</span>
                                <span className=' px-2 py-1 bg-purple-600 rounded-md text-white'>
                                    {user.username.split(" ").map(word => word[0].toUpperCase()).join(" ")}
                                </span>
                            </Link>
                            <LogoutBtn />
                        </>
                        :
                        <>
                            <Link className={styles.btn} href="/login">Login</Link>
                            <Link className={styles.btn} href="/register">Register</Link>
                        </>

                }
            </div>
        </header>
    )
}

export default Header