import { defineEventHandler } from 'h3'
import { foobar } from '#my-module-server-options'

export default defineEventHandler(() => {
  return foobar()
})
