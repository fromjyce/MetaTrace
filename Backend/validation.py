import re

# Validate registration data
def validate_registration_data(data):
    errors = []
    
    # Check required fields
    if 'name' not in data or not data['name']:
        errors.append("Name is required.")
    
    if 'email' not in data or not data['email']:
        errors.append("Email is required.")
    elif not re.match(r"[^@]+@[^@]+\.[^@]+", data['email']):
        errors.append("Invalid email format.")
    
    if 'password' not in data or not data['password']:
        errors.append("Password is required.")
    elif len(data['password']) < 6:
        errors.append("Password must be at least 6 characters long.")
    
    return errors

# Validate login data
def validate_login_data(data):
    errors = []
    
    if 'email' not in data or not data['email']:
        errors.append("Email is required.")
    
    if 'password' not in data or not data['password']:
        errors.append("Password is required.")
    
    return errors
