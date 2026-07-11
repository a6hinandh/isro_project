export type Locale = "en" | "hi";

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  hi: "हिन्दी",
};

const en = {
  // Navbar
  nav: {
    features: "Features",
    queryLifecycle: "Query Lifecycle",
    architecture: "Architecture",
    faq: "FAQ",
    login: "Login",
    signup: "Sign Up",
    logout: "Logout",
    launchAstraQ: "Launch AstraQ",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    chat: "Chat",
    explorer: "Explorer",
    satellites: "Satellites",
    search: "Search",
  },

  // Hero
  hero: {
    headline1: "Intelligence from Orbit,",
    headline2: "Delivered by AstraQ.",
    description:
      "Simplify access to satellite datasets and remote sensing observations. AstraQ processes scientific inquiries into grounded, readable summaries, linking documentation and product relationships under a single conversational interface.",
    tryAstraQ: "Try AstraQ",
    learnMore: "Learn more",
  },

  // Features
  features: {
    title: "Core Capabilities",
    subtitle:
      "AstraQ is built on a precise pipeline combining vector databases, graph databases, and secure user management.",
    ragTitle: "Semantic Document Retrieval (RAG)",
    ragDesc:
      "Answers are directly grounded in scraped MOSDAC documentation, scientific reports, and ATBDs. Using sentence-transformers, AstraQ matches the semantic meaning of your questions against our localized FAISS vector database to retrieve the most contextually relevant documentation.",
    kgTitle: "Structured Knowledge Graph",
    kgDesc:
      'Maintains facts about satellites, payloads, and parameter relationships in Neo4j. Quickly answers query types like "Which satellites observe sea surface temperature?"',
    authTitle: "Secure Session Persistence",
    authDesc:
      "Users sign up and log in securely via Firebase Authentication. All chat threads, message history, feedback, and user configurations are encrypted and persisted per-user in Google Cloud Firestore.",
    inputTitle: "Flexible Input Modalities",
    inputDesc:
      "Interact on your own terms. Dictate queries hands-free using the built-in Web Speech API voice input. You can also upload PDF, DOCX, or TXT documents to extract extra context and ground your conversation on custom local reference material.",
  },

  // Services / Query Lifecycle
  services: {
    title: "The Query Lifecycle",
    subtitle:
      "How AstraQ processes natural language requests into mathematically and scientifically verified answers.",
    step01Title: "User Query Input",
    step01Desc:
      'A researcher enters a query like "Show SST retrieved from INSAT-3D Imager channels" via text, voice, or custom document uploads.',
    step02Title: "Intent Router",
    step02Desc:
      "Our FastAPI backend runs intent classification. It decides whether the query requires RAG documentation, structured Knowledge Graph facts, or hybrid routing.",
    step03Title: "Parallel Search",
    step03Desc:
      "Retrieves matches from FAISS vector databases (unstructured ATBDs/docs) and queries Neo4j (structured satellite-product connections) in parallel.",
    step04Title: "Gemini Synthesis",
    step04Desc:
      "Google Gemini receives the query along with the exact retrieved context, synthesizing a scientifically grounded answer.",
    step05Title: "Grounded Answer",
    step05Desc:
      "Outputs the response to the user with interactive metadata, exact citations, and document source previews to ensure absolute factuality.",
  },

  // FAQ
  faq: {
    title: "Frequently Asked Questions",
    subtitle: "Everything you need to know about AstraQ and MOSDAC data access.",
    answerGrounding: "Answer Grounding",
    systemResponse: "ASTRAQ SYSTEM RESPONSE",
    grounded: "100% GROUNDED",
    q1: "What is AstraQ?",
    a1: "AstraQ is a conversational assistant for ISRO's MOSDAC satellite data. It answers natural-language questions about satellites, data products, parameters, and retrieval algorithms by combining semantic document search (RAG) with a Neo4j knowledge graph.",
    q2: "What kind of questions can I ask?",
    a2: 'You can ask about MOSDAC data products, instruments, and parameters: "Which products does INSAT-3D provide?", "Explain how SST is retrieved", or definitions like "What is AMV?". You can also upload text/PDF/DOCX documents to ground your query on custom context.',
    q3: "Where do the answers come from?",
    a3: "Answers are synthesized by Google Gemini, grounded in context retrieved from scraped MOSDAC documentation (product specifications and user guides) via FAISS vector search, and structured facts from a Neo4j knowledge graph. Source citations are always provided.",
    q4: "Is my chat history private?",
    a4: "Yes. Your chat threads are authenticated via Firebase Auth and stored securely in Firestore. Only you can view them. You can, however, generate public read-only links to share specific threads, and revoke access at any time.",
    q5: "Why is the first response sometimes slow?",
    a5: "AstraQ runs on a server host that sleeps during periods of inactivity. The first query after a quiet period wakes the server, which can take up to a minute. Subsequent responses are processed instantly.",
  },

  // Footer
  footer: {
    description:
      "An AI-powered assistant for exploring ISRO's satellite datasets through natural language queries, grounded in real documentation.",
    dataPortals: "Data Portals",
    information: "Information",
    aboutProject: "About the Project",
    termsConditions: "Terms & Conditions",
    copyright: "© 2026 AstraQ · Satellite Data Assistant",
    builtBy:
      "Built by AstraMind — a student-led group of data engineers, AI researchers, and space enthusiasts.",
    frontendRepo: "Frontend Repo",
    backendRepo: "Backend Repo",
    aboutTitle: "Project Scope",
    aboutP1:
      "AstraQ is an advanced educational retrieval-augmented generation (RAG) and relational metadata assistant built to explore and study ISRO's MOSDAC satellite data records.",
    aboutP2:
      "By parsing satellite documentation (ATBDs, user manuals) into a localized vector database and extracting structured payload facts into a knowledge graph, AstraQ ensures that its natural language summaries are completely grounded and verifiable.",
    aboutP3:
      "Sessions are managed using Firebase Authentication and persisted privately inside Cloud Firestore.",
    termsTitle: "Usage Guidelines",
    terms1Title: "1. Educational Purpose Only",
    terms1:
      "AstraQ is an educational tool for exploring meteorological and oceanographic satellite datasets. It is not affiliated with, sponsored by, or endorsed by ISRO.",
    terms2Title: "2. Data Processing & Privacy",
    terms2:
      "All user rosters and thread logs are private. The system caches context inside Firestore. Document uploads are processed transiently to extract query context.",
    terms3Title: "3. Information Fidelity",
    terms3:
      "While responses are heavily grounded in vector-matched MOSDAC files, users should double-check coordinates and scientific metrics on the official MOSDAC portal before deployment.",
  },

  // Login
  login: {
    title: "Welcome Back to",
    brand: "AstraQ.",
    subtitle: "Sign in to continue exploring ISRO's satellite data with AI-powered conversational search.",
    secureLogin: "Secure Login",
    credentials: "Enter your credentials to continue",
    email: "Email address",
    password: "Password",
    submit: "Access Granted",
    submitting: "Signing in…",
    createAccount: "Create an account",
    highlight1Title: "MOSDAC Data Access",
    highlight1Desc: "Query ISRO satellite datasets with natural language.",
    highlight2Title: "Secure & Private",
    highlight2Desc: "Firebase-authenticated sessions, encrypted per-user.",
    highlight3Title: "Conversational AI",
    highlight3Desc: "Grounded answers with citations from real documentation.",
  },

  // Signup
  signup: {
    title: "Start Exploring",
    brand: "with AstraQ.",
    subtitle: "Create your free account and get instant access to AI-powered satellite data exploration.",
    createAccount: "Create Account",
    joinSubtitle: "Join AstraQ in under a minute",
    confirmPassword: "Confirm password",
    submit: "Create Account",
    submitting: "Creating account…",
    haveAccount: "Already have an account?",
    signIn: "Sign in",
    whatYouGet: "What you get",
    perk1: "RAG-powered document search",
    perk2: "Knowledge graph exploration",
    perk3: "Voice & document uploads",
    passwordMismatch: "Passwords do not match.",
    passwordShort: "Password must be at least 6 characters.",
  },

  // Chat
  chat: {
    newChat: "New Chat",
    expandSidebar: "Expand sidebar",
    collapseSidebar: "Collapse sidebar",
    noConversations: "No conversations yet",
    loadingThreads: "Loading…",
    explore: "Explore",
    globalSearch: "Global Search",
    kgExplorer: "KG Explorer",
    home: "Home",
    inputPlaceholder: "Ask about satellites, products…",
    attachFile: "Attach file",
    removeAttachment: "Remove attachment",
    startVoice: "Start voice input",
    stopVoice: "Stop voice input",
    sendMessage: "Send message",
    openSidebar: "Open sidebar",
    shareConversation: "Share conversation",
    addFavorite: "Add to favorites",
    removeFavorite: "Remove from favorites",
    welcomeBack: "Welcome back,",
    welcomeDefault: "Welcome to AstraQ",
    welcomeSubtitle: "Your intelligent space mission assistant. Ask anything about satellites, payloads, or ISRO science datasets.",
    systemActive: "ASTRA-Q SYSTEM ACTIVE",
    starterSatPayload: "Satellite Payload",
    starterRetrieval: "Retrieval Logic",
    starterDataProducts: "Data Products",
    starterDefinitions: "Definitions",
    source: "source",
    sources: "sources",
  },

  // Settings Modal
  settings: {
    title: "User Preferences",
    account: "Account",
    displayName: "Display Name",
    displayNamePlaceholder: "Enter your name",
    displayNameHint: "How AstraQ greets you in the chat panel.",
    responseStyle: "Response Style",
    aiPersona: "AI Persona",
    personaStandard: "Standard (Grounded & Helpful)",
    personaExpert: "Expert (Rigorous Academic Scientist)",
    personaFriendly: "Friendly (Welcoming Space Guide)",
    personaHint: "Adapts the system prompt for different tones.",
    temperature: "Temperature",
    tempStrict: "STRICT / FACTUAL",
    tempCreative: "CREATIVE / FLUID",
    voice: "Voice",
    voiceHint: "Auto-play synthesized replies.",
    voiceEnglishOnly: "Audio output is available in English only.",
    language: "Language",
    languageHint: "Choose your preferred interface language.",
    save: "Save Preferences",
    saving: "Saving...",
    saved: "Preferences Saved",
  },

  // Feedback Modal
  feedback: {
    title: "Submit Feedback",
    rateExperience: "Rate your experience",
    stars: "STARS",
    tellUs: "Tell us what you think",
    placeholder: "What could be improved? Found any issues?",
    submit: "Submit Feedback",
    submitting: "Submitting...",
    successTitle: "Feedback Submitted!",
    successMessage: "Thank you for helping us improve AstraQ.",
  },

  // Help Modal
  help: {
    title: "Help & Support",
    coreTitle: "Intelligent Orbit Assistant",
    coreDesc:
      "AstraQ is an open-source assistant for exploring ISRO's MOSDAC satellite documentation and metadata using RAG (retrieval-augmented generation) and knowledge-graph routing.",
    exampleQueries: "Example Queries",
    systemFeatures: "System Features",
    voiceInput: "Voice Input",
    voiceInputDesc: "Speak queries hands-free.",
    fileUpload: "File Upload",
    fileUploadDesc: "Ground on custom PDF context.",
    kgExplorer: "KG Explorer",
    kgExplorerDesc: "Browse data relations visually.",
    keyboardShortcuts: "KEYBOARD SHORTCUTS",
    sendMessage: "Send Message",
  },

  // Favorites Modal
  favorites: {
    title: "Starred Conversations",
    empty: "No starred conversations yet.",
    emptyHint: "Star chat threads in the main header to save them here.",
    messages: "MESSAGES",
  },

  // Explorer Page
  explorer: {
    title: "Knowledge Graph Explorer",
    subtitle:
      "The MOSDAC satellite knowledge graph — satellites, products, parameters, regions, payloads, and algorithms, connected.",
    loading: "Loading knowledge graph…",
    unavailable: "Knowledge graph unavailable",
    unavailableHint: "The Neo4j database may be paused — try again in a minute.",
    findNode: "Find a node (e.g. INSAT-3D)…",
    graphOverview: "Graph Overview",
    nodes: "Nodes",
    edges: "Edges",
    byType: "By type",
    clickToInspect: "Click a node to inspect it. Scroll to zoom, drag to pan.",
    properties: "Properties",
    connections: "Connections",
    viewSatellitePage: "View satellite page",
    askAstraQ: "Ask Astra-Q about this",
  },

  // Satellites Page
  satellites: {
    title: "Satellite Database",
    subtitle: "Indian Earth-observation satellites and their MOSDAC data products catalog.",
    missions: "Missions",
    datasets: "Datasets",
    status: "Status",
    nominal: "Nominal",
    agency: "Agency",
    allMissions: "All Missions",
    all: "All",
    insatSeries: "INSAT Series",
    insat: "INSAT",
    oceansatSeries: "Oceansat Series",
    oceansat: "Oceansat",
    otherScience: "Other Science",
    others: "Others",
    filterPlaceholder: "Filter by name or product…",
    loading: "Loading satellites…",
    loadError: "Could not load satellites",
    loadErrorHint: "The knowledge graph may be paused — try again in a minute.",
    noMatch: "No satellites match",
    noSeries: "No satellites in this series cataloged yet.",
    active: "ACTIVE",
    available: "Available",
    missionClass: "Mission Class",
    meteorological: "Meteorological",
    oceanographic: "Oceanographic",
    scientific: "Scientific",
    primarySensors: "Primary Sensors & Datasets",
    more: "more",
  },

  // Satellite Detail Page
  satelliteDetail: {
    allSatellites: "All satellites",
    online: "Online",
    dataProducts: "data product",
    dataProductsPlural: "data products",
    askAstraQ: "Ask Astra-Q about this",
    dataCatalog: "Data Catalog",
    cataloged: "cataloged",
    noProducts: "No products recorded for this satellite in the knowledge graph.",
    spacecraftSpecs: "Spacecraft Specs",
    payloads: "Payloads",
    selectProduct: "Select any data product from the catalog on the left and click **View** to load its parsed document directly into this right-side telemetry panel.",
    docViewer: "Telemetry Dataset Viewer",
    retrievingDoc: "Retrieving document contents…",
    docLoadFailed: "Failed to Load Content",
    viewOriginal: "View original website",
    relatedPdfs: "Related PDFs",
    docMetadata: "Document Metadata",
    view: "View",
    viewing: "Viewing",
  },

  // Search Page
  searchPage: {
    title: "Global Search",
    subtitle: "Semantic search across the MOSDAC document corpus, or retrieve conversations from your chat history.",
    docsPlaceholder: "Search documents — e.g. sea surface temperature algorithm…",
    messagesPlaceholder: "Search your messages…",
    documents: "Documents",
    myMessages: "My Messages",
    searching: "Searching corpus…",
    startSearch: "Start your search",
    startSearchDocsHint:
      "Explore technical specs, ATBD guides, and product definitions from ISRO's MOSDAC documentation corpus.",
    startSearchMsgHint:
      "Search your private conversation history to locate past queries and detailed responses.",
    noResults: "No results found",
    noResultsHint: "in our",
    docDatabase: "documentation database",
    chatThreads: "chat threads",
    tryRephrasing: ". Try rephrasing or broadening terms.",
    expand: "Expand",
    collapse: "Collapse",
    copyText: "Copy",
    copied: "Copied",
    openPdf: "PDF",
    askAstraQ: "Ask AstraQ",
  },

  // Learn More
  learnMore: {
    backHome: "Back to Home",
    title: "Inside AstraQ",
    subtitle:
      "Explore the architecture, features, and data pipeline that power AI-driven access to ISRO's MOSDAC satellite datasets.",
    readyToExplore: "Ready to Explore?",
    readyCta:
      "Start querying satellite data, exploring knowledge graphs, and getting grounded AI answers in seconds.",
    tryAstraQ: "Try AstraQ",
    backToHome: "Back to Home",
    systemDesign: "SYSTEM DESIGN",
    architectureTitle: "Architecture",
    architectureDesc:
      "AstraQ is an AI assistant tailored for exploring ISRO's MOSDAC data. It combines a FastAPI backend, FAISS vector search, Neo4j knowledge graph, and Google Gemini into a unified conversational interface.",
    capabilities: "CAPABILITIES",
    featuresTitle: "Features",
    featuresDesc:
      "Semantic search with document-based retrieval, knowledge graph contextual reasoning, and support for PDFs, APIs, and dynamic content — all grounded in real MOSDAC documentation.",
    dataFlow: "DATA FLOW",
    processTitle: "Process Flow",
    processDesc:
      "From user query to grounded response: intent classification routes to FAISS vector search and Neo4j graph queries in parallel, then Gemini synthesizes a cited answer.",
  },

  // Share Page
  share: {
    sharedConversation: "Shared conversation",
    notFound: "This shared link doesn't exist",
    notFoundHint: "The link may have been revoked by its owner.",
    error: "Something went wrong",
    errorHint: "Please try again in a moment.",
    tryAstraQ: "Try Astra-Q",
    loading: "Loading shared conversation…",
    poweredBy: "Powered by",
    startOwn: "Start your own conversation",
    astraQDesc: "AI answers for ISRO's MOSDAC satellite data.",
  },

  // Misc
  misc: {
    warmingUp:
      "The backend server is waking up — this can take up to a minute on the first visit.",
  },
} as const;

