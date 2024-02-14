"use client"
import React from 'react'
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import { ProjectData } from '@/data/Data';
import { MdOutlineDateRange } from "react-icons/md";
import {Chip} from "@nextui-org/react";
import {ScrollShadow, Button, Link} from "@nextui-org/react";
import { FaGithub } from "react-icons/fa";

import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromTop } from "@/providers/motion";

const Projects = () => {
    return (
        <motion.section initial="hidden" animate="visible" className='container'>
            <motion.p variants={slideInFromTop(0.5)} className="text-warning text-7xl font-bold mb-3">Projects</motion.p>
            <div className="grid lg:grid-cols-3 w-full justify-center gap-5">
                {
                    ProjectData.map((i) => (
                        <motion.span variants={slideInFromLeft(i.animation)}  key={i.id}>
                        <Card className="py-4">
                            <CardBody className="overflow-visible py-2">
                                <Image
                                    isBlurred
                                    isZoomed
                                    alt={i.title}
                                    className="object-cover rounded-xl"
                                    src={i.img}
                                    width={500}
                                    height={240}
                                />
                            </CardBody>
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                <h4 className="font-bold text-large text-primary my-2">{i.title}</h4>
                                <Chip className='mb-2' size='sm' startContent={<MdOutlineDateRange size={15} />} variant="faded" color="secondary">{i.date}</Chip>
                                <ScrollShadow className="h-[150px]">
                                    <p className='text-justify	'>{i.desc}</p>
                                </ScrollShadow>
                                <div className="flex gap-1 my-2">
                                    {
                                        i.tech.map((j, index)=>(
                                            <Chip size="sm" key={index}>{j}</Chip>
                                        ))
                                    }
                                </div>
                                <Button
                                className='mt-2'
                                    href={i.link}
                                    as={Link}
                                    color="primary"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variant="shadow"
                                    >
                                    <FaGithub className='h-6 w-6' /> Source
                                    </Button>
                            </CardHeader>
                        </Card>
                        </motion.span>
                    ))
                }
            </div>
        </motion.section>
    )
}

export default Projects