const { supabase } = require('../config/db');
const { TABLES } = require('../models/supabaseTables');

/**
 * Controller to fetch all published services
 */
async function getAllServices(req, res, next) {
  try {
    const { category, search } = req.query;
    let query = supabase.from(TABLES.SERVICES).select('*');

    if (category) {
      query = query.eq('category', category);
    }

    if (search) {
      query = query.ilike('title', `%${search}%`);
    }

    const { data, error } = await query;

    if (error) {
      // If table does not exist yet during initial setup, return mock structure to avoid blocking
      return res.status(200).json({
        success: true,
        message: 'Initial service list placeholder (Supabase table pending schema migration)',
        data: [],
        note: error.message,
      });
    }

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Controller to create a new service listing
 */
async function createService(req, res, next) {
  try {
    const { title, description, category, price, provider_id } = req.body;

    if (!title || !price || !category) {
      return res.status(400).json({
        success: false,
        message: 'Title, category, and price are required fields.',
      });
    }

    const { data, error } = await supabase
      .from(TABLES.SERVICES)
      .insert([{ title, description, category, price, provider_id }])
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllServices,
  createService,
};
