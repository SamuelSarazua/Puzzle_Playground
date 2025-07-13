// authService.js
export const AuthService = {
  isAuthenticated: () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    return token && userId;
  },

  getCurrentUser: () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username") || "Jugador";

    if (!userId || !token) {
      return null; // ← aquí está la clave
    }

    return { userId, token, username };
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("isLoggedIn");
  },

  verifySession: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return false;

      const response = await fetch(
        "https://backend-game-mnte.onrender.com/auth/verify",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.ok;
    } catch (error) {
      console.error("Error verifying session:", error);
      return false;
    }
  },
};
