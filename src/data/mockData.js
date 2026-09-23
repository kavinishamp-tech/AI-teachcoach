// ── Educator Profile ────────────────────────────────────────────────────────
export const teacher = {
  name: 'Dr. Priya Sharma',
  initials: 'PS',
  role: 'school_teacher', // 'school_teacher' | 'college_professor'
  roleTitle: 'Grade 8 Science Specialist',
  institution: 'Delhi Public School',
  department: 'Department of Natural Sciences',
  subject: 'Integrated Science & Biology',
  grade: 'Grade 8 (Sections A, B, C)',
  joinedDate: 'March 2024',
  weeklyGoalDays: 7,
  email: 'priya.sharma@teachcoach.edu',
  officeHours: 'Mon, Wed 3:00 PM – 4:30 PM',
  bio: 'Passionate about inquiry-based science, 5E pedagogical cycles, and building confident, curious student learners.',
}

// ── Daily Schedule / Classes ─────────────────────────────────────────────────
export const todaySchedule = [
  {
    id: 's1',
    period: 'Period 1',
    time: '08:30 AM – 09:15 AM',
    title: 'Grade 8A Science: Plant Photosynthesis',
    room: 'Lab 204',
    type: 'Lecture & Lab',
    badge: 'Core Curriculum',
    topic: 'Photosynthesis & Light Reaction',
    studentsCount: 32,
    status: 'completed',
  },
  {
    id: 's2',
    period: 'Period 3',
    time: '10:30 AM – 11:15 AM',
    title: 'Grade 8B Science: Cell Organelles & Membranes',
    room: 'Room 112',
    type: 'Interactive Discussion',
    badge: 'Active Inquiry',
    topic: 'Cell Structure & Diffusion',
    studentsCount: 29,
    status: 'active',
  },
  {
    id: 's3',
    period: 'Period 5',
    time: '01:30 PM – 02:15 PM',
    title: 'Grade 8C Science: Hands-on Microscope Workshop',
    room: 'Lab 204',
    type: 'Practical Activity',
    badge: 'Lab Session',
    topic: 'Microscopy & Specimen Staining',
    studentsCount: 30,
    status: 'upcoming',
  },
  {
    id: 's4',
    period: 'Office Hours',
    time: '03:00 PM – 04:00 PM',
    title: 'Student 1-on-1 Help & Lab Makeups',
    room: 'Faculty Cabin B-12',
    type: 'Consultation',
    badge: 'Office Hours',
    topic: 'Doubt Clearing & Exam Prep',
    studentsCount: 6,
    status: 'upcoming',
  },
]

// ── Educator To-Do Checklist ─────────────────────────────────────────────────
export const initialTodos = [
  { id: 't1', title: 'Upload Assignment 3 rubric for Grade 8B', category: 'Assignment', done: true, priority: 'high' },
  { id: 't2', title: 'Prepare slide deck for Photosynthesis Light Cycle', category: 'Prep', done: true, priority: 'medium' },
  { id: 't3', title: 'Review 4 new Anonymous Student Feedback submissions', category: 'Feedback', done: false, priority: 'urgent' },
  { id: 't4', title: 'Reply to parent query regarding lab safety goggles', category: 'Communication', done: false, priority: 'medium' },
  { id: 't5', title: 'Post weekend reminder for Science Fair proposals', category: 'Broadcast', done: false, priority: 'low' },
]

