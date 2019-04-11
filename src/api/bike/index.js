import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Bike, { schema } from './model'

const router = new Router()
const { Model, Photo, Color, Weight, Location, Available, Rate, RentalDate } = schema.tree

/**
 * @api {post} /bike Create bike
 * @apiName CreateBike
 * @apiGroup Bike
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam Model Bike's Model.
 * @apiParam Photo Bike's Photo.
 * @apiParam Color Bike's Color.
 * @apiParam Weight Bike's Weight.
 * @apiParam Location Bike's Location.
 * @apiParam Available Bike's Available.
 * @apiParam Rate Bike's Rate.
 * @apiParam RentalDate Bike's RentalDate.
 * @apiSuccess {Object} bike Bike's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Bike not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ Model, Photo, Color, Weight, Location, Available, Rate, RentalDate }),
  create)

/**
 * @api {get} /bike Retrieve bikes
 * @apiName RetrieveBikes
 * @apiGroup Bike
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} bikes List of bikes.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /bike/:id Retrieve bike
 * @apiName RetrieveBike
 * @apiGroup Bike
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} bike Bike's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Bike not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /bike/:id Update bike
 * @apiName UpdateBike
 * @apiGroup Bike
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam Model Bike's Model.
 * @apiParam Photo Bike's Photo.
 * @apiParam Color Bike's Color.
 * @apiParam Weight Bike's Weight.
 * @apiParam Location Bike's Location.
 * @apiParam Available Bike's Available.
 * @apiParam Rate Bike's Rate.
 * @apiParam RentalDate Bike's RentalDate.
 * @apiSuccess {Object} bike Bike's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Bike not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ Model, Photo, Color, Weight, Location, Available, Rate, RentalDate }),
  update)

/**
 * @api {delete} /bike/:id Delete bike
 * @apiName DeleteBike
 * @apiGroup Bike
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Bike not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
