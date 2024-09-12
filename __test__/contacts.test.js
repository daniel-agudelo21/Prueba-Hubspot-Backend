const validateContact = require('../src/schemas/contacts');

describe('validateContact', () => {
  it('should validate a valid contact', () => {
    const result = validateContact({
      email: 'test@example.com',
      firstname: 'John',
      lastname: 'Doe',
      phone: '1234567890',
    });
    expect(result.success).toBe(true);
    expect(result.data).toEqual({
      email: 'test@example.com',
      firstname: 'John',
      lastname: 'Doe',
      phone: '1234567890',
    });
  });

  it('should invalidate a contact with missing fields', () => {
    const result = validateContact({
      email: 'test@example.com',
      firstname: 'John',
      lastname: '',
      phone: '1234567890',
    });
    expect(result.success).toBe(false);
    expect(result.error.errors).toHaveLength(1); // Error por lastname
  });
});