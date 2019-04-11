import { success, notFound } from '../../services/response/'
import { Bike } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Bike.create(body)
    .then((bike) => bike.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Bike.find(query, select, cursor)
    .then((bikes) => bikes.map((bike) => bike.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Bike.findById(params.id)
    .then(notFound(res))
    .then((bike) => bike ? bike.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Bike.findById(params.id)
    .then(notFound(res))
    .then((bike) => bike ? Object.assign(bike, body).save() : null)
    .then((bike) => bike ? bike.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Bike.findById(params.id)
    .then(notFound(res))
    .then((bike) => bike ? bike.remove() : null)
    .then(success(res, 204))
    .catch(next)
