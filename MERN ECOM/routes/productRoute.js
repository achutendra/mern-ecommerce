import express from 'express';
import { isAdmin, requiredSignIn } from '../middlewares/authMiddleware.js';
import { createProductController,
         deleteProductController,
         getAllProductController,
        getSingleProductController,
         productCategoryController,
          productCountCountroller,
          productFilterController,
          productListController,
           productPhotoController,
          relatedProductController,
          searchProductController,
           updateProductController
        } from '../controllers/productController.js';
import formidable from 'express-formidable';

const router = express.Router();

// routes
// create product | POST
router.post(
    '/create-product',
    requiredSignIn,
    isAdmin,
    formidable(),
    createProductController
);

// get all products | GET
router.get('/all-product', getAllProductController);

// get single product | GET
router.get('/single-product/:slug', getSingleProductController);

// get photo | GET
router.get('/product-photo/:pid', productPhotoController);

// update product | PUT
router.put(
    '/update-product/:pid',
    requiredSignIn,
    isAdmin,
    formidable(),
    updateProductController
);

// delete product | DELETE
router.delete('/delete-product/:pid', requiredSignIn, isAdmin, deleteProductController);

// filter product | POST
router.post('/product-filters', productFilterController);

// product count | GET
router.get('/product-count', productCountCountroller);

// product per page | GET
router.get('/product-list/:page', productListController);

// search product | GET
router.get("/search/:keyword", searchProductController);

// similar product | GET
router.get('/related-product/:pid/:cid', relatedProductController);

// category wise product | GET
router.get('/product-category/:slug', productCategoryController);

export default router;