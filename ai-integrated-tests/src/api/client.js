const API_BASE_URL = "http://localhost:8000";

export const api = {
  getUsers: async () => {
    const response = await fetch(`${API_BASE_URL}/api/users`);
    if (!response.ok) throw new Error("Failed to fetch users");
    return response.json();
  },

  getUserById: async (user_id) => {
    const response = await fetch(`${API_BASE_URL}/api/users/${user_id}`);
    if (!response.ok) throw new Error("Failed to fetch user");
    return response.json();
  },

  registerUser: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/api/users`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err || "Failed to register user");
    }
    return response.json();
  },
  loginUser: async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/api/users/login`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err || "Failed to login user");
    }
    return response.json();
  },
  checkAnswer: async (questionId, userId, userAnswer) => {
    const response = await fetch(`${API_BASE_URL}/api/answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question_id: questionId,
        user_id: userId,
        user_answer: userAnswer,
      }),
    });
    if (!response.ok) throw new Error("Failed to check answer");
    return response.json();
  },
 getPracticeQuestions: async (topic, userId) => {
   const response = await fetch(`${API_BASE_URL}/api/practice/questions?topic=${topic}&user_id=${userId}`);
   if (!response.ok) throw new Error("Failed to fetch practice questions");
   return response.json();
 },
 completePracticeSession: async (userId, topic, sessionCorrect, sessionTotal) => {
   const response = await fetch(
     `${API_BASE_URL}/api/practice/complete?user_id=${userId}&topic=${topic}&session_correct=${sessionCorrect}&session_total=${sessionTotal}`,
     { method: "POST" }
   );
   if (!response.ok) throw new Error("Failed to complete session");
   return response.json();
 },
};
