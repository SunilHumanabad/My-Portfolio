"use client"
import React from "react";
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";

import { Roboto_Mono } from 'next/font/google';
const zen_Dots = Roboto_Mono({ weight: "400", subsets: ["latin"] });

import { VscTools } from "react-icons/vsc";
import { FaRegUser } from "react-icons/fa";

import {CircularProgress} from "@nextui-org/react";
import { AboutData, ProjectData, ExperienceData, SkillsData } from "@/data/Data";
import { motion } from "framer-motion";
import { slideInFromTop } from "@/providers/motion";

const About = () => {

    return (
        <motion.section initial="hidden" animate="visible" className="container h-screen">
            <motion.p variants={slideInFromTop(0.5)} className="text-warning text-7xl font-bold lg:-mb-5 mb-3">About</motion.p>
            <div className="grid lg:grid-cols-2 w-full justify-center gap-10">
                <motion.div variants={slideInFromTop(0.7)} className={zen_Dots.className}>
                    <Card className="w-full p-5 lg:mt-14">
                        <p className="my-3 text-xl font-bold text-warning">About ( me ) &#123;</p>
                        {
                            AboutData.map((i, index) => (
                                <p className="my-3 text-lg text-success px-5 lg:px-10" key={index}>&#47;&#47; {i}</p>
                            ))
                        }
                        <p className="my-3 text-xl font-bold text-warning">&#125;</p>
                    </Card>
                </motion.div>
                <motion.div variants={slideInFromTop(0.9)} className="">
                    <div className="flex w-full flex-col">
                        <Tabs aria-label="Options">
                            <Tab key="frontend" title={
                                    <div className="flex items-center space-x-2">
                                        <FaRegUser className="h-4 w-4" />
                                        <span>About Me</span>
                                    </div>
                                }>
                                <Card>
                                    <CardBody>
                                        {/* Body start */}
                                        <div className="grid grid-cols-2 text-center">
                                        <Card isBlurred className="m-2 p-2">
                                            <p className="text-8xl font-bold mt-5">0{Object.keys(ProjectData).length}</p>
                                            <p className="my-5 text-xl font-bold">Project</p>
                                        </Card>
                                        <Card isBlurred className="m-2 p-2">
                                            <p className="text-8xl font-bold mt-5">0{Object.keys(ExperienceData).length -1}</p>
                                            <p className="my-5 text-xl font-bold">Experience</p>
                                        </Card>
                                        </div>
                                        {/* Body end */}                                        
                                    </CardBody>
                                </Card>
                            </Tab>
                            <Tab key="technology" title={
                                    <div className="flex items-center space-x-2">
                                        <VscTools className="h-5 w-5" />
                                        <span>Technology</span>
                                    </div>
                                }>
                                <Card className="py-4">
                                    <CardBody className="overflow-visible p-5">
                                        <div className="grid lg:grid-cols-4 grid-cols-2 gap-5">
                                            {
                                                SkillsData.map((i) => (
                                                    <center key={i.id} className="p-2 border-2 rounded-lg border-gray-500 h-[130px] w-[130px]">
                                                        <small className="text-default-500">{i.prog}</small>
                                                        <h4 className="font-bold text-large">{i.tec}</h4>
                                                        <CircularProgress
                                                            aria-label="Loading..."
                                                            size="lg"
                                                            value={i.skill}
                                                            color="warning"
                                                            showValueLabel={true}
                                                            />
                                                    </center>
                                                ))
                                            }                                            
                                        </div>
                                    </CardBody>
                                </Card>
                            </Tab>
                        </Tabs>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    )
}

export default About