/**
 * Projects shown in "Selected Work" (featured: true) and the Project Archive.
 *
 * Schema
 *   id          unique slug
 *   title       project name
 *   category    used for the archive filters
 *   year        'YYYY' or ''
 *   client      client / organisation name ('' for personal projects); feeds the "Recent work for" row
 *   summary     one sentence for cards
 *   description array of paragraphs for the detail dialog
 *   highlights  bullet points: what it does / what you did
 *   stats       optional verified numbers: [{ value, label }]
 *   role        your role ('' hides it)
 *   tools       tools / tech (see note on the UI/UX entries)
 *   cover       { src, width, height, alt } — 16:10 first-screen capture, or null for a typographic cover
 *   screenshot  { src, width, height, alt } — tall full-page capture; scrolls inside the browser frame
 *   gallery     extra images, same shape as cover
 *   videoUrl    YouTube link — embedded with privacy-enhanced, click-to-load player
 *   demoUrl     link to a demo video or file
 *   liveUrl     live site
 *   sourceUrl   repository
 *   publication optional { title, venue, shortVenue, date, doi, url } for published work
 *   featured    true = shown large in "Selected Work"
 *
 * UI/UX entries: copy describes what each live site shows (captured Nov 2026). `tools` lists the
 * front-end tech detected in the live site's source — delete anything you didn't work with.
 * Older entries come from the original portfolio repo and the project READMEs on GitHub.
 */

const shot = (slug, height, alt) => ({ src: `/assets/projects/${slug}-page.webp`, width: 1200, height, alt });
const cover = (slug, alt) => ({ src: `/assets/projects/${slug}.webp`, width: 1440, height: 900, alt });

