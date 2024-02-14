"use client"

import React from 'react'
import {Card, CardHeader, CardBody, CardFooter, Divider, Image} from "@nextui-org/react";
import {Listbox, ListboxItem, cn} from "@nextui-org/react";
import { ContactData } from '@/data/Data';
import Link from 'next/link';
import { motion } from "framer-motion";
import { slideInFromTop } from "@/providers/motion";
const Contact = () => {
    return (
        <motion.section initial="hidden" animate="visible" className='container'>
            <motion.p variants={slideInFromTop(0.5)}  className="text-warning text-7xl font-bold mb-3">Contact</motion.p>
            <motion.div variants={slideInFromTop(0.8)} className="pt-10 flex items-center justify-center p-2">
                <Card className="max-w-[500px]">
                    <CardHeader className="flex gap-3 items-center justify-center">
                        <Image
                        alt="nextui logo"
                        height={40}
                        radius="sm"
                        src={ContactData[0].img}
                        width={40}
                        />
                        <div className="flex flex-col">
                        <p className="text-md text-2xl font-bold">{ContactData[0].name}</p>
                        </div>
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                        {
                            ContactData[0].points.map((i, index)=>(
                                <p key={index} className='text-justify px-2'>{i}</p>   
                            ))
                        }
                    </CardBody>
                    <Divider/>
                    <CardFooter>
                    <div className="w-full border-small rounded-small border-default-200 dark:border-default-100">
                        <Listbox variant="faded" aria-label="Listbox menu with icons">
                        {
                            ContactData[0].social.map((j)=>(
                                <ListboxItem
                                key={j.id}
                                startContent={j.icon}
                                textValue={j.name}
                                >
                                <Link href={j.link} target="_blank" >{j.name}</Link>
                                </ListboxItem>
                            ))
                        }                            
                        </Listbox>
                    </div>
                    </CardFooter>
                </Card>
            </motion.div>
        </motion.section>
    )
}

export default Contact