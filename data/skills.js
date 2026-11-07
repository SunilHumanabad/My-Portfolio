/**
 * Skills, grouped by what they're used for. Rendered as "Capabilities" in the About section.
 * Source: the owner's own technical-skills list (Nov 2026), plus UI/UX design, AI agents and RAG.
 * `detail` (optional) adds depth shown in brackets after a skill.
 */
export const capabilities = [
  {
    id: 'design-frontend',
    title: 'Design & Frontend',
    summary: 'Interfaces designed and then built, from UI/UX to production React and Next.js.',
    skills: [{ name: 'UI/UX Design' }, { name: 'React.js' }, { name: 'Next.js' }, { name: 'Tailwind CSS' }, { name: 'Bootstrap' }],
  },
  {
    id: 'languages',
    title: 'Languages',
    summary: 'The languages used every day across the stack.',
    skills: [{ name: 'Python' }, { name: 'JavaScript', detail: 'Node.js' }, { name: 'SQL' }, { name: 'HTML' }, { name: 'CSS' }],
  },
  {
    id: 'backend',
    title: 'Backend',
    summary: 'APIs and services behind the interface.',
    skills: [{ name: 'Django' }, { name: 'Flask' }, { name: 'FastAPI' }, { name: 'REST APIs' }],
  },
  {
    id: 'databases',
    title: 'Databases',
    summary: 'Relational and document data, modelled and tuned.',
    skills: [{ name: 'MySQL' }, { name: 'MongoDB', detail: 'aggregation pipelines, indexing, query optimisation' }],
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    summary: 'AI agents, retrieval-augmented generation and workflow automation.',
    skills: [{ name: 'AI Agents' }, { name: 'RAG Applications' }, { name: 'n8n Automation' }],
  },
  {
    id: 'erp-integrations',
    title: 'ERP & Integrations',
    summary: 'Business systems, sign-in and access control, and third-party APIs.',
    skills: [{ name: 'Odoo ERP' }, { name: 'OAuth' }, { name: 'RBAC' }, { name: 'Google APIs' }],
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps',
    summary: 'Containers, version control and CI/CD pipelines.',
    skills: [{ name: 'Docker' }, { name: 'Git' }, { name: 'GitLab CI/CD' }, { name: 'AWS', detail: 'basic' }],
  },
];

/** Flat list of every skill name (used for search and the live-build cursor tags). */
export const allSkills = [...new Set(capabilities.flatMap((c) => c.skills.map((s) => s.name)))];
