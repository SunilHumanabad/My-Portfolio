"use client"
import { HeroData, ContactData } from "@/data/Data";
import TextAnimation from "@/providers/TextAnimation";
import { slideInFromTop } from "@/providers/motion";
import {Image} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import { motion } from "framer-motion";
import Link from "next/link";


const Home = () => {
    return (
        <motion.section initial="hidden" animate="visible" className="container py-10">
            <div  className="grid lg:grid-cols-2 w-full items-center justify-center py-5">
                <motion.div  variants={slideInFromTop(0.5)} className="order-2 lg:order-2 text-center font-bold lg:text-start mt-8 lg:m-0">
                    <p className="my-3 text-xl lg:text-2xl text-warning">Hello👋, I am</p>
                    <p className="my-3 text-4xl lg:text-6xl">{HeroData[0].name}<span className="text-primary">.</span></p>
                    <p className="my-3 text-xl lg:text-2xl">And I&apos;m a <TextAnimation data={HeroData[0].tech} /></p>
                    {
                        HeroData[0].about.map((i) => (
                            <p className="my-3 text-xl font-normal" key={i.id}>{i.data}</p>
                        ))
                    }
                    <div className="flex justify-center items-center gap-5 mt-10">
                    <Button href={'/About'} as={Link} color="primary" variant="shadow" className="w-1/2 lg:w-1/4">About Me</Button>
                    <Button href={ContactData[0].social[3].link} target="_blank" as={Link} color="warning" variant="shadow" className="w-1/2 lg:w-1/4 text-white">Download CV</Button>
                    </div>
                </motion.div>
                <motion.div  variants={slideInFromTop(0.8)} className="order-1 lg:order-2 grid place-content-center">
                <Image
                    isBlurred
                    height={500}
                    width={500}
                    src={HeroData[0].img}
                    alt={HeroData[0].name}
                    className="rounded-full border-3 bg-blue-600/5 border-blue-600 img-shadow"
                    />
                </motion.div>
            </div>
        </motion.section>
    )
}

export default Home