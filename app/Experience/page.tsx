"use client"

import React from 'react'
import {Card, CardHeader, CardBody, Image, Chip} from "@nextui-org/react";
import { ExperienceData } from '@/data/Data';

import { motion } from "framer-motion";
import { slideInFromTop } from "@/providers/motion";

const Experience = () => {
    return (
        <motion.section initial="hidden" animate="visible" className='container'>
            <motion.p variants={slideInFromTop(0.5)} className="text-warning lg:text-7xl text-6xl font-bold mb-3">Experience</motion.p>
            <div className="pt-10 flex items-center justify-center p-2">
            
                <ol className="relative border-s border-gray-200 dark:border-gray-700 lg:w-1/2 w-full"> 
                {
                    ExperienceData.reverse().map((i) => (
                    <motion.li variants={slideInFromTop(i.animation)} className="mb-10 ms-10" key={i.id}>            
                        <span className="absolute flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full -start-5 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                            <Image className="rounded-full shadow-lg" src={i.img} alt="Bonnie image" />
                        </span>
                        <Card className="p-4">
                            <CardBody className="overflow-visible py-2">
                                <h4 className="my-1 font-bold text-large text-primary">{i.comp}</h4>
                                <Chip size="sm" className='my-1 '>{i.form_to}</Chip>
                                <p className="my-1 text-tiny font-bold">{i.points}</p>
                            </CardBody>
                        </Card>
                    </motion.li>
                    ))
                }
                </ol>

            </div>
        </motion.section>
    )
}

export default Experience