// ── "Key Basics to Cover" Knowledge Base ────────────────────────────────────
export const topicBasicsBank = {
  'photosynthesis': {
    title: 'Plant Photosynthesis & Energy Transfer',
    subject: 'Biology / General Science',
    coreFundamentals: [
      'The chemical equation: 6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂.',
      'Role of Chloroplasts and Chlorophyll pigment in photon absorption.',
      'Difference between Light-Dependent (Thylakoids) and Light-Independent / Calvin Cycle (Stroma).',
      'How stomata regulate gas exchange (CO₂ intake, H₂O transpiration).',
    ],
    commonMisconceptions: [
      'Students often think plants do photosynthesis in the day and "breathe like animals" only at night — clarify that cellular respiration occurs continuously in plant cells.',
      'Students frequently believe plant mass comes from soil minerals rather than atmospheric carbon dioxide.',
    ],
    engagingHook: 'Hold up a 200-year-old wooden chair and ask: "Where did all this wood and carbon physically come from? The soil, or thin air?"',
    exitTicketPrompt: 'In 2 sentences: Why would a sealed greenhouse without carbon dioxide supply cause plant growth to halt even under 24/7 sunlight?',
  },
  'newtons laws': {
    title: "Newton's 3 Laws of Motion & Forces",
    subject: 'Physics / Mechanics',
    coreFundamentals: [
      '1st Law (Inertia): An object remains at rest or uniform velocity unless acted on by net external force.',
      '2nd Law (F = ma): Acceleration is directly proportional to net force and inversely proportional to mass.',
      '3rd Law (Action-Reaction): Forces always occur in matched equal and opposite pairs on different bodies.',
      'Free Body Diagrams (FBD): Identifying Normal, Gravitational, and Frictional vectors.',
    ],
    commonMisconceptions: [
      'Students think constant motion requires constant force — clarify that force causes *acceleration*, not velocity itself.',
      'Students assume heavier objects always fall faster in freefall — emphasize that gravitational acceleration (g = 9.8 m/s²) is mass-independent in a vacuum.',
    ],
    engagingHook: 'Place an index card over a glass with a coin on top, flick the card away so the coin drops straight into the glass: "Why didn\'t the coin fly away with the card?"',
    exitTicketPrompt: 'If you push a wall with 50N of force, why doesn\'t the wall move, and what force is the wall exerting back on your hand?',
  },
  'cell structure': {
    title: 'Cell Organelles, Membranes & Transport',
    subject: 'Life Sciences / Cellular Biology',
    coreFundamentals: [
      'Prokaryotic vs. Eukaryotic structural differences (nucleus, membrane-bound organelles).',
      'Cell Membrane structure: Phospholipid bilayer with selective permeability.',
      'Key Organelle roles: Mitochondria (ATP energy), Ribosomes (Protein synthesis), Nucleus (DNA code).',
      'Passive vs Active Transport: Diffusion/Osmosis down concentration gradient vs ATP pump against gradient.',
    ],
    commonMisconceptions: [
      'Students think animal cells have no membrane because plant cells have a cell wall — clarify that all living cells possess a plasma membrane.',
      'Students confuse osmosis (solvent/water movement) with general solute diffusion.',
    ],
    engagingHook: 'Show a crisp celery stalk in fresh water vs a limp stalk in salt water: "How does water move across millions of microscopic gates to change an entire vegetable?"',
    exitTicketPrompt: 'If a red blood cell is placed in pure distilled water, will it shrink or burst? State the reason using the word Osmosis.',
  },
  'microeconomics': {
    title: 'Supply, Demand & Market Equilibrium',
    subject: 'Economics / Business',
    coreFundamentals: [
      'Law of Demand (Inverse price-quantity relationship) and Law of Supply (Direct relationship).',
      'Market Equilibrium: The intersection where Quantity Demanded equals Quantity Supplied.',
      'Shift in Demand/Supply curves vs Movement along the curve.',
      'Price Elasticity of Demand (Elastic vs Inelastic goods).',
    ],
    commonMisconceptions: [
      'Confusing a change in "Quantity Demanded" (caused by price change alone) with a shift in the entire "Demand Curve" (caused by consumer income, substitutes, tastes).',
    ],
    engagingHook: 'Ask: "Why does an umbrella cost $5 on a sunny day, but $20 outside the subway during a sudden rainstorm?"',
    exitTicketPrompt: 'If consumer income rises and coffee is a normal good, sketch what happens to the equilibrium price and quantity of coffee.',
  },
}

