import Listing from '../models/listing.model.js'
import { errorHandler } from '../utils/error.js'

// CREATE A NEW LISTING
export const createListing = async (req, res, next) => {
  try {
    // Attempt to create a new listing using data from the request body
    const listing = await Listing.create(req.body)
    // Respond with the created listing
    return res.status(201).json(listing)
  } catch (error) {
    // Handle errors by passing them to the next middleware
    next(error)
  }
}

// DELETE A LISTING
export const deleteListing = async (req, res, next) => {
  // Find the listing by ID
  const listing = await Listing.findById(req.params.id)

  // Check if the listing exists
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'))
  }

  // Check if the requesting user owns the listing
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only delete your own listings!'))
  }

  try {
    // Attempt to delete the listing
    await Listing.findByIdAndDelete(req.params.id)
    // Respond with a success message
    res.status(200).json('Listing has been deleted!')
  } catch (error) {
    // Handle errors by passing them to the next middleware
    next(error)
  }
}

// UPDATE A LISTING
export const updateListing = async (req, res, next) => {
  // Find the listing by ID
  const listing = await Listing.findById(req.params.id)

  // Check if the listing exists
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'))
  }

  // Check if the requesting user owns the listing
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only update your own listings!'))
  }

  try {
    // Attempt to update the listing
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    // Respond with the updated listing
    res.status(200).json(updatedListing)
  } catch (error) {
    // Handle errors by passing them to the next middleware
    next(error)
  }
}

// GET A LISTING BY ID
export const getListing = async (req, res, next) => {
  try {
    // Attempt to find the listing by ID
    const listing = await Listing.findById(req.params.id)
    // Check if the listing exists
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'))
    }
    // Respond with the found listing
    res.status(200).json(listing)
  } catch (error) {
    // Handle errors by passing them to the next middleware
    next(error)
  }
}