const hi: typeof en = {
  nav: {
    features: "विशेषताएँ",
    queryLifecycle: "क्वेरी जीवनचक्र",
    architecture: "आर्किटेक्चर",
    faq: "अक्सर पूछे जाने वाले प्रश्न",
    login: "लॉगिन",
    signup: "साइन अप",
    logout: "लॉगआउट",
    launchAstraQ: "AstraQ शुरू करें",
    openMenu: "मेनू खोलें",
    closeMenu: "मेनू बंद करें",
    chat: "चैट",
    explorer: "एक्सप्लोरर",
    satellites: "उपग्रह",
    search: "खोजें",
  },

  hero: {
    headline1: "कक्षा से बुद्धिमत्ता,",
    headline2: "AstraQ द्वारा वितरित।",
    description:
      "उपग्रह डेटासेट और रिमोट सेंसिंग अवलोकनों तक पहुँच सरल बनाएँ। AstraQ वैज्ञानिक प्रश्नों को तथ्य-आधारित, पठनीय सारांशों में संसाधित करता है, एक एकल संवादात्मक इंटरफ़ेस के तहत दस्तावेज़ीकरण और उत्पाद संबंधों को जोड़ता है।",
    tryAstraQ: "AstraQ आज़माएँ",
    learnMore: "और जानें",
  },

  features: {
    title: "मुख्य क्षमताएँ",
    subtitle:
      "AstraQ वेक्टर डेटाबेस, ग्राफ़ डेटाबेस और सुरक्षित उपयोगकर्ता प्रबंधन को मिलाकर एक सटीक पाइपलाइन पर बनाया गया है।",
    ragTitle: "सिमेंटिक दस्तावेज़ पुनर्प्राप्ति (RAG)",
    ragDesc:
      "उत्तर सीधे MOSDAC दस्तावेज़ीकरण, वैज्ञानिक रिपोर्टों और ATBDs से प्राप्त होते हैं। sentence-transformers का उपयोग करके, AstraQ आपके प्रश्नों के शब्दार्थ अर्थ को हमारे स्थानीय FAISS वेक्टर डेटाबेस से मिलाता है।",
    kgTitle: "संरचित ज्ञान ग्राफ़",
    kgDesc:
      "Neo4j में उपग्रहों, पेलोड और पैरामीटर संबंधों के बारे में तथ्य बनाए रखता है। \"कौन से उपग्रह समुद्र सतह तापमान का अवलोकन करते हैं?\" जैसे प्रश्नों का तुरंत उत्तर देता है।",
    authTitle: "सुरक्षित सत्र स्थायित्व",
    authDesc:
      "उपयोगकर्ता Firebase Authentication के माध्यम से सुरक्षित रूप से साइन अप और लॉग इन करते हैं। सभी चैट थ्रेड, संदेश इतिहास, प्रतिक्रिया और उपयोगकर्ता कॉन्फ़िगरेशन Google Cloud Firestore में एन्क्रिप्ट और प्रति-उपयोगकर्ता संग्रहीत किए जाते हैं।",
    inputTitle: "लचीली इनपुट पद्धतियाँ",
    inputDesc:
      "अपनी शर्तों पर बातचीत करें। अंतर्निहित Web Speech API वॉइस इनपुट का उपयोग करके हैंड्स-फ्री प्रश्न पूछें। अतिरिक्त संदर्भ प्राप्त करने के लिए PDF, DOCX या TXT दस्तावेज़ भी अपलोड कर सकते हैं।",
  },

  services: {
    title: "क्वेरी जीवनचक्र",
    subtitle:
      "AstraQ प्राकृतिक भाषा अनुरोधों को गणितीय और वैज्ञानिक रूप से सत्यापित उत्तरों में कैसे संसाधित करता है।",
    step01Title: "उपयोगकर्ता क्वेरी इनपुट",
    step01Desc:
      "एक शोधकर्ता टेक्स्ट, वॉइस या कस्टम दस्तावेज़ अपलोड के माध्यम से \"INSAT-3D Imager चैनलों से प्राप्त SST दिखाएं\" जैसी क्वेरी दर्ज करता है।",
    step02Title: "इंटेंट राउटर",
    step02Desc:
      "हमारा FastAPI बैकएंड इंटेंट वर्गीकरण चलाता है। यह तय करता है कि क्वेरी को RAG दस्तावेज़ीकरण, संरचित Knowledge Graph तथ्यों, या हाइब्रिड रूटिंग की आवश्यकता है।",
    step03Title: "समानांतर खोज",
    step03Desc:
      "FAISS वेक्टर डेटाबेस (असंरचित ATBDs/दस्तावेज़) से मिलान प्राप्त करता है और Neo4j (संरचित उपग्रह-उत्पाद कनेक्शन) को समानांतर में क्वेरी करता है।",
    step04Title: "Gemini संश्लेषण",
    step04Desc:
      "Google Gemini को क्वेरी के साथ सटीक पुनर्प्राप्त संदर्भ प्राप्त होता है, जो वैज्ञानिक रूप से आधारित उत्तर संश्लेषित करता है।",
    step05Title: "तथ्य-आधारित उत्तर",
    step05Desc:
      "इंटरैक्टिव मेटाडेटा, सटीक उद्धरण और दस्तावेज़ स्रोत पूर्वावलोकन के साथ उपयोगकर्ता को प्रतिक्रिया देता है।",
  },

  faq: {
    title: "अक्सर पूछे जाने वाले प्रश्न",
    subtitle: "AstraQ और MOSDAC डेटा एक्सेस के बारे में जो कुछ भी आपको जानना चाहिए।",
    answerGrounding: "उत्तर आधार",
    systemResponse: "ASTRAQ सिस्टम प्रतिक्रिया",
    grounded: "100% तथ्य-आधारित",
    q1: "AstraQ क्या है?",
    a1: "AstraQ ISRO के MOSDAC उपग्रह डेटा के लिए एक संवादात्मक सहायक है। यह सिमेंटिक दस्तावेज़ खोज (RAG) को Neo4j ज्ञान ग्राफ़ के साथ जोड़कर उपग्रहों, डेटा उत्पादों, पैरामीटर और पुनर्प्राप्ति एल्गोरिदम के बारे में प्राकृतिक भाषा प्रश्नों का उत्तर देता है।",
    q2: "मैं किस तरह के प्रश्न पूछ सकता हूँ?",
    a2: "आप MOSDAC डेटा उत्पादों, उपकरणों और पैरामीटरों के बारे में पूछ सकते हैं: \"INSAT-3D कौन से उत्पाद प्रदान करता है?\", \"SST कैसे प्राप्त किया जाता है बताएं\", या \"AMV क्या है?\" जैसी परिभाषाएँ। आप कस्टम संदर्भ के लिए PDF/DOCX दस्तावेज़ भी अपलोड कर सकते हैं।",
    q3: "उत्तर कहाँ से आते हैं?",
    a3: "उत्तर Google Gemini द्वारा संश्लेषित किए जाते हैं, FAISS वेक्टर सर्च के माध्यम से MOSDAC दस्तावेज़ीकरण से प्राप्त संदर्भ और Neo4j ज्ञान ग्राफ़ से संरचित तथ्यों पर आधारित। स्रोत उद्धरण हमेशा प्रदान किए जाते हैं।",
    q4: "क्या मेरा चैट इतिहास निजी है?",
    a4: "हाँ। आपके चैट थ्रेड Firebase Auth द्वारा प्रमाणित हैं और Firestore में सुरक्षित रूप से संग्रहीत हैं। केवल आप उन्हें देख सकते हैं। हालांकि, आप विशिष्ट थ्रेड साझा करने के लिए सार्वजनिक रीड-ओनली लिंक बना सकते हैं और कभी भी एक्सेस रद्द कर सकते हैं।",
    q5: "पहली प्रतिक्रिया कभी-कभी धीमी क्यों होती है?",
    a5: "AstraQ एक सर्वर होस्ट पर चलता है जो निष्क्रियता की अवधि के दौरान सो जाता है। शांत अवधि के बाद पहली क्वेरी सर्वर को जगाती है, जिसमें एक मिनट तक का समय लग सकता है। बाद की प्रतिक्रियाएँ तुरंत संसाधित होती हैं।",
  },

  footer: {
    description:
      "प्राकृतिक भाषा प्रश्नों के माध्यम से ISRO के उपग्रह डेटासेट की खोज के लिए AI-संचालित सहायक, वास्तविक दस्तावेज़ीकरण पर आधारित।",
    dataPortals: "डेटा पोर्टल",
    information: "जानकारी",
    aboutProject: "प्रोजेक्ट के बारे में",
    termsConditions: "नियम और शर्तें",
    copyright: "© 2026 AstraQ · उपग्रह डेटा सहायक",
    builtBy:
      "AstraMind द्वारा निर्मित — डेटा इंजीनियरों, AI शोधकर्ताओं और अंतरिक्ष उत्साही लोगों का एक छात्र-नेतृत्व वाला समूह।",
    frontendRepo: "फ्रंटएंड रेपो",
    backendRepo: "बैकएंड रेपो",
    aboutTitle: "प्रोजेक्ट का दायरा",
    aboutP1:
      "AstraQ ISRO के MOSDAC उपग्रह डेटा रिकॉर्ड का अध्ययन और अन्वेषण करने के लिए बनाया गया एक उन्नत शैक्षिक RAG और रिलेशनल मेटाडेटा सहायक है।",
    aboutP2:
      "उपग्रह दस्तावेज़ीकरण (ATBDs, उपयोगकर्ता मैनुअल) को स्थानीय वेक्टर डेटाबेस में पार्स करके और संरचित पेलोड तथ्यों को ज्ञान ग्राफ़ में निकालकर, AstraQ सुनिश्चित करता है कि इसके प्राकृतिक भाषा सारांश पूरी तरह से आधारित और सत्यापन योग्य हैं।",
    aboutP3:
      "सत्र Firebase Authentication का उपयोग करके प्रबंधित किए जाते हैं और Cloud Firestore के अंदर निजी रूप से संग्रहीत किए जाते हैं।",
    termsTitle: "उपयोग दिशानिर्देश",
    terms1Title: "1. केवल शैक्षिक उद्देश्य",
    terms1:
      "AstraQ मौसम विज्ञान और समुद्र विज्ञान उपग्रह डेटासेट की खोज के लिए एक शैक्षिक उपकरण है। यह ISRO से संबद्ध, प्रायोजित या समर्थित नहीं है।",
    terms2Title: "2. डेटा प्रसंस्करण और गोपनीयता",
    terms2:
      "सभी उपयोगकर्ता रोस्टर और थ्रेड लॉग निजी हैं। सिस्टम Firestore के अंदर संदर्भ कैश करता है। दस्तावेज़ अपलोड क्वेरी संदर्भ निकालने के लिए क्षणिक रूप से संसाधित किए जाते हैं।",
    terms3Title: "3. सूचना विश्वसनीयता",
    terms3:
      "जबकि प्रतिक्रियाएँ वेक्टर-मैच्ड MOSDAC फ़ाइलों पर भारी रूप से आधारित हैं, उपयोगकर्ताओं को तैनाती से पहले आधिकारिक MOSDAC पोर्टल पर निर्देशांक और वैज्ञानिक मेट्रिक्स की दोबारा जाँच करनी चाहिए।",
  },

  login: {
    title: "वापस स्वागत है",
    brand: "AstraQ।",
    subtitle: "AI-संचालित संवादात्मक खोज के साथ ISRO के उपग्रह डेटा की खोज जारी रखने के लिए साइन इन करें।",
    secureLogin: "सुरक्षित लॉगिन",
    credentials: "जारी रखने के लिए अपनी जानकारी दर्ज करें",
    email: "ईमेल पता",
    password: "पासवर्ड",
    submit: "प्रवेश स्वीकृत",
    submitting: "साइन इन हो रहा है…",
    createAccount: "खाता बनाएँ",
    highlight1Title: "MOSDAC डेटा एक्सेस",
    highlight1Desc: "प्राकृतिक भाषा से ISRO उपग्रह डेटासेट क्वेरी करें।",
    highlight2Title: "सुरक्षित और निजी",
    highlight2Desc: "Firebase-प्रमाणित सत्र, प्रति-उपयोगकर्ता एन्क्रिप्टेड।",
    highlight3Title: "संवादात्मक AI",
    highlight3Desc: "वास्तविक दस्तावेज़ीकरण से उद्धरणों के साथ तथ्य-आधारित उत्तर।",
  },

  signup: {
    title: "अन्वेषण शुरू करें",
    brand: "AstraQ के साथ।",
    subtitle: "अपना मुफ्त खाता बनाएँ और AI-संचालित उपग्रह डेटा अन्वेषण तक तुरंत पहुँच प्राप्त करें।",
    createAccount: "खाता बनाएँ",
    joinSubtitle: "एक मिनट से कम में AstraQ से जुड़ें",
    confirmPassword: "पासवर्ड की पुष्टि करें",
    submit: "खाता बनाएँ",
    submitting: "खाता बनाया जा रहा है…",
    haveAccount: "पहले से खाता है?",
    signIn: "साइन इन करें",
    whatYouGet: "आपको क्या मिलता है",
    perk1: "RAG-संचालित दस्तावेज़ खोज",
    perk2: "ज्ञान ग्राफ़ अन्वेषण",
    perk3: "वॉइस और दस्तावेज़ अपलोड",
    passwordMismatch: "पासवर्ड मेल नहीं खाते।",
    passwordShort: "पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।",
  },

  chat: {
    newChat: "नई चैट",
    expandSidebar: "साइडबार विस्तृत करें",
    collapseSidebar: "साइडबार संक्षिप्त करें",
    noConversations: "अभी तक कोई बातचीत नहीं",
    loadingThreads: "लोड हो रहा है…",
    explore: "अन्वेषण करें",
    globalSearch: "वैश्विक खोज",
    kgExplorer: "KG एक्सप्लोरर",
    home: "होम",
    inputPlaceholder: "उपग्रहों, उत्पादों के बारे में पूछें…",
    attachFile: "फ़ाइल संलग्न करें",
    removeAttachment: "संलग्नक हटाएँ",
    startVoice: "वॉइस इनपुट शुरू करें",
    stopVoice: "वॉइस इनपुट बंद करें",
    sendMessage: "संदेश भेजें",
    openSidebar: "साइडबार खोलें",
    shareConversation: "बातचीत साझा करें",
    addFavorite: "पसंदीदा में जोड़ें",
    removeFavorite: "पसंदीदा से हटाएँ",
    welcomeBack: "वापस स्वागत है,",
    welcomeDefault: "AstraQ में आपका स्वागत है",
    welcomeSubtitle: "आपका बुद्धिमान अंतरिक्ष मिशन सहायक। उपग्रहों, पेलोड या ISRO विज्ञान डेटासेट के बारे में कुछ भी पूछें।",
    systemActive: "ASTRA-Q सिस्टम सक्रिय",
    starterSatPayload: "उपग्रह पेलोड",
    starterRetrieval: "पुनर्प्राप्ति तर्क",
    starterDataProducts: "डेटा उत्पाद",
    starterDefinitions: "परिभाषाएँ",
    source: "स्रोत",
    sources: "स्रोत",
  },

  settings: {
    title: "उपयोगकर्ता प्राथमिकताएँ",
    account: "खाता",
    displayName: "प्रदर्शन नाम",
    displayNamePlaceholder: "अपना नाम दर्ज करें",
    displayNameHint: "AstraQ चैट पैनल में आपका अभिवादन कैसे करता है।",
    responseStyle: "प्रतिक्रिया शैली",
    aiPersona: "AI व्यक्तित्व",
    personaStandard: "मानक (तथ्य-आधारित और सहायक)",
    personaExpert: "विशेषज्ञ (कठोर अकादमिक वैज्ञानिक)",
    personaFriendly: "मैत्रीपूर्ण (स्वागत करने वाला अंतरिक्ष गाइड)",
    personaHint: "विभिन्न टोन के लिए सिस्टम प्रॉम्प्ट को अनुकूलित करता है।",
    temperature: "तापमान",
    tempStrict: "सख्त / तथ्यात्मक",
    tempCreative: "रचनात्मक / प्रवाहशील",
    voice: "आवाज़",
    voiceHint: "संश्लेषित उत्तर स्वचालित रूप से चलाएँ।",
    voiceEnglishOnly: "ऑडियो आउटपुट केवल अंग्रेजी में उपलब्ध है।",
    language: "भाषा",
    languageHint: "अपनी पसंदीदा इंटरफ़ेस भाषा चुनें।",
    save: "प्राथमिकताएँ सहेजें",
    saving: "सहेजा जा रहा है...",
    saved: "प्राथमिकताएँ सहेजी गईं",
  },

  feedback: {
    title: "प्रतिक्रिया जमा करें",
    rateExperience: "अपने अनुभव को रेट करें",
    stars: "स्टार",
    tellUs: "हमें बताएं आप क्या सोचते हैं",
    placeholder: "क्या सुधार किया जा सकता है? कोई समस्या मिली?",
    submit: "प्रतिक्रिया जमा करें",
    submitting: "जमा हो रहा है...",
    successTitle: "प्रतिक्रिया जमा हो गई!",
    successMessage: "AstraQ को बेहतर बनाने में मदद करने के लिए धन्यवाद।",
  },

  help: {
    title: "सहायता और समर्थन",
    coreTitle: "बुद्धिमान कक्षा सहायक",
    coreDesc:
      "AstraQ ISRO के MOSDAC उपग्रह दस्तावेज़ीकरण और मेटाडेटा की खोज के लिए RAG और ज्ञान-ग्राफ़ रूटिंग का उपयोग करने वाला एक ओपन-सोर्स सहायक है।",
    exampleQueries: "उदाहरण प्रश्न",
    systemFeatures: "सिस्टम विशेषताएँ",
    voiceInput: "वॉइस इनपुट",
    voiceInputDesc: "हैंड्स-फ्री प्रश्न पूछें।",
    fileUpload: "फ़ाइल अपलोड",
    fileUploadDesc: "कस्टम PDF संदर्भ पर आधारित।",
    kgExplorer: "KG एक्सप्लोरर",
    kgExplorerDesc: "डेटा संबंध दृश्य रूप से ब्राउज़ करें।",
    keyboardShortcuts: "कीबोर्ड शॉर्टकट",
    sendMessage: "संदेश भेजें",
  },

  favorites: {
    title: "तारांकित बातचीत",
    empty: "अभी तक कोई तारांकित बातचीत नहीं।",
    emptyHint: "उन्हें यहाँ सहेजने के लिए मुख्य हेडर में चैट थ्रेड को तारांकित करें।",
    messages: "संदेश",
  },

  explorer: {
    title: "ज्ञान ग्राफ़ एक्सप्लोरर",
    subtitle:
      "MOSDAC उपग्रह ज्ञान ग्राफ़ — उपग्रह, उत्पाद, पैरामीटर, क्षेत्र, पेलोड और एल्गोरिदम, जुड़े हुए।",
    loading: "ज्ञान ग्राफ़ लोड हो रहा है…",
    unavailable: "ज्ञान ग्राफ़ अनुपलब्ध",
    unavailableHint: "Neo4j डेटाबेस रुका हुआ हो सकता है — एक मिनट में पुनः प्रयास करें।",
    findNode: "एक नोड खोजें (जैसे INSAT-3D)…",
    graphOverview: "ग्राफ़ अवलोकन",
    nodes: "नोड्स",
    edges: "किनारे",
    byType: "प्रकार के अनुसार",
    clickToInspect: "निरीक्षण के लिए एक नोड पर क्लिक करें। ज़ूम के लिए स्क्रॉल करें, पैन के लिए ड्रैग करें।",
    properties: "गुण",
    connections: "कनेक्शन",
    viewSatellitePage: "उपग्रह पृष्ठ देखें",
    askAstraQ: "इसके बारे में Astra-Q से पूछें",
  },

  satellites: {
    title: "उपग्रह डेटाबेस",
    subtitle: "भारतीय पृथ्वी-अवलोकन उपग्रह और उनके MOSDAC डेटा उत्पाद कैटलॉग।",
    missions: "मिशन",
    datasets: "डेटासेट",
    status: "स्थिति",
    nominal: "सामान्य",
    agency: "एजेंसी",
    allMissions: "सभी मिशन",
    all: "सभी",
    insatSeries: "INSAT श्रृंखला",
    insat: "INSAT",
    oceansatSeries: "Oceansat श्रृंखला",
    oceansat: "Oceansat",
    otherScience: "अन्य विज्ञान",
    others: "अन्य",
    filterPlaceholder: "नाम या उत्पाद से फ़िल्टर करें…",
    loading: "उपग्रह लोड हो रहे हैं…",
    loadError: "उपग्रह लोड नहीं हो सके",
    loadErrorHint: "ज्ञान ग्राफ़ रुका हुआ हो सकता है — एक मिनट में पुनः प्रयास करें।",
    noMatch: "कोई उपग्रह मेल नहीं खाता",
    noSeries: "इस श्रृंखला में अभी तक कोई उपग्रह सूचीबद्ध नहीं है।",
    active: "सक्रिय",
    available: "उपलब्ध",
    missionClass: "मिशन वर्ग",
    meteorological: "मौसम विज्ञान",
    oceanographic: "समुद्र विज्ञान",
    scientific: "वैज्ञानिक",
    primarySensors: "प्राथमिक सेंसर और डेटासेट",
    more: "और",
  },

  satelliteDetail: {
    allSatellites: "सभी उपग्रह",
    online: "ऑनलाइन",
    dataProducts: "डेटा उत्पाद",
    dataProductsPlural: "डेटा उत्पाद",
    askAstraQ: "इसके बारे में Astra-Q से पूछें",
    dataCatalog: "डेटा कैटलॉग",
    cataloged: "सूचीबद्ध",
    noProducts: "ज्ञान ग्राफ़ में इस उपग्रह के लिए कोई उत्पाद दर्ज नहीं हैं।",
    spacecraftSpecs: "अंतरिक्ष यान विनिर्देश",
    payloads: "पेलोड",
    selectProduct: "बाईं ओर कैटलॉग से कोई डेटा उत्पाद चुनें और इस दाईं ओर के टेलीमेट्री पैनल में उसका पार्स किया गया दस्तावेज़ लोड करने के लिए **देखें** पर क्लिक करें।",
    docViewer: "टेलीमेट्री डेटासेट व्यूअर",
    retrievingDoc: "दस्तावेज़ सामग्री प्राप्त हो रही है…",
    docLoadFailed: "सामग्री लोड करने में विफल",
    viewOriginal: "मूल वेबसाइट देखें",
    relatedPdfs: "संबंधित PDFs",
    docMetadata: "दस्तावेज़ मेटाडेटा",
    view: "देखें",
    viewing: "देख रहे हैं",
  },

  searchPage: {
    title: "वैश्विक खोज",
    subtitle: "MOSDAC दस्तावेज़ कॉर्पस में सिमेंटिक खोज, या अपने चैट इतिहास से बातचीत प्राप्त करें।",
    docsPlaceholder: "दस्तावेज़ खोजें — जैसे समुद्र सतह तापमान एल्गोरिदम…",
    messagesPlaceholder: "अपने संदेश खोजें…",
    documents: "दस्तावेज़",
    myMessages: "मेरे संदेश",
    searching: "कॉर्पस खोज रहा है…",
    startSearch: "अपनी खोज शुरू करें",
    startSearchDocsHint:
      "ISRO के MOSDAC दस्तावेज़ीकरण कॉर्पस से तकनीकी विनिर्देश, ATBD गाइड और उत्पाद परिभाषाएँ खोजें।",
    startSearchMsgHint:
      "पिछले प्रश्नों और विस्तृत प्रतिक्रियाओं का पता लगाने के लिए अपने निजी वार्तालाप इतिहास में खोजें।",
    noResults: "कोई परिणाम नहीं मिला",
    noResultsHint: "हमारे",
    docDatabase: "दस्तावेज़ीकरण डेटाबेस",
    chatThreads: "चैट थ्रेड्स",
    tryRephrasing: "में नहीं मिला। दूसरे शब्दों में प्रयास करें।",
    expand: "विस्तार करें",
    collapse: "संक्षिप्त करें",
    copyText: "कॉपी",
    copied: "कॉपी हुआ",
    openPdf: "PDF",
    askAstraQ: "AstraQ से पूछें",
  },

  learnMore: {
    backHome: "होम पर वापस",
    title: "AstraQ के अंदर",
    subtitle:
      "ISRO के MOSDAC उपग्रह डेटासेट तक AI-संचालित पहुँच को शक्ति प्रदान करने वाले आर्किटेक्चर, विशेषताओं और डेटा पाइपलाइन का अन्वेषण करें।",
    readyToExplore: "अन्वेषण के लिए तैयार?",
    readyCta:
      "उपग्रह डेटा क्वेरी करना, ज्ञान ग्राफ़ एक्सप्लोर करना और सेकंडों में तथ्य-आधारित AI उत्तर प्राप्त करना शुरू करें।",
    tryAstraQ: "AstraQ आज़माएँ",
    backToHome: "होम पर वापस",
    systemDesign: "सिस्टम डिज़ाइन",
    architectureTitle: "आर्किटेक्चर",
    architectureDesc:
      "AstraQ ISRO के MOSDAC डेटा की खोज के लिए तैयार किया गया एक AI सहायक है। यह FastAPI बैकएंड, FAISS वेक्टर सर्च, Neo4j ज्ञान ग्राफ़ और Google Gemini को एक एकीकृत संवादात्मक इंटरफ़ेस में जोड़ता है।",
    capabilities: "क्षमताएँ",
    featuresTitle: "विशेषताएँ",
    featuresDesc:
      "दस्तावेज़-आधारित पुनर्प्राप्ति के साथ सिमेंटिक खोज, ज्ञान ग्राफ़ प्रासंगिक तर्क, और PDFs, APIs और गतिशील सामग्री के लिए समर्थन — सब कुछ वास्तविक MOSDAC दस्तावेज़ीकरण पर आधारित।",
    dataFlow: "डेटा प्रवाह",
    processTitle: "प्रक्रिया प्रवाह",
    processDesc:
      "उपयोगकर्ता क्वेरी से तथ्य-आधारित प्रतिक्रिया तक: इंटेंट वर्गीकरण FAISS वेक्टर सर्च और Neo4j ग्राफ़ क्वेरीज़ को समानांतर में रूट करता है, फिर Gemini एक उद्धृत उत्तर संश्लेषित करता है।",
  },

  share: {
    sharedConversation: "साझा बातचीत",
    notFound: "यह साझा लिंक मौजूद नहीं है",
    notFoundHint: "लिंक उसके स्वामी द्वारा रद्द कर दिया गया हो सकता है।",
    error: "कुछ गलत हो गया",
    errorHint: "कृपया कुछ क्षणों में पुनः प्रयास करें।",
    tryAstraQ: "Astra-Q आज़माएँ",
    loading: "साझा बातचीत लोड हो रही है…",
    poweredBy: "संचालित",
    startOwn: "अपनी बातचीत शुरू करें",
    astraQDesc: "ISRO के MOSDAC उपग्रह डेटा के लिए AI उत्तर।",
  },

  misc: {
    warmingUp:
      "बैकएंड सर्वर जाग रहा है — पहली बार आने पर इसमें एक मिनट तक का समय लग सकता है।",
  },
};

const translations: Record<Locale, typeof en> = { en, hi };

export type Translations = typeof en;

export function getTranslations(locale: Locale): Translations {
  return translations[locale];
}
