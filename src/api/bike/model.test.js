import { Bike } from '.'

let bike

beforeEach(async () => {
  bike = await Bike.create({ Model: 'test', Photo: 'test', Color: 'test', Weight: 'test', Location: 'test', Available: 'test', Rate: 'test', RentalDate: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = bike.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(bike.id)
    expect(view.Model).toBe(bike.Model)
    expect(view.Photo).toBe(bike.Photo)
    expect(view.Color).toBe(bike.Color)
    expect(view.Weight).toBe(bike.Weight)
    expect(view.Location).toBe(bike.Location)
    expect(view.Available).toBe(bike.Available)
    expect(view.Rate).toBe(bike.Rate)
    expect(view.RentalDate).toBe(bike.RentalDate)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = bike.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(bike.id)
    expect(view.Model).toBe(bike.Model)
    expect(view.Photo).toBe(bike.Photo)
    expect(view.Color).toBe(bike.Color)
    expect(view.Weight).toBe(bike.Weight)
    expect(view.Location).toBe(bike.Location)
    expect(view.Available).toBe(bike.Available)
    expect(view.Rate).toBe(bike.Rate)
    expect(view.RentalDate).toBe(bike.RentalDate)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
