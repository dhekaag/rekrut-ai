export const INTERVIEW_QUESTIONS = [
  {
    id: 1,
    text: "Tell me about your experience with React and how you've used it in previous projects.",
    expectedAnswer:
      "I have 3 years of experience with React, building complex user interfaces and single-page applications. In my previous role at TechCorp, I led the development of a customer portal that improved user engagement by 40%. I've worked extensively with React hooks, context API, and various state management solutions including Redux. I'm comfortable with component lifecycle methods and have experience optimizing React applications for performance.",
  },
  {
    id: 2,
    text: "Describe a challenging problem you solved and how you approached it.",
    expectedAnswer:
      "In my last project, we faced a significant performance issue with our dashboard rendering over 5,000 data points. I identified the bottleneck through profiling and implemented virtualization with react-window to render only visible items. I also memoized expensive calculations and optimized our Redux selectors. This reduced load times from 8 seconds to under 500ms, significantly improving user experience. The systematic approach of identifying the problem, testing solutions, and measuring results was key to our success.",
  },
  {
    id: 3,
    text: "How do you stay updated with the latest technologies in your field?",
    expectedAnswer:
      "I follow a structured approach to staying current with technology trends. I dedicate time weekly to read tech blogs like CSS-Tricks and Smashing Magazine, follow industry leaders on Twitter, and participate in communities on Reddit and Stack Overflow. I regularly attend virtual conferences and local meetups when possible. I also maintain a personal project where I experiment with new technologies. Most importantly, I have a network of developer friends where we share interesting finds and discuss emerging trends.",
  },
  {
    id: 4,
    text: "What is your experience with team collaboration and version control?",
    expectedAnswer:
      "I have extensive experience collaborating with cross-functional teams using Git for version control. I follow gitflow workflow with feature branches, pull requests, and code reviews. I've set up CI/CD pipelines that run automated tests before merging code. I'm comfortable with resolving merge conflicts and have experience with git rebasing. For team collaboration, I've used Jira, Asana, and Trello for task management and regularly participate in daily standups, sprint planning, and retrospectives to ensure clear communication and alignment with team goals.",
  },
  {
    id: 5,
    text: "Where do you see yourself professionally in the next 3-5 years?",
    expectedAnswer:
      "In the next 3-5 years, I aim to grow into a senior developer role with technical leadership responsibilities. I'm working towards deepening my expertise in frontend architecture while also expanding my knowledge of backend systems to become more full-stack oriented. I want to mentor junior developers and contribute to architectural decisions. I'm also interested in becoming more involved in the developer community through speaking engagements and open source contributions. Ultimately, I want to be in a position where I can have a broader impact on product development while continuing to grow technically.",
  },
];

export const TIMER_INITIAL_VALUE = 15 * 60;

export const calculateScores = (userAnswers) => {
  const results = {
    overallScore: 0,
    generalImpression: 0,
    topSkills: [
      {
        skill: "Clear Communication",
        description:
          "Your ability to articulate your thoughts clearly is a strong asset.",
      },
      {
        skill: "Problem-Solving",
        description:
          "You provided logical and structured solutions to challenges.",
      },
      {
        skill: "Industry Knowledge",
        description: "Your understanding of the role and industry is solid.",
      },
    ],
    skillsToEnhance: [
      {
        skill: "Conciseness in Responses",
        description:
          "Some answers could be more to the point without unnecessary details.",
      },
      {
        skill: "Storytelling & Engagement",
        description:
          "Using more engaging language and examples can make your responses more impactful.",
      },
      {
        skill: "Emphasizing Unique Value",
        description:
          "Highlighting what sets you apart from other candidates can strengthen your application.",
      },
    ],
    evaluationSummary:
      "Overall, your interview performance was strong, with confident delivery, well-structured responses, and a clear understanding of the role. You effectively communicated your qualifications with relevant examples, but some answers could be more concise and engaging. Incorporating a more dynamic storytelling approach and refining your response to challenging questions will enhance your impact. With continued practice, you can further refine your skills and leave a lasting impression.",
  };

  const questionCount = INTERVIEW_QUESTIONS.length;
  const answeredCount = Object.keys(userAnswers).length;

  if (answeredCount === 0) {
    results.overallScore = 0;
    results.generalImpression = 0;
  } else {
    results.overallScore = Math.min(
      65 + (answeredCount / questionCount) * 30,
      95
    );
    results.generalImpression = Math.min(
      60 + (answeredCount / questionCount) * 40,
      90
    );

    results.overallScore = Math.round(results.overallScore);
    results.generalImpression = Math.round(results.generalImpression);
  }

  return results;
};
