const request = require('supertest');
const express = require('express');
const router = require('../src/routes/index'); 
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(router);

jest.mock('axios'); 
const axios = require('axios');

describe('API Endpoints', () => {

    // test para GET 
    it('should fetch all contacts', async () => {
        axios.get.mockResolvedValue({
            data: {
                results: [
                    {
                        id: '1',
                        properties: { email: 'test@example.com', firstname: 'John', lastname: 'Doe', phone: '1234567890' },
                    },
                ],
            },
        });

        const res = await request(app).get('');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(1);
        expect(res.body[0].email).toBe('test@example.com');
    });

    // test para POST 
    it('should create a new contact', async () => {
        const newContact = {
            properties: { email: 'test@example.com', firstname: 'John', lastname: 'Doe', phone: '1234567890' },
        };

        axios.post.mockResolvedValue({
            data: { id: '1', ...newContact },
        });

        const res = await request(app)
            .post('')
            .send({ email: 'test@example.com', firstname: 'John', lastname: 'Doe', phone: '1234567890' });

        expect(res.statusCode).toEqual(200);
        expect(res.body.id).toBe('1');
    });

    // test para PATCH 
    it('should update an existing contact', async () => {
        const updatedContact = {
            properties: { email: 'updated@example.com', firstname: 'John', lastname: 'Doe', phone: '1234567890' },
        };

        axios.patch.mockResolvedValue({
            data: { id: '1', ...updatedContact },
        });

        const res = await request(app)
            .patch('/1')
            .send({ email: 'updated@example.com' });

        expect(res.statusCode).toEqual(200);
        expect(res.body.properties.email).toBe('updated@example.com');
    });

    // test para DELETE
    it('should delete a contact', async () => {
        axios.delete.mockResolvedValue({ status: 204 });

        const res = await request(app).delete('/1');

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('Contacto eliminado');
    });
});