// ── Student Communication & Broadcasts ──────────────────────────────────────
export const studentBroadcasts = [
  {
    id: 'b1',
    title: 'Lab Report 2 Guidelines & Submission Deadline Extended',
    course: 'Grade 8 Science (All Sections)',
    date: 'Yesterday at 3:30 PM',
    views: 88,
    totalStudents: 91,
    content: 'Due to the Friday school assembly, the Cell Microscopy Lab Report deadline is moved to Monday 5:00 PM. Please make sure to attach your labeled chloroplast sketches.',
    pinned: true,
  },
  {
    id: 'b2',
    title: 'Mid-Term Exam Practice Question Bank & Formula Sheet',
    course: 'Grade 8A & 8B',
    date: '3 days ago',
    views: 74,
    totalStudents: 61,
    content: 'The practice worksheet for Unit 3 (Cell Biology & Genetics) is now available in your course folders. Office hours on Wednesday will focus on tricky problem sets.',
    pinned: false,
  },
]

// ── Student Complaints & Direct Inquiries ───────────────────────────────────
export const studentInquiries = [
  {
    id: 'q1',
    studentName: 'Aarav Patel',
    rollNumber: '8A-14',
    course: 'Grade 8A Science',
    subject: 'Confused about Question 4 on the Photosynthesis homework',
    message: 'Hi Dr. Sharma, I am not able to understand whether oxygen produced in photosynthesis comes from CO2 or from H2O splitting. Could you explain in next class?',
    time: '2 hours ago',
    status: 'urgent',
    reply: '',
  },
  {
    id: 'q2',
    studentName: 'Meera Sen',
    rollNumber: '8B-22',
    course: 'Grade 8B Science',
    subject: 'Request for Lab 3 makeup schedule due to illness',
    message: 'Good morning ma\'am, I had fever on Thursday during the microscope lab. Can I attend the makeup session during your Wednesday office hours?',
    time: 'Yesterday',
    status: 'pending',
    reply: '',
  },
  {
    id: 'q3',
    studentName: 'Rohan Gupta',
    rollNumber: '8C-09',
    course: 'Grade 8C Science',
    subject: 'Group partner not responding for the Science Fair poster',
    message: 'My assigned project partner has not replied to messages for 4 days and the proposal is due Friday. Can I submit my portion individually?',
    time: '2 days ago',
    status: 'resolved',
    reply: 'Spoke with both students during recess; task divided with individual milestones.',
  },
]

// ── Anonymous Student Feedback Vault ────────────────────────────────────────
export const anonymousFeedbackList = [
  {
    id: 'af1',
    class: 'Grade 8A Science',
    topic: 'Photosynthesis Light Phase',
    sentiment: 'Positive',
    rating: 5,
    date: 'Today · 10:15 AM',
    comment: 'The wooden chair analogy made the concept of carbon absorption super clear! Really enjoyed the pair-discussion.',
    aiAnalysis: 'High concept comprehension. The real-world analogy successfully anchored abstract chemical pathways.',
    suggestedAction: 'Reinforce this momentum with a quick 2-question exit check tomorrow.',
  },
  {
    id: 'af2',
    class: 'Grade 8B Science',
    topic: 'Cell Membrane Diffusion',
    sentiment: 'Pacing Challenge',
    rating: 3,
    date: 'Yesterday · 2:45 PM',
    comment: 'The lecture went a bit fast during active transport vs osmosis. Many of us didn’t get time to finish drawing the diagram.',
    aiAnalysis: 'Cognitive overload during diagram transcription. Pacing was approximately 20% too rapid for note-taking.',
    suggestedAction: 'Start tomorrow with a 3-minute recap diagram and provide a printable skeleton handout.',
  },
  {
    id: 'af3',
    class: 'Grade 8A Science',
    topic: 'General Classroom Dynamics',
    sentiment: 'Engagement',
    rating: 4,
    date: '2 days ago',
    comment: 'Could we do more small group problem solving instead of continuous slide presentations?',
    aiAnalysis: 'Desire for interactive peer-learning. Students feel passive during slide-heavy segments.',
    suggestedAction: 'Incorporate a 7-minute Think-Pair-Share or Jigsaw segment mid-lecture.',
  },
  {
    id: 'af4',
    class: 'Grade 8C Science',
    topic: 'Microscope Workshop',
    sentiment: 'Positive',
    rating: 5,
    date: '3 days ago',
    comment: 'Loved having hands-on time with the onion cell slides! It was much easier to understand after seeing it under 400x.',
    aiAnalysis: 'Kinesthetic learning success. High visual retention observed.',
    suggestedAction: 'Encourage students to upload their microscope sketches into their digital portfolio.',
  },
]

