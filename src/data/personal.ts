/**
 * Personal profile — Mark Roland Delicano.
 *
 * All information is sourced from the verified CV (08_MRPD-CV.docx).
 * Contact details are public-safe: no phone numbers, no residential
 * address, and no student ID are exposed.
 */

export const personal = {
  name: 'Mark Roland Delicano',
  fullName: 'Mark Roland Piangco Delicano',
  role: 'Aspiring Software Developer | IT Student | Web & Mobile Development Enthusiast',
  tagline: 'Aspiring software developer exploring modern web development, mobile applications, and artificial intelligence. I enjoy transforming ideas into practical, user-friendly software through continuous learning and hands-on projects.',
  bio: [
    "I'm currently pursuing a Bachelor of Science in Information Technology at Visayas State University Alangalang, where I'm building a foundation in software engineering, web and mobile development, and database management.",
    'As an aspiring software developer, I enjoy turning ideas into practical, user-friendly applications. Through hands-on projects and collaborative development, I continue to strengthen my problem-solving skills, explore emerging technologies, and grow as a developer.',
  ],
  /**
   * Additional biography paragraphs revealed by the About section's
   * "Read More" disclosure. These are additive: they do not restate the
   * introductory paragraphs in `bio` (the opening education sentence of
   * the longer biography already appears as `bio[0]`).
   */
  bioExtended: [
    'My academic journey has strengthened my problem-solving abilities, technical knowledge, and interest in creating practical, user-centered digital solutions.',
    "Through academic and research projects such as VeriFaceX and the VSU Alangalang Campus Facilities Booking Management Information System, I've gained hands-on experience in designing, developing, testing, and continuously improving software applications. These experiences have allowed me to explore different technologies, understand real-world development challenges, and appreciate the importance of teamwork, usability, and system reliability.",
    "As an aspiring software developer, I'm continuously expanding my knowledge of modern frameworks, development tools, and emerging technologies, particularly in web development, mobile applications, and artificial intelligence.",
    'I\'m motivated by opportunities to transform ideas into functional solutions while learning, experimenting, and growing as a developer.',
  ],
  email: 'markrolanddelicano@gmail.com',
  location: 'Jaro, Leyte, Philippines',
  education: 'Bachelor of Science in Information Technology',
  institution: 'Visayas State University Alangalang',
  enrollment: '2023 – Present',
  avatarInitials: 'MRD',
  profilePhoto: '/images/profile.jpg',
  profilePhotoHover: '/images/profile-2.png',
  githubUrl: 'https://github.com/markrolanddelicano',
  orcid: 'https://orcid.org/0009-0006-4709-6515',
  social: [
    {
      name: 'GitHub',
      href: 'https://github.com/markrolanddelicano',
      icon: 'github',
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/markrolanddelicano',
      icon: 'linkedin',
    },
    {
      name: 'ORCiD',
      href: 'https://orcid.org/0009-0006-4709-6515',
      icon: 'orcid',
    },
    {
      name: 'Email',
      href: 'mailto:markrolanddelicano@gmail.com',
      icon: 'mail',
    },
  ],
  nav: [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects & Research', href: '#projects-research' },
    { label: 'Education', href: '#education' },
    { label: 'Devlog', href: '#devlog' },
    { label: 'Contact', href: '#contact' },
  ],
} as const