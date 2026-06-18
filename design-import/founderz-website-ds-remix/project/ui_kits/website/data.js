/* Shared content for the Founderz website UI kit (fake but realistic, ES copy). */
window.FZ = (function () {
  const u = (id, w = 900) => `https://images.unsplash.com/photo-${id}?w=${w}&q=72&auto=format&fit=crop`;
  return {
    photo: u,
    img: {
      heroHome: u("1522071820081-009f0129c71c", 1400),
      heroProgram: u("1600880292203-757bb62b4baf", 1400),
      heroEmpresas: u("1497366754035-f200968a6e72", 1400),
      meeting: u("1556761175-5973dc0f32e7"),
      class: u("1543269865-cbf427effbad"),
      laptop: u("1517245386807-bb43f82c33c4"),
      woman: u("1573496359142-b8d87734a5a2"),
      data: u("1551288049-bebda4e38f71"),
      creative: u("1499750310107-5fef28a66643"),
    },
    avatars: {
      anna: "https://i.pravatar.cc/120?img=47",
      pau: "https://i.pravatar.cc/120?img=12",
      marc: "https://i.pravatar.cc/120?img=33",
      lucia: "https://i.pravatar.cc/120?img=45",
    },
    partners: ["IESE", "Microsoft", "BBVA", "Telefónica", "Santander", "Repsol", "Inditex", "Mapfre"],
    programs: [
      { type: "Máster", duration: "12 semanas", title: "IA e Innovación 2026", categories: ["IA", "Estrategia"], desc: "Lidera la transformación con IA en tu organización: de la teoría a proyectos reales.", price: "2.400 €", priceOld: "3.000 €" },
      { type: "Curso", duration: "8 semanas", title: "IA generativa para Creativos", categories: ["IA", "Creatividad"], desc: "Domina las herramientas generativas para diseño, contenido y producto.", price: "1.200 €", priceOld: "1.600 €" },
      { type: "Curso", duration: "6 semanas", title: "Productividad con Copilot", categories: ["IA", "Productividad"], desc: "Multiplica tu eficiencia con Microsoft Copilot en el día a día.", price: "900 €", priceOld: "1.200 €" },
    ],
    features: [
      { icon: "wand", title: "Aprendizaje práctico", text: "Proyectos reales desde la primera semana, no solo teoría." },
      { icon: "users", title: "Expertos del sector", text: "Aprende de profesionales que aplican IA en grandes empresas." },
      { icon: "cpu", title: "Herramientas punteras", text: "Trabaja con las últimas herramientas de IA generativa." },
      { icon: "calendar", title: "Clases en directo", text: "Sesiones en vivo con acceso a todas las grabaciones." },
      { icon: "award", title: "Certificación oficial", text: "Avalada por Microsoft y reconocida en el sector." },
      { icon: "globe", title: "Comunidad global", text: "Forma parte de una red de +250.000 profesionales." },
    ],
    stats: [
      { value: "+250K", label: "Alumnos formados en IA y negocio", surface: "purple" },
      { value: "+50", label: "Expertos y profesores en activo", surface: "lilac" },
      { value: "4,8/5", label: "Valoración media de los programas", surface: "grey" },
      { value: "+1.400", label: "Empresas que confían en Founderz", surface: "white" },
    ],
    testimonials: [
      { quote: "El mejor programa de IA aplicada que he hecho. Práctico desde el primer día y con un nivel altísimo.", name: "Pau Ramírez", role: "Product Lead, Glovo", avatar: "https://i.pravatar.cc/120?img=12" },
      { quote: "Pasé de no usar IA a integrarla en todos mis procesos. El cambio ha sido brutal.", name: "Anna Pérez", role: "Marketing Director, Cabify", avatar: "https://i.pravatar.cc/120?img=47" },
      { quote: "Founderz me dio las herramientas y la confianza para liderar la estrategia de IA de mi equipo.", name: "Marc Soler", role: "CTO, Factorial", avatar: "https://i.pravatar.cc/120?img=33" },
    ],
    faqs: [
      { q: "¿Necesito conocimientos previos?", a: "No. Los programas parten de cero y avanzan progresivamente hasta un nivel avanzado." },
      { q: "¿Las clases son en directo?", a: "Sí, las sesiones son en directo y tendrás acceso a todas las grabaciones cuando quieras." },
      { q: "¿Obtengo una certificación?", a: "Sí, al completar el programa recibes una certificación oficial avalada por Microsoft." },
      { q: "¿Puedo financiar el programa?", a: "Ofrecemos financiación sin intereses a través de Aplazame y BBVA, y opciones bonificables por Fundae para empresas." },
    ],
    posts: [
      { category: "Blog", title: "Cómo aplicar IA generativa en tu equipo este 2026", img: "1499750310107-5fef28a66643" },
      { category: "Guía", title: "10 herramientas de IA que todo profesional debería conocer", img: "1551288049-bebda4e38f71" },
      { category: "Caso", title: "Así integró Telefónica la IA en su área de personas", img: "1573496359142-b8d87734a5a2" },
    ],
    events: [
      { day: "26", month: "Jun", label: "Webinar", title: "IA generativa aplicada a finanzas", speaker: "Con Anna Pérez · Cabify" },
      { day: "03", month: "Jul", label: "Masterclass", title: "Liderazgo en la era de la IA", speaker: "Con Marc Soler · Factorial" },
    ],
  };
})();
