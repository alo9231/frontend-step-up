'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
    const pathname = usePathname();
    // 메뉴 리스트 배열 (관리하기 편하게)
    const navItems = [
        { name: 'Home', href: '/'},
        { name: '메모장', href: '/memo'},
        { name: '투두리스트', href: '/todo'},
        { name: '갤러리(Axios)', href: '/gallery'},        
    ]
    return (
        <nav className="flex gap-4 p-4 bg-gray-800 text-white">
            {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={`font-semibold transition-colors hover:text-teal-500 ${
                        pathname === item.href ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-600'
                    }`}
                >
                    {item.name}
                </Link>
                
            ))}         
        </nav>
    )
}