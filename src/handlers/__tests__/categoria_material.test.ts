import request from "supertest";

import server from "../../models/server";

describe("GET /api/categoria_material", () => {
    it("should check if api/categoria_material url exists", async () => {
        const response = await request(server).get('/api/categoria_material')
        expect(response.status).not.toBe(404)
    })

    it('GET a JSON response with categoria_materials', async () => {
        const response = await request(server).get('/api/categoria_material')

        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty("data")
        expect(response.body).not.toHaveProperty("errors")

    })
})

describe("GET /api/categoria_material/:id", () => {
    it("Should return a 404 response for a non-existent categoria_material", async () => {
        const categoria_materialId = 2000
        const response = await request(server).get(`/api/categoria_material/${categoria_materialId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("error")
        expect(response.body.error).toBe("Entidad no encontrado")
    })

    it('should check a valid Id in the url', async () => {
        const response = await request(server).get('/api/categoria_material/not-valid-url')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe("ID no valido")
    })

    it('GET a JSON response for a categoria_material', async () => {
        const response = await request(server).get('/api/categoria_material/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
    })
})

describe('POST /api/categoria_material', () => {
    it('should display validation errors', async () => {
        const response = await request(server).post('/api/categoria_material').send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(1)
    })

    it('should create a new categoria_material', async () => {
        const response = await request(server).post('/api/categoria_material').send({
            nombre: "categoria_material Test"
        })

        expect(response.status).toEqual(201)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty("errors")
    })

})

describe('PUT /api/categoria_material/:id', () => {
    it('should check a valid Id in the url', async () => {
        const response = await request(server).put('/api/categoria_material/not-valid-url')
            .send({
                nombre: "Updated"
            })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe("ID no valido")
    })

    it("should display validation error messages when updating a categoria_material", async () => {
        const response = await request(server).put('/api/categoria_material/2').send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')

    })

    it("should return a 404 response for a non-existent categoria_material", async () => {
        const categoria_materialId = 2000
        const response = await request(server).put(`/api/categoria_material/${categoria_materialId}`).send({
            nombre: "Updated"
        })

        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Entidad no encontrado')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')

    })

    it("should update an existing categoria_material with validator", async () => {
        const response = await request(server).put(`/api/categoria_material/3`).send({
            nombre: "categoria_material - Updated"
        })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('errors')

    })
})

describe("DELETE /api/categoria_material/:id", () => {
    it('should check a valid ID', async () => {
        const response = await request(server).delete('/api/categoria_material/not-valid-url')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe("ID no valido")

    })

    it('should return a 404 response for a non-existent categoria_material', async () => {
        const categoria_materialId = 2000
        const response = await request(server).delete(`/api/categoria_material/${categoria_materialId}`)

        expect(response.status).toBe(404)
        expect(response.body.error).toBe("Entidad no encontrado")

        expect(response.status).not.toBe(200)
    })

    it('should delete a product', async () => {
        const response = await request(server).delete('/api/categoria_material/2')
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("Entidad Eliminado")

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)

    })
})