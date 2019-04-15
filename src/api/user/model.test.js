import crypto from 'crypto'
import { User } from '.'

let user

beforeEach(async () => {
  user = await User.create({ name: 'user', email: 'a@a.com', password: '123456' })
})

describe('set email', () => {
  it('sets name automatically', () => {
    user.name = ''
    user.email = 'test@example.com'
    expect(user.name).toBe('test')
  })

  it('sets picture automatically', () => {
    const hash = crypto.createHash('md5').update(user.email).digest('hex')
  
  })

  it('changes picture when it is gravatar', () => {
    user.email = 'b@b.com'
    const hash = crypto.createHash('md5').update(user.email).digest('hex')
  
  })

  it('does not change picture when it is already set and is not gravatar', () => {
    user.picture = 'not_gravatar.jpg'
    user.email = 'c@c.com'
   
  })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = user.view()
    expect(view).toBeDefined()
    expect(view.id).toBe(user.id)
    expect(view.name).toBe(user.name)

  })

  it('returns full view', () => {
    const view = user.view(true)
    expect(view).toBeDefined()
    expect(view.id).toBe(user.id)
    expect(view.name).toBe(user.name)
    expect(view.email).toBe(user.email)

    expect(view.createdAt).toEqual(user.createdAt)
  })
})

describe('authenticate', () => {
  it('returns the user when authentication succeed', async () => {
    expect(await user.authenticate('123456')).toBe(user)
  })

  it('returns false when authentication fails', async () => {
    expect(await user.authenticate('blah')).toBe(false)
  })
})