// ── Teacher Communication & Speaking Guides ──────────────────────────────────
export const communicationGuides = [
  {
    id: 'cg1',
    category: 'Voice & Delivery',
    title: 'Voice Modulation & Eliminating Monotone Fatigue',
    icon: 'Mic',
    duration: '6 min read',
    keyTakeaways: [
      'Vary pitch at the start of key concepts to signal high-importance information.',
      'Utilize intentional 3-second pauses after posing a question rather than filling the silence.',
      'Project from the diaphragm to maintain vocal health during back-to-back periods.',
    ],
    exercise: 'Try the "Headline & Anchor" technique: State the core takeaway in an energetic punchy headline, then drop your volume slightly for the detailed explanation to draw listeners in.',
  },
  {
    id: 'cg2',
    category: 'Questioning Techniques',
    title: 'Socratic Questioning & Compassionate Cold Calling',
    icon: 'HelpCircle',
    duration: '8 min read',
    keyTakeaways: [
      'Use the Think-Write-Share sequence so introverted students have written thoughts ready before speaking.',
      'Replace "Does everyone understand?" with "What is the trickiest part of this concept so far?".',
      'Frame wrong answers as valuable stepping stones: "I love that you said that because 90% of students make that exact assumption. Let’s explore why..."',
    ],
    exercise: 'Practice 5-second wait times: Count silently to 5 after asking a question before accepting any hands.',
  },
  {
    id: 'cg3',
    category: 'Higher Ed & Classroom Dynamics',
    title: 'Managing Lecture Hall Energy & Re-engaging Distracted Students',
    icon: 'Users',
    duration: '7 min read',
    keyTakeaways: [
      'The "15-Minute Reset Rule": Attention drops sharply after 15 minutes of uninterrupted lecturing. Introduce a quick peer-poll or diagnostic question.',
      'Physical Proximity: Walking toward the back of the classroom quietly draws attention without calling out individuals.',
      'Transparent Rubrics: Explaining "why this assignment matters in the real world" reduces grade anxiety and complaints by 40%.',
    ],
    exercise: 'Deploy the "Muddiest Point" slip: At the end of class, ask students to write down the single concept they felt least clear on.',
  },
]

// ── Interactive Communication Simulator Scenarios ───────────────────────────
export const simulationScenarios = [
  {
    id: 'sim1',
    scenario: 'A student interrupts abruptly: "Why do we even need to learn this? We will never use this in real life!"',
    options: [
      {
        text: 'Respond sternly: "It is on the state curriculum and will be on your final exam."',
        rating: 'Poor',
        feedback: 'Relies on punitive authority and increases student resistance while failing to provide intrinsic relevance.',
      },
      {
        text: 'Validate and bridge: "That is a completely fair question. If I were in your seat, I would wonder the same thing. Here is how emergency doctors and engineers use this exact logic every day..."',
        rating: 'Masterful',
        feedback: 'Validates the student\'s perspective, removes friction, and immediately provides real-world contextual relevance.',
      },
      {
        text: 'Ignore the comment and continue lecturing through the slide.',
        rating: 'Suboptimal',
        feedback: 'Misses an opportunity to build trust and signals that student curiosity is unwelcome.',
      },
    ],
  },
  {
    id: 'sim2',
    scenario: 'You ask a thought-provoking question to the room, and complete silence follows for 10 seconds.',
    options: [
      {
        text: 'Immediately answer your own question to break the awkward silence.',
        rating: 'Suboptimal',
        feedback: 'Trains students that if they wait long enough, the teacher will do all the cognitive lifting for them.',
      },
      {
        text: 'Switch to quick pair-share: "Let\'s take 60 seconds with the person sitting next to you. Compare your first hunch before we share out loud."',
        rating: 'Masterful',
        feedback: 'Lowers psychological barrier to participation and activates 100% of the room simultaneously.',
      },
      {
        text: 'Pick on the quietest student in the corner and demand an answer on the spot.',
        rating: 'Poor',
        feedback: 'Creates high anxiety and undermines a psychologically safe learning environment.',
      },
    ],
  },
]

