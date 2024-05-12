import { FaGithub, FaLinkedin  } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { GrDocumentPdf } from "react-icons/gr";

export const brand = "Sunil Humanabad"

export const menuItems = [
    {
        id: 1,
        label: "<Home/>",
        link: "/"
    },
    {
        id: 2,
        label: "<About/>",
        link: "/About"
    },
    {
        id: 3,
        label: "<Projects/>",
        link: "/Projects"
    },
    {
        id: 4,
        label: "<Experience/>",
        link: "/Experience"
    },
    {
        id: 5,
        label: "<Contact/>",
        link: "/Contact"
    },
];

// Hero section
export const HeroData = [
    {
        name : "$unil Humanabad",
        img : "./Sunil.png",
        tech : [
            // Technology , duration
            'Full Stack Developer.', 1000,
            'Python Developer.', 1000,
            'Node JS Developer.', 1000
            ],
        about: [
            {
                id: 1,
                data :"Empowering users through seamless integration of frontend and backend technologies."
            }            
        ]
    },
]

// About Me
export const AboutData = [
    "Hello! I'm Sunil Humanabad. I'm a Web Designer & Web Developer.",
    "I am adept at Python, NodeJS and PHP. I thrive in dynamic environments, leveraging my adaptability to drive successful outcomes.",
    "Within this portfolio, you'll find a showcase of my most significant projects, each demonstrating my commitment to excellence and my ability to deliver impactful results.",
]

// Skills
export const SkillsData = [
    {
        id: 1,
        prog: "Python",
        tec: "Django",
        skill: 80
    },
    {
        id: 2,
        prog: "Java Script",
        tec: "React",
        skill: 70
    },
    {
        id: 3,
        prog: "Java Script",
        tec: "Next JS",
        skill: 70
    },
    {
        id: 4,
        prog: "Java Script",
        tec: "Express JS",
        skill: 70
    },
    {
        id: 5,
        prog: "RDBMS",
        tec: "MySQL",
        skill: 80
    },
    {
        id: 6,
        prog: "DBMS",
        tec: "MongoDB",
        skill: 50
    },
    {
        id: 7,
        prog: "PHP",
        tec: "Wordpress",
        skill: 90
    },
]
// Project Details
export const ProjectData = [
    {
        id : 1,
        title : "CIE-Marks-Entry-System",
        date : "Sep 20th 2022",
        desc : "Project aims at entering the marks obtained by the students in three different CIEs. Further, it selects the best two marks obtained out of 15 and calculates its average and then adds it with the assignment marks and displays the marks of the student out of 50",
        tech : ['HTML', 'CSS', 'JS', 'JQuery', 'Ajax', 'PHP', 'MySql'],
        link : "https://github.com/SunilHumanabad/CIE-Marks-Entry-System",
        img : "./CIE.png",
        animation : 0.7

    },
    {
        id : 2,
        title : "Diabetes Prediction Using Machine Learning",
        date : "Jan 15th 2022",
        desc : "Aim of the project is to create an effective, efficient and automated system that can proactively identify and mitigate phishing threats, safeguarding users from fraudulent activities on the internet",
        tech : ['NumPy', 'pandas', 'scikit-learn', 'Streamlit'],
        link : "#",
        img : "DiabetesPrediction.png",
        animation : 0.9
    },
    {
        id : 3,
        title : "College Connect",
        date : "Aug 30th 2022",
        desc : "Aim of the project is to provide multiple functionalities to the various users of the website that includes the dean, faculty and the students.The dean has complete control over all the actions done by the faculty and the students. The faculty is authorised to add the details of their respective courses and also the notes related to it. The students can add their personal and education details and also have access to the notes uploaded by the faculty for a particular course.",
        tech : ['NumPy', 'pandas', 'scikit-learn', 'Streamlit'],
        link : "#",
        img : "./CIE.png",
        animation : 1.1
    },
    {
        id : 4,
        title : "Phishing Website Detection Using ML",
        date : "Nov 25th 2023",
        desc : "Aim of the project is to create an effective, efficient and automated system that can proactively identify and mitigate phishing threats, safeguarding users from fraudulent activities on the internet.",
        tech : ['NumPy', 'pandas', 'scikit-learn', 'Streamlit'],
        link : "https://github.com/SunilHumanabad/Phishing-Detection-Using-ML",
        img : "PhishingWebsite.png",
        animation : 1.3
    },{
        id : 5,
        title : "Unplex",
        date : "April 07 2023",
        desc : "The project for Unplex Company focuses on creating a comprehensive digital platform to support their diverse business areas, including medical devices, defense sector, and industrial automation. The website serves as a central hub to showcase their products and services tailored to these sectors. Additionally, Google Analytics integration provides valuable insights into viewer demographics and behavior, empowering Unplex to optimize their online presence and better understand their audience.",
        tech : ['php', 'mySQL', 'Bootstrap', 'Gsap', 'jQuery', 'CSS', 'HTML'],
        link : "https://unplex.tech/",
        img : "data:image/jpeg;base64,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",
        animation : 1.5
    },
]

// Experience Details
export const ExperienceData = [
    {
        id : 1,
        comp : "Utilinet Technologies Services",
        img: "https://utilinettech.com/images/Utilinet.png",
        form_to : "Mar 2023 - Sep 2023",
        points : [
            "Served as an intern for a duration of 6 months, contributing as a team member in a software development team focused on Python using the Django framework."
        ],
        animation : 1.0
    },
    {
        id : 2,
        comp : "Unplex Technologies",
        img: "https://unplex.tech/static/img/logos/icon.png",
        form_to : "Feb 2024 - Present",
        points : [
            "Currently, I'm proudly contributing to Unplex Technologies as a Fullstack Developer. In this role, I'm deeply involved in the development lifecycle, seamlessly integrating frontend and backend technologies to create robust digital solutions. Collaborating within a dynamic team, I leverage my expertise to drive innovation and deliver top-tier products. My dedication to excellence ensures that I consistently meet and exceed project goals, contributing to Unplex's ongoing success in revolutionizing the digital landscape."
        ],
        animation : 1.0
    }
]

// Contact Me Details
export const ContactData = [
    {
        name: HeroData[0].name,
        img: "$.png",
        points: [
                "Reach out and Connect: I'm always available for connecting with fellow developers, sharing insights, and teaming up on exciting projects. Let's connect! My virtual door is always open on"
                ],
        social: [
            {
                id: 1,
                name: "GitHub",
                icon: <FaGithub className="text-xl text-default-500 pointer-events-none flex-shrink-0" />,
                link: "https://github.com/SunilHumanabad",
            },
            {
                id: 2,
                name: "LinkedIn",
                icon: <FaLinkedin className="text-xl text-default-500 pointer-events-none flex-shrink-0" />,
                link: "https://www.linkedin.com/in/sunilhumanabad/",
            },
            {
                id: 3,
                name: "Gmail",
                icon: <SiGmail className="text-xl text-default-500 pointer-events-none flex-shrink-0" />,
                link: "mailto:sunilhumanabad@gmail.com",
            },
            {
                id: 4,
                name: "Download CV",
                icon: <GrDocumentPdf className="text-xl text-default-500 pointer-events-none flex-shrink-0" />,
                link: "https://drive.google.com/file/d/1WJLY0iKnWHoFWjWhm7Y7D0eqflNqe8Sy/view?usp=sharing",
            },
        ] 
    }
]
