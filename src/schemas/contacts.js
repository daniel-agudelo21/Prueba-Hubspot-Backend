const z = require('zod')

const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const contactSchema = z.object({
    email: z.string().email().nonempty({
        message: "Email no puede estar vacio"
    }),
    firstname: z.string().min(3, {
        message: "El nombre debe tener al menos 3 letras"

    }).nonempty({
        message: 'El nombre no puede estar vacio'
    }),
    lastname: z.string().min(3, {
        message: "El apellido debe tener al menos 3 letras"

    }).nonempty({
        message: 'El apellido no puede estar vacio'
    }),
    phone: z.string().regex(phoneRegex, 'Numero invalido').nonempty({
        message: 'El telefono no puede estar vacio'
    }).min(6, {
        message: "El teléfono debe tener al menos 6 dígitos"
    }).max(14, {
        message: "El teléfono no puede tener más de 14 dígitos"
    })
})

function validateContact(input) {
    const result = contactSchema.safeParse(input)
    if (!result.success) {
        return { success: false, error: result.error };
    }
    return { success: true, data: result.data };
}

function validateParcialContact(input) {
    const result = contactSchema.partial().safeParse(input)
    if (!result.success) {
        return { success: false, error: result.error };
    }
    return { success: true, data: result.data };
}

module.exports = {
    validateContact,
    validateParcialContact
}