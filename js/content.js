/* ==================================================================
   ALL SITE TEXT LIVES IN THIS FILE.
   On GitHub: open this file, click the pencil icon, edit, then
   "Commit changes". The live site updates in about a minute.

   Rules so nothing breaks:
   - Keep the "quotes" around text and the comma at the end of each line.
   - To use a " inside text, write \" instead.
   - Links inside write-ups work like Notion: [UN SDGs](https://...)
   Lines marked  // TODO  are things to double-check or fill in.
   ================================================================== */

window.SITE = {
  /* ---------------- HERO (top of the page) ---------------- */
  name: "Fiza Khan",

  // The line under your name, inside the viewfinder
  tagline: "Data analyst & marketer",

  // The bigger sentence below the video. Other options to try:
  //   "Data analyst with a camera."
  //   "I find the story in the data, then I shoot it."
  //   "Analysis and visuals, in the same frame."
  //   "Numbers on one side, a lens on the other."
  intro: "Walking the line between data and visuals.",

  status: "Graduating Spring 2027 · Open to data & marketing roles",
  school: "B.S. Statistics: Statistical Data Science · UC Davis",
  email: "fizaxkhan04@gmail.com",
  resume: "assets/Fiza-Khan-Resume.pdf",
  links: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/fiza-khan-datascience/" },
    { label: "Tableau", url: "https://public.tableau.com/app/profile/fiza.khan6132/vizzes" },
    { label: "GitHub", url: "https://github.com/fizaxkhan04" },
  ],

  // The rotating "Featured work" cards in the hero (use project ids from below)
  featured: ["capsules", "emissions", "sdg", "ambassador"],

  /* ---------------- WORK ----------------
     Each project opens in the Notion format:
       title, tagline (emoji line), Organization / Timeline / Role,
       Overview, Problem, Solution, Process, Impact.
     Leave a section out and it simply won't show.

     summary  = the subtitle on the tile (like your Notion gallery)
     stat     = the small badge on the cover
     cat      = filters: "data", "marketing", "video" (can have several)
     thumb    = the cover:
                { kind: "image", file: "name-in-assets/photos", fit: "top" or "contain" }
                or a drawn one: "nodes", "scatter", "bars", "map", "rings", "flow", "grid", "income", "type", "photo"
     embed    = media in the project: { kind: "file", src: "assets/video/x.mp4" } plays your own video;
                "tableau", "drive", "linkedin", "youtube" embed from those sites
  */
  projects: [
    {
      id: "capsules",
      title: "Knowledge Capsules",
      kicker: "AI startup · Tokyo",
      summary: "AI-sorted farmer voice notes and a master-vs-new farmer study at a Tokyo agri-tech startup.",
      tagline: "🌾 Connecting new farmers' questions with master farmers' knowledge",
      stat: "400+ voice notes · 80% relevance",
      cat: ["data"],
      year: "2026",
      org: "KimPax · Tokyo, Japan",
      timeline: "Jun – Aug 2026",
      role: "Agri-Tech Data Analyst Intern",
      tools: ["Python", "OpenAI API", "Prompt engineering", "Jupyter / Colab", "GitHub", "Heatmaps"],
      overview:
        "As an Agri-Tech Data Analyst Intern at [KimPax](https://kimpax.com) in Tokyo, I built an AI classifier that sorted 400+ farmer voice messages into reusable \"knowledge capsules\", then analyzed how master farmers and less experienced community farmers share knowledge across 18 crop stages. I presented the results at KimPax's Technology Showcase in Shibuya on August 12, 2026.",
      // TODO: check that Problem and Solution say it the way you would
      problem: [
        "Farmers shared what they knew as voice notes, photos and field data, which is hard to search or reuse",
        "There was no clear way to tell which crop stages new farmers struggle with, or where master farmers' advice fills the gap",
      ],
      solution: [
        "Prompt-engineered a classification program with OpenAI's API to sort 400+ audio messages automatically",
        "Mapped every message onto an 18-stage crop ontology and scored how relevant each insight was",
        "Compared message types (record, action, consideration) for both groups with relevance heatmaps",
      ],
      process: [
        ["Capture", "Gathered farmers' voice notes, images and field data"],
        ["Structure", "Organized everything with an 18-stage crop ontology and decision logic"],
        ["Classify", "Used prompt-engineered OpenAI API calls to categorize 400+ messages"],
        ["Analyze", "Built heatmaps of average relevance by crop stage and message type"],
        ["Document", "Kept workflows and documentation in Jupyter/Colab and the company's shared GitHub repo"],
        ["Present", "Reported findings to AgTech founders and at an international industry event (~30 attendees)"],
      ],
      impact: [
        "🌱 Covered 12 of 18 crop stages",
        "⭐ 80% of shared insights scored as highly relevant, showing the knowledge exchange works",
        "🔍 Found new farmers focus on fruit set, fruit development and flower differentiation (72.5% avg. relevance), while master farmers focus on greenhouse closure and season wind-down (68.8%)",
        "🛠️ Improved the categorization workflow in the company's shared repository",
      ],
      thumb: { kind: "image", file: "kimpax-poster", fit: "top" },
      links: [{ label: "View the showcase poster (PDF)", url: "assets/docs/KimPax-Knowledge-to-Value-Poster.pdf" }],
    },
    {
      id: "kimpax",
      title: "KimPax Company Film",
      kicker: "Brand video",
      summary: "Company intro video shown at an international industry event.",
      tagline: "🎬 Introducing an agri-tech startup in 90 seconds",
      stat: "Shown at an international event",
      cat: ["marketing", "video"],
      year: "2026",
      org: "KimPax · Tokyo, Japan",
      timeline: "Summer 2026",
      role: "Videographer · Editor", // TODO: confirm role
      tools: ["Videography", "Editing", "Brand storytelling"],
      overview:
        "During my internship I produced KimPax's company introduction video, plus technical and promotional videos about our project findings. The intro film was shown at an international industry event attended by people from agriculture, AI and sustainability.",
      // TODO: add Problem / Solution / Process if you want this one fuller
      impact: [
        "🎤 Shown to an international, cross-industry audience",
        "📣 Became the company's introduction video",
      ],
      thumb: { kind: "photo", file: "kimpax-film-poster", word: "KimPax", sub: "company film" },
      embed: { kind: "file", src: "assets/video/kimpax-film.mp4", poster: "assets/photos/kimpax-film-poster.jpg" },
      links: [],
    },
    {
      id: "emissions",
      title: "Emissions by Country",
      kicker: "Tableau dashboard",
      summary: "Example dashboard shown to 2,000+ students over the summer.",
      tagline: "🎓 The model capstone for 2,000+ Data Science Scholars",
      stat: "Shown to 2,000+ students",
      cat: ["data"],
      year: "2025",
      org: "Kode With Klossy",
      timeline: "1 week",
      role: "Data Analysis · Project Management · Design",
      tools: ["Tableau", "Data visualization", "Data storytelling"],
      overview:
        "I built this Tableau dashboard as the example final project for [Kode With Klossy](https://www.kodewithklossy.com/)'s Data Science Scholars. It was shown to more than 2,000 students over the summer as the standard for their own capstones.",
      problem: [
        "Scholars needed a clear, concrete example of what a strong final project looks like",
      ],
      solution: [
        "Built a dashboard that models good analysis, visual design and storytelling in one place",
      ],
      process: [
        ["Comparison", "Top 10 countries by average oil, coal and gas emissions"],
        ["Mix", "Emission source breakdown for the USA, China and Russia"],
        ["Map", "World map of average total emissions by country"],
      ],
      impact: [
        "🎓 Shown to 2,000+ students over the summer",
        "📐 Set the bar for analysis, design and storytelling in scholars' final projects",
      ],
      thumb: { kind: "image", file: "emissions-dashboard", fit: "contain" },
      embed: {
        kind: "tableau",
        src: "https://public.tableau.com/views/EmissionsbyCountryandType/Dashboard1?:showVizHome=no&:embed=true",
      },
      links: [
        { label: "Open on Tableau Public", url: "https://public.tableau.com/views/EmissionsbyCountryandType/Dashboard1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link" },
      ],
    },
    {
      id: "sdg",
      title: "SDGs Campus Analysis",
      kicker: "Tableau map · survey",
      summary: "Mapping UC Davis's progress on the UN Sustainable Development Goals.",
      tagline: "🌍 Mapping UC Davis's Progress on the UN SDGs",
      stat: "1,000+ rows cleaned",
      cat: ["data"],
      year: "2026",
      org: "UC Davis Global Learning Hub",
      timeline: "3 months",
      role: "SDGs Intern – Data Analyst",
      tools: ["Excel", "Tableau", "AI tools", "Survey design", "PowerPoint"],
      overview:
        "As a Sustainable Development Goals Intern with [UC Davis Global Learning Hub](https://globallearning.ucdavis.edu/pathways/experience/internships/sdg), I analyzed campus data (mainly financial and seed grant records) to measure UC Davis's progress on its commitment to the [UN SDGs](https://globalaffairs.ucdavis.edu/un-sdgs-uc-davis). Using Excel and Tableau, I turned that data into on-brand visuals and presentations for campus leadership, and helped design a survey to capture student engagement with the SDGs.",
      problem: [
        "The financial data was very large, messy, and unstandardized across sources",
        "Heavily skewed values kept Tableau from producing a usable interactive map",
        "All deliverables had to meet UC Davis branding guidelines for leadership audiences",
        "There was little data on how students themselves engage with the SDGs",
      ],
      solution: [
        "Cleaned and standardized the dataset in Excel, using AI tools to speed up repetitive cleanup",
        "Applied a log transformation so the skewed funding values displayed meaningfully in Tableau",
        "Built visuals and slides that followed UC Davis brand colors, fonts, and layout standards",
        "Helped develop and distribute a student survey to measure campus commitment to the SDGs",
      ],
      process: [
        ["Data Cleaning", "Removed duplicates and invalid entries, and standardized categories, names, and formats across 1,000+ rows"],
        ["Transformation", "Log-transformed funding amounts to correct skew for mapping and comparison"],
        ["Visualization", "Built an interactive Tableau map and charts showing seed grant activity"],
        ["Survey Design", "Helped write questions, then distributed the survey to students via email, and collected 20 responses"],
        ["Communication", "Created branded presentations summarizing findings for campus leadership"],
      ],
      impact: [
        "📊 Turned an unusable raw dataset into a clean, analysis-ready resource for the SDGs team",
        "🗺️ Delivered an interactive Tableau map that made funding distribution across SDGs easy to explore",
        "📝 Gathered student input that highlighted campus engagement with the SDGs",
        "🎤 Supported presentations to campus heads with clear, on-brand visuals",
      ],
      thumb: { kind: "image", file: "sdg-map", fit: "contain" },
      links: [],
    },
    {
      id: "regression",
      title: "Housing Price Regression",
      kicker: "Statistical modeling",
      summary: "What drives home prices? A regression study of 4,600 homes.",
      tagline: "🏠 How bedrooms, bathrooms and square footage move home prices",
      stat: "4,600 homes · R² 53.8%",
      cat: ["data"],
      year: "2026",
      org: "UC Davis · STA 108",
      timeline: "Winter 2026",
      role: "Data Analyst",
      tools: ["R", "Multiple linear regression", "Forward selection", "AIC", "Model diagnostics"],
      overview:
        "For my STA 108 regression final project, I used a Kaggle dataset of 4,600 homes to study how structural features relate to sale price: bedrooms, bathrooms, square footage, floors, year built and condition.",
      problem: [
        "Sale prices were severely right-skewed (average $551,963, maximum $26.59M)",
        "The first model's diagnostic plots showed violations of linearity, normality and constant variance",
      ],
      solution: [
        "Log-transformed price to improve model fit",
        "Chose predictors with forward selection, adjusted R² and AIC",
        "Added a square-footage polynomial term, which fixed the linearity, normality and variance problems",
      ],
      process: [
        ["EDA", "Scatterplots and boxplots of log price against each predictor"],
        ["Model 1", "Six predictors, adjusted R² 51.05%, AIC 3922.3"],
        ["Model 2", "Added sqft_living², adjusted R² 53.81%, AIC 3776.5"],
        ["Diagnostics", "Residual, Q-Q, scale-location and Cook's distance checks; influential points retained"],
      ],
      impact: [
        "📈 Final model explains 53.81% of the variation in home prices",
        "✅ All six predictors statistically significant (p < 0.05)",
        "🛁 Each extra bathroom is linked to a 0.122 increase in log price, holding everything else equal",
      ],
      thumb: { kind: "image", file: "sta108-poster", fit: "top" },
      links: [{ label: "Read the poster (PDF)", url: "assets/docs/STA108-Housing-Regression-Fiza-Khan.pdf" }],
    },
    {
      id: "infosys",
      title: "What Tech Jobs Ask For",
      kicker: "Web scraping · text analysis",
      summary: "Six-week data challenge on web-scraped job postings.",
      tagline: "🧑‍💻 Turning messy job postings into a map of in-demand skills",
      stat: "Presented to a judging panel",
      cat: ["data"],
      year: "2025",
      org: "Infosys × Kode With Klossy",
      timeline: "1.5 months",
      role: "Data Challenge Participant",
      tools: ["Python", "BeautifulSoup", "APIs", "pandas", "Text analysis"],
      overview:
        "In a 1.5-month data challenge from [Infosys](https://www.infosys.com/) and [Kode With Klossy](https://www.kodewithklossy.com/), I worked on a team to analyze technology job postings and find trends in the skills, tools and qualifications employers ask for.",
      problem: [
        "Students and early-career applicants struggle to tell which skills employers actually want",
        "Job descriptions are long, unstructured text",
      ],
      solution: [
        "Collected postings with web scraping and APIs",
        "Used text analysis to turn descriptions into countable skills, tools and qualifications",
      ],
      impact: [
        "🏆 Presented our findings to a panel of judges",
      ],
      thumb: { kind: "bars" },
      links: [
        { label: "Code on GitHub", url: "https://github.com/fizaxkhan04/Data-Challenge" },
        { label: "Presentation", url: "https://fizacloset.my.canva.site/data-challenge-presentation" },
      ],
    },
    {
      id: "ambassador",
      title: "Ambassador Program",
      kicker: "Program management · automation",
      summary: "Ran an 11-person ambassador cohort and automated its content workflow.",
      tagline: "⚙️ One program, 11 ambassadors, a 7-stage automated pipeline",
      stat: "11 ambassadors · 7 stages",
      cat: ["marketing"],
      year: "2025",
      org: "Kode With Klossy",
      timeline: "Nov 2024 – Jun 2025",
      role: "Content & Community Creative Intern",
      tools: ["Zapier", "Airtable", "Frame.io", "Circle", "Google Workspace", "Notion"],
      overview:
        "I owned [Kode With Klossy](https://www.kodewithklossy.com/)'s ambassador program end to end, from applicant review and cohort selection to managing 11 ambassadors through content development and campaigns. Behind it, I built the automated workflow the team now uses.",
      problem: [
        "Ambassador content moved through submissions, reviews and approvals by hand",
        "Coordinating 11 people's content took a lot of manual follow-up",
      ],
      solution: [
        "Designed a 7-stage content workflow connecting Google Workspace, Airtable, Frame.io and Circle through Zapier",
        "Automated submission routing, peer review, notifications, status tracking and file management",
        "Wrote an onboarding guide so the team could adopt the new system",
      ],
      process: [
        ["Recruiting", "Reviewed applicants and selected the cohort"],
        ["Managing", "Guided 11 ambassadors through content development and campaigns"],
        ["Reviewing", "Gave creative and strategic feedback on every piece for brand fit and messaging"],
        ["Automating", "Built the Zapier pipeline across Airtable, Frame.io, Circle and Google Workspace"],
        ["Onboarding", "Documented the process and system logic for the team"],
      ],
      impact: [
        "⚙️ Replaced manual coordination with a scalable, automated process",
        "📚 Left documentation future cohorts can run with",
      ],
      // COVER: upload a photo from teaching (DS instructor) or the ambassador program overview as
      // assets/photos/ambassador-cover.jpg, then swap the line below for:
      // thumb: { kind: "image", file: "ambassador-cover", fit: "top" },
      thumb: { kind: "flow" },
      links: [],
    },
    {
      id: "trend",
      title: "Trend-Driven Social",
      kicker: "TikTok · Instagram",
      summary: "Trendy photo and video content for marketing KWK programs.",
      tagline: "📱 Taking social trends and making them fit the brand",
      stat: "6 posts · 2 platforms",
      cat: ["marketing", "video"],
      year: "2025",
      org: "Kode With Klossy",
      role: "Content & Community Creative Intern",
      tools: ["Trend research", "Short-form editing", "Canva"],
      overview:
        "I made trend-driven content to raise engagement and visibility for Kode With Klossy on TikTok and Instagram: finding relevant trends, editing short-form videos, and adapting each one to the organization's mission and audience.",
      pieces: [
        "Teacher Appreciation Post — Instagram",
        "Sign-Up Reminder — Instagram",
        "Grammys Memes — Instagram",
        "Trend Video: Butterfly Effect — TikTok",
        "Event Marketing — TikTok",
        "Trend Video — TikTok",
      ],
      thumb: { kind: "grid" },
      links: [], // TODO: link to the TikTok / Instagram posts
    },
    {
      id: "linkedin",
      title: "Data Intern in Japan",
      kicker: "LinkedIn video series",
      summary: "Weekly LinkedIn videos on what I learned as a data intern in Japan.",
      tagline: "🗼 Insider tips, data skills and Japan adventures, every week",
      stat: "Weekly episodes",
      cat: ["marketing", "video"],
      year: "2026",
      org: "LinkedIn · personal series",
      timeline: "Summer 2026",
      role: "Creator · Host · Editor",
      tools: ["Short-form video", "Personal branding", "Content strategy"],
      overview:
        "Each week I posted a short LinkedIn video about what I was learning as a data analyst intern in Tokyo: tips from inside the job, data skills worth knowing, and life in Japan.",
      thumb: { kind: "photo", file: "img_5520", word: "日本", sub: "weekly from Tokyo" },
      embed: { kind: "linkedin", ids: ["7479913315008266240", "7482871896296812545"] },
      links: [{ label: "Watch the series on LinkedIn", url: "https://www.linkedin.com/in/fiza-khan-datascience/recent-activity/all/" }],
    },
    {
      id: "sekaia",
      title: "SEKAIA Video Competition",
      kicker: "Short film",
      summary: "Won 1st place at the SEKAIA Video Competition.",
      tagline: "🏆 A 40-second film about the moments worth remembering",
      stat: "1st place",
      cat: ["video"],
      year: "2026", // TODO: confirm year
      org: "SEKAIA",
      role: "Director · Editor", // TODO: confirm role
      tools: ["Videography", "Editing"],
      overview:
        "My 40-second film won first place in the SEKAIA Video Competition. I shot it in Japan: fireworks, Tokyo at night, lanterns, the coast and the friends I made there.", // TODO: add the brief or how you made it
      thumb: { kind: "photo", file: "sekaia-poster", word: "1st", sub: "SEKAIA video competition" },
      embed: { kind: "file", src: "assets/video/sekaia-film.mp4", poster: "assets/photos/sekaia-poster.jpg" },
      links: [],
    },

    /* ===== NEW PROJECT TEMPLATE =====
       To add a project: copy everything from the { to the }, below,
       and paste it ABOVE this template (right after the last project's },).
       Then fill it in. Delete any section you don't need; it simply won't show.

    {
      id: "new-project",              // unique, lowercase, no spaces
      title: "Project Title",
      kicker: "Short label · e.g. Tableau dashboard",
      summary: "One line for the tile, like your Notion gallery.",
      tagline: "✨ The emoji line under the title",
      stat: "Badge on the cover",
      cat: ["data"],                    // "data", "marketing", "video"
      year: "2026",
      org: "Organization",
      timeline: "3 months",
      role: "Your role",
      tools: ["Tool one", "Tool two"],
      overview: "What it was, in a few sentences. Links work like [this](https://example.com).",
      problem: [
        "First problem",
        "Second problem",
      ],
      solution: [
        "First thing you did",
      ],
      process: [
        ["Step name", "What happened in this step"],
      ],
      impact: [
        "📊 A result",
      ],
      thumb: { kind: "image", file: "your-image-name", fit: "top" },   // file name in assets/photos, without .jpg
      links: [
        { label: "Open the project", url: "https://example.com" },
      ],
    },

    ===== END OF TEMPLATE ===== */
  ],

  /* -------------- EXPERIENCE --------------
     Shown as the staggered "schedule". Newest first.  */
  experience: [
    {
      date: "Jun—Aug 2026",
      role: "Agri-Tech Data Analyst Intern",
      org: "KimPax",
      place: "Tokyo, Japan",
      points: [
        "Built an OpenAI-API classifier that sorted 400+ audio messages",
        "Compared expert and novice farmer decision-making; presented to founders",
        "Made the company's intro film for an international industry event",
      ],
      project: "capsules",
      img: "img_5520", // TODO: swap in your own photo for each role (file name in assets/photos)
    },
    {
      date: "Mar 2026—now",
      role: "Sustainable Development Goals Intern",
      org: "UC Davis Global Learning Hub",
      place: "Davis, CA",
      points: [
        "Cleaned 1,000+ rows of campus funding and seed grant data",
        "Built an interactive Tableau map of seed grant funding by SDG",
        "Co-designed a student survey and presented on-brand findings to campus leadership",
      ],
      project: "sdg",
      img: "dsc04085",
    },
    {
      date: "Nov 2024—Jun 2025",
      role: "Content & Community Creative Intern",
      org: "Kode With Klossy",
      place: "Remote",
      points: [
        "Ran the ambassador program end to end with a cohort of 11",
        "Automated a 7-stage content workflow with Zapier and Airtable",
        "Directed and reviewed all ambassador marketing content",
      ],
      project: "ambassador",
      img: "img_1456",
    },
    {
      date: "May—Jul 2024",
      role: "Data Science Instructor Assistant",
      org: "Kode With Klossy",
      place: "Atlanta, GA · Hybrid",
      points: [
        "Taught Python, SQL, Looker Studio, Colab and Kaggle",
        "Supported a class of 30 students in a 2-week camp",
        "Project-managed 4 teams' data science projects at once",
      ],
      img: "img_4525",
    },
  ],

  education: [
    ["University of California, Davis", "B.S. Statistics: Statistical Data Science", "2025—2027"],
    ["Las Positas College", "A.S. Mathematics · A.S. Liberal Arts & Sciences", "2022—2025"],
  ],

  skills: {
    Data: [
      ["Python", "pandas, NumPy, scikit-learn, matplotlib, BeautifulSoup"],
      ["R", "regression, statistical modeling"],
      ["Tableau", "dashboards, storytelling"],
      ["Excel", "analysis, visualization, VBA"],
      ["SQL · Jupyter", "querying, notebooks, Colab"],
    ],
    Creative: [
      ["Video", "shooting, editing, short-form"],
      ["Photography", "landscape, editorial"],
      ["Automation", "Zapier, Airtable, Frame.io"],
      ["Design", "Canva, PowerPoint, HTML/CSS"],
      ["Languages", "English, Spanish (biliterate)"],
    ],
  },

  honors: [
    "Benjamin A. Gilman International Scholarship",
    "Crankstart Scholarship",
    "Experiential Learning Award",
    "Larry N. Vanderhoef Study Abroad Award",
    "Kode With Klossy Future Fund",
    "1st place · SEKAIA Video Competition",
    "State Seal of Biliteracy · Spanish",
  ],

  /* -------------- ARCHIVE (photography) --------------
     file  = name in assets/photos (a 700px copy lives in assets/photos/sm)
     shape = "l" landscape 4:3, "p" portrait 3:4, "v" vertical video 9:16
     video = clip in assets/video (H.264 .mp4); plays on hover (Live Photos)
     film  = true for a real video: it plays whenever it is centered, and opens full-screen  */
  photos: [
    { file: "dsc04115", shape: "l", caption: "Funaya boathouses, Ine" },
    { file: "img_1560", shape: "p", caption: "Blue water, green walls", video: "img_1560.mp4" },
    { file: "img_1559", shape: "v", caption: "Red bridge, mountain river", video: "img_1559.mp4", film: true },
    { file: "dsc04064", shape: "l", caption: "Kiyomizu-dera, Kyoto" },
    { file: "img_2230", shape: "p", caption: "Cocoon Tower, Shinjuku", video: "img_2230.mp4" },
    { file: "img_1686", shape: "p", caption: "Sky lanterns" },
    { file: "dsc04077", shape: "l", caption: "River and forest" },
    { file: "img_5520", shape: "p", caption: "Tokyo Tower at dusk", video: "img_5520.mp4" },
    { file: "img_3191", shape: "p", caption: "Dessert with a view", video: "img_3191.mp4" },
    { file: "img_3384", shape: "v", caption: "Boat across the green", video: "img_3384.mp4", film: true },
    { file: "img_1657", shape: "p", caption: "Tunnel in the green", video: "img_1657.mp4" },
    { file: "img_2344", shape: "p", caption: "Lantern, Harajuku", video: "img_2344.mp4" },
    { file: "dsc04119", shape: "l", caption: "Waterfront, Ine" },
    { file: "img_5508", shape: "p", caption: "Looking up, Tokyo", video: "img_5508.mp4" },
    { file: "img_3434", shape: "p", caption: "Ribbon over the river" },
    { file: "img_3313", shape: "v", caption: "River grass", video: "img_3313.mp4", film: true },
    { file: "dsc03820", shape: "l", caption: "Flower shop" },
    { file: "img_3177", shape: "p", caption: "Pagoda, blue hour", video: "img_3177.mp4" },
    { file: "img_4351", shape: "p", caption: "Evening trains, Tokyo" },
    { file: "img_4525", shape: "p", caption: "Café by the crossing", video: "img_4525.mp4" },
    { file: "img_1636", shape: "p", caption: "Mountain road", video: "img_1636.mp4" },
    { file: "img_1813", shape: "p", caption: "Konbini signs", video: "img_1813.mp4" },
    { file: "img_3666", shape: "p", caption: "Boathouses, Ine" },
    { file: "img_1227", shape: "p", caption: "Garden basin", video: "img_1227.mp4" },
    { file: "img_5473", shape: "p", caption: "Ring canopies", video: "img_5473.mp4" },
    { file: "dsc04085", shape: "l", caption: "Summer green" },
    { file: "img_2212", shape: "p", caption: "Temple eaves", video: "img_2212.mp4" },
    { file: "img_1456", shape: "p", caption: "Office for the day", video: "img_1456.mp4" },
  ],
};
