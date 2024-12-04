// Get all users
export const getAllUsers = async () => {
    try {
      const response = await fetch('https://gl-interview.azurewebsites.net/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', 
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error status: ${response.status}`)
      }
      
      const res = await response.json()
      console.log(res)
      return res
    } catch (error) {
      alert('Error fetching users:', error);
    }
}

// Create new user
export const createUser = async (username) => {
    try {
      const response = await fetch('https://gl-interview.azurewebsites.net/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ username }), 
      });
  
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.detail || `Error status: ${response.status}`)
      }
  
      const res = await response.json()
      console.log('User created:', res) 
      return res;
    } catch (error) {
      alert('Error creating user:', error.message)

    }
}

// Create new loan
export const createLoan = async (amount, apr, term, status, owner_id) => {
    try {
        const response = await fetch('https://gl-interview.azurewebsites.net/loans', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify({amount, apr, term, status, owner_id}), 
        })
    
        if (!response.ok) {
          throw new Error(`Error status: ${response.status}`)
        }
    
        const res = await response.json()
        console.log('Loan created:', res) 
        return res
      } catch (error) {
        alert('Error creating loan:', error)
      }
}

// Get user loans
export const getUserLoans = async (user_id) => {
    try {
        const response = await fetch(`https://gl-interview.azurewebsites.net/users/${user_id}/loans`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json', 
          },
        })
    
        if (!response.ok) {
          throw new Error(`Error status: ${response.status}`)
        }
    
        const res = await response.json()
        console.log('All loans:', res)
        return res
      } catch (error) {
        alert('Error fetching loans:', error)
      }
}

// Get user loans
export const getAmortizationTerm = async (loan_id,user_id) => {
    try {
        const response = await fetch(`https://gl-interview.azurewebsites.net/loans/${loan_id}?user_id=${user_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json', 
          },
        })
    
        if (!response.ok) {
          throw new Error(`Error Status: ${response.status}`)
        }
        const res = await response.json()
        console.log('loan schedule:', res)
        return res
      } catch (error) {
        alert('Error fetching loan schedule:', error)
      }
}

// Share loan
export const shareLoan = async (loan_id, owner_id, user_id) => {
    try {
        const response = await fetch(`https://gl-interview.azurewebsites.net/loans/${loan_id}/share?owner_id=${owner_id}&user_id=${user_id}`, { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify({loan_id, owner_id, user_id }), 
        })
    
        if (!response.ok) {
          throw new Error(`Error status: ${response.status}`)
        }
    
        const res = await response.json();
        console.log('Loan shared:', res); 
        return res;
      } catch (error) {
        alert('Error sharing loan:', error)
      }
}