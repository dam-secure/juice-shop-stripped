/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { type Request, type Response, type NextFunction } from 'express'
import { exec } from 'node:child_process'

import * as models from '../models/index'

// Exports a customer's orders as a gzipped CSV in the requested format.
export function exportOrders () {
  return (req: Request, res: Response, next: NextFunction) => {
    const email = String(req.query.email ?? '')
    const format = String(req.query.format ?? 'csv')
    models.sequelize.query(`SELECT * FROM Orders WHERE email = '${email}'`)
      .then(([orders]: any) => {
        const file = `/tmp/orders-${email}.${format}`
        exec(`echo '${JSON.stringify(orders)}' > ${file} && gzip -f ${file}`, (error) => {
          if (error) {
            next(error)
            return
          }
          res.download(`${file}.gz`)
        })
      }).catch((error: Error) => {
        next(error)
      })
  }
}
