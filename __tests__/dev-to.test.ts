import {aggregateCounts} from '../src/dev-to'

test('aggregates single stat', async () => {
  const input = [
    {
      public_reactions_count: 0,
      page_views_count: 0,
      comments_count: 1
    }
  ]
  const out = await aggregateCounts(input)
  expect(out).toMatchObject({
    public_reactions_count: 0,
    page_views_count: 0,
    comments_count: 1
  })
})

test('aggregates multiple stats', async () => {
  const input = [
    {
      public_reactions_count: 0,
      page_views_count: 0,
      comments_count: 1
    },
    {
      public_reactions_count: 5,
      page_views_count: 3,
      comments_count: 1
    },
    {
      public_reactions_count: 50,
      page_views_count: 100,
      comments_count: 1
    }
  ]
  const out = await aggregateCounts(input)
  expect(out).toMatchObject({
    public_reactions_count: 55,
    page_views_count: 103,
    comments_count: 3
  })
})
