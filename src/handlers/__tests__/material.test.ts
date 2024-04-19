import request from "supertest";

import server from "../../models/server";

describe.only("GET /api/material", () => {
    it("should check if api/material url exists", async () => {
        const response = await request(server).get('/api/material')
        expect(response.status).not.toBe(404)
    })

    it('GET a JSON response with materials', async () => {
        const response = await request(server).get('/api/material')

        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty("data")
        expect(response.body).not.toHaveProperty("errors")

    })

    it('should GET a paginated JSON response with materials with length of 3 on page 1', async () => {
        const response = await request(server).get('/api/material?page=1&limit=3');
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty("data")
        expect(response.body).toHaveProperty("next")
        expect(response.body.data).toHaveLength(3)

        expect(response.body).not.toHaveProperty("errors")
        expect(response.body).not.toHaveProperty("previous")
    })

    it('should GET a search for a singular material by code', async () => {
        const code = "PIJ-1050"
        const response = await request(server).get(`/api/material?page=1&limit=3&search=${code}`);
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty("data")
        expect(response.body.data).toHaveLength(1)
        expect(response.body.data[0]).toHaveProperty("codigo", code)

        expect(response.body).not.toHaveProperty("next")
        expect(response.body).not.toHaveProperty("previous")
    })

    it('should GET nothing if material code does not exist', async () => {
        const code = "dfosfdsono"
        const response = await request(server).get(`/api/material?page=1&limit=3&search=${code}`);
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty("data")
        expect(response.body.data).toHaveLength(0)

        expect(response.body).not.toHaveProperty("next")
        expect(response.body).not.toHaveProperty("previous")
    })

    it('should GET a category from material with length of 10', async () => {
        const categoryId = 1
        const response = await request(server).get(`/api/material?page=1&limit=10&category=${categoryId}`);
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty("data")
        expect(response.body.data).toHaveLength(10)
        expect(response.body).toHaveProperty("next")
        expect(response.body.data[0]).toHaveProperty("id_categoria_material", categoryId)

        expect(response.body).not.toHaveProperty("previous")
    })

    it('should receive nothing if category is empty', async () => {
        const categoryId = 3
        const response = await request(server).get(`/api/material?page=1&limit=10&category=${categoryId}`);
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty("data")
        expect(response.body.data).toHaveLength(0)

        expect(response.body).not.toHaveProperty("next")
        expect(response.body).not.toHaveProperty("previous")
    })

    it('should GET a search for a singular material by code and category', async () => {
        const code = "PIJ-1050"
        const categoryId = 1
        const response = await request(server).get(`/api/material?page=1&limit=3&search=${code}&category=1`);
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty("data")
        expect(response.body.data).toHaveLength(1)
        expect(response.body.data[0]).toHaveProperty("codigo", code)
        expect(response.body.data[0]).toHaveProperty("id_categoria_material", categoryId)

        expect(response.body).not.toHaveProperty("next")
        expect(response.body).not.toHaveProperty("previous")
    })
})

describe("GET /api/material/:id", () => {
    it("Should return a 404 response for a non-existent material", async () => {
        const materialId = 2000
        const response = await request(server).get(`/api/material/${materialId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("error")
        expect(response.body.error).toBe("Material no encontrado")
    })

    it('should check a valid Id in the url', async () => {
        const response = await request(server).get('/api/material/not-valid-url')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe("ID no valido")
    })

    it('GET a JSON response for a material', async () => {
        const response = await request(server).get('/api/material/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
    })
})

describe('POST /api/material', () => {
    it('should display validation errors', async () => {
        const response = await request(server).post('/api/material').send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(15)
    })

    it('should create a new material', async () => {
        const response = await request(server).post('/api/material').send({
            descripcion: "material Test",
            cantidad: 5,
            codigo: "PIJ-500",
            costo: "900",
            minimo: 3,
            maximo: 9,
            id_marca: 1,
            id_area: 1,
            id_categoria_material: 1
        })

        expect(response.status).toEqual(201)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty("errors")
    })

})

describe('PUT /api/material/:id', () => {
    it('should check a valid Id in the url', async () => {
        const response = await request(server).put('/api/material/not-valid-url')
            .send({
                descripcion: "Updated"
            })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(15)
        expect(response.body.errors[0].msg).toBe("ID no valido")
    })

    it("should display validation error messages when updating a material", async () => {
        const response = await request(server).put('/api/material/3').send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')

    })

    it("should return a 404 response for a non-existent material", async () => {
        const materialId = 2000
        const response = await request(server).put(`/api/material/${materialId}`).send({
            descripcion: "material Test",
            cantidad: 5,
            codigo: "PIJ-500",
            costo: "900",
            minimo: 3,
            maximo: 9,
            id_marca: 1,
            id_area: 1,
            id_categoria_material: 1
        })

        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Material no encontrado')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')

    })

    it("should update an existing material with validator", async () => {
        const response = await request(server).put(`/api/material/24`).send({
            descripcion: "material - Updated",
            cantidad: 5,
            codigo: "PIJ-500",
            costo: "900",
            minimo: 3,
            maximo: 9,
            id_marca: 1,
            id_area: 1,
            id_categoria_material: 1
        })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('errors')

    })
})

describe("DELETE /api/material/:id", () => {
    it('should check a valid ID', async () => {
        const response = await request(server).delete('/api/material/not-valid-url')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe("ID no valido")

    })

    it('should return a 404 response for a non-existent material', async () => {
        const materialId = 2000
        const response = await request(server).delete(`/api/material/${materialId}`)

        expect(response.status).toBe(404)
        expect(response.body.error).toBe("Material no encontrado")

        expect(response.status).not.toBe(200)
    })

    it('should delete a product', async () => {
        const response = await request(server).delete('/api/material/30')
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("Material Eliminado")

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)

    })
})