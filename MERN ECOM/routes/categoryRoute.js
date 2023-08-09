import express from 'express';
import { isAdmin, requiredSignIn } from '../middlewares/authMiddleware.js';
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from '../controllers/categoryController.js';

const router = express.Router();

// routes
// create category | POST
router.post('/create-category', requiredSignIn, isAdmin, createCategoryController);

// update category  | POST
router.put('/update-category/:id', requiredSignIn, isAdmin, updateCategoryController);

// all category | GET
router.get('/all-category', categoryController);

// single-category | GET
router.get('/single-category/:slug', singleCategoryController);

// delete category | DELETE
router.delete('/delete-category/:id', requiredSignIn, isAdmin, deleteCategoryController );



export default router;