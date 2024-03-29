import request from "supertest";

import server from "../../models/server";

describe("GET /api/area", () => {
    it("should check if api/area url exists", async () => {
        const response = await request(server).get('/api/area')
        expect(response.status).not.toBe(404)
    })

    it('GET a JSON response with areas', async () => {
        const response = await request(server).get('/api/area')

        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty("data")
        expect(response.body).not.toHaveProperty("errors")

    })
})

describe("GET /api/area/:id", () => {
    it("Should return a 404 response for a non-existent area", async () => {
        const areaId = 2000
        const response = await request(server).get(`/api/area/${areaId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("error")
        expect(response.body.error).toBe("Entidad no encontrado")
    })

    it('should check a valid Id in the url', async () => {
        const response = await request(server).get('/api/area/not-valid-url')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe("ID no valido")
    })

    it('GET a JSON response for a area', async () => {
        const response = await request(server).get('/api/area/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
    })
})

describe('POST /api/area', () => {
    it('should display validation errors', async () => {
        const response = await request(server).post('/api/area').send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(1)
    })

    it('should create a new area', async () => {
        const response = await request(server).post('/api/area').send({
            nombre: "area Test"
        })

        expect(response.status).toEqual(201)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty("errors")
    })

})

describe('PUT /api/area/:id', () => {
    it('should check a valid Id in the url', async () => {
        const response = await request(server).put('/api/area/not-valid-url')
            .send({
                nombre: "Updated"
            })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe("ID no valido")
    })

    it("should display validation error messages when updating a area", async () => {
        const response = await request(server).put('/api/area/2').send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')

    })

    it("should return a 404 response for a non-existent area", async () => {
        const areaId = 2000
        const response = await request(server).put(`/api/area/${areaId}`).send({
            nombre: "Updated"
        })

        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Entidad no encontrado')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')

    })

    it("should update an existing area with validator", async () => {
        const response = await request(server).put(`/api/area/3`).send({
            nombre: "area - Updated"
        })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('errors')

    })
})


describe("DELETE /api/area/:id", () => {
    it('should check a valid ID', async () => {
        const response = await request(server).delete('/api/area/not-valid-url')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe("ID no valido")

    })

    it('should return a 404 response for a non-existent area', async () => {
        const areaId = 2000
        const response = await request(server).delete(`/api/area/${areaId}`)

        expect(response.status).toBe(404)
        expect(response.body.error).toBe("Entidad no encontrado")

        expect(response.status).not.toBe(200)
    })

    it('should delete a product', async () => {
        const response = await request(server).delete('/api/area/2')
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("Entidad Eliminado")

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)

    })
})