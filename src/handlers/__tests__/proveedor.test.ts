import request from "supertest"

import server from "../../models/server"

describe("GET /api/proveedor", () => {
    it("should check if api/proveedor url exists", async () => {
        const response = await request(server).get('/api/proveedor')
        expect(response.status).not.toBe(404)
    })

    it('GET a JSON response with proveedors', async () => {
        const response = await request(server).get('/api/proveedor')

        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty("data")
        expect(response.body).not.toHaveProperty("errors")

    })
})

describe("GET /api/proveedor/:id", () => {
    it("Should return a 404 response for a non-existent proveedor", async () => {
        const proveedorId = 2000
        const response = await request(server).get(`/api/proveedor/${proveedorId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("error")
        expect(response.body.error).toBe("Entidad no encontrado")
    })

    it('should check a valid Id in the url', async () => {
        const response = await request(server).get('/api/proveedor/not-valid-url')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe("ID no valido")
    })

    it('GET a JSON response for a proveedor', async () => {
        const response = await request(server).get('/api/proveedor/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
    })
})

describe('POST /api/proveedor', () => {
    it('should display validation errors', async () => {
        const response = await request(server).post('/api/proveedor').send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(2)
    })

    it('should create a new proveedor', async () => {
        const response = await request(server).post('/api/proveedor').send({
            nombre: "proveedor Test",
            telefono: 90443207, // Opcional
            contacto: "Kevin"
        })

        expect(response.status).toEqual(201)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty("errors")
    })

})


describe('PUT /api/proveedor/:id', () => {
    it('should check a valid Id in the url', async () => {
        const response = await request(server).put('/api/proveedor/not-valid-url')
            .send({
                nombre: "Updated"
            })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(2)
        expect(response.body.errors[0].msg).toBe("ID no valido")
    })

    it("should display validation error messages when updating a proveedor", async () => {
        const response = await request(server).put('/api/proveedor/3').send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(2)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')

    })

    it("should return a 404 response for a non-existent proveedor", async () => {
        const proveedorId = 2000
        const response = await request(server).put(`/api/proveedor/${proveedorId}`).send({
            nombre: "proveedor - Updated",
            telefono: 90443207, // Opcional
            contacto: "Kevin"
        })

        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Entidad no encontrado')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')

    })

    it("should update an existing proveedor with validator", async () => {
        const response = await request(server).put(`/api/proveedor/3`).send({
            nombre: "proveedor - Updated",
            telefono: 90443207, // Opcional
            contacto: "Kevin"
        })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('errors')

    })
})

describe("DELETE /api/proveedor/:id", () => {
    it('should check a valid ID', async () => {
        const response = await request(server).delete('/api/proveedor/not-valid-url')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe("ID no valido")

    })

    it('should return a 404 response for a non-existent proveedor', async () => {
        const proveedorId = 2000
        const response = await request(server).delete(`/api/proveedor/${proveedorId}`)

        expect(response.status).toBe(404)
        expect(response.body.error).toBe("Entidad no encontrado")

        expect(response.status).not.toBe(200)
    })

    it('should delete a product', async () => {
        const response = await request(server).delete('/api/proveedor/6')
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("Entidad Eliminado")

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)

    })
})