// ── Streak Data ─────────────────────────────────────────────────────────────
export const streakData = {
  current: 23,
  longest: 23,
  thisWeekCompleted: 5,
  thisWeekGoal: 7,
  milestones: [
    { days: 7,  earned: true  },
    { days: 14, earned: true  },
    { days: 30, earned: false },
    { days: 60, earned: false },
    { days: 90, earned: false },
  ],
  calendarData: [
    0,1,2,3,2,1,0, 1,3,2,0,1,2,3, 1,0,2,1,3,2,0,
    1,2,3,2,1,0,2, 3,3,2,1,0,1,3, 2,0,1,2,3,1,0,
    2,1,3,2,0,1,2, 3,2,1,0,2,3,3, 2,1,0,1,3,2,0,
    1,2,3,1,0,2,1, 3,2,0,1,2,3,2, 1,0,2,3,3,2,1,
    0,1,3,2,0,1,2,
  ],
}

// ── Pathways ──────────────────────────────────────────────────────────────────
export const pathways = [
  {
    id: 'p1',
    title: 'Active Learning Strategies',
    description: 'Techniques to make students active participants in their own learning rather than passive listeners.',
    modulesCompleted: 6,
    totalModules: 8,
    minutesLeft: 40,
    color: '#6EA685',
    trackColor: '#EDF6F0',
    tag: 'Pedagogy',
    modules: [
      { id: 'm1', title: 'What is active learning?',          done: true,  mins: 10 },
      { id: 'm2', title: 'Think-pair-share techniques',       done: true,  mins: 15 },
      { id: 'm3', title: 'Jigsaw classroom method',           done: true,  mins: 20 },
      { id: 'm4', title: 'Socratic questioning',              done: true,  mins: 15 },
      { id: 'm5', title: 'Problem-based learning',            done: true,  mins: 25 },
      { id: 'm6', title: 'Flipped classroom essentials',      done: true,  mins: 20 },
      { id: 'm7', title: 'Formative assessment in practice',  done: false, mins: 20 },
      { id: 'm8', title: 'Measuring active learning outcomes',done: false, mins: 20 },
    ],
  },
  {
    id: 'p2',
    title: 'Differentiated Instruction',
    description: 'How to tailor lessons to meet diverse learner needs within a single classroom.',
    modulesCompleted: 4,
    totalModules: 8,
    minutesLeft: 80,
    color: '#E07A8B',
    trackColor: '#FDF2F4',
    tag: 'Inclusion',
    modules: [
      { id: 'm1', title: 'Understanding learner profiles',    done: true,  mins: 15 },
      { id: 'm2', title: 'Differentiating by content',        done: true,  mins: 20 },
      { id: 'm3', title: 'Differentiating by process',        done: true,  mins: 20 },
      { id: 'm4', title: 'Flexible grouping strategies',      done: true,  mins: 20 },
      { id: 'm5', title: 'Differentiating by product',        done: false, mins: 20 },
      { id: 'm6', title: 'Tiered assignments',                done: false, mins: 20 },
      { id: 'm7', title: 'Assessment and differentiation',    done: false, mins: 20 },
      { id: 'm8', title: 'Planning a differentiated unit',    done: false, mins: 20 },
    ],
  },
  {
    id: 'p3',
    title: 'Inquiry-Based Learning',
    description: 'A student-centred approach where curiosity and questioning drive the learning process.',
    modulesCompleted: 1,
    totalModules: 6,
    minutesLeft: 120,
    color: '#D98248',
    trackColor: '#FEF3EB',
    tag: 'Student-led',
    modules: [
      { id: 'm1', title: 'Foundations of inquiry learning',   done: true,  mins: 20 },
      { id: 'm2', title: 'Designing inquiry questions',       done: false, mins: 25 },
      { id: 'm3', title: 'Structured vs. open inquiry',       done: false, mins: 20 },
      { id: 'm4', title: 'Facilitation over instruction',     done: false, mins: 25 },
      { id: 'm5', title: 'Assessing inquiry learning',        done: false, mins: 20 },
      { id: 'm6', title: 'Real-world inquiry projects',       done: false, mins: 30 },
    ],
  },
  {
    id: 'p4',
    title: 'Classroom Management Essentials',
    description: 'Proven strategies to build a positive, structured, and productive classroom environment.',
    modulesCompleted: 0,
    totalModules: 5,
    minutesLeft: 95,
    color: '#38664D',
    trackColor: '#EDF6F0',
    tag: 'Management',
    modules: [
      { id: 'm1', title: 'Establishing norms and routines',   done: false, mins: 15 },
      { id: 'm2', title: 'De-escalation strategies',          done: false, mins: 20 },
      { id: 'm3', title: 'Positive behavioral reinforcement', done: false, mins: 20 },
      { id: 'm4', title: 'Smooth transitions between tasks',  done: false, mins: 20 },
      { id: 'm5', title: 'Building student rapport',          done: false, mins: 20 },
    ],
  },
]

