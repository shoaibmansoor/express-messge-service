const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');


const app = express();
app.use(bodyParser.json());

const messages = [];


/**
 * @swagger
 * /messages:
 *   get:
 *     summary: Retrieve a list of messages
 *     responses:
 *       200:
 *         description: A list of messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 */
app.get('/messages', (req, res) => {
    res.json(messages);
});


/**
 * @swagger
 * /messages:
 *   post:
 *     summary: Create a new message
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       201:
 *         description: The created message
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 */
app.post('/messages', (req, res) => {
    messages.push(req.body);
    res.status(201).json(req.body);
});


/**
 * @swagger
 * /messages/{id}:
 *   put:
 *     summary: Update a message by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The message ID
 *     requestBody:
 *      
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       200:
 *         description: The updated message
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 */
app.put('/messages/:id', (req, res) => {
    const messageIndex = messages.findIndex((message) => message.id === parseInt(req.params.id));
    if (messageIndex >= 0) {
        messages[messageIndex].text = req.body.text;
        res.json(messages[messageIndex]);
    } else {
        res.status(404).json({ error: 'Message not found' });
    }
});


/**
 *  @swagger
 *  /messages/{id}:
 *   delete:
 *     summary: Delete a message by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The message ID
 *     responses:
 *       204:
 *         description: No content (successfully deleted)
 *       404:
 *         description: Message not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
app.delete('/messages/:id', (req, res) => {
    const messageIndex = messages.findIndex((message) => message.id === parseInt(req.params.id));
    if (messageIndex >= 0) {
        messages.splice(messageIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Message not found' });
    }
});

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Messages API',
            version: '1.0.0',
            description: 'A simple Express REST API for managing messages',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: [path.join(__dirname, 'app.js')],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The message ID
 *         text:
 *           type: string
 *           description: The message content
 *       example:
 *         id: 1
 *         text: Hello, world!
 */


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
