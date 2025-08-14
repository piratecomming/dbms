const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // use this when hashing is ready
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // use env var in prod

const authentication= async (email, password, dbPool) {
  try {
    // Fetch user by email
    const [rows] = await dbPool.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      // User not found
      return { success: false, message: 'Invalid email or password' };
    }

    const user = rows[0];

    // Compare password - replace below with bcrypt when ready
    // const passwordMatch = await bcrypt.compare(password, user.password_hash);
    const passwordMatch = password === user.password_hash; // placeholder

    if (!passwordMatch) {
      return { success: false, message: 'Invalid email or password' };
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return token and user info
    return { success: true, token, user: { id: user.id, email: user.email, role: user.role, name: user.name } };

  } catch (error) {
    console.error('Authentication error:', error);
    return { success: false, message: 'Server error' };
  }
}

export default authentication;
