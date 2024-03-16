using Microsoft.AspNetCore.Mvc;
using ProductAPI.Controllers;
using ProductAPI.Converters;
using ProductAPI.Models;
using ProductAPI.Services;

namespace ProductTests.ProductTests
{
    public class ProductControllerTests
    {
        private readonly IProductService productService;
        private readonly ProductController controller;

        List<Product> testData = new();

        public ProductControllerTests()
        {
            productService = new ProductService();
            controller = new ProductController(productService);

            testData = new()
            {
                new Product(1, "Tej", 380),
                new Product(2, "Banán", 220)
            };

            JsonConverter.WriteJson(testData);
        }

        [Fact]
        public void ProductService_GetAllProduct_ReturnCorrectResults()
        {
            var result = controller.GetAllProduct();

            int productCount = JsonConverter.ReadJson().Count;


            Assert.True(result.GetType() == typeof(OkObjectResult));
            Assert.Equal(2, productCount);
        }

        [Fact]
        public void ProductService_GetProduct_ReturnCorrectResults()
        {
            var result = controller.GetProduct(testData[0].Id);
            var notFoundResult = controller.GetProduct(3);

            
            Assert.True(result.GetType() == typeof(OkObjectResult));
            Assert.True(notFoundResult.GetType() == typeof(NotFoundResult));
        }

        [Fact]
        public void ProductService_CreateProduct_ReturnCorrectResults()
        {
            Product productToCreate = new(6, "Sajt", 565);
            Product existingProduct = new(1, "Tej", 380);


            var result = controller.CreateProduct(productToCreate);
            var conflictResult = controller.CreateProduct(existingProduct);

            int productCount = JsonConverter.ReadJson().Count;



            Assert.True(result.GetType() == typeof(OkResult));
            Assert.True(conflictResult.GetType() == typeof(ConflictObjectResult));
            Assert.Equal(3, productCount);
        }

        [Fact]
        public void ProductService_EditProduct_ReturnCorrectResults()
        {
            Product originalProduct = testData[0];
            Product updatedProduct = new(1, "Mizo Tej", 380);
            Product notExistingProduct = new(8, "Liszt", 305);


            var result = controller.EditProduct(updatedProduct);
            var notFoundResult = controller.EditProduct(notExistingProduct);

            List<Product> productList = JsonConverter.ReadJson();
            int productCount = productList.Count;


            Assert.True(result.GetType() == typeof(NoContentResult));
            Assert.True(notFoundResult.GetType() == typeof(NotFoundResult));

            Assert.Equal(2, productCount);
            Assert.Contains(productList, product => product.Name == updatedProduct.Name);
            Assert.DoesNotContain(productList, product => product.Name == originalProduct.Name);
            Assert.DoesNotContain(productList, product => product.Name == notExistingProduct.Name);
            Assert.DoesNotContain(productList, product => product.Id == notExistingProduct.Id);
        }

        [Fact]
        public void ProductService_DeleteProduct_ReturnCorrectResults()
        {
            var result = controller.DeleteProduct(testData[1].Id);
            var notFoundResult = controller.DeleteProduct(3);

            List<Product> productList = JsonConverter.ReadJson();
            int productCount = productList.Count;


            Assert.True(result.GetType() == typeof(NoContentResult));
            Assert.True(notFoundResult.GetType() == typeof(NotFoundResult));

            Assert.Equal(1, productCount);
            Assert.DoesNotContain(productList, product => product.Id == testData[1].Id);
            Assert.Contains(productList, product => product.Id == testData[0].Id);
        }
    }
}