export const projects = [
  {
    id: 'unique-food-express',
    title: 'Unique Food Express',
    client: 'Unique Food Express',
    category: 'UI/UX Design',
    year: '2026',
    summary: 'UI/UX design for a Pune exporter of Indian millets, spices and frozen foods: one clear path from product range to quote for overseas buyers.',
    description: [
      'Unique Food Express exports Indian millets, whole spices, spice powders and frozen foods under two brands, Aganyasattva and Unix, from Pune to buyers abroad.',
      'The site is designed around how an importer evaluates a supplier: a quiet editorial voice, the full range organised into brands and shelves, export details on every product, and a request-a-quote journey available from any page.',
    ],
    highlights: [
      'Two brands, five shelves and 35 products organised into one browsable range',
      'Product cards styled as export-lot tags: botanical name, HS code, grade and MOQ',
      'Quote-first journey: add products to a quote and request pricing from anywhere',
      'Credentials up front: established 2015, FSSAI and IEC registration',
    ],
    stats: [],
    role: 'UI/UX design',
    tools: ['GSAP'],
    cover: cover('unique-food-express', 'Unique Food Express homepage: “India’s harvest, graded and documented for your port” beside a container ship'),
    screenshot: shot('unique-food-express', 4500, 'Full Unique Food Express homepage, from the hero to the quote request form'),
    gallery: [],
    videoUrl: '',
    demoUrl: '',
    liveUrl: 'https://uniquefoodexpress.com/',
    sourceUrl: '',
    featured: true,
  },
  {
    id: 'bioparticle',
    title: 'Bioparticle',
    client: 'Bioparticle',
    category: 'UI/UX Design',
    year: '2026',
    summary: 'UI/UX design for the channel partner of the most sensitive nanoparticle-analysis instruments, making deep science readable for research labs.',
    description: [
      'Bioparticle is the official channel partner for highly sensitive nanoparticle platforms, characterising extracellular vesicles, lipid nanoparticles and viruses down to a single molecule, with no calibration curves.',
      'The design explains two instrument families, Particle Metrix ZetaView and Pangnostics digital flow cytometry, through scientific illustration, data-led sections and a request-a-demo path that runs through the whole page.',
    ],
    highlights: [
      'Animated 3D particle scene in the hero, built on Three.js',
      'Two instrument families explained side by side',
      'Data-led storytelling, e.g. a size-distribution chart showing most vesicles fall below detection limits',
      'Request-a-demo calls to action throughout',
    ],
    stats: [],
    role: 'UI/UX design',
    tools: ['Three.js', 'GSAP'],
    cover: cover('bioparticle', 'Bioparticle homepage: “Characterize the particles other instruments can’t see” beside an illustrated vesicle'),
    screenshot: shot('bioparticle', 4500, 'Full Bioparticle homepage with instrument platforms, charts and applications'),
    gallery: [],
    videoUrl: '',
    demoUrl: '',
    liveUrl: 'https://bioparticle.com/',
    sourceUrl: '',
    featured: true,
  },
  {
    id: 'mountaingrid',
    title: 'MountainGrid Solutions',
    client: 'MountainGrid',
    category: 'UI/UX Design',
    year: '2026',
    summary: 'UI/UX design for a technology and education consultancy spanning IT services, software development, admissions and technical training.',
    description: [
      'MountainGrid Solutions is a technology-driven organisation delivering digital solutions, software development, IT consulting and business transformation, alongside education services.',
      'The design brings a wide service range under one clear structure: a service ecosystem from admission counselling and project guidance to R&D, patent support and software development, plus best practices and partners.',
    ],
    highlights: [
      'One service ecosystem covering eight offerings, each with its own focus areas',
      'Consultancy and guidance section with roadmap and architecture support',
      '“Why choose us” section built on customer-centric, scalable and end-to-end support',
    ],
    stats: [],
    role: 'UI/UX design',
    tools: ['Tailwind CSS'],
    cover: cover('mountaingrid', 'MountainGrid Solutions homepage: “Technical Excellence Through Strategic Innovation” beside a team at work'),
    screenshot: shot('mountaingrid', 3668, 'Full MountainGrid Solutions homepage with services, consultancy and contact'),
    gallery: [],
    videoUrl: '',
    demoUrl: '',
    liveUrl: 'https://mountaingrid.in/',
    sourceUrl: '',
    featured: false,
  },
  {
    id: 'unplex-technologies',
    title: 'Unplex Technologies',
    client: 'Unplex',
    category: 'UI/UX Design',
    year: '2025',
    summary: 'UI/UX design for a deep-tech consultancy that takes medical, defence and industrial products from first sketch to factory floor.',
    description: [
      'Unplex® is a full product-lifecycle consulting partner: it engineers the product, builds the quality system that earns certification, and carries both through approval into manufacturing, for medical devices, defence and industrial automation.',
      'The design frames that promise as an engineering blueprint: a wireframe 3D hero, nine lifecycle disciplines shown as one unbroken chain, three ways to engage, and the industries and values behind the work.',
      'Sunil also built the company’s earlier website in 2023 with PHP, MySQL, Bootstrap and GSAP, including Google Analytics for audience insight.',
    ],
    highlights: [
      'Blueprint-style visual language with a wireframe 3D hero',
      'Nine lifecycle disciplines presented as one connected chain',
      'Three entry points (quality & regulatory, product engineering, digital transformation)',
      'Smooth-scrolling, animated storytelling',
    ],
    stats: [],
    role: 'UI/UX design',
    tools: ['GSAP', 'Lenis', 'Odoo'],
    cover: cover('unplex-technologies', 'Unplex homepage: “From first sketch to factory floor.” over a blue wireframe knot'),
    screenshot: shot('unplex-technologies', 4500, 'Full Unplex Technologies homepage with services, disciplines and industries'),
    gallery: [],
    videoUrl: '',
    demoUrl: '',
    liveUrl: 'https://unplex.tech/',
    sourceUrl: '',
    featured: true,
  },
  {
    id: 'unplex-blueprints',
    title: 'Unplex Blueprints',
    client: 'Unplex',
    category: 'UI/UX Design',
    year: '2025',
    summary: 'UI/UX design for the launch of Unplex® Blueprints: browser-based regulatory tools that give medical-device teams a defensible answer.',
    description: [
      'Unplex® Blueprints are browser-based regulatory tools for medical-device teams: classification, predicates, pathways, fees and timelines, with every output traced to a rule rather than an opinion.',
      'The launch site turns a dense regulatory subject into a confident product story: a network-graph hero, the rule-books it is built on (CDSCO, US FDA 510(k), EU MDR, ISO 13485, ISO 14971, IMDRF), the principles behind it and an early-access sign-up.',
    ],
    highlights: [
      'Dark, network-graph hero built with Three.js',
      'Product principles (decisive, invent nothing, traceable end to end) as the core message',
      'Blueprint library previewed by market, leading to early-access sign-up',
    ],
    stats: [],
    role: 'UI/UX design',
    tools: ['Three.js', 'GSAP'],
    cover: cover('unplex-blueprints', 'Unplex Blueprints homepage: “Get a defensible answer.” over a glowing network graph'),
    screenshot: shot('unplex-blueprints', 4214, 'Full Unplex Blueprints launch page with principles, blueprint library and early-access form'),
    gallery: [],
    videoUrl: '',
    demoUrl: '',
    liveUrl: 'https://unplex.io/',
    sourceUrl: '',
    featured: true,
  },
  {
    id: 'phishing-detection-ml',
    title: 'Phishing Website Detection',
    client: '',
    category: 'Academic',
    year: '2023',
    summary: 'Machine-learning phishing detection published at IEEE ICIICS 2023: seven models compared, with Random Forest reaching 97.5% accuracy.',
    publication: {
      title: 'Phishing Website Detection Using Machine Learning Methods',
      venue: '2023 International Conference on Integrated Intelligence and Communication Systems (ICIICS)',
      shortVenue: 'IEEE ICIICS 2023',
      date: '2023-11-24',
      doi: '10.1109/ICIICS59993.2023.10420933',
      url: 'https://ieeexplore.ieee.org/document/10420933',
    },
    description: [
      'An automated system built to proactively identify and mitigate phishing threats, protecting users from fraudulent activity on the internet. Given a website URL, it classifies the site as phishing or legitimate.',
      'The dataset was split 80/20 into 8,843 training and 2,211 test samples. Seven supervised classifiers were trained and compared on accuracy, F1 and precision: Decision Tree, Random Forest, AdaBoost, Logistic Regression, Support Vector Machine, k-Nearest Neighbours and Gradient Boosting.',
    ],
    highlights: [
      'Random Forest performed best: 0.975 accuracy, 0.978 F1 and 0.988 precision',
      'Decision Tree came a close second with 0.963 accuracy and 0.990 precision',
      'Trained models are saved as .pkl files and loaded by a Python app',
    ],
    stats: [
      { value: '97.5%', label: 'Accuracy (Random Forest)' },
      { value: '7', label: 'Models compared' },
      { value: '11,054', label: 'Labelled samples' },
    ],
    role: '',
    tools: ['Python', 'scikit-learn', 'pandas', 'NumPy', 'Streamlit'],
    cover: {
      src: '/assets/projects/phishing-detection.webp',
      width: 1200,
      height: 600,
      alt: 'Banner reading "ML Phishing Detection" beside a wireframe head with a padlock',
    },
    screenshot: null,
    gallery: [],
    videoUrl: '',
    demoUrl: '',
    liveUrl: '',
    sourceUrl: 'https://github.com/SunilHumanabad/Phishing-Detection-Using-ML',
    featured: false,
  },
  {
    id: 'cie-marks-entry-system',
    title: 'CIE Marks Entry System',
    client: '',
    category: 'Academic',
    year: '2022',
    summary: 'A department web app that records students’ Continuous Internal Evaluation marks and calculates final scores out of 50.',
    description: [
      'A web application that helps a university department track students’ academic performance through their Continuous Internal Evaluation (CIE) results.',
      'Faculty enter the marks students obtain in three CIEs. The system selects the best two (each out of 15), averages them, adds the assignment marks and shows each student’s total out of 50.',
      'Admins sign in with their credentials and can register faculty members, assigning each one a role. A dynamic home page links to students, courses, batches, faculty, marks entry and reports.',
    ],
    highlights: [
      'Best-two-of-three CIE averaging combined with assignment marks',
      'Admin login with role-based faculty registration',
      'Dashboard with quick links to students, courses, batches, faculty and reports',
    ],
    stats: [],
    role: '',
    tools: ['PHP', 'MySQL', 'JavaScript', 'jQuery', 'Ajax', 'HTML', 'CSS'],
    cover: {
      src: '/assets/projects/cie-marks-entry.webp',
      width: 1600,
      height: 900,
      alt: 'CIE Marks Entry System dashboard with student, course, batch, user and faculty cards',
    },
    screenshot: null,
    gallery: [],
    videoUrl: '',
    demoUrl: '',
    liveUrl: '',
    sourceUrl: 'https://github.com/SunilHumanabad/CIE-Marks-Entry-System',
    featured: false,
  },
  {
    id: 'college-connect',
    title: 'College Connect',
    client: '',
    category: 'Academic',
    year: '2022',
    summary: 'A role-based college portal where the dean, faculty and students each get their own tools.',
    description: [
      'College Connect provides different functionality for each type of user: the dean, faculty and students.',
      'The dean has complete control over everything faculty and students do. Faculty can add details for their courses and upload notes for them. Students can add their personal and education details and access the notes faculty have uploaded for each course.',
    ],
    highlights: [
      'Dean dashboard with full oversight of faculty and student actions',
      'Faculty manage course details and upload course notes',
      'Students maintain their profiles and access course notes',
    ],
    stats: [],
    role: '',
    tools: [], // TODO: add the stack you used (the old portfolio data had a copy-paste of the ML stack here)
    cover: null,
    screenshot: null,
    gallery: [],
    videoUrl: '',
    demoUrl: '',
    liveUrl: '',
    sourceUrl: '',
    featured: false,
  },
  {
    id: 'diabetes-prediction-ml',
    title: 'Diabetes Prediction',
    client: '',
    category: 'Academic',
    year: '2022',
    summary: 'A Streamlit app that predicts diabetes from patient health measurements using a machine-learning model.',
    description: [
      'An interactive Streamlit web app that predicts diabetes using machine learning. Patient details such as pregnancies, glucose, blood pressure, skin thickness, insulin and BMI are entered with sliders in the sidebar.',
      'The app also lets users explore the underlying diabetes dataset (768 rows × 9 columns) along with its descriptive statistics.',
    ],
    highlights: [
      'Slider-based patient input for each health measurement',
      'Dataset explorer and summary statistics in separate tabs',
      'Model built with scikit-learn on pandas and NumPy',
    ],
    stats: [],
    role: '',
    tools: ['Python', 'scikit-learn', 'pandas', 'NumPy', 'Streamlit'],
    cover: {
      src: '/assets/projects/diabetes-prediction.webp',
      width: 1600,
      height: 804,
      alt: 'Diabetes Prediction app with patient-detail sliders and a dataset table',
    },
    screenshot: null,
    gallery: [],
    videoUrl: '',
    demoUrl: '',
    liveUrl: '',
    sourceUrl: '',
    featured: false,
  },
];

/** Featured first, then newest first. */
export const sortedProjects = [...projects].sort(
  (a, b) => Number(b.featured) - Number(a.featured) || (Number(b.year) || 0) - (Number(a.year) || 0),
);

export const featuredProjects = sortedProjects.filter((p) => p.featured);

/** Newest first (archive order). */
export const projectsByYear = [...projects].sort((a, b) => (Number(b.year) || 0) - (Number(a.year) || 0));

/** Categories derived from the data, in order of first appearance. */
export const projectCategories = [...new Set(projectsByYear.map((p) => p.category).filter(Boolean))];

/** The first project with a publication, for the About facts. */
export const publication = projects.find((p) => p.publication)?.publication || null;

/** Distinct clients of the most recent work, newest first. */
export const recentClients = [...new Set(projectsByYear.map((p) => p.client).filter(Boolean))];
