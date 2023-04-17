import express from 'express'

/**
 * Type definition for Express request object.
 */
export type Request = express.Request

/**
 * Type definition for Express response object.
 */
export type Response = express.Response

/**
 * Type definition for Express next function.
 */
export type Next = express.NextFunction

/**
 * Type definition for Express error request handler.
 */
export type Error = express.ErrorRequestHandler

/**
 * Response manager class for handling HTTP responses.
 */
export class ResponseManager {
  /**
   * Send an error response with the given status code, message, and error object.
   *
   * @param {Response} response - Express response object.
   * @param {number} code - HTTP status code.
   * @param {string} message - Error message.
   * @param {unknown} error - Error object.
   * @returns {Response} - Express response object with error information.
   */
  static error (
    response: Response,
    code: number,
    message: string,
    error: unknown
  ) {
    console.error(message, error)
    return response.status(code).json({
        message: message,
        error
    })
  }

  /**
   * Send a success response with the given parameters.
   *
   * @param {Response} response - Express response object.
   * @param {object | unknown} params - Response parameters.
   * @param {boolean} created - Whether the response is for a created resource.
   * @returns {Response} - Express response object with success information.
   */
  static ok (
    response: Response,
    params: object | unknown = { message: 'ok' },
    created = false
  ) {
    if (!params) {
      return response.status(204).json(params)
    } else {
      if (created) return response.status(201).json(params)
      return response.status(200).json(params)
    }
  }
}
