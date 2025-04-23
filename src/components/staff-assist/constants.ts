
export const behaviorSituations = [
  { id: "refusal", label: "Student Refusal", category: "compliance" },
  { id: "verbal_outburst", label: "Verbal Outburst", category: "disruptive" },
  { id: "withdrawal", label: "Social Withdrawal", category: "emotional" },
  { id: "agitation", label: "Physical Agitation", category: "physical" },
  { id: "defiance", label: "Defiance", category: "compliance" },
  { id: "distraction", label: "Off-Task/Distracted", category: "focus" },
  { id: "anxiety", label: "Anxiety Expression", category: "emotional" },
  { id: "conflict", label: "Peer Conflict", category: "social" },
  { id: "other", label: "Other", category: "miscellaneous" }
];

export const responseStrategies = {
  refusal: [
    {
      title: "Offer Limited Choices",
      description: "Provide two acceptable options rather than demanding compliance.",
      script: "I see you're not ready to join the activity. Would you prefer to start with part B or take 2 minutes to prepare first?",
      research: "Choice theory suggests that offering controlled choices increases student autonomy and reduces defiance (Glasser, 1998)."
    },
    {
      title: "Acknowledge Feelings",
      description: "Validate emotions before addressing behavior.",
      script: "I understand this assignment feels challenging right now. It's okay to feel frustrated. Let's identify one small section to start with.",
      research: "Emotional validation creates psychological safety necessary for behavioral regulation (Gottman & Declaire, 1997)."
    }
  ],
  verbal_outburst: [
    {
      title: "De-escalation Space",
      description: "Direct student to a predetermined calming area.",
      script: "I can see you're feeling very upset right now. Let's use the reset corner for 3 minutes to help you calm your body and voice.",
      research: "Designated regulation spaces help students develop self-management skills during emotional arousal (Kuypers, 2011)."
    },
    {
      title: "Neutral Redirection",
      description: "Acknowledge emotion while setting clear expectations.",
      script: "I hear you're feeling frustrated. In our classroom, we use respectful voices to express our needs. When you're ready to talk calmly, I'm here to help.",
      research: "Emotionally neutral responses prevent reinforcement of attention-seeking behaviors (Greene, 2014)."
    }
  ],
  withdrawal: [
    {
      title: "Non-verbal Connection",
      description: "Use a pre-established signal system for check-ins.",
      script: "[Make agreed-upon hand signal] I'm checking if you need: Space, Help, or a Break? You can point or nod.",
      research: "Non-verbal communication reduces social pressure while maintaining connection (Buron & Curtis, 2012)."
    },
    {
      title: "Parallel Activity",
      description: "Invite participation in a less socially demanding way.",
      script: "Would you like to be my helper with organizing these materials while we work on this activity? You can join the group when you feel ready.",
      research: "Parallel engagement allows gradual social reintegration (Wolfberg, 2009)."
    }
  ],
  agitation: [
    {
      title: "Movement Break",
      description: "Provide a purposeful physical activity.",
      script: "I notice your body needs to move. Could you help deliver this message to the office? Or would you prefer to do 5 wall pushes first?",
      research: "Proprioceptive input helps regulate the nervous system and reduce physical agitation (Kranowitz, 2005)."
    },
    {
      title: "Modeling Regulation",
      description: "Demonstrate calming strategies in the moment.",
      script: "Let's take three deep breaths together like this. [Demonstrate slow breathing] I'll count while we breathe in for 4, hold for 2, out for 4.",
      research: "Co-regulation through adult modeling helps students internalize self-regulation strategies (Shanker, 2016)."
    }
  ],
  defiance: [
    {
      title: "Proximity & Private Conversation",
      description: "Move closer and speak quietly to reduce defensiveness.",
      script: "[Move near student, speak quietly] 'I see you're having a hard time getting started. What's one small step you could take right now?'",
      research: "Private redirection preserves student dignity and reduces public power struggles (Curwin et al., 2008)."
    },
    {
      title: "Strategic Ignoring + Positive Reinforcement",
      description: "Briefly ignore defiant statements while immediately acknowledging any positive movement.",
      script: "[If student says 'I won't do it'] Continue activity, then: 'I appreciate that you're looking at the materials now. That's a good first step.'",
      research: "Differential attention reinforces desired behaviors while reducing attention to challenging behaviors (Alberto & Troutman, 2017)."
    }
  ],
  distraction: [
    {
      title: "Visual Timer",
      description: "Set a concrete, visible time expectation.",
      script: "I'll set this timer for 10 minutes of focused work. When it rings, you can take a 2-minute break. What do you need to get started?",
      research: "Visual timers make abstract time concepts concrete and manageable (Barkley, 2020)."
    },
    {
      title: "Task Chunking",
      description: "Break the assignment into smaller, more manageable parts.",
      script: "Let's just focus on completing these three problems first. Which one would you like to start with?",
      research: "Task chunking reduces cognitive load and increases task initiation (Meltzer, 2018)."
    }
  ],
  anxiety: [
    {
      title: "Cognitive Reframing",
      description: "Help student identify and challenge anxious thoughts.",
      script: "What's the worry telling you right now? Let's think about what might really happen and what you know how to handle.",
      research: "Cognitive restructuring helps students recognize and address distorted thinking patterns (Kendall, 2017)."
    },
    {
      title: "Grounding Exercise",
      description: "Use sensory awareness to reconnect to the present.",
      script: "Let's try the 5-4-3-2-1 exercise. Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you like about yourself.",
      research: "Sensory grounding techniques help reduce anxiety by orienting to the present moment (Linehan, 2014)."
    }
  ],
  conflict: [
    {
      title: "Conflict Resolution Script",
      description: "Guide students through a structured conversation.",
      script: "I'll help you both share your perspectives. Each person gets to speak while the other listens. Start with 'I felt ___ when ___' and then we'll work on solutions together.",
      research: "Structured conflict resolution teaches essential social skills and reduces future conflicts (Johnson & Johnson, 2005)."
    },
    {
      title: "Collaborative Problem-Solving",
      description: "Involve students in generating their own solutions.",
      script: "What's happening that's not working for each of you? Let's list some possible solutions that might work for everyone. Then we can try one out.",
      research: "Student-generated solutions increase ownership and follow-through (Greene, 2016)."
    }
  ],
  other: [
    {
      title: "Behavior Mapping",
      description: "Help student identify triggers, feelings, and choices.",
      script: "Let's figure this out together. What happened first? How did you feel? What did you do next? What could be a different choice next time?",
      research: "Explicit behavior mapping helps students develop metacognitive skills about their behavioral responses (McIntosh & Goodman, 2016)."
    },
    {
      title: "Take a Break and Return",
      description: "Allow student space to reset with a clear return plan.",
      script: "It seems like you need some space right now. You can take 5 minutes at the cool-down desk. I'll set a timer, and when it beeps, we'll check in about rejoining the activity.",
      research: "Structured breaks with clear parameters teach self-regulation while maintaining expectations (Smith et al., 2017)."
    }
  ]
};
