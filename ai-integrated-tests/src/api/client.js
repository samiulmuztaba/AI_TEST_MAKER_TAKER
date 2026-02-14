const API_BASE_URL = "http://localhost:8000";

export const api = {
    getUsers: async () => {
        const response = await fetch(`${API_BASE_URL}/api/users`)
        if (!response.ok) throw new Error('Failed to fetch users')
        return response.json()
    },

    getUserById: async (user_id) => {
        const response = await fetch(`${API_BASE_URL}/api/users/${user_id}`)
        if (!response.ok) throw new Error('Failed to fetch user')
        return response.json()
    },

    registerUser: async (userData) => {
        const response = await fetch(`${API_BASE_URL}/api/users`, 
            {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(userData)
            }
        )
        if (!response.ok) {
            const err = await response.json()
            throw new Error(err || 'Failed to register user')
        }
        return response.json()
    },
    loginUser: async (username, password) => {
        const response = await fetch(`${API_BASE_URL}/api/users/login`, {
            method: "POST",
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({username, password})
        })
        if (!response.ok) {
            const err = await response.json()
            throw new Error(err || 'Failed to login user')
        }
        return response.json()
    },
}