import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Bike } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, bike

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  bike = await Bike.create({})
})

test('POST /bike 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, Model: 'test', Photo: 'test', Color: 'test', Weight: 'test', Location: 'test', Available: 'test', Rate: 'test', RentalDate: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.Model).toEqual('test')
  expect(body.Photo).toEqual('test')
  expect(body.Color).toEqual('test')
  expect(body.Weight).toEqual('test')
  expect(body.Location).toEqual('test')
  expect(body.Available).toEqual('test')
  expect(body.Rate).toEqual('test')
  expect(body.RentalDate).toEqual('test')
})

test('POST /bike 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /bike 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /bike 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /bike 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /bike/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${bike.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(bike.id)
})

test('GET /bike/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${bike.id}`)
  expect(status).toBe(401)
})

test('GET /bike/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /bike/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${bike.id}`)
    .send({ access_token: adminSession, Model: 'test', Photo: 'test', Color: 'test', Weight: 'test', Location: 'test', Available: 'test', Rate: 'test', RentalDate: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(bike.id)
  expect(body.Model).toEqual('test')
  expect(body.Photo).toEqual('test')
  expect(body.Color).toEqual('test')
  expect(body.Weight).toEqual('test')
  expect(body.Location).toEqual('test')
  expect(body.Available).toEqual('test')
  expect(body.Rate).toEqual('test')
  expect(body.RentalDate).toEqual('test')
})

test('PUT /bike/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${bike.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /bike/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${bike.id}`)
  expect(status).toBe(401)
})

test('PUT /bike/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, Model: 'test', Photo: 'test', Color: 'test', Weight: 'test', Location: 'test', Available: 'test', Rate: 'test', RentalDate: 'test' })
  expect(status).toBe(404)
})

test('DELETE /bike/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${bike.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /bike/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${bike.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /bike/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${bike.id}`)
  expect(status).toBe(401)
})

test('DELETE /bike/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
