"use client";
import Link from "next/link";
import styles from './header.module.css';
import { Home, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
    const [toggle, setToggle] = useState(false);

    return (
        <nav className={styles.navbar}>
            <div>
                <Link href="/" className={styles.logo}>
                    CLOUD
                    <Home />
                    HOSTING
                </Link>
                <div className={styles.menu}>
                    {toggle ? (<X onClick={() => setToggle(prev => !prev)} />) : (<Menu onClick={() => setToggle(prev => !prev)} />)}
                </div>
            </div>
            <div
                className={styles.navLinksWrapper}
                style={{
                    clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)" || ""
                }}
            >
                <ul className={styles.navLinks}>
                    <Link onClick={() => setToggle(false)} className={styles.navLink} href="/">Home</Link>
                    <Link onClick={() => setToggle(false)} className={styles.navLink} href="/articles?pageNumber=1">Articles</Link>
                    <Link onClick={() => setToggle(false)} className={styles.navLink} href="/about">About</Link>
                    <Link onClick={() => setToggle(false)} className={styles.navLink} href="/admin">Admin Dashboard</Link>
                    {/* {isAdmin && (
                        <Link onClick={() => setToggle(false)} className={styles.navLink} href="/admin">Admin Dashboard</Link>
                    )} */}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;