// ── Daily Reflections ────────────────────────────────────────────────────────
export const reflections = [
  {
    id: 'r1',
    prompt: 'When did students seem most curious today?',
    response: 'During the photosynthesis demonstration, students asked why chloroplasts are green and whether albino plants exist. We spent 15 minutes exploring chlorophyll absorption spectra and evolutionary adaptations. Engagement was very high.',
    date: 'Today',
    tag: 'Inquiry moments',
    ts: Date.now() - 3600000 * 2,
  },
  {
    id: 'r2',
    prompt: 'What was your biggest classroom win this week?',
    response: 'Two students who usually hesitate to participate volunteered to present their cell model to the class. The pair-share warm-up gave them the confidence they needed.',
    date: 'Yesterday',
    tag: 'Student engagement',
    ts: Date.now() - 3600000 * 26,
  },
  {
    id: 'r3',
    prompt: 'What is one thing you would change about today’s lesson?',
    response: 'I spent too long on the introductory slides and had to rush the hands-on microscope activity. Next time I will cap the lecture at 12 minutes and give 25 minutes for the lab.',
    date: '3 days ago',
    tag: 'Lesson pacing',
    ts: Date.now() - 3600000 * 74,
  },
]

// ── Weekly Digest ────────────────────────────────────────────────────────────
export const weeklyDigest = {
  headline: 'Strong inquiry culture observed in Grade 8 Science',
  body: 'Across 5 logged reflections, student-generated questions were mentioned 4 times. Your pacing in hands-on labs improved by 15%, and anonymous student feedback scored an average 4.8/5.0 for lesson clarity.',
  weekLabel: 'Week of Sep 7 – Sep 13, 2026',
}

// ── Goals ────────────────────────────────────────────────────────────────────
export const goals = [
  {
    id: 'g1',
    title: 'Maintain 7-day reflection streak',
    current: 5,
    target: 7,
    unit: 'days',
    progress: 71,
    category: 'Habit',
  },
  {
    id: 'g2',
    title: 'Complete Active Learning pathway',
    current: 6,
    target: 8,
    unit: 'modules',
    progress: 75,
    category: 'Pathway',
  },
  {
    id: 'g3',
    title: 'Incorporate Think-Pair-Share in all periods',
    current: 4,
    target: 5,
    unit: 'classes',
    progress: 80,
    category: 'Pedagogy',
  },
  {
    id: 'g4',
    title: 'Respond to all student queries within 24h',
    current: 3,
    target: 3,
    unit: 'queries',
    progress: 100,
    category: 'Communication',
  },
]
