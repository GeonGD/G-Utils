import { escapeRegExp } from '../../src/RegExp/escapeRegExp'
import { jestExpectEqual } from '../enhanceJest'

test('表现正常', () => {
  jestExpectEqual(
    escapeRegExp('github.com'),
    'github\\.com',
  )

  jestExpectEqual(
    escapeRegExp('^$.*+?()[]{}|\\'),
    '\\^\\$\\.\\*\\+\\?\\(\\)\\[\\]\\{\\}\\|\\\\',
  )

  jestExpectEqual(
    escapeRegExp(''),
    '',
  )
})
