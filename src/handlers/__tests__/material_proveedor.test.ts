import request from "supertest";

import server from "../../models/server";

describe("GET /api/material_proveedor", () => {
    it("should check if api/material_proveedor url exists", async () => {
        const response = await request(server).get('/api/material_proveedor')
        expect(response.status).not.toBe(404)
    })

    it('GET a JSON response with material_proveedors', async () => {
        const response = await request(server).get('/api/material_proveedor')

        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty("data")
        expect(response.body).not.toHaveProperty("errors")

    })
})

describe("GET /api/material_proveedor/:id_proveedor/:id_material", () => {
    it("Should return a 404 response for a non-existent material_proveedor", async () => {
        const materialId = 2000
        const proveedorId = 2000
        const response = await request(server).get(`/api/material_proveedor/${materialId}/${proveedorId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("error")
        expect(response.body.error).toBe("Material no encontrado")
    })

    it('should check a valid Id in the url', async () => {
        const response = await request(server).get('/api/material_proveedor/not-valid-url/notworking')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(2)
        expect(response.body.errors[0].msg).toBe("ID no valido")
    })

    it('GET a JSON response for a material_proveedor', async () => {
        const response = await request(server).get('/api/material_proveedor/1/19')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
    })
})

describe('POST /api/material_proveedor', () => {
    it('should display validation errors', async () => {
        const response = await request(server).post('/api/material_proveedor').send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(2)
    })

    it('should create a new material_proveedor', async () => {
        const response = await request(server).post('/api/material_proveedor').send({
            id_proveedor: 2,
            id_material: 31
        })

        expect(response.status).toEqual(201)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty("errors")
    })

})

describe('PUT /api/material_proveedor/:id_proveedor/:id_material', () => {
    it('should check a valid Id in the url', async () => {
        const response = await request(server).put('/api/material_proveedor/not-valid-url/notvalid')
            .send({
                id_material_proveedor: 1,
                id_material: 30
            })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        //expect(response.body.errors).toHaveLength(2)
        expect(response.body.errors[0].msg).toBe("ID no valido")
    })

    it("should display validation error messages when updating a material_proveedor", async () => {
        const response = await request(server).put('/api/material_proveedor/2/30').send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        //expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(2)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')

    })

    it("should return a 404 response for a non-existent material_proveedor", async () => {
        const proveedorId = 2000
        const materialId = 2000
        const response = await request(server).put(`/api/material_proveedor/${proveedorId}/${materialId}`).send({
            id_proveedor: 1,
            id_material: 30
        })

        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Material no encontrado')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')

    })

    it("should update an existing material_proveedor with validator", async () => {
        const response = await request(server).put(`/api/material_proveedor/1/30`).send({
            id_proveedor: 2,
            id_material: 30
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('errors')

    })
})