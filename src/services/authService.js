const API_BASE_URL = 'http://127.0.0.1:8000/api';

export class AuthService {
  static currentUser = null;
  static currentCredentials = null;

  static async registerUser(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/accounts/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: userData.name,
          official_email: userData.officialEmail,
          personal_email: userData.personalEmail,
          official_phone: userData.officialPhone,
          personal_phone: userData.personalPhone,
          company_name: userData.companyName,
          location: userData.location,
          department: userData.department,
          gst_number: userData.gstNumber,
          pin_code: userData.pinCode,
          company_address: userData.companyAddress,
          password: userData.password,
          confirmPassword: userData.confirmPassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          user: data.user,
          message: data.message
        };
      } else {
        return {
          success: false,
          error: data.error || 'Registration failed'
        };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: 'Network error. Please try again.'
      };
    }
  }

  static async loginUser(email, password, otp = null) {
    try {
      const requestBody = { email, password };
      if (otp) {
        requestBody.otp = otp;
      }

      const response = await fetch(`${API_BASE_URL}/accounts/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (response.ok) {
        if (data.otp_required) {
          return {
            success: true,
            otp_required: true,
            message: data.message
          };
        } else {
          this.currentCredentials = { email, password };
          this.currentUser = data.user;
          
          return {
            success: true,
            user: data.user,
            message: data.message
          };
        }
      } else {
        return {
          success: false,
          error: data.error || 'Login failed'
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: 'Network error. Please try again.'
      };
    }
  }

  static async verifyOTP(email, password, otp) {
    return this.loginUser(email, password, otp);
  }

  static async logoutUser() {
    try {
      const response = await fetch(`${API_BASE_URL}/accounts/logout/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      this.currentCredentials = null;
      this.currentUser = null;

      return {
        success: true,
        message: 'Logout successful'
      };
    } catch (error) {
      console.error('Logout error:', error);
      this.currentCredentials = null;
      this.currentUser = null;
      
      return {
        success: true,
        message: 'Logout successful'
      };
    }
  }

  static async getCurrentUserProfile() {
    if (!this.currentCredentials) {
      return {
        success: false,
        error: 'Please login first.'
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/accounts/profile/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.currentCredentials)
      });

      if (response.ok) {
        const userData = await response.json();
        this.currentUser = userData;
        return {
          success: true,
          user: userData
        };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.error || 'Failed to fetch user profile'
        };
      }
    } catch (error) {
      console.error('Get profile error:', error);
      return {
        success: false,
        error: 'Network error. Please try again.'
      };
    }
  }

  static async updateUserProfile(updateData) {
    if (!this.currentCredentials) {
      return {
        success: false,
        error: 'Please login first.'
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/accounts/profile/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...this.currentCredentials,
          ...updateData
        })
      });

      if (response.ok) {
        const userData = await response.json();
        this.currentUser = userData;
        return {
          success: true,
          user: userData
        };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.error || 'Failed to update profile'
        };
      }
    } catch (error) {
      console.error('Update profile error:', error);
      return {
        success: false,
        error: 'Network error. Please try again.'
      };
    }
  }

  static async isAuthenticated() {
    if (!this.currentCredentials) {
      return false;
    }

    try {
      const result = await this.getCurrentUserProfile();
      return result.success;
    } catch (error) {
      return false;
    }
  }

  static async getCurrentUser() {
    if (this.currentUser) {
      return this.currentUser;
    }
    
    const result = await this.getCurrentUserProfile();
    return result.success ? result.user : null;
  }

  static async submitContactForm(formData) {
    try {
      const response = await fetch(`${API_BASE_URL}/accounts/contact/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          message: data.message
        };
      } else {
        return {
          success: false,
          error: data.error || 'Failed to send message'
        };
      }
    } catch (error) {
      console.error('Contact form error:', error);
      return {
        success: false,
        error: 'Network error. Please try again.'
      };
    }
  }

  static async requestPasswordReset(email) {
    try {
      const response = await fetch(`${API_BASE_URL}/accounts/password-reset/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          message: data.message
        };
      } else {
        return {
          success: false,
          error: data.error || 'Failed to send reset email'
        };
      }
    } catch (error) {
      console.error('Password reset request error:', error);
      return {
        success: false,
        error: 'Network error. Please try again.'
      };
    }
  }

  static async confirmPasswordReset(email, token, newPassword) {
    try {
      const response = await fetch(`${API_BASE_URL}/accounts/password-reset-confirm/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          token: token,
          new_password: newPassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          message: data.message
        };
      } else {
        return {
          success: false,
          error: data.error || 'Failed to reset password'
        };
      }
    } catch (error) {
      console.error('Password reset confirm error:', error);
      return {
        success: false,
        error: 'Network error. Please try again.'
      };
    }
  }
}
