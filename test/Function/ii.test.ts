import { ii } from '../../src/Function/ii'
import { jestExpectEqual } from '../enhanceJest'

test('表现正常', () => {
  [1, 'false', /d/, [], {}, () => {}].forEach(item => {
    jestExpectEqual(
      ii(() => item),
      item,
    )
  })
})
