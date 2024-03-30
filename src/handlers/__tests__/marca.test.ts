import request from "supertest";

import server from "../../models/server"

// Test para agregar marca
describe('POST /api/marca', () => {
    it('should display validation errors', async () => {
        const response = await request(server).post('/api/marca').send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(1)
    })

    it('should create a new marca', async () => {
        const response = await request(server).post('/api/marca').send({
            nombre: "Marca Test"
        })

        expect(response.status).toEqual(201)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty("errors")
    })

})

describe('GET /api/marca', () => {
    it("should check if api/marca url exists", async () => {
        const response = await request(server).get('/api/marca')
        expect(response.status).not.toBe(404)
    })

    it('GET a JSON response with products', async () => {
        const response = await request(server).get('/api/marca')

        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty("data")
        expect(response.body).not.toHaveProperty("errors")

    })
})

describe("GET /api/marca/:id", () => {
    it("Should return a 404 response for a non-existent marca", async () => {
        const marcaId = 2000
        const response = await request(server).get(`/api/marca/${marcaId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("error")
        expect(response.body.error).toBe("Entidad no encontrado")
    })

    it('should check a valid Id in the url', async () => {
        const response = await request(server).get('/api/marca/not-valid-url')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe("ID no valido")
    })

    it('GET a JSON response for a marca', async () => {
        const response = await request(server).get('/api/marca/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
    })
})

describe('PUT /api/marca/:id', () => {
    it('should check a valid Id in the url', async () => {
        const response = await request(server).put('/api/marca/not-valid-url')
            .send({
                nombre: "Updated"
            })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe("ID no valido")
    })

    it("should display validation error messages when updating a marca", async () => {
        const response = await request(server).put('/api/marca/5').send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')

    })

    it("should return a 404 response for a non-existent marca", async () => {
        const marcaId = 2000
        const response = await request(server).put(`/api/marca/${marcaId}`).send({
            nombre: "Updated"
        })

        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Entidad no encontrado')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')

    })

    it("should update an existing marca with validator", async () => {
        const response = await request(server).put(`/api/marca/5`).send({
            nombre: "Updated"
        })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('errors')

    })
})

describe("DELETE /api/marca/:id", () => {
    it('should check a valid ID', async () => {
        const response = await request(server).delete('/api/marca/not-valid-url')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe("ID no valido")

    })

    it('should return a 404 response for a non-existent marca', async () => {
        const marcaId = 2000
        const response = await request(server).delete(`/api/marca/${marcaId}`)

        expect(response.status).toBe(404)
        expect(response.body.error).toBe("Entidad no encontrado")

        expect(response.status).not.toBe(200)
    })

    it('should delete a product', async () => {
        const response = await request(server).delete('/api/marca/11')
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("Entidad Eliminado")

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)

    })
})

