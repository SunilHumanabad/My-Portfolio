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
        img : "https://unplex.tech/static/img/logos/icon.png",
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
        img: "https://unplex.tech/wp-content/uploads/2023/10/unplex.png",
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
