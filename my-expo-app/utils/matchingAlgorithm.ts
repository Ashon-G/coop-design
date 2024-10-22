import { Profile } from "../types/Profile";

export const calculateMatchScore = (user1: Profile, user2: Profile): number => {
  const skillsScore = calculateSkillsScore(user1.skills, user2.skills);
  const interestsScore = calculateInterestsScore(
    user1.interests,
    user2.interests
  );
  const experienceScore = calculateExperienceScore(
    user1.experience,
    user2.experience
  );
  const goalsScore = calculateGoalsScore(user1.goals, user2.goals);

  return (
    skillsScore * 0.3 +
    interestsScore * 0.2 +
    experienceScore * 0.25 +
    goalsScore * 0.25
  );
};

const calculateSkillsScore = (skills1: string[], skills2: string[]): number => {
  const sharedSkills = skills1.filter((skill) => skills2.includes(skill));
  return sharedSkills.length / Math.max(skills1.length, skills2.length);
};

const calculateInterestsScore = (
  interests1: string[],
  interests2: string[]
): number => {
  const sharedInterests = interests1.filter((interest) =>
    interests2.includes(interest)
  );
  return (
    sharedInterests.length / Math.max(interests1.length, interests2.length)
  );
};

const calculateExperienceScore = (exp1: number, exp2: number): number => {
  const expDiff = Math.abs(exp1 - exp2);
  return 1 - expDiff / Math.max(exp1, exp2);
};

const calculateGoalsScore = (goals1: string[], goals2: string[]): number => {
  const sharedGoals = goals1.filter((goal) => goals2.includes(goal));
  return sharedGoals.length / Math.max(goals1.length, goals2.length);
};
