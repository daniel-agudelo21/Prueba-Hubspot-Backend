const { validateContact, validateParcialContact } = require('../src/schemas/contacts');

//test contacto válido
test('debería validar un contacto válido', () => {
  const contact = {
    email: 'test@example.com',
    firstname: 'John',
    lastname: 'Doe',
    phone: '1234567890'
  }
  const result = validateContact(contact)
  expect(result.success).toBe(true)
})

//test correo invalido
test('debería rechazar un correo electrónico inválido', () => {
  const contact = {
    email: 'invalid_email',
    firstname: 'John',
    lastname: 'Doe',
    phone: '1234567890'
  };

  const result = validateContact(contact);
  expect(result.success).toBe(false);
  expect(result.error.errors[0].message).toBe('Invalid email'); // Ajusta el mensaje de error según tu esquema
});

//test del nombre
test('debería rechazar un nombre demasiado corto', () => {
  const contact = {
    email: 'test@example.com',
    firstname: 'Jo',
    lastname: 'Doe',
    phone: '1234567890'
  };

  const result = validateContact(contact)
  expect(result.success).toBe(false)
  expect(result.error.errors[0].message).toBe('El nombre debe tener al menos 3 letras')
})

//test del apellido
test('debería rechazar un apellido demasiado corto', () => {
  const contact = {
    email: 'test@example.com',
    firstname: 'John',
    lastname: '',
    phone: '1234567890'
  };

  const result = validateContact(contact)
  expect(result.success).toBe(false)
  expect(result.error.errors[0].message).toBe('El apellido debe tener al menos 3 letras')
})

//Test del teléfono
test('debería rechazar un teléfono muy largo', () => {
  const contact = {
    email: 'test@example.com',
    firstname: 'John',
    lastname: 'Doe',
    phone: '(859) 1234567890'
  };

  const result = validateContact(contact)
  expect(result.success).toBe(false)
  expect(result.error.errors[0].message).toBe('El teléfono no puede tener más de 14 dígitos')
})

//test de actualizacion de contacto
test('debería validar una actualización', () => {
  const contact = {
    email: 'test@example.com',
  };

  const result = validateParcialContact(contact);
  expect(result.success).toBe(true);
});