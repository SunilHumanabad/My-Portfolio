"use client"
import React from 'react'
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarContent, NavbarItem, Button} from "@nextui-org/react"
import { Zen_Dots } from 'next/font/google';
const zen_Dots = Zen_Dots({ weight: "400", subsets: ["latin"] });
import { brand, menuItems } from '@/data/Data';
import Link from 'next/link';

const NavMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    
    return (
        <Navbar shouldHideOnScroll isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} className={zen_Dots.className}>

        <NavbarContent className="sm:hidden pr-3" justify="center">
            <NavbarBrand>
                <p className="text-xl font-bold text-inherit">{brand}</p>
            </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="sm:hidden" justify="end">
            <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu" } />
        </NavbarContent>


        <NavbarContent className="hidden sm:flex gap-4" justify="end">
            <NavbarBrand>
                <p className="text-xl font-bold text-inherit">{brand}</p>
            </NavbarBrand>
            {
                menuItems.map((i) => (
                    <NavbarItem key={i.id}>
                        <Link color="foreground" href={i.link}>
                            {i.label}
                        </Link>
                    </NavbarItem>
                    ))
            }
            <NavbarItem>
            </NavbarItem>
        </NavbarContent>

        <NavbarMenu className={zen_Dots.className}>
            <center>
            {
                menuItems.map((i) => (
                    <NavbarMenuItem key={i.id} className='my-5'>
                        <Link className="w-full" color="foreground" href={i.link} >
                        {i.label}
                        </Link>
                    </NavbarMenuItem>
                ))
            }
            </center>
        </NavbarMenu>
        </Navbar>
    )
}

export default NavMenu