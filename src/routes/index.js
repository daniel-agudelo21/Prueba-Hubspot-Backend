const axios = require("axios")
const express = require('express')
const { Router } = require("express")
const router = Router()
require("dotenv").config();
router.use(express.json())
const { API_KEY, API_URL } = process.env
const { validateContact, validateParcialContact } = require('../schemas/contacts')

router.get('/', async (req, res) => {
    try {
        const { email } = req.query
        const response = await axios.get(`${API_URL}/objects/contacts`, {
            params: {
                properties: ' email, firstname, lastname, phone'
            },
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                "Content-Type": 'application/json'
            }
        })
        const contacts = response.data.results.map(contact => ({
            id: contact.id,
            email: contact.properties.email,
            firstname: contact.properties.firstname,
            lastname: contact.properties.lastname,
            phone: contact.properties.phone

        }))
        if (email) {
            const filteredContact = contacts.filter((contact) => contact.email && contact.email.toLocaleLowerCase() === email.toLowerCase())
            if (filteredContact) {
                return res.status(200).json(filteredContact);
            }
            return res.status(404).json({ message: 'Contact not found' })
        }
        res.status(200).json(contacts)
    } catch (error) {

        res.status(400).json({ error: error.message })
        console.log(error);

    }

})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const response = await axios(`${API_URL}/objects/contacts/${id}`, {
            params: {
                properties: 'email, firstname, lastname, phone'
            },
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                "Content-Type": 'application/json'
            }
        })
        res.status(200).json(response.data)
    } catch (error) {
        res.status(400).json({ message: `El usuario con id: ${id}, no se encuentra` })
        console.log(error);
    }
})

router.post('/', async (req, res) => {

    const result = validateContact(req.body)

    if (!result.success) {

        return res.status(400).json({ error: result.error.errors.map(e => e.message) });
    }
    const { email, firstname, lastname, phone } = result.data

    try {
        const response = await axios.post(`${API_URL}/objects/contacts`, {
            properties: {
                email,
                firstname,
                lastname,
                phone
            }
        }, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                "Content-Type": 'application/json'
            }
        })
        res.status(200).json(response.data)
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error al crear el contacto'
        console.log(errorMessage);
        
        res.status(500).json({ errorMessage })
    }
})

router.patch('/:id', async (req, res) => {
    const result = validateParcialContact(req.body)
    if (!result.success) {
        return res.status(400).json({ error: result.error.errors.map(e => e.message) });
    }
    const { email, firstname, lastname, phone } = result.data;
    const { id } = req.params
    try {
        const properties = {
            ...(email && { email }),
            ...(firstname && { firstname }),
            ...(lastname && { lastname }),
            ...(phone && { phone })
        };
        const response = await axios.patch(`${API_URL}/objects/contacts/${id}`,
            { properties },
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    "Content-Type": 'application/json'
                }
            }
        )
        res.status(200).json(response.data)
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error al crear el contacto'
        res.status(500).json({ errorMessage })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const response = await axios.delete(`${API_URL}/objects/contacts/${id}`, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                "Content-Type": 'application/json'
            }
        })
        if (response.status === 204) {
            return res.status(200).json({ message: 'Contacto eliminado' });
        }
        return res.status(response.status).json({ error: 'Error al eliminar el contacto' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al intentar eliminar el contacto' });
    }

})


module.exports = router
