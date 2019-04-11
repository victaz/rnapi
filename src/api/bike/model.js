import mongoose, { Schema } from 'mongoose'

const bikeSchema = new Schema({
  Model: {
    type: String
  },
  Photo: {
    type: String
  },
  Color: {
    type: String
  },
  Weight: {
    type: String
  },
  Location: {
    type: String
  },
  Available: {
    type: String
  },
  Rate: {
    type: String
  },
  RentalDate: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

bikeSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      Model: this.Model,
      Photo: this.Photo,
      Color: this.Color,
      Weight: this.Weight,
      Location: this.Location,
      Available: this.Available,
      Rate: this.Rate,
      RentalDate: this.RentalDate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Bike', bikeSchema)

export const schema = model.schema
export